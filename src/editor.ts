import { LitElement, css, html } from "lit";

const DEFAULT_ENTITIES: Record<string, string> = {
  humidity: "sensor.comfoair_q_inside_humidity",
  co2: "sensor.wohnzimmer_co2",
  fan: "fan.comfoair_q",
  vent_mode: "select.comfoair_q_ventilation_mode",
  outside_temp: "sensor.comfoair_q_outside_temperature",
  supply_temp: "sensor.comfoair_q_supply_temperature",
  inside_temp: "sensor.comfoair_q_inside_temperature",
  exhaust_temp: "sensor.comfoair_q_exhaust_temperature",
  bypass: "select.comfoair_q_bypass_mode",
  filter_days: "sensor.comfoair_q_days_to_replace_filter",
  boost: "select.comfoair_q_boost_mode",
  fault: "binary_sensor.luftung_storung",
};

const LABELS: Record<string, string> = {
  humidity: "Feuchte", co2: "CO₂", fan: "Lüfter", vent_mode: "Lüftungsmodus",
  outside_temp: "Außenlufttemperatur", supply_temp: "Zulufttemperatur",
  inside_temp: "Ablufttemperatur", exhaust_temp: "Fortlufttemperatur",
  bypass: "Bypass", filter_days: "Filter-Tage", boost: "Boost", fault: "Störung",
};

class ComfoAirHausgrafikEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _pickerAvailable: { state: true },
  };

  hass: any;
  private _config: any = { entities: { ...DEFAULT_ENTITIES }, show_header: true, show_footer: true };
  private _pickerAvailable = Boolean(customElements.get("ha-entity-picker"));

  connectedCallback() {
    super.connectedCallback();
    this.loadHaComponents();
  }

  private loadHaComponents() {
    if (customElements.get("ha-entity-picker")) {
      this._pickerAvailable = true;
      return;
    }
    customElements.whenDefined("ha-entity-picker").then(() => {
      this._pickerAvailable = true;
    });
  }

  setConfig(config: any) {
    this._config = {
      ...config,
      entities: { ...DEFAULT_ENTITIES, ...(config?.entities ?? {}) },
      show_header: config?.show_header !== false,
      show_footer: config?.show_footer !== false,
    };
  }

  private updateEntity(key: string, event: Event) {
    const target = event.target as any;
    const value = target.value ?? target.configValue ?? "";
    this.emit({ ...this._config, entities: { ...this._config.entities, [key]: value } });
  }

  private updateOption(key: "show_header" | "show_footer", event: Event) {
    this.emit({ ...this._config, [key]: (event.target as HTMLInputElement).checked });
  }

  private emit(config: any) {
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config }, bubbles: true, composed: true,
    }));
  }

  render() {
    return html`
      <div class="form">
        ${Object.keys(DEFAULT_ENTITIES).map((key) => html`
          <label>
            <span>${LABELS[key]}</span>
            ${this._pickerAvailable ? html`
              <ha-entity-picker
                .hass=${this.hass}
                .value=${this._config.entities[key]}
                .configValue=${key}
                allow-custom-entity
                @value-changed=${(event: Event) => this.updateEntity(key, event)}>
              </ha-entity-picker>
            ` : html`
              <input
                .value=${this._config.entities[key]}
                placeholder=${DEFAULT_ENTITIES[key]}
                @change=${(event: Event) => this.updateEntity(key, event)} />
            `}
          </label>
        `)}
        <label class="check"><input type="checkbox" .checked=${this._config.show_header} @change=${(e: Event) => this.updateOption("show_header", e)} /> Kopfzeile anzeigen</label>
        <label class="check"><input type="checkbox" .checked=${this._config.show_footer} @change=${(e: Event) => this.updateOption("show_footer", e)} /> Fußzeile anzeigen</label>
      </div>
    `;
  }

  static styles = css`
    .form { display: grid; gap: 14px; padding: 8px 0; }
    label:not(.check) { display: grid; grid-template-columns: minmax(150px, 1fr) 2fr; gap: 12px; align-items: center; }
    ha-entity-picker, input:not([type="checkbox"]) { width: 100%; box-sizing: border-box; }
    input:not([type="checkbox"]) { padding: 10px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 4px; }
    .check { display: flex; gap: 8px; align-items: center; }
    @media (max-width: 500px) { label:not(.check) { grid-template-columns: 1fr; gap: 5px; } }
  `;
}

if (!customElements.get("comfoair-hausgrafik-editor")) {
  customElements.define("comfoair-hausgrafik-editor", ComfoAirHausgrafikEditor);
}
