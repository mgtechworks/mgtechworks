# Önfrissülő GitHub profil README

Ez a repo óránként újragenerálja a `README.md`-t egy GitHub Actions workflow-val.
Minden személyes adat a `config.json`-ban van — csak azt kell szerkesztened.

## 1. Töltsd ki a config.json-t

Cseréld ki a `YOUR_GITHUB_USERNAME`, `A Te Neved`, `te@pelda.hu` stb. helyőrzőket.
A `bullets`, `badges` és `socials` tömbökbe annyi elemet tehetsz, amennyit szeretnél.

Badge ikonok listája: https://badgen.net/  ·  Social logók: https://simpleicons.org/

## 2. Nézd meg helyben

```
npm install
node index.js
```

Ez legenerálja a `README.md`-t. Az időjárás rész kimarad, ha nincs API kulcs — ez nem hiba.

## 3. Hozd létre a repót GitHubon

FONTOS: a repo nevének **pontosan meg kell egyeznie a GitHub felhasználóneveddel**,
és **publikusnak** kell lennie. Csak így jelenik meg a README a profilod tetején.

```
git remote add origin https://github.com/<felhasznalonev>/<felhasznalonev>.git
git push -u origin main
```

## 4. Időjárás bekapcsolása (opcionális)

1. Ingyenes API kulcs: https://home.openweathermap.org/api_keys
   (az új kulcs aktiválódása akár 1-2 óra is lehet)
2. GitHub repo → Settings → Secrets and variables → Actions → New repository secret
   Név: `OPEN_WEATHER_MAP_KEY`, érték: a kulcsod
3. Helyi teszthez: `cp .env.example .env` és írd bele a kulcsot (a `.env` git-ignorált)

## 5. Ellenőrzés

A repo Actions fülén a "Autobuild README" workflow-t a "Run workflow" gombbal
kézzel is elindíthatod. Ezután óránként magától fut.

Ha a push lépés jogosultsági hibát dob:
Settings → Actions → General → Workflow permissions → "Read and write permissions".

## Megjegyzés a statisztika-képekhez

A `showTopLanguages` és `showStats` alapból `false`. Ennek oka, hogy a
github-readme-stats nyilvános példánya (github-readme-stats.vercel.app)
HTTP 503 `DEPLOYMENT_PAUSED` hibát ad — a szolgáltatás oldalán van a gond,
nem a beállításban. Ha egyszer újraindul, elég a két kapcsolót `true`-ra
állítani a `config.json`-ban.

## Badge ikonok

A badge-ek a shields.io-t használják, az ikonok a Simple Icons készletből
jönnek (`logo=<slug>`). Slug-lista: https://simpleicons.org/

Ha egy ikon nem jelenik meg, a slug hiányzik a készletből — ilyenkor a
shields.io némán, hibaüzenet nélkül elhagyja az ikont. A `logo` mező
elhagyható, ekkor szöveges badge készül (így működik most a LinkedIn,
amelynek logóját védjegy miatt eltávolították a Simple Iconsból).
