// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"iJYvl":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "5c1b77e3b71e74eb";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"h7u1C":[function(require,module,exports) {
var _mapGrid = require("./MapGrid");
var _coord = require("./Coord");
var _mapExplorer = require("./MapExplorer");
var _pathFinder = require("./PathFinder");
var _tsp = require("./TSP");
// if bigger than 10x10, it will repeat the pattern from the map below
let WIDTH = 10;
let HEIGHT = 10;
let arr = [
    ".",
    "o",
    ".",
    ".",
    "o",
    "x",
    ".",
    "o",
    "x",
    "x",
    ".",
    ".",
    ".",
    ".",
    "x",
    "x",
    ".",
    ".",
    ".",
    ".",
    ".",
    "x",
    "x",
    ".",
    "x",
    ".",
    ".",
    ".",
    ".",
    ".",
    "o",
    ".",
    "x",
    "x",
    ".",
    "x",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "x",
    "o",
    ".",
    "x",
    ".",
    ".",
    "o",
    ".",
    ".",
    ".",
    "x",
    ".",
    ".",
    ".",
    "x",
    ".",
    ".",
    ".",
    ".",
    "o",
    "x",
    "x",
    ".",
    ".",
    "x",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "x",
    ".",
    "x",
    "x",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "o",
    ".",
    ".",
    ".",
    "x",
    ".",
    "x",
    "o",
    ".",
    ".", 
];
const realMap = new (0, _mapGrid.MapGrid)(WIDTH, HEIGHT);
for(let i = 0; i < HEIGHT; i++)for(let j = 0; j < WIDTH; j++)// repeat pattern from the map above
switch(arr[10 * (i % 10) + j % 10]){
    case ".":
        realMap.setTile((0, _coord.makeCoord)(j, i), "ROAD");
        break;
    case "x":
        realMap.setTile((0, _coord.makeCoord)(j, i), "WALL");
        break;
    case "o":
        realMap.setTile((0, _coord.makeCoord)(j, i), "CITY");
        break;
    default:
        throw new Error("Unknown map tile");
}
realMap.generateNeighbors();
const getStartingCity = ()=>{
    console.log("Finding a starting city:");
    const cities = realMap.mapArray.filter((a)=>a.type === "CITY").length;
    console.log("Cities: " + cities);
    const randomLoc = Math.floor(cities / 2);
    let cnt = 0;
    const cityTile = realMap.mapArray.find((val)=>val.type === "CITY" && ++cnt === randomLoc);
    return cityTile;
};
const originalCoord = getStartingCity();
const explorer = new (0, _mapExplorer.MapExplorer)(WIDTH, HEIGHT);
const gen = explorer.exploreMapIteratively(originalCoord.coord, realMap);
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
canvas.height = canvasWidth * (HEIGHT / WIDTH);
const drawCanvas = ()=>{
    const stack = explorer.checkpointStack.getNodes();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < WIDTH; i++)for(let j = 0; j < HEIGHT; j++){
        const coord = (0, _coord.makeCoord)(i, j);
        const tile = explorer.blindMap.getTile(coord);
        switch(tile.type){
            case "UNKNOWN":
                ctx.fillStyle = "#11111155";
                break;
            case "ROAD":
                ctx.fillStyle = "#22992255";
                break;
            case "WALL":
                ctx.fillStyle = "#55555555";
                break;
            case "CITY":
                ctx.fillStyle = "#CD444455";
                break;
        }
        if ((0, _coord.coordEq)(explorer.current, tile.coord)) ctx.fillStyle = "#EFEFEF";
        const blockSize = canvasWidth / WIDTH;
        ctx.fillRect(i * blockSize, j * blockSize, blockSize - 1, blockSize - 1);
        const ratio = WIDTH / 10;
        if (WIDTH < 30) {
            ctx.font = `${18 / ratio}px courier new`;
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(`[${i},${j}]`, i * blockSize + 10 / ratio, j * blockSize + 45 / ratio);
            const backTrace = explorer.backTrack[realMap.coordToIndex(coord)];
            if (backTrace) {
                const toCoord = realMap.indexToCoord(backTrace);
                const isLeft = toCoord.x === coord.x - 1;
                const isRight = toCoord.x === coord.x + 1;
                const isTop = toCoord.y === coord.y - 1;
                const isBottom = toCoord.y === coord.y + 1;
                ctx.fillStyle = "#FFFF00";
                const symbol = isLeft ? "←" : isRight ? "→" : isTop ? "↑" : "↓";
                ctx.font = `${30 / ratio}px courier new`;
                ctx.fillText(symbol, i * blockSize + 30 / ratio, j * blockSize + 70 / ratio);
            }
            const isInStack = stack.find((t)=>(0, _coord.coordEq)(t, coord));
            if (isInStack) {
                ctx.fillStyle = "#ADADAD";
                ctx.fillRect(i * blockSize, j * blockSize, 10 / ratio, 10 / ratio);
            }
        }
    }
};
let lastCoord = null;
let interval = setInterval(()=>{
    const status = gen.next();
    drawCanvas();
    if (status.done) {
        clearInterval(interval);
        // render dijkstra
        const path = new (0, _pathFinder.PathFinder)().findPath(lastCoord, originalCoord.coord, realMap);
        const blockSize = canvasWidth / WIDTH;
        path.forEach((coord)=>{
            ctx.fillStyle = "#FF555522";
            ctx.fillRect(coord.x * blockSize, coord.y * blockSize, blockSize - 1, blockSize - 1);
        });
        // now for the salesman problem:
        // 1) for each city, run dijkstra
        const cities = realMap.mapArray.filter((a)=>a.type === "CITY");
        const refPoint = realMap.mapArray.find((a)=>a.type === "ROAD");
        const pathFinder = new (0, _pathFinder.PathFinder)();
        const distanceArray = [];
        let cityIndex = 0;
        const citiesCnt = cities.length;
        for (let city of cities){
            pathFinder.findPath(city.coord, refPoint.coord, realMap);
            const minSteps = pathFinder.steps;
            let city2Index = 0;
            for (let city2 of cities){
                // distance between CITY and CITY2
                const distIndex = city2Index * citiesCnt + cityIndex;
                distanceArray[distIndex] = minSteps[realMap.coordToIndex(city2.coord)];
                city2Index++;
            }
            cityIndex++;
        }
        let print = "";
        for(let i = 0; i < citiesCnt; i++){
            for(let j = 0; j < citiesCnt; j++){
                let index = i * citiesCnt + j;
                print += `[${distanceArray[index]}] `;
            }
            print += "\n";
        }
        console.log(print);
        // 2) find solution for that spanning tree
        const cityWhereWeAre = cities.findIndex((c)=>(0, _coord.coordEq)(c.coord, originalCoord.coord));
        new (0, _tsp.TSP)(distanceArray, citiesCnt, citiesCnt).TSP(cityWhereWeAre);
    } else lastCoord = status.value.tile.coord;
}, 20); // another ideas:
 // https://en.wikipedia.org/wiki/Flood_fill
 // https://gamedev.stackexchange.com/questions/55344/algorithm-for-exploring-filling-grid-map

},{"./MapGrid":"5i7Xm","./Coord":"hANUT","./MapExplorer":"fzWxn","./PathFinder":"i3Uq0","./TSP":"j9PIn"}],"5i7Xm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 2D map structure
 */ parcelHelpers.export(exports, "MapGrid", ()=>MapGrid);
