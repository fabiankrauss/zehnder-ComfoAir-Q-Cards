import { LitElement, css, html, nothing } from "lit";

const REQUIRED_ENTITIES = [
  "humidity", "co2", "fan", "vent_mode", "outside_temp", "supply_temp",
  "inside_temp", "exhaust_temp", "bypass", "filter_days", "boost", "fault",
] as const;

type EntityKey = typeof REQUIRED_ENTITIES[number];
type CardConfig = {
  type?: string;
  entities: Record<EntityKey, string>;
  show_header?: boolean;
  show_footer?: boolean;
};

class ComfoAirHausgrafik extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  hass: any;
  private _config?: CardConfig;

  static async getConfigElement() {
    if (!customElements.get("comfoair-hausgrafik-editor")) {
      const cardScript = Array.from(document.scripts).find((script) =>
        script.src.includes("comfoair-hausgrafik.js"),
      );
      const editorUrl = cardScript?.src.replace(
        /comfoair-hausgrafik\.js(?:\?.*)?$/,
        "comfoair-hausgrafik-editor.js",
      );
      if (!editorUrl) {
        throw new Error("ComfoAir Hausgrafik: Editor-Bundle konnte nicht gefunden werden.");
      }
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "module";
        script.src = editorUrl;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("ComfoAir Hausgrafik: Editor konnte nicht geladen werden."));
        document.head.append(script);
      });
    }
    return document.createElement("comfoair-hausgrafik-editor");
  }

  static getStubConfig() {
    return { entities: {} };
  }

  getLovelace(): any {
    let root: any = document.querySelector("home-assistant");
    root = root?.shadowRoot?.querySelector("home-assistant-main");
    root = root?.shadowRoot?.querySelector("app-drawer-layout partial-panel-resolver, ha-drawer partial-panel-resolver");
    root = root?.shadowRoot?.querySelector("ha-panel-lovelace");
    return root?.lovelace;
  }

  setConfig(config: CardConfig) {
    if (!config || typeof config.entities !== "object" || Array.isArray(config.entities)) {
      throw new Error("ComfoAir Hausgrafik: 'entities' muss ein Objekt mit 12 Entity-IDs sein.");
    }
    const missing = REQUIRED_ENTITIES.filter(
      (key) => typeof config.entities[key] !== "string" || !config.entities[key].trim(),
    );
    if (missing.length) {
      throw new Error(`ComfoAir Hausgrafik: Pflicht-Entities fehlen: ${missing.join(", ")}`);
    }
    this._config = { ...config, entities: { ...config.entities } };
  }

  private state(key: EntityKey): any {
    const id = this._config?.entities[key];
    return id ? this.hass?.states?.[id] : undefined;
  }

  private value(key: EntityKey, suffix = ""): string {
    const entity = this.state(key);
    if (!entity || ["unknown", "unavailable"].includes(entity.state)) return "—";
    return `${entity.state}${suffix}`;
  }

  private temperature(key: EntityKey): string {
    const entity = this.state(key);
    if (!entity || ["unknown", "unavailable"].includes(entity.state)) return "—";
    return `${entity.state} ${entity.attributes?.unit_of_measurement ?? "°C"}`;
  }

  private fanLevel(): number {
    const percentage = Number(this.state("fan")?.attributes?.percentage ?? 0);
    if (percentage < 17) return 0;
    if (percentage < 50) return 1;
    if (percentage < 83) return 2;
    return 3;
  }

  private moreInfo(key: EntityKey) {
    const entityId = this._config?.entities[key];
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }));
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const showHeader = this._config.show_header !== false;
    const showFooter = this._config.show_footer !== false;
    const mode = this.state("vent_mode")?.state;
    const modeLabel = mode === "auto" ? "Automatik" : mode === "manual" ? "Manuell" : "Unbekannt";
    const fault = this.state("fault")?.state === "on";

    return html`
      <ha-card>
        <div class="graphic">
          <svg viewBox="0 0 1000 650" role="img" aria-label="ComfoAir Lüftungsübersicht">
            <rect width="1000" height="650" rx="30" fill="#18222d" />
            <path d="M260 285 500 95 740 285V560H260Z" fill="#243442" stroke="#b8c7d1" stroke-width="9" />

            ${showHeader ? html`
              <text class="header" x="155" y="58">Feuchte ${this.value("humidity", " %")}</text>
              <text class="header" x="500" y="58">CO₂ ${this.value("co2", " ppm")}</text>
              <text class="header" x="845" y="58">Level ${this.fanLevel()}</text>
            ` : nothing}

            <g class="clickable" @click=${() => this.moreInfo("vent_mode")} tabindex="0" role="button">
              <rect x="55" y="112" width="190" height="54" rx="27" fill="#34495e" />
              <text class="badge" x="150" y="147">${modeLabel}</text>
            </g>

            ${fault ? html`
              <g><rect x="300" y="112" width="400" height="54" rx="8" fill="#c0392b" />
              <text class="fault" x="500" y="147">⚠ Lüftungsstörung</text></g>
            ` : nothing}

            <path d="M210 275H390V330H210" class="channel blue" />
            <path d="M610 275H790V330H610" class="channel red" />
            <path d="M210 430H390V485H210" class="channel red" />
            <path d="M610 430H790V485H610" class="channel blue" />
            <g class="arrows">
              <path d="m335 285 35 18-35 18Z" /><path d="m665 285-35 18 35 18Z" />
              <path d="m300 430-35 28 35 27Z" /><path d="m700 430 35 28-35 27Z" />
            </g>

            <text class="reading blue-fill" x="218" y="255">Außenluft ${this.temperature("outside_temp")}</text>
            <text class="reading red-fill" x="782" y="255">Zuluft ${this.temperature("supply_temp")}</text>
            <text class="reading red-fill" x="218" y="415">Abluft ${this.temperature("inside_temp")}</text>
            <text class="reading blue-fill" x="782" y="415">Fortluft ${this.temperature("exhaust_temp")}</text>

            <rect x="405" y="270" width="190" height="220" rx="25" fill="#111a22" stroke="#d8e2e8" stroke-width="7" />
            <path d="m445 315 110 130M555 315 445 445" stroke="#f4f7f9" stroke-width="25" stroke-linecap="round" />
            <circle cx="500" cy="380" r="22" fill="#95a5a6" />
            <text class="brand" x="500" y="530">COMFOAIR Q</text>

            ${showFooter ? html`
              <g class="clickable" @click=${() => this.moreInfo("bypass")} tabindex="0" role="button">
                <text class="footer" x="180" y="610">Bypass: ${this.value("bypass")}</text>
              </g>
              <text class="footer" x="500" y="610">Filter: ${this.value("filter_days")} Tage</text>
              <g class="clickable" @click=${() => this.moreInfo("boost")} tabindex="0" role="button">
                <rect x="730" y="574" width="215" height="52" rx="26" fill="rgba(231,76,60,.85)" />
                <text class="footer" x="838" y="608">Boost: ${this.value("boost")}</text>
              </g>
            ` : nothing}
          </svg>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host { display: block; }
    ha-card { overflow: hidden; background: transparent; }
    .graphic, svg { display: block; width: 100%; }
    svg { height: auto; font-family: var(--paper-font-body1_-_font-family, sans-serif); }
    text { fill: #fff; dominant-baseline: auto; }
    .header { font-size: 24px; font-weight: 700; text-anchor: middle; }
    .badge, .fault { font-size: 23px; font-weight: 700; text-anchor: middle; }
    .channel { fill: none; stroke-width: 22; }
    .blue { stroke: #3498db; } .red { stroke: #e74c3c; }
    .blue-fill { fill: #3498db; } .red-fill { fill: #e74c3c; }
    .arrows { fill: #f4f7f9; }
    .reading { font-size: 23px; font-weight: 700; text-anchor: middle; }
    .brand { fill: #dce6eb; font-size: 25px; text-anchor: middle; }
    .footer { font-size: 21px; text-anchor: middle; }
    .clickable { cursor: pointer; outline: none; }
    .clickable:focus rect { stroke: #fff; stroke-width: 3; }
  `;
}

if (!customElements.get("comfoair-hausgrafik")) {
  customElements.define("comfoair-hausgrafik", ComfoAirHausgrafik);
}
