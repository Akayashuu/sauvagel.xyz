
import type { Diagram } from "./profile";
import type { PostIcon } from "./post-icons";

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string; icon?: PostIcon }

  | { t: "tldr"; items: { icon: PostIcon; title: string; text: string }[] }

  | { t: "facts"; items: { icon: PostIcon; value: string; label: string }[] }
  | {
      t: "compare";
      items: { icon: PostIcon; label: string; before: string; after: string; delta: string }[];
    }
  | { t: "list"; items: string[] }
  | { t: "stats"; items: { icon?: PostIcon; value: string; label: string; note?: string }[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | {
      t: "people";
      items: {
        name: string;
        handle: string;
        url: string;
        avatar: string;
        role: string;
        scope: string;
      }[];
    }
  | { t: "diagram"; caption: string; diagram: Diagram }
  | {
      t: "timeline";
      items: { date: string; title: string; text: string; tone?: "revert" | "ship" }[];
    }

  | {
      t: "bars";
      caption?: string;
      items: { label: string; value: number; display: string; note?: string }[];
    }
  | { t: "note"; text: string; icon?: PostIcon }
  | { t: "image"; src: string; alt: string; caption: string; width: number; height: number }
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
    readingMinutes: 16,
    tags: ["Go", "TypeScript", "Bun", "Discord", "Performance", "PostgreSQL"],
    project: "enderbot",
  },
  fr: {
    title: "Enderbot : la passerelle Discord réécrite en Go, puis la chasse aux millisecondes",
    excerpt:
      "Six semaines pour sortir discord.js de la production, remplacer le client par un binaire Go qui parle le même protobuf, faire passer le monorepo sous Bun, puis aller chercher dans les métriques les 2,2 Go de RSS que personne n'avait vus.",
    body: [
      {
        t: "p",
        text: "Enderbot est un jeu qui se joue dans Discord : un monorepo TypeScript où un cœur applicatif, un site SvelteKit et un client passerelle se parlent en protobuf par dessus RabbitMQ, avec Postgres, Redis et Prometheus derrière. Le client passerelle, c'est la partie qui tient la connexion à Discord, encaisse les évènements et pousse les messages. C'était historiquement du discord.js, un process Node par shard. Ça ne l'est plus.",
      },
      {
        t: "image",
        src: "/projects/enderbot.webp",
        alt: "Le site d'Enderbot, la partie SvelteKit du monorepo.",
        caption: "ender.gg, la face visible du monorepo : le cœur, le site et la passerelle partagent les mêmes files.",
        width: 1280,
        height: 800,
      },
      {
        t: "tldr",
        items: [
          {
            icon: "boxes",
            title: "Un process au lieu de seize",
            text: "Le client Discord passe de discord.js, un process Node par shard, à un binaire Go qui tient les seize shards à lui seul.",
          },
          {
            icon: "network",
            title: "Le contrat de fil n'a pas bougé",
            text: "Mêmes messages protobuf, mêmes clés Redis, mêmes métriques : le cœur applicatif tourne sans une ligne modifiée.",
          },
          {
            icon: "memory",
            title: "2,2 Go de RSS expliqués",
            text: "Des caches sans plafond retenaient environ 2,7 Go par jour, et une métrique à 40 295 s ne mesurait qu'un sleep attendu par erreur.",
          },
          {
            icon: "rollback",
            title: "Un retour arrière utilisé pour de vrai",
            text: "La bascule du 9 août a été annulée le jour même. Sept jours de correctifs plus tard, le client JS a pu être supprimé.",
          },
          {
            icon: "rocket",
            title: "Un étage de build en moins",
            text: "Le cœur n'est plus empaqueté : Bun exécute les sources, et le bundle de 2962 modules disparaît avec ses quatre bundlers.",
          },
          {
            icon: "flask",
            title: "Une CI qui teste enfin",
            text: "Le monorepo n'avait aucun job de test. Il en a deux, et 4196 tests passent à l'identique sous le nouveau runtime.",
          },
        ],
      },
      { t: "h", text: "Qui a fait quoi", icon: "split" },
      {
        t: "p",
        text: "Le travail décrit ici s'est joué à deux, sur deux terrains nettement séparés. La passerelle est entièrement l'œuvre d'EnderSpirit : le constat de départ, la proposition de repartir sur du Go, le choix de la bibliothèque, l'écriture du module, la bascule en production et jusqu'à la suppression du client JS. Je n'ai pas écrit une ligne du Go dont parle cet article, je le raconte depuis l'autre bout du monorepo. De mon côté j'ai pris le cœur : son runtime, sa mesure en production et les correctifs qui en sortent.",
      },
      {
        t: "people",
        items: [
          {
            name: "EnderSpirit",
            handle: "@EnderSpirit",
            url: "https://github.com/EnderSpirit",
            avatar: "/people/enderspirit.webp",
            role: "La passerelle et l'outillage",
            scope: "Le constat, la proposition de réécrire en Go, puis la réécriture entière du client Discord, du premier paquet à la suppression du client JS. Aussi la cure de dépendances du monorepo, le passage à TypeScript 7 et Vite 8, et le dégraissage des images Docker.",
          },
          {
            name: "Léo Sauvage",
            handle: "@Akayashuu",
            url: "https://github.com/Akayashuu",
            avatar: "/people/akayashuu.webp",
            role: "Le cœur et sa mesure",
            scope: "Migration du monorepo vers Bun, profil de performance en production et les correctifs qui en sortent : N+1, caches bornés, encodage d'images, crons, index Postgres, observabilité Redis.",
          },
        ],
      },
      { t: "h", text: "Pourquoi sortir discord.js", icon: "boxes" },
      {
        t: "p",
        text: "Le raisonnement est celui d'EnderSpirit, qui tenait la passerelle et voyait la facture de près. Un process par shard, c'est un cache mémoire par shard, un heap par shard et un watchdog maison pour relancer ceux qui décrochent. À seize shards, la facture mémoire du client rivalisait avec celle du cœur alors qu'il ne fait que du relais. Le calcul métier vit ailleurs, donc la passerelle n'avait aucune raison de rester dans le même langage que lui.",
      },
      {
        t: "p",
        text: "Le remplaçant, écrit par EnderSpirit, s'appelle discord-go : un module Go bâti sur disgo, un seul process qui tient tous les shards, le nombre de shards résolu tout seul depuis /gateway/bot. Cent vingt six fichiers Go, une trentaine de milliers de lignes, et un démarrage à froid d'environ quatre vingt dix secondes à seize shards, imposé par la limite d'identify de Discord.",
      },
      {
        t: "facts",
        items: [
          { icon: "file", value: "126", label: "fichiers Go" },
          { icon: "layers", value: "30 257", label: "lignes écrites" },
          { icon: "flask", value: "94 %", label: "de couverture" },
          { icon: "server", value: "16", label: "shards, un seul process" },
          { icon: "clock", value: "~90 s", label: "de démarrage à froid" },
          { icon: "shield", value: "0", label: "ligne changée dans le cœur" },
        ],
      },
      { t: "h", text: "Le contrat de fil comme point fixe", icon: "network" },
      {
        t: "p",
        text: "La règle qu'il s'est fixée, et qui a rendu la réécriture tenable : ne rien changer de ce qui traverse le réseau. Les mêmes messages protobuf sur les files client-to-core et core-to-client-{shardId}, les mêmes clés Redis status-discord-*, les mêmes métriques enderbot_discord_*. Le cœur tourne sans une ligne modifiée, et les tableaux de bord Grafana continuent d'afficher les mêmes séries.",
      },
      {
        t: "p",
        text: "Concrètement, les types Go sont générés depuis les mêmes .proto que le TypeScript. Les numéros de champ sont le contrat, jamais édités à la main.",
      },
      {
        t: "diagram",
        caption:
          "Le client est la seule pièce remplacée : tout ce qui traverse le réseau reste identique.",
        diagram: {
          columns: [
            { title: "Discord", nodes: [{ id: "gw", label: "Gateway", note: "15 shards" }] },
            {
              title: "Client passerelle",
              nodes: [
                { id: "go", label: "discord-go", note: "1 process, disgo", accent: true },
                { id: "js", label: "discord.js", note: "1 process par shard, retiré" },
              ],
            },
            {
              title: "Contrat de fil",
              nodes: [
                { id: "mq", label: "RabbitMQ", note: "protobuf", accent: true },
                { id: "redis", label: "Redis", note: "status-discord-*" },
                { id: "prom", label: "Prometheus", note: "enderbot_discord_*" },
              ],
            },
            {
              title: "Applicatif",
              nodes: [
                { id: "core", label: "core", note: "TypeScript, Bun", accent: true },
                { id: "pg", label: "PostgreSQL", note: "Prisma" },
              ],
            },
          ],
          edges: [
            { from: "gw", to: "go", label: "évènements" },
            { from: "go", to: "mq", label: "client-to-core" },
            { from: "go", to: "redis", label: "état" },
            { from: "go", to: "prom", label: "métriques" },
            { from: "mq", to: "core", label: "core-to-client" },
            { from: "core", to: "pg" },
          ],
        },
      },
      {
        t: "code",
        lang: "bash",
        text: "cd discord-go\n./gen-proto.sh        # shared/proto/**/*.proto -> internal/wire/\ngo build ./... && go test ./...",
      },
      {
        t: "note",
        icon: "network",
        text: "Un contrat sérialisé stable, c'est ce qui transforme une réécriture en remplacement de pièce plutôt qu'en refonte : les deux clients peuvent tourner en parallèle et se relayer sans que le reste du système sache lequel répond.",
      },
      { t: "h", text: "La parité se joue sur le comportement, pas sur l'API", icon: "shield" },
      {
        t: "p",
        text: "La partie longue n'a pas été de reproduire les appels, mais les habitudes de discord.js. Elles ont occupé une journée entière de correctifs, le 11 août, tous signés EnderSpirit. Une bibliothèque de ce calibre transporte des décisions non écrites, et chacune se paie en bug de production si on ne la rejoue pas :",
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
      { t: "h", text: "Bascule, retour arrière, bascule", icon: "rollback" },
      {
        t: "p",
        text: "Le passage en production n'a pas été un interrupteur, et il a été piloté du même côté que le reste de la passerelle. Les deux clients ont tourné en double, pilotés par un drapeau Redis discord-client-active, avec un mode veille froide des deux côtés : le process boote passif, sonde le drapeau toutes les deux secondes, et l'activation recrée entièrement le client disgo. Fermer un client disgo bloque ses seaux REST et la réouverture devient impossible, donc on le reconstruit.",
      },
      {
        t: "timeline",
        items: [
          {
            date: "9 août",
            title: "Le client Go passe par défaut",
            text: "discord-go entre dans le compose de base, le client JS recule derrière un profil Docker prévu pour le retour arrière.",
            tone: "ship",
          },
          {
            date: "9 août",
            title: "Retour arrière le jour même",
            text: "Le client JS reprend la main. Le chemin de repli n'était pas décoratif, il a servi en quelques heures.",
            tone: "revert",
          },
          {
            date: "10 au 13 août",
            title: "Veille froide et parité",
            text: "Drapeau Redis discord-client-active des deux côtés, sonde toutes les deux secondes, et la longue série de correctifs de comportement.",
          },
          {
            date: "16 août",
            title: "Le client JS est supprimé",
            text: "Avec lui partent le système de bascule, le service de compose, l'onglet d'administration et ses cinq locales.",
            tone: "ship",
          },
        ],
      },
      {
        t: "diagram",
        caption:
          "Les deux clients bootent passifs et sondent le même drapeau : basculer, c'est écrire une clé Redis.",
        diagram: {
          columns: [
            {
              title: "Décision",
              nodes: [
                { id: "flag", label: "drapeau Redis", note: "discord-client-active", accent: true },
                { id: "probe", label: "sonde", note: "toutes les 2 s" },
              ],
            },
            {
              title: "Clients",
              nodes: [
                { id: "sgo", label: "discord-go", note: "actif, 15 shards", accent: true },
                { id: "sjs", label: "discord.js", note: "veille froide" },
              ],
            },
            {
              title: "Activation",
              nodes: [{ id: "build", label: "client disgo recréé", note: "jamais réouvert" }],
            },
            {
              title: "Trafic",
              nodes: [{ id: "bus", label: "RabbitMQ", note: "client-to-core", accent: true }],
            },
          ],
          edges: [
            { from: "probe", to: "flag", label: "lecture" },
            { from: "flag", to: "sgo", label: "actif" },
            { from: "flag", to: "sjs", label: "passif" },
            { from: "sgo", to: "build", label: "reconstruction" },
            { from: "build", to: "bus" },
          ],
        },
      },
      {
        t: "p",
        text: "Depuis, un échec d'activation fait sortir le process, et Docker le relance.",
      },
      { t: "h", text: "Pourquoi Bun, et ce que le passage a cassé", icon: "rocket" },
      {
        t: "p",
        text: "Pendant qu'EnderSpirit refaisait la passerelle, j'ai attaqué le runtime du cœur. La raison n'est pas la mode, c'est une couche entière devenue inutile : le cœur était livré en bundle esbuild, un dist/out.js de 2962 modules reconstruit à chaque changement, et trois autres bundlers vivaient à côté pour la CLI de scrap, l'export du wiki et fakecord. Bun lit le TypeScript directement, donc tout cet étage disparaît. Une trace d'erreur pointe de nouveau un fichier source plutôt qu'une ligne dans un bundle.",
      },
      {
        t: "facts",
        items: [
          { icon: "layers", value: "2962", label: "modules dans le bundle supprimé" },
          { icon: "package", value: "4", label: "bundlers retirés" },
          { icon: "flask", value: "4196", label: "tests, identiques à Node" },
          { icon: "shield", value: "7 j", label: "de quarantaine sur les dépendances" },
          { icon: "container", value: "0", label: "Node dans les images" },
          { icon: "git", value: "2", label: "jobs de test qui n'existaient pas" },
        ],
      },
      {
        t: "p",
        text: "Ce qui a rendu la bascule possible, c'est la migration canvas faite plus tôt : toutes les dépendances natives qui restaient sont du N-API avec binaires préconstruits, que Bun charge sans y toucher, et le seul appel Node délicat du code, AsyncLocalStorage dans le logger, fonctionne. bun install remplace pnpm, et le blocage d'approvisionnement est reporté tel quel dans bunfig.toml : sept jours de quarantaine avant qu'une version publiée soit installable. Le régime des scripts d'installation se resserre au passage, puisque pnpm les autorisait tous en bloc dans les images alors que Bun n'exécute que ceux des quatre paquets nommés explicitement.",
      },
      {
        t: "p",
        text: "Le prix se paie sur les différences de sémantique, pas sur les performances. Cinq pièges, tous trouvés en une journée :",
      },
      {
        t: "list",
        items: [
          "useDefineForClassFields : tsc le déduit à false, Bun le suppose à true. Un champ initialisé depuis une propriété de constructeur voyait donc undefined, et toutes les commandes liées à une guilde levaient. L'option est maintenant écrite noir sur blanc.",
          "un npx prettier au démarrage du générateur de clés de langue, sur un fichier que l'API prettier venait de formater deux lignes plus haut. Redondant, et introuvable dans une image Bun.",
          "bun --watch redémarre sur toute écriture dans l'arbre surveillé : les générateurs qui réécrivaient des octets identiques provoquaient soixante démarrages en trois minutes. Ils comparent avant d'écrire, et le fichier de log est sorti de l'arbre.",
          "zod sous vitest : le runner de modules renvoyait undefined pour le binding nommé, ce qui cassait les 95 fichiers qui l'importent ainsi. Le paquet est inliné dans la config vitest.",
          "better-sqlite3 n'est pas seulement à recompiler, Bun l'intercepte et lève. fakecord passe à bun:sqlite, dont les génériques, l'absence de pragma et le null au lieu de undefined se rattrapent aux trois getters concernés.",
        ],
      },
      {
        t: "p",
        text: "Ce que ça donne une fois posé : plus aucune image ne contient Node, l'étage de production du cœur se réduit à une installation et une copie des sources, et le réglage de taille de heap disparaît puisque JSC se dimensionne sur la RAM disponible. La CI tourne sous Bun et a gagné deux jobs de test qu'elle n'avait jamais eus, ce qui explique qu'une assertion sensible à l'ordre ait pu pourrir sans que personne le voie. Un script de garde refuse désormais tout retour de Node : shebang, appel à un gestionnaire de paquets, image de base ou action de CI.",
      },
      {
        t: "note",
        icon: "scale",
        text: "Tout ne migre pas pour autant. sharp reste : Bun.Image ne sait redimensionner qu'en fill ou inside, sans composition ni accès aux pixels bruts ni décodage multi-frame, donc ni le compositing animé du summon ni l'extraction de frames de GIF ne s'y expriment. Le trafic Redis applicatif, lui, est bien passé sur le client natif de Bun, qui parle RESP sans traverser la couche de compatibilité node:net.",
      },
      { t: "h", text: "Ce que disaient réellement les métriques", icon: "gauge" },
      {
        t: "p",
        text: "Une fois la passerelle stabilisée, c'est mon terrain qui passe à la question. J'ai profilé le cœur en production plutôt que de deviner. Relevé sur une fenêtre de 4993 secondes d'uptime :",
      },
      {
        t: "stats",
        items: [
          { icon: "memory", value: "2,2 Go", label: "RSS", note: "heap 903 Mo" },
          { icon: "timer", value: "352 ms", label: "lag event loop max", note: "p99 11,8 ms" },
          { icon: "cpu", value: "21 %", label: "d'un cœur CPU", note: "1061 s sur 4993 s" },
        ],
      },
      {
        t: "p",
        text: "L'hypothèse de départ était mauvaise. Je cherchais des lectures disque synchrones et du crypto bloquant ; il n'y en avait quasiment pas, et passer à Bun.file ou Bun.hash n'aurait rien gagné de mesurable. Le temps était ailleurs.",
      },
      {
        t: "bars",
        caption: "Temps cumulé par point chaud, sur la même fenêtre de 4993 s.",
        items: [
          { label: "guildMemberInformationUpdate", value: 40295, display: "40 295 s", note: "un sommeil de 30 s attendu par le handler" },
          { label: "read guild", value: 762, display: "762 s", note: "96 ms × 7916 appels" },
          { label: "commande summon", value: 154, display: "153,6 s", note: "2648 ms de moyenne sur 58 appels" },
          { label: "structure:vote-period-check", value: 41, display: "685 ms/min", note: "un verrou et une transaction par guilde" },
        ],
      },

      { t: "h", text: "Ce qui a été corrigé", icon: "zap" },
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
      { t: "h", text: "Vingt crons pour une seule seconde", icon: "timer" },
      {
        t: "facts",
        items: [
          { icon: "repeat", value: "44", label: "tâches planifiées" },
          { icon: "warn", value: "20", label: "sur la même seconde" },
          { icon: "shield", value: "3", label: "protégées de la ré-entrance" },
          { icon: "clock", value: "3,5 s", label: "sur 5,5 s de démarrage" },
        ],
      },
      {
        t: "p",
        text: "Sur quarante quatre tâches planifiées, vingt partageaient la seconde HH:00:00 et se disputaient le pool Prisma une fois par heure. Un décalage stable est maintenant dérivé du hash du couple module:job, borné sous la minute pour qu'aucune tâche ne sorte de la minute pour laquelle elle était planifiée. Au passage, la garde de ré-entrance couvrait trois jobs sur quarante quatre via des drapeaux écrits à la main : elle vaut désormais pour tous, et le fuseau UTC que plusieurs schedules documentaient en commentaire est enfin garanti par le code.",
      },
      {
        t: "diagram",
        caption:
          "Le décalage est dérivé du hash du job : il est stable d'un redémarrage à l'autre, sans table à tenir.",
        diagram: {
          columns: [
            {
              title: "Planifié",
              nodes: [
                { id: "jobs", label: "44 tâches", note: "20 à HH:00:00" },
                { id: "sweep", label: "balayage de boot", note: "141 structures" },
              ],
            },
            {
              title: "Étalement",
              nodes: [
                { id: "hash", label: "hash(module:job)", note: "décalage < 1 min", accent: true },
                { id: "guard", label: "garde de ré-entrance", note: "44 jobs sur 44" },
              ],
            },
            {
              title: "Ressource",
              nodes: [{ id: "pool", label: "pool Prisma", note: "PostgreSQL", accent: true }],
            },
            {
              title: "Effet",
              nodes: [
                { id: "flat", label: "charge étalée", note: "plus de pic horaire", accent: true },
                { id: "boot", label: "démarrage", note: "3,5 s repris sur 5,5 s" },
              ],
            },
          ],
          edges: [
            { from: "jobs", to: "hash", label: "décalage" },
            { from: "jobs", to: "guard" },
            { from: "hash", to: "pool" },
            { from: "guard", to: "pool" },
            { from: "pool", to: "flat" },
            { from: "sweep", to: "boot", label: "regroupé" },
          ],
        },
      },
      {
        t: "p",
        text: "Autre boucle qui n'additionnait que des allers-retours réseau : le balayage de démarrage parcourait les 141 structures une par une, chacune avec son verrou Redis et sa transaction. Il pesait 3,5 s sur les 5,5 s qui séparent le lancement du process de la mise en service du serveur web.",
      },
      { t: "h", text: "Le poids des images", icon: "container" },
      {
        t: "p",
        text: "Pendant que je faisais passer le monorepo sous Bun, EnderSpirit s'attaquait aux images Docker : base slim, installations filtrées par service, séparation build et runtime, polices Noto dégraissées. Puis les deux couches qui coûtaient le plus cher. Un chown -R des node_modules vivait dans son propre RUN, ce qui fait réécrire chaque fichier dans une nouvelle couche : le node_modules existait deux fois dans l'image. Bun installe par ailleurs les deux variantes libc des binaires natifs alors que l'image est glibc.",
      },
      {
        t: "compare",
        items: [
          { icon: "container", label: "enderbot-core", before: "2,59 Go", after: "1,44 Go", delta: "-44 %" },
          { icon: "container", label: "enderbot-web-dev", before: "1,6 Go", after: "899 Mo", delta: "-44 %" },
          { icon: "container", label: "enderbot-web-preview", before: "898 Mo", after: "851 Mo", delta: "-5 %" },
        ],
      },

      {
        t: "p",
        text: "Le mois a aussi été celui d'une remise à plat de l'outillage, côté EnderSpirit : montée sur le TypeScript 7 natif et sur Vite 8, dépendances mortes évacuées, et un plugin de lint maison branché pour traquer le code sans intention.",
      },
      {
        t: "facts",
        items: [
          { icon: "zap", value: "7×", label: "vérification de types plus rapide" },
          { icon: "rocket", value: "2×", label: "build du site plus rapide" },
          { icon: "package", value: "45", label: "dépendances mortes retirées" },
          { icon: "down", value: "3678", label: "défauts de lint résorbés" },
        ],
      },
      { t: "h", text: "Ce que la production a mesuré", icon: "gauge" },
      {
        t: "p",
        text: "Les chiffres précédents viennent d'un profil ponctuel. Le Prometheus de production garde quinze jours, ce qui couvre exactement les trois bascules : la passerelle Go qui prend les quinze shards le 13 août, la suppression du client JS le 16, et le passage à Bun dans la nuit du 22. La charge n'a pas bougé sur la fenêtre, environ 15 490 serveurs Discord, donc l'avant et l'après se comparent honnêtement.",
      },
      {
        t: "compare",
        items: [
          { icon: "boxes", label: "processus de passerelle", before: "16", after: "1", delta: "un seul" },
          { icon: "memory", label: "mémoire résidente passerelle", before: "4,3 à 9,0 Go", after: "1,0 à 1,6 Go", delta: "4x moins" },
          { icon: "server", label: "mémoire de la machine", before: "10 à 16 Go", after: "7,5 à 10,7 Go", delta: "plafond tenu" },
          { icon: "network", label: "latence WebSocket Discord", before: "106 ms", after: "106 ms", delta: "inchangée" },
        ],
      },
      {
        t: "note",
        icon: "cpu",
        text: "Le gain n'est pas gratuit. Le CPU de la machine est monté d'environ 8 % à environ 13 % : un processus Go qui tient tout le cache travaille en continu là où seize processus Node se partageaient un état découpé. La ressource contrainte était la mémoire, pas le CPU, donc l'échange valait le coup.",
      },
      {
        t: "p",
        text: "Le passage à Bun se lit tout aussi nettement sur le cœur, redémarré en Bun 1.4.0 le 22 août au matin :",
      },
      {
        t: "compare",
        items: [
          { icon: "memory", label: "RSS du cœur", before: "4,5 à 5,7 Go", after: "2,4 à 3,8 Go", delta: "40 % de moins" },
          { icon: "timer", label: "lag event loop p99", before: "11 à 16 ms", after: "6 à 9 ms", delta: "divisé par deux" },
          { icon: "gauge", label: "p95 des commandes", before: "1,94 s", after: "1,44 s", delta: "500 ms" },
          { icon: "cpu", label: "CPU du cœur", before: "0,33 cœur", after: "0,35 cœur", delta: "stable" },
        ],
      },
      {
        t: "p",
        text: "Le p95 des commandes reste haut, et c'est attendu : il inclut les allers et retours vers Discord ainsi que les attentes volontaires de certains handlers. Ce qui compte, c'est que la même charge passe maintenant avec deux gigaoctets de moins et un event loop deux fois plus calme.",
      },

      { t: "h", text: "Ce qui reste", icon: "activity" },
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
      "Six weeks to get discord.js out of production, replace the client with a Go binary speaking the same protobuf, move the monorepo onto Bun, then dig into the metrics for the 2.2 GB of RSS nobody had noticed.",
    body: [
      {
        t: "p",
        text: "Enderbot is a game played inside Discord: a TypeScript monorepo where an application core, a SvelteKit site and a gateway client talk protobuf over RabbitMQ, with Postgres, Redis and Prometheus behind them. The gateway client is the part holding the connection to Discord, absorbing events and pushing messages. It used to be discord.js, one Node process per shard. It no longer is.",
      },
      {
        t: "image",
        src: "/projects/enderbot.webp",
        alt: "The Enderbot website, the SvelteKit part of the monorepo.",
        caption: "ender.gg, the visible face of the monorepo: core, site and gateway share the same queues.",
        width: 1280,
        height: 800,
      },
      {
        t: "tldr",
        items: [
          {
            icon: "boxes",
            title: "One process instead of sixteen",
            text: "The Discord client goes from discord.js, one Node process per shard, to a Go binary holding all sixteen shards on its own.",
          },
          {
            icon: "network",
            title: "The wire contract never moved",
            text: "Same protobuf messages, same Redis keys, same metrics: the application core runs with not a single line changed.",
          },
          {
            icon: "memory",
            title: "2.2 GB of RSS accounted for",
            text: "Unbounded caches were retaining about 2.7 GB a day, and a metric reading 40,295 s was only measuring an awaited sleep.",
          },
          {
            icon: "rollback",
            title: "A rollback that was actually used",
            text: "The 9 August switch was undone the same day. Seven days of fixes later, the JS client could be deleted.",
          },
          {
            icon: "rocket",
            title: "One build stage fewer",
            text: "The core is no longer bundled: Bun runs the sources, and the 2962 module bundle goes away with its four bundlers.",
          },
          {
            icon: "flask",
            title: "CI that finally tests",
            text: "The monorepo had no test job at all. It now has two, and 4196 tests pass unchanged on the new runtime.",
          },
        ],
      },
      { t: "h", text: "Who did what", icon: "split" },
      {
        t: "p",
        text: "The work described here happened between two people, on two clearly separated fronts. The gateway is entirely EnderSpirit's work: the initial diagnosis, the proposal to start over in Go, the choice of library, writing the module, the production cutover, all the way to deleting the JS client. I did not write a line of the Go this article talks about, I am telling it from the other end of the monorepo. My side was the core: its runtime, its measurement in production and the fixes that came out of it.",
      },
      {
        t: "people",
        items: [
          {
            name: "EnderSpirit",
            handle: "@EnderSpirit",
            url: "https://github.com/EnderSpirit",
            avatar: "/people/enderspirit.webp",
            role: "The gateway and the tooling",
            scope: "The diagnosis, the proposal to rewrite in Go, then the entire rewrite of the Discord client, from the first package to deleting the JS one. Also the monorepo dependency cleanup, the move to TypeScript 7 and Vite 8, and slimming down the Docker images.",
          },
          {
            name: "Léo Sauvage",
            handle: "@Akayashuu",
            url: "https://github.com/Akayashuu",
            avatar: "/people/akayashuu.webp",
            role: "The core and its measurement",
            scope: "Migrating the monorepo to Bun, profiling performance in production and the fixes that came out of it: N+1 queries, bounded caches, image encoding, crons, Postgres indexes, Redis observability.",
          },
        ],
      },
      { t: "h", text: "Why discord.js had to go", icon: "boxes" },
      {
        t: "p",
        text: "The reasoning is EnderSpirit's, coming from the person holding the gateway and watching the bill up close. One process per shard means one memory cache per shard, one heap per shard, and a homegrown watchdog to respawn the ones that drop. At sixteen shards, the client's memory bill rivalled the core's while doing nothing but relaying. The game logic lives elsewhere, so the gateway had no reason to stay in the same language as it.",
      },
      {
        t: "p",
        text: "The replacement, written by EnderSpirit, is discord-go: a Go module built on disgo, a single process holding every shard, shard count resolved on its own from /gateway/bot. A hundred and twenty six Go files, roughly thirty thousand lines, and a cold start of about ninety seconds at sixteen shards, dictated by Discord's identify rate limit.",
      },
      {
        t: "facts",
        items: [
          { icon: "file", value: "126", label: "Go files" },
          { icon: "layers", value: "30,257", label: "lines written" },
          { icon: "flask", value: "94%", label: "test coverage" },
          { icon: "server", value: "16", label: "shards, one process" },
          { icon: "clock", value: "~90 s", label: "cold start" },
          { icon: "shield", value: "0", label: "lines changed in the core" },
        ],
      },
      { t: "h", text: "The wire contract as the fixed point", icon: "network" },
      {
        t: "p",
        text: "The rule he set himself, and what made the rewrite tractable: change nothing that crosses the network. Same protobuf messages on the client-to-core and core-to-client-{shardId} queues, same status-discord-* Redis keys, same enderbot_discord_* metrics. The core runs with not a single line changed, and the Grafana dashboards keep plotting the same series.",
      },
      {
        t: "p",
        text: "In practice the Go types are generated from the same .proto files as the TypeScript ones. Field numbers are the contract, never hand-edited.",
      },
      {
        t: "diagram",
        caption:
          "The client is the only part swapped: everything crossing the network stays identical.",
        diagram: {
          columns: [
            { title: "Discord", nodes: [{ id: "gw", label: "Gateway", note: "15 shards" }] },
            {
              title: "Gateway client",
              nodes: [
                { id: "go", label: "discord-go", note: "1 process, disgo", accent: true },
                { id: "js", label: "discord.js", note: "1 process per shard, retired" },
              ],
            },
            {
              title: "Wire contract",
              nodes: [
                { id: "mq", label: "RabbitMQ", note: "protobuf", accent: true },
                { id: "redis", label: "Redis", note: "status-discord-*" },
                { id: "prom", label: "Prometheus", note: "enderbot_discord_*" },
              ],
            },
            {
              title: "Application",
              nodes: [
                { id: "core", label: "core", note: "TypeScript, Bun", accent: true },
                { id: "pg", label: "PostgreSQL", note: "Prisma" },
              ],
            },
          ],
          edges: [
            { from: "gw", to: "go", label: "events" },
            { from: "go", to: "mq", label: "client-to-core" },
            { from: "go", to: "redis", label: "state" },
            { from: "go", to: "prom", label: "metrics" },
            { from: "mq", to: "core", label: "core-to-client" },
            { from: "core", to: "pg" },
          ],
        },
      },
      {
        t: "code",
        lang: "bash",
        text: "cd discord-go\n./gen-proto.sh        # shared/proto/**/*.proto -> internal/wire/\ngo build ./... && go test ./...",
      },
      {
        t: "note",
        icon: "network",
        text: "A stable serialized contract is what turns a rewrite into a part swap rather than an overhaul: both clients can run side by side and hand over without the rest of the system knowing which one answered.",
      },
      { t: "h", text: "Parity is about behaviour, not the API", icon: "shield" },
      {
        t: "p",
        text: "The long part was not reproducing the calls, it was reproducing discord.js habits. They took up a full day of fixes on 11 August, every one of them signed EnderSpirit. A library that size carries unwritten decisions, and every one of them costs a production bug if you fail to replay it:",
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
      { t: "h", text: "Switch, roll back, switch", icon: "rollback" },
      {
        t: "p",
        text: "Going to production was not a single switch, and it was driven from the same side as the rest of the gateway. Both clients ran side by side, driven by a discord-client-active Redis flag, with cold standby on both sides: the process boots passive, polls the flag every two seconds, and activation recreates the disgo client entirely. Closing a disgo client deadlocks its REST buckets and reopening becomes impossible, so it gets rebuilt instead.",
      },
      {
        t: "timeline",
        items: [
          {
            date: "9 August",
            title: "The Go client becomes the default",
            text: "discord-go enters the base compose file, the JS client steps back behind a Docker profile kept for rollback.",
            tone: "ship",
          },
          {
            date: "9 August",
            title: "Rolled back the same day",
            text: "The JS client takes over again. The fallback path was not decorative, it was used within hours.",
            tone: "revert",
          },
          {
            date: "10 to 13 August",
            title: "Cold standby and parity",
            text: "A discord-client-active Redis flag on both sides, polled every two seconds, and the long run of behaviour fixes.",
          },
          {
            date: "16 August",
            title: "The JS client is deleted",
            text: "It takes the switching system, the compose service, the admin tab and its five locales with it.",
            tone: "ship",
          },
        ],
      },
      {
        t: "diagram",
        caption:
          "Both clients boot passive and poll the same flag: switching means writing one Redis key.",
        diagram: {
          columns: [
            {
              title: "Decision",
              nodes: [
                { id: "flag", label: "Redis flag", note: "discord-client-active", accent: true },
                { id: "probe", label: "probe", note: "every 2 s" },
              ],
            },
            {
              title: "Clients",
              nodes: [
                { id: "sgo", label: "discord-go", note: "active, 15 shards", accent: true },
                { id: "sjs", label: "discord.js", note: "cold standby" },
              ],
            },
            {
              title: "Activation",
              nodes: [{ id: "build", label: "disgo client rebuilt", note: "never reopened" }],
            },
            {
              title: "Traffic",
              nodes: [{ id: "bus", label: "RabbitMQ", note: "client-to-core", accent: true }],
            },
          ],
          edges: [
            { from: "probe", to: "flag", label: "read" },
            { from: "flag", to: "sgo", label: "active" },
            { from: "flag", to: "sjs", label: "passive" },
            { from: "sgo", to: "build", label: "rebuild" },
            { from: "build", to: "bus" },
          ],
        },
      },
      {
        t: "p",
        text: "Since then, a failed activation exits the process and Docker restarts it.",
      },
      { t: "h", text: "Why Bun, and what the move broke", icon: "rocket" },
      {
        t: "p",
        text: "While EnderSpirit was redoing the gateway, I went after the core's runtime. The reason was not fashion, it was a whole layer that had stopped earning its keep: the core shipped as an esbuild bundle, a dist/out.js of 2962 modules rebuilt on every change, with three more bundlers living alongside it for the scrap CLI, the wiki export and fakecord. Bun reads TypeScript directly, so that entire stage disappears. A stack trace points at a source file again rather than a line inside a bundle.",
      },
      {
        t: "facts",
        items: [
          { icon: "layers", value: "2962", label: "modules in the deleted bundle" },
          { icon: "package", value: "4", label: "bundlers removed" },
          { icon: "flask", value: "4196", label: "tests, same as on Node" },
          { icon: "shield", value: "7 d", label: "quarantine on dependencies" },
          { icon: "container", value: "0", label: "Node left in the images" },
          { icon: "git", value: "2", label: "test jobs that never existed" },
        ],
      },
      {
        t: "p",
        text: "What made the switch possible was the earlier canvas migration: every native dependency left is N-API with prebuilt binaries, which Bun loads untouched, and the one delicate Node API in the codebase, AsyncLocalStorage in the logger, works. bun install replaces pnpm, and the supply chain hold moves into bunfig.toml verbatim: seven days of quarantine before a published version can be installed. Install scripts get stricter on the way, since pnpm waved them all through in the Docker installs while Bun runs only those of the four packages named explicitly.",
      },
      {
        t: "p",
        text: "The price is paid in semantics, not in performance. Five traps, all found in a single day:",
      },
      {
        t: "list",
        items: [
          "useDefineForClassFields: tsc infers false, Bun assumes true. A field initialised from a constructor parameter property therefore saw undefined, and every guild-scoped command threw. The option is now stated explicitly.",
          "an npx prettier at boot in the lang-key generator, on a file the prettier API had formatted and written two lines above. Pure redundancy, and missing from a Bun image.",
          "bun --watch restarts on any write inside the watched tree: generators rewriting identical bytes caused sixty boots in three minutes. They compare before writing, and the log file moved out of the tree.",
          "zod under vitest: the module runner returned undefined for the named binding, which broke the 95 files importing it that way. The package is inlined in the vitest config.",
          "better-sqlite3 is not merely a rebuild, Bun intercepts it and throws. fakecord moved to bun:sqlite, whose generics, missing pragma and null instead of undefined are normalised at the three getters that promise undefined.",
        ],
      },
      {
        t: "p",
        text: "Where it landed: no image contains Node any more, the core's production stage shrinks to an install plus a copy of the sources, and the heap size flag is gone since JSC sizes itself from available RAM. CI runs on Bun and gained the two test jobs it never had, which is exactly how an order-sensitive assertion had been able to rot unnoticed. A guard script now refuses any return of Node: shebang, package manager call, base image or CI action.",
      },
      {
        t: "note",
        icon: "scale",
        text: "Not everything migrates. sharp stays: Bun.Image only resizes with fill or inside, with no compositing, no raw pixel access and no multi-frame decoding, so neither the animated summon compositing nor the GIF frame extraction can be expressed with it. Application Redis traffic did move to Bun's native client, which speaks RESP without going through the node:net compatibility layer.",
      },
      { t: "h", text: "What the metrics actually said", icon: "gauge" },
      {
        t: "p",
        text: "Once the gateway was stable, my own side came under the microscope. I profiled the core in production instead of guessing. Sampled over a 4993 second uptime window:",
      },
      {
        t: "stats",
        items: [
          { icon: "memory", value: "2.2 GB", label: "RSS", note: "903 MB heap" },
          { icon: "timer", value: "352 ms", label: "max event loop lag", note: "p99 11.8 ms" },
          { icon: "cpu", value: "21%", label: "of one CPU core", note: "1061 s out of 4993 s" },
        ],
      },
      {
        t: "p",
        text: "My starting hypothesis was wrong. I was looking for synchronous disk reads and blocking crypto; there was almost none, and moving to Bun.file or Bun.hash would have gained nothing measurable. The time was somewhere else.",
      },
      {
        t: "bars",
        caption: "Cumulative time per hot spot, over the same 4993 s window.",
        items: [
          { label: "guildMemberInformationUpdate", value: 40295, display: "40,295 s", note: "a 30 s sleep the handler was awaiting" },
          { label: "read guild", value: 762, display: "762 s", note: "96 ms × 7916 calls" },
          { label: "summon command", value: 154, display: "153.6 s", note: "2648 ms average over 58 calls" },
          { label: "structure:vote-period-check", value: 41, display: "685 ms/min", note: "one lock and one transaction per guild" },
        ],
      },

      { t: "h", text: "What got fixed", icon: "zap" },
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
      { t: "h", text: "Twenty crons on a single second", icon: "timer" },
      {
        t: "facts",
        items: [
          { icon: "repeat", value: "44", label: "scheduled jobs" },
          { icon: "warn", value: "20", label: "on the same second" },
          { icon: "shield", value: "3", label: "guarded against re-entrancy" },
          { icon: "clock", value: "3.5 s", label: "of a 5.5 s boot" },
        ],
      },
      {
        t: "p",
        text: "Out of forty four scheduled jobs, twenty shared the HH:00:00 second and fought over the Prisma pool once an hour. A stable offset is now derived from the hash of the module:job pair, bounded below one minute so no job leaves the minute it was scheduled for. Along the way, the re-entrancy guard covered three jobs out of forty four through hand-written flags: it now applies to all of them, and the UTC timezone several schedules documented in a comment is finally enforced by code.",
      },
      {
        t: "diagram",
        caption:
          "The offset is derived from the job hash: stable across restarts, with no table to maintain.",
        diagram: {
          columns: [
            {
              title: "Scheduled",
              nodes: [
                { id: "jobs", label: "44 jobs", note: "20 at HH:00:00" },
                { id: "sweep", label: "boot sweep", note: "141 structures" },
              ],
            },
            {
              title: "Spread",
              nodes: [
                { id: "hash", label: "hash(module:job)", note: "offset < 1 min", accent: true },
                { id: "guard", label: "re-entrancy guard", note: "44 jobs of 44" },
              ],
            },
            {
              title: "Resource",
              nodes: [{ id: "pool", label: "Prisma pool", note: "PostgreSQL", accent: true }],
            },
            {
              title: "Effect",
              nodes: [
                { id: "flat", label: "flat load", note: "no hourly spike", accent: true },
                { id: "boot", label: "startup", note: "3.5 s back of 5.5 s" },
              ],
            },
          ],
          edges: [
            { from: "jobs", to: "hash", label: "offset" },
            { from: "jobs", to: "guard" },
            { from: "hash", to: "pool" },
            { from: "guard", to: "pool" },
            { from: "pool", to: "flat" },
            { from: "sweep", to: "boot", label: "batched" },
          ],
        },
      },
      {
        t: "p",
        text: "Another loop that only added up round trips: the boot sweep walked all 141 structures one by one, each with its own Redis lock and transaction. It accounted for 3.5 s of the 5.5 s between process launch and the web server accepting traffic.",
      },
      { t: "h", text: "Image weight", icon: "container" },
      {
        t: "p",
        text: "While I was moving the monorepo onto Bun, EnderSpirit went after the Docker images: slim base, per-service filtered installs, split build and runtime stages, trimmed Noto fonts. Then the two layers that cost the most. A chown -R on node_modules lived in its own RUN, which makes Docker rewrite every file into a new layer: node_modules existed twice in the image. Bun also installs both libc variants of native binaries while the image is glibc.",
      },
      {
        t: "compare",
        items: [
          { icon: "container", label: "enderbot-core", before: "2.59 GB", after: "1.44 GB", delta: "-44%" },
          { icon: "container", label: "enderbot-web-dev", before: "1.6 GB", after: "899 MB", delta: "-44%" },
          { icon: "container", label: "enderbot-web-preview", before: "898 MB", after: "851 MB", delta: "-5%" },
        ],
      },

      {
        t: "p",
        text: "The month was also a tooling reset on EnderSpirit's side: moving to native TypeScript 7 and to Vite 8, clearing out dead dependencies, and wiring in a custom lint plugin to hunt down code written without intent.",
      },
      {
        t: "facts",
        items: [
          { icon: "zap", value: "7×", label: "faster type checking" },
          { icon: "rocket", value: "2×", label: "faster site build" },
          { icon: "package", value: "45", label: "dead dependencies removed" },
          { icon: "down", value: "3678", label: "lint defects cleared" },
        ],
      },
      { t: "h", text: "What production actually measured", icon: "gauge" },
      {
        t: "p",
        text: "The numbers above come from a one off profile. Production Prometheus keeps fifteen days, which covers all three switches: the Go gateway taking the fifteen shards on 13 August, the JS client being deleted on the 16th, and the Bun move overnight on the 22nd. Load stayed flat across that window, roughly 15,490 Discord guilds, so before and after compare honestly.",
      },
      {
        t: "compare",
        items: [
          { icon: "boxes", label: "gateway processes", before: "16", after: "1", delta: "just one" },
          { icon: "memory", label: "gateway resident memory", before: "4.3 to 9.0 GB", after: "1.0 to 1.6 GB", delta: "4x less" },
          { icon: "server", label: "host memory in use", before: "10 to 16 GB", after: "7.5 to 10.7 GB", delta: "ceiling held" },
          { icon: "network", label: "Discord WebSocket latency", before: "106 ms", after: "106 ms", delta: "unchanged" },
        ],
      },
      {
        t: "note",
        icon: "cpu",
        text: "The win is not free. Host CPU went from roughly 8% to roughly 13%: one Go process holding the whole cache works continuously where sixteen Node processes each held a slice. Memory was the constrained resource, not CPU, so the trade was worth taking.",
      },
      {
        t: "p",
        text: "The Bun move reads just as clearly on the core, restarted on Bun 1.4.0 on the morning of 22 August:",
      },
      {
        t: "compare",
        items: [
          { icon: "memory", label: "core RSS", before: "4.5 to 5.7 GB", after: "2.4 to 3.8 GB", delta: "40% less" },
          { icon: "timer", label: "event loop lag p99", before: "11 to 16 ms", after: "6 to 9 ms", delta: "halved" },
          { icon: "gauge", label: "command p95", before: "1.94 s", after: "1.44 s", delta: "500 ms" },
          { icon: "cpu", label: "core CPU", before: "0.33 core", after: "0.35 core", delta: "flat" },
        ],
      },
      {
        t: "p",
        text: "Command p95 is still high, and that is expected: it includes round trips to Discord and the deliberate waits some handlers perform. What matters is that the same load now runs on two gigabytes less memory with an event loop twice as calm.",
      },

      { t: "h", text: "What is left", icon: "activity" },
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

export function headingId(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function postBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.meta.slug === slug);
}
