// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
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
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
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
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"6KQHC":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "1e902fba756690f8378fe1312828c834";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
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
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"1FjDB":[function(require,module,exports) {
window.addEventListener("load", () => {
  let lon;
  let lat;
  let APIkey = `32e79a9810e2c04e2dfe9f2934518867`;
  let pressureValue = document.querySelector("#actual-pressure");
  let pressureBorder = document.querySelector(".pressure-indicator");
  let windValue = document.querySelector("#actual-wind");
  let cloudsValue = document.querySelector("#actual-clouds");
  let tempValue = document.querySelector("#actual-temp");
  let tempBorder = document.querySelector(".temp-indicator");
  let station = document.querySelector("#station-city");
  let lowestTemp = document.querySelector("#lowest-temp");
  let highestTemp = document.querySelector("#highest-temp");
  let airqVal = document.querySelector("#actual-airq");
  let pm10Val = document.querySelector("#pm10-actual");
  let pm25Val = document.querySelector("#pm25-actual");
  let so2Val = document.querySelector("#so2-actual");
  let airqBorder = document.querySelector(".airq-indicator");
  let pm25Norm = document.querySelector("#pm25-norm");
  let pm10Norm = document.querySelector("#pm10-norm");
  let so2Norm = document.querySelector("#so2-norm");
  let pm10Border = document.querySelector(".pm10-indicator");
  let pm25Border = document.querySelector(".pm25-indicator");
  let so2Border = document.querySelector(".so2-indicator");
  let windBorder = document.querySelector(".wind-indicator");
  let units = `µg/m³`;

  console.log(document.querySelector(".forecast__main--temperature"));

  const getBrowserLocale = () =>
    navigator.language ||
    navigator.browserLanguage ||
    (navigator.languages || ["en"])[0];

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=PL`;
      const api2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=PL`;
      const api3 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=PL`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp, pressure, wind_speed, clouds } = data.current;
          const { min, max } = data.daily[0].temp;

          windBorder.style.border = "4px solid #ffffff";
          tempValue.textContent = Math.floor(temp) + "°c";
          pressureValue.innerHTML = pressure;
          cloudsValue.innerHTML = `clouds ${clouds}%`;
          windValue.innerHTML = Math.floor(wind_speed);
          lowestTemp.innerHTML = Math.ceil(min) + "°c";
          highestTemp.innerHTML = Math.floor(max) + "°c";

          console.log(data.daily);

          if (pressure > 1013) {
            pressureBorder.style.border = "4px solid #00cc55";
          } else {
            pressureBorder.style.border = "4px solid #dcab38";
          }

          if (temp < 13) {
            tempBorder.style.border = "4px solid #0082ec";
          } else if (temp >= 13 && temp < 30) {
            tempBorder.style.border = "4px solid #dcab38";
          } else {
            tempBorder.style.border = "4px solid #bf0404";
          }

          const forr = document.querySelector("#forr");

          data.daily.forEach((daily) => {
            const { clouds, dt, rain } = daily;
            const { min, max } = daily.temp;

            console.log(daily);

            let day = new Date(dt * 1000).toLocaleDateString(
              getBrowserLocale()
            );
            console.log(day);

            const dailyEl = document.createElement("div");
            let cloudsDaily = document.createElement("div");
            let lowTempDaily = document.createElement("div");
            let highTempDaily = document.createElement("div");
            let dayTime = document.createElement("div");
            let rainDaily = document.createElement("div");

            rainDaily.classList.add("rain-daily");
            dayTime.classList.add("day-time");
            lowTempDaily.classList.add("low-temp-daily");
            highTempDaily.classList.add("high-temp-daily");
            cloudsDaily.classList.add("clouds-daily");
            dailyEl.classList.add("daily-weather");

            rain != null
              ? (rainDaily.style.display = "block")
              : (rainDaily.style.display = "none");

            if (max < 13) {
              dailyEl.style.border = "4px solid #0082ec";
            } else if (max >= 13 && max < 30) {
              dailyEl.style.border = "4px solid #dcab38";
            } else {
              dailyEl.style.border = "4px solid #bf0404";
            }

            dailyEl.appendChild(dayTime);
            dailyEl.appendChild(cloudsDaily);
            dailyEl.appendChild(lowTempDaily);
            dailyEl.appendChild(highTempDaily);
            dailyEl.appendChild(rainDaily);
            dayTime.innerHTML = new Date(dt * 1000).toLocaleDateString("pl-PL");
            cloudsDaily.innerHTML = `Clouds: ${clouds}%`;
            lowTempDaily.innerHTML = `L: ${Math.floor(min) + "°c"}`;
            highTempDaily.innerHTML = `H: ${Math.floor(max) + "°c"}`;
            rainDaily.innerHTML = `Rain: ${Math.floor(rain) + "mm"}`;

            forr.appendChild(dailyEl);
          });
        });

      fetch(api2)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          const { name } = res;
          station.innerHTML = name;
        });

      fetch(api3)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          const { pm10, pm2_5, so2 } = res.list[0].components;
          const { aqi } = res.list[0].main;

          airqVal.innerHTML = aqi;
          pm10Val.innerHTML = `${pm10}${units}`;
          pm25Val.innerHTML = `${pm2_5}${units}`;
          so2Val.innerHTML = `${so2}${units}`;
          pm25Norm.innerHTML = Math.floor((pm2_5 / 25) * 100) + "%";
          pm10Norm.innerHTML = Math.floor((pm10 / 50) * 100) + "%";
          so2Norm.innerHTML = Math.floor((so2 / 125) * 100) + "%";

          if (aqi == 1) {
            airqBorder.style.border = "4px solid #00cc55"; // best
          } else if (aqi > 1 && aqi <= 2) {
            airqBorder.style.border = "4px solid #EEEE77";
          } else if (aqi > 2 && aqi <= 3) {
            airqBorder.style.border = "4px solid #af6e0c"; // worse
          } else if (aqi > 3 && aqi <= 4) {
            airqBorder.style.border = "4px solid #df0000"; // worst
          } else if (aqi > 4 && aqi <= 5) {
            airqBorder.style.border = "4px solid #5a123f";
          }

          if (Math.floor((pm10 / 50) * 100) <= 30) {
            pm10Border.style.border = "2px solid #00cc55";
          } else if (
            Math.floor((pm10 / 50) * 100) > 30 &&
            Math.floor((pm10 / 50) * 100) <= 75
          ) {
            pm10Border.style.border = "2px solid #af6e0c";
          } else {
            pm10Border.style.border = "2px solid #df0000";
          }

          if (Math.floor((pm2_5 / 25) * 100) <= 30) {
            pm25Border.style.border = "2px solid #00cc55";
          } else if (
            Math.floor((pm2_5 / 25) * 100) > 30 &&
            Math.floor((pm2_5 / 25) * 100) <= 75
          ) {
            pm25Border.style.border = "2px solid #af6e0c";
          } else {
            pm25Border.style.border = "2px solid #df0000";
          }

          if (Math.floor((so2 / 125) * 100) <= 30) {
            so2Border.style.border = "2px solid #00cc55";
          } else if (
            Math.floor((so2 / 125) * 100) > 30 &&
            Math.floor((so2 / 125) * 100) <= 75
          ) {
            so2Border.style.border = "2px solid #af6e0c";
          } else {
            so2Border.style.border = "2px solid #df0000";
          }
        });
    });
  }
});

},{}]},["6KQHC","1FjDB"], "1FjDB", "parcelRequire4357")

//# sourceMappingURL=index.2828c834.js.map