var _coord = require("./Coord");
var _mapTile = require("./MapTile");
class MapGrid {
    mapArray = [];
    neighborsGenerated = false;
    constructor(width, height){
        this.width = width;
        this.height = height;
    }
    coordToIndex = (coord)=>{
        const { x , y  } = coord;
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) throw new Error(`Coordinate [${coord.x},${coord.y}] outside the boundaries!`);
        return y * this.width + x;
    };
    indexToCoord = (x)=>{
        return (0, _coord.makeCoord)(x % this.width, Math.floor(x / this.width));
    };
    isInsideMap = (coord)=>{
        return coord.x >= 0 && coord.y >= 0 && coord.x < this.width && coord.y < this.height;
    };
    getTile(coord) {
        if (!this.isInsideMap(coord)) return null;
        return this.mapArray[this.coordToIndex(coord)];
    }
    setTile(coord, type) {
        this.mapArray[this.coordToIndex(coord)] = new (0, _mapTile.MapTile)(coord, type);
    }
    generateNeighbors() {
        for (let tile of this.mapArray){
            // this structure is not actually needed
            tile.neighbors = {
                left: this.getTile((0, _coord.coordLeft)(tile.coord)),
                right: this.getTile((0, _coord.coordRight)(tile.coord)),
                top: this.getTile((0, _coord.coordTop)(tile.coord)),
                bottom: this.getTile((0, _coord.coordBottom)(tile.coord)),
                topLeft: this.getTile((0, _coord.coordTopLeft)(tile.coord)),
                topRight: this.getTile((0, _coord.coordTopRight)(tile.coord)),
                bottomLeft: this.getTile((0, _coord.coordBottomLeft)(tile.coord)),
                bottomRight: this.getTile((0, _coord.coordBottomRight)(tile.coord))
            };
            // this order is very important
            tile.directionalNeighbors = [
                tile.neighbors.top,
                tile.neighbors.left,
                tile.neighbors.bottom,
                tile.neighbors.right
            ];
            tile.neighborsArr = [
                tile.neighbors.top,
                tile.neighbors.left,
                tile.neighbors.bottom,
                tile.neighbors.right,
                tile.neighbors.topLeft,
                tile.neighbors.topRight,
                tile.neighbors.bottomLeft,
                tile.neighbors.bottomRight
            ];
        }
        this.neighborsGenerated = true;
    }
}

},{"./Coord":"hANUT","./MapTile":"4h6t3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hANUT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "makeCoord", ()=>makeCoord);
parcelHelpers.export(exports, "coordEq", ()=>coordEq);
parcelHelpers.export(exports, "coordLeft", ()=>coordLeft);
parcelHelpers.export(exports, "coordRight", ()=>coordRight);
parcelHelpers.export(exports, "coordTop", ()=>coordTop);
parcelHelpers.export(exports, "coordBottom", ()=>coordBottom);
parcelHelpers.export(exports, "coordTopLeft", ()=>coordTopLeft);
parcelHelpers.export(exports, "coordTopRight", ()=>coordTopRight);
parcelHelpers.export(exports, "coordBottomLeft", ()=>coordBottomLeft);
parcelHelpers.export(exports, "coordBottomRight", ()=>coordBottomRight);
parcelHelpers.export(exports, "isDirectionalNeighbor", ()=>isDirectionalNeighbor);
const makeCoord = (x, y)=>{
    return {
        x,
        y
    };
};
const coordEq = (a, b)=>{
    return a.x === b.x && a.y === b.y;
};
const coordLeft = (coord)=>{
    return {
        x: coord.x - 1,
        y: coord.y
    };
};
const coordRight = (coord)=>{
    return {
        x: coord.x + 1,
        y: coord.y
    };
};
const coordTop = (coord)=>{
    return {
        x: coord.x,
        y: coord.y - 1
    };
};
const coordBottom = (coord)=>{
    return {
        x: coord.x,
        y: coord.y + 1
    };
};
const coordTopLeft = (coord)=>{
    return {
        x: coord.x - 1,
        y: coord.y - 1
    };
};
const coordTopRight = (coord)=>{
    return {
        x: coord.x + 1,
        y: coord.y - 1
    };
};
const coordBottomLeft = (coord)=>{
    return {
        x: coord.x - 1,
        y: coord.y + 1
    };
};
const coordBottomRight = (coord)=>{
    return {
        x: coord.x + 1,
        y: coord.y + 1
    };
};
const isDirectionalNeighbor = (a, b)=>{
    const distX = Math.abs(a.x - b.x);
    const distY = Math.abs(a.y - b.y);
    return distX <= 1 && distY <= 1 && distX !== distY;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"4h6t3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Structure for map tiles, keeping references to all neighbours
 */ parcelHelpers.export(exports, "MapTile", ()=>MapTile);
class MapTile {
    constructor(coord, type){
        this.coord = coord;
        this.type = type;
    }
    get isWalkable() {
        return this.type === "ROAD" || this.type === "CITY";
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fzWxn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MapExplorer", ()=>MapExplorer);
var _coord = require("./Coord");
var _mapGrid = require("./MapGrid");
var _stack = require("./Stack");
class MapExplorer {
    constructor(width, height){
        this.blindMap = new (0, _mapGrid.MapGrid)(width, height);
        for(let i = 0; i < width; i++)for(let j = 0; j < height; j++)this.blindMap.setTile((0, _coord.makeCoord)(i, j), "UNKNOWN");
    }
    exploreMap(startCoord, map) {
        const generator = this.exploreMapIteratively(startCoord, map);
        let val = generator.next();
        while(!val.done)val = generator.next();
        // return explored map
        return this.blindMap;
    }
    *exploreMapIteratively(startCoord, map) {
        this.reset();
        this.current = startCoord;
        // visit the starting node
        this.exploreTile(startCoord, map.getTile(startCoord).type);
        this.visitNewNode(startCoord);
        this.checkpointStack.push(this.current);
        // we go forward and when we need to go back, we will use the stack
        let canWalkForward = false;
        while(!this.checkpointStack.isEmpty() || canWalkForward){
            if (!canWalkForward) {
                let lastCheckpoint = this.checkpointStack.pop();
                // a little twist -> this will ignore milestones around which all cells have already been discovered
                while(!map.getTile(lastCheckpoint).directionalNeighbors.find((neigh)=>neigh && neigh.isWalkable && !this.isVisited(neigh.coord))){
                    if (this.checkpointStack.isEmpty()) // algorithm termination
                    return null;
                    lastCheckpoint = this.checkpointStack.pop();
                }
                const pathToLastCheckpoint = this.backTrace(lastCheckpoint);
                //walk to the last checkpoint
                for (let coord of pathToLastCheckpoint){
                    this.current = coord;
                    yield {
                        type: "GOTO",
                        tile: map.getTile(coord)
                    };
                }
            }
            let currentTile = map.getTile(this.current);
            // this order is important!
            const neighbors = currentTile.neighborsArr;
            let neighbourToWalk = null;
            let neighboursToWalkCnt = 0;
            for (let neigh of neighbors)// if we are close to map boundaries, some neighbours can be undefined 
            if (neigh) {
                if (!this.isExplored(neigh.coord)) {
                    this.exploreTile(neigh.coord, neigh.type);
                    yield {
                        type: "EXPLORE",
                        tile: neigh
                    };
                }
                if (neigh.isWalkable && (0, _coord.isDirectionalNeighbor)(neigh.coord, this.current) && !this.isVisited(neigh.coord)) {
                    neighbourToWalk = neigh.coord;
                    neighboursToWalkCnt++;
                }
            }
            if (neighboursToWalkCnt > 1) // more than one neighbour -> we need to save a checkpoint
            // for backtracking
            this.checkpointStack.push(this.current);
            if (neighbourToWalk) {
                canWalkForward = true;
                this.visitNewNode(neighbourToWalk);
                yield {
                    type: "GOTO",
                    tile: map.getTile(neighbourToWalk)
                };
            } else canWalkForward = false;
        }
        // generate neighbours as we have already discovered all cells
        this.blindMap.generateNeighbors();
        return null;
    }
    backTrace(target) {
        if ((0, _coord.coordEq)(target, this.current)) // trivial solution -> staying on the same place
        return [
            target
        ];
        if (this.blindMap.getTile(target).type === "UNKNOWN") throw new Error(`Can\'t walk to an unknown area: [${target.x},${target.y}]`);
        if ((0, _coord.isDirectionalNeighbor)(target, this.current)) // semi-trivial solution - going one cell back
        return [
            target
        ];
        else {
            // iterative backtracking
            const path = [];
            let nextStep = this.backTrack.get(this.coordToIndex(this.current));
            const toIndex = this.coordToIndex(target);
            let overFlowCheck = 0;
            while(true){
                path.push(this.indexToCoord(nextStep));
                if (nextStep === toIndex) break;
                nextStep = this.backTrack.get(nextStep);
                if ((overFlowCheck++) >= this.blindMap.width * this.blindMap.height) throw new Error(`Backtrace got in an infinite loop for [${target.x},${target.y}]`);
            }
            return path;
        }
    }
    coordToIndex = (coord)=>this.blindMap.coordToIndex(coord);
    indexToCoord = (index)=>this.blindMap.indexToCoord(index);
    reset() {
        this.backTrack = new Map();
        this.visitedNodes = new Set();
        this.exploredNodes = new Set();
        this.blindMap.generateNeighbors();
        this.checkpointStack = new (0, _stack.Stack)();
    }
    isVisited(coord) {
        return this.visitedNodes.has(this.coordToIndex(coord));
    }
    visitNewNode(coord) {
        this.visitedNodes.add(this.coordToIndex(coord));
        if (!(0, _coord.coordEq)(this.current, coord)) // update backtrack
        this.backTrack.set(this.coordToIndex(coord), this.coordToIndex(this.current));
        this.current = coord;
    }
    isExplored(coord) {
        return this.exploredNodes.has(this.coordToIndex(coord));
    }
    exploreTile(coord, type) {
        this.blindMap.setTile(coord, type);
        this.exploredNodes.add(this.coordToIndex(coord));
    }
}

},{"./Coord":"hANUT","./MapGrid":"5i7Xm","./Stack":"2i5YS","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2i5YS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Stack", ()=>Stack);
class Stack {
    push(node) {
        if (!this.root) this.root = {
            node,
            next: null
        };
        else this.root = {
            node,
            next: this.root
        };
    }
    pop() {
        const top = this.root.node;
        this.root = {
            node: this.root?.next?.node,
            next: this.root?.next?.next
        };
        return top;
    }
    getNodes() {
        const output = [];
        let node = this.root;
        while(node && node.node){
            output.push(node.node);
            node = node.next;
        }
        return output;
    }
    isEmpty() {
        return !this.root || !this.root.node;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i3Uq0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Dijkstra algorithm that uses priority queue to find the shortest
 * path from start node to all other nodes
 */ parcelHelpers.export(exports, "PathFinder", ()=>PathFinder);
var _priorityQueue = require("./PriorityQueue");
class PathFinder {
    findPath(start, end, map) {
        const generator = this.findPathIteratively(start, end, map);
        let val = generator.next();
        while(!val.done)val = generator.next();
        return this.closestPath;
    }
    *findPathIteratively(start, end, map) {
        this.reset();
        const startIndex = map.coordToIndex(start);
        const endIndex = map.coordToIndex(end);
        // steps to all nodes are initialized to infinity, except the starting node
        for(let i = 0; i < map.width * map.height; i++)this.steps.set(i, Infinity);
        this.steps.set(startIndex, 0);
        this.queue.enqueue(start, 0);
        while(!this.queue.isEmpty){
            let currentCoord = this.queue.dequeue();
            yield {
                currentCoord
            };
            let currentIndex = map.coordToIndex(currentCoord);
            let currentPrice = this.steps.get(currentIndex);
            // explore all neighbors and ignore diagonals
            const neighbors = map.getTile(currentCoord).directionalNeighbors;
            neighbors.forEach((neigh)=>{
                if (neigh && neigh.isWalkable) {
                    const neighbourIndex = map.coordToIndex(neigh.coord);
                    let price = currentPrice + 1;
                    if (price < this.steps.get(neighbourIndex)) {
                        // we found a better path -> store the backtrace
                        this.steps.set(neighbourIndex, price);
                        this.backTrace.set(neighbourIndex, currentIndex);
                        this.queue.enqueue(neigh.coord, price);
                    }
                }
            });
        }
        // backtrack and fill the output path
        let closestPath = [
            end
        ];
        let currentStep = endIndex;
        while(currentStep && currentStep !== startIndex){
            const nextStep = this.backTrace.get(currentStep);
            closestPath.push(map.indexToCoord(nextStep));
            currentStep = nextStep;
        }
        closestPath.reverse();
        return null;
    }
    reset() {
        this.steps = new Map();
        this.backTrace = new Map();
        this.queue = new (0, _priorityQueue.PriorityQueue)();
    }
}

},{"./PriorityQueue":"9M88V","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9M88V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PriorityQueue", ()=>PriorityQueue);
class PriorityQueue {
    collection = [];
    // we store [index, priority]
    // todo we only have 2 priorities: 0, 1
    enqueue(element, priority = 0) {
        if (this.isEmpty) this.collection.push([
            element,
            priority
        ]);
        else {
            let added = false;
            for(let i = 1; i <= this.collection.length; i++)if (priority < this.collection[i - 1][1]) {
                this.collection.splice(i - 1, 0, [
                    element,
                    priority
                ]);
                added = true;
                break;
            }
            if (!added) this.collection.push([
                element,
                priority
            ]);
        }
    }
    dequeue() {
        let value = this.collection.shift();
        return value[0];
    }
    get isEmpty() {
        return this.collection.length === 0;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j9PIn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// https://www.interviewbit.com/blog/travelling-salesman-problem/
parcelHelpers.export(exports, "TSP", ()=>TSP);
var _coord = require("./Coord");
class TSP {
    N = 0;
    start = 0;
    distance = [];
    tour = [];
    minTourCost = Infinity;
    constructor(distance, width, height){
        this.distance = distance;
        this.width = width;
        this.height = height;
    /*this.width = this.height = 6;
		this.distance = [];
		for(let i = 0; i < this.width * this.height; i++) {
			this.distance[i] = 10000;
		}
		this.distance[this.coordToIndex(5, 0)] = 10;
		this.distance[this.coordToIndex(1, 5)] = 12;
		this.distance[this.coordToIndex(4, 1)] = 2;
		this.distance[this.coordToIndex(2, 4)] = 4;
		this.distance[this.coordToIndex(3, 2)] = 6;
		this.distance[this.coordToIndex(0, 3)] = 8;*/ }
    coordToIndex = (x, y)=>{
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) return -1;
        return y * this.width + x;
    };
    indexToCoord = (x)=>{
        return (0, _coord.makeCoord)(x % this.width, Math.floor(x / this.width));
    };
    notIn = (elem, subset)=>{
        return (1 << elem & subset) == 0;
    };
    // This method generates all bit sets of size n where r bits 
    // are set to one. The result is returned as a list of integer masks.
    combinations = (r, n)=>{
        const subsets = [];
        this.combinations2(0, 0, r, n, subsets);
        return subsets;
    };
    // To find all the combinations of size r we need to recurse until we have
    // selected r elements (aka r = 0), otherwise if r != 0 then we still need to select
    // an element which is found after the position of our last selected element
    combinations2 = (set, at, r, n, subsets)=>{
        // Return early if there are more elements left to select than what is available.
        let elementsLeftToPick = n - at;
        if (elementsLeftToPick < r) return;
        // We selected 'r' elements so we found a valid subset!
        if (r == 0) subsets.push(set);
        else for(let i = at; i < n; i++){
            // Try including this element
            set |= 1 << i;
            this.combinations2(set, i + 1, r - 1, n, subsets);
            // Backtrack and try the instance where we did not include this element
            set &= ~(1 << i);
        }
    };
    solve = ()=>{
        let END_STATE = (1 << this.N) - 1;
        let memo = [];
        const memoWidth = this.N;
        const memoHeight = 1 << this.N;
        const memoIndex = (x, y)=>y * memoWidth + x;
        // Add all outgoing edges from the starting node to memo table.
        for(let end = 0; end < this.N; end++){
            if (end == this.start) continue;
            memo[memoIndex(end, 1 << this.start | 1 << end)] = this.distance[this.coordToIndex(this.start, end)];
        }
        for(let r = 3; r <= this.N; r++){
            const combinations = this.combinations(r, this.N);
            for (let subset of combinations){
                if (this.notIn(this.start, subset)) continue;
                for(let next = 0; next < this.N; next++){
                    if (next == this.start || this.notIn(next, subset)) continue;
                    let subsetWithoutNext = subset ^ 1 << next;
                    let minDist = Infinity;
                    for(let end1 = 0; end1 < this.N; end1++){
                        if (end1 == this.start || end1 == next || this.notIn(end1, subset)) continue;
                        let newDistance = memo[memoIndex(end1, subsetWithoutNext)] + this.distance[this.coordToIndex(end1, next)];
                        if (newDistance < minDist) minDist = newDistance;
                    }
                    memo[memoIndex(next, subset)] = minDist;
                }
            }
        }
        // Connect tour back to starting node and minimize cost.
        for(let i = 0; i < this.N; i++){
            if (i == this.start) continue;
            let tourCost = memo[memoIndex(i, END_STATE)] + this.distance[this.coordToIndex(i, this.start)];
            if (tourCost < this.minTourCost) this.minTourCost = tourCost;
        }
        let lastIndex = this.start;
        let state = END_STATE;
        this.tour.push(this.start);
        // Reconstruct TSP path from memo table.
        for(let i1 = 1; i1 < this.N; i1++){
            let index = -1;
            for(let j = 0; j < this.N; j++){
                if (j == this.start || this.notIn(j, state)) continue;
                if (index == -1) index = j;
                let prevDist = memo[memoIndex(index, state)] + this.distance[this.coordToIndex(index, lastIndex)];
                let newDist = memo[memoIndex(j, state)] + this.distance[this.coordToIndex(j, lastIndex)];
                if (newDist < prevDist) index = j;
            }
            this.tour.push(index);
            state = state ^ 1 << index;
            lastIndex = index;
        }
        this.tour.push(this.start);
        this.tour.reverse();
    };
    TSP = (startCity)=>{
        this.N = this.width;
        this.start = startCity;
        this.solve();
        return this.tour;
    };
}

},{"./Coord":"hANUT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["iJYvl","h7u1C"], "h7u1C", "parcelRequirecb92")

//# sourceMappingURL=index.b71e74eb.js.map
