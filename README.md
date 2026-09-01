# ComfoAir Q Cards

Lovelace-Karten für Zehnder-ComfoAir-Q-Lüftungsanlagen in Home Assistant. Die Karten bauen auf der bereits installierten [`comfoair_q`](https://www.home-assistant.io/integrations/comfoair_q/)-Integration auf: Sie stellen deren Entities lediglich dar und stellen selbst weder eine Verbindung zur Anlage her noch greifen sie direkt per Modbus darauf zu.

## Funktionen

- Vier Luftströme mit Temperaturen: Außenluft und Fortluft blau, Zuluft und Abluft rot
- Kopfzeile mit Raumluftfeuchte, CO₂-Wert und Lüfter-Level
- Anklickbares Badge für den Automatik- beziehungsweise manuellen Modus
- Anzeigen und Bedienelemente für Boost und Bypass
- Filter-Restlaufzeit in Tagen
- Rotes Banner bei einer gemeldeten Lüftungsstörung

## Voraussetzungen

- Home Assistant 2025.8 oder neuer
- Installierte und eingerichtete `comfoair_q`-Integration
- Für [`hausgrafik.yaml`](cards/hausgrafik/hausgrafik.yaml) zusätzlich [`custom:config-template-card`](https://github.com/custom-cards/config-template-card), zum Beispiel über HACS installiert

Die Variante [`hausgrafik-minimal.yaml`](cards/hausgrafik/hausgrafik-minimal.yaml) verwendet ausschließlich Home-Assistant-Bordmittel und kommt ohne Custom Cards aus. Sie zeigt den Lüfterwert in Prozent statt als berechnetes Level 1–3 an.

## Installation

Wähle eine der beiden Karten:

- `cards/hausgrafik/hausgrafik.yaml` für die vollständige, dynamische Darstellung
- `cards/hausgrafik/hausgrafik-minimal.yaml` für die Variante ohne Custom Cards

### Variante 1: Datei einbinden

1. Kopiere die gewünschte Datei in dein Home-Assistant-Verzeichnis, zum Beispiel nach:

   ```text
   /config/www/comfoair-q/hausgrafik.yaml
   ```

2. Binde sie in der YAML-Konfiguration deines Dashboards an der gewünschten Stelle ein:

   ```yaml
   views:
     - title: Lüftung
       cards:
         - !include /config/www/comfoair-q/hausgrafik.yaml
   ```

3. Bei Verwendung der vollständigen `hausgrafik.yaml`: Installiere `config-template-card` über HACS. HACS registriert die Ressource normalerweise automatisch. Falls das nicht geschieht, ergänze unter **Einstellungen → Dashboards → Ressourcen** beziehungsweise im `resources`-Abschnitt:

   ```yaml
   resources:
     - url: /hacsfiles/config-template-card/config-template-card.js
       type: module
   ```

4. Lade die Dashboard-Ressourcen beziehungsweise den Browser neu.

Der `resources`-Eintrag lädt die JavaScript-Custom-Card. Die Karten-YAML selbst wird per `!include` eingebunden und nicht als Lovelace-Ressource registriert. `!include` setzt ein Dashboard im YAML-Modus voraus.

### Variante 2: Direkt in ein Dashboard einfügen

1. Öffne das gewünschte Dashboard und wähle **Dashboard bearbeiten → Raw-Konfigurationseditor**.
2. Öffne die gewünschte Datei aus `cards/hausgrafik/` in diesem Repository.
3. Kopiere ihren vollständigen Inhalt und füge ihn unter `cards:` in der gewünschten View ein. Achte auf die passende Einrückung.
4. Speichere die Dashboard-Konfiguration.
5. Bei der vollständigen `hausgrafik.yaml` muss `config-template-card` ebenfalls installiert und als Ressource geladen sein; bei der Minimalvariante entfällt dieser Schritt.

Alternativ kannst du beim Anlegen einer manuellen Karte den vollständigen Dateiinhalt direkt in den YAML-Editor dieser Karte kopieren.

## Entity-IDs anpassen

Alle Entity-IDs sind oben in der jeweiligen YAML-Datei gesammelt. Ändere nur diese `variables`-Sektion:

- In `hausgrafik.yaml` steht sie unter `variables:`.
- In `hausgrafik-minimal.yaml` besteht sie aus den `x-entity-*`-Einträgen mit YAML-Ankern direkt am Anfang.

Der restliche Karten-Code muss nicht angepasst werden. Eine Referenz mit realen Entity-IDs findest du in [`examples/fabian-entities.yaml`](examples/fabian-entities.yaml). Die Zuordnung aller Anzeigen zu den erwarteten Entities beschreibt [`docs/entity-mapping.md`](docs/entity-mapping.md).

## Screenshot

![ComfoAir-Q-Hausgrafik](docs/screenshot-hausgrafik.png)

> TODO: Screenshot unter `docs/screenshot-hausgrafik.png` ergänzen.

## Credits

Dieses Projekt basiert hinsichtlich der Idee und Darstellung auf der Inspiration durch [Tvalley71/pluggit](https://github.com/TValley71/pluggit) (Dantherm). Die Karten wurden vollständig neu für Zehnder-ComfoAir-Q-Anlagen und die `comfoair_q`-Integration gebaut.

## Lizenz

Die Lizenzbedingungen stehen in der Datei [`LICENSE`](LICENSE).
