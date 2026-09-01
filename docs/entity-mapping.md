# Entity-Mapping der Hausgrafik

| Grafik-Element | Entity-ID | Beschreibung | Einheit / Werte |
|---|---|---|---|
| Kopfzeile links | `sensor.comfoair_q_inside_humidity` | Raumluftfeuchte | `%` |
| Kopfzeile Mitte | `sensor.wohnzimmer_co2` | CO₂-Sensor, frei austauschbar | `ppm` |
| Kopfzeile rechts | `fan.comfoair_q` | Lüfter; `percentage` wird auf Level 1–3 abgebildet | `%` / Level |
| Modus-Badge | `select.comfoair_q_ventilation_mode` | Betriebsart der Lüftung | `auto`, `manual` |
| Außenluft, oben links | `sensor.comfoair_q_outside_temperature` | Kalte Außenluft strömt ein | `°C` |
| Zuluft, oben rechts | `sensor.comfoair_q_supply_temperature` | Erwärmte Zuluft strömt ein | `°C` |
| Abluft, unten links | `sensor.comfoair_q_inside_temperature` | Warme Raumluft strömt aus | `°C` |
| Fortluft, unten rechts | `sensor.comfoair_q_exhaust_temperature` | Abgekühlte Fortluft strömt aus | `°C` |
| Bypass-Anzeige | `select.comfoair_q_bypass_mode` | Steuerung des Wärmetauscher-Bypasses | `auto`, `on`, `off` |
| Filter-Restlaufzeit | `sensor.comfoair_q_days_to_replace_filter` | Verbleibende Tage bis zum Filterwechsel | Tage |
| Boost-Button | `select.comfoair_q_boost_mode` | Dauer des Boost-Betriebs | `10`–`60 Minutes` |
| Störungs-Banner (optional) | `binary_sensor.luftung_storung` | Blendet bei einer Störung ein rotes Banner ein | `on`, `off` |

