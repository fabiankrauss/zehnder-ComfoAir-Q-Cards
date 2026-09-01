(()=>{var yt=Object.defineProperty;var $t=(r,t,e)=>t in r?yt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var S=(r,t,e)=>$t(r,typeof t!="symbol"?t+"":t,e);var I=globalThis,j=I.ShadowRoot&&(I.ShadyCSS===void 0||I.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),tt=new WeakMap,C=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(j&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=tt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&tt.set(e,t))}return t}toString(){return this.cssText}},et=r=>new C(typeof r=="string"?r:r+"",void 0,z),B=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new C(e,r,z)},st=(r,t)=>{if(j)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=I.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},V=j?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return et(e)})(r):r;var{is:bt,defineProperty:vt,getOwnPropertyDescriptor:xt,getOwnPropertyNames:At,getOwnPropertySymbols:Et,getPrototypeOf:wt}=Object,_=globalThis,it=_.trustedTypes,St=it?it.emptyScript:"",Ct=_.reactiveElementPolyfillSupport,k=(r,t)=>r,K={toAttribute(r,t){switch(t){case Boolean:r=r?St:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ot=(r,t)=>!bt(r,t),rt={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:ot};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=rt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&vt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=xt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let c=i?.call(this);o?.call(this,n),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??rt}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;let t=wt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){let e=this.properties,s=[...At(e),...Et(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(V(i))}else t!==void 0&&e.push(V(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return st(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:K).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:K;this._$Em=i;let c=n.fromAttribute(e,o.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let n=this.constructor;if(i===!1&&(o=this[t]),s??(s=n.getPropertyOptions(t)),!((s.hasChanged??ot)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:n}=o,c=this[i];n!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,o,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[k("elementProperties")]=new Map,f[k("finalized")]=new Map,Ct?.({ReactiveElement:f}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.1.2");var H=globalThis,nt=r=>r,D=H.trustedTypes,at=D?D.createPolicy("lit-html",{createHTML:r=>r}):void 0,pt="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,ft="?"+g,kt=`<${ft}>`,v=document,U=()=>v.createComment(""),R=r=>r===null||typeof r!="object"&&typeof r!="function",X=Array.isArray,Pt=r=>X(r)||typeof r?.[Symbol.iterator]=="function",F=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ht=/-->/g,lt=/>/g,$=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ct=/'/g,dt=/"/g,mt=/^(?:script|style|textarea|title)$/i,Y=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),A=Y(1),Dt=Y(2),qt=Y(3),x=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ut=new WeakMap,b=v.createTreeWalker(v,129);function _t(r,t){if(!X(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return at!==void 0?at.createHTML(t):t}var Ht=(r,t)=>{let e=r.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",n=P;for(let c=0;c<e;c++){let a=r[c],d,u,h=-1,p=0;for(;p<a.length&&(n.lastIndex=p,u=n.exec(a),u!==null);)p=n.lastIndex,n===P?u[1]==="!--"?n=ht:u[1]!==void 0?n=lt:u[2]!==void 0?(mt.test(u[2])&&(i=RegExp("</"+u[2],"g")),n=$):u[3]!==void 0&&(n=$):n===$?u[0]===">"?(n=i??P,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?$:u[3]==='"'?dt:ct):n===dt||n===ct?n=$:n===ht||n===lt?n=P:(n=$,i=void 0);let m=n===$&&r[c+1].startsWith("/>")?" ":"";o+=n===P?a+kt:h>=0?(s.push(d),a.slice(0,h)+pt+a.slice(h)+g+m):a+g+(h===-2?c:m)}return[_t(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},M=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0,c=t.length-1,a=this.parts,[d,u]=Ht(t,e);if(this.el=r.createElement(d,s),b.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=b.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(pt)){let p=u[n++],m=i.getAttribute(h).split(g),L=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:L[2],strings:m,ctor:L[1]==="."?Z:L[1]==="?"?Q:L[1]==="@"?J:w}),i.removeAttribute(h)}else h.startsWith(g)&&(a.push({type:6,index:o}),i.removeAttribute(h));if(mt.test(i.tagName)){let h=i.textContent.split(g),p=h.length-1;if(p>0){i.textContent=D?D.emptyScript:"";for(let m=0;m<p;m++)i.append(h[m],U()),b.nextNode(),a.push({type:2,index:++o});i.append(h[p],U())}}}else if(i.nodeType===8)if(i.data===ft)a.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(g,h+1))!==-1;)a.push({type:7,index:o}),h+=g.length-1}o++}}static createElement(t,e){let s=v.createElement("template");return s.innerHTML=t,s}};function E(r,t,e=r,s){if(t===x)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=R(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=E(r,i._$AS(r,t.values),i,s)),t}var W=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??v).importNode(e,!0);b.currentNode=i;let o=b.nextNode(),n=0,c=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new O(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new G(o,this,t)),this._$AV.push(d),a=s[++c]}n!==a?.index&&(o=b.nextNode(),n++)}return b.currentNode=v,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},O=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),R(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==x&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Pt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(v.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=M.createElement(_t(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new W(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=ut.get(t.strings);return e===void 0&&ut.set(t.strings,e=new M(t)),e}k(t){X(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new r(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=nt(t).nextSibling;nt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,i){let o=this.strings,n=!1;if(o===void 0)t=E(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else{let c=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=E(this,c[s+a],e,a),d===x&&(d=this._$AH[a]),n||(n=!R(d)||d!==this._$AH[a]),d===l?t=l:t!==l&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!i&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Z=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},Q=class extends w{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},J=class extends w{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??l)===x)return;let s=this._$AH,i=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==l&&(s===l||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},G=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Ut=H.litHtmlPolyfillSupport;Ut?.(M,O),(H.litHtmlVersions??(H.litHtmlVersions=[])).push("3.3.3");var gt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new O(t.insertBefore(U(),o),o,void 0,e??{})}return i._$AI(r),i};var N=globalThis,y=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=gt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};y._$litElement$=!0,y.finalized=!0,N.litElementHydrateSupport?.({LitElement:y});var Rt=N.litElementPolyfillSupport;Rt?.({LitElement:y});(N.litElementVersions??(N.litElementVersions=[])).push("4.2.2");var Mt=["humidity","co2","fan","vent_mode","outside_temp","supply_temp","inside_temp","exhaust_temp","bypass","filter_days","boost","fault"],Ot={humidity:"sensor.comfoair_q_inside_humidity",co2:"sensor.wohnzimmer_co2",fan:"fan.comfoair_q",vent_mode:"select.comfoair_q_ventilation_mode",outside_temp:"sensor.comfoair_q_outside_temperature",supply_temp:"sensor.comfoair_q_supply_temperature",inside_temp:"sensor.comfoair_q_inside_temperature",exhaust_temp:"sensor.comfoair_q_exhaust_temperature",bypass:"select.comfoair_q_bypass_mode",filter_days:"sensor.comfoair_q_days_to_replace_filter",boost:"select.comfoair_q_boost_mode",fault:"binary_sensor.luftung_storung"},T=class extends y{constructor(){super(...arguments);S(this,"hass");S(this,"_config")}static async createConfigElement(){if(!customElements.get("comfoair-hausgrafik-editor")){let s=Array.from(document.scripts).find(i=>i.src.includes("comfoair-hausgrafik.js"))?.src.replace(/comfoair-hausgrafik\.js(?:\?.*)?$/,"comfoair-hausgrafik-editor.js");if(!s)throw new Error("ComfoAir Hausgrafik: Editor-Bundle konnte nicht gefunden werden.");await new Promise((i,o)=>{let n=document.createElement("script");n.type="module",n.src=s,n.onload=()=>i(),n.onerror=()=>o(new Error("ComfoAir Hausgrafik: Editor konnte nicht geladen werden.")),document.head.append(n)})}return document.createElement("comfoair-hausgrafik-editor")}static getConfigElement(){return this.createConfigElement()}static getConfigElementAsync(){return this.createConfigElement()}static getStubConfig(){return{entities:{...Ot},show_header:!0,show_footer:!0}}getLovelace(){let e=document.querySelector("home-assistant");return e=e?.shadowRoot?.querySelector("home-assistant-main"),e=e?.shadowRoot?.querySelector("app-drawer-layout partial-panel-resolver, ha-drawer partial-panel-resolver"),e=e?.shadowRoot?.querySelector("ha-panel-lovelace"),e?.lovelace}setConfig(e){if(!e||typeof e.entities!="object"||Array.isArray(e.entities))throw new Error("ComfoAir Hausgrafik: 'entities' muss ein Objekt mit 12 Entity-IDs sein.");let s=Mt.filter(i=>typeof e.entities[i]!="string"||!e.entities[i].trim());if(s.length)throw new Error(`ComfoAir Hausgrafik: Pflicht-Entities fehlen: ${s.join(", ")}`);this._config={...e,entities:{...e.entities}}}state(e){let s=this._config?.entities[e];return s?this.hass?.states?.[s]:void 0}value(e,s=""){let i=this.state(e);return!i||["unknown","unavailable"].includes(i.state)?"\u2014":`${i.state}${s}`}temperature(e){let s=this.state(e);if(!s||["unknown","unavailable"].includes(s.state))return"\u2014";let i=Number(s.state);return Number.isFinite(i)?`${i.toFixed(1)} ${s.attributes?.unit_of_measurement??"\xB0C"}`:"\u2014"}numericState(e){let s=Number(this.state(e)?.state);return Number.isFinite(s)?s:void 0}heatRecoveryEfficiency(){let e=this.numericState("supply_temp"),s=this.numericState("outside_temp"),i=this.numericState("inside_temp");if(e===void 0||s===void 0||i===void 0)return;let o=i-s;if(!(o<=2))return(e-s)/o*100}fanLevel(){let e=Number(this.state("fan")?.attributes?.percentage??0);return e<17?0:e<50?1:e<83?2:3}moreInfo(e){let s=this._config?.entities[e];s&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:s}}))}render(){if(!this._config||!this.hass)return l;let e=this._config.show_header!==!1,s=this._config.show_footer!==!1,i=this.state("vent_mode")?.state,o=i==="auto"?"Automatik":i==="manual"?"Manuell":"Unbekannt",n=this.state("fault")?.state==="on",c=this.fanLevel(),a=this.heatRecoveryEfficiency();return A`
      <ha-card>
        <div class="graphic">
          <svg viewBox="0 0 1000 650" role="img" aria-label="ComfoAir Lüftungsübersicht">
            <rect width="1000" height="650" rx="30" fill="#18222d" />
            <path d="M260 285 500 95 740 285V560H260Z" fill="#243442" stroke="#b8c7d1" stroke-width="9" />

            ${e?A`
              <rect class="glass" x="35" y="20" width="930" height="62" rx="16" />
              <text class="header" x="155" y="58">Feuchte ${this.value("humidity"," %")}</text>
              <text class="header" x="500" y="58">CO₂ ${this.value("co2"," ppm")}</text>
              <text class="header level" x="807" y="58">Level ${c}</text>
              <g class="level-dots" aria-label="${c} von 3 Lüfterstufen">
                ${[1,2,3].map((d,u)=>A`<circle cx=${884+u*23} cy="50" r="7" class=${c>=d?"active":""} />`)}
              </g>
            `:l}

            <g class="clickable interactive" @click=${()=>this.moreInfo("vent_mode")} tabindex="0" role="button">
              <rect x="55" y="112" width="190" height="54" rx="27" fill="#34495e" />
              <text class="badge" x="150" y="147">${o}</text>
            </g>

            ${a!==void 0?A`
              <g class="efficiency" title="Wärmerückgewinnung = (Zuluft − Außenluft) / (Abluft − Außenluft) × 100">
                <rect x="770" y="92" width="175" height="48" rx="24" />
                <foreignObject x="788" y="103" width="28" height="28"><ha-icon icon="mdi:recycle"></ha-icon></foreignObject>
                <text x="870" y="124">${Math.round(a)} % WRG</text>
              </g>
            `:l}

            ${n?A`
              <g class="fault-banner"><rect x="300" y="112" width="400" height="54" rx="8" fill="#c0392b" />
              <text class="fault" x="500" y="147">⚠ Lüftungsstörung</text></g>
            `:l}

            <path d="M210 275H390V330H210" class="channel" stroke="#3498db" />
            <path d="M610 275H790V330H610" class="channel" stroke="#e74c3c" />
            <path d="M210 430H390V485H210" class="channel" stroke="#e74c3c" />
            <path d="M610 430H790V485H610" class="channel" stroke="#3498db" />
            <g class="arrows">
              <path d="m340 291 24 12-24 12Z" fill="#3498db" /><path d="m660 291-24 12 24 12Z" fill="#e74c3c" />
              <path d="m294 439-24 19 24 19Z" fill="#e74c3c" /><path d="m706 439 24 19-24 19Z" fill="#3498db" />
            </g>

            <text class="air-label blue start" x="218" y="226">Außenluft</text>
            <text class="temperature blue start" x="218" y="252">${this.temperature("outside_temp")}</text>
            <text class="air-label red end" x="782" y="226">Zuluft</text>
            <text class="temperature red end" x="782" y="252">${this.temperature("supply_temp")}</text>
            <text class="air-label red start" x="218" y="385">Abluft</text>
            <text class="temperature red start" x="218" y="411">${this.temperature("inside_temp")}</text>
            <text class="air-label blue end" x="782" y="385">Fortluft</text>
            <text class="temperature blue end" x="782" y="411">${this.temperature("exhaust_temp")}</text>

            <rect x="405" y="270" width="190" height="220" rx="25" fill="#111a22" stroke="#d8e2e8" stroke-width="7" />
            <path d="m450 320 100 120M550 320 450 440" stroke="#f4f7f9" stroke-width="21" stroke-linecap="round" />
            <circle cx="500" cy="380" r="22" fill="#95a5a6" />
            <text class="brand" x="500" y="530">COMFOAIR Q</text>

            ${s?A`
              <rect class="glass" x="35" y="570" width="930" height="64" rx="16" />
              <g class="clickable interactive footer-control" @click=${()=>this.moreInfo("bypass")} tabindex="0" role="button">
                <rect x="65" y="580" width="230" height="44" rx="22" />
                <text class="footer" x="180" y="610">Bypass: ${this.value("bypass")}</text>
              </g>
              <text class="footer" x="500" y="610">Filter: ${this.value("filter_days")} Tage</text>
              <g class="clickable interactive" @click=${()=>this.moreInfo("boost")} tabindex="0" role="button">
                <rect x="730" y="574" width="215" height="52" rx="26" fill="rgba(231,76,60,.85)" />
                <text class="footer" x="838" y="608">Boost: ${this.value("boost")}</text>
              </g>
            `:l}
          </svg>
        </div>
      </ha-card>
    `}};S(T,"properties",{hass:{attribute:!1},_config:{state:!0}}),S(T,"styles",B`
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
    .channel { fill: none; stroke-width: 13; stroke-linecap: round; }
    .air-label { font-size: 14px; font-weight: 600; letter-spacing: .04em; }
    .temperature { font-size: 20px; font-weight: 800; }
    .blue { fill: #3498db; }
    .red { fill: #e74c3c; }
    .start { text-anchor: start; }
    .end { text-anchor: end; }
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
      .fault-banner { animation: none; }
      .interactive { transition: none; }
    }
  `);customElements.get("comfoair-hausgrafik")||customElements.define("comfoair-hausgrafik",T);var q=window;q.customCards=q.customCards||[];q.customCards.some(r=>r.type==="comfoair-hausgrafik")||q.customCards.push({type:"comfoair-hausgrafik",name:"ComfoAir Hausgrafik",description:"Hausgrafik f\xFCr Zehnder ComfoAir Q"});})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
