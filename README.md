# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).


## Code Coventions
Gebasseerd op https://docs.fdnd.nl/conventies.html#code-conventies

### Naamgeving
* Gebruik duidelijke naamgeving, iedereen moet het kunnen begrijpen
* Gebruik kebab-case voor ids, classes en css variabelen
* Gebruik camelCase voor JavaScript variabelen en functies
* Gebruik altijd Engels in de code
* Wees consistent
* Gebruik geen afkorting, schrijf alles voluit

### Algemene conventies
* Gebruik altijd 1 tab voor indentation
* Gebruik van global.css voor algemene styling die voor meerdere pagina's gelden. Denk aan header grootes en kleuren

### HTML Conventions
* Schrijf gestructureerde en semantische HTML
* Niet content onnodig diep nesten
* Maak gebruik van HTML features als die mogelijk zijn
* Gebruik dubbele quotes voor attributen

### CSS Conventions
* Volg de volgorde van HTML in de CSS
* Structureer code van algemeen naar specifiek
* Maak gebruik van cascade, inheritance en  utility classes om dubbele code te voorkomen
* Maak gebruik van nesting voor meer compacte code
* Maak gebruik van HSL in custom properties om een kleurvolle website te maken
* Dark-mode optie moet beschikbaar zijn

### Javascript Conventions
* Gebruik enkele quotes voor strings
* Geen ; aan het einde van regels
* Schrijf comments voor eventueel onduidelijke code
* Gebruik geen ' om variabelen toe te voegen aan een string, gebruik $
* Gebruik voor variabelen altijd const, tenzij je de waarde later moet veranderen, anders let. Probeer var compleet te vermijden

### Typography
* Gebruik minimaal 16px voor font-size
* Gebruik minimaal 1.5 line-height
* 10 - 12 woorden / 55 -75 karakters per regel
* Na een paragraaf minimaal 2x de font-size als wit-ruimte
* Letter-spacing meer dan 0.12 keer de font-size
* Word-spacing meer dan 0.16 keer de font-size

### Text alignment
* Standaard links uitgelijnd, met uitzondering midden

### Design
* Er wordt altijd gewerkt vanuit mobile first, daarna responsive voor desktop
* Er wordt em of rem gebruikt voor elementen die mee moeten schalen met schermformaat. Zoals gap, margin, padding, etc...
* Px wordt gebruikt voor elementen die niet hoeven mee te schalen. Zoals borders. drop-shadows, specifieke styling dingen
* vw/vh worden gebruikt voor elementen die mee moeten groeien met het hele scherm. Zoals header, main, footer
* Deze eenheden kunnen samengevoegd worden in de vorm van clamps. Voor een gemakkelijk responsive design.
* Er is altijd genoeg ruimte tussen tekst en eventuele border
