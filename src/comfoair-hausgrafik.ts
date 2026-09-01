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

const DEFAULT_ENTITIES: Record<EntityKey, string> = {
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

class ComfoAirHausgrafik extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  hass: any;
  private _config?: CardConfig;

  private static async createConfigElement() {
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

  static getConfigElement() {
    return this.createConfigElement();
  }

  static getConfigElementAsync() {
    return this.createConfigElement();
  }

  static getStubConfig() {
    return { entities: { ...DEFAULT_ENTITIES }, show_header: true, show_footer: true };
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
    const temperature = Number(entity.state);
    if (!Number.isFinite(temperature)) return "—";
    return `${temperature.toFixed(1)} ${entity.attributes?.unit_of_measurement ?? "°C"}`;
  }

  private numericState(key: EntityKey): number | undefined {
    const value = Number(this.state(key)?.state);
    return Number.isFinite(value) ? value : undefined;
  }

  private airTheme(key: EntityKey): "warm" | "cold" {
    const temperature = this.numericState(key);
    const inside = this.numericState("inside_temp");
    return temperature !== undefined && inside !== undefined && temperature > inside ? "warm" : "cold";
  }

  private heatRecoveryEfficiency(): number | undefined {
    const supply = this.numericState("supply_temp");
    const outside = this.numericState("outside_temp");
    const extract = this.numericState("inside_temp");
    if (supply === undefined || outside === undefined || extract === undefined) return undefined;
    const denominator = extract - outside;
    if (denominator <= 2) return undefined;
    return (supply - outside) / denominator * 100;
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
    const level = this.fanLevel();
    const efficiency = this.heatRecoveryEfficiency();
    const air = (key: EntityKey) => this.airTheme(key);

    return html`
      <ha-card style=${`--flow-duration: ${Math.max(0.65, 2.3 - level * 0.45)}s`}>
        <div class="graphic">
          <svg viewBox="0 0 1000 650" role="img" aria-label="ComfoAir Lüftungsübersicht">
            <defs>
              <linearGradient id="air-warm" x1="0" x2="1"><stop stop-color="#e74c3c"/><stop offset="1" stop-color="#f39c12"/></linearGradient>
              <linearGradient id="air-cold" x1="0" x2="1"><stop stop-color="#3498db"/><stop offset="1" stop-color="#2ecc71"/></linearGradient>
            </defs>
            <rect width="1000" height="650" rx="30" fill="#18222d" />
            <path d="M260 285 500 95 740 285V560H260Z" fill="#243442" stroke="#b8c7d1" stroke-width="9" />

            ${showHeader ? html`
              <rect class="glass" x="35" y="20" width="930" height="62" rx="16" />
              <text class="header" x="155" y="58">Feuchte ${this.value("humidity", " %")}</text>
              <text class="header" x="500" y="58">CO₂ ${this.value("co2", " ppm")}</text>
              <text class="header level" x="807" y="58">Level ${level}</text>
              <g class="level-dots" aria-label="${level} von 3 Lüfterstufen">
                ${[1, 2, 3].map((segment, index) => html`<circle cx=${884 + index * 23} cy="50" r="7" class=${level >= segment ? "active" : ""} />`)}
              </g>
            ` : nothing}

            <g class="clickable interactive" @click=${() => this.moreInfo("vent_mode")} tabindex="0" role="button">
              <rect x="55" y="112" width="190" height="54" rx="27" fill="#34495e" />
              <text class="badge" x="150" y="147">${modeLabel}</text>
            </g>

            ${efficiency !== undefined ? html`
              <g class="efficiency" title="Wärmerückgewinnung = (Zuluft − Außenluft) / (Abluft − Außenluft) × 100">
                <rect x="770" y="92" width="175" height="48" rx="24" />
                <foreignObject x="788" y="103" width="28" height="28"><ha-icon icon="mdi:recycle"></ha-icon></foreignObject>
                <text x="870" y="124">${Math.round(efficiency)} % WRG</text>
              </g>
            ` : nothing}

            ${fault ? html`
              <g class="fault-banner"><rect x="300" y="112" width="400" height="54" rx="8" fill="#c0392b" />
              <text class="fault" x="500" y="147">⚠ Lüftungsstörung</text></g>
            ` : nothing}

            <path d="M210 275H390V330H210" class="channel flow-forward" color=${air("outside_temp") === "warm" ? "#e74c3c" : "#3498db"} stroke=${`url(#air-${air("outside_temp")})`} />
            <path d="M610 275H790V330H610" class="channel flow-reverse" color=${air("supply_temp") === "warm" ? "#e74c3c" : "#3498db"} stroke=${`url(#air-${air("supply_temp")})`} />
            <path d="M210 430H390V485H210" class="channel flow-reverse" color=${air("inside_temp") === "warm" ? "#e74c3c" : "#3498db"} stroke=${`url(#air-${air("inside_temp")})`} />
            <path d="M610 430H790V485H610" class="channel flow-forward" color=${air("exhaust_temp") === "warm" ? "#e74c3c" : "#3498db"} stroke=${`url(#air-${air("exhaust_temp")})`} />
            <g class="arrows">
              <path d="m335 285 35 18-35 18Z" /><path d="m665 285-35 18 35 18Z" />
              <path d="m300 430-35 28 35 27Z" /><path d="m700 430 35 28-35 27Z" />
            </g>

            ${this.airReading("Außenluft", "outside_temp", 218, 226, "start")}
            ${this.airReading("Zuluft", "supply_temp", 782, 226, "end")}
            ${this.airReading("Abluft", "inside_temp", 218, 385, "start")}
            ${this.airReading("Fortluft", "exhaust_temp", 782, 385, "end")}

            <rect x="405" y="270" width="190" height="220" rx="25" fill="#111a22" stroke="#d8e2e8" stroke-width="7" />
            <path d="m445 315 110 130M555 315 445 445" stroke="#f4f7f9" stroke-width="25" stroke-linecap="round" />
            <circle cx="500" cy="380" r="22" fill="#95a5a6" />
            <text class="brand" x="500" y="530">COMFOAIR Q</text>

            ${showFooter ? html`
              <rect class="glass" x="35" y="570" width="930" height="64" rx="16" />
              <g class="clickable interactive footer-control" @click=${() => this.moreInfo("bypass")} tabindex="0" role="button">
                <rect x="65" y="580" width="230" height="44" rx="22" />
                <text class="footer" x="180" y="610">Bypass: ${this.value("bypass")}</text>
              </g>
              <text class="footer" x="500" y="610">Filter: ${this.value("filter_days")} Tage</text>
              <g class="clickable interactive" @click=${() => this.moreInfo("boost")} tabindex="0" role="button">
                <rect x="730" y="574" width="215" height="52" rx="26" fill="rgba(231,76,60,.85)" />
                <text class="footer" x="838" y="608">Boost: ${this.value("boost")}</text>
              </g>
            ` : nothing}
          </svg>
        </div>
      </ha-card>
    `;
  }

  private airReading(label: string, key: EntityKey, x: number, y: number, anchor: "start" | "end") {
    const theme = this.airTheme(key);
    const color = theme === "warm" ? "#e74c3c" : "#3498db";
    return html`<g class="air-reading" fill=${`url(#air-${theme})`} style=${`text-anchor:${anchor}`}>
      <text class="air-label" x=${x} y=${y} color=${color}>${label}</text>
      <text class="temperature" x=${x} y=${y + 26} color=${color} fill=${`url(#air-${theme})`}>${this.temperature(key)}</text>
    </g>`;
  }

  static styles = css`
    :host { display: block; }
    ha-card { overflow: hidden; background: transparent; }
    .graphic, svg { display: block; width: 100%; }
    svg { height: auto; font-family: var(--paper-font-body1_-_font-family, sans-serif); }
    text { fill: #fff; dominant-baseline: auto; }
    .header { font-size: 24px; font-weight: 700; text-anchor: middle; }
    .glass { fill: rgba(255,255,255,.06); stroke: rgba(255,255,255,.12); stroke-width: 1.5; backdrop-filter: blur(8px); }
    .level { text-anchor: end; }
    .level-dots circle { fill: rgba(255,255,255,.18); stroke: rgba(255,255,255,.32); stroke-width: 1; }
    .level-dots circle.active { fill: #2ecc71; stroke: #75e6a5; }
    .badge, .fault { font-size: 23px; font-weight: 700; text-anchor: middle; }
    .channel { fill: none; stroke-width: 22; stroke-linecap: round; stroke-dasharray: 28 14; animation: flow-forward var(--flow-duration) linear infinite; }
    .channel.flow-reverse { animation-name: flow-reverse; }
    @keyframes flow-forward { to { stroke-dashoffset: -84; } }
    @keyframes flow-reverse { to { stroke-dashoffset: 84; } }
    .arrows { fill: #f4f7f9; }
    .air-label { fill: #aebbc4; font-size: 14px; font-weight: 600; letter-spacing: .04em; }
    .temperature { font-size: 20px; font-weight: 800; }
    .air-reading .temperature { fill: inherit; }
    .brand { fill: #dce6eb; font-size: 25px; text-anchor: middle; }
    .footer { font-size: 21px; text-anchor: middle; }
    .clickable { cursor: pointer; outline: none; }
    .interactive { transform-box: fill-box; transform-origin: center; transition: transform 150ms ease; }
    .interactive rect { stroke: rgba(255,255,255,.22); stroke-width: 1.5; transition: stroke 150ms ease; }
    .interactive:hover { transform: scale(1.04); }
    .interactive:hover rect, .interactive:focus rect { stroke: rgba(255,255,255,.75); stroke-width: 2.5; }
    .footer-control rect { fill: rgba(255,255,255,.04); }
    .efficiency rect { fill: rgba(46,204,113,.16); stroke: rgba(117,230,165,.55); stroke-width: 1.5; }
    .efficiency text { fill: #bdf3d4; font-size: 17px; font-weight: 700; text-anchor: middle; }
    .efficiency ha-icon { color: #75e6a5; width: 24px; height: 24px; }
    .fault-banner { animation: fault-pulse 1.4s ease-in-out infinite; }
    @keyframes fault-pulse { 50% { opacity: .55; } }
    @media (prefers-reduced-motion: reduce) {
      .channel, .fault-banner { animation: none; }
      .interactive { transition: none; }
    }
  `;
}

if (!customElements.get("comfoair-hausgrafik")) {
  customElements.define("comfoair-hausgrafik", ComfoAirHausgrafik);
}

const customCardsWindow = window as typeof window & { customCards?: Array<Record<string, string>> };
customCardsWindow.customCards = customCardsWindow.customCards || [];
if (!customCardsWindow.customCards.some((card) => card.type === "comfoair-hausgrafik")) {
  customCardsWindow.customCards.push({
    type: "comfoair-hausgrafik",
    name: "ComfoAir Hausgrafik",
    description: "Hausgrafik für Zehnder ComfoAir Q",
  });
}
