# sauvagel.xyz

Portfolio et blog de Léo Sauvage. Site statique prérendu, servi par Nginx sur un VPS.

## Stack

- SvelteKit 2 et Svelte 5 (runes), TypeScript
- Tailwind CSS 4, polices auto-hébergées (Space Grotesk, JetBrains Mono)
- `adapter-static` : tout le site est prérendu, aucun serveur applicatif en production
- Leaflet (carte des villes, chargée à la demande) et Takt (mesure d'audience sans cookie)
- pnpm, ESLint, svelte-check

## Structure

```
src/lib/data/      profil, projets, articles, icônes : la source de vérité du contenu
src/lib/i18n/      traductions FR et EN (store), une clé par texte affiché
src/lib/components/ composants de page (hero, sections, grille générative, corps d'article)
src/routes/        pages prérendues, plus rss.xml et sitemap.xml générés depuis les données
static/            polices, logos techno, captures, images Open Graph
scripts/           génération des images Open Graph et des icônes (resvg requis)
```

Les articles de blog ne sont pas du markdown : ce sont des tableaux de blocs typés
(`Block[]` dans `src/lib/data/posts.ts`) rendus par `PostBody.svelte`. Les deux langues
partagent donc exactement la même structure, et un bloc de mesures ne peut pas dériver
d'un article à l'autre.

`rss.xml` et `sitemap.xml` sont des routes prérendues : ajouter un article ou un projet
aux données suffit, il n'y a pas de fichier à tenir à jour à la main.

## Développement

```bash
pnpm install
pnpm dev          # serveur de développement
pnpm check        # svelte-check (types, a11y)
pnpm lint         # eslint
pnpm build        # build statique dans build/
```

Les images Open Graph se régénèrent avec `node scripts/generate-assets.mjs <dossier-de-travail>`,
qui a besoin de `resvg` et des fichiers `.ttf` des deux polices dans ce dossier.

## Intégration continue et déploiement

`.github/workflows/ci.yml` rejoue ESLint, svelte-check et le build sur chaque push et
chaque pull request vers `master`. Sur un push vers `master`, un second job publie en
production le `build/` produit par le premier : c'est donc exactement l'arborescence
qui a passé la CI qui part en ligne, jamais une reconstruction.

La publication passe par SSH avec une clé dédiée, stockée dans les secrets du dépôt
(`DEPLOY_SSH_KEY`, `DEPLOY_HOST`, `DEPLOY_PORT`, `DEPLOY_KNOWN_HOSTS`). Côté serveur la
clé est enfermée dans une commande forcée : elle ouvre le compte système
`deploy-sauvagel`, qui n'a ni shell ni redirection de ports et ne sait rien faire d'autre
que `/usr/local/bin/sauvagel-publish`. Ce script lit une archive `tar.gz` sur son entrée
standard, refuse celles où `index.html` manque, puis synchronise `/home/sauvagel.xyz/build`.
Le Nginx d'entrée sert ce dossier en statique (monté en lecture seule) et proxifie
`/_takt/` vers la collecte d'audience.

Le job se termine en vérifiant que `https://sauvagel.xyz/` répond `200`.

Pour republier à la main, sans passer par un commit :

```bash
gh workflow run CI --ref master
```

## Live

https://sauvagel.xyz
