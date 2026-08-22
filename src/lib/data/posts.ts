// Les articles vivent en données plutôt qu'en markdown : le corps est une suite
// de blocs typés, donc un paragraphe, un tableau de mesures et un encart ne
// peuvent pas dériver visuellement d'un article à l'autre, et les deux langues
// partagent exactement la même structure.

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "list"; items: string[] }
  | { t: "stats"; items: { value: string; label: string; note?: string }[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "note"; text: string }
  | { t: "code"; lang: string; text: string };

export interface PostContent {
  title: string;
  excerpt: string;
  body: Block[];
}

export interface PostMeta {
  slug: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  project?: string;
  repo?: string;
}

export interface Post {
  meta: PostMeta;
  fr: PostContent;
  en: PostContent;
}

const enderbotGateway: Post = {
  meta: {
    slug: "enderbot-passerelle-go",
    date: "2026-08-22",
    readingMinutes: 11,
    tags: ["Go", "TypeScript", "Discord", "Performance", "PostgreSQL"],
    project: "enderbot",
  },
  fr: {
    title: "Enderbot : la passerelle Discord réécrite en Go, puis la chasse aux millisecondes",
    excerpt:
      "Six semaines et deux mille commits pour sortir discord.js de la production, remplacer le client par un binaire Go qui parle le même protobuf, puis aller chercher dans les métriques les 2,2 Go de RSS que personne n'avait vus.",
    body: [
      {
        t: "p",
        text: "Enderbot est un jeu qui se joue dans Discord : un monorepo TypeScript où un cœur applicatif, un site SvelteKit et un client passerelle se parlent en protobuf par dessus RabbitMQ, avec Postgres, Redis et Prometheus derrière. Le client passerelle, c'est la partie qui tient la connexion à Discord, encaisse les évènements et pousse les messages. C'était historiquement du discord.js, un process Node par shard. Ça ne l'est plus.",
      },
      { t: "h", text: "Pourquoi sortir discord.js" },
      {
        t: "p",
        text: "Un process par shard, c'est un cache mémoire par shard, un heap par shard et un watchdog maison pour relancer ceux qui décrochent. À seize shards, la facture mémoire du client rivalisait avec celle du cœur alors qu'il ne fait que du relais. Le calcul métier vit ailleurs, donc la passerelle n'avait aucune raison de rester dans le même langage que lui.",
      },
      {
        t: "p",
        text: "Le remplaçant s'appelle discord-go : un module Go bâti sur disgo, un seul process qui tient tous les shards, le nombre de shards résolu tout seul depuis /gateway/bot. Cent vingt six fichiers Go, une trentaine de milliers de lignes, et un démarrage à froid d'environ quatre vingt dix secondes à seize shards, imposé par la limite d'identify de Discord.",
      },
      { t: "h", text: "Le contrat de fil comme point fixe" },
      {
        t: "p",
        text: "La règle qui a rendu la réécriture tenable : ne rien changer de ce qui traverse le réseau. Les mêmes messages protobuf sur les files client-to-core et core-to-client-{shardId}, les mêmes clés Redis status-discord-*, les mêmes métriques enderbot_discord_*. Le cœur tourne sans une ligne modifiée, et les tableaux de bord Grafana continuent d'afficher les mêmes séries.",
      },
      {
        t: "p",
        text: "Concrètement, les types Go sont générés depuis les mêmes .proto que le TypeScript. Les numéros de champ sont le contrat, jamais édités à la main.",
      },
      {
        t: "code",
        lang: "bash",
        text: "cd discord-go\n./gen-proto.sh        # shared/proto/**/*.proto -> internal/wire/\ngo build ./... && go test ./...",
      },
      {
        t: "note",
        text: "Un contrat sérialisé stable, c'est ce qui transforme une réécriture en remplacement de pièce plutôt qu'en refonte : les deux clients peuvent tourner en parallèle et se relayer sans que le reste du système sache lequel répond.",
      },
      { t: "h", text: "La parité se joue sur le comportement, pas sur l'API" },
      {
        t: "p",
        text: "La partie longue n'a pas été de reproduire les appels, mais les habitudes de discord.js. Une bibliothèque de ce calibre transporte des décisions non écrites, et chacune se paie en bug de production si on ne la rejoue pas :",
      },
      {
        t: "list",
        items: [
          "les permissions doivent ignorer un timeout, exactement comme discord.js le fait, sinon un membre exclu temporairement perd des droits qu'il devrait garder",
          "le rôle @everyone voyage avec les rôles du membre, et compte tous les membres du cache",
          "les positions des salons et des rôles sont calculées, pas lues telles quelles",
          "un avatar animé se sert en .gif, un attachement qui arrive sans nom doit quand même en recevoir un",
          "les messages privés se répondent, les nameLocalizations des choix d'autocomplétion se transmettent",
          "le repli sur une édition simple ne vaut que pour un jeton périmé, pas pour toute erreur",
        ],
      },
      {
        t: "p",
        text: "Les paquets faits main sont montés à 94 % de couverture, et une revue adversariale dédiée a servi à chercher les écarts de parité restants plutôt qu'à relire du style.",
      },
      { t: "h", text: "Bascule, retour arrière, bascule" },
      {
        t: "p",
        text: "Le passage en production n'a pas été un interrupteur. Les deux clients ont tourné en double, pilotés par un drapeau Redis discord-client-active, avec un mode veille froide des deux côtés : le process boote passif, sonde le drapeau toutes les deux secondes, et l'activation recrée entièrement le client disgo. Fermer un client disgo bloque ses seaux REST et la réouverture devient impossible, donc on le reconstruit.",
      },
      {
        t: "p",
        text: "Le 9 août, le client Go passe par défaut. Le jour même, retour arrière : le client JS reprend la main et le Go repart derrière un profil Docker. Le 16 août, le module discord/ est supprimé, avec tout le système de bascule, le service de compose, l'onglet d'administration et les cinq locales qui allaient avec. Un échec d'activation fait maintenant sortir le process, et Docker le relance.",
      },
      { t: "h", text: "Ce que disaient réellement les métriques" },
      {
        t: "p",
        text: "Une fois la passerelle stabilisée, j'ai profilé le cœur en production plutôt que de deviner. Relevé sur une fenêtre de 4993 secondes d'uptime :",
      },
      {
        t: "stats",
        items: [
          { value: "2,2 Go", label: "RSS", note: "heap 903 Mo" },
          { value: "352 ms", label: "lag event loop max", note: "p99 11,8 ms" },
          { value: "21 %", label: "d'un cœur CPU", note: "1061 s sur 4993 s" },
        ],
      },
      {
        t: "p",
        text: "L'hypothèse de départ était mauvaise. Je cherchais des lectures disque synchrones et du crypto bloquant ; il n'y en avait quasiment pas, et passer à Bun.file ou Bun.hash n'aurait rien gagné de mesurable. Le temps était ailleurs.",
      },
      {
        t: "table",
        head: ["Point chaud", "Mesure en production"],
        rows: [
          ["commande summon", "2648 ms de moyenne sur 58 appels"],
          ["read guild (Postgres)", "96 ms × 7916, soit 762 s cumulées"],
          ["guildMemberInformationUpdate", "40 295 s cumulées, artefact de mesure"],
          ["buttonClick", "1587 ms de moyenne"],
          ["structure:vote-period-check", "685 ms toutes les minutes"],
        ],
      },
      { t: "h", text: "Ce qui a été corrigé" },
      {
        t: "p",
        text: "Les 40 295 secondes de guildMemberInformationUpdate n'étaient pas du travail : le handler RabbitMQ attendait un debounce de trente secondes qui existait « au cas où d'autres informations arrivent ». Le rafraîchissement part désormais sans être attendu, ses erreurs journalisées, et la métrique se referme tout de suite.",
      },
      {
        t: "p",
        text: "Le RSS venait de caches sans plafond. Les entités guilde traînent leurs salons, leurs rôles et leurs emojis dans des Map qui ne rendaient jamais la mémoire ; les avatars Discord jamais rendus retenaient à eux seuls environ 2,7 Go de RSS par jour. Deux caches bornés en LRU, l'un pour les entités guilde, l'autre pour les buffers et images du chargeur d'assets, avec des plafonds très au dessus du working set actif pour que le taux de hit ne bouge pas.",
      },
      {
        t: "p",
        text: "summon, la commande la plus lente du jeu, composait jusqu'à vingt quatre frames dans une boucle await séquentielle. sharp encode sur le pool libuv, dimensionné à douze threads : la boucle n'en utilisait qu'un. Les trois boucles passent par une map concurrente bornée à six, l'ordre des frames restant garanti par construction puisque c'est lui qui définit le GIF.",
      },
      {
        t: "list",
        items: [
          "une quinzaine de N+1 supprimés d'un coup : crons de ferme, classements, snapshots quotidiens, autocomplétion de boutique, collections de familiers",
          "les statistiques de guilde agrégées en SQL au lieu d'être chargées entièrement en mémoire",
          "deux index manquants sur command_logs et players.last_time_activity, où sept count() partaient en full scan avec un p95 à 4,7 s",
          "les encodages canvas sortis du thread principal, et le verrou salon plus auteur ramené du message à la commande pour qu'une chaîne de commandes ne gèle plus le salon",
          "le trafic Redis applicatif basculé sur le client natif de Bun, qui parle RESP sans traverser la couche de compatibilité node:net",
          "les quantiles de latence Redis relabellisés par opération, avec des buckets qui commencent sous la milliseconde au lieu de cinq",
        ],
      },
      { t: "h", text: "Vingt crons pour une seule seconde" },
      {
        t: "p",
        text: "Sur quarante quatre tâches planifiées, vingt partageaient la seconde HH:00:00 et se disputaient le pool Prisma une fois par heure. Un décalage stable est maintenant dérivé du hash du couple module:job, borné sous la minute pour qu'aucune tâche ne sorte de la minute pour laquelle elle était planifiée. Au passage, la garde de ré-entrance couvrait trois jobs sur quarante quatre via des drapeaux écrits à la main : elle vaut désormais pour tous, et le fuseau UTC que plusieurs schedules documentaient en commentaire est enfin garanti par le code.",
      },
      {
        t: "p",
        text: "Autre boucle qui n'additionnait que des allers-retours réseau : le balayage de démarrage parcourait les 141 structures une par une, chacune avec son verrou Redis et sa transaction. Il pesait 3,5 s sur les 5,5 s qui séparent le lancement du process de la mise en service du serveur web.",
      },
      { t: "h", text: "Le poids des images" },
      {
        t: "p",
        text: "Le même mois, la migration vers Bun a été l'occasion de regarder les images Docker. Un chown -R des node_modules vivait dans son propre RUN, ce qui fait réécrire chaque fichier dans une nouvelle couche : le node_modules existait deux fois dans l'image. Bun installe par ailleurs les deux variantes libc des binaires natifs alors que l'image est glibc.",
      },
      {
        t: "table",
        head: ["Image", "Avant", "Après"],
        rows: [
          ["enderbot-core", "2,59 Go", "1,44 Go"],
          ["enderbot-web-dev", "1,6 Go", "899 Mo"],
          ["enderbot-web-preview", "898 Mo", "851 Mo"],
        ],
      },
      { t: "h", text: "Ce qui reste" },
      {
        t: "p",
        text: "read guild à 762 secondes cumulées est le prochain gros morceau : la lecture charge systématiquement salons, rôles et emojis, même quand l'appelant ne veut que le préfixe ou la langue. Un chemin « guilde nue » demande de trier les appelants un par un. buttonClick à 1587 ms est une métrique agrégée sur tous les boutons : il faut d'abord la labelliser par customId pour savoir lesquels sont lents.",
      },
      {
        t: "p",
        text: "La leçon qui vaut au delà d'Enderbot tient en deux lignes. Une réécriture ne devient raisonnable que si un contrat sérialisé stable permet de faire cohabiter l'ancien et le nouveau, avec un chemin de retour arrière qu'on emprunte vraiment. Et une passe de performance guidée par les métriques de production trouve autre chose que ce qu'on croyait chercher : ici, pas de disque bloqué, mais des caches sans plafond et un sleep attendu par erreur.",
      },
    ],
  },
  en: {
    title: "Enderbot: rewriting the Discord gateway in Go, then hunting milliseconds",
    excerpt:
      "Six weeks and two thousand commits to get discord.js out of production, replace the client with a Go binary speaking the same protobuf, then dig into the metrics for the 2.2 GB of RSS nobody had noticed.",
    body: [
      {
        t: "p",
        text: "Enderbot is a game played inside Discord: a TypeScript monorepo where an application core, a SvelteKit site and a gateway client talk protobuf over RabbitMQ, with Postgres, Redis and Prometheus behind them. The gateway client is the part holding the connection to Discord, absorbing events and pushing messages. It used to be discord.js, one Node process per shard. It no longer is.",
      },
      { t: "h", text: "Why discord.js had to go" },
      {
        t: "p",
        text: "One process per shard means one memory cache per shard, one heap per shard, and a homegrown watchdog to respawn the ones that drop. At sixteen shards, the client's memory bill rivalled the core's while doing nothing but relaying. The game logic lives elsewhere, so the gateway had no reason to stay in the same language as it.",
      },
      {
        t: "p",
        text: "The replacement is discord-go: a Go module built on disgo, a single process holding every shard, shard count resolved on its own from /gateway/bot. A hundred and twenty six Go files, roughly thirty thousand lines, and a cold start of about ninety seconds at sixteen shards, dictated by Discord's identify rate limit.",
      },
      { t: "h", text: "The wire contract as the fixed point" },
      {
        t: "p",
        text: "The rule that made the rewrite tractable: change nothing that crosses the network. Same protobuf messages on the client-to-core and core-to-client-{shardId} queues, same status-discord-* Redis keys, same enderbot_discord_* metrics. The core runs with not a single line changed, and the Grafana dashboards keep plotting the same series.",
      },
      {
        t: "p",
        text: "In practice the Go types are generated from the same .proto files as the TypeScript ones. Field numbers are the contract, never hand-edited.",
      },
      {
        t: "code",
        lang: "bash",
        text: "cd discord-go\n./gen-proto.sh        # shared/proto/**/*.proto -> internal/wire/\ngo build ./... && go test ./...",
      },
      {
        t: "note",
        text: "A stable serialized contract is what turns a rewrite into a part swap rather than an overhaul: both clients can run side by side and hand over without the rest of the system knowing which one answered.",
      },
      { t: "h", text: "Parity is about behaviour, not the API" },
      {
        t: "p",
        text: "The long part was not reproducing the calls, it was reproducing discord.js habits. A library that size carries unwritten decisions, and every one of them costs a production bug if you fail to replay it:",
      },
      {
        t: "list",
        items: [
          "permissions must ignore a timeout exactly the way discord.js does, otherwise a temporarily muted member loses rights they should keep",
          "the @everyone role travels with the member's roles, and counts every cached member",
          "channel and role positions are computed, not read as stored",
          "an animated avatar is served as .gif, and an attachment arriving without a name still has to get one",
          "direct messages get replies, autocomplete choice nameLocalizations get forwarded",
          "falling back to a plain edit only applies to an expired token, not to every error",
        ],
      },
      {
        t: "p",
        text: "The hand-written packages were brought to 94% coverage, and a dedicated adversarial review was spent hunting remaining parity gaps rather than reviewing style.",
      },
      { t: "h", text: "Switch, roll back, switch" },
      {
        t: "p",
        text: "Going to production was not a single switch. Both clients ran side by side, driven by a discord-client-active Redis flag, with cold standby on both sides: the process boots passive, polls the flag every two seconds, and activation recreates the disgo client entirely. Closing a disgo client deadlocks its REST buckets and reopening becomes impossible, so it gets rebuilt instead.",
      },
      {
        t: "p",
        text: "On 9 August the Go client became the default. It was rolled back the same day: the JS client took over and the Go one moved behind a Docker profile. On 16 August the discord/ module was deleted, along with the whole switching system, the compose service, the admin tab and the five locales that came with it. A failed activation now exits the process, and Docker restarts it.",
      },
      { t: "h", text: "What the metrics actually said" },
      {
        t: "p",
        text: "Once the gateway was stable, I profiled the core in production instead of guessing. Sampled over a 4993 second uptime window:",
      },
      {
        t: "stats",
        items: [
          { value: "2.2 GB", label: "RSS", note: "903 MB heap" },
          { value: "352 ms", label: "max event loop lag", note: "p99 11.8 ms" },
          { value: "21%", label: "of one CPU core", note: "1061 s out of 4993 s" },
        ],
      },
      {
        t: "p",
        text: "My starting hypothesis was wrong. I was looking for synchronous disk reads and blocking crypto; there was almost none, and moving to Bun.file or Bun.hash would have gained nothing measurable. The time was somewhere else.",
      },
      {
        t: "table",
        head: ["Hot spot", "Production measurement"],
        rows: [
          ["summon command", "2648 ms average over 58 calls"],
          ["read guild (Postgres)", "96 ms × 7916, i.e. 762 s cumulative"],
          ["guildMemberInformationUpdate", "40,295 s cumulative, a measurement artefact"],
          ["buttonClick", "1587 ms average"],
          ["structure:vote-period-check", "685 ms every minute"],
        ],
      },
      { t: "h", text: "What got fixed" },
      {
        t: "p",
        text: "Those 40,295 seconds on guildMemberInformationUpdate were not work: the RabbitMQ handler was awaiting a thirty second debounce that existed in case more information showed up. The refresh now fires without being awaited, with its errors logged, and the metric closes immediately.",
      },
      {
        t: "p",
        text: "The RSS came from unbounded caches. Guild entities drag their channels, roles and emojis into Maps that never gave memory back; Discord avatars that were never rendered retained roughly 2.7 GB of RSS per day on their own. Two LRU bounded caches, one for guild entities and one for the asset loader's buffers and images, with ceilings far above the active working set so the hit rate does not move.",
      },
      {
        t: "p",
        text: "summon, the slowest command in the game, composed up to twenty four frames in a sequential await loop. sharp encodes on the libuv pool, sized at twelve threads: the loop was using exactly one of them. All three loops now go through a concurrent map bounded at six, with frame order guaranteed by construction since that order is the GIF.",
      },
      {
        t: "list",
        items: [
          "about fifteen N+1 queries removed in one pass: farm crons, leaderboards, daily snapshots, shop autocomplete, pet collections",
          "guild statistics aggregated in SQL instead of being loaded wholesale into memory",
          "two missing indexes on command_logs and players.last_time_activity, where seven count() queries were full scanning at a 4.7 s p95",
          "canvas encoding moved off the main thread, and the channel plus author lock moved from the message to the command so a chain of commands no longer freezes the channel",
          "application Redis traffic moved to Bun's native client, which speaks RESP without going through the node:net compatibility layer",
          "Redis latency quantiles relabelled per operation, with buckets starting below the millisecond instead of at five",
        ],
      },
      { t: "h", text: "Twenty crons on a single second" },
      {
        t: "p",
        text: "Out of forty four scheduled jobs, twenty shared the HH:00:00 second and fought over the Prisma pool once an hour. A stable offset is now derived from the hash of the module:job pair, bounded below one minute so no job leaves the minute it was scheduled for. Along the way, the re-entrancy guard covered three jobs out of forty four through hand-written flags: it now applies to all of them, and the UTC timezone several schedules documented in a comment is finally enforced by code.",
      },
      {
        t: "p",
        text: "Another loop that only added up round trips: the boot sweep walked all 141 structures one by one, each with its own Redis lock and transaction. It accounted for 3.5 s of the 5.5 s between process launch and the web server accepting traffic.",
      },
      { t: "h", text: "Image weight" },
      {
        t: "p",
        text: "The same month, migrating to Bun was a good excuse to look at the Docker images. A chown -R on node_modules lived in its own RUN, which makes Docker rewrite every file into a new layer: node_modules existed twice in the image. Bun also installs both libc variants of native binaries while the image is glibc.",
      },
      {
        t: "table",
        head: ["Image", "Before", "After"],
        rows: [
          ["enderbot-core", "2.59 GB", "1.44 GB"],
          ["enderbot-web-dev", "1.6 GB", "899 MB"],
          ["enderbot-web-preview", "898 MB", "851 MB"],
        ],
      },
      { t: "h", text: "What is left" },
      {
        t: "p",
        text: "read guild at 762 cumulative seconds is the next big one: the read always loads channels, roles and emojis, even when the caller only wants the prefix or the language. A bare guild path means sorting through the callers one by one. buttonClick at 1587 ms is aggregated over every button: it has to be labelled per customId before anyone can tell which ones are slow.",
      },
      {
        t: "p",
        text: "The lesson beyond Enderbot fits in two lines. A rewrite only becomes reasonable when a stable serialized contract lets old and new coexist, with a rollback path you actually take. And a metrics-driven performance pass finds something other than what you thought you were looking for: here, no blocked disk, but unbounded caches and a sleep that was being awaited by mistake.",
      },
    ],
  },
};

export const posts: Post[] = [enderbotGateway];

export function postBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.meta.slug === slug);
}
