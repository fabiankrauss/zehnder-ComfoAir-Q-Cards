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

## Installation (empfohlen): HACS

1. Öffne in HACS **Custom repositories** und füge `https://github.com/fabiankrauss/zehnder-ComfoAir-Q-Cards` mit der Kategorie **Lovelace** hinzu.
2. Starte Home Assistant neu und aktualisiere gegebenenfalls den Browser-Cache. Danach erscheint **ComfoAir Hausgrafik Card** unter **HACS → Frontend**; wähle dort **Download**.
3. Öffne ein Dashboard zum Bearbeiten und füge über den Card-Picker **Custom: ComfoAir Hausgrafik** hinzu. Der GUI-Editor fragt alle benötigten Entities ab. Seine Vorgabewerte entsprechen Fabians Setup und sind auch in den Beispielen dokumentiert.

## Card-Konfiguration

```yaml
type: custom:comfoair-hausgrafik
entities:
  humidity: sensor.comfoair_q_inside_humidity
  co2: sensor.wohnzimmer_co2
  fan: fan.comfoair_q
  vent_mode: select.comfoair_q_ventilation_mode
  outside_temp: sensor.comfoair_q_outside_temperature
  supply_temp: sensor.comfoair_q_supply_temperature
  inside_temp: sensor.comfoair_q_inside_temperature
  exhaust_temp: sensor.comfoair_q_exhaust_temperature
  bypass: select.comfoair_q_bypass_mode
  filter_days: sensor.comfoair_q_days_to_replace_filter
  boost: select.comfoair_q_boost_mode
  fault: binary_sensor.luftung_storung
show_header: true  # optional
show_footer: true  # optional
```

| Schlüssel | Erforderlich | Beschreibung |
| --- | --- | --- |
| `humidity` | ja | Raumluftfeuchte |
| `co2` | ja | CO₂-Wert |
| `fan` | ja | Lüfter; aus dessen Prozentwert wird Level 0–3 berechnet |
| `vent_mode` | ja | Lüftungsmodus (Automatik/manuell) |
| `outside_temp` | ja | Außenlufttemperatur |
| `supply_temp` | ja | Zulufttemperatur |
| `inside_temp` | ja | Abluft- beziehungsweise Innenlufttemperatur |
| `exhaust_temp` | ja | Fortlufttemperatur |
| `bypass` | ja | Bypass-Modus |
| `filter_days` | ja | verbleibende Filterlaufzeit in Tagen |
| `boost` | ja | Boost-Modus |
| `fault` | ja | binärer Störungssensor |
| `show_header` | nein | Kopfzeile anzeigen; Standard: `true` |
| `show_footer` | nein | Fußzeile anzeigen; Standard: `true` |

## JavaScript-Module installieren (manuell, ohne HACS)

1. Lade `comfoair-hausgrafik.js` und `comfoair-hausgrafik-editor.js` aus dem neuesten Release herunter und kopiere beide Dateien nach `/config/www/comfoair/`.
2. Ergänze unter **Einstellungen → Dashboards → Ressourcen** den folgenden Eintrag:

   ```yaml
   url: /local/comfoair/comfoair-hausgrafik.js
   type: module
   ```

3. Lade die Dashboard-Ressourcen beziehungsweise den Browser-Cache neu. Das Editor-Modul wird bei Bedarf automatisch aus demselben Verzeichnis geladen.

## Aus den Quellen bauen

Zum lokalen Bauen wird Node.js 20 oder neuer benötigt:

```shell
npm install
npm run build
```

Dadurch entstehen `comfoair-hausgrafik.js` und `comfoair-hausgrafik-editor.js` im Repository-Hauptverzeichnis.

## Legacy/Alternative: YAML-Varianten

Die folgenden Varianten funktionieren ohne HACS und ohne die JavaScript-Module dieser Custom Card, also nur mit YAML. Für [`hausgrafik.yaml`](cards/hausgrafik/hausgrafik.yaml) wird allerdings zusätzlich [`custom:config-template-card`](https://github.com/custom-cards/config-template-card) benötigt. [`hausgrafik-minimal.yaml`](cards/hausgrafik/hausgrafik-minimal.yaml) verwendet ausschließlich Home-Assistant-Bordmittel und zeigt den Lüfterwert in Prozent statt als berechnetes Level 1–3 an.

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
