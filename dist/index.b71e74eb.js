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
var _structs = require("./structs");
var _algorithms = require("./algorithms");
var _utils = require("./utils");
var _renderers = require("./renderers");
var _stateMachine = require("./structs/state-machine");
class Context {
    generator = new (0, _algorithms.MapGenerator)();
    generatorGenerator = null;
    explorer = new (0, _algorithms.MapExplorer)();
    exploreGenerator = null;
    pathFinder = new (0, _algorithms.PathFinder)();
    pathFinderGenerator = null;
    mst = new (0, _algorithms.MSTFinder)();
    mstGenerator = null;
    tsp = new (0, _algorithms.TSPSolver)();
    tspGenerator = null;
    baseSpeed = 2;
}
class Runner {
    start(renderer, width, height, cities, walls) {
        const context = new Context();
        context.mapWidth = width;
        context.mapHeight = height;
        context.mapCities = cities;
        context.mapWalls = walls;
        context.renderer = renderer;
        context.exploreGenerator = context.pathFinderGenerator = context.tspGenerator = context.mstGenerator = null;
        context.completeTour = null;
        const machine = new (0, _stateMachine.StateMachine)();
        machine.addState(GenerateState).addState(ExploreState).addTransition(GenerateState.name, ExploreState.name).addState(SearchBackState).addTransition(ExploreState.name, SearchBackState.name).addState(WalkBackState).addTransition(SearchBackState.name, WalkBackState.name).addState(TSPPrepareState).addTransition(WalkBackState.name, TSPPrepareState.name).addState(TSPSolveState).addTransition(TSPPrepareState.name, TSPSolveState.name).addState(TSPWalkState).addTransition(TSPSolveState.name, TSPWalkState.name).setInitialState(GenerateState.name);
        renderer.start(machine, context);
    }
}
const GenerateState = {
    name: "GENERATE",
    firstRun: (context)=>{
        context.renderer.speed = context.baseSpeed;
        context.generatorGenerator = context.generator.generateMapIteratively(context.mapWidth, context.mapHeight, context.mapCities, context.mapWalls);
    },
    handlerFunc: (context)=>{
        const status = context.generatorGenerator.next();
        if (!status.done && status.value) return {
            map: context.generator.generatedMap,
            currentNode: status.value.currentTile.coord
        };
        else {
            context.map = context.generator.generatedMap;
            context.salesmanStart = (0, _utils.selectRandomCity)(context.map).coord;
            return null;
        }
    }
};
const ExploreState = {
    name: "EXPLORE",
    firstRun: (context)=>{
        context.renderer.speed = context.baseSpeed;
        context.exploreGenerator = context.explorer.exploreMapIteratively(context.salesmanStart, context.map);
    },
    handlerFunc: (context)=>{
        const status = context.exploreGenerator.next();
        if (!status.done && status.value) return {
            map: context.explorer.blindMap,
            currentNode: context.explorer.current,
            backtrace: context.explorer.backTrace,
            milestones: context.explorer.checkpointStack.getNodes()
        };
        else return null;
    }
};
const SearchBackState = {
    name: "SEARCH_BACK",
    firstRun: (context)=>{
        context.renderer.speed = context.baseSpeed;
        context.pathFinderGenerator = context.pathFinder.findPathIteratively(context.explorer.current, context.salesmanStart, context.map);
    },
    handlerFunc: (context)=>{
        const status = context.pathFinderGenerator.next();
        if (!status.done && status.value) return {
            map: context.map,
            currentNode: context.explorer.current,
            backtrace: context.pathFinder.backTrace,
            milestones: context.pathFinder.queue.getNodes()
        };
        else {
            context.walkBack = context.pathFinder.closestPath;
            context.walkBackIndex = 0;
            return null;
        }
    }
};
const WalkBackState = {
    name: "WALK_BACK",
    firstRun: (context)=>{
        context.renderer.speed = context.baseSpeed / 10;
    },
    handlerFunc: (context)=>{
        if (context.walkBackIndex < context.walkBack.length) return {
            map: context.map,
            currentNode: context.walkBack[context.walkBackIndex++],
            backtrace: context.pathFinder.backTrace
        };
        else return null;
    }
};
const TSPPrepareState = {
    name: "TSP_PREPARE",
    firstRun: (context)=>{
        context.renderer.speed = context.baseSpeed / 10;
        const cities = context.map.mapArray.filter((a)=>a.type === "CITY").map((city)=>city.coord);
        context.mstGenerator = context.mst.findMSTIteratively(cities, context.map);
    },
    handlerFunc: (context)=>{
        const status = context.mstGenerator.next();
        if (!status.done && status.value) return {
            map: context.map,
            highlights: [
                status.value.currentCoord
            ],
            backtrace: status.value.minPath
        };
        else return null;
    }
};
const TSPSolveState = {
    name: "TSP_SOLVE",
    firstRun: (context)=>{
        context.renderer.speed = context.baseSpeed * 10;
        const cities = context.map.mapArray.filter((a)=>a.type === "CITY").map((city)=>city.coord);
        const salesmanCity = cities.findIndex((c)=>(0, _structs.coordEq)(c, context.salesmanStart));
        context.tspGenerator = context.tsp.solveIteratively(salesmanCity, cities.length, context.mst.spanningTree);
    },
    handlerFunc: (context)=>{
        const cities = context.map.mapArray.filter((a)=>a.type === "CITY").map((city)=>city.coord);
        const status = context.tspGenerator.next();
        if (!status.done && status.value) return {
            map: context.map,
            highlights: [
                cities[status.value.currentCity],
                cities[status.value.nextCity]
            ]
        };
        else return null;
    }
};
const TSPWalkState = {
    name: "TSP_WALK",
    firstRun: (context)=>{
        context.renderer.speed = context.baseSpeed / 2;
        context.completeTour = [];
        context.completeTourIndex = 0;
        const cities = context.map.mapArray.filter((a)=>a.type === "CITY").map((city)=>city.coord);
        for(let i = 0; i < context.tsp.tour.length; i++){
            const cityFrom = cities[context.tsp.tour[i]];
            const cityTo = cities[context.tsp.tour[i !== context.tsp.tour.length - 1 ? i + 1 : 0]];
            const path = context.pathFinder.findPath(cityFrom, cityTo, context.map);
            context.completeTour.push(...path);
        }
    },
    handlerFunc: (context)=>{
        const output = {
            map: context.map,
            currentNode: context.completeTour[context.completeTourIndex]
        };
        context.completeTourIndex = (context.completeTourIndex + 1) % context.completeTour.length;
        return output;
    }
};
const canvas = document.getElementById("gameCanvas");
const renderer = new (0, _renderers.CanvasRenderer)(canvas);
const runner = new Runner();
runner.start(renderer, 10, 10, 10, 80);
const ui = new (0, _renderers.UIRenderer)();
ui.init(canvas, 10, 10); // another ideas:
 // https://en.wikipedia.org/wiki/Flood_fill
 // https://gamedev.stackexchange.com/questions/55344/algorithm-for-exploring-filling-grid-map

},{"./utils":"dsXzW","./structs":"iTVbw","./algorithms":"03p2T","./renderers":"cdoPD","./structs/state-machine":"4Qdjn"}],"dsXzW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadMapFromString", ()=>loadMapFromString);
parcelHelpers.export(exports, "generateDefaultMap", ()=>generateDefaultMap);
parcelHelpers.export(exports, "selectRandomCity", ()=>selectRandomCity);
var _structs = require("./structs");
const loadMapFromString = (arr, width, height)=>{
    const map = new (0, _structs.MapGrid)(width, height);
    for(let i = 0; i < height; i++)for(let j = 0; j < width; j++)// repeat pattern from the map above
    switch(arr[i * width + j]){
        case ".":
            map.setTile((0, _structs.makeCoord)(j, i), "ROAD");
            break;
        case "x":
            map.setTile((0, _structs.makeCoord)(j, i), "WALL");
            break;
        case "o":
            map.setTile((0, _structs.makeCoord)(j, i), "CITY");
            break;
        default:
            throw new Error("Unknown map tile");
    }
    map.generateNeighbors();
    return map;
};
const generateDefaultMap = (width, height)=>{
    // if the width or height > 10, the pattern below will repeat
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
    const map = new (0, _structs.MapGrid)(width, height);
    for(let i = 0; i < height; i++)for(let j = 0; j < width; j++)// repeat pattern from the map above
    switch(arr[10 * (i % 10) + j % 10]){
        case ".":
            map.setTile((0, _structs.makeCoord)(j, i), "ROAD");
            break;
        case "x":
            map.setTile((0, _structs.makeCoord)(j, i), "WALL");
            break;
        case "o":
            map.setTile((0, _structs.makeCoord)(j, i), "CITY");
            break;
        default:
            throw new Error("Unknown map tile");
    }
    map.generateNeighbors();
    return map;
};
const selectRandomCity = (map)=>{
    const cities = map.mapArray.filter((a)=>a.type === "CITY").length;
    const randomLoc = Math.ceil(cities / 2);
    let cnt = 0;
    const cityTile = map.mapArray.find((val)=>val.type === "CITY" && ++cnt === randomLoc);
    return cityTile;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./structs":"iTVbw"}],"gkKU3":[function(require,module,exports) {
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

},{}],"iTVbw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _coord = require("./coord");
parcelHelpers.exportAll(_coord, exports);
var _mapGrid = require("./map-grid");
parcelHelpers.exportAll(_mapGrid, exports);
var _mapTile = require("./map-tile");
parcelHelpers.exportAll(_mapTile, exports);
var _priorityQueue = require("./priority-queue");
parcelHelpers.exportAll(_priorityQueue, exports);
var _stack = require("./stack");
parcelHelpers.exportAll(_stack, exports);

},{"./map-grid":"5C0ri","./map-tile":"NGSV0","./priority-queue":"ahez4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./coord":"9BD4d","./stack":"ezd47"}],"5C0ri":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 2D map structure
 */ parcelHelpers.export(exports, "MapGrid", ()=>MapGrid);
