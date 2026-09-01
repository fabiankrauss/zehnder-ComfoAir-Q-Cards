# Umbau-Plan: Pluggit-Integration → ComfoAir Q Cards

**Ziel:** Aus diesem Fork (Pluggit-Integration) wird eine reine **Lovelace-Card-Sammlung** für die Zehnder ComfoAir Q, die ausschließlich mit den Entities der bereits installierten `comfoair_q`-Integration arbeitet. Kein Modbus, kein Verbindungsaufbau, kein Custom-Component-Code.

**Arbeitsweise:** Klaus (Hermes) plant & verifiziert, Codex implementiert. Direkt auf `main`, keine PRs.

---

## Phase A — Aufräumen (Codex Runde 1)

Entfernen:
- `custom_components/` (komplett: Pluggit-Integration, Modbus, Coordinator, Config Flow, Translations)
- `hacs.json` (zip_release-Setup für Integrationen entfällt)
- `sync_readme_md.py` + `.github/workflows/sync-from-dantherm.yaml` + `.github/sync-state/` (Dantherm-Sync obsolet)
- `.github/workflows/validate.yaml` + `hassfest.yaml` + `release.yaml` (Integrations-CI entfällt)
- Dantherm-/Pluggit-spezifische README-Inhalte

Behalten:
- `LICENSE`
- `.gitignore` (erweitern)

Neu anlegen:
```
cards/
  hausgrafik/
    hausgrafik.yaml        # Haupt-Card (Lovelace YAML)
    hausgrafik-minimal.yaml# Variante ohne Custom-Dependencies
docs/
  entity-mapping.md        # Grafik-Element ↔ HA-Entity Tabelle
examples/
  fabian-entities.yaml     # Fabians echte Entity-IDs als Referenz-Config
README.md                  # Projekt-README neu
```

## Phase B — Hausgrafik-Card (Codex Runde 2)

Nachbau der Hausgrafik (Referenz: Screenshot — Haus-Schema, 4 Luftkanäle, Kopfzeile, Modus-Button links):

**Layout-Elemente (picture-elements auf Inline-SVG-Basis):**

| Position | Element | Quelle (Fabians Entities) |
|---|---|---|
| Kopfzeile links | Luftfeuchte (Raum) | `sensor.comfoair_q_inside_humidity` |
| Kopfzeile Mitte | CO₂ (konfigurierbar, Default: Wohnzimmer) | `sensor.wohnzimmer_co2` |
| Kopfzeile rechts | Lüfterstufe (Level 1-3) | `fan.comfoair_q` → percentage 33/66/100 |
| Links | Modus-Badge (Automatic/Manual, klickbar) | `select.comfoair_q_ventilation_mode` |
| Mitte | Wärmetauscher-Icon + Haus-SVG | statisch |
| Kanal oben-links | Außenluft (kalt, blau, Pfeil rein) | `sensor.comfoair_q_outside_temperature` |
| Kanal oben-rechts | Zuluft (warm, rot, Pfeil rein) | `sensor.comfoair_q_supply_temperature` |
| Kanal unten-links | Abluft (warm, rot, Pfeil raus) | `sensor.comfoair_q_inside_temperature` |
| Kanal unten-rechts | Fortluft (kalt, blau, Pfeil raus) | `sensor.comfoair_q_exhaust_temperature` |
| Fußzeile | Bypass-Status | `select.comfoair_q_bypass_mode` (auto/on/off) |
| Fußzeile | Filter-Restlaufzeit | `sensor.comfoair_q_days_to_replace_filter` |
| Fußzeile | Boost-Button (10-60 Min) | `select.comfoair_q_boost_mode` oder `switch.luftung_boost` |

**Technik:**
- Primär: `picture-elements` Card mit Inline-SVG (Haus + Kanäle als data-URI oder card-mod-injiziert), Werte via `custom:config-template-card` oder native Templating
- Farb-Logik: warme Ströme (Zuluft/Abluft) rot/orange, kalte (Außen/Fortluft) blau — dynamisch je nach Temperaturdifferenz optional
- Animierter Pfeil-Strom via CSS (card-mod), aber **degradiert sauber** ohne card-mod (Variante `hausgrafik-minimal.yaml` nur mit HA-Bordmitteln: mushroom + vertical-stack)
- Alle Entity-IDs oben in einer `variables`-Sektion konfigurierbar — keine Hardcodes im Card-Body

## Phase C — Docs & Beispiele (Codex Runde 3)

- `docs/entity-mapping.md`: komplette Tabelle aller unterstützten Entities (auch optional: Störung `binary_sensor.luftung_storung`, Filter verschmutzt `binary_sensor.luftung_filter_verschmutzt`, Energie `sensor.comfoair_q_ventilation_current_power_usage`, ComfoCool, Temperaturprofil, Balance Mode)
- `examples/fabian-entities.yaml`: alle realen Entity-IDs aus Fabians HA als Drop-in-Referenz
- `README.md`: Projektbeschreibung (Cards für ComfoAir Q), Install (manual/HACS-manual), Anpassung der Entity-IDs, Screenshots-Platzhalter, Danksagung an Dantherm/Pluggit-Ursprung
- Deutsch als Hauptsprache

## Phase D — Verifikation & Push (Klaus, nach jeder Runde)

- YAML-Syntax-Check aller Cards (YAML-parse)
- Entity-IDs gegen Live-HA validieren (MCP: alle referenzierten Entities existieren & liefern Werte)
- Direkter Push auf `main` (User-Freigabe: kein PR)

## Erweiterungen (später, optional)

- Boost-Timer mit `number.luftung_boost_zeit` (1800s)
- Störungs-Banner bei `binary_sensor.luftung_storung = on`
- Energie-Badge (aktuelle Leistung 23 W)
- Wöchentlicher Filter-Progress-Ring