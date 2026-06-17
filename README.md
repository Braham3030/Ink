# {ink}lusive, Training

## Code Conventions
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
* Gebruik voor variabelen altijd const, tenzij je de waarde later moet veranderen, anders let. Probeer var compleet te vermijden.

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

<br>

## Bronnenlijst
- Gebaren: https://i.fbcd.co/products/original/common-asl-words-lbc-db-thumb-3407d0efc18489eb02e9ffc8e4de0df05f1aa88768f43cdcf27342bd3729ae82.jpg
- https://utopia.fyi/clamp/calculator 
- https://gsap.com/docs/v3/Plugins/Draggable/
- https://docs.astro.build/en/basics/astro-components/#component-props
- https://docs.astro.build/en/guides/view-transitions/
- https://docs.astro.build/en/guides/images/
- https://docs.astro.build/en/reference/api-reference/
- https://docs.astro.build/en/guides/prefetch/

#### AI gebruik binnen team
Code
- Alle specifieke stukken aangegeven in code zelf

- Claude waar gebruikt staat in code, overig enkel uitleg van bepaalde dingen (Leerdoel Justin)
- Gemini + copilot (autocomplete) voor hulp in code

Afbeeldingen
- Afbeelding voor motorische minigame gegenereerd

Spelling/Grammatica
- Algemeen controleren + bijdrage formelere teksten schrijven