var _coord = require("./coord");
var _mapTile = require("./map-tile");
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

},{"./map-tile":"NGSV0","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./coord":"9BD4d"}],"NGSV0":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9BD4d":[function(require,module,exports) {
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
parcelHelpers.export(exports, "manhattanDist", ()=>manhattanDist);
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
const manhattanDist = (a, b)=>{
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ahez4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PriorityQueue", ()=>PriorityQueue);
class PriorityQueue {
    collection = [];
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
    getNodes() {
        return this.collection.map((c)=>c[0]);
    }
    dequeue() {
        let value = this.collection.shift();
        return value[0];
    }
    get isEmpty() {
        return this.collection.length === 0;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ezd47":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Generic stack that implements FIFO behavior
 */ parcelHelpers.export(exports, "Stack", ()=>Stack);
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
    top() {
        return this.root?.node;
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"03p2T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mapExplorer = require("./map-explorer");
parcelHelpers.exportAll(_mapExplorer, exports);
var _mapGenerator = require("./map-generator");
parcelHelpers.exportAll(_mapGenerator, exports);
var _mstFinder = require("./mst-finder");
parcelHelpers.exportAll(_mstFinder, exports);
var _pathFinder = require("./path-finder");
parcelHelpers.exportAll(_pathFinder, exports);
var _randomGenerator = require("./random-generator");
parcelHelpers.exportAll(_randomGenerator, exports);
var _tspSolver = require("./tsp-solver");
parcelHelpers.exportAll(_tspSolver, exports);

},{"./map-explorer":"9xSVq","./map-generator":"kxZIA","./mst-finder":"oRysF","./path-finder":"zPxe2","./random-generator":"iGQAv","./tsp-solver":"ddrBY","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9xSVq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MapExplorer", ()=>MapExplorer);
var _coord = require("../structs/coord");
var _mapGrid = require("../structs/map-grid");
var _stack = require("../structs/stack");
class MapExplorer {
    exploreMap(startCoord, map) {
        const generator = this.exploreMapIteratively(startCoord, map);
        let val = generator.next();
        while(!val.done)val = generator.next();
        // return explored map
        return this.blindMap;
    }
    *exploreMapIteratively(startCoord, map) {
        this.reset(map.width, map.height);
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
                const pathToLastCheckpoint = this.addToBackTrace(lastCheckpoint);
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
    addToBackTrace(target) {
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
            let nextStep = this.backTrace.get(this.coordToIndex(this.current));
            const toIndex = this.coordToIndex(target);
            let overFlowCheck = 0;
            while(true){
                path.push(this.indexToCoord(nextStep));
                if (nextStep === toIndex) break;
                nextStep = this.backTrace.get(nextStep);
                if ((overFlowCheck++) >= this.blindMap.width * this.blindMap.height) throw new Error(`Backtrace got in an infinite loop for [${target.x},${target.y}]`);
            }
            return path;
        }
    }
    coordToIndex = (coord)=>this.blindMap.coordToIndex(coord);
    indexToCoord = (index)=>this.blindMap.indexToCoord(index);
    reset(width, height) {
        this.blindMap = new (0, _mapGrid.MapGrid)(width, height);
        for(let i = 0; i < width; i++)for(let j = 0; j < height; j++)this.blindMap.setTile((0, _coord.makeCoord)(i, j), "UNKNOWN");
        this.backTrace = new Map();
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
        this.backTrace.set(this.coordToIndex(coord), this.coordToIndex(this.current));
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

},{"../structs/map-grid":"5C0ri","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../structs/coord":"9BD4d","../structs/stack":"ezd47"}],"kxZIA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MapGenerator", ()=>MapGenerator);
var _mapGrid = require("../structs/map-grid");
var _coord = require("../structs/coord");
var _mapExplorer = require("./map-explorer");
var _randomGenerator = require("./random-generator");
var _randomGeneratorDefault = parcelHelpers.interopDefault(_randomGenerator);
class MapGenerator {
    constructor(randomSeed = 17){
        this.randomSeed = randomSeed;
    }
    generateMap(width, height, cities, walls) {
        const generator = this.generateMapIteratively(width, height, cities, walls);
        let val = generator.next();
        while(!val.done)val = generator.next();
        return this.generatedMap;
    }
    *generateMapIteratively(width, height, cities, walls) {
        this.generatedMap = new (0, _mapGrid.MapGrid)(width, height);
        const random = new (0, _randomGeneratorDefault.default)(this.randomSeed);
        // start with roads
        for(let i = 0; i < width; i++)for(let j = 0; j < height; j++){
            this.generatedMap.setTile((0, _coord.makeCoord)(i, j), "ROAD");
            yield {
                currentTile: this.generatedMap.getTile((0, _coord.makeCoord)(i, j))
            };
        }
        this.generatedMap.generateNeighbors();
        // put walls
        let wallsPut = 0;
        let iteration = 0;
        while(wallsPut < walls){
            const tilesWithoutWalls = this.generatedMap.mapArray.filter((tile)=>tile.type !== "WALL");
            if (tilesWithoutWalls.length === 0) break;
            const randomTile = tilesWithoutWalls[Math.floor(random.float() * tilesWithoutWalls.length)];
            const wallsNearby = randomTile.directionalNeighbors.filter((neigh)=>neigh && neigh.type === "WALL").length;
            // the more walls nearby, the higher the probability to put it exactly here
            // 93% for 8 neighbours, 83% for 7, ... 33% for 2, 23% for 1, 13% for 0
            const putWall = Math.floor(random.float() * 10) <= (wallsNearby * 1.5 + 2) / 1.5;
            if (putWall) {
                this.generatedMap.setTile(randomTile.coord, "WALL");
                this.generatedMap.generateNeighbors(); // regenerate links
                wallsPut++;
                yield {
                    currentTile: this.generatedMap.getTile(randomTile.coord)
                };
            }
            if ((iteration++) > width * height * 4) break;
        }
        // put cities
        let citiesPut = 0;
        iteration = 0;
        while(citiesPut < cities){
            const tilesWithoutCities = this.generatedMap.mapArray.filter((tile)=>tile.type !== "CITY" && tile.type !== "WALL");
            if (tilesWithoutCities.length === 0) break;
            const randomTile1 = tilesWithoutCities[Math.floor(random.float() * tilesWithoutCities.length)];
            const citiesNearby = randomTile1.directionalNeighbors.filter((neigh)=>neigh && neigh.type === "CITY").length;
            // the more cities nearby, the lower the probability to put it exactly here
            // 100% for 0 neighbours, 40% for 1 neighbour, 0% for 2 and more 
            const putCity = Math.floor(random.float() * 10) >= citiesNearby * 6;
            if (putCity) {
                this.generatedMap.setTile(randomTile1.coord, "CITY");
                this.generatedMap.generateNeighbors(); // regenerate links
                citiesPut++;
                yield {
                    currentTile: this.generatedMap.getTile(randomTile1.coord)
                };
            }
            if ((iteration++) > width * height) break;
        }
        // brute-force test if all cities can be visited
        const explorer = new (0, _mapExplorer.MapExplorer)();
        const firstCityCoord = this.generatedMap.mapArray.filter((tile)=>tile.type === "CITY")[0].coord;
        const cityTiles = this.generatedMap.mapArray.filter((tile)=>tile.type === "CITY");
        explorer.exploreMap(firstCityCoord, this.generatedMap);
        let lockedCities = cityTiles.filter((tile)=>!explorer.visitedNodes.has(this.generatedMap.coordToIndex(tile.coord)));
        while(lockedCities.length !== 0){
            // search for walls that have neighbours that were not visited
            // and sort them from closest to the starting node
            const allWalls = this.generatedMap.mapArray.filter((tile)=>tile.type === "WALL");
            const suspiciousWalls = allWalls.filter((wall)=>wall.neighborsArr.find((neigh)=>neigh && neigh.isWalkable && !explorer.visitedNodes.has(this.generatedMap.coordToIndex(neigh.coord)))).sort((a, b)=>(0, _coord.manhattanDist)(a.coord, firstCityCoord) - (0, _coord.manhattanDist)(b.coord, firstCityCoord));
            if (suspiciousWalls.length > 0) {
                // remove the closest suspicious wall
                const wallToRemove = suspiciousWalls[0];
                // transform to roads
                this.generatedMap.setTile(wallToRemove.coord, "ROAD");
                yield {
                    currentTile: this.generatedMap.getTile(wallToRemove.coord)
                };
                // refresh
                this.generatedMap.generateNeighbors();
                explorer.exploreMap(firstCityCoord, this.generatedMap);
                lockedCities = cityTiles.filter((tile)=>!explorer.visitedNodes.has(this.generatedMap.coordToIndex(tile.coord)));
            } else // should not happen, but if it does, we will just remove the cities
            for (let lockedCity of lockedCities){
                this.generatedMap.setTile(lockedCity.coord, "ROAD");
                this.generatedMap.generateNeighbors();
                yield {
                    currentTile: this.generatedMap.getTile(lockedCity.coord)
                };
            }
        }
        this.generatedMap.generateNeighbors();
        return null;
    }
}

},{"../structs/map-grid":"5C0ri","./map-explorer":"9xSVq","./random-generator":"iGQAv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../structs/coord":"9BD4d"}],"iGQAv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Random {
    mask = 0xffffffff;
    constructor(seed){
        this.m_w = 123456789 + seed & this.mask;
        this.m_z = 987654321 - seed & this.mask;
    }
    float() {
        this.m_z = 36969 * (this.m_z & 65535) + (this.m_z >> 16) & this.mask;
        this.m_w = 18000 * (this.m_w & 65535) + (this.m_w >> 16) & this.mask;
        let result = (this.m_z << 16) + (this.m_w & 65535) >>> 0;
        result /= 4294967296;
        return result;
    }
    int(min, max) {
        return min + Math.floor((max - min + 1) * this.float());
    }
}
exports.default = Random;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"oRysF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MSTFinder", ()=>MSTFinder);
var _coord = require("../structs/coord");
var _pathFinder = require("./path-finder");
class MSTFinder {
    spanningTree = [];
    findMST(coords, map) {
        const generator = this.findMSTIteratively(coords, map);
        let val = generator.next();
        while(!val.done)val = generator.next();
        return this.spanningTree;
    }
    *findMSTIteratively(coords, map) {
        this.spanningTree = [];
        const pathFinder = new (0, _pathFinder.PathFinder)();
        let coordsCnt = coords.length;
        for(let i = 0; i < coords.length; i++){
            const coord = coords[i];
            // referrential coordinate is a coordinate different from coord
            // it can be anything. Dijkstra will search the whole map regardless of how
            // close the refCoord is. It mustn't be te same coordinate, though
            let refCoord = coords.find((c)=>!(0, _coord.coordEq)(c, coord));
            if (!refCoord) // trivial solution -> only one node
            refCoord = coords[0];
            // the path itself doesn't interests us...
            pathFinder.findPath(coord, refCoord, map);
            yield {
                currentCoord: coord,
                minPath: pathFinder.steps
            };
            // now we know min steps from coord to each other coord
            const minPath = pathFinder.steps;
            // let's save this into the spanning tree
            for(let j = 0; j < coords.length; j++){
                const coord2 = coords[j];
                const distIndex = i * coordsCnt + j;
                this.spanningTree[distIndex] = minPath.get(map.coordToIndex(coord2));
            }
        }
        return null;
    }
}

},{"./path-finder":"zPxe2","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../structs/coord":"9BD4d"}],"zPxe2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Dijkstra algorithm that uses priority queue to find the shortest
 * path from start node to all other nodes
 */ parcelHelpers.export(exports, "PathFinder", ()=>PathFinder);
var _priorityQueue = require("../structs/priority-queue");
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
        this.backtracePath(start, end, map);
        return null;
    }
    backtracePath(start, end, map) {
        const startIndex = map.coordToIndex(start);
        const endIndex = map.coordToIndex(end);
        this.closestPath.push(end);
        let currentStep = endIndex;
        // omg... I had there while(currentStep) and when currentStep
        // referred to the topleft corner of the map where the index is 0,
        // this shizzle stopped working... it took me ages to figure out
        while(currentStep !== undefined && currentStep !== startIndex){
            const nextStep = this.backTrace.get(currentStep);
            this.closestPath.push(map.indexToCoord(nextStep));
            currentStep = nextStep;
        }
        this.closestPath.reverse();
    }
    reset() {
        this.steps = new Map();
        this.backTrace = new Map();
        this.queue = new (0, _priorityQueue.PriorityQueue)();
        this.closestPath = [];
    }
}

},{"../structs/priority-queue":"ahez4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ddrBY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Travelling Salesman Problem Solver
 * Since this is a NP problem solver, it uses Dynamic Programming and a bit array
 * The maximum number of cities is the number of bits in JS Number type = 64
 * 
 * Distance array example (the array doesn't need to be symmetric):
 * 
 *         London    Paris    Prague
 * London    0        342      1267
 * Paris    342        0       1032
 * Prague   1267      1032       0
 * 
 */ parcelHelpers.export(exports, "TSPSolver", ()=>TSPSolver);
class TSPSolver {
    startCityIndex = 0;
    // a symmetric 2D array of city-city min distances
    distances = [];
    solve(startCityIndex, citiesNum, distances) {
        const generator = this.solveIteratively(startCityIndex, citiesNum, distances);
        let val = generator.next();
        while(!val.done)val = generator.next();
        return this.tour;
    }
    *solveIteratively(startCityIndex, citiesNum, distances) {
        this.distances = distances;
        this.citiesNum = citiesNum;
        this.startCityIndex = startCityIndex;
        this.reset(citiesNum);
        // add all outgoing edges from the starting node to memo table.
        for(let cityIndex = 0; cityIndex < this.citiesNum; cityIndex++){
            if (cityIndex == this.startCityIndex) continue;
            // permutation with the start city and all neighbours as the second city
            const permutation = 1 << cityIndex | 1 << this.startCityIndex;
            this.memoize(cityIndex, permutation, this.distances[this.coordToIndex(this.startCityIndex, cityIndex)]);
        }
        // 1st loop: starting from the 3rd city, as the 2nd is already memoized
        for(let cityIndex1 = 2; cityIndex1 < this.citiesNum; cityIndex1++){
            const permutations = this.generatePermutations(cityIndex1 + 1); // City number = City index + 1
            // 2nd loop: go over each permutation for this city and memoize the promising ones
            for (let permutation1 of permutations){
                if (this.notIn(this.startCityIndex, permutation1)) continue;
                // 3rd loop: find the promising next city
                for(let nextCityIndex = 0; nextCityIndex < this.citiesNum; nextCityIndex++){
                    if (nextCityIndex == this.startCityIndex || this.notIn(nextCityIndex, permutation1)) continue;
                    // report to the observers
                    yield {
                        currentCity: cityIndex1,
                        nextCity: nextCityIndex
                    };
                    let permutationWithoutNextCity = permutation1 ^ 1 << nextCityIndex;
                    let minDist = Infinity;
                    // 4th loop: find the min distance from permutations that don't include the next city
                    // and add the min distance to the next city
                    for(let endCityIndex = 0; endCityIndex < this.citiesNum; endCityIndex++){
                        if (endCityIndex == this.startCityIndex || endCityIndex == nextCityIndex || this.notIn(endCityIndex, permutation1)) continue;
                        let newDistance = this.getMemoized(endCityIndex, permutationWithoutNextCity) + this.distances[this.coordToIndex(endCityIndex, nextCityIndex)];
                        minDist = Math.min(minDist, newDistance);
                    }
                    this.memoize(nextCityIndex, permutation1, minDist);
                }
            }
        }
        // ending subset -> all bits are set to 1 
        const END_STATE = (1 << this.citiesNum) - 1;
        // backtrack the output tour  and minimize cost.
        for(let i = 0; i < this.citiesNum; i++){
            if (i == this.startCityIndex) continue;
            let tourCost = this.getMemoized(i, END_STATE) + this.distances[this.coordToIndex(i, this.startCityIndex)];
            if (tourCost < this.minTourCost) this.minTourCost = tourCost;
        }
        let lastIndex = this.startCityIndex;
        let state = END_STATE;
        this.tour.push(this.startCityIndex);
        // reconstruct TSP path from the memorizer table.
        for(let i1 = 1; i1 < this.citiesNum; i1++){
            let index = -1;
            for(let j = 0; j < this.citiesNum; j++){
                if (j == this.startCityIndex || this.notIn(j, state)) continue;
                if (index == -1) // first valid index of the second loop
                index = j;
                let prevDist = this.getMemoized(index, state) + this.distances[this.coordToIndex(index, lastIndex)];
                let newDist = this.getMemoized(j, state) + this.distances[this.coordToIndex(j, lastIndex)];
                if (newDist < prevDist) index = j;
            }
            this.tour.push(index);
            state = state ^ 1 << index;
            lastIndex = index;
        }
        this.tour.push(this.startCityIndex);
        this.tour.reverse();
        return null;
    }
    generatePermutations(cityIndex) {
        const permutations = [];
        this.generatePermutationsRec(0, 0, this.citiesNum, cityIndex, permutations);
        return permutations;
    }
    /**
	 * Generates all bit sets where r bits are set to one. Returns a list of integer masks
	 * We start with "r" elements and recurse down until r = 0 
	 * @param set - bit mask to which the permutations are generated
	 * @param from - first bit from which the permutations are generated
	 * @param to - last bit from which the permutations are generated
	 * @param r - the number of "bits" to select. If r == (to - from),  we get a full permutation
	 * @param permutations output array of integer masks
	 */ generatePermutationsRec(set, from, to, r, permutations) {
        // return early if there are more elements left to select than what is available
        if (to - from < r) return;
        // We selected 'r' elements so we found a valid subset!
        if (r == 0) permutations.push(set);
        else for(let i = from; i < to; i++){
            // try to include this bit
            set |= 1 << i;
            // generate other bits when bit i is 1
            this.generatePermutationsRec(set, i + 1, to, r - 1, permutations);
            // revert back and go to the next instance where we did not include this element
            set &= ~(1 << i);
        }
    }
    reset(citiesNum) {
        this.memoizer = [];
        this.tour = [];
        this.minTourCost = Infinity;
        // init 2D array
        for(let i = 0; i < citiesNum; i++)this.memoizer[i] = [];
    }
    memoize(cityIndex, permutation, distance) {
        this.memoizer[cityIndex][permutation] = distance;
    }
    getMemoized(cityIndex, permutation) {
        return this.memoizer[cityIndex][permutation];
    }
    /**
 	* Returns true if the bits of element are inside the bits of the subset param
 	*/ notIn(elem, subset) {
        return (1 << elem & subset) == 0;
    }
    coordToIndex = (x, y)=>{
        if (x < 0 || y < 0 || x >= this.citiesNum || y >= this.citiesNum) return -1;
        return y * this.citiesNum + x;
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cdoPD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _canvasRenderer = require("./canvas-renderer");
parcelHelpers.exportAll(_canvasRenderer, exports);
var _uiRenderer = require("./ui-renderer");
parcelHelpers.exportAll(_uiRenderer, exports);

},{"./canvas-renderer":"2kaNS","./ui-renderer":"hutv1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2kaNS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CanvasRenderer", ()=>CanvasRenderer);
var _coord = require("../structs/coord");
class CanvasRenderer {
    lastFrameTime = 0;
    lastTickTime = 0;
    time = 0;
    speed = 0.5;
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }
    start(stateMachine, context) {
        this.stateMachine = stateMachine;
        this.context = context;
        this.loop(performance.now());
    }
    loop(time) {
        const delta = time - this.lastFrameTime;
        this.lastFrameTime = time;
        this.time += delta;
        // for a lower speed, not each loop will make a tick
        // for a higher speed, each loop can make more ticks
        const iterations = Math.floor(this.speed * (this.lastFrameTime - this.lastTickTime) / 16);
        if (iterations > 0) {
            let data = null;
            for(let i = 0; i < iterations; i++){
                data = this.stateMachine.run(this.context);
                this.lastTickTime = this.lastFrameTime;
            }
            // render only last data
            this.renderData(data);
        }
        requestAnimationFrame((time)=>this.loop(time));
    }
    renderData(data) {
        if (!data) return;
        const blockSize = this.canvas.width / data.map.width;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for(let i = 0; i < data.map.width; i++)for(let j = 0; j < data.map.height; j++){
            const coord = (0, _coord.makeCoord)(i, j);
            const tile = data.map.getTile(coord);
            switch(tile?.type){
                case "UNKNOWN":
                    this.ctx.fillStyle = "#11111155";
                    break;
                case "ROAD":
                    this.ctx.fillStyle = "#22992255";
                    break;
                case "WALL":
                    this.ctx.fillStyle = "#55555555";
                    break;
                case "CITY":
                    this.ctx.fillStyle = "#CDCD4466";
                    break;
                default:
                    // if undefined, it's treated like unknown
                    this.ctx.fillStyle = "#11111155";
                    break;
            }
            this.ctx.fillRect(i * blockSize, j * blockSize, blockSize - 1, blockSize - 1);
            if (data.map.width < 30) {
                this.ctx.font = `${blockSize * 0.25}px courier new`;
                this.ctx.fillStyle = "#FFFFFF55";
                this.ctx.fillText(`[${i},${j}]`, i * blockSize + blockSize * 0.10, j * blockSize + blockSize * 0.55);
            }
        }
        if (data.currentNode) {
            this.ctx.fillStyle = "#EFEFEF";
            this.ctx.fillRect(data.currentNode.x * blockSize, data.currentNode.y * blockSize, blockSize - 1, blockSize - 1);
        }
        if (data.highlights) {
            this.ctx.fillStyle = "#0000FFAA";
            for (let highlight of data.highlights)this.ctx.fillRect(highlight.x * blockSize, highlight.y * blockSize, blockSize - 1, blockSize - 1);
        }
        if (data.backtrace) for (let index of data.backtrace.keys()){
            const fromCoord = data.map.indexToCoord(index);
            const toCoord = data.map.indexToCoord(data.backtrace.get(index));
            const isLeft = toCoord.x === fromCoord.x - 1;
            const isRight = toCoord.x === fromCoord.x + 1;
            const isTop = toCoord.y === fromCoord.y - 1;
            const isBottom = toCoord.y === fromCoord.y + 1;
            this.ctx.fillStyle = "#FFFF00";
            const symbol = isLeft ? "←" : isRight ? "→" : isTop ? "↑" : "↓";
            this.ctx.font = `${blockSize * 0.5}px courier new`;
            this.ctx.fillText(symbol, fromCoord.x * blockSize + blockSize * 0.35, fromCoord.y * blockSize + blockSize * 0.85);
        }
        if (data.milestones) for (let milestone of data.milestones){
            this.ctx.fillStyle = "#ADADAD";
            this.ctx.fillRect(milestone.x * blockSize, milestone.y * blockSize, blockSize * 0.15, blockSize * 0.15);
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../structs/coord":"9BD4d"}],"hutv1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "UIRenderer", ()=>UIRenderer);
class UIRenderer {
    init(canvas, mapWidth, mapHeight) {
        this.canvas = canvas;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.initResizeHandler();
        this.initSliders();
    }
    initResizeHandler = ()=>{
        this.resizeHandler();
        window.addEventListener("resize", this.resizeHandler.bind(this));
    };
    resizeHandler = ()=>{
        if (window.innerWidth > window.innerHeight) {
            this.canvas.height = window.innerHeight;
            this.canvas.width = this.canvas.height * (this.mapHeight / this.mapWidth);
        } else {
            this.canvas.width = window.innerWidth;
            this.canvas.height = this.canvas.width * (this.mapHeight / this.mapWidth);
        }
    };
    initSliders() {
        const parent = document.querySelector(".range-slider");
        const rangeS = parent.querySelectorAll('input[type="range"]'), numberS = parent.querySelectorAll('input[type="number"]');
        rangeS.forEach((el)=>{
            el.oninput = ()=>{
                let slide1 = parseFloat(rangeS[0].value), slide2 = parseFloat(rangeS[1].value);
                if (slide1 > slide2) [slide1, slide2] = [
                    slide2,
                    slide1
                ];
                numberS[0].value = `${slide1}`;
                numberS[1].value = `${slide2}`;
            };
        });
        numberS.forEach((el)=>{
            el.oninput = ()=>{
                let number1 = parseFloat(numberS[0].value), number2 = parseFloat(numberS[1].value);
                if (number1 > number2) {
                    let tmp = number1;
                    numberS[0].value = `${number2}`;
                    numberS[1].value = `${tmp}`;
                }
                rangeS[0].value = `${number1}`;
                rangeS[1].value = `${number2}`;
            };
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4Qdjn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StateMachine", ()=>StateMachine);
class StateMachine {
    states = new Map();
    transitions = new Map();
    running = false;
    addState(state) {
        this.states.set(state.name, state);
        return this; // chainable
    }
    setInitialState(name) {
        this.currentState = this.states.get(name);
        return this; // chainable
    }
    addTransition(from, to) {
        this.transitions.set(from, to);
        return this; // chainable
    }
    run(context) {
        if (!this.running) {
            this.running = true;
            this.currentState.firstRun?.(context);
        }
        if (this.currentState) {
            const result = this.currentState.handlerFunc(context);
            if (result === null) {
                this.currentState.cleanUp?.(context);
                this.gotoNext(context);
                // run again
                this.run(context);
            } else return result;
        } else // finish
        return null;
    }
    gotoNext(context) {
        const newState = this.transitions.get(this.currentState.name);
        if (newState) {
            this.currentState = this.states.get(newState);
            this.currentState.firstRun?.(context);
        } else // finish
        return null;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["iJYvl","h7u1C"], "h7u1C", "parcelRequirecb92")

//# sourceMappingURL=index.b71e74eb.js.map
