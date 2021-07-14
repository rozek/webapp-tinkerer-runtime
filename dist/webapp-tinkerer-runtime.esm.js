/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var localforage$1 = {exports: {}};

/*!
    localForage -- Offline Storage, Improved
    Version 1.9.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/

(function (module, exports) {
(function(f){{module.exports=f();}})(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
},{}],2:[function(_dereq_,module,exports){
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
},{"2":2}],4:[function(_dereq_,module,exports){

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb || !idb.open) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support
        // (see: https://github.com/pouchdb/pouchdb/issues/5572).
        // Safari 10.1 shipped with fetch, we can use that to detect it.
        // Note: this creates issues with `window.fetch` polyfills and
        // overrides; see:
        // https://github.com/localForage/localForage/issues/856
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

function getCallback() {
    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1];
    }
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs = void 0;
var dbContexts = {};
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve, reject) {
        deferredOperation.resolve = resolve;
        deferredOperation.reject = reject;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
        return deferredOperation.promise;
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
        return deferredOperation.promise;
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {
        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            resolve(openreq.result);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        var forage = forages[i];
        if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
        }
    }
    dbInfo.db = null;

    return _getOriginalConnection(dbInfo).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        // store the latest db reference
        // in case the db was upgraded
        dbInfo.db = dbContext.db = db;
        for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback, retries) {
    if (retries === undefined) {
        retries = 1;
    }

    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                }
            }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                });
            })["catch"](callback);
        }

        callback(err);
    }
}

function createDbContext() {
    return {
        // Running localForages sharing a database.
        forages: [],
        // Shared database.
        db: null,
        // Database readiness (promise).
        dbReady: null,
        // Deferred operations on the database.
        deferredOperations: []
    };
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = createDbContext();
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback returns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
            return db;
        });

        if (!options.storeName) {
            promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = req.onblocked = function (err) {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        reject(err);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        resolve(db);
                    };
                });

                return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        var _forage = forages[i];
                        _advanceReadiness(_forage._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        } else {
            promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                        var db = req.result;
                        db.close();
                        reject(err);
                    };

                    req.onupgradeneeded = function () {
                        var db = req.result;
                        db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        db.close();
                        resolve(db);
                    };
                });

                return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db;
                        _advanceReadiness(_forage2._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        }
    }

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys,
    dropInstance: dropInstance
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

function createDbTable(t, dbInfo, callback, errorCallback) {
    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
}

// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        }, reject);
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    t.executeSql(sqlStatement, args, callback, function (t, error) {
        if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                        t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                } else {
                    errorCallback(t, error);
                }
            }, errorCallback);
        } else {
            errorCallback(t, error);
        }
    }, errorCallback);
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// https://www.w3.org/TR/webdatabase/#databases
// > There is no way to enumerate or delete the databases available for an origin from this API.
function getAllStoreNames(db) {
    return new Promise$1(function (resolve, reject) {
        db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                }

                resolve({
                    db: db,
                    storeNames: storeNames
                });
            }, function (t, error) {
                reject(error);
            });
        }, function (sqlError) {
            reject(sqlError);
        });
    });
}

function dropInstance$1(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
            } else {
                db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
            } else {
                resolve({
                    db: db,
                    storeNames: [options.storeName]
                });
            }
        }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                        return new Promise$1(function (resolve, reject) {
                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    }

                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                        resolve();
                    })["catch"](function (e) {
                        reject(e);
                    });
                }, function (sqlError) {
                    reject(sqlError);
                });
            });
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1,
    dropInstance: dropInstance$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
        // in IE8 typeof localStorage.setItem === 'object'
        !!localStorage.setItem;
    } catch (e) {
        return false;
    }
}

function _getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + '/';

    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + '/';
    }
    return keyPrefix;
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance$2(options, callback) {
    callback = getCallback.apply(this, arguments);

    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + '/');
            } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
            }
        }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2,
    dropInstance: dropInstance$2
};

var sameValue = function sameValue(x, y) {
    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
};

var includes = function includes(array, searchElement) {
    var len = array.length;
    var i = 0;
    while (i < len) {
        if (sameValue(array[i], searchElement)) {
            return true;
        }
        i++;
    }

    return false;
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var OptionalDriverMethods = ['dropInstance'];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                        return function () {
                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                            var promise = Promise$1.reject(error);
                            executeCallback(promise, arguments[arguments.length - 1]);
                            return promise;
                        };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                    }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});
}(localforage$1));

var localforage = localforage$1.exports;

//----------------------------------------------------------------------------//
//                        JavaScript Interface Library                        //
//----------------------------------------------------------------------------//
/**** get a reference to the "global" object ****/
var global$1 = /*#__PURE__*/ Function('return this')();
// see https://stackoverflow.com/questions/3277182/how-to-get-the-global-object-in-javascript
//------------------------------------------------------------------------------
//--                             Object Functions                             --
//------------------------------------------------------------------------------
// allow methods from Object.prototype to be applied to "vanilla" objects
/**** Object_hasOwnProperty ****/
function Object_hasOwnProperty(Value, PropertyName) {
    return ((Value == null) || // let this method crash like its original
        ('hasOwnProperty' in Value) && (typeof Value.hasOwnProperty === 'function')
        ? Value.hasOwnProperty(PropertyName)
        : Object.prototype.hasOwnProperty.call(Value, PropertyName));
}
/**** Object_isPrototypeOf ****/
function Object_isPrototypeOf(Value, Candidate) {
    return ((Value == null) || // let this method crash like its original
        ('isPrototypeOf' in Value) && (typeof Value.isPrototypeOf === 'function')
        ? Value.isPrototypeOf(Candidate)
        : Object.prototype.isPrototypeOf.call(Value, Candidate));
}
/**** Object_propertyIsEnumerable ****/
function Object_propertyIsEnumerable(Value, PropertyName) {
    return ((Value == null) || // let this method crash like its original
        ('propertyIsEnumerable' in Value) && (typeof Value.propertyIsEnumerable === 'function')
        ? Value.propertyIsEnumerable(PropertyName)
        : Object.prototype.propertyIsEnumerable.call(Value, PropertyName));
}
/**** Object_toString ****/
function Object_toString(Value) {
    return ((Value == null) || // let this method crash like its original
        ('toString' in Value) && (typeof Value.toString === 'function')
        ? Value.toString()
        : Object.prototype.toString.call(Value));
}
/**** Object_toLocaleString ****/
function Object_toLocaleString(Value) {
    return ((Value == null) || // let this method crash like its original
        ('toLocaleString' in Value) && (typeof Value.toLocaleString === 'function')
        ? Value.toLocaleString()
        : Object.prototype.toString.call(Value)); // a missing "toLocaleString" method will crash Object.prototype.toLocaleString
}
/**** Object_valueOf ****/
function Object_valueOf(Value) {
    return ((Value == null) || // let this method crash like its original
        ('valueOf' in Value) && (typeof Value.valueOf === 'function')
        ? Value.valueOf()
        : Object.prototype.valueOf.call(Value));
}
/**** ObjectMergedWith ****/
function ObjectMergedWith(TargetObject) {
    var otherObjectList = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherObjectList[_i - 1] = arguments[_i];
    }
    for (var i = 0, l = otherObjectList.length; i < l; i++) {
        var otherObject = otherObjectList[i];
        if (otherObject == null) {
            continue;
        }
        if (typeof otherObject === 'object') {
            for (var Key in otherObject) {
                var Descriptor = Object.getOwnPropertyDescriptor(otherObject, Key);
                if (Descriptor != null) {
                    Object.defineProperty(TargetObject, Key, Descriptor);
                }
            }
        }
        else {
            throwError('InvalidArgument: argument #' + (i + 1) + ' is not an object');
        }
    }
    return TargetObject;
}
/**** throwError - simplifies construction of named errors ****/
function throwError(Message) {
    var Match = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(Message);
    if (Match == null) {
        throw new Error(Message);
    }
    else {
        var namedError = new Error(Match[2]);
        namedError.name = Match[1];
        throw namedError;
    }
}
//------------------------------------------------------------------------------
//--                      Value Classification Functions                      --
//------------------------------------------------------------------------------
/**** ValueExists ****/
function ValueExists(Value) {
    return (Value != null);
}
/**** ValueIsMissing ****/
function ValueIsMissing(Value) {
    return (Value == null);
}
/**** ValueIsBoolean ****/
function ValueIsBoolean(Value) {
    return (typeof Value === 'boolean') || (Value instanceof Boolean);
}
/**** ValueIsNumber ****/
function ValueIsNumber(Value) {
    return (typeof Value === 'number') || (Value instanceof Number);
}
/**** ValueIsFiniteNumber (pure "isFinite" breaks on objects) ****/
function ValueIsFiniteNumber(Value) {
    return ((typeof Value === 'number') || (Value instanceof Number)) && isFinite(Value.valueOf());
}
/**** ValueIsNaN (numeric, but NaN - this differs from pure "isNaN") ****/
function ValueIsNaN(Value) {
    return ((typeof Value === 'number') || (Value instanceof Number)) && isNaN(Value.valueOf());
}
/**** ValueIsNumberInRange ****/
function ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax) {
    if (withMin === void 0) { withMin = true; }
    if (withMax === void 0) { withMax = true; }
    if (!ValueIsNumber(Value) || isNaN(Value)) {
        return false;
    }
    if (ValueIsFiniteNumber(minValue)) { // more robust than "isFinite" alone
        if (ValueIsFiniteNumber(maxValue)) { // more robust than "isFinite" alone
            if ((Value < minValue) || (!withMin && (Value === minValue)) ||
                (Value > maxValue) || (!withMax && (Value === maxValue))) {
                return false;
            }
        }
        else {
            if ((Value < minValue) || (!withMin && (Value === minValue))) {
                return false;
            }
        }
    }
    else {
        if (ValueIsFiniteNumber(maxValue)) { // more robust than "isFinite" alone
            if ((Value > maxValue) || (!withMax && (Value === maxValue))) {
                return false;
            }
        }
    }
    return true;
}
/**** ValueIsInteger ****/
function ValueIsInteger(Value) {
    if ((typeof Value !== 'number') && !(Value instanceof Number)) {
        return false;
    }
    Value = Value.valueOf();
    return isFinite(Value) && (Math.round(Value) === Value);
}
/**** ValueIsIntegerInRange ****/
function ValueIsIntegerInRange(Value, minValue, maxValue) {
    if (!ValueIsInteger(Value) || isNaN(Value)) {
        return false;
    }
    if (ValueIsFiniteNumber(minValue)) { // more robust than "isFinite" alone
        if (ValueIsFiniteNumber(maxValue)) { // more robust than "isFinite" alone
            if ((Value < minValue) || (Value > maxValue)) {
                return false;
            }
        }
        else {
            if (Value < minValue) {
                return false;
            }
        }
    }
    else {
        if (ValueIsFiniteNumber(maxValue)) { // more robust than "isFinite" alone
            if (Value > maxValue) {
                return false;
            }
        }
    }
    return true;
}
/**** ValueIsOrdinal ****/
function ValueIsOrdinal(Value) {
    if ((typeof Value !== 'number') && !(Value instanceof Number)) {
        return false;
    }
    Value = Value.valueOf();
    return isFinite(Value) && (Math.round(Value) === Value) && (Value >= 0);
}
/**** ValueIsCardinal ****/
function ValueIsCardinal(Value) {
    if ((typeof Value !== 'number') && !(Value instanceof Number)) {
        return false;
    }
    Value = Value.valueOf();
    return isFinite(Value) && (Math.round(Value) === Value) && (Value >= 1);
}
/**** ValueIsString ****/
function ValueIsString(Value) {
    return (typeof Value === 'string') || (Value instanceof String);
}
/**** ValueIs[Non]EmptyString ****/
var emptyStringPattern = /^\s*$/;
function ValueIsEmptyString(Value) {
    return ((typeof Value === 'string') || (Value instanceof String)) && emptyStringPattern.test(Value.valueOf());
}
function ValueIsNonEmptyString(Value) {
    return ((typeof Value === 'string') || (Value instanceof String)) && !emptyStringPattern.test(Value.valueOf());
}
/**** ValueIsStringMatching ****/
function ValueIsStringMatching(Value, Pattern) {
    return ((typeof Value === 'string') || (Value instanceof String)) && Pattern.test(Value.valueOf());
}
/**** ValueIsText ****/
var noCtrlCharsButCRLFPattern = /^[^\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function ValueIsText(Value) {
    return ValueIsStringMatching(Value, noCtrlCharsButCRLFPattern);
}
/**** ValueIsTextline ****/
var noCtrlCharsPattern = /^[^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function ValueIsTextline(Value) {
    return ValueIsStringMatching(Value, noCtrlCharsPattern);
}
/**** ValueIsFunction ****/
function ValueIsFunction(Value) {
    return (typeof Value === 'function');
}
/**** ValueIsAnonymousFunction ****/
function ValueIsAnonymousFunction(Value) {
    return ((typeof Value === 'function') &&
        ((Value.name == null) || (Value.name === '')));
}
/**** ValueIsNamedFunction ****/
function ValueIsNamedFunction(Value) {
    return ((typeof Value === 'function') &&
        (Value.name != null) && (Value.name !== ''));
}
/**** ValueIsNativeFunction ****/
function ValueIsNativeFunction(Value) {
    return ((typeof Value === 'function') &&
        /^function\s*[^(]*\(\)\s*\{\s*\[native code\]\s*\}\s*$/.test(Value.toString()));
}
/**** ValueIsScriptedFunction ****/
function ValueIsScriptedFunction(Value) {
    return ((typeof Value === 'function') &&
        !/^function\s*[^(]*\(\)\s*\{\s*\[native code\]\s*\}\s*$/.test(Value.toString()));
}
/**** ValueIsObject ****/
function ValueIsObject(Value) {
    return (Value != null) && (typeof Value === 'object');
}
/**** ValueIsPlainObject ****/
function ValueIsPlainObject(Value) {
    return ((Value != null) && (typeof Value === 'object') &&
        (Object.getPrototypeOf(Value) === Object.prototype));
}
/**** ValueIsVanillaObject ****/
function ValueIsVanillaObject(Value) {
    return ((Value != null) && (typeof Value === 'object') &&
        !(Value instanceof Object));
}
/**** ValueIsArray ****/
var ValueIsArray = Array.isArray;
/**** ValueIsList ("dense" array) ****/
function ValueIsList(Value, minLength, maxLength) {
    if (ValueIsArray(Value)) {
        for (var i = 0, l = Value.length; i < l; i++) {
            if (Value[i] === undefined) {
                return false;
            }
        }
        if (minLength != null) {
            if (Value.length < minLength) {
                return false;
            }
        }
        if (maxLength != null) {
            if (Value.length > maxLength) {
                return false;
            }
        }
        return true;
    }
    return false;
}
/**** ValueIsListSatisfying ****/
function ValueIsListSatisfying(Value, Validator, minLength, maxLength) {
    if (ValueIsArray(Value)) {
        try {
            for (var i = 0, l = Value.length; i < l; i++) {
                if (Validator(Value[i]) == false) {
                    return false;
                }
            }
            if (minLength != null) {
                if (Value.length < minLength) {
                    return false;
                }
            }
            if (maxLength != null) {
                if (Value.length > maxLength) {
                    return false;
                }
            }
            return true;
        }
        catch (Signal) { /* nop */ }
    }
    return false;
}
/**** ValueIsInstanceOf ****/
function ValueIsInstanceOf(Value, Constructor) {
    return (Value instanceof Constructor);
}
/**** ValueInheritsFrom ****/
function ValueInheritsFrom(Value, Prototype) {
    return Object_isPrototypeOf(Prototype, Value);
}
/**** ValueIsDate ****/
function ValueIsDate(Value) {
    return (Value instanceof Date);
}
/**** ValueIsError ****/
function ValueIsError(Value) {
    return (Value instanceof Error);
}
/**** ValueIsPromise ****/
function ValueIsPromise(Value) {
    return (Value != null) && (typeof Value.then === 'function');
}
// see https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise
/**** ValueIsRegExp ****/
function ValueIsRegExp(Value) {
    return (Value instanceof RegExp);
}
/**** ValueIsOneOf ****/
function ValueIsOneOf(Value, ValueList) {
    return (ValueList.indexOf(Value) >= 0);
} // no automatic unboxing of boxed values and vice-versa!
/**** ValueIsColor ****/
function ValueIsColor(Value) {
    return ValueIsString(Value) && (ColorSet.hasOwnProperty(Value) ||
        /^#[a-fA-F0-9]{6}$/.test(Value) ||
        /^#[a-fA-F0-9]{8}$/.test(Value) ||
        /^rgb\([0-9]+,\s*[0-9]+,\s*[0-9]+\)$/.test(Value) || // not perfect
        /^rgba\([0-9]+,\s*[0-9]+,\s*[0-9]+,([01]|[0]?[.][0-9]+)\)$/.test(Value) // dto.
    );
}
/**** ValueIsEMailAddress ****/
var EMailAddressPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
// see https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
function ValueIsEMailAddress(Value) {
    return ValueIsStringMatching(Value, EMailAddressPattern);
}
/**** ValueIsURL ****/
var noCtrlCharsOrWhitespacePattern = /^[^\s\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function ValueIsURL(Value) {
    if (!ValueIsStringMatching(Value, noCtrlCharsOrWhitespacePattern) ||
        (Value === '')) {
        return false;
    }
    try {
        new URL(Value, 'file://');
        return true;
    }
    catch (Signal) {
        return false;
    }
}
//------------------------------------------------------------------------------
//--                      Argument Validation Functions                       --
//------------------------------------------------------------------------------
var rejectNil = false;
var acceptNil = true;
/**** validatedArgument ****/
function validatedArgument(Description, Argument, ValueIsValid, NilIsAcceptable, Expectation) {
    if (Argument == null) {
        if (NilIsAcceptable) {
            return Argument;
        }
        else {
            throwError("MissingArgument: no " + escaped(Description) + " given");
        }
    }
    else {
        if (ValueIsValid(Argument)) {
            switch (true) {
                case Argument instanceof Boolean:
                case Argument instanceof Number:
                case Argument instanceof String:
                    return Argument.valueOf(); // unboxes any primitives
                default:
                    return Argument;
            }
        }
        else {
            throwError("InvalidArgument: the given " + escaped(Description) + " is no valid " + escaped(Expectation));
        }
    }
}
/**** ValidatorForClassifier ****/
function ValidatorForClassifier(Classifier, NilIsAcceptable, Expectation) {
    var Validator = function (Description, Argument) {
        return validatedArgument(Description, Argument, Classifier, NilIsAcceptable, Expectation);
    };
    var ClassifierName = Classifier.name;
    if ((ClassifierName != null) && /^ValueIs/.test(ClassifierName)) {
        var ValidatorName = ClassifierName.replace(// derive name from validator
        /^ValueIs/, NilIsAcceptable ? 'allow' : 'expect');
        return FunctionWithName(Validator, ValidatorName);
    }
    else {
        return Validator; // without any specific name
    }
}
/**** FunctionWithName (works with older JS engines as well) ****/
function FunctionWithName(originalFunction, desiredName) {
    if (originalFunction == null) {
        throwError('MissingArgument: no function given');
    }
    if (typeof originalFunction !== 'function') {
        throwError('InvalidArgument: the given 1st Argument is not a JavaScript function');
    }
    if (desiredName == null) {
        throwError('MissingArgument: no desired name given');
    }
    if ((typeof desiredName !== 'string') && !(desiredName instanceof String)) {
        throwError('InvalidArgument: the given desired name is not a string');
    }
    if (originalFunction.name === desiredName) {
        return originalFunction;
    }
    try {
        Object.defineProperty(originalFunction, 'name', { value: desiredName });
        if (originalFunction.name === desiredName) {
            return originalFunction;
        }
    }
    catch (signal) { /* ok - let's take the hard way */ }
    var renamed = new Function('originalFunction', 'return function ' + desiredName + ' () {' +
        'return originalFunction.apply(this,Array.prototype.slice.apply(arguments))' +
        '}');
    return renamed(originalFunction);
} // also works with older JavaScript engines
/**** expect[ed]Value ****/
function expectValue(Description, Argument) {
    if (Argument == null) {
        throwError("MissingArgument: no " + escaped(Description) + " given");
    }
    else {
        return Argument.valueOf();
    }
}
var expectedValue = expectValue;
/**** allow/expect[ed]Boolean ****/
var allowBoolean = /*#__PURE__*/ ValidatorForClassifier(ValueIsBoolean, acceptNil, 'boolean value'), allowedBoolean = allowBoolean;
var expectBoolean = /*#__PURE__*/ ValidatorForClassifier(ValueIsBoolean, rejectNil, 'boolean value'), expectedBoolean = expectBoolean;
/**** allow/expect[ed]Number ****/
var allowNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsNumber, acceptNil, 'numeric value'), allowedNumber = allowNumber;
var expectNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsNumber, rejectNil, 'numeric value'), expectedNumber = expectNumber;
/**** allow/expect[ed]FiniteNumber ****/
var allowFiniteNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsFiniteNumber, acceptNil, 'finite numeric value'), allowedFiniteNumber = allowFiniteNumber;
var expectFiniteNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsFiniteNumber, rejectNil, 'finite numeric value'), expectedFiniteNumber = expectFiniteNumber;
/**** allow/expect[ed]NaN ****/
var allowNaN = /*#__PURE__*/ ValidatorForClassifier(ValueIsNaN, acceptNil, 'NaN value'), allowedNaN = allowNaN;
var expectNaN = /*#__PURE__*/ ValidatorForClassifier(ValueIsNaN, rejectNil, 'NaN value'), expectedNaN = expectNaN;
/**** allow[ed]NumberInRange ****/
function allowNumberInRange(Description, Argument, minValue, maxValue, withMin, withMax) {
    return (Argument == null
        ? Argument
        : expectedNumberInRange(Description, Argument, minValue, maxValue, withMin, withMax));
}
var allowedNumberInRange = allowNumberInRange;
/**** expect[ed]NumberInRange ****/
function expectNumberInRange(Description, Argument, minValue, maxValue, withMin, withMax) {
    expectNumber(Description, Argument);
    if (isNaN(Argument)) {
        throwError("InvalidArgument: the given " + escaped(Description) + " is not-a-number");
    }
    if (withMin == null) {
        withMin = true;
    }
    if (withMax == null) {
        withMax = true;
    }
    if ((minValue != null) && isFinite(minValue)) {
        if ((maxValue != null) && isFinite(maxValue)) {
            if ((Argument < minValue) || (!withMin && (Argument === minValue)) ||
                (Argument > maxValue) || (!withMax && (Argument === maxValue))) {
                throw new RangeError("the given " + escaped(Description) + " (" + Argument + ") is outside " +
                    ("the allowed range (" + minValue + "..." + maxValue + ")"));
            }
        }
        else {
            if ((Argument < minValue) || (!withMin && (Argument === minValue))) {
                throw new RangeError("the given " + escaped(Description) + " is below the allowed " +
                    ("minimum (" + Argument + " " + (withMin ? '<' : '<=') + " " + minValue + ")"));
            }
        }
    }
    else {
        if ((maxValue != null) && isFinite(maxValue)) {
            if ((Argument > maxValue) || (!withMax && (Argument === maxValue))) {
                throw new RangeError("the given " + escaped(Description) + " exceeds the allowed " +
                    ("maximum (" + Argument + " " + (withMax ? '>' : '>=') + " " + maxValue + ")"));
            }
        }
    }
    return Argument.valueOf();
}
var expectedNumberInRange = expectNumberInRange;
/**** allow/expect[ed]Integer ****/
var allowInteger = /*#__PURE__*/ ValidatorForClassifier(ValueIsInteger, acceptNil, 'integral numeric value'), allowedInteger = allowInteger;
var expectInteger = /*#__PURE__*/ ValidatorForClassifier(ValueIsInteger, rejectNil, 'integral numeric value'), expectedInteger = expectInteger;
/**** allow[ed]IntegerInRange ****/
function allowIntegerInRange(Description, Argument, minValue, maxValue) {
    return (Argument == null
        ? Argument
        : expectedIntegerInRange(Description, Argument, minValue, maxValue));
}
var allowedIntegerInRange = allowIntegerInRange;
/**** expect[ed]IntegerInRange ****/
function expectIntegerInRange(Description, Argument, minValue, maxValue) {
    expectInteger(Description, Argument);
    if (isNaN(Argument)) {
        throwError("InvalidArgument: the given " + escaped(Description) + " is not-a-number");
    }
    if ((minValue != null) && isFinite(minValue)) {
        if ((maxValue != null) && isFinite(maxValue)) {
            if ((Argument < minValue) || (Argument > maxValue)) {
                throw new RangeError("the given " + escaped(Description) + " (" + Argument + ") is outside " +
                    ("the allowed range (" + minValue + "..." + maxValue + ")"));
            }
        }
        else {
            if (Argument < minValue) {
                throw new RangeError("the given " + escaped(Description) + " is below the allowed " +
                    ("minimum (" + Argument + " < " + minValue + ")"));
            }
        }
    }
    else {
        if ((maxValue != null) && isFinite(maxValue)) {
            if (Argument > maxValue) {
                throw new RangeError("the given " + escaped(Description) + " exceeds the allowed " +
                    ("maximum (" + Argument + " > " + maxValue + ")"));
            }
        }
    }
    return Argument.valueOf();
}
var expectedIntegerInRange = expectIntegerInRange;
/**** allow/expect[ed]Ordinal ****/
var allowOrdinal = /*#__PURE__*/ ValidatorForClassifier(ValueIsOrdinal, acceptNil, 'ordinal number'), allowedOrdinal = allowOrdinal;
var expectOrdinal = /*#__PURE__*/ ValidatorForClassifier(ValueIsOrdinal, rejectNil, 'ordinal number'), expectedOrdinal = expectOrdinal;
/**** allow/expect[ed]Cardinal ****/
var allowCardinal = /*#__PURE__*/ ValidatorForClassifier(ValueIsCardinal, acceptNil, 'cardinal number'), allowedCardinal = allowCardinal;
var expectCardinal = /*#__PURE__*/ ValidatorForClassifier(ValueIsCardinal, rejectNil, 'cardinal number'), expectedCardinal = expectCardinal;
/**** allow/expect[ed]String ****/
var allowString = /*#__PURE__*/ ValidatorForClassifier(ValueIsString, acceptNil, 'literal string'), allowedString = allowString;
var expectString = /*#__PURE__*/ ValidatorForClassifier(ValueIsString, rejectNil, 'literal string'), expectedString = expectString;
/**** allow/expect[ed]NonEmptyString ****/
var allowNonEmptyString = /*#__PURE__*/ ValidatorForClassifier(ValueIsNonEmptyString, acceptNil, 'non-empty literal string'), allowedNonEmptyString = allowNonEmptyString;
var expectNonEmptyString = /*#__PURE__*/ ValidatorForClassifier(ValueIsNonEmptyString, rejectNil, 'non-empty literal string'), expectedNonEmptyString = expectNonEmptyString;
/**** allow[ed]StringMatching ****/
function allowStringMatching(Description, Argument, Pattern) {
    return (Argument == null
        ? Argument
        : expectedStringMatching(Description, Argument, Pattern));
}
var allowedStringMatching = allowStringMatching;
/**** expect[ed]StringMatching ****/
function expectStringMatching(Description, Argument, Pattern) {
    expectString(Description, Argument);
    if (Pattern.test(Argument)) {
        return Argument.valueOf();
    }
    else {
        throwError("InvalidArgument: the given " + escaped(Description) + " does not match the specified pattern");
    }
}
var expectedStringMatching = expectStringMatching;
/**** allow/expect[ed]Text ****/
var allowText = /*#__PURE__*/ ValidatorForClassifier(ValueIsText, acceptNil, 'literal text'), allowedText = allowText;
var expectText = /*#__PURE__*/ ValidatorForClassifier(ValueIsText, rejectNil, 'literal text'), expectedText = expectText;
/**** allow/expect[ed]Textline ****/
var allowTextline = /*#__PURE__*/ ValidatorForClassifier(ValueIsTextline, acceptNil, 'single line of text'), allowedTextline = allowTextline;
var expectTextline = /*#__PURE__*/ ValidatorForClassifier(ValueIsTextline, rejectNil, 'single line of text'), expectedTextline = expectTextline;
/**** allow/expect[ed]Function ****/
var allowFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsFunction, acceptNil, 'JavaScript function'), allowedFunction = allowFunction;
var expectFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsFunction, rejectNil, 'JavaScript function'), expectedFunction = expectFunction;
/**** allow/expect[ed]AnonymousFunction ****/
var allowAnonymousFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsAnonymousFunction, acceptNil, 'anonymous JavaScript function'), allowedAnonymousFunction = allowAnonymousFunction;
var expectAnonymousFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsAnonymousFunction, rejectNil, 'anonymous JavaScript function'), expectedAnonymousFunction = expectAnonymousFunction;
/**** allow/expect[ed]NamedFunction ****/
var allowNamedFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsNamedFunction, acceptNil, 'named JavaScript function'), allowedNamedFunction = allowNamedFunction;
var expectNamedFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsNamedFunction, rejectNil, 'named JavaScript function'), expectedNamedFunction = expectNamedFunction;
/**** allow/expect[ed]NativeFunction ****/
var allowNativeFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsNativeFunction, acceptNil, 'native JavaScript function'), allowedNativeFunction = allowNativeFunction;
var expectNativeFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsNativeFunction, rejectNil, 'native JavaScript function'), expectedNativeFunction = expectNativeFunction;
/**** allow/expect[ed]ScriptedFunction ****/
var allowScriptedFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsScriptedFunction, acceptNil, 'scripted JavaScript function'), allowedScriptedFunction = allowScriptedFunction;
var expectScriptedFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsScriptedFunction, rejectNil, 'scripted JavaScript function'), expectedScriptedFunction = expectScriptedFunction;
/**** allow/expect[ed]Object ****/
var allowObject = /*#__PURE__*/ ValidatorForClassifier(ValueIsObject, acceptNil, 'JavaScript object'), allowedObject = allowObject;
var expectObject = /*#__PURE__*/ ValidatorForClassifier(ValueIsObject, rejectNil, 'JavaScript object'), expectedObject = expectObject;
/**** allow/expect[ed]PlainObject ****/
var allowPlainObject = /*#__PURE__*/ ValidatorForClassifier(ValueIsPlainObject, acceptNil, '"plain" JavaScript object'), allowedPlainObject = allowPlainObject;
var expectPlainObject = /*#__PURE__*/ ValidatorForClassifier(ValueIsPlainObject, rejectNil, '"plain" JavaScript object'), expectedPlainObject = expectPlainObject;
/**** allow/expect[ed]VanillaObject ****/
var allowVanillaObject = /*#__PURE__*/ ValidatorForClassifier(ValueIsVanillaObject, acceptNil, '"vanilla" JavaScript object'), allowedVanillaObject = allowVanillaObject;
var expectVanillaObject = /*#__PURE__*/ ValidatorForClassifier(ValueIsVanillaObject, rejectNil, '"vanilla" JavaScript object'), expectedVanillaObject = expectVanillaObject;
/**** allow[ed]Array ****/
function allowArray(Description, Argument) {
    return (Argument == null
        ? Argument
        : expectedArray(Description, Argument));
}
var allowedArray = allowArray;
/**** expect[ed]Array ****/
function expectArray(Description, Argument) {
    if (Argument == null) {
        throwError("MissingArgument: no " + escaped(Description) + " given");
    }
    if (ValueIsArray(Argument)) {
        return Argument;
    }
    else {
        throwError("InvalidArgument: the given " + escaped(Description) + " is no JavaScript array");
    }
}
var expectedArray = expectArray;
/**** allow[ed]List ****/
function allowList(Description, Argument, Expectation, minLength, maxLength) {
    return (Argument == null
        ? Argument
        : expectedList(Description, Argument, Expectation, minLength, maxLength));
}
var allowedList = allowList;
/**** expect[ed]List ****/
function expectList(Description, Argument, Expectation, minLength, maxLength) {
    if (Argument == null) {
        throwError("MissingArgument: no " + escaped(Description) + " given");
    }
    if (ValueIsList(Argument, minLength, maxLength)) {
        return Argument;
    }
    else {
        throwError("InvalidArgument: the given " + escaped(Description) + " is " + (Expectation == null
            ? 'either not a list or contains an invalid number of elements'
            : 'no ' + escaped(Expectation)));
    }
}
var expectedList = expectList;
/**** allow[ed]ListSatisfying ****/
function allowListSatisfying(Description, Argument, Validator, Expectation, minLength, maxLength) {
    return (Argument == null
        ? Argument
        : expectedListSatisfying(Description, Argument, Validator, Expectation, minLength, maxLength));
}
var allowedListSatisfying = allowListSatisfying;
/**** expect[ed]ListSatisfying ****/
function expectListSatisfying(Description, Argument, Validator, Expectation, minLength, maxLength) {
    if (Argument == null) {
        throwError("MissingArgument: no " + escaped(Description) + " given");
    }
    if (ValueIsListSatisfying(Argument, Validator, minLength, maxLength)) {
        return Argument;
    }
    else {
        throwError("InvalidArgument: the given " + escaped(Description) + " is " + (Expectation == null
            ? 'either not a list or contains invalid elements'
            : 'no ' + escaped(Expectation)));
    }
}
var expectedListSatisfying = expectListSatisfying;
/**** allow[ed]InstanceOf ****/
function allowInstanceOf(Description, Argument, constructor, Expectation) {
    return (Argument == null
        ? Argument
        : expectedInstanceOf(Description, Argument, constructor, Expectation));
}
var allowedInstanceOf = allowInstanceOf;
/**** expect[ed]InstanceOf ****/
function expectInstanceOf(Description, Argument, constructor, Expectation) {
    if (Argument == null) {
        throwError("MissingArgument: no " + escaped(Description) + " given");
    }
    if (!(Argument instanceof constructor)) {
        throwError("InvalidArgument: the given " + escaped(Description) + " is no " + escaped(Expectation));
    }
    return Argument;
}
var expectedInstanceOf = expectInstanceOf;
/**** allow[ed]ValueInheritingFrom ****/
function allowValueInheritingFrom(Description, Argument, prototype, Expectation) {
    return (Argument == null
        ? Argument
        : expectedValueInheritingFrom(Description, Argument, prototype, Expectation));
}
var allowedValueInheritingFrom = allowValueInheritingFrom;
/**** expect[ed]ValueInheritingFrom ****/
function expectValueInheritingFrom(Description, Argument, prototype, Expectation) {
    if (Argument == null) {
        throwError("MissingArgument: no " + escaped(Description) + " given");
    }
    if (prototype.isPrototypeOf(Argument)) {
        return Argument;
    }
    else {
        throwError("InvalidArgument: the given " + escaped(Description) + " is no " + escaped(Expectation));
    }
}
var expectedValueInheritingFrom = expectValueInheritingFrom;
/**** allow/expect[ed]Date ****/
var allowDate = /*#__PURE__*/ ValidatorForClassifier(ValueIsDate, acceptNil, 'JavaScript Date object'), allowedDate = allowDate;
var expectDate = /*#__PURE__*/ ValidatorForClassifier(ValueIsDate, rejectNil, 'JavaScript Date object'), expectedDate = expectDate;
/**** allow/expect[ed]Error ****/
var allowError = /*#__PURE__*/ ValidatorForClassifier(ValueIsError, acceptNil, 'JavaScript Error object'), allowedError = allowError;
var expectError = /*#__PURE__*/ ValidatorForClassifier(ValueIsError, rejectNil, 'JavaScript Error object'), expectedError = expectError;
/**** allow/expect[ed]Promise ****/
var allowPromise = /*#__PURE__*/ ValidatorForClassifier(ValueIsPromise, acceptNil, 'JavaScript Promise (or "Thenable") object'), allowedPromise = allowPromise;
var expectPromise = /*#__PURE__*/ ValidatorForClassifier(ValueIsPromise, rejectNil, 'JavaScript Promise (or "Thenable") object'), expectedPromise = expectPromise;
/**** allow/expect[ed]RegExp ****/
var allowRegExp = /*#__PURE__*/ ValidatorForClassifier(ValueIsRegExp, acceptNil, 'JavaScript RegExp object'), allowedRegExp = allowRegExp;
var expectRegExp = /*#__PURE__*/ ValidatorForClassifier(ValueIsRegExp, rejectNil, 'JavaScript RegExp object'), expectedRegExp = expectRegExp;
/**** allow[ed]OneOf ****/
function allowOneOf(Description, Argument, ValueList) {
    return (Argument == null
        ? Argument
        : expectedOneOf(Description, Argument, ValueList));
}
var allowedOneOf = allowOneOf;
/**** expect[ed]OneOf ****/
function expectOneOf(Description, Argument, ValueList) {
    if (Argument == null) {
        throwError("MissingArgument: no " + escaped(Description) + " given");
    }
    if (ValueIsOneOf(Argument, ValueList)) {
        return ( // unboxes any primitives
        (Argument == null) || (typeof Argument.valueOf !== 'function')
            ? Argument
            : Argument.valueOf());
    }
    else {
        throwError("InvalidArgument: the given " + escaped(Description) + " is not among the supported values");
    }
}
var expectedOneOf = expectOneOf;
/**** allow/expect[ed]Color ****/
var allowColor = /*#__PURE__*/ ValidatorForClassifier(ValueIsColor, acceptNil, 'valid CSS color specification'), allowedColor = allowColor;
var expectColor = /*#__PURE__*/ ValidatorForClassifier(ValueIsColor, rejectNil, 'valid CSS color specification'), expectedColor = expectColor;
/**** allow/expect[ed]EMailAddress ****/
var allowEMailAddress = /*#__PURE__*/ ValidatorForClassifier(ValueIsEMailAddress, acceptNil, 'valid EMail address'), allowedEMailAddress = allowEMailAddress;
var expectEMailAddress = /*#__PURE__*/ ValidatorForClassifier(ValueIsEMailAddress, rejectNil, 'valid EMail address'), expectedEMailAddress = expectEMailAddress;
/**** allow/expect[ed]URL ****/
var allowURL = /*#__PURE__*/ ValidatorForClassifier(ValueIsURL, acceptNil, 'valid URL'), allowedURL = allowURL;
var expectURL = /*#__PURE__*/ ValidatorForClassifier(ValueIsURL, rejectNil, 'valid URL'), expectedURL = expectURL;
/**** escaped - escapes all control characters in a given string ****/
function escaped(Text) {
    var EscapeSequencePattern = /\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?/g;
    var CtrlCharCodePattern = /[\x00-\x1f\x7f-\x9f]/g;
    return Text
        .replace(EscapeSequencePattern, function (Match) {
        return (Match === '\\' ? '\\\\' : Match);
    })
        .replace(CtrlCharCodePattern, function (Match) {
        switch (Match) {
            case '\0': return '\\0';
            case '\b': return '\\b';
            case '\f': return '\\f';
            case '\n': return '\\n';
            case '\r': return '\\r';
            case '\t': return '\\t';
            case '\v': return '\\v';
            default: {
                var HexCode = Match.charCodeAt(0).toString(16);
                return '\\x' + '00'.slice(HexCode.length) + HexCode;
            }
        }
    });
}
/**** unescaped - evaluates all escape sequences in a given string ****/
function unescaped(Text) {
    var EscapeSequencePattern = /\\[0bfnrtv'"\\\/]|\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}/g;
    return Text
        .replace(EscapeSequencePattern, function (Match) {
        switch (Match) {
            case '\\0': return '\0';
            case '\\b': return '\b';
            case '\\f': return '\f';
            case '\\n': return '\n';
            case '\\r': return '\r';
            case '\\t': return '\t';
            case '\\v': return '\v';
            case '\\\'': return "'";
            case '\\"': return '"';
            case '\\\\': return "\\";
            default: {
                var CharCode = parseInt(Match.slice(2), 16);
                return String.fromCharCode(CharCode);
            }
        }
    });
}
/**** quotable - makes a given string ready to be put in single/double quotes ****/
function quotable(Text, Quote) {
    if (Quote === void 0) { Quote = '"'; }
    var EscSeqOrSglQuotePattern = /\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?|'/g;
    var EscSeqOrDblQuotePattern = /\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?|"/g;
    var CtrlCharCodePattern = /[\x00-\x1f\x7f-\x9f]/g;
    return Text
        .replace(Quote === "'" ? EscSeqOrSglQuotePattern : EscSeqOrDblQuotePattern, function (Match) {
        switch (Match) {
            case "'": return "\\'";
            case '"': return '\\"';
            case '\\': return '\\\\';
            default: return Match;
        }
    })
        .replace(CtrlCharCodePattern, function (Match) {
        switch (Match) {
            case '\0': return '\\0';
            case '\b': return '\\b';
            case '\f': return '\\f';
            case '\n': return '\\n';
            case '\r': return '\\r';
            case '\t': return '\\t';
            case '\v': return '\\v';
            default: {
                var HexCode = Match.charCodeAt(0).toString(16);
                return '\\x' + '00'.slice(HexCode.length) + HexCode;
            }
        }
    });
}
/**** quoted ****/
function quoted(Text, Quote) {
    if (Quote === void 0) { Quote = '"'; }
    return Quote + quotable(Text, Quote) + Quote;
}
/**** HTMLsafe ****/
function HTMLsafe(Argument, EOLReplacement) {
    EOLReplacement = (EOLReplacement || '').trim() || '<br/>';
    return Argument.replace(/[&<>"'\u0000-\u001F\u007F-\u009F\\]/g, function (Match) {
        switch (Match) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            case '\b': return '&#92;b';
            case '\f': return '&#92;f';
            case '\n': return EOLReplacement;
            case '\r': return '&#92;r';
            case '\t': return '&#92;t';
            case '\v': return '&#92;v';
            case '\\': return '&#92;';
            default:
                var Result = Match.charCodeAt(0).toString(16);
                return '&#x0000'.substring(3, 7 - Result.length) + Result + ';';
        }
    });
}
/**** MarkDownSafe ****/
function MarkDownSafe(Argument, EOLReplacement) {
    return HTMLsafe(Argument, EOLReplacement).replace(/:/g, '&#58;');
}
/**** ValuesDiffer ****/
function ValuesDiffer(thisValue, otherValue) {
    if (thisValue === otherValue) {
        return false;
    }
    var thisType = typeof thisValue;
    if (thisType !== typeof otherValue) {
        return true;
    }
    /**** ArraysDiffer ****/
    function ArraysDiffer(thisArray, otherArray) {
        if (!Array.isArray(otherArray)) {
            return true;
        }
        if (thisArray.length !== otherArray.length) {
            return true;
        }
        for (var i = 0, l = thisArray.length; i < l; i++) {
            if (ValuesDiffer(thisArray[i], otherArray[i])) {
                return true;
            }
        }
        return false;
    }
    /**** ObjectsDiffer ****/
    function ObjectsDiffer(thisObject, otherObject) {
        if (Object.getPrototypeOf(thisObject) !== Object.getPrototypeOf(otherObject)) {
            return true;
        }
        for (var key in thisObject) {
            if (!(key in otherObject)) {
                return true;
            }
        }
        for (var key in otherObject) {
            if (!(key in thisObject)) {
                return true;
            }
            if (ValuesDiffer(thisObject[key], otherObject[key])) {
                return true;
            }
        }
        return false;
    }
    switch (thisType) {
        case 'undefined':
        case 'boolean':
        case 'string':
        case 'function': return true; // most primitives are compared using "==="
        case 'number': return ((isNaN(thisValue) !== isNaN(otherValue)) ||
            (Math.abs(thisValue - otherValue) > Number.EPSILON));
        case 'object':
            if (thisValue == null) {
                return true;
            } // since "other_value" != null!
            if (otherValue == null) {
                return true;
            } // since "this_value" != null!
            if (Array.isArray(thisValue)) {
                return ArraysDiffer(thisValue, otherValue);
            }
            return ObjectsDiffer(thisValue, otherValue);
        default: return true; // unsupported property type
    }
    return true;
}
/**** ValuesAreEqual ****/
function ValuesAreEqual(thisValue, otherValue) {
    return !ValuesDiffer(thisValue, otherValue);
}
/**** ObjectIsEmpty ****/
function ObjectIsEmpty(Candidate) {
    expectObject('candidate', Candidate);
    for (var Key in Candidate) {
        if (Object_hasOwnProperty(Candidate, Key)) {
            return false;
        }
    }
    return true;
}
/**** ObjectIsNotEmpty ****/
function ObjectIsNotEmpty(Candidate) {
    return !ObjectIsEmpty(Candidate);
}
/**** StringIsEmpty ****/
function StringIsEmpty(Candidate) {
    return /^\s*$/.test(Candidate);
}
/**** StringIsNotEmpty ****/
function StringIsNotEmpty(Candidate) {
    return !StringIsEmpty(Candidate);
}
/**** constrained ****/
function constrained(Value, Minimum, Maximum) {
    if (Minimum === void 0) { Minimum = -Infinity; }
    if (Maximum === void 0) { Maximum = Infinity; }
    return Math.max(Minimum, Math.min(Value, Maximum));
}
//------------------------------------------------------------------------------
//--                             Color Utilities                              --
//------------------------------------------------------------------------------
// built-in color names (see http://www.w3.org/TR/SVG/types.html#ColorKeywords) ----
var ColorSet = {
    transparent: 'rgba(0,0,0,0,0.0)',
    aliceblue: 'rgba(240,248,255,1.0)', lightpink: 'rgba(255,182,193,1.0)',
    antiquewhite: 'rgba(250,235,215,1.0)', lightsalmon: 'rgba(255,160,122,1.0)',
    aqua: 'rgba(0,255,255,1.0)', lightseagreen: 'rgba(32,178,170,1.0)',
    aquamarine: 'rgba(127,255,212,1.0)', lightskyblue: 'rgba(135,206,250,1.0)',
    azure: 'rgba(240,255,255,1.0)', lightslategray: 'rgba(119,136,153,1.0)',
    beige: 'rgba(245,245,220,1.0)', lightslategrey: 'rgba(119,136,153,1.0)',
    bisque: 'rgba(255,228,196,1.0)', lightsteelblue: 'rgba(176,196,222,1.0)',
    black: 'rgba(0,0,0,1.0)', lightyellow: 'rgba(255,255,224,1.0)',
    blanchedalmond: 'rgba(255,235,205,1.0)', lime: 'rgba(0,255,0,1.0)',
    blue: 'rgba(0,0,255,1.0)', limegreen: 'rgba(50,205,50,1.0)',
    blueviolet: 'rgba(138,43,226,1.0)', linen: 'rgba(250,240,230,1.0)',
    brown: 'rgba(165,42,42,1.0)', magenta: 'rgba(255,0,255,1.0)',
    burlywood: 'rgba(222,184,135,1.0)', maroon: 'rgba(128,0,0,1.0)',
    cadetblue: 'rgba(95,158,160,1.0)', mediumaquamarine: 'rgba(102,205,170,1.0)',
    chartreuse: 'rgba(127,255,0,1.0)', mediumblue: 'rgba(0,0,205,1.0)',
    chocolate: 'rgba(210,105,30,1.0)', mediumorchid: 'rgba(186,85,211,1.0)',
    coral: 'rgba(255,127,80,1.0)', mediumpurple: 'rgba(147,112,219,1.0)',
    cornflowerblue: 'rgba(100,149,237,1.0)', mediumseagreen: 'rgba(60,179,113,1.0)',
    cornsilk: 'rgba(255,248,220,1.0)', mediumslateblue: 'rgba(123,104,238,1.0)',
    crimson: 'rgba(220,20,60,1.0)', mediumspringgreen: 'rgba(0,250,154,1.0)',
    cyan: 'rgba(0,255,255,1.0)', mediumturquoise: 'rgba(72,209,204,1.0)',
    darkblue: 'rgba(0,0,139,1.0)', mediumvioletred: 'rgba(199,21,133,1.0)',
    darkcyan: 'rgba(0,139,139,1.0)', midnightblue: 'rgba(25,25,112,1.0)',
    darkgoldenrod: 'rgba(184,134,11,1.0)', mintcream: 'rgba(245,255,250,1.0)',
    darkgray: 'rgba(169,169,169,1.0)', mistyrose: 'rgba(255,228,225,1.0)',
    darkgreen: 'rgba(0,100,0,1.0)', moccasin: 'rgba(255,228,181,1.0)',
    darkgrey: 'rgba(169,169,169,1.0)', navajowhite: 'rgba(255,222,173,1.0)',
    darkkhaki: 'rgba(189,183,107,1.0)', navy: 'rgba(0,0,128,1.0)',
    darkmagenta: 'rgba(139,0,139,1.0)', oldlace: 'rgba(253,245,230,1.0)',
    darkolivegreen: 'rgba(85,107,47,1.0)', olive: 'rgba(128,128,0,1.0)',
    darkorange: 'rgba(255,140,0,1.0)', olivedrab: 'rgba(107,142,35,1.0)',
    darkorchid: 'rgba(153,50,204,1.0)', orange: 'rgba(255,165,0,1.0)',
    darkred: 'rgba(139,0,0,1.0)', orangered: 'rgba(255,69,0,1.0)',
    darksalmon: 'rgba(233,150,122,1.0)', orchid: 'rgba(218,112,214,1.0)',
    darkseagreen: 'rgba(143,188,143,1.0)', palegoldenrod: 'rgba(238,232,170,1.0)',
    darkslateblue: 'rgba(72,61,139,1.0)', palegreen: 'rgba(152,251,152,1.0)',
    darkslategray: 'rgba(47,79,79,1.0)', paleturquoise: 'rgba(175,238,238,1.0)',
    darkslategrey: 'rgba(47,79,79,1.0)', palevioletred: 'rgba(219,112,147,1.0)',
    darkturquoise: 'rgba(0,206,209,1.0)', papayawhip: 'rgba(255,239,213,1.0)',
    darkviolet: 'rgba(148,0,211,1.0)', peachpuff: 'rgba(255,218,185,1.0)',
    deeppink: 'rgba(255,20,147,1.0)', peru: 'rgba(205,133,63,1.0)',
    deepskyblue: 'rgba(0,191,255,1.0)', pink: 'rgba(255,192,203,1.0)',
    dimgray: 'rgba(105,105,105,1.0)', plum: 'rgba(221,160,221,1.0)',
    dimgrey: 'rgba(105,105,105,1.0)', powderblue: 'rgba(176,224,230,1.0)',
    dodgerblue: 'rgba(30,144,255,1.0)', purple: 'rgba(128,0,128,1.0)',
    firebrick: 'rgba(178,34,34,1.0)', red: 'rgba(255,0,0,1.0)',
    floralwhite: 'rgba(255,250,240,1.0)', rosybrown: 'rgba(188,143,143,1.0)',
    forestgreen: 'rgba(34,139,34,1.0)', royalblue: 'rgba(65,105,225,1.0)',
    fuchsia: 'rgba(255,0,255,1.0)', saddlebrown: 'rgba(139,69,19,1.0)',
    gainsboro: 'rgba(220,220,220,1.0)', salmon: 'rgba(250,128,114,1.0)',
    ghostwhite: 'rgba(248,248,255,1.0)', sandybrown: 'rgba(244,164,96,1.0)',
    gold: 'rgba(255,215,0,1.0)', seagreen: 'rgba(46,139,87,1.0)',
    goldenrod: 'rgba(218,165,32,1.0)', seashell: 'rgba(255,245,238,1.0)',
    gray: 'rgba(128,128,128,1.0)', sienna: 'rgba(160,82,45,1.0)',
    green: 'rgba(0,128,0,1.0)', silver: 'rgba(192,192,192,1.0)',
    greenyellow: 'rgba(173,255,47,1.0)', skyblue: 'rgba(135,206,235,1.0)',
    grey: 'rgba(128,128,128,1.0)', slateblue: 'rgba(106,90,205,1.0)',
    honeydew: 'rgba(240,255,240,1.0)', slategray: 'rgba(112,128,144,1.0)',
    hotpink: 'rgba(255,105,180,1.0)', slategrey: 'rgba(112,128,144,1.0)',
    indianred: 'rgba(205,92,92,1.0)', snow: 'rgba(255,250,250,1.0)',
    indigo: 'rgba(75,0,130,1.0)', springgreen: 'rgba(0,255,127,1.0)',
    ivory: 'rgba(255,255,240,1.0)', steelblue: 'rgba(70,130,180,1.0)',
    khaki: 'rgba(240,230,140,1.0)', tan: 'rgba(210,180,140,1.0)',
    lavender: 'rgba(230,230,250,1.0)', teal: 'rgba(0,128,128,1.0)',
    lavenderblush: 'rgba(255,240,245,1.0)', thistle: 'rgba(216,191,216,1.0)',
    lawngreen: 'rgba(124,252,0,1.0)', tomato: 'rgba(255,99,71,1.0)',
    lemonchiffon: 'rgba(255,250,205,1.0)', turquoise: 'rgba(64,224,208,1.0)',
    lightblue: 'rgba(173,216,230,1.0)', violet: 'rgba(238,130,238,1.0)',
    lightcoral: 'rgba(240,128,128,1.0)', wheat: 'rgba(245,222,179,1.0)',
    lightcyan: 'rgba(224,255,255,1.0)', white: 'rgba(255,255,255,1.0)',
    lightgoldenrodyellow: 'rgba(250,250,210,1.0)', whitesmoke: 'rgba(245,245,245,1.0)',
    lightgray: 'rgba(211,211,211,1.0)', yellow: 'rgba(255,255,0,1.0)',
    lightgreen: 'rgba(144,238,144,1.0)', yellowgreen: 'rgba(154,205,50,1.0)',
    lightgrey: 'rgba(211,211,211,1.0)',
};
/**** HexColor - converts a given color to #rrggbbaa ****/
function HexColor(Color) {
    var lowerColor = Color.toLowerCase();
    if (ColorSet.hasOwnProperty(lowerColor)) {
        // @ts-ignore TS dislikes indexing with literal keys
        Color = ColorSet[lowerColor];
    } // do not return here as color is now in RGBA format
    if (/^#[a-fA-F0-9]{6}$/.test(Color)) {
        return Color + 'FF';
    }
    if (/^#[a-fA-F0-9]{8}$/.test(Color)) {
        return Color;
    }
    var HexDigit = '0123456789ABCDEF';
    function dec2hex(Value) {
        if (Value > 255) {
            Value = 255;
        }
        return HexDigit[Math.trunc(Value / 16)] + HexDigit[Value % 16];
    }
    var RGBPattern = /^rgb\(([0-9]+),\s*([0-9]+),\s*([0-9]+)\)$/i; // not perfect
    var Match = RGBPattern.exec(Color);
    if (Match != null) {
        return ('#' +
            dec2hex(parseInt(Match[1], 10)) +
            dec2hex(parseInt(Match[2], 10)) +
            dec2hex(parseInt(Match[3], 10)) + 'FF');
    }
    var RGBAPattern = /^rgba\(([(0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([01]?[.][0-9]+|[01])\)$/i; // not perfect
    Match = RGBAPattern.exec(Color);
    if (Match != null) {
        return ('#' +
            dec2hex(parseInt(Match[1], 10)) +
            dec2hex(parseInt(Match[2], 10)) +
            dec2hex(parseInt(Match[3], 10)) +
            dec2hex(parseFloat(Match[4])));
    }
    throwError('InvalidArgument: the given Value is not a valid CSS Color specification');
}
/**** RGBAColor - converts a given color to RGBA(r,g,b,a) ****/
function RGBAColor(Color) {
    var lowerColor = Color.toLowerCase();
    if (ColorSet.hasOwnProperty(lowerColor)) {
        // @ts-ignore TS dislikes indexing with literal keys
        return ColorSet[lowerColor]; // color is already in RGBA format
    }
    if (/^#[a-fA-F0-9]{6}$/.test(Color)) {
        return ('rgba(' +
            parseInt(Color.slice(1, 3), 16) + ',' +
            parseInt(Color.slice(3, 5), 16) + ',' +
            parseInt(Color.slice(5, 7), 16) + ', 1' +
            ')');
    }
    if (/^#[a-fA-F0-9]{8}$/.test(Color)) {
        return ('rgba(' +
            parseInt(Color.slice(1, 3), 16) + ',' +
            parseInt(Color.slice(3, 5), 16) + ',' +
            parseInt(Color.slice(5, 7), 16) + ',' +
            (parseInt(Color.slice(7), 16) / 255) +
            ')');
    }
    var RGBPattern = /^rgb\(([0-9]+),\s*([0-9]+),\s*([0-9]+)\)$/i; //not perfect
    var Match = RGBPattern.exec(Color);
    if (Match != null) {
        return Color.slice(0, Color.length - 1) + ',1)';
    }
    var RGBAPattern = /^rgba\(([(0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([0]?[.][0-9]+|[01])\)$/i; // not perfect
    Match = RGBAPattern.exec(Color);
    if (Match != null) {
        return Color;
    }
    throwError('InvalidArgument: the given Value is not a valid CSS Color specification');
}
/**** shortHexColor - converts a given color into #RRGGBB ****/
function shortHexColor(Color) {
    return HexColor(Color).slice(0, 7);
}

var JIL = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ColorSet: ColorSet,
    FunctionWithName: FunctionWithName,
    HTMLsafe: HTMLsafe,
    HexColor: HexColor,
    MarkDownSafe: MarkDownSafe,
    ObjectIsEmpty: ObjectIsEmpty,
    ObjectIsNotEmpty: ObjectIsNotEmpty,
    ObjectMergedWith: ObjectMergedWith,
    Object_hasOwnProperty: Object_hasOwnProperty,
    Object_isPrototypeOf: Object_isPrototypeOf,
    Object_propertyIsEnumerable: Object_propertyIsEnumerable,
    Object_toLocaleString: Object_toLocaleString,
    Object_toString: Object_toString,
    Object_valueOf: Object_valueOf,
    RGBAColor: RGBAColor,
    StringIsEmpty: StringIsEmpty,
    StringIsNotEmpty: StringIsNotEmpty,
    ValidatorForClassifier: ValidatorForClassifier,
    ValueExists: ValueExists,
    ValueInheritsFrom: ValueInheritsFrom,
    ValueIsAnonymousFunction: ValueIsAnonymousFunction,
    ValueIsArray: ValueIsArray,
    ValueIsBoolean: ValueIsBoolean,
    ValueIsCardinal: ValueIsCardinal,
    ValueIsColor: ValueIsColor,
    ValueIsDate: ValueIsDate,
    ValueIsEMailAddress: ValueIsEMailAddress,
    ValueIsEmptyString: ValueIsEmptyString,
    ValueIsError: ValueIsError,
    ValueIsFiniteNumber: ValueIsFiniteNumber,
    ValueIsFunction: ValueIsFunction,
    ValueIsInstanceOf: ValueIsInstanceOf,
    ValueIsInteger: ValueIsInteger,
    ValueIsIntegerInRange: ValueIsIntegerInRange,
    ValueIsList: ValueIsList,
    ValueIsListSatisfying: ValueIsListSatisfying,
    ValueIsMissing: ValueIsMissing,
    ValueIsNaN: ValueIsNaN,
    ValueIsNamedFunction: ValueIsNamedFunction,
    ValueIsNativeFunction: ValueIsNativeFunction,
    ValueIsNonEmptyString: ValueIsNonEmptyString,
    ValueIsNumber: ValueIsNumber,
    ValueIsNumberInRange: ValueIsNumberInRange,
    ValueIsObject: ValueIsObject,
    ValueIsOneOf: ValueIsOneOf,
    ValueIsOrdinal: ValueIsOrdinal,
    ValueIsPlainObject: ValueIsPlainObject,
    ValueIsPromise: ValueIsPromise,
    ValueIsRegExp: ValueIsRegExp,
    ValueIsScriptedFunction: ValueIsScriptedFunction,
    ValueIsString: ValueIsString,
    ValueIsStringMatching: ValueIsStringMatching,
    ValueIsText: ValueIsText,
    ValueIsTextline: ValueIsTextline,
    ValueIsURL: ValueIsURL,
    ValueIsVanillaObject: ValueIsVanillaObject,
    ValuesAreEqual: ValuesAreEqual,
    ValuesDiffer: ValuesDiffer,
    acceptNil: acceptNil,
    allowAnonymousFunction: allowAnonymousFunction,
    allowArray: allowArray,
    allowBoolean: allowBoolean,
    allowCardinal: allowCardinal,
    allowColor: allowColor,
    allowDate: allowDate,
    allowEMailAddress: allowEMailAddress,
    allowError: allowError,
    allowFiniteNumber: allowFiniteNumber,
    allowFunction: allowFunction,
    allowInstanceOf: allowInstanceOf,
    allowInteger: allowInteger,
    allowIntegerInRange: allowIntegerInRange,
    allowList: allowList,
    allowListSatisfying: allowListSatisfying,
    allowNaN: allowNaN,
    allowNamedFunction: allowNamedFunction,
    allowNativeFunction: allowNativeFunction,
    allowNonEmptyString: allowNonEmptyString,
    allowNumber: allowNumber,
    allowNumberInRange: allowNumberInRange,
    allowObject: allowObject,
    allowOneOf: allowOneOf,
    allowOrdinal: allowOrdinal,
    allowPlainObject: allowPlainObject,
    allowPromise: allowPromise,
    allowRegExp: allowRegExp,
    allowScriptedFunction: allowScriptedFunction,
    allowString: allowString,
    allowStringMatching: allowStringMatching,
    allowText: allowText,
    allowTextline: allowTextline,
    allowURL: allowURL,
    allowValueInheritingFrom: allowValueInheritingFrom,
    allowVanillaObject: allowVanillaObject,
    allowedAnonymousFunction: allowedAnonymousFunction,
    allowedArray: allowedArray,
    allowedBoolean: allowedBoolean,
    allowedCardinal: allowedCardinal,
    allowedColor: allowedColor,
    allowedDate: allowedDate,
    allowedEMailAddress: allowedEMailAddress,
    allowedError: allowedError,
    allowedFiniteNumber: allowedFiniteNumber,
    allowedFunction: allowedFunction,
    allowedInstanceOf: allowedInstanceOf,
    allowedInteger: allowedInteger,
    allowedIntegerInRange: allowedIntegerInRange,
    allowedList: allowedList,
    allowedListSatisfying: allowedListSatisfying,
    allowedNaN: allowedNaN,
    allowedNamedFunction: allowedNamedFunction,
    allowedNativeFunction: allowedNativeFunction,
    allowedNonEmptyString: allowedNonEmptyString,
    allowedNumber: allowedNumber,
    allowedNumberInRange: allowedNumberInRange,
    allowedObject: allowedObject,
    allowedOneOf: allowedOneOf,
    allowedOrdinal: allowedOrdinal,
    allowedPlainObject: allowedPlainObject,
    allowedPromise: allowedPromise,
    allowedRegExp: allowedRegExp,
    allowedScriptedFunction: allowedScriptedFunction,
    allowedString: allowedString,
    allowedStringMatching: allowedStringMatching,
    allowedText: allowedText,
    allowedTextline: allowedTextline,
    allowedURL: allowedURL,
    allowedValueInheritingFrom: allowedValueInheritingFrom,
    allowedVanillaObject: allowedVanillaObject,
    constrained: constrained,
    escaped: escaped,
    expectAnonymousFunction: expectAnonymousFunction,
    expectArray: expectArray,
    expectBoolean: expectBoolean,
    expectCardinal: expectCardinal,
    expectColor: expectColor,
    expectDate: expectDate,
    expectEMailAddress: expectEMailAddress,
    expectError: expectError,
    expectFiniteNumber: expectFiniteNumber,
    expectFunction: expectFunction,
    expectInstanceOf: expectInstanceOf,
    expectInteger: expectInteger,
    expectIntegerInRange: expectIntegerInRange,
    expectList: expectList,
    expectListSatisfying: expectListSatisfying,
    expectNaN: expectNaN,
    expectNamedFunction: expectNamedFunction,
    expectNativeFunction: expectNativeFunction,
    expectNonEmptyString: expectNonEmptyString,
    expectNumber: expectNumber,
    expectNumberInRange: expectNumberInRange,
    expectObject: expectObject,
    expectOneOf: expectOneOf,
    expectOrdinal: expectOrdinal,
    expectPlainObject: expectPlainObject,
    expectPromise: expectPromise,
    expectRegExp: expectRegExp,
    expectScriptedFunction: expectScriptedFunction,
    expectString: expectString,
    expectStringMatching: expectStringMatching,
    expectText: expectText,
    expectTextline: expectTextline,
    expectURL: expectURL,
    expectValue: expectValue,
    expectValueInheritingFrom: expectValueInheritingFrom,
    expectVanillaObject: expectVanillaObject,
    expectedAnonymousFunction: expectedAnonymousFunction,
    expectedArray: expectedArray,
    expectedBoolean: expectedBoolean,
    expectedCardinal: expectedCardinal,
    expectedColor: expectedColor,
    expectedDate: expectedDate,
    expectedEMailAddress: expectedEMailAddress,
    expectedError: expectedError,
    expectedFiniteNumber: expectedFiniteNumber,
    expectedFunction: expectedFunction,
    expectedInstanceOf: expectedInstanceOf,
    expectedInteger: expectedInteger,
    expectedIntegerInRange: expectedIntegerInRange,
    expectedList: expectedList,
    expectedListSatisfying: expectedListSatisfying,
    expectedNaN: expectedNaN,
    expectedNamedFunction: expectedNamedFunction,
    expectedNativeFunction: expectedNativeFunction,
    expectedNonEmptyString: expectedNonEmptyString,
    expectedNumber: expectedNumber,
    expectedNumberInRange: expectedNumberInRange,
    expectedObject: expectedObject,
    expectedOneOf: expectedOneOf,
    expectedOrdinal: expectedOrdinal,
    expectedPlainObject: expectedPlainObject,
    expectedPromise: expectedPromise,
    expectedRegExp: expectedRegExp,
    expectedScriptedFunction: expectedScriptedFunction,
    expectedString: expectedString,
    expectedStringMatching: expectedStringMatching,
    expectedText: expectedText,
    expectedTextline: expectedTextline,
    expectedURL: expectedURL,
    expectedValue: expectedValue,
    expectedValueInheritingFrom: expectedValueInheritingFrom,
    expectedVanillaObject: expectedVanillaObject,
    global: global$1,
    quotable: quotable,
    quoted: quoted,
    rejectNil: rejectNil,
    shortHexColor: shortHexColor,
    throwError: throwError,
    unescaped: unescaped,
    validatedArgument: validatedArgument
});

/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/
var WAT;
(function (WAT) {
    WAT.Version = '0.1.0';
    WAT.WAT_Categories = ['Applet', 'Card', 'Overlay', 'Control', 'Compound'];
    WAT.WAT_horizontalAnchorings = ['left-width', 'left-right', 'width-right'];
    WAT.WAT_verticalAnchorings = ['top-height', 'top-bottom', 'height-bottom'];
    /**** visual setting types ****/
    WAT.WAT_FontWeights = [
        'thin', 'extra-light', 'light', 'normal', 'medium', 'semi-bold',
        'bold', 'extra-bold', 'heavy', 'lighter', 'bolder'
    ];
    var WAT_FontWeightValues = Object.assign(Object.create(null), {
        'thin': 100, 'extra-light': 200, 'light': 300, 'normal': 400, 'medium': 500,
        'semi-bold': 600, 'bold': 700, 'extra-bold': 800, 'heavy': 900
    });
    WAT.WAT_FontStyles = ['normal', 'italic'];
    WAT.WAT_TextDecorationLines = ['none', 'underline', 'overline', 'line-through'];
    WAT.WAT_TextDecorationStyles = ['solid', 'double', 'dotted', 'dashed', 'wavy'];
    WAT.WAT_TextAlignments = ['left', 'center', 'right', 'justify'];
    WAT.WAT_BackgroundModes = ['normal', 'contain', 'cover', 'fill', 'tile'];
    WAT.WAT_BorderStyles = [
        'none', 'dotted', 'dashed', 'solid', 'double',
        'groove', 'ridge', 'inset', 'outset'
    ];
    WAT.WAT_Cursors = [
        'alias', 'all-scroll', 'auto', 'cell', 'context-menu', 'col-resize', 'copy',
        'crosshair', 'default', 'e-resize', 'ew-resize', 'grab', 'grabbing', 'help',
        'move', 'n-resize', 'ne-resize', 'nesw-resize', 'ns-resize', 'nw-resize',
        'nwse-resize', 'no-drop', 'none', 'not-allowed', 'pointer', 'progress',
        'row-resize', 's-resize', 'se-resize', 'sw-resize', 'text', 'vertical-text',
        'w-resize', 'wait', 'zoom-in', 'zoom-out'
    ];
    WAT.WAT_Overflows = ['visible', 'hidden', 'scroll', 'auto'];
    WAT.WAT_TextOverflows = ['clip', 'ellipsis'];
    /**** re-export contents of javascript-interface-library ****/
    for (var Key in JIL) {
        // @ts-ignore don't worry about typing
        if (Object.prototype.hasOwnProperty.call(JIL, Key)) {
            WAT[Key] = JIL[Key];
        }
    }
    /**** ValueIsElement ****/
    function ValueIsElement(Value) {
        return (Value instanceof HTMLElement);
    }
    WAT.ValueIsElement = ValueIsElement;
    /**** allow/expect[ed]Element ****/
    WAT.allowElement = ValidatorForClassifier(ValueIsElement, acceptNil, 'DOM element'), WAT.allowedElement = WAT.allowElement;
    WAT.expectElement = ValidatorForClassifier(ValueIsElement, rejectNil, 'DOM element'), WAT.expectedElement = WAT.expectElement;
    /**** ValueIsVisual ****/
    function ValueIsVisual(Value) {
        return (Value instanceof WAT_Visual);
    }
    WAT.ValueIsVisual = ValueIsVisual;
    /**** allow/expect[ed]Visual ****/
    WAT.allowVisual = ValidatorForClassifier(ValueIsVisual, acceptNil, 'WAT visual'), WAT.allowedVisual = WAT.allowVisual;
    WAT.expectVisual = ValidatorForClassifier(ValueIsVisual, rejectNil, 'WAT visual'), WAT.expectedVisual = WAT.expectVisual;
    /**** ValueIsApplet ****/
    function ValueIsApplet(Value) {
        return (Value instanceof WAT_Applet);
    }
    WAT.ValueIsApplet = ValueIsApplet;
    /**** allow/expect[ed]Applet ****/
    WAT.allowApplet = ValidatorForClassifier(ValueIsApplet, acceptNil, 'WAT applet'), WAT.allowedApplet = WAT.allowApplet;
    WAT.expectApplet = ValidatorForClassifier(ValueIsApplet, rejectNil, 'WAT applet'), WAT.expectedApplet = WAT.expectApplet;
    /**** ValueIsCard ****/
    function ValueIsCard(Value) {
        return (Value instanceof WAT_Card);
    }
    WAT.ValueIsCard = ValueIsCard;
    /**** allow/expect[ed]Card ****/
    WAT.allowCard = ValidatorForClassifier(ValueIsCard, acceptNil, 'WAT card'), WAT.allowedCard = WAT.allowCard;
    WAT.expectCard = ValidatorForClassifier(ValueIsCard, rejectNil, 'WAT card'), WAT.expectedCard = WAT.expectCard;
    /**** ValueIsOverlay ****/
    function ValueIsOverlay(Value) {
        return (Value instanceof WAT_Overlay);
    }
    WAT.ValueIsOverlay = ValueIsOverlay;
    /**** allow/expect[ed]Overlay ****/
    WAT.allowOverlay = ValidatorForClassifier(ValueIsOverlay, acceptNil, 'WAT overlay'), WAT.allowedOverlay = WAT.allowOverlay;
    WAT.expectOverlay = ValidatorForClassifier(ValueIsOverlay, rejectNil, 'WAT overlay'), WAT.expectedOverlay = WAT.expectOverlay;
    /**** ValueIsControl ****/
    function ValueIsControl(Value) {
        return (Value instanceof WAT_Control);
    }
    WAT.ValueIsControl = ValueIsControl;
    /**** allow/expect[ed]Control ****/
    WAT.allowControl = ValidatorForClassifier(ValueIsControl, acceptNil, 'WAT control'), WAT.allowedControl = WAT.allowControl;
    WAT.expectControl = ValidatorForClassifier(ValueIsControl, rejectNil, 'WAT control'), WAT.expectedControl = WAT.expectControl;
    /**** ValueIsCompound ****/
    function ValueIsCompound(Value) {
        return (Value instanceof WAT_Compound);
    }
    WAT.ValueIsCompound = ValueIsCompound;
    /**** allow/expect[ed]Compound ****/
    WAT.allowCompound = ValidatorForClassifier(ValueIsCompound, acceptNil, 'WAT compound'), WAT.allowedCompound = WAT.allowCompound;
    WAT.expectCompound = ValidatorForClassifier(ValueIsCompound, rejectNil, 'WAT compound'), WAT.expectedCompound = WAT.expectCompound;
    /**** ValueIsComponent ****/
    function ValueIsComponent(Value) {
        return (Value instanceof WAT_Control) || (Value instanceof WAT_Compound);
    }
    WAT.ValueIsComponent = ValueIsComponent;
    /**** allow/expect[ed]Component ****/
    WAT.allowComponent = ValidatorForClassifier(ValueIsComponent, acceptNil, 'WAT component'), WAT.allowedComponent = WAT.allowComponent;
    WAT.expectComponent = ValidatorForClassifier(ValueIsComponent, rejectNil, 'WAT component'), WAT.expectedComponent = WAT.expectComponent;
    /**** ValueIsContainer ****/
    function ValueIsContainer(Value) {
        return (Value instanceof WAT_Container);
    }
    WAT.ValueIsContainer = ValueIsContainer;
    /**** allow/expect[ed]Container ****/
    WAT.allowContainer = ValidatorForClassifier(ValueIsContainer, acceptNil, 'WAT container'), WAT.allowedContainer = WAT.allowContainer;
    WAT.expectContainer = ValidatorForClassifier(ValueIsContainer, rejectNil, 'WAT container'), WAT.expectedContainer = WAT.expectContainer;
    /**** ValueIsUniqueId ****/
    var uniqueIdPattern = /^wat-[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
    function ValueIsUniqueId(Value) {
        return (ValueIsString(Value) && uniqueIdPattern.test(Value));
    }
    WAT.ValueIsUniqueId = ValueIsUniqueId;
    /**** allow/expect[ed]UniqueId ****/
    WAT.allowUniqueId = ValidatorForClassifier(ValueIsUniqueId, acceptNil, 'unique WAT id'), WAT.allowedUniqueId = WAT.allowUniqueId;
    WAT.expectUniqueId = ValidatorForClassifier(ValueIsUniqueId, rejectNil, 'unique WAT id'), WAT.expectedUniqueId = WAT.expectUniqueId;
    var WAT_IdPattern = /^[a-z][-_a-z.0-9]*$/i;
    // see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
    function ValueIsId(Value) {
        return ValueIsStringMatching(Value, WAT_IdPattern);
    }
    WAT.ValueIsId = ValueIsId;
    /**** allow/expect[ed]Id ****/
    WAT.allowId = ValidatorForClassifier(ValueIsId, acceptNil, 'WAT HTML id'), WAT.allowedId = WAT.allowId;
    WAT.expectId = ValidatorForClassifier(ValueIsId, rejectNil, 'WAT HTML id'), WAT.expectedId = WAT.expectId;
    var WAT_NamePattern = /^[a-z$_][a-z$_0-9]*(-[a-z$_][a-z$_0-9]*)*$/i;
    function ValueIsName(Value) {
        return ValueIsStringMatching(Value, WAT_NamePattern);
    }
    WAT.ValueIsName = ValueIsName;
    /**** allow/expect[ed]Name ****/
    WAT.allowName = ValidatorForClassifier(ValueIsName, acceptNil, 'WAT name'), WAT.allowedName = WAT.allowName;
    WAT.expectName = ValidatorForClassifier(ValueIsName, rejectNil, 'WAT name'), WAT.expectedName = WAT.expectName;
    /**** ValueIsUniversalName ****/
    var WAT_UniversalNamePattern = /^#?[a-z$_][a-z$_0-9]*(-[a-z$_][a-z$_0-9]*)*$/i;
    function ValueIsUniversalName(Value) {
        return ValueIsStringMatching(Value, WAT_UniversalNamePattern);
    }
    WAT.ValueIsUniversalName = ValueIsUniversalName;
    /**** allow/expect[ed]UniversalName ****/
    WAT.allowUniversalName = ValidatorForClassifier(ValueIsUniversalName, acceptNil, 'WAT name'), WAT.allowedUniversalName = WAT.allowUniversalName;
    WAT.expectUniversalName = ValidatorForClassifier(ValueIsUniversalName, rejectNil, 'WAT name'), WAT.expectedUniversalName = WAT.expectUniversalName;
    function ValueIsLabel(Value) {
        return ValueIsTextline(Value);
    }
    WAT.ValueIsLabel = ValueIsLabel;
    /**** allow/expect[ed]Label ****/
    WAT.allowLabel = ValidatorForClassifier(ValueIsLabel, acceptNil, 'WAT visual label'), WAT.allowedLabel = WAT.allowLabel;
    WAT.expectLabel = ValidatorForClassifier(ValueIsLabel, rejectNil, 'WAT visual label'), WAT.expectedLabel = WAT.expectLabel;
    var IdentifierPattern = /^[a-z$_][a-z$_0-9]*$/i;
    function ValueIsIdentifier(Value) {
        return ValueIsStringMatching(Value, IdentifierPattern);
    }
    WAT.ValueIsIdentifier = ValueIsIdentifier;
    /**** allow/expect[ed]Identifier ****/
    WAT.allowIdentifier = ValidatorForClassifier(ValueIsIdentifier, acceptNil, 'WAT identifier'), WAT.allowedIdentifier = WAT.allowIdentifier;
    WAT.expectIdentifier = ValidatorForClassifier(ValueIsIdentifier, rejectNil, 'WAT identifier'), WAT.expectedIdentifier = WAT.expectIdentifier;
    /**** ValueIsLocation ****/
    function ValueIsLocation(Value) {
        return ValueIsNumberInRange(Value, 0, Infinity, true, false);
    }
    WAT.ValueIsLocation = ValueIsLocation;
    /**** allow/expect[ed]Location ****/
    WAT.allowLocation = ValidatorForClassifier(ValueIsLocation, acceptNil, 'coordinate'), WAT.allowedLocation = WAT.allowLocation;
    WAT.expectLocation = ValidatorForClassifier(ValueIsLocation, rejectNil, 'coordinate'), WAT.expectedLocation = WAT.expectLocation;
    /**** ValueIsDimension ****/
    function ValueIsDimension(Value) {
        return ValueIsFiniteNumber(Value) && (Value >= 0);
    }
    WAT.ValueIsDimension = ValueIsDimension;
    /**** allow/expect[ed]Dimension ****/
    WAT.allowDimension = ValidatorForClassifier(ValueIsDimension, acceptNil, 'extent'), WAT.allowedDimension = WAT.allowDimension;
    WAT.expectDimension = ValidatorForClassifier(ValueIsDimension, rejectNil, 'extent'), WAT.expectedDimension = WAT.expectDimension;
    /**** ValueIsSemVer ****/
    var SemVerPattern = /^(0|[1-9]\d*)(?:[.](0|[1-9]\d*)(?:[.](0|[1-9]\d*)(-[-0-9A-Za-z.]+)?)?)?$/;
    // pattern is not perfect, see https://semver.org/
    function ValueIsSemVer(Value) {
        return ValueIsStringMatching(Value, SemVerPattern);
    }
    WAT.ValueIsSemVer = ValueIsSemVer;
    /**** allow/expect[ed]SemVer ****/
    WAT.allowSemVer = ValidatorForClassifier(ValueIsSemVer, acceptNil, 'version specification'), WAT.allowedSemVer = WAT.allowSemVer;
    WAT.expectSemVer = ValidatorForClassifier(ValueIsSemVer, rejectNil, 'version specification'), WAT.expectedSemVer = WAT.expectSemVer;
    /**** throwReadOnlyError ****/
    function throwReadOnlyError(Name) {
        throwError('ReadOnlyProperty: property ' + quoted(Name) + ' must not be set');
    }
    WAT.throwReadOnlyError = throwReadOnlyError;
    /**** throwWriteOnlyError ****/
    function throwWriteOnlyError(Name) {
        throwError('WriteOnlyProperty: property ' + quoted(Name) + ' must not be read');
    }
    WAT.throwWriteOnlyError = throwWriteOnlyError;
    /**** PropertyDescriptorFor ****/
    function PropertyDescriptorFor(Target, Property) {
        if (Target == null)
            throwError('InvalidArgument: the given target object is null or undefined');
        while (Target != null) {
            var Candidate = Object.getOwnPropertyDescriptor(Target, Property);
            if (Candidate != null) {
                return Candidate;
            }
            Target = Object.getPrototypeOf(Target);
        }
        return undefined;
    }
    WAT.PropertyDescriptorFor = PropertyDescriptorFor;
    function KeySetOf(KeyList) {
        var Result = Object.create(null);
        KeyList.forEach(function (Key) { return Result[Key] = Key; });
        return Result;
    }
    /**** camelized ****/
    function camelized(Original) {
        return Original.replace(/-([a-z])/gi, function (Match) { return Match[1].toUpperCase(); });
    }
    /**** pruned ****/
    function pruned(Original) {
        return Original.replace(/^\s+/, '').replace(/\s+$/, '').replace(/\s+/g, ' ');
    }
    function forEach(ElementList, Handler) {
        Array.prototype.forEach.call(ElementList, Handler);
    }
    function filtered(ElementList, Filter) {
        return (ValueIsString(Filter)
            ? Array.prototype.filter.call(ElementList, function (Candidate) { return Candidate.matches(Filter); })
            : Array.prototype.filter.call(ElementList, Filter));
    }
    /**** closestParent ****/
    function closestParent(DOMElement, Selector) {
        var outerElement = DOMElement.parentElement;
        if (outerElement == null) {
            return undefined;
        }
        return outerElement.closest(Selector);
    }
    /**** closestFilteredParent ****/
    function closestFilteredParent(DOMElement, Selector, Filter) {
        var outerElement = DOMElement.parentElement;
        if (outerElement == null) {
            return undefined;
        }
        outerElement = outerElement.closest(Selector);
        while (outerElement != null) {
            if (Filter(outerElement) == true) {
                return outerElement;
            }
            outerElement = outerElement.closest(Selector);
        }
        return undefined;
    }
    /**** attr ****/
    function attr(DOMElement, Name, Value) {
        if (arguments.length === 2) {
            return DOMElement.getAttribute(Name);
        }
        else {
            if (Value == null) {
                DOMElement.removeAttribute(Name);
            }
            else {
                DOMElement.setAttribute(Name, Value);
            }
        }
    }
    /**** css ****/
    function css(DOMElement, Name, Value) {
        if (arguments.length === 2) {
            // @ts-ignore we want to index literally!
            return window.getComputedStyle(DOMElement)[camelized(Name)];
        }
        else {
            // @ts-ignore we want to index literally!
            DOMElement.style[camelized(Name)] = Value;
        }
    }
    /**** html ****/
    function html(DOMElement, Value) {
        if (arguments.length === 1) {
            return DOMElement.innerHTML;
        }
        else {
            DOMElement.innerHTML = Value;
        }
    }
    /**** data ****/
    function data(DOMElement, Name, Value) {
        if (arguments.length === 2) {
            return DOMElement.dataset[camelized(Name)];
        }
        else {
            DOMElement.dataset[camelized(Name)] = Value;
        }
    }
    var EventHandlerRegistry = new WeakMap();
    function registerEventHandlerIn(Element, EventName, Selector, Handler, onceOnly) {
        var EventNames = pruned(EventName).split(' ');
        /**** construct actual event handler ****/
        var actualHandler = function EventHandler(DOMEvent) {
            try {
                if ((Selector != null) &&
                    !DOMEvent.target.matches(Selector)) {
                    return;
                }
                var Result = Handler(DOMEvent);
                if (Result === false) {
                    DOMEvent.stopPropagation();
                    DOMEvent.preventDefault();
                }
            }
            catch (Signal) {
                console.error('event handler failed with', Signal);
            }
            if (onceOnly) {
                off(DOMEvent.currentTarget, DOMEvent.type, Selector, Handler);
            }
        };
        /**** register and attach event handlers ****/
        var HandlerList = EventHandlerRegistry.get(Element);
        if (HandlerList == null) {
            EventHandlerRegistry.set(Element, HandlerList = []);
        }
        EventNames.forEach(function (EventName) {
            HandlerList.push({ EventName: EventName, Selector: Selector, actualHandler: actualHandler, Handler: Handler });
            Element.addEventListener(EventName, actualHandler, false);
        });
    }
    /**** on ****/
    function on(Element, EventName, Selector, Handler) {
        registerEventHandlerIn(Element, EventName, Selector, Handler, false);
    }
    /**** off ****/
    function off(Element, EventName, Selector, Handler) {
        var EventNames = undefined;
        if (EventName != null) {
            EventNames = pruned(EventName).split(' ');
        }
        /**** unregister and detach event handlers ****/
        var HandlerList = EventHandlerRegistry.get(Element);
        if (HandlerList == null) {
            return;
        }
        for (var i = HandlerList.length; i >= 0; i--) {
            var HandlerEntry = HandlerList[i];
            if (((EventNames == null) || (EventNames.indexOf(HandlerEntry.EventName) >= 0)) &&
                ((Selector == null) || (HandlerEntry.Selector === Selector)) &&
                ((Handler == null) || (HandlerEntry.Handler === Handler))) {
                Element.removeEventListener(HandlerEntry.EventName, HandlerEntry.actualHandler);
                HandlerList.splice(i, 1);
            }
        }
    }
    /**** remove ****/
    function remove(ElementOrList) {
        switch (true) {
            case ValueIsElement(ElementOrList):
                var outerElement = ElementOrList.parentElement;
                if (outerElement != null) {
                    outerElement.removeChild(ElementOrList);
                }
                break;
            case ValueIsArray(ElementOrList):
                ElementOrList.forEach(function (Element) { return remove(Element); });
                break;
            default:
                forEach(ElementOrList, function (Element) { return remove(Element); });
        }
    }
    /**** ElementFromHTML ****/
    function ElementFromHTML(HTML) {
        var auxElement = document.createElement('div');
        auxElement.innerHTML = HTML;
        return auxElement.firstChild;
    }
    function parseHTML(HTML, Callbacks) {
        var StartTagPattern = /^<([-a-z0-9_]+)((?:[\s\xA0]+[-a-z0-9_]+(?:[\s\xA0]*=[\s\xA0]*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s\xA0]+))?)*)[\s\xA0]*(\/?)>/i;
        var EndTagPattern = /^<\/([-a-z0-9_]+)[^>]*>/i;
        var AttributePattern = /([-a-z0-9]+)(?:[\s\xA0]*=[\s\xA0]*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s\xA0]+)))?/gi;
        /**** MapOf makes a "map" with keys from a given comma-separated key list ****/
        function MapOf(Elements) {
            var ElementList = Elements.split(',');
            var Result = Object.create(null);
            for (var i = 0, l = ElementList.length; i < l; i++) {
                Result[ElementList[i]] = true;
            }
            return Result;
        }
        /**** maps with the names of tags and attributes with a specific characteristic ****/
        var isEmptyElement = MapOf('area,base,basefont,br,col,embed,frame,hr,img,input,isIndex,keygen,link,' +
            'meta,param,source,track,wbr');
        var isBlockElement = MapOf('address,article,aside,audio,blockquote,canvas,center,dd,dir,div,dl,dt,' +
            'fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,' +
            'hgroup,hr,ins,isIndex,li,main,menu,nav,noframes,noscript,ol,output,p,pre,' +
            'section,table,tbody,td,tfoot,th,thead,tr,ul,video' +
            ',applet' // added for WAT
        );
        var isInlineElement = MapOf('a,abbr,acronym,Applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,' +
            'font,i,iframe,img,input,ins,kbd,label,map,Object,q,s,samp,Script,select,' +
            'small,span,strike,strong,sub,sup,textarea,tt,u,var');
        var isSelfClosingElement = MapOf('area,base,basefont,bgsound,br,col,colgroup,dd,dt,embed,frame,hr,img,' +
            'input,isIndex,keygen,li,link,menuitem,meta,options,p,param,source,td,' +
            'tfoot,th,thead,tr,track,wbr');
        var isSpecialElement = MapOf('script,style,svelte:options');
        var isKeywordAttribute = MapOf('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,' +
            'noshade,nowrap,readonly,selected');
        /**** actual HTML parser ****/
        var doNothing = function () { };
        var processStartTag = Callbacks.processStartTag || doNothing;
        var processEndTag = Callbacks.processEndTag || doNothing;
        var processText = Callbacks.processText || doNothing;
        var processComment = Callbacks.processComment || doNothing;
        // @ts-ignore "Stack.last" will be defined just one line later
        var Stack = []; // Stack with tag names of unclosed HTML elements
        Stack.last = function last() { return this[this.length - 1]; };
        function parseStartTag(_, TagName, rest, isUnary) {
            TagName = TagName.toLowerCase();
            if (isBlockElement[TagName]) { // close pending inline elements
                while ((Stack.last() != null) && isInlineElement[Stack.last()]) {
                    parseEndTag('', Stack.last());
                }
            }
            if (isSelfClosingElement[TagName] && (Stack.last() === TagName)) {
                parseEndTag('', TagName);
            }
            isUnary = isEmptyElement[TagName] || !!isUnary;
            if (!isUnary) {
                Stack.push(TagName);
            }
            if (processStartTag !== doNothing) {
                var Attributes_1 = [];
                rest.replace(AttributePattern, function (Match, AttributeName) {
                    var AttributeValue = (arguments[2] ? arguments[2] :
                        arguments[3] ? arguments[3] :
                            arguments[4] ? arguments[4] :
                                isKeywordAttribute[AttributeName] ? AttributeName : '');
                    Attributes_1.push({
                        Name: AttributeName, Value: AttributeValue,
                        escapedValue: AttributeValue.replace(/(^|[^\\])"/g, '$1\\\"')
                    });
                    return '';
                });
                processStartTag(TagName, Attributes_1, isUnary, (Stack.length === (isUnary ? 0 : 1)));
            }
            return '';
        }
        function parseEndTag(_, TagName) {
            var Position; // how many open elements have to be closed?
            if (TagName == null) {
                Position = 0;
            }
            else {
                TagName = TagName.toLowerCase();
                for (Position = Stack.length - 1; Position >= 0; Position--) {
                    if (Stack[Position] === TagName) {
                        break;
                    }
                }
            }
            if (Position >= 0) {
                for (var i = Stack.length - 1; i >= Position; i--) {
                    processEndTag(Stack[i], (i === 0));
                }
                Stack.length = Position;
            }
            return '';
        }
        var lastHTMLContent = HTML;
        while (HTML !== '') {
            var inText = true;
            if ((Stack.last() == null) || !isSpecialElement[Stack.last()]) {
                if (HTML.startsWith('<!--')) { // HTML comment
                    var Index = HTML.indexOf('-->', 4);
                    if (Index > 0) {
                        processComment(HTML.slice(4, Index));
                        HTML = HTML.slice(Index + 3);
                        inText = false;
                    }
                }
                else if (HTML.startsWith('</')) { // HTML end tag
                    var Match = HTML.match(EndTagPattern);
                    if (Match != null) {
                        HTML = HTML.slice(Match[0].length);
                        Match[0].replace(EndTagPattern, parseEndTag); // for side effects
                        inText = false;
                    }
                }
                else if (HTML.startsWith('<')) { // HTML start tag
                    var Match = HTML.match(StartTagPattern);
                    if (Match != null) {
                        HTML = HTML.slice(Match[0].length);
                        Match[0].replace(StartTagPattern, parseStartTag); // for side effects
                        inText = false;
                    }
                }
                if (inText) {
                    var Index = HTML.indexOf('<');
                    var Text_1 = (Index < 0 ? HTML : HTML.slice(0, Index));
                    HTML = (Index < 0 ? '' : HTML.slice(Index));
                    processText(Text_1, Stack.length === 0);
                }
            }
            else {
                HTML = HTML.replace(new RegExp('^((?:.|\n)*?)<\/' + Stack.last() + '[^>]*>', 'i'), function (_, Text) {
                    Text = Text
                        .replace(/<!--(.*?)-->/g, '$1')
                        .replace(/<!\[CDATA\[(.*?)]]>/g, '$1');
                    processText(Text, Stack.length === 0);
                    return '';
                });
                parseEndTag('', Stack.last());
            }
            if (HTML === lastHTMLContent) {
                switch (true) {
                    case HTML.startsWith('<'):
                        HTML = HTML.slice(1);
                        processText('&lt;', Stack.length === 0);
                        break;
                    default:
                        throwError('HTMLParseError: could not parse "' + HTML + '"');
                }
            }
            lastHTMLContent = HTML;
        }
        parseEndTag();
    }
    /**** AttributeFrom ****/
    function AttributeFrom(AttributeName, Attributes) {
        for (var i = 0, l = Attributes.length; i < l; i++) {
            var Attribute = Attributes[i];
            if (Attribute.Name === AttributeName) {
                return Attribute.Value;
            }
        }
        return undefined;
    }
    /**** deserializedTag ****/
    function deserializedTag(TagName, Attributes, isUnary) {
        var Result = '<' + TagName;
        for (var i = 0, l = Attributes.length; i < l; i++) {
            var Attribute = Attributes[i];
            Result += ' ' + Attribute.Name + '="' + Attribute.escapedValue + '"';
        }
        return Result + (isUnary ? '/>' : '>');
    }
    //----------------------------------------------------------------------------//
    //                              Version Handling                              //
    //----------------------------------------------------------------------------//
    /**** parsedVersion - parses "SemVer" into "Version" ****/
    var VersionPattern = /^(\d+)(?:[.](\d+)(?:[.](\d+)(-[-0-9A-Za-z.]+)?)?)?$/;
    // pattern is not perfect, see https://semver.org/
    function parsedVersion(// for syntactically valid SemVers only!
    Version) {
        var MatchList = VersionPattern.exec(Version);
        var major = parseInt(MatchList[1], 10);
        var minor = (MatchList[2] == null ? undefined : parseInt(MatchList[2], 10));
        var Patch = (MatchList[3] == null ? undefined : parseInt(MatchList[3], 10));
        var Build = (MatchList[4] == null ? undefined : parseInt(MatchList[4].slice(1), 16));
        return { major: major, minor: minor, Patch: Patch, Build: Build };
    }
    /**** normalized ****/
    function normalized(Version) {
        var major = Version.major, minor = Version.minor, Patch = Version.Patch, Build = Version.Build;
        minor = minor || 0;
        Patch = Patch || ((major === 0) && (minor === 0) ? 1 : 0);
        Build = 1;
        return { major: major, minor: minor, Patch: Patch, Build: Build };
    }
    /**** serializedVersion ****/
    function serializedVersion(Version) {
        return (Version.major + '.' + (Version.minor || '0') + '.' + (Version.Patch || '0') + (Version.Build == null ? '' : '.' + Version.Build.toString(16)));
    }
    /**** VersionAeqB ****/
    function VersionAeqB(VersionA, VersionB) {
        return ((VersionA.major === VersionB.major) &&
            ((VersionA.minor || 0) === (VersionB.minor || 0)) &&
            ((VersionA.Patch || 0) === (VersionB.Patch || 0)) &&
            ((VersionA.Build || 1) === (VersionB.Build || 1)));
    }
    /**** VersionAgtB ****/
    function VersionAgtB(VersionA, VersionB) {
        return ((VersionA.major > VersionB.major) ||
            (VersionA.major === VersionB.major) && (((VersionA.minor || 0) > (VersionB.minor || 0)) ||
                ((VersionA.minor || 0) === (VersionB.minor || 0)) && (((VersionA.Patch || 0) > (VersionB.Patch || 0)) ||
                    ((VersionA.Patch || 0) === (VersionB.Patch || 0)) &&
                        ((VersionA.Build || 1) > (VersionB.Build || 1)))));
    }
    /**** VersionAmatchesB - A was requested and B is already loaded ****/
    function VersionAmatchesB(VersionA, VersionB) {
        if (VersionA.major == null) {
            return true;
        }
        if (VersionA.major !== VersionB.major) {
            return false;
        } // inkompatible
        if (VersionA.minor == null) {
            return true;
        }
        if (VersionB.major === 0) {
            if (VersionA.minor !== VersionB.minor) {
                return false;
            } // inkompatible
        }
        else {
            if (VersionA.minor > VersionB.minor) {
                return false;
            } // missing feat.
        }
        return (VersionA.Patch == null) || (VersionA.Patch <= VersionB.Patch);
    }
    function RelationshipAreplacingB(VersionA, VersionB) {
        switch (true) {
            case VersionAeqB(VersionA, VersionB): return 'sameVersion';
            case (VersionA.major < VersionB.major): return 'incompatibleDowngrade';
            case (VersionA.major > VersionB.major): return 'incompatibleUpgrade';
            case (VersionA.major === 0) && (VersionA.minor < VersionB.minor): return 'incompatibleDowngrade';
            case (VersionA.major === 0) && (VersionA.minor > VersionB.minor): return 'incompatibleUpgrade';
            case (VersionA.major === 0) && (VersionA.Patch < VersionB.Patch): return 'incompatibleDowngrade';
            case (VersionA.major === 0) && (VersionA.Patch > VersionB.Patch): return 'compatibleUpgrade';
            case (VersionA.major === 0) && (VersionA.Build < VersionB.Build): return 'compatibleDowngrade';
            case (VersionA.major === 0) && (VersionA.Build > VersionB.Build): return 'compatibleUpgrade';
            case (VersionA.minor < VersionB.minor): return 'incompatibleDowngrade';
            case (VersionA.minor > VersionB.minor): return 'compatibleUpgrade';
            case (VersionA.Patch < VersionB.Patch): return 'compatibleDowngrade';
            case (VersionA.Patch > VersionB.Patch): return 'compatibleUpgrade';
            case (VersionA.Build < VersionB.Build): return 'compatibleDowngrade';
            case (VersionA.Build > VersionB.Build): return 'compatibleUpgrade';
            default: throwError('InternalError: unforeseen version relationship');
        }
    }
    /**** currentTimestamp ****/
    var initialTimestamp = new Date('2020-02-02').getTime();
    function currentTimestamp() {
        return Date.now() - initialTimestamp;
    }
    var UsageCountOfResource = new WeakMap();
    /**** registerResources ****/
    function registerResources(Resources) {
        expectText('resource', Resources);
        processResources(Resources || '', 'register');
    }
    WAT.registerResources = registerResources;
    /**** unregisterResources ****/
    function unregisterResources(Resources) {
        allowText('resource', Resources);
        if (Resources != null) {
            processResources(Resources || '', 'unregister');
        }
    }
    WAT.unregisterResources = unregisterResources;
    function processResources(Resources, Mode) {
        if (Resources.trim() === '') {
            return;
        }
        var ResourceInfoList = parsedResources(Resources); // also avoids duplicates
        ResourceInfoList.forEach(function (ResourceInfo) { processResource(ResourceInfo, Mode); });
    }
    /**** processResource - for registration, deregistration and collection ****/
    function processResource(ResourceInfo, Mode) {
        var matchingResource = ElementMatchingResourceInfo(ResourceInfo);
        if (matchingResource == null) {
            switch (Mode) {
                case 'register': break; // installation will be done below
                case 'unregister': return; // already unregistered
                case 'collect': throwError('NoSuchResource: an expected resource has already been removed');
            }
        }
        else {
            switch (Mode) {
                case 'register':
                    reuseResource(matchingResource);
                    return;
                case 'unregister':
                    unuseResource(matchingResource);
                    return;
                case 'collect':
                    collectResource(matchingResource);
                    return;
            }
        }
        /**** now install the requested resource ****/
        var Resource;
        switch (ResourceInfo.Form) {
            case 'literalStyle':
                Resource = ElementFromHTML('<style></style>');
                html(Resource, ResourceInfo.Value || '');
                break;
            case 'externalStyle':
                Resource = ElementFromHTML('<link></link>');
                break;
            case 'literalScript':
                Resource = ElementFromHTML('<' + 'script><' + '/script>');
                html(Resource, ResourceInfo.Value || '');
                break;
            case 'externalScript':
                Resource = ElementFromHTML('<' + 'script><' + '/script>');
                break;
            default: throwError('InternalError: unforeseen resource form');
        }
        var AttributeSet = ResourceInfo.AttributeSet || {};
        for (var AttributeName in AttributeSet) {
            if (AttributeSet.hasOwnProperty(AttributeName)) {
                attr(Resource, AttributeName, AttributeSet[AttributeName].Value);
            }
        }
        switch (ResourceInfo.Form) {
            case 'literalStyle':
            case 'externalStyle':
                document.head.appendChild(Resource);
                break;
            case 'literalScript':
                try {
                    document.head.appendChild(Resource);
                }
                catch (Signal) {
                    console.warn('could not attach literal script', Signal);
                    throw Signal;
                }
                break;
            case 'externalScript':
                document.head.appendChild(Resource);
                break;
            default: throwError('InternalError: unforeseen resource form');
        }
        UsageCountOfResource.set(Resource, 1);
    }
    /**** parsedResources - parses resources string into ResourceInfo list ****/
    function parsedResources(Resources) {
        var ResourceInfoList = [];
        function AttributeSetFrom(AttributeList) {
            var Result = {};
            for (var i = 0, l = AttributeList.length; i < l; i++) {
                Result[AttributeList[i].Name.toLowerCase()] = AttributeList[i];
            }
            return Result;
        }
        function processResource(newResourceInfo) {
            ResourceInfoList.forEach(function (ResourceInfo) {
                if (ResourceInfosAreMatching(ResourceInfo, newResourceInfo)) {
                    throwError('DuplicateResources: the given set of resources contains duplicates');
                }
                else {
                    ResourceInfoList.push(newResourceInfo);
                }
            });
        }
        var ResourceAttributes, ResourceContent;
        var HTMLParserCallbacks = {
            processStartTag: function processStartTag(TagName, Attributes, isUnary, isTopLevel) {
                if (isTopLevel) {
                    switch (TagName) {
                        case 'link':
                            if (AttributeFrom('rel', Attributes) === 'stylesheet') {
                                processResource({
                                    Form: 'externalStyle',
                                    Type: AttributeFrom('type', Attributes) || 'text/css',
                                    Media: AttributeFrom('media', Attributes) || 'all',
                                    Title: AttributeFrom('title', Attributes) || undefined,
                                    Value: AttributeFrom('href', Attributes),
                                    AttributeSet: AttributeSetFrom(Attributes)
                                });
                            }
                            return;
                        case 'script':
                        case 'style':
                            ResourceAttributes = AttributeSetFrom(Attributes);
                            ResourceContent = '';
                            return;
                        default:
                            throwError('InvalidResourceSet: a WAT resource set must only contain ' +
                                'style, script or link elements (the latter only with ' +
                                'relation "stylesheet")');
                    }
                }
                else {
                    if (ResourceContent !== undefined) {
                        ResourceContent += deserializedTag(TagName, Attributes, isUnary);
                    }
                }
            },
            processEndTag: function processEndTag(TagName, isTopLevel) {
                if (isTopLevel) {
                    switch (TagName) {
                        case 'script':
                            processResource({
                                Form: (ResourceAttributes.src == null ? 'literalScript' : 'externalScript'),
                                Type: (ResourceAttributes === null || ResourceAttributes === void 0 ? void 0 : ResourceAttributes.type.Value) || 'application/javascript',
                                noModule: ('nomodule' in ResourceAttributes),
                                Value: (ResourceAttributes.src == null
                                    ? ResourceContent
                                    : ResourceAttributes.src.Value),
                                AttributeSet: ResourceAttributes
                            });
                            break;
                        case 'style':
                            processResource({
                                Form: 'literalStyle',
                                Type: (ResourceAttributes === null || ResourceAttributes === void 0 ? void 0 : ResourceAttributes.type.Value) || 'text/css',
                                Media: (ResourceAttributes === null || ResourceAttributes === void 0 ? void 0 : ResourceAttributes.media.Value) || 'all',
                                Title: (ResourceAttributes === null || ResourceAttributes === void 0 ? void 0 : ResourceAttributes.title.Value) || undefined,
                                Value: ResourceContent,
                                AttributeSet: ResourceAttributes
                            });
                    }
                    ResourceAttributes = {};
                    ResourceContent = undefined;
                }
                else {
                    if (ResourceContent !== undefined) {
                        ResourceContent += '</' + TagName + '>';
                    }
                }
            },
            processText: function processText(Text, isTopLevel) {
                if (ResourceContent !== undefined) {
                    ResourceContent += Text;
                }
            },
        };
        parseHTML(Resources, HTMLParserCallbacks);
        return ResourceInfoList;
    }
    /**** reuseResource ****/
    function reuseResource(Resource) {
        UsageCountOfResource.set(Resource, (UsageCountOfResource.get(Resource) || 0) + 1);
    }
    /**** unuseResource ****/
    function unuseResource(Resource) {
        UsageCountOfResource.set(Resource, Math.max(0, (UsageCountOfResource.get(Resource) || 0) - 1));
    }
    var ResourceCollection;
    /**** clearResourceCollection - to be called prior to a resource collection ****/
    function clearResourceCollection() {
        ResourceCollection = [];
    }
    /**** collectResource ****/
    function collectResource(Resource) {
        for (var i = 0, l = ResourceCollection.length; i < l; i++) {
            if (ResourceCollection[i] === Resource) {
                return;
            }
        }
        ResourceCollection.push(Resource);
    }
    /**** collectedResources ****/
    function collectedResources() {
        var Result = '';
        for (var i = 0, l = ResourceCollection.length; i < l; i++) {
            Result += ResourceCollection[i].outerHTML + '\n';
        }
        return Result;
    }
    /**** ResourceInfosAreMatching ****/
    function ResourceInfosAreMatching(Info_A, Info_B) {
        if (Info_A.Form !== Info_B.Form) {
            return false;
        }
        switch (Info_A.Form) {
            case 'literalStyle':
            case 'externalStyle': return ((Info_A.Type === Info_B.Type) &&
                (Info_A.Media === Info_B.Media) &&
                (Info_A.Title === Info_B.Title) &&
                ((Info_A.Value || '').trim() === (Info_B.Value || '').trim()));
            case 'literalScript':
            case 'externalScript': return ((Info_A.Type === Info_B.Type) &&
                (Info_A.noModule === Info_B.noModule) &&
                ((Info_A.Value || '').trim() === (Info_B.Value || '').trim()));
            default: throwError('InternalError: unforeseen resource form');
        }
    }
    /**** ResourceInfoMatchesElement ****/
    function ResourceInfoMatchesElement(ResourceInfo, DOMElement) {
        switch (ResourceInfo.Form) {
            case 'literalStyle': return ((DOMElement.tagName === 'STYLE') &&
                ((attr(DOMElement, 'type') || 'text/css') === 'text/css') &&
                ((attr(DOMElement, 'media') || 'all') === ResourceInfo.Media) &&
                ((attr(DOMElement, 'title') || undefined) === ResourceInfo.Title) &&
                ((DOMElement.textContent || '').trim() === ResourceInfo.Value));
            case 'externalStyle': return ((DOMElement.tagName === 'LINK') && (attr(DOMElement, 'rel') === 'stylesheet') &&
                ((attr(DOMElement, 'type') || 'text/css') === 'text/css') &&
                ((attr(DOMElement, 'media') || 'all') === ResourceInfo.Media) &&
                ((attr(DOMElement, 'title') || undefined) === ResourceInfo.Title) &&
                (attr(DOMElement, 'href') === ResourceInfo.Value) // TODO: normalize URL
            );
            case 'literalScript': return ((DOMElement.tagName === 'SCRIPT') && ((attr(DOMElement, 'type') == null) ||
                (attr(DOMElement, 'type') === 'application/javascript') ||
                (attr(DOMElement, 'type') === 'text/javascript')) &&
                ((attr(DOMElement, 'nomodule') || false) === ResourceInfo.noModule) &&
                ((DOMElement.textContent || '').trim() === ResourceInfo.Value));
            case 'externalScript': return ((DOMElement.tagName === 'SCRIPT') && ((attr(DOMElement, 'type') == null) ||
                (attr(DOMElement, 'type') === 'application/javascript') ||
                (attr(DOMElement, 'type') === 'text/javascript')) &&
                ((attr(DOMElement, 'nomodule') || false) === ResourceInfo.noModule) &&
                (attr(DOMElement, 'src') === ResourceInfo.Value) // TODO: normalize URL
            );
            default: throwError('InternalError: unforeseen resource form');
        }
    }
    /**** ElementMatchingResourceInfo ****/
    function ElementMatchingResourceInfo(ResourceInfo) {
        var matchingElement = undefined;
        filtered(document.head.children, 'link,style,script').forEach(function (DOMElement) {
            if (ResourceInfoMatchesElement(ResourceInfo, DOMElement)) {
                matchingElement = DOMElement;
            }
        });
        return matchingElement;
    }
    //----------------------------------------------------------------------------//
    //                              Backup Handling                               //
    //----------------------------------------------------------------------------//
    var BackupIsSupported = false;
    try {
        localforage.config({
            driver: [localforage.INDEXEDDB, localforage.WEBSQL]
        });
        BackupIsSupported = true;
    }
    catch (Signal) { /* nop */ }
    var AppletStore; // will be filled during start-up
    /**** AppletsMayBePreserved ****/
    function AppletsMayBePreserved() {
        return (AppletStore != null);
    }
    WAT.AppletsMayBePreserved = AppletsMayBePreserved;
    /**** AppletMayBePreserved ****/
    function AppletMayBePreserved(Applet) {
        WAT.expectApplet('applet', Applet);
        return (AppletsMayBePreserved() &&
            ValueIsName(Applet.Name) &&
            (InternalsOfVisual(Applet) != null) &&
            (InternalsOfVisual(Applet).BackupStatus == null));
    }
    WAT.AppletMayBePreserved = AppletMayBePreserved;
    /**** AppletHasBackup ****/
    function AppletHasBackup(AppletOrPeer) {
        return __awaiter(this, void 0, void 0, function () {
            var AppletName, Candidate, normalizedAppletName, _a, Signal_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        switch (true) {
                            case ValueIsApplet(AppletOrPeer):
                                AppletName = AppletOrPeer.Name;
                                if (AppletName == null) {
                                    return [2 /*return*/, false];
                                }
                                break;
                            case ValueIsElement(AppletOrPeer):
                                Candidate = data(AppletOrPeer, 'wat-name');
                                if (ValueIsName(Candidate)) {
                                    AppletName = Candidate;
                                }
                                else {
                                    return [2 /*return*/, false];
                                }
                                break;
                            default: throwError('InvalidArgument: applet or applet name expected');
                        }
                        if (!AppletsMayBePreserved()) {
                            return [2 /*return*/, false];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        normalizedAppletName = (AppletName.startsWith('#') ? AppletName.slice(1) : AppletName);
                        _a = ValueIsString;
                        return [4 /*yield*/, AppletStore.getItem(normalizedAppletName)];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    case 3:
                        Signal_1 = _b.sent();
                        console.error('backup of applet "' + AppletName + ' could not be checked, reason: ', Signal_1);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    WAT.AppletHasBackup = AppletHasBackup;
    /**** AppletRestoredIntoPeer (during startup: applet does not yet exist) ****/
    function AppletRestoredIntoPeer(Peer) {
        return __awaiter(this, void 0, void 0, function () {
            var AppletName, Serialization, normalizedAppletName, Signal_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        WAT.expectElement('applet peer', Peer);
                        AppletName = data(Peer, 'wat-name');
                        if (!ValueIsName(AppletName))
                            throwError('InvalidArgument: the given applet peer does not have a valid name');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        normalizedAppletName = (AppletName.startsWith('#') ? AppletName.slice(1) : AppletName);
                        return [4 /*yield*/, AppletStore.getItem(normalizedAppletName)];
                    case 2:
                        Serialization = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        Signal_2 = _a.sent();
                        console.error('applet "' + AppletName + ' could not be restored, reason: ', Signal_2);
                        throwError('applet could not be restored (see browser console)');
                        return [3 /*break*/, 4];
                    case 4:
                        deserializeAppletIntoPeer(Serialization, Peer);
                        return [2 /*return*/, VisualOfElement(Peer)];
                }
            });
        });
    }
    /**** preserveApplet ****/
    function preserveApplet(Applet) {
        return __awaiter(this, void 0, void 0, function () {
            var AppletInternals, normalizedAppletName, Serialization, Signal_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        WAT.expectApplet('applet', Applet);
                        validateBackupAccessForApplet(Applet);
                        AppletInternals = InternalsOfVisual(Applet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        normalizedAppletName = (Applet.Name.startsWith('#') ? Applet.Name.slice(1) : Applet.Name);
                        AppletInternals.BackupStatus = 'isBeingPreserved';
                        Serialization = serializedVisuals([Applet], undefined, 'withPendingSettings', 'withAllMasters');
                        return [4 /*yield*/, AppletStore.setItem(normalizedAppletName, Serialization)];
                    case 2:
                        _a.sent();
                        delete AppletInternals.BackupStatus;
                        return [3 /*break*/, 4];
                    case 3:
                        Signal_3 = _a.sent();
                        delete AppletInternals.BackupStatus;
                        console.error('applet "' + Applet.Name + ' could not be preserved, reason: ', Signal_3);
                        throwError('applet could not be preserved (see browser console)');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    WAT.preserveApplet = preserveApplet;
    /**** restoreApplet (while applet is running) ****/
    function restoreApplet(Applet, CollisionHandling) {
        return __awaiter(this, void 0, void 0, function () {
            var AppletName, Serialization, AppletInternals, normalizedAppletName, Signal_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        WAT.expectApplet('applet', Applet);
                        AppletName = Applet.Name;
                        validateBackupAccessForApplet(Applet);
                        AppletInternals = InternalsOfVisual(Applet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        normalizedAppletName = (AppletName.startsWith('#') ? AppletName.slice(1) : AppletName);
                        AppletInternals.BackupStatus = 'isBeingRestored';
                        return [4 /*yield*/, AppletStore.getItem(normalizedAppletName)];
                    case 2:
                        Serialization = _a.sent();
                        delete AppletInternals.BackupStatus;
                        return [3 /*break*/, 4];
                    case 3:
                        Signal_4 = _a.sent();
                        delete AppletInternals.BackupStatus;
                        console.error('applet "' + AppletName + ' could not be restored, reason: ', Signal_4);
                        throwError('applet could not be restored (see browser console)');
                        return [3 /*break*/, 4];
                    case 4:
                        deserializeAppletIntoPeer(Serialization, Applet.Peer);
                        return [2 /*return*/];
                }
            });
        });
    }
    WAT.restoreApplet = restoreApplet;
    /**** removeBackupOfApplet ****/
    function removeBackupOfApplet(Applet) {
        return __awaiter(this, void 0, void 0, function () {
            var AppletInternals, normalizedAppletName, Signal_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        WAT.expectApplet('applet', Applet);
                        validateBackupAccessForApplet(Applet);
                        AppletInternals = InternalsOfVisual(Applet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        normalizedAppletName = (Applet.Name.startsWith('#') ? Applet.Name.slice(1) : Applet.Name);
                        AppletInternals.BackupStatus = 'isBeingRemoved';
                        return [4 /*yield*/, AppletStore.removeItem(normalizedAppletName)];
                    case 2:
                        _a.sent();
                        delete AppletInternals.BackupStatus;
                        return [3 /*break*/, 4];
                    case 3:
                        Signal_5 = _a.sent();
                        delete AppletInternals.BackupStatus;
                        console.error('applet "' + Applet.Name + ' could not be removed, reason: ', Signal_5);
                        throwError('applet could not be removed (see browser console)');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    WAT.removeBackupOfApplet = removeBackupOfApplet;
    /**** validateBackupAccessForApplet ****/
    function validateBackupAccessForApplet(Applet) {
        if (!AppletsMayBePreserved())
            throwError('NotSupported: WAT applets can not be preserved in this environment');
        var AppletName = Applet.Name;
        if (!ValueIsName(AppletName))
            throwError('InvalidArgument: the given applet does not have a valid name');
        switch (InternalsOfVisual(Applet).BackupStatus) {
            case 'isBeingPreserved': throwError('ForbiddenOperation: this applet is currently being backed-up');
            case 'isBeingRestored': throwError('ForbiddenOperation: this applet is currently being restored from its backup');
            case 'isBeingRemoved': throwError('ForbiddenOperation: the backup of this applet is currently being removed');
        }
    }
    //----------------------------------------------------------------------------//
    //                       Serialization/Deserialization                        //
    //----------------------------------------------------------------------------//
    /**** serializedResources (w/o duplicates) ****/
    function serializedResources(ResourcesList) {
        clearResourceCollection();
        ResourcesList.forEach(function (Resources) { return processResources(Resources, 'collect'); });
        return collectedResources();
    }
    /**** serializedMasters - w/o check for duplicates ****/
    function serializedMasters(MasterList, withPendingSettings) {
        var Serializations = [];
        MasterList.forEach(function (Master) {
            if (Master in MasterRegistry) {
                Serializations.push(serializedMaster(Master, withPendingSettings));
            }
        });
        return Serializations.join('\n');
    }
    /**** serializedMaster ****/
    function serializedMaster(Master, withPendingSettings) {
        WAT.expectName('master name', Master);
        var MasterInfo = MasterRegistry[Master];
        if (MasterInfo == null)
            throwError('NoSuchMaster: no master named ' + quoted(Master) + ' found');
        function copyDetails(DetailNames) {
            DetailNames.split(' ').forEach(function (DetailName) {
                // @ts-ignore we definitely want to index "MasterInfo" using a string
                var Detail = MasterInfo[DetailName];
                if ((Detail != null) && (ValueIsString(Detail) && (Detail !== '') ||
                    ValueIsArray(Detail) && (Detail.length > 0))) {
                    MasterRecord[DetailName] = Detail;
                }
            });
        }
        var MasterRecord = {};
        copyDetails('Name Version Category Resources Template Classes Styles Script Properties');
        var undesignableProperties = [];
        for (var PropertyName in MasterInfo.undesignablePropertySet) {
            undesignableProperties.push(PropertyName);
        }
        MasterRecord.undesignableProperties = undesignableProperties.join(' ');
        if (withPendingSettings === 'withPendingSettings') {
            copyDetails('pendingResources pendingTemplate pendingClasses pendingStyles pendingScript');
        }
        return ('<' + 'script type="application/wat-master">\n' +
            JSON.stringify(MasterRecord) +
            '\n<' + '/script>');
    }
    WAT.serializedMaster = serializedMaster;
    /**** serializedVisuals - w/o check for duplicates or inclusions ****/
    function serializedVisuals(VisualList, withUniqueId, withPendingSettings, withMasters, withResources // assumes non-empty "withMasters"
    ) {
        var Serialization = '';
        if (withMasters || withResources) {
            if (withMasters == null) {
                withMasters = 'withUsedMasters';
            }
            var MasterList = void 0;
            if (withMasters === 'withUsedMasters') {
                MasterList = MastersUsedByVisuals(VisualList, 'withoutIntrinsics');
            }
            else {
                MasterList = allMastersInDocument();
            }
            if (withResources) {
                var ResourcesList_1 = [];
                MasterList.forEach(function (Master) {
                    var MasterInfo = MasterRegistry[Master];
                    if ((MasterInfo != null) && (MasterInfo.Resources != null)) {
                        ResourcesList_1.push(MasterInfo.Resources);
                    }
                });
                if (ResourcesList_1.length > 0) {
                    Serialization += serializedResources(ResourcesList_1) + '\n';
                }
            }
            Serialization += serializedMasters(MasterList, withPendingSettings) + '\n';
        }
        VisualList.forEach(function (Visual) { return Serialization += serializedVisual(Visual, withUniqueId); });
        return Serialization;
    }
    /**** serializedVisual ****/
    function serializedVisual(Visual, withUniqueId, withPendingSettings) {
        function triggerRecursively(EventName) {
            Visual.trigger(EventName);
            switch (Visual.Category) {
                case 'Applet':
                    Visual.CardList.forEach(function (Card) { return Card.trigger(EventName); })(Visual).OverlayList.forEach(function (Overlay) { return Overlay.trigger(EventName); });
                    break;
                case 'Card':
                case 'Overlay':
                case 'Compound':
                    Visual.ComponentList.forEach(function (Component) { return Component.trigger(EventName); });
            }
        }
        /**** preserveUniqueIdIn ****/
        function preserveUniqueIdIn(Peer) {
            var Visual = VisualForDOMElement.get(Peer);
            attr(Peer, 'data-wat-unique-id', InternalsForVisual.get(Visual).uniqueId);
            filtered(Peer.children, '.WAT.Card,.WAT.Overlay,.WAT.Control,.WAT.Compound')
                .forEach(function (Peer) {
                preserveUniqueIdIn(Peer);
            });
        }
        /**** removeUniqueIdFrom ****/
        function removeUniqueIdFrom(Peer) {
            attr(Peer, 'data-wat-unique-id', undefined);
            filtered(Peer.children, '.WAT.Card,.WAT.Overlay,.WAT.Control,.WAT.Compound')
                .forEach(function (Peer) {
                removeUniqueIdFrom(Peer);
            });
        }
        triggerRecursively('before-serialization');
        if (withUniqueId) {
            preserveUniqueIdIn(Visual.Peer);
        }
        var Serialization = Visual.Peer.outerHTML;
        if (withUniqueId) {
            removeUniqueIdFrom(Visual.Peer);
        }
        triggerRecursively('after-serialization');
        return Serialization;
    }
    function parsedSerialization(Serialization) {
        expectText('serialization', Serialization);
        var serializedResources = [], serializedMasters = [];
        var serializedApplets = [], serializedCards = [];
        var serializedOverlays = [], serializedComponents = [];
        var ElementType, ElementContent;
        var HTMLParserCallbacks = {
            processStartTag: function processStartTag(TagName, Attributes, isUnary, isTopLevel) {
                if (isTopLevel) {
                    switch (TagName) {
                        case 'link':
                            if ((AttributeFrom('rel', Attributes) === 'stylesheet') &&
                                (ValueIsURL(AttributeFrom('href', Attributes)))) {
                                serializedResources.push(deserializedTag(TagName, Attributes, isUnary));
                            }
                            else {
                                throwError('InvalidSerialization: invalid "link" element encountered');
                            }
                            break;
                        case 'style':
                            var Type = AttributeFrom('type', Attributes);
                            if ((Type == null) || (Type === 'text/css')) {
                                ElementType = 'literalStyle';
                                ElementContent = deserializedTag(TagName, Attributes, false);
                            }
                            else {
                                throwError('InvalidSerialization: invalid "style" element encountered');
                            }
                            break;
                        case 'script':
                            switch (AttributeFrom('type', Attributes)) {
                                case 'application/wat-master':
                                    ElementType = 'Master';
                                    ElementContent = deserializedTag(TagName, Attributes, false);
                                    break;
                                case 'application/javascript':
                                case 'text/javascript':
                                    ElementType = ((AttributeFrom('src', Attributes) == null)
                                        ? 'literalScript'
                                        : 'externalScript');
                                    ElementContent = deserializedTag(TagName, Attributes, false);
                                    break;
                                default: throwError('InvalidSerialization: invalid "script" element encountered');
                            }
                            break;
                        case 'div':
                            var Classes = AttributeFrom('class', Attributes) || '';
                            if (/(^|\s)WAT(\s|$)/.test(Classes)) {
                                switch (true) {
                                    case /(^|\s)Applet(\s|$)/.test(Classes):
                                        ElementType = 'Applet';
                                        break;
                                    case /(^|\s)Card(\s|$)/.test(Classes):
                                        ElementType = 'Card';
                                        break;
                                    case /(^|\s)Overlay(\s|$)/.test(Classes):
                                        ElementType = 'Overlay';
                                        break;
                                    case /(^|\s)(Control|Compound)(\s|$)/.test(Classes):
                                        ElementType = 'Component';
                                        break;
                                    default: throwError('InvalidSerialization: invalid "div" element encountered');
                                }
                                ElementContent = deserializedTag(TagName, Attributes, false);
                            }
                            else {
                                throwError('InvalidSerialization: invalid "div" element encountered');
                            }
                        default:
                            throwError('InvalidSerialization: invalid "' + TagName.toLowerCase() + '" ' +
                                'element encountered');
                    }
                }
                else {
                    if (ElementContent !== undefined) {
                        ElementContent += deserializedTag(TagName, Attributes, isUnary);
                    }
                }
            },
            processEndTag: function processEndTag(TagName, isTopLevel) {
                if (isTopLevel) {
                    ElementContent += '</' + TagName + '>';
                    switch (TagName) {
                        case 'style':
                            serializedResources.push(ElementContent);
                            break;
                        case 'script':
                            switch (ElementType) {
                                case 'Master':
                                    serializedMasters.push(ElementContent);
                                    break;
                                case 'literalScript':
                                case 'externalScript': serializedResources.push(ElementContent);
                            }
                            break;
                        case 'div':
                            ElementContent += '</' + TagName + '>';
                            switch (ElementType) {
                                case 'Applet':
                                    serializedApplets.push(ElementContent);
                                    break;
                                case 'Card':
                                    serializedCards.push(ElementContent);
                                    break;
                                case 'Overlay':
                                    serializedOverlays.push(ElementContent);
                                    break;
                                case 'Component':
                                    serializedComponents.push(ElementContent);
                                    break;
                            }
                    }
                    ElementType = ElementContent = undefined;
                }
                else {
                    if (ElementContent !== undefined) {
                        ElementContent += '</' + TagName + '>';
                    }
                }
            },
            processText: function processText(Text, isTopLevel) {
                if (ElementContent !== undefined) {
                    ElementContent += Text;
                }
            },
        };
        parseHTML(Serialization, HTMLParserCallbacks);
        return {
            serializedResources: serializedResources, serializedMasters: serializedMasters, serializedApplets: serializedApplets,
            serializedCards: serializedCards, serializedOverlays: serializedOverlays, serializedComponents: serializedComponents
        };
    }
    WAT.parsedSerialization = parsedSerialization;
    /**** deserializedMaster ****/
    function deserializedMaster(Serialization) {
        expectText('serialization', Serialization);
        var MasterObject;
        try {
            MasterObject = JSON.parse(Serialization);
        }
        catch (Signal) {
            throwError('InvalidSerialization: the given serialized master does not contain ' +
                'a master specification');
        }
        return parsedMaster(MasterObject);
    }
    WAT.deserializedMaster = deserializedMaster;
    /**** deserializeAppletIntoPeer - Peer remains the same! ****/
    function deserializeAppletIntoPeer(Serialization, Peer, CollisionHandling) {
        var _a = parsedSerialization(Serialization), serializedMasters = _a.serializedMasters, serializedApplets = _a.serializedApplets;
        if (serializedApplets.length === 0)
            throwError('InvalidSerialization: the given serialization does not contain any applets');
        if (serializedApplets.length > 1)
            throwError('InvalidSerialization: the given serialization contains multiple applets');
        /**** clear old applet ****/
        var duringStartUp = (WAT_isReady && !WAT_isRunning);
        if (duringStartUp) {
            html(Peer, '');
        }
        else {
            var oldApplet = VisualOfElement(Peer);
            oldApplet.CardList.forEach(function (Card) { return Card.remove(); });
            oldApplet.OverlayList.forEach(function (Overlay) { return Overlay.remove(); });
            html(Peer, ''); // also removes mandatory card (w/o event handlers)
            InternalsForVisual.delete(oldApplet);
        }
        /**** if need be: install given masters ****/
        if (serializedMasters.length > 0) {
            var MasterInfoList_1 = [];
            serializedMasters.forEach(function (serializedMaster) { return MasterInfoList_1.push(deserializedMaster(serializedMaster)); });
            MasterInfoList_1.forEach(function (MasterInfo) {
                if (!MasterIsIntrinsic(MasterInfo.Name)) {
                    registerMaster(MasterInfo);
                }
            });
        }
        var auxiliaryPeer = ElementFromHTML(serializedApplets[0]);
        while (auxiliaryPeer.hasChildNodes()) {
            Peer.appendChild(auxiliaryPeer.firstChild);
        }
        var AttributeList = auxiliaryPeer.attributes;
        for (var i = 0, l = AttributeList.length; i < l; i++) {
            var AttributeName = AttributeList[i].name;
            switch (AttributeName) {
                case 'id':
                case 'class':
                case 'style': break;
                default: attr(Peer, AttributeName, AttributeList[i].value);
            }
        }
        var StyleSet = auxiliaryPeer.style;
        for (var Property in StyleSet) {
            switch (Property) {
                case 'display':
                case 'position':
                case 'left':
                case 'width':
                case 'right':
                case 'top':
                case 'height':
                case 'bottom': break;
                default: if (StyleSet.hasOwnProperty(Property)) {
                    css(Peer, Property, StyleSet[Property]);
                }
            }
        }
        VisualBuiltFromPeer(Peer, 'Applet'); // actually builds applet
    }
    /**** AppletDeserializedFrom ****/
    function AppletDeserializedFrom(oldApplet, Serialization) {
        WAT.expectApplet('applet', oldApplet);
        expectText('serialization', Serialization);
        var Peer = oldApplet.Peer;
        deserializeAppletIntoPeer(Serialization, Peer);
        return VisualOfElement(Peer);
    }
    WAT.AppletDeserializedFrom = AppletDeserializedFrom;
    //----------------------------------------------------------------------------//
    //                               Import/Export                                //
    //----------------------------------------------------------------------------//
    //----------------------------------------------------------------------------//
    //                             Property Handling                              //
    //----------------------------------------------------------------------------//
    var internalPropertyNames = "\n    uniqueId Id Name Label Category Master ErrorInfo mayBeDesigned mayBeDeleted\n    Classes isVisible isEnabled Value Script pendingScript pendingScriptError\n    TabIndex PointerSensitivity Overflows TextOverflow Opacity\n    x y Width Height Position Size Geometry GeometryOnDisplay\n    horizontalAnchoring verticalAnchoring horizontalOffsets verticalOffsets\n    minWidth maxWidth minHeight maxHeight\n    FontFamily FoltSize FontWeight FontStyle TextDecoration TextShadow\n    TextAlignment ForegroundColor Color BackgroundColor BackgroundTexture\n    BorderWidths BorderColors BorderStyles BorderRadii BoxShadow\n    Cursor customCursor\n  ".trim().replace(/\s+/g, ' ').split(' ');
    var internalPropertyNameSet = Object.create(null);
    internalPropertyNames.forEach(function (PropertyName) { return internalPropertyNameSet[PropertyName] = PropertyName; });
    /**** expectedProperty ****/
    function expectedProperty(Description, Value) {
        expectPlainObject(Description, Value);
        var Identifier = Value.Identifier;
        if (!ValueIsIdentifier(Identifier))
            throwError('InvalidArgument: invalid property name ' + quoted(Identifier));
        validatePropertyName(Identifier);
        var Label = Value.Label;
        switch (true) {
            case (Label == null):
                Label = Identifier;
                break;
            case ValueIsTextline(Label):
                Label = Label.trim() || Identifier;
                break;
            default: throwError('InvalidArgument: the label of property ' + quoted(Identifier) +
                ' does not consist of a single line of text');
        }
        var EditorType = Value.EditorType;
        switch (true) {
            case (EditorType == null): throwError('InvalidArgument: missing editor type for property ' + quoted(Identifier));
            case !ValueIsOneOf(EditorType, WAT.WAT_PropertyEditorTypes): throwError('InvalidArgument: invalid editor type given for property ' + quoted(Identifier));
        }
        var Property = { Identifier: Identifier, Label: Label, EditorType: EditorType };
        var InputPattern;
        switch (EditorType) {
            case 'checkbox':
                break;
            case 'choice': // drop-down for boolean properties
                Property.FalseValue = expectedTextline('label for value "false"', Value.FalseValue);
                Property.TrueValue = expectedTextline('label for value "true"', Value.TrueValue);
                break;
            case 'textline-input':
            case 'password-input':
            case 'email-address-input':
            case 'phone-number-input':
            case 'url-input':
            case 'search-input':
                if (Value.minLength != null) {
                    Property.minLength = expectedIntegerInRange('minimal input length', Value.minLength, 0);
                }
                if (Value.maxLength != null) {
                    Property.maxLength = expectedIntegerInRange('maximal input length', Value.maxLength, 0);
                }
                if ((Value.multiple != null) && (EditorType === 'email-address-input')) {
                    Property.multiple = expectedBoolean('multi-value flag', Value.multiple);
                }
                if (Value.Pattern != null) {
                    Property.Pattern = expectedTextline('input pattern', Value.Pattern);
                }
                break;
            case 'number-input':
                if (Value.minValue != null) {
                    Property.minValue = expectedNumber('minimal allowed value', Value.minValue);
                }
                if (Value.maxValue != null) {
                    Property.maxValue = expectedNumber('maximal allowed value', Value.maxValue);
                }
                if (Value.StepValue != null) {
                    if (Value.StepValue === 'any') {
                        Property.StepValue = 'any';
                    }
                    else {
                        Property.StepValue = expectedNumberInRange('step value', Value.StepValue, 0, Infinity, false);
                    }
                }
                break;
            case 'time-input':
                InputPattern = /^[0-9]{2}:[0-9]{2}$/;
            case 'date-time-input':
                InputPattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/;
            case 'date-input':
                InputPattern = InputPattern || /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
            case 'month-input':
                InputPattern = InputPattern || /^[0-9]{4}-[0-9]{2}$/;
            case 'week-input':
                InputPattern = InputPattern || /^[0-9]{4}-W[0-9]{2}$/;
                if (Value.minValue != null) {
                    Property.minValue = expectedStringMatching('minimal allowed value', Value.minValue, InputPattern);
                }
                if (Value.maxValue != null) {
                    Property.maxValue = expectedStringMatching('maximal allowed value', Value.maxValue, InputPattern);
                }
                if (Value.StepValue != null) {
                    if (Value.StepValue === 'any') {
                        Property.StepValue = 'any';
                    }
                    else {
                        Property.StepValue = expectedIntegerInRange('step value', Value.StepValue, 0);
                    }
                }
                break;
            case 'color-input':
                break;
            case 'drop-down':
                Property.ValueList = expectedArray('list of allowed values', Value.ValueList);
                for (var i = 0, l = Property.ValueList.length; i < l; i++) {
                    if (!ValueIsTextline(Property.ValueList[i]))
                        throwError('InvalidArgument: element #' + (i + 1) + ' of the list of ' +
                            'foreseen drop-down values is not a valid line of text');
                }
                break;
            case 'slider':
                if (Value.minValue != null) {
                    Property.minValue = expectedNumber('minimal allowed value', Value.minValue);
                }
                if (Value.maxValue != null) {
                    Property.maxValue = expectedNumber('maximal allowed value', Value.maxValue);
                }
                if (Value.StepValue != null) {
                    if (Value.StepValue === 'any') {
                        Property.StepValue = 'any';
                    }
                    else {
                        Property.StepValue = expectedNumberInRange('step value', Value.StepValue, 0, Infinity, false);
                    }
                }
                break;
            case 'text-input':
            case 'html-input':
            case 'css-input':
            case 'javascript-input':
            case 'json-input':
                if (Value.minLength != null) {
                    Property.minLength = expectedIntegerInRange('minimal input length', Value.minLength, 0);
                }
                if (Value.maxLength != null) {
                    Property.maxLength = expectedIntegerInRange('maximal input length', Value.maxLength, 0);
                }
        }
        return Property;
    }
    /**** defineForbiddenPropertyNames ****/
    function defineForbiddenPropertyNames() {
        function processPrototype(Prototype) {
            for (var PropertyName in Prototype) {
                if (Prototype.hasOwnProperty(PropertyName)) {
                    forbiddenPropertyNames[PropertyName] = PropertyName;
                }
            }
        }
        processPrototype(WAT_Visual.prototype);
        processPrototype(WAT_Applet.prototype);
        processPrototype(WAT_Container.prototype);
        processPrototype(WAT_Layer.prototype);
        processPrototype(WAT_Card.prototype);
        processPrototype(WAT_Overlay.prototype);
        processPrototype(WAT_Compound.prototype);
        processPrototype(WAT_Control.prototype);
        delete forbiddenPropertyNames['Value'];
    } // n.b. "Value" is deliberately allowed!
    /**** validatePropertyName ****/
    function validatePropertyName(Identifier) {
        if (Identifier in forbiddenPropertyNames)
            throwError('InvalidArgument: forbidden property name ' + quoted(Identifier));
    }
    /**** definePropertyGetterForVisual ****/
    function definePropertyGetterForVisual(Visual, Property, Getter) {
        WAT.expectIdentifier('property name', Property);
        allowFunction('property getter', Getter);
        var Descriptor = PropertyDescriptorFor(Visual, Property);
        if (Descriptor == null) {
            Descriptor = {
                get: Getter, set: function () { throwReadOnlyError(Property); },
                configurable: true, enumerable: true
            };
        }
        else {
            if (typeof Descriptor.value === 'function')
                throwError('InvalidProperty: method ' + quoted(Property) + ' must not be redefined as a property');
            if (Descriptor.configurable == false)
                throwError('InvalidProperty: property ' + quoted(Property) + ' cannot be redefined');
            delete Descriptor.value;
            delete Descriptor.writable;
            Descriptor.get = Getter;
            Descriptor.set = Descriptor.set || function () { throwReadOnlyError(Property); };
        }
        Object.defineProperty(Visual, Property, Descriptor);
    }
    /**** definePropertySetterForVisual ****/
    function definePropertySetterForVisual(Visual, Property, Setter) {
        WAT.expectIdentifier('property name', Property);
        allowFunction('property setter', Setter);
        var Descriptor = PropertyDescriptorFor(Visual, Property);
        if (Descriptor == null) {
            Descriptor = {
                get: function () { throwWriteOnlyError(Property); }, set: Setter,
                configurable: true, enumerable: true
            };
        }
        else {
            if (typeof Descriptor.value === 'function')
                throwError('InvalidProperty: method ' + quoted(Property) + ' must not be redefined as a property');
            if (Descriptor.configurable == false)
                throwError('InvalidProperty: property ' + quoted(Property) + ' cannot be redefined');
            delete Descriptor.value;
            delete Descriptor.writable;
            Descriptor.get = Descriptor.get || function () { throwWriteOnlyError(Property); };
            Descriptor.set = Setter;
        }
        Object.defineProperty(Visual, Property, Descriptor);
    }
    //----------------------------------------------------------------------------//
    //                             Geometry Handling                              //
    //----------------------------------------------------------------------------//
    /**** outerPeerOf ****/
    function outerPeerOf(Peer) {
        var Candidate = Peer.parentElement;
        if (Candidate == null)
            throwError('ImpossibleOperation: a detached visual can not be right or bottom aligned');
        return Candidate;
    }
    /**** GeometryOfVisual ****/
    function GeometryOfVisual(Visual) {
        var Peer = PeerOfVisual(Visual);
        return {
            x: Peer.offsetLeft, Width: Peer.offsetWidth,
            y: Peer.offsetTop, Height: Peer.offsetHeight
        };
    }
    /**** GeometryOfVisualOnDisplay ****/
    function GeometryOfVisualOnDisplay(Visual) {
        var boundingRect = PeerOfVisual(Visual).getBoundingClientRect();
        return {
            x: boundingRect.left, Width: boundingRect.width,
            y: boundingRect.top, Height: boundingRect.height
        };
    }
    /**** changeGeometryOfVisualTo ****/
    function changeGeometryOfVisualTo(Visual, x, y, Width, Height) {
        var Peer = PeerOfVisual(Visual);
        var StyleChanges = {};
        function changeStyles(additionalChanges) {
            Object.assign(StyleChanges, additionalChanges);
        }
        /**** compute horizontal geometry update ****/
        var horizontalAnchoring, oldLeft, oldWidth, oldRight;
        if ((x != null) || (Width != null)) {
            horizontalAnchoring = horizontalAnchoringOfVisual(Visual);
            oldLeft = Math.round(Peer.offsetLeft);
            oldWidth = Math.round(Peer.offsetWidth);
        }
        if (x != null) {
            oldRight = (horizontalAnchoring === 'left-width' ? NaN : outerPeerOf(Peer).offsetWidth - oldLeft - oldWidth);
            x = Math.round(x);
            var dx = x - oldLeft;
            switch (horizontalAnchoring) {
                case 'left-width':
                    changeStyles({ left: x + 'px' });
                    break;
                case 'width-right':
                    changeStyles({ right: (oldRight - dx) + 'px' });
                    break;
                case 'left-right':
                    changeStyles({ left: x + 'px', right: (oldRight - dx) + 'px' });
                    break;
            }
        }
        if (Width != null) {
            Width = Math.round(Width);
            if (horizontalAnchoring === 'left-right') {
                oldRight = (StyleChanges.right != null ? parseFloat(StyleChanges.right) : outerPeerOf(Peer).offsetWidth - oldLeft - oldWidth);
                changeStyles({ right: (oldRight - (Width - oldWidth)) + 'px' });
            }
            else {
                changeStyles({ width: Width + 'px' });
            }
        }
        /**** compute vertical geometry update ****/
        var verticalAnchoring, oldTop, oldHeight, oldBottom;
        if ((y != null) || (Height != null)) {
            verticalAnchoring = verticalAnchoringOfVisual(Visual);
            oldTop = Math.round(Peer.offsetTop);
            oldHeight = Math.round(Peer.offsetHeight);
        }
        if (y != null) {
            oldBottom = (verticalAnchoring === 'top-height' ? NaN : outerPeerOf(Peer).offsetHeight - oldTop - oldHeight);
            y = Math.round(y);
            var dy = y - oldTop;
            switch (verticalAnchoring) {
                case 'top-height':
                    changeStyles({ top: y + 'px' });
                    break;
                case 'height-bottom':
                    changeStyles({ bottom: (oldBottom - dy) + 'px' });
                    break;
                case 'top-bottom':
                    changeStyles({ top: y + 'px', bottom: (oldBottom - dy) + 'px' });
                    break;
            }
        }
        if (Height != null) {
            Height = Math.round(Height);
            if (verticalAnchoring === 'top-bottom') {
                oldBottom = (StyleChanges.bottom != null ? parseFloat(StyleChanges.bottom) : outerPeerOf(Peer).offsetHeight - oldTop - oldHeight);
                changeStyles({ bottom: (oldBottom - (Height - oldHeight)) + 'px' });
            }
            else {
                changeStyles({ height: Height + 'px' });
            }
        }
        /**** now actually update the visual ****/
        if (!ObjectIsEmpty(StyleChanges)) {
            applyStylesToVisual(Visual, StyleChanges);
        }
    }
    /**** horizontalAnchoringOfVisual ****/
    function horizontalAnchoringOfVisual(Visual) {
        var Peer = PeerOfVisual(Visual);
        var left = Peer.style.left || 'auto';
        var right = Peer.style.right || 'auto';
        var Width = Peer.style.width || 'auto';
        if (right === 'auto') {
            return 'left-width';
        }
        if (Width === 'auto') {
            return 'left-right';
        }
        if (left === 'auto') {
            return 'width-right';
        } // check this last
        console.error('could not determine horizontal anchors of given Visual\n' +
            'got left:' + left + ', right:' + right + ', width:' + Width);
        return 'left-width';
    }
    /**** horizontalOffsetsOfVisual ****/
    function horizontalOffsetsOfVisual(Visual) {
        var Peer = PeerOfVisual(Visual);
        var left = Math.round(Peer.offsetLeft);
        var width = Math.round(Peer.offsetWidth);
        //  let right = Math.round(outerPeerOf(Peer).offsetWidth-left-width)
        switch (horizontalAnchoringOfVisual(Visual)) {
            case 'left-width': return [left, width];
            case 'width-right': return [width, Math.round(outerPeerOf(Peer).offsetWidth - left - width)];
            case 'left-right': return [left, Math.round(outerPeerOf(Peer).offsetWidth - left - width)];
            default: return [left, width];
        }
    }
    /**** changeHorizontalAnchoringOfVisualTo ****/
    function changeHorizontalAnchoringOfVisualTo(Visual, newAnchoring) {
        var oldAnchoring = horizontalAnchoringOfVisual(Visual);
        if (oldAnchoring === newAnchoring) {
            return;
        }
        var Peer = PeerOfVisual(Visual);
        var left = Math.round(Peer.offsetLeft);
        var Width = Math.round(Peer.offsetWidth);
        var right = Math.round(outerPeerOf(Peer).offsetWidth - left - Width);
        var StyleSet;
        switch (newAnchoring) {
            case 'left-width':
                StyleSet = { left: left + 'px', width: Width + 'px', right: 'auto' };
                break;
            case 'width-right':
                StyleSet = { left: 'auto', width: Width + 'px', right: right + 'px' };
                break;
            case 'left-right':
                StyleSet = { left: left + 'px', width: 'auto', right: right + 'px' };
                break;
            default: throwError('InternalError: unforeseen horizontal anchoring');
        }
        applyStylesToVisual(Visual, StyleSet);
    }
    /**** changeHorizontalOffsetsOfVisualTo ****/
    function changeHorizontalOffsetsOfVisualTo(Visual, offsets) {
        PeerOfVisual(Visual);
        switch (horizontalAnchoringOfVisual(Visual)) {
            case 'left-width':
                if (offsets[0] != null) {
                    applyStyleToVisual(Visual, 'left', Math.round(offsets[0]) + 'px');
                }
                if (offsets[1] != null) {
                    applyStyleToVisual(Visual, 'width', Math.round(offsets[1]) + 'px');
                }
                break;
            case 'width-right':
                if (offsets[0] != null) {
                    applyStyleToVisual(Visual, 'width', Math.round(offsets[0]) + 'px');
                }
                if (offsets[1] != null) {
                    applyStyleToVisual(Visual, 'right', Math.round(offsets[1]) + 'px');
                }
                break;
            case 'left-right':
                if (offsets[0] != null) {
                    applyStyleToVisual(Visual, 'left', Math.round(offsets[0]) + 'px');
                }
                if (offsets[1] != null) {
                    applyStyleToVisual(Visual, 'right', Math.round(offsets[1]) + 'px');
                }
        }
    }
    /**** verticalAnchoringOfVisual ****/
    function verticalAnchoringOfVisual(Visual) {
        var Peer = PeerOfVisual(Visual);
        var top = Peer.style.top || 'auto';
        var bottom = Peer.style.bottom || 'auto';
        var Height = Peer.style.height || 'auto';
        if (bottom === 'auto') {
            return 'top-height';
        }
        if (Height === 'auto') {
            return 'top-bottom';
        }
        if (top === 'auto') {
            return 'height-bottom';
        } // check this last
        console.error('could not determine vertical anchors of given Visual\n' +
            'got top:' + top + ', bottom:' + bottom + ', height:' + Height);
        return 'top-height';
    }
    /**** verticalOffsetsOfVisual ****/
    function verticalOffsetsOfVisual(Visual) {
        var Peer = PeerOfVisual(Visual);
        var top = Math.round(Peer.offsetTop);
        var height = Math.round(Peer.offsetHeight);
        //  let bottom = Math.round(outerPeer().offsetHeight-top-height)
        switch (verticalAnchoringOfVisual(Visual)) {
            case 'top-height': return [top, height];
            case 'height-bottom': return [height, Math.round(outerPeerOf(Peer).offsetHeight - top - height)];
            case 'top-bottom': return [top, Math.round(outerPeerOf(Peer).offsetHeight - top - height)];
            default: return [top, height];
        }
    }
    /**** changeVerticalAnchoringOfVisualTo ****/
    function changeVerticalAnchoringOfVisualTo(Visual, newAnchoring) {
        var oldAnchoring = verticalAnchoringOfVisual(Visual);
        if (oldAnchoring === newAnchoring) {
            return;
        }
        var Peer = PeerOfVisual(Visual);
        var top = Math.round(Peer.offsetTop);
        var Height = Math.round(Peer.offsetHeight);
        var bottom = Math.round(outerPeerOf(Peer).offsetHeight - top - Height);
        var StyleSet;
        switch (newAnchoring) {
            case 'top-height':
                StyleSet = { top: top + 'px', height: Height + 'px', bottom: 'auto' };
                break;
            case 'height-bottom':
                StyleSet = { top: 'auto', height: Height + 'px', bottom: bottom + 'px' };
                break;
            case 'top-bottom':
                StyleSet = { top: top + 'px', height: 'auto', bottom: bottom + 'px' };
                break;
            default: throwError('InternalError: unforeseen vertical anchoring');
        }
        applyStylesToVisual(Visual, StyleSet);
    }
    /**** changeVerticalOffsetsOfVisualTo ****/
    function changeVerticalOffsetsOfVisualTo(Visual, offsets) {
        switch (verticalAnchoringOfVisual(Visual)) {
            case 'top-height':
                if (offsets[0] != null) {
                    applyStyleToVisual(Visual, 'top', Math.round(offsets[0]) + 'px');
                }
                if (offsets[1] != null) {
                    applyStyleToVisual(Visual, 'height', Math.round(offsets[1]) + 'px');
                }
                break;
            case 'height-bottom':
                if (offsets[0] != null) {
                    applyStyleToVisual(Visual, 'height', Math.round(offsets[0]) + 'px');
                }
                if (offsets[1] != null) {
                    applyStyleToVisual(Visual, 'bottom', Math.round(offsets[1]) + 'px');
                }
                break;
            case 'top-bottom':
                if (offsets[0] != null) {
                    applyStyleToVisual(Visual, 'top', Math.round(offsets[0]) + 'px');
                }
                if (offsets[1] != null) {
                    applyStyleToVisual(Visual, 'bottom', Math.round(offsets[1]) + 'px');
                }
        }
    }
    var MasterRegistry = Object.create(null);
    /**** MasterInfoFromElement (script[type="application/wat-master"]) ****/
    function MasterInfoFromElement(Element) {
        var MasterObject = JSON.parse(html(Element));
        return parsedMaster(MasterObject);
    }
    /**** parsedMaster - fundamental errors prevent a master from being imported ****/
    function parsedMaster(MasterObject) {
        expectPlainObject('master specification', MasterObject);
        var Name = WAT.expectedName('master name', MasterObject.Name);
        if (Name.startsWith('#')) {
            throwError('InvalidImport: the name of a master must not be global');
        }
        var Version = normalized(parsedVersion(WAT.allowedSemVer('master version', MasterObject.Version) || '0.0.1'));
        var Category = expectedOneOf('master category', MasterObject.Category, WAT.WAT_Categories);
        var Resources = allowedText('master resources', MasterObject.Resources);
        if ((Resources != null) && (Resources.trim() === '')) {
            Resources = null;
        }
        var pendingResources = allowedText('pending master resources', MasterObject.pendingResources);
        if ((pendingResources != null) && (pendingResources.trim() === '')) {
            pendingResources = null;
        }
        var Template = allowedText('master template', MasterObject.Template);
        if ((Template != null) && (Template.trim() === '')) {
            Template = '<div class="WAT ' + Name + '"></div>';
        }
        var pendingTemplate = allowedText('pending master template', MasterObject.pendingTemplate);
        if ((pendingTemplate != null) && (pendingTemplate.trim() === '')) {
            pendingTemplate = null;
        }
        var Classes = parsedClasses(MasterObject.Classes);
        var pendingClasses = allowedTextline('pending master classes', MasterObject.pendingClasses);
        var Styles = parsedStyles(MasterObject.Styles);
        var pendingStyles = allowedText('pending master CSS styles', MasterObject.pendingStyles);
        var Script = allowedText('master script', MasterObject.Script);
        var pendingScript = allowedText('pending master script', MasterObject.pendingScript);
        var Properties = parsedProperties(MasterObject.Properties);
        var undesignablePropertySet = parsedUndesignableProperties(MasterObject.undesignableProperties);
        var plainMaster = 'plain' + Category;
        if (Name !== plainMaster) { // protect certain properties based on category
            for (var PropertyName in MasterRegistry[plainMaster].undesignablePropertySet) {
                undesignablePropertySet[PropertyName] = PropertyName;
            }
        }
        return {
            Name: Name, Version: Version, Category: Category,
            Resources: Resources, pendingResources: pendingResources, Template: Template, pendingTemplate: pendingTemplate,
            Classes: Classes, pendingClasses: pendingClasses, Styles: Styles, pendingStyles: pendingStyles, Script: Script, pendingScript: pendingScript,
            Properties: Properties, undesignablePropertySet: undesignablePropertySet,
            ErrorInfo: undefined, compiledScript: undefined, UsageCount: 0
        };
    }
    WAT.WAT_PropertyEditorTypes = [
        'checkbox', 'choice',
        'textline-input', 'password-input', 'number-input', 'search-input',
        'phone-number-input', 'email-address-input', 'url-input',
        'time-input', 'date-time-input', 'date-input', 'month-input', 'week-input',
        'color-input', 'drop-down', 'slider',
        'text-input', 'html-input', 'css-input', 'javascript-input', 'json-input'
    ];
    var forbiddenPropertyNames = Object.create(null); // will be filled later
    /**** parsedProperties ****/
    function parsedProperties(Value) {
        allowArray('list of custom properties', Value);
        if ((Value == null) || (Value.length === 0)) {
            return [];
        }
        var PropertyList = [];
        var parsedPropertySet = Object.create(null);
        Value.forEach(function (Specification) {
            var Property = expectedProperty('property specification', Specification);
            PropertyList.push(parsedPropertySet[Property.Identifier] = Property);
        });
        return PropertyList;
    }
    /**** parsedUndesignableProperties ****/
    function parsedUndesignableProperties(undesignableProperties) {
        allowText('list of undesignable properties', undesignableProperties);
        var Result = Object.create(null);
        if (undesignableProperties == null) {
            return Result;
        }
        undesignableProperties.trim().replace(/\s+/g, ' ').split(' ').forEach(function (PropertyName) {
            WAT.allowIdentifier('name of an undesignable property', PropertyName);
            Result[PropertyName] = PropertyName; // no further test
        });
        return Result;
    }
    /**** parsedClasses ****/
    function parsedClasses(Value) {
        allowText('master class presets', Value);
        if (Value == null) {
            return [];
        }
        var ClassNames = Value.trim().replace(/\s+/g, ' ').split(' ');
        if (ClassNames.length === 0) {
            return [];
        }
        ClassNames.forEach(function (Value) {
            if (!ValueIsName(Value))
                throwError('InvalidSpecification: master specification contains invalid ' +
                    'class name ' + quoted(Value));
        });
        return ClassNames;
    }
    /**** parsedStyles ****/
    function parsedStyles(Value) {
        var _a;
        allowText('master style presets', Value);
        if (Value == null) {
            return undefined;
        }
        Value = Value.trim();
        if (Value === '') {
            return undefined;
        }
        // see https://stackoverflow.com/questions/3326494/parsing-css-in-javascript-jquery
        var StyleElement = document.createElement('style');
        StyleElement.textContent = '#' + Math.round(Math.random() * 9999) + ' {' + Value + '}';
        var auxDocument = document.implementation.createHTMLDocument('');
        auxDocument.body.appendChild(StyleElement);
        var StyleSet = ((_a = StyleElement.sheet) === null || _a === void 0 ? void 0 : _a.cssRules[0]).style;
        var StylePresets = Object.create(null);
        for (var i = 0, l = StyleSet.length; i < l; i++) {
            var PropertyName = StyleSet[i];
            var PropertyValue = StyleSet.getPropertyValue(PropertyName);
            StylePresets[PropertyName] = PropertyValue;
        }
        return StylePresets;
    }
    /**** MasterMayBeRegistered ****/
    function MasterMayBeRegistered(MasterInfo, CollisionHandling) {
        var Master = MasterInfo.Name;
        if (MasterIsIntrinsic(Master))
            throwError('ForbiddenRegistration: intrinsic master ' + quoted(Master) + ' must ' +
                'not be replaced');
        if (Master in MasterRegistry) {
            var Relationship = RelationshipAreplacingB(MasterInfo.Version, MasterRegistry[Master].Version);
            // @ts-ignore we definitely want to index "CollisionHandling" with a string
            switch (CollisionHandling[Relationship]) {
                case 'perform': return true;
                case 'ignore': return false;
                case 'abort': switch (Relationship) {
                    case 'compatibleDowngrade': throwError('ForbiddenImport: this import would result in a downgrade of ' +
                        'master ' + quoted(Master));
                    case 'incompatibleDowngrade': throwError('ForbiddenImport: this import would result in an incompatible ' +
                        'downgrade of master ' + quoted(Master));
                    case 'sameVersion': throwError('ForbiddenImport: this import would overwrite master ' + quoted(Master));
                    case 'compatibleUpgrade': throwError('ForbiddenImport: this import would result in an upgrade of ' +
                        'master ' + quoted(Master));
                    case 'incompatibleUpgrade': throwError('ForbiddenImport: this import would result in an incompatible ' +
                        'upgrade of master ' + quoted(Master));
                }
            }
            return false;
        }
        else {
            return true;
        }
    }
    /**** MasterIsIntrinsic ****/
    var intrinsicMasterSet = Object.create(null);
    'Applet Card Overlay Compound Control'.split(' ').forEach(function (Category) { return intrinsicMasterSet['plain' + Category] = true; });
    function MasterIsIntrinsic(Master) {
        return (intrinsicMasterSet[Master] != null);
    }
    /**** registerMastersInDocument ****/
    function registerMastersInDocument() {
        var ErrorOccurred = false;
        forEach(document.head.querySelectorAll('script[type="application/wat-master"]'), function (ScriptElement) {
            try {
                var MasterInfo = MasterInfoFromElement(ScriptElement);
                if (MasterMayBeRegistered(MasterInfo, {
                    compatibleDowngrade: 'ignore',
                    incompatibleDowngrade: 'abort',
                    sameVersion: 'ignore',
                    compatibleUpgrade: 'perform',
                    incompatibleUpgrade: 'perform'
                })) {
                    registerMaster(MasterInfo);
                }
            }
            catch (Signal) {
                ErrorOccurred = true;
                console.warn('Error in Master Registration:', Signal);
            }
        });
        if (ErrorOccurred)
            window.alert('The WAT masters bundled with this document could not be\n' +
                'registered without errors - see browser console for details');
    }
    /**** registerMasterFromSerialization ****/
    function registerMasterFromSerialization(Serialization) {
        expectText('serialization', Serialization);
        var MasterObject = JSON.parse(Serialization);
        var MasterInfo = parsedMaster(MasterObject);
        registerMaster(MasterInfo);
    }
    WAT.registerMasterFromSerialization = registerMasterFromSerialization;
    /**** registerMaster ****/
    function registerMaster(MasterInfo) {
        if (MasterIsIntrinsic(MasterInfo.Name))
            throwError('ForbiddenOperation: an intrinsic master must not be (re-)registered');
        MasterInfo.ErrorInfo = undefined;
        if (MasterInfo.Resources != null) {
            registerResources(MasterInfo.Resources);
        }
        if (MasterInfo.Script != null) {
            compileScriptIntoMaster(MasterInfo.Script, MasterInfo);
        }
        MasterInfo.UsageCount = 0;
        var Name = MasterInfo.Name;
        MasterRegistry[Name] = MasterInfo;
        if (WAT_isRunning) {
            refreshInstancesOfMaster(Name);
        }
    }
    /**** unregisterMaster ****/
    function unregisterMaster(Name) {
        if (MasterIsIntrinsic(Name))
            throwError('ForbiddenOperation: an intrinsic master must not be unregistered');
        if (Name in MasterRegistry) {
            var MasterInfo = MasterRegistry[Name];
            if (MasterInfo.Resources != null) {
                unregisterResources(MasterRegistry[Name].Resources);
            }
            releaseMaster(Name);
            delete MasterRegistry[Name];
            if (WAT_isRunning) {
                refreshInstancesOfMaster(Name);
            }
        }
    }
    WAT.unregisterMaster = unregisterMaster;
    /**** compileScriptIntoMaster ****/
    function compileScriptIntoMaster(Script, MasterInfo) {
        delete MasterInfo.compiledScript;
        if (Script != null) {
            try {
                MasterInfo.compiledScript = new Function('toGet', 'toSet', 'on', 'off', 'trigger', '$', Script);
            }
            catch (Signal) {
                MasterInfo.ErrorInfo = {
                    Title: 'Compilation Error',
                    longMessage: 'Script of Master ' + quoted(MasterInfo.Name) + ' could not be compiled',
                    shortMessage: Signal.message,
                    Reason: Signal,
                    Applet: firstAppletInDocument(),
                    Sufferer: MasterInfo.Name,
                    Property: 'Script'
                };
            }
        }
    }
    /**** releaseMaster ****/
    function releaseMaster(Master) {
        var MasterInfo = MasterRegistry[Master];
        if (MasterInfo == null) {
            return;
        }
        off(document.body, 'mousedown mousemove mouseup', '.' + Master);
        off(document.body, 'mouseenter mouseleave', '.' + Master);
        off(document.body, 'keydown keypress keyup', '.' + Master);
        off(document.body, 'input change click', '.' + Master);
        var Resources = MasterInfo.Resources;
        if (Resources != null) {
            unregisterResources(Resources);
        }
    }
    /**** refreshInstancesOfMaster ****/
    function refreshInstancesOfMaster(Name) {
        if (WAT_isRunning) {
            forEach(document.body.querySelectorAll('.WAT[data-wat-master="' + Name + '"]'), function (Peer) { return refreshVisual(VisualOfElement(Peer)); });
        }
    }
    /**** hasMaster ****/
    function hasMaster(Name) {
        WAT.expectName('master name', Name);
        return (MasterRegistry[Name] != null);
    }
    WAT.hasMaster = hasMaster;
    /**** lacksMaster ****/
    function lacksMaster(Name) {
        WAT.expectName('master name', Name);
        return (MasterRegistry[Name] == null);
    }
    WAT.lacksMaster = lacksMaster;
    /**** existingInfoForMaster ****/
    function existingInfoForMaster(Name) {
        WAT.expectName('master name', Name);
        var MasterInfo = MasterRegistry[Name];
        if (MasterInfo == null)
            throwError('NoSuchMaster: a master with the name ' + quoted(Name) + ' does not exist');
        return MasterInfo;
    }
    /**** createMaster ****/
    function createMaster(Name, Category, Version, Template) {
        WAT.expectName('master name', Name);
        expectOneOf('master category', Category, WAT.WAT_Categories);
        WAT.allowSemVer('master version', Version);
        allowText('master template', Template);
        if (Name in MasterRegistry)
            throwError('MasterExists: a master with the name ' + quoted(Name) + ' exists already');
        var MasterInfo = {
            Name: Name, Category: Category, Version: normalized(parsedVersion(Version || '0.0.1')),
            Template: Template || '<div class="WAT ' + Name + '"></div>',
            UsageCount: 0
        };
        registerMaster(MasterInfo);
    }
    WAT.createMaster = createMaster;
    /**** DuplicateOfMaster ****/
    function DuplicateOfMaster(oldName, newName, newVersion) {
        //  expectName    ('old master name',oldName) // done by "existingInfoForMaster"
        WAT.expectName('new master name', newName);
        WAT.allowSemVer('new master version', newVersion);
        if (newName in MasterRegistry)
            throwError('MasterExists: a master with the name ' + quoted(newName) + ' exists already');
        var oldMasterInfo = existingInfoForMaster(oldName);
        var newMasterInfo = Object.assign({}, oldMasterInfo);
        newMasterInfo.Name = newName;
        if (newVersion != null) {
            newMasterInfo.Version = newVersion;
        }
        if (oldMasterInfo.Properties != null) { // detach from original
            newMasterInfo.Properties = [];
            oldMasterInfo.Properties.forEach(function (Property) { return newMasterInfo.Properties.push(Object.assign({}, Property)); });
        }
        registerMaster(newMasterInfo);
        return newMasterInfo;
    }
    WAT.DuplicateOfMaster = DuplicateOfMaster;
    /**** renameMaster ****/
    function renameMaster(oldName, newName, updateInstances) {
        if (updateInstances === void 0) { updateInstances = true; }
        //  expectName                 ('old master name',oldName)       // t.b.d. below
        WAT.expectName('new master name', newName);
        allowBoolean('master instance update setting', updateInstances);
        var oldMasterInfo = existingInfoForMaster(oldName);
        if (oldName === newName) {
            return;
        }
        var newMasterInfo = MasterRegistry[newName];
        if (newMasterInfo != null)
            throwError('MasterExists: a master with the name ' + quoted(newName) + ' exists already');
        delete MasterRegistry[oldName];
        oldMasterInfo.Name = newName;
        oldMasterInfo.Version.Build = currentTimestamp();
        MasterRegistry[newName] = oldMasterInfo;
        if (updateInstances) {
            forEach(document.body.querySelectorAll('.WAT[data-wat-master="' + oldName + '"]'), function (Peer) { data(Peer, 'wat-master', newName); });
            if (WAT_isRunning) {
                refreshInstancesOfMaster(newName);
            }
        }
        else {
            if (WAT_isRunning) {
                refreshInstancesOfMaster(oldName);
                refreshInstancesOfMaster(newName);
            }
        }
    }
    WAT.renameMaster = renameMaster;
    /**** [set]NameOfMaster ****/
    function NameOfMaster(Name) {
        existingInfoForMaster(Name);
        return Name;
    }
    WAT.NameOfMaster = NameOfMaster;
    function setNameOfMaster(oldName, newName) {
        renameMaster(oldName, newName, true);
    }
    WAT.setNameOfMaster = setNameOfMaster;
    /**** CategoryOfMaster ****/
    function CategoryOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return MasterInfo.Category;
    }
    WAT.CategoryOfMaster = CategoryOfMaster;
    /**** [set]VersionOfMaster ****/
    function VersionOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return serializedVersion(MasterInfo.Version);
    }
    WAT.VersionOfMaster = VersionOfMaster;
    function setVersionOfMaster(Name, newSemVer) {
        var MasterInfo = existingInfoForMaster(Name);
        var newVersion = normalized(parsedVersion(newSemVer));
        if (VersionAgtB(MasterInfo.Version, newVersion))
            throwError('InvalidArgument: the new version of a master must be greater than ' +
                'the existing one');
        MasterInfo.Version = newVersion;
        MasterInfo.Version.Build = currentTimestamp();
    }
    WAT.setVersionOfMaster = setVersionOfMaster;
    /**** ResourcesOfMaster ****/
    function ResourcesOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return MasterInfo.Resources;
    }
    WAT.ResourcesOfMaster = ResourcesOfMaster;
    /**** [set]PendingResourcesOfMaster ****/
    function pendingResourcesOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return MasterInfo.pendingResources;
    }
    WAT.pendingResourcesOfMaster = pendingResourcesOfMaster;
    function setPendingResourcesOfMaster(Name, newResources) {
        //  expectName        ('master name',Name)  // t.b.d. by "existingInfoForMaster"
        allowText('new master resources', newResources);
        var MasterInfo = existingInfoForMaster(Name);
        if ((newResources == null) || (newResources.trim() === '')) {
            delete MasterInfo.pendingResources;
        }
        else {
            MasterInfo.pendingResources = newResources;
        }
    }
    WAT.setPendingResourcesOfMaster = setPendingResourcesOfMaster;
    /**** activatePendingResourcesOfMaster ****/
    function activatePendingResourcesOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        unregisterMaster(Name); // because resources could contain side effects
        MasterInfo.Resources = MasterInfo.pendingResources;
        delete MasterInfo.pendingResources;
        MasterInfo.Version.Build = currentTimestamp();
        registerMaster(MasterInfo);
    }
    WAT.activatePendingResourcesOfMaster = activatePendingResourcesOfMaster;
    /**** TemplateOfMaster ****/
    function TemplateOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return MasterInfo.Template;
    }
    WAT.TemplateOfMaster = TemplateOfMaster;
    /**** [set]PendingTemplateOfMaster ****/
    function pendingTemplateOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return MasterInfo.pendingTemplate;
    }
    WAT.pendingTemplateOfMaster = pendingTemplateOfMaster;
    function setPendingTemplateOfMaster(Name, newTemplate) {
        //  expectName       ('master name',Name)   // t.b.d. by "existingInfoForMaster"
        allowText('new master template', newTemplate);
        var MasterInfo = existingInfoForMaster(Name);
        if ((newTemplate == null) || (newTemplate.trim() === '')) {
            delete MasterInfo.pendingTemplate;
        }
        else {
            MasterInfo.pendingTemplate = newTemplate;
        }
    }
    WAT.setPendingTemplateOfMaster = setPendingTemplateOfMaster;
    /**** activatePendingTemplateOfMaster ****/
    function activatePendingTemplateOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        if (MasterInfo.pendingTemplate == null) {
            MasterInfo.Template = '<div class="WAT ' + Name + '"></div>';
        }
        else {
            MasterInfo.Template = MasterInfo.pendingTemplate;
            delete MasterInfo.pendingTemplate;
        }
        MasterInfo.Version.Build = currentTimestamp();
    }
    WAT.activatePendingTemplateOfMaster = activatePendingTemplateOfMaster;
    /**** ClassesOfMaster ****/
    function ClassesOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return serializedClasses(MasterInfo.Classes);
    }
    WAT.ClassesOfMaster = ClassesOfMaster;
    /**** [set]PendingClassesOfMaster ****/
    function pendingClassesOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return serializedClasses(MasterInfo.pendingClasses);
    }
    WAT.pendingClassesOfMaster = pendingClassesOfMaster;
    function setPendingClassesOfMaster(Name, newClasses) {
        //  expectName      ('master name',Name)    // t.b.d. by "existingInfoForMaster"
        allowText('new master classes', newClasses);
        var MasterInfo = existingInfoForMaster(Name);
        if ((newClasses == null) || (newClasses.trim() === '')) {
            delete MasterInfo.pendingClasses;
        }
        else {
            MasterInfo.pendingClasses = parsedClasses(newClasses);
        }
    }
    WAT.setPendingClassesOfMaster = setPendingClassesOfMaster;
    /**** activatePendingClassesOfMaster ****/
    function activatePendingClassesOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        MasterInfo.Classes = MasterInfo.pendingClasses;
        delete MasterInfo.pendingClasses;
        MasterInfo.Version.Build = currentTimestamp();
        refreshInstancesOfMaster(Name);
    }
    WAT.activatePendingClassesOfMaster = activatePendingClassesOfMaster;
    /**** serializedClasses ****/
    function serializedClasses(ClassNames) {
        return (ClassNames == null ? '' : ClassNames.join(' '));
    }
    /**** StylesOfMaster ****/
    function StylesOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return serializedStyles(MasterInfo.Styles);
    }
    WAT.StylesOfMaster = StylesOfMaster;
    /**** [set]PendingStylesOfMaster ****/
    function pendingStylesOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return serializedStyles(MasterInfo.pendingStyles);
    }
    WAT.pendingStylesOfMaster = pendingStylesOfMaster;
    function setPendingStylesOfMaster(Name, newStyles) {
        //  expectName     ('master name',Name)     // t.b.d. by "existingInfoForMaster"
        allowText('new master styles', newStyles);
        var MasterInfo = existingInfoForMaster(Name);
        if ((newStyles == null) || (newStyles.trim() === '')) {
            delete MasterInfo.pendingStyles;
        }
        else {
            MasterInfo.pendingStyles = parsedStyles(newStyles);
        }
    }
    WAT.setPendingStylesOfMaster = setPendingStylesOfMaster;
    /**** activatePendingStylesOfMaster ****/
    function activatePendingStylesOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        MasterInfo.Styles = MasterInfo.pendingStyles;
        delete MasterInfo.pendingStyles;
        MasterInfo.Version.Build = currentTimestamp();
        refreshInstancesOfMaster(Name);
    }
    WAT.activatePendingStylesOfMaster = activatePendingStylesOfMaster;
    /**** serializedStyles ****/
    function serializedStyles(StyleSet) {
        var Serialization = '';
        if (StyleSet != null) {
            for (var Key in StyleSet) {
                if (StyleSet.hasOwnProperty(Key)) {
                    Serialization += Key + ':' + StyleSet[Key] + '; ';
                }
            }
        }
        return Serialization;
    }
    /**** ScriptOfMaster ****/
    function ScriptOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return MasterInfo.Script;
    }
    WAT.ScriptOfMaster = ScriptOfMaster;
    /**** [set]PendingScriptOfMaster ****/
    function pendingScriptOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return MasterInfo.pendingScript;
    }
    WAT.pendingScriptOfMaster = pendingScriptOfMaster;
    function setPendingScriptOfMaster(Name, newScript) {
        //  expectName     ('master name',Name)     // t.b.d. by "existingInfoForMaster"
        allowText('new master script', newScript);
        var MasterInfo = existingInfoForMaster(Name);
        if ((newScript == null) || (newScript.trim() === '')) {
            delete MasterInfo.pendingScript;
        }
        else {
            MasterInfo.pendingScript = newScript;
        }
    }
    WAT.setPendingScriptOfMaster = setPendingScriptOfMaster;
    /**** activatePendingScriptOfMaster ****/
    function activatePendingScriptOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        MasterInfo.ErrorInfo = undefined;
        compileScriptIntoMaster(MasterInfo.pendingScript, MasterInfo); // may fail!
        if (MasterInfo.ErrorInfo == null) {
            MasterInfo.Script = MasterInfo.pendingScript;
            delete MasterInfo.pendingScript;
            MasterInfo.Version.Build = currentTimestamp();
            refreshInstancesOfMaster(Name);
        }
        else {
            MasterInfo.ErrorInfo = undefined;
            compileScriptIntoMaster(MasterInfo.Script, MasterInfo);
            if (MasterInfo.ErrorInfo != null) {
                refreshInstancesOfMaster(Name);
            }
        }
    }
    WAT.activatePendingScriptOfMaster = activatePendingScriptOfMaster;
    /**** PropertiesOfMaster ****/
    function PropertiesOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        var Result = [];
        var Properties = MasterInfo.Properties;
        if (Properties != null) {
            for (var i = 0, l = Properties.length; i < l; i++) {
                Result.push(Object.assign({}, Properties[i]));
            }
        }
        return Result;
    }
    WAT.PropertiesOfMaster = PropertiesOfMaster;
    /**** PropertyNamesOfMaster ****/
    function PropertyNamesOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        var Result = [];
        var Properties = MasterInfo.Properties;
        if (Properties != null) {
            for (var i = 0, l = Properties.length; i < l; i++) {
                Result.push(Properties[i].Identifier);
            }
        }
        return Result;
    }
    WAT.PropertyNamesOfMaster = PropertyNamesOfMaster;
    /**** PropertyOfMaster ****/
    function PropertyOfMaster(Name, Identifier) {
        //  expectName       ('master name',Name)   // t.b.d. by "existingInfoForMaster"
        WAT.allowIdentifier('property name', Identifier);
        validatePropertyName(Identifier);
        var MasterInfo = existingInfoForMaster(Name);
        var Properties = MasterInfo.Properties;
        if (Properties != null) {
            for (var i = 0, l = Properties.length; i < l; i++) {
                var Property = Properties[i];
                if (Property.Identifier === Identifier) {
                    return Object.assign({}, Property);
                }
            }
        }
        return undefined;
    }
    WAT.PropertyOfMaster = PropertyOfMaster;
    /**** MasterHasProperty ****/
    function MasterHasProperty(Name, Identifier) {
        //  expectName       ('master name',Name)   // t.b.d. by "existingInfoForMaster"
        WAT.allowIdentifier('property name', Identifier);
        if (Identifier in forbiddenPropertyNames) {
            return false;
        }
        var MasterInfo = existingInfoForMaster(Name);
        var Properties = MasterInfo.Properties;
        if (Properties != null) {
            for (var i = 0, l = Properties.length; i < l; i++) {
                var Property = Properties[i];
                if (Property.Identifier === Identifier) {
                    return true;
                }
            }
        }
        return false;
    }
    WAT.MasterHasProperty = MasterHasProperty;
    /**** MasterLacksProperty ****/
    function MasterLacksProperty(Name, Identifier) {
        return !MasterHasProperty(Name, Identifier);
    }
    WAT.MasterLacksProperty = MasterLacksProperty;
    /**** insertPropertyOfMasterAt ****/
    function insertPropertyOfMasterAt(Name, Specification, Index) {
        //  expectName      ('master name',Name)  // t.b.d. by "IndexOfPropertyOfMaster"
        allowOrdinal('insertion index', Index);
        var Property = expectedProperty('property specification', Specification);
        var Identifier = Property.Identifier;
        if (IndexOfPropertyOfMaster(Name, Identifier) >= 0)
            throwError('PropertyExists: a property with the name ' + quoted(Identifier) + ' exists already');
        var MasterInfo = MasterRegistry[Name];
        var Properties = MasterInfo.Properties;
        if (Properties == null) {
            MasterInfo.Properties = [Property];
        }
        else {
            if (Index == null) {
                Index = Properties.length;
            }
            else {
                Index = Math.min(Index, Properties.length);
            }
            Properties.splice(Index, 0, Property);
        }
    }
    WAT.insertPropertyOfMasterAt = insertPropertyOfMasterAt;
    /**** renamePropertyOfMaster ****/
    function renamePropertyOfMaster(Name, oldIdentifier, newIdentifier) {
        //  expectName      ('master name',Name)  // t.b.d. by "IndexOfPropertyOfMaster"
        WAT.expectIdentifier('old property identifier', oldIdentifier);
        WAT.expectIdentifier('new property identifier', newIdentifier);
        validatePropertyName(oldIdentifier);
        validatePropertyName(newIdentifier);
        if (oldIdentifier === newIdentifier) {
            return;
        }
        var PropertyIndex = IndexOfPropertyOfMaster(Name, oldIdentifier);
        if (PropertyIndex < 0)
            throwError('NoSuchProperty: a property with the name ' + quoted(oldIdentifier) + ' ' +
                'does not exist');
        if (IndexOfPropertyOfMaster(Name, newIdentifier) >= 0)
            throwError('PropertyExists: a property with the name ' + quoted(newIdentifier) + ' ' +
                'exists already');
        var Property = MasterRegistry[Name].Properties[PropertyIndex];
        Property.Identifier = newIdentifier;
    }
    WAT.renamePropertyOfMaster = renamePropertyOfMaster;
    /**** changePropertyOfMaster ****/
    function changePropertyOfMaster(Name, Identifier, Specification) {
        //  expectName      ('master name',Name)                         // t.b.d. below
        WAT.expectIdentifier('property identifier', Identifier);
        validatePropertyName(Identifier);
        var Property = expectedProperty('property specification', Specification);
        if (Identifier !== Property.Identifier) {
            renamePropertyOfMaster(Name, Identifier, Property.Identifier);
        }
        var PropertyIndex = IndexOfPropertyOfMaster(Name, Identifier);
        var Properties = MasterRegistry[Name].Properties;
        Properties[PropertyIndex] = Property;
    }
    WAT.changePropertyOfMaster = changePropertyOfMaster;
    /**** IndexOfPropertyOfMaster ****/
    function IndexOfPropertyOfMaster(Name, Identifier) {
        //  expectName        ('master name',Name)  // t.b.d. by "existingInfoForMaster"
        WAT.expectIdentifier('property name', Identifier);
        validatePropertyName(Identifier);
        var MasterInfo = existingInfoForMaster(Name);
        var Properties = MasterInfo.Properties;
        if (Properties != null) {
            for (var i = 0, l = Properties.length; i < l; i++) {
                if (Properties[i].Identifier === Identifier) {
                    return i;
                }
            }
        }
        return -1;
    }
    WAT.IndexOfPropertyOfMaster = IndexOfPropertyOfMaster;
    /**** PropertyCountOfMaster ****/
    function PropertyCountOfMaster(Name) {
        //  expectName('master name',Name)          // t.b.d. by "existingInfoForMaster"
        var MasterInfo = existingInfoForMaster(Name);
        var Properties = MasterInfo.Properties;
        return (Properties == null ? 0 : Properties.length);
    }
    WAT.PropertyCountOfMaster = PropertyCountOfMaster;
    /**** PropertyOfMasterMayBeMovedUp ****/
    function PropertyOfMasterMayBeMovedUp(Name, Identifier) {
        //  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
        //  expectIdentifier('property name',Identifier)                         // dto.
        var Index = IndexOfPropertyOfMaster(Name, Identifier);
        return (Index > 0);
    }
    WAT.PropertyOfMasterMayBeMovedUp = PropertyOfMasterMayBeMovedUp;
    /**** PropertyOfMasterMayBeMovedDown ****/
    function PropertyOfMasterMayBeMovedDown(Name, Identifier) {
        //  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
        //  expectIdentifier('property name',Identifier)                         // dto.
        var Index = IndexOfPropertyOfMaster(Name, Identifier);
        return ((Index >= 0) &&
            (Index < MasterRegistry[Name].Properties.length - 1));
    }
    WAT.PropertyOfMasterMayBeMovedDown = PropertyOfMasterMayBeMovedDown;
    /**** movePropertyOfMasterToTop ****/
    function movePropertyOfMasterToTop(Name, Identifier) {
        //  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
        //  expectIdentifier('property name',Identifier)                         // dto.
        var Index = IndexOfPropertyOfMaster(Name, Identifier);
        if (Index > 0) {
            var Properties = MasterRegistry[Name].Properties;
            var Property = Properties.splice(Index, 1)[0];
            Properties.unshift(Property);
        }
    }
    WAT.movePropertyOfMasterToTop = movePropertyOfMasterToTop;
    /**** movePropertyOfMasterUp ****/
    function movePropertyOfMasterUp(Name, Identifier) {
        //  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
        //  expectIdentifier('property name',Identifier)                         // dto.
        var Index = IndexOfPropertyOfMaster(Name, Identifier);
        if (Index > 0) {
            var Properties = MasterRegistry[Name].Properties;
            var Property = Properties.splice(Index, 1)[0];
            Properties.splice(Index - 1, 0, Property);
        }
    }
    WAT.movePropertyOfMasterUp = movePropertyOfMasterUp;
    /**** movePropertyOfMasterDown ****/
    function movePropertyOfMasterDown(Name, Identifier) {
        //  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
        //  expectIdentifier('property name',Identifier)                         // dto.
        var Properties = MasterRegistry[Name].Properties;
        var Index = IndexOfPropertyOfMaster(Name, Identifier);
        if (Index < Properties.length - 1) {
            var Property = Properties.splice(Index, 1)[0];
            Properties.splice(Index + 1, 0, Property);
        }
    }
    WAT.movePropertyOfMasterDown = movePropertyOfMasterDown;
    /**** movePropertyOfMasterToBottom ****/
    function movePropertyOfMasterToBottom(Name, Identifier) {
        //  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
        //  expectIdentifier('property name',Identifier)                         // dto.
        var Properties = MasterRegistry[Name].Properties;
        var Index = IndexOfPropertyOfMaster(Name, Identifier);
        if (Index < Properties.length - 1) {
            var Property = Properties.splice(Index, 1)[0];
            Properties.push(Property);
        }
    }
    WAT.movePropertyOfMasterToBottom = movePropertyOfMasterToBottom;
    /**** movePropertyOfMasterTo ****/
    function movePropertyOfMasterTo(Name, Identifier, newIndex) {
        //  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
        //  expectIdentifier('property name',Identifier)                         // dto.
        expectOrdinal('property index', newIndex);
        var oldIndex = IndexOfPropertyOfMaster(Name, Identifier);
        if (oldIndex < 0)
            throwError('NoSuchProperty: a property with the name ' + quoted(Identifier) + ' ' +
                'does not exist');
        if (oldIndex === newIndex) {
            return;
        }
        var Properties = MasterRegistry[Name].Properties;
        var Property = Properties.splice(oldIndex, 1)[0];
        Properties.splice(newIndex, 0, Property);
    }
    WAT.movePropertyOfMasterTo = movePropertyOfMasterTo;
    /**** removePropertyOfMaster ****/
    function removePropertyOfMaster(Name, Identifier) {
        //  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
        //  expectIdentifier('property name',Identifier)                         // dto.
        var Index = IndexOfPropertyOfMaster(Name, Identifier);
        if (Index >= 0) {
            var Properties = MasterRegistry[Name].Properties;
            Properties.splice(Index, 1);
            if (Properties.length === 0) {
                delete MasterRegistry[Name].Properties;
            }
        }
    }
    WAT.removePropertyOfMaster = removePropertyOfMaster;
    /**** ErrorInfoOfMaster ****/
    function ErrorInfoOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return MasterInfo.ErrorInfo;
    }
    WAT.ErrorInfoOfMaster = ErrorInfoOfMaster;
    /**** UsageCountOfMaster ****/
    function UsageCountOfMaster(Name) {
        var MasterInfo = existingInfoForMaster(Name);
        return MasterInfo.UsageCount;
    }
    WAT.UsageCountOfMaster = UsageCountOfMaster;
    /**** allMastersInDocument ****/
    function allMastersInDocument() {
        var MasterSet = Object.create(null);
        forEach(document.head.querySelectorAll('script[type="application/wat-master"]'), function (ScriptElement) {
            try {
                var MasterInfo = MasterInfoFromElement(ScriptElement);
                var MasterName = MasterInfo.Name;
                if (ValueIsName(MasterName) && (MasterName in MasterRegistry)) {
                    MasterSet[MasterName] = MasterName;
                }
            }
            catch (Signal) { /* nop - has already be reported */ }
        });
        var MasterList = [];
        for (var Master in MasterSet) {
            MasterList.push(Master);
        }
        return MasterList;
    }
    /**** Masters ****/
    function Masters() {
        var Result = [];
        for (var Master in MasterRegistry) {
            Result.push(Master);
        }
        return Result;
    }
    WAT.Masters = Masters;
    /**** instantiableMasters - i.e., all without Applet masters ****/
    function instantiableMasters() {
        var Result = [];
        for (var Master in MasterRegistry) {
            var MasterInfo = MasterRegistry[Master];
            if (MasterInfo.Category !== 'Applet') {
                Result.push(Master);
            }
        }
        return Result;
    }
    WAT.instantiableMasters = instantiableMasters;
    /**** instantiableLayerMasters ****/
    function instantiableLayerMasters() {
        var Result = [];
        for (var Master in MasterRegistry) {
            var MasterInfo = MasterRegistry[Master];
            if ((MasterInfo.Category === 'Card') ||
                (MasterInfo.Category === 'Overlay')) {
                Result.push(Master);
            }
        }
        return Result;
    }
    WAT.instantiableLayerMasters = instantiableLayerMasters;
    /**** instantiableComponentMasters ****/
    function instantiableComponentMasters() {
        var Result = [];
        for (var Master in MasterRegistry) {
            var MasterInfo = MasterRegistry[Master];
            if ((MasterInfo.Category === 'Control') ||
                (MasterInfo.Category === 'Compound')) {
                Result.push(Master);
            }
        }
        return Result;
    }
    WAT.instantiableComponentMasters = instantiableComponentMasters;
    /**** missingMasters ****/
    function missingMasters() {
        var missingMasterSet = Object.create(null);
        forEach(document.body.querySelectorAll('.WAT[data-wat-master]'), function (Peer) {
            var Master = data(Peer, 'wat-master');
            if (ValueIsName(Master) && !(Master in MasterRegistry)) {
                missingMasterSet[Master] = Master;
            }
        });
        var missingMasterList = [];
        for (var Master in missingMasterSet) {
            missingMasterList.push(Master);
        }
        return missingMasterList;
    }
    WAT.missingMasters = missingMasters;
    /**** unusedMasters ****/
    function unusedMasters() {
        var unusedMasterList = [];
        for (var Master in MasterRegistry) {
            var MasterInfo = MasterRegistry[Master];
            if (MasterInfo.UsageCount <= 0) {
                unusedMasterList.push(Master);
            }
        }
        return unusedMasterList;
    }
    WAT.unusedMasters = unusedMasters;
    /**** MastersUsedByVisuals ****/
    function MastersUsedByVisuals(VisualList, withoutIntrinsics) {
        var MasterSet = Object.create(null);
        function collectMastersUsedByVisual(Visual) {
            MasterSet[Visual.Master] = true;
            switch (Visual.Category) {
                case 'Applet':
                    Visual.CardList.forEach(function (Card) { return collectMastersUsedByVisual(Card); })(Visual).OverlayList.forEach(function (Overlay) { return collectMastersUsedByVisual(Overlay); });
                    break;
                case 'Card':
                case 'Overlay':
                case 'Compound':
                    Visual.ComponentList.forEach(
                    // @ts-ignore Components are always Visuals
                    function (Component) { return collectMastersUsedByVisual(Component); });
            }
        }
        VisualList.forEach(function (Visual) { return collectMastersUsedByVisual(Visual); });
        if (withoutIntrinsics) {
            delete MasterSet.plainApplet;
            delete MasterSet.plainCard;
            delete MasterSet.plainOverlay;
            delete MasterSet.plainControl;
            delete MasterSet.plainCompound;
        }
        var MasterList = [];
        for (var Master in MasterSet) {
            MasterList.push(Master);
        }
        return MasterList;
    }
    WAT.MastersUsedByVisuals = MastersUsedByVisuals;
    //----------------------------------------------------------------------------//
    //                               global Visuals                               //
    //----------------------------------------------------------------------------//
    /**** globalVisualOfApplet ****/
    function globalVisualOfApplet(Applet, globalName) {
        return InternalsOfVisual(Applet).globalVisualSet[globalName];
    }
    /**** registerGlobalVisualOfApplet ****/
    function registerGlobalVisualOfApplet(Applet, Visual) {
        var globalVisualSet = InternalsOfVisual(Applet).globalVisualSet;
        var globalName = Visual.Name;
        if (globalName in globalVisualSet) {
            throwError('VisualExists: a visual with the global name "' + globalName + '" ' +
                'exists already');
        }
        globalVisualSet[globalName] = Visual;
    }
    /**** unregisterGlobalVisualOfApplet ****/
    function unregisterGlobalVisualOfApplet(Applet, Visual) {
        var globalName = Visual.Name;
        delete InternalsOfVisual(Applet).globalVisualSet[globalName];
    }
    function ReactivityContext(Applet) {
        var FunctionKeySet; // every function is associated with a unique key
        var reactiveVariableSet; // set of reactive variables & their current values
        var FunctionStack; // (reversed) stack of currently running reactive funct.s
        var FunctionVarSet; // set of reactive var.s already known for a given fct.
        var FunctionVarCount; // # of reactive var.s already known for a given fct.
        var FunctionVarList; // list of reactive var.s to be passed upon fct. call
        var VarFunctionSet; // set of functions interested in a given reactive var.
        var recalculating; // are we in the middle of a recalculation?
        var RecalculationError; // last error that occurred during recalculation
        var activeVarSet; // set of variables handled during this recalculation
        var pendingFunctionSet; // set of reactive functions yet to be (re)calculated
        var pendingFunctionList; // sorted list of reactive funct.s to be calculated
        /**** reset ****/
        function reset() {
            FunctionKeySet = new WeakMap();
            reactiveVariableSet = Object.create(null);
            FunctionStack = [];
            FunctionVarSet = new WeakMap();
            FunctionVarCount = new WeakMap();
            FunctionVarList = new WeakMap();
            VarFunctionSet = Object.create(null);
            resetCalculation();
        }
        /**** resetCalculation - done AFTER any recalculation ****/
        function resetCalculation() {
            recalculating = false;
            //  RecalculationError  = undefined                            // not in here!
            activeVarSet = Object.create(null);
            pendingFunctionSet = Object.create(null);
            pendingFunctionList = [];
        }
        /**** getReactiveVariable ****/
        function getReactiveVariable(VariableName) {
            if (FunctionStack.length > 0) {
                registerFunctionsForVariable(FunctionStack, VariableName);
            }
            if (VariableName[0] === '#') {
                var globalVisual = globalVisualOfApplet(Applet, VariableName);
                if (globalVisual != null) {
                    reactiveVariableSet[VariableName] = globalVisual.Value;
                }
            }
            return reactiveVariableSet[VariableName];
        }
        /**** setReactiveVariable ****/
        function setReactiveVariable(VariableName, newValue, definitely, wasControlValueChange) {
            if (definitely === void 0) { definitely = false; }
            var oldValue = reactiveVariableSet[VariableName];
            var equalValues = ValuesAreEqual(oldValue, newValue);
            if (equalValues && !definitely) {
                return;
            }
            if (VariableName in activeVarSet) {
                if (equalValues) {
                    return;
                }
                else {
                    throw new Error('CircularDependency: trigger variable "' + VariableName + '" ' +
                        'has been changed during an ongoing recalculation');
                }
            }
            reactiveVariableSet[VariableName] = newValue; // before Ctrl.Value is set!
            activeVarSet[VariableName] = newValue;
            if ((VariableName[0] === '#') && !wasControlValueChange) {
                var globalVisual = globalVisualOfApplet(Applet, VariableName);
                if (globalVisual != null) {
                    globalVisual.Value = newValue;
                }
            }
            extendCalculationBy(VariableName);
            if (!recalculating) {
                recalculate();
                if (RecalculationError != null) {
                    throw RecalculationError;
                }
            }
        }
        /**** clearReactiveVariable ****/
        function clearReactiveVariable(VariableName) {
            delete reactiveVariableSet[VariableName];
        }
        /**** registerReactiveFunctionOfVisual ****/
        function registerReactiveFunctionOfVisual(Visual, Handler, VarNames, toBeInvokedOnRegistration) {
            if (VarNames === void 0) { VarNames = ''; }
            if (toBeInvokedOnRegistration === void 0) { toBeInvokedOnRegistration = false; }
            var FunctionKey = FunctionKeySet.get(Handler);
            if (FunctionKey == null) {
                FunctionKey = newFunctionKey();
                FunctionKeySet.set(Handler, FunctionKey);
                var reactiveFunctionList = InternalsOfVisual(Visual).reactiveFunctionList;
                if (reactiveFunctionList == null) {
                    InternalsOfVisual(Visual).reactiveFunctionList = [Handler];
                }
                else {
                    reactiveFunctionList.push(Handler);
                }
                FunctionVarSet.set(Handler, Object.create(null));
                FunctionVarCount.set(Handler, 0);
                VarNames = VarNames.trim().replace(/\s+/g, ' ');
                if (VarNames !== '') {
                    var VarNameList = VarNames.split(' ');
                    for (var i = 0, l = VarNameList.length; i < l; i++) {
                        registerFunctionForVariable(Handler, VarNameList[i]);
                    }
                    if (!toBeInvokedOnRegistration) {
                        var VarSet = FunctionVarSet.get(Handler);
                        var VarList = [];
                        for (var VarName in VarSet) {
                            VarList.push(VarName);
                        }
                        FunctionVarList.set(Handler, VarList);
                        return;
                    }
                }
            }
            calculateReactiveFunction(Handler);
        }
        /**** unregisterReactiveFunctionOfVisual ****/
        function unregisterReactiveFunctionOfVisual(Visual, Handler) {
            var FunctionKey = FunctionKeySet.get(Handler);
            if (FunctionKey == null) {
                return;
            }
            var reactiveFunctionList = InternalsOfVisual(Visual).reactiveFunctionList;
            if (reactiveFunctionList != null) {
                var Index = reactiveFunctionList.indexOf(Handler);
                if (Index >= 0) {
                    reactiveFunctionList.splice(Index, 1);
                }
            }
            var VarSet = FunctionVarSet.get(Handler);
            for (var VarName in VarSet) {
                var FunctionSet = VarFunctionSet[VarName];
                delete FunctionSet[FunctionKey];
                if (ObjectIsEmpty(FunctionSet)) {
                    delete VarFunctionSet[VarName];
                }
            }
        }
        /**** unregisterReactiveFunctionsOfVisual ****/
        function unregisterReactiveFunctionsOfVisual(Visual) {
            var reactiveFunctionList = InternalsOfVisual(Visual).reactiveFunctionList;
            if (reactiveFunctionList != null) {
                for (var i = 0, l = reactiveFunctionList.length; i < l; i++) {
                    unregisterReactiveFunctionOfVisual(Visual, reactiveFunctionList[0] // this is not a typo!
                    );
                }
            }
        }
        /**** registerFunctionForVariable ****/
        function registerFunctionForVariable(Handler, VarName) {
            var VarSet = FunctionVarSet.get(Handler); // reference, not copy
            if (VarSet == null)
                throwError('InternalError: unregistered function');
            if (!(VarName in VarSet)) {
                VarSet[VarName] = true;
                FunctionVarCount.set(Handler, (FunctionVarCount.get(Handler) || 0) + 1);
                var FunctionSet = VarFunctionSet[VarName];
                if (FunctionSet == null) {
                    FunctionSet = VarFunctionSet[VarName] = Object.create(null);
                }
                var FunctionKey = FunctionKeySet.get(Handler);
                if (FunctionKey == null)
                    throwError('InternalError: unregistered function');
                FunctionSet[FunctionKey] = Handler;
            }
        }
        /**** registerFunctionsForVariable ****/
        function registerFunctionsForVariable(HandlerList, VarName) {
            for (var i = 0, l = HandlerList.length; i < l; i++) {
                registerFunctionForVariable(HandlerList[i], VarName);
            }
        }
        /**** extendCalculationBy ****/
        function extendCalculationBy(VarName) {
            var FunctionSet = VarFunctionSet[VarName];
            if (FunctionSet == null) {
                return;
            }
            var FunctionSetHasChanged = false;
            for (var FunctionKey in FunctionSet) {
                if (!(FunctionKey in pendingFunctionSet)) {
                    FunctionSetHasChanged = true;
                    pendingFunctionSet[FunctionKey] = FunctionSet[FunctionKey];
                }
            }
            if (!FunctionSetHasChanged) {
                return;
            }
            pendingFunctionList = [];
            for (var FunctionKey in pendingFunctionSet) {
                pendingFunctionList.push(FunctionKey);
            }
            pendingFunctionList.sort(function (FunctionKey_A, FunctionKey_B) {
                var VarCount_A = FunctionVarCount.get(pendingFunctionSet[FunctionKey_A]) || 0;
                var VarCount_B = FunctionVarCount.get(pendingFunctionSet[FunctionKey_B]) || 0;
                switch (true) {
                    case VarCount_A < VarCount_B: return -1;
                    case VarCount_A === VarCount_B: return 0;
                    default: return 1;
                }
            });
        }
        /**** recalculate ****/
        function recalculate() {
            recalculating = true;
            RecalculationError = undefined;
            while (pendingFunctionList.length > 0) {
                var FunctionKey = pendingFunctionList.shift();
                var Handler = pendingFunctionSet[FunctionKey];
                delete pendingFunctionSet[FunctionKey];
                try {
                    calculateReactiveFunction(Handler);
                }
                catch (Signal) {
                    console.error('error during automatic recalculation of reactive functions', Signal);
                    RecalculationError = Signal;
                }
            }
            resetCalculation(); // also sets recalculating = false
        }
        /**** calculateReactiveFunction ****/
        function calculateReactiveFunction(Handler) {
            var reactiveVarSet = undefined;
            var VarList = FunctionVarList.get(Handler);
            if (VarList != null) {
                reactiveVarSet = Object.create(null);
                for (var i = 0, l = VarList.length; i < l; i++) {
                    var VarName = VarList[i];
                    // @ts-ignore how can "reactiveVarSet" be null here?
                    reactiveVarSet[VarName] = reactiveVariableSet[VarName];
                }
            }
            FunctionStack.unshift(Handler);
            try {
                Handler(reactiveVarSet);
                FunctionStack.shift();
            }
            catch (Signal) {
                FunctionStack.shift();
                throw Signal;
            }
        }
        function $(Visual, firstArg, secondArg, thirdArg) {
            switch (arguments.length - 1) {
                case 0:
                    throwError('MissingArgument: reactive variable name or function expected');
                case 1:
                    if (ValueIsString(firstArg)) {
                        return getReactiveVariable(firstArg);
                    }
                    if (ValueIsFunction(firstArg)) {
                        return registerReactiveFunctionOfVisual(Visual, firstArg);
                    }
                    break;
                case 2:
                    if (ValueIsString(firstArg)) {
                        return setReactiveVariable(firstArg, secondArg, false);
                    }
                    if (ValueIsFunction(firstArg)) {
                        if (ValueIsBoolean(secondArg)) {
                            return (secondArg == true
                                ? registerReactiveFunctionOfVisual(Visual, firstArg)
                                : unregisterReactiveFunctionOfVisual(Visual, firstArg));
                        }
                        if (ValueIsString(secondArg)) {
                            return registerReactiveFunctionOfVisual(Visual, firstArg, secondArg, false);
                        }
                    }
                    break;
                case 3:
                    if (ValueIsString(firstArg) && ValueIsBoolean(thirdArg)) {
                        return setReactiveVariable(firstArg, secondArg, thirdArg);
                    }
                    if (ValueIsFunction(firstArg) && ValueIsString(secondArg) && ValueIsBoolean(thirdArg)) {
                        return registerReactiveFunctionOfVisual(Visual, firstArg, secondArg, thirdArg);
                    }
            }
            throwError('InvalidArguments: variable name (with opt. value) or function ' +
                '(with opt. variable names) expected');
        }
        reset();
        return {
            $: $, setReactiveVariable: setReactiveVariable, clearReactiveVariable: clearReactiveVariable, unregisterReactiveFunctionsOfVisual: unregisterReactiveFunctionsOfVisual
        };
    }
    /**** newFunctionKey ****/
    var KeyCounter = 0;
    function newFunctionKey() {
        KeyCounter += 1;
        return 'BRE-' + KeyCounter;
    }
    /**** make global visuals "reactive" ****/
    on(document.body, 'value-changed', undefined, function (DOMEvent) {
        var _a;
        var Origin = VisualOfElement(DOMEvent.target);
        if (Origin == null) {
            return;
        }
        var Name = Origin.Name;
        if ((Name || '')[0] === '#') {
            (_a = InternalsOfVisual(Origin.Applet).ReactivityContext) === null || _a === void 0 ? void 0 : _a.setReactiveVariable(
            // @ts-ignore always use "detail"
            Name, DOMEvent.detail, false, 'wasControlValueChange');
        }
    });
    //----------------------------------------------------------------------------//
    //                               Event Handling                               //
    //----------------------------------------------------------------------------//
    /**** ignore some events while an applet is under design ****/
    function swallowEventWhileLayouting(Event) {
        if (Designer == null) {
            return;
        }
        var AppletPeer = Event.target.closest('.WAT.Applet');
        if (AppletPeer == null) {
            return;
        }
        var Applet = VisualOfElement(AppletPeer);
        if (Applet == null) {
            return;
        }
        if (Designer.layoutsApplet(Applet)) {
            Event.stopPropagation();
            Event.preventDefault();
        }
    }
    document.body.addEventListener('mousedown', swallowEventWhileLayouting);
    document.body.addEventListener('mousemove', swallowEventWhileLayouting);
    document.body.addEventListener('mouseup', swallowEventWhileLayouting);
    document.body.addEventListener('mouseenter', swallowEventWhileLayouting);
    document.body.addEventListener('mouseleave', swallowEventWhileLayouting);
    document.body.addEventListener('keydown', swallowEventWhileLayouting);
    document.body.addEventListener('keypress', swallowEventWhileLayouting);
    document.body.addEventListener('keyup', swallowEventWhileLayouting);
    document.body.addEventListener('input', swallowEventWhileLayouting);
    document.body.addEventListener('change', swallowEventWhileLayouting);
    document.body.addEventListener('click', swallowEventWhileLayouting);
    /**** registerEventHandlerForVisual - on([TapPoint,]Event[,Selector],Handler) ****/
    function registerEventHandlerForVisual(Visual) {
        var ArgumentList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ArgumentList[_i - 1] = arguments[_i];
        }
        var TapPoint, EventName;
        var EventSelector, EventHandler;
        if (ValueIsString(ArgumentList[0]) && ArgumentList[0].startsWith('@')) {
            var TapPointSelector_1 = ArgumentList.shift().slice(1), TapElement = void 0;
            if (TapPointSelector_1[0] === '.') {
                WAT.expectName('tap point master name', TapPointSelector_1.slice(1));
                TapElement = closestParent(Visual.Peer, '.WAT' + TapPointSelector_1);
            }
            else {
                WAT.expectUniversalName('tap point name', TapPointSelector_1);
                TapElement = closestFilteredParent(Visual.Peer, '.WAT', function (Peer) { return (VisualOfElement(Peer).Name === TapPointSelector_1); });
            }
            if (TapElement != null) {
                TapPoint = VisualOfElement(TapElement);
            }
        }
        else {
            TapPoint = Visual;
        }
        EventName = WAT.expectedName('event name', ArgumentList.shift());
        EventSelector = (ValueIsString(ArgumentList[0]) ? ArgumentList.shift() : undefined);
        EventHandler = expectedFunction('event handler', ArgumentList.shift());
        /**** ignore registration if no matching tap point exists ****/
        if (TapPoint == null) {
            return;
        }
        /**** provide the "actual" event handler for the configured situation ****/
        var actualHandler = function actualEventHandler() {
            var ArgumentList = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                ArgumentList[_i] = arguments[_i];
            }
            var Event = ArgumentList[0];
            if ((Designer != null) && Designer.layoutsApplet(Visual.Applet)) {
                Event.stopPropagation();
                Event.preventDefault();
                return;
            } // no event handling for "applets under design"
            if ((TapPoint === Visual) && (EventSelector == null)) {
                if (Event.target !== Visual.Peer) {
                    return;
                }
            } // ignore "inner events" if no selector is given
            EventHandler.apply(Visual, ArgumentList);
        };
        /**** register event handler at tap point ****/
        var Internals = InternalsForVisual.get(Visual);
        var EventHandlers = Internals.EventHandlers;
        if (EventHandlers == null) {
            Internals.EventHandlers = EventHandlers = [];
        }
        for (var i = 0, l = EventHandlers.length; i < l; i++) {
            var Candidate = EventHandlers[i];
            if ((Candidate.TapPoint === TapPoint) && (Candidate.EventSelector === EventSelector) &&
                (Candidate.EventName === EventName) && (Candidate.EventHandler === EventHandler)) {
                return;
            } // handler has already been registered
        }
        EventHandlers.push({
            TapPoint: TapPoint, EventName: EventName, EventSelector: EventSelector, EventHandler: EventHandler, actualHandler: actualHandler
        }); // n.b.: a missing selector is specified as "null"!
        if (EventSelector == null) {
            TapPoint.Peer.on(EventName, actualHandler);
        }
        else {
            TapPoint.Peer.on(EventName, EventSelector, actualHandler);
        }
    }
    /**** unregisterEventHandlerForVisual - off([TapPoint,]Event[,Selector],Handler) ****/
    function unregisterEventHandlerForVisual(Visual) {
        var ArgumentList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ArgumentList[_i - 1] = arguments[_i];
        }
        var TapPoint, EventName, EventSelector, EventHandler;
        if (ValueIsString(ArgumentList[0]) && ArgumentList[0].startsWith('@')) {
            var TapPointSelector_2 = ArgumentList.shift().slice(1), TapElement = void 0;
            if (TapPointSelector_2[0] === '.') {
                WAT.expectName('tap point master name', TapPointSelector_2.slice(1));
                TapElement = closestParent(Visual.Peer, '.WAT' + TapPointSelector_2);
            }
            else {
                WAT.expectUniversalName('tap point name', TapPointSelector_2);
                TapElement = closestFilteredParent(Visual.Peer, '.WAT', function (Peer) { return (VisualOfElement(Peer).Name === TapPointSelector_2); });
            }
            if (TapElement != null) {
                TapPoint = VisualOfElement(TapElement);
            }
        }
        else {
            TapPoint = Visual;
        }
        EventName = WAT.allowedName('event name', ArgumentList.shift());
        EventSelector = (ValueIsString(ArgumentList[0]) ? ArgumentList.shift() : null);
        EventHandler = allowedFunction('event handler', ArgumentList.shift());
        /**** perform deregistration ****/
        if (TapPoint == null) {
            return;
        }
        var Internals = InternalsForVisual.get(Visual);
        var EventHandlers = Internals.EventHandlers;
        if (EventHandlers == null) {
            return;
        }
        for (var i = EventHandlers.length - 1; i >= 0; i--) {
            var Candidate = EventHandlers[i];
            if ((Candidate.TapPoint === TapPoint) &&
                ((EventName == null) || (Candidate.EventName === EventName)) &&
                (Candidate.EventSelector === EventSelector) && // even for missing ones
                ((EventHandler == null) || (Candidate.EventHandler === EventHandler))) {
                var actualHandler = Candidate.actualHandler;
                if (Candidate.EventSelector == null) {
                    TapPoint.Peer.off(Candidate.EventName, actualHandler);
                }
                else {
                    TapPoint.Peer.off(Candidate.EventName, Candidate.EventSelector, actualHandler);
                }
                EventHandlers.splice(i, 1);
            }
        }
        if (EventHandlers.length === 0) {
            delete Internals.EventHandlers;
        }
    }
    /**** unregisterAllEventHandlersForVisual ****/
    function unregisterAllEventHandlersForVisual(Visual) {
        var Internals = InternalsForVisual.get(Visual);
        var EventHandlers = Internals.EventHandlers;
        if (EventHandlers == null) {
            return;
        }
        for (var i = 0, l = EventHandlers.length; i < l; i++) {
            var _a = EventHandlers[i], TapPoint = _a[0], EventName = _a[1], EventSelector = _a[2], actualHandler = _a[3];
            if (EventSelector == null) {
                TapPoint.Peer.off(EventName, actualHandler);
            }
            else {
                TapPoint.Peer.off(EventName, EventSelector, actualHandler);
            }
        }
        delete Internals.EventHandlers;
    }
    /**** triggerEventFromVisual - trigger([InjectPoint,]Event[,...]) ****/
    function triggerEventFromVisual(Visual) {
        var ArgumentList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ArgumentList[_i - 1] = arguments[_i];
        }
        var InjectionPoint;
        if (ValueIsString(ArgumentList[0]) && ArgumentList[0].startsWith('@')) {
            var InjectionPointSelector_1 = ArgumentList.shift().slice(1), InjectionElement = void 0;
            if (InjectionPointSelector_1[0] === '.') {
                WAT.expectName('injection point master name', InjectionPointSelector_1.slice(1));
                InjectionElement = closestParent(Visual.Peer, '.WAT' + InjectionPointSelector_1);
            }
            else {
                WAT.expectUniversalName('injection point name', InjectionPointSelector_1);
                InjectionElement = closestFilteredParent(Visual.Peer, '.WAT', function (Peer) { return (VisualOfElement(Peer).Name === InjectionPointSelector_1); });
            }
            if (InjectionElement != null) {
                InjectionPoint = VisualOfElement(InjectionElement);
            }
        }
        else {
            InjectionPoint = Visual;
        }
        if (InjectionPoint != null) {
            var EventName = ArgumentList.shift();
            InjectionPoint.Peer.trigger(EventName, ArgumentList);
        }
    }
    /**** [set]ErrorInfoOfVisual ****/
    function ErrorInfoOfVisual(Visual) {
        return InternalsOfVisual(Visual).ErrorInfo;
    }
    function setErrorInfoOfVisual(Visual, newErrorInfo) {
        var Internals = InternalsOfVisual(Visual);
        if (newErrorInfo == null) {
            delete Internals.ErrorInfo;
            remove(filtered(Internals.Peer.children, '.WAT-ErrorIndicator'));
        }
        else {
            if (Internals.ErrorInfo == null) { // don't overwrite an existing error
                Internals.ErrorInfo = newErrorInfo;
                remove(filtered(Internals.Peer.children, '.WAT-ErrorIndicator'));
                Internals.Peer.appendChild(ElementFromHTML('<button class="WAT-ErrorIndicator"></button>'));
            }
        }
    }
    /**** install event handler for Error Indicators ****/
    function installEventHandlerForErrorIndicators() {
        off(document, 'click', '.WAT-ErrorIndicator');
        on(document, 'click', '.WAT-ErrorIndicator', function (DOMEvent) {
            var ErrorIndicator = DOMEvent.target;
            var affectedVisual = VisualOfElement(ErrorIndicator === null || ErrorIndicator === void 0 ? void 0 : ErrorIndicator.closest('.WAT'));
            if (affectedVisual == null) {
                alert('WAT Error\n\nCould not find Visual for this Error Indicator');
                return;
            }
            var ErrorInfo = ErrorInfoOfVisual(affectedVisual);
            if (ErrorInfo != null) {
                if ((Designer != null) && affectedVisual.Applet.mayBeDesigned) {
                    if (window.confirm(ErrorInfo.Title + '\n\n' + ErrorInfo.longMessage +
                        (ErrorInfo.Reason != null ? '\n\nReason:\n' + ErrorInfo.Reason : '') +
                        '\n\nDo you want to proceed to the Designer?')) {
                        Designer.startDesigning(ErrorInfo.Sufferer, ErrorInfo.Property);
                    }
                }
                else {
                    window.alert(ErrorInfo.Title + '\n\n' + ErrorInfo.longMessage +
                        (ErrorInfo.Reason != null ? '\n\nReason:\n' + ErrorInfo.Reason : ''));
                }
            }
        });
    }
    /**** firstAppletInDocument (used for errors in masters) ****/
    function firstAppletInDocument() {
        var firstAppletPeer = AppletPeersInDocument()[0];
        return VisualOfElement(firstAppletPeer);
    }
    /**** VisualWithUniqueId ****/
    var VisualRegistry = Object.create(null);
    /**** VisualOfElement (internal function w/o validation) ****/
    var VisualForDOMElement = new WeakMap(); // DOM element -> visual
    function VisualOfElement(Element) {
        return (Element == null ? undefined : VisualForDOMElement.get(Element));
    }
    /**** VisualForElement (public version w/ validation) ****/
    function VisualForElement(Element) {
        WAT.expectElement('element', Element);
        var Candidate = VisualForDOMElement.get(Element);
        if (Candidate != null) {
            return Candidate;
        }
        Candidate = Element.closest('.WAT');
        return (Candidate == null ? undefined : VisualForDOMElement.get(Candidate));
    }
    WAT.VisualForElement = VisualForElement;
    var InternalsForVisual = new WeakMap(); // visual -> internals
    function InternalsOfVisual(Visual) {
        return InternalsForVisual.get(Visual);
    }
    /**** PeerOfVisual ****/
    function PeerOfVisual(Visual) {
        return InternalsForVisual.get(Visual).Peer;
    }
    /**** AppletOfPeer ****/
    function AppletOfPeer(Peer) {
        var Candidate = Peer.closest('.WAT.Applet');
        return (Candidate == null ? undefined : VisualOfElement(Candidate));
    }
    /**** CategoryOfPeer ****/
    function CategoryOfPeer(Peer, DefaultCategory) {
        switch (true) {
            case Peer.classList.contains('Applet'): return 'Applet';
            case Peer.classList.contains('Card'): return 'Card';
            case Peer.classList.contains('Overlay'): return 'Overlay';
            case Peer.classList.contains('Control'): return 'Control';
            case Peer.classList.contains('Compound'): return 'Compound';
            default: switch (DefaultCategory) {
                case 'Applet': return 'Applet';
                case 'Layer': return 'Card';
                case 'Card': return 'Card';
                case 'Overlay': return 'Overlay';
                case 'Component': return (filtered(Peer.children, '.WAT.Control,.WAT.Compound').length > 0
                    ? 'Compound'
                    : 'Control');
                case 'Control': return 'Control';
                case 'Compound': return 'Compound';
                default: throwError('BrokenVisual: cannot determine category of given visual');
            }
        }
    }
    /**** VersionOfPeer ****/
    function VersionOfPeer(Peer) {
        var Candidate = data(Peer, 'wat-master-version');
        return (ValueIsSemVer(Candidate) ? parsedVersion(Candidate) : undefined);
    }
    /**** MasterOfPeer ****/
    function MasterOfPeer(Peer, Category) {
        var Candidate = data(Peer, 'wat-master');
        if (ValueIsName(Candidate)) {
            return Candidate;
        }
        else {
            return (Category == null ? 'plainVisual' : 'plain' + Category);
        }
    }
    /**** NameOfPeer ****/
    function NameOfPeer(Peer) {
        var Candidate = data(Peer, 'wat-name');
        return (ValueIsUniversalName(Candidate) ? Candidate : undefined);
    }
    /**** ScriptOfPeer ****/
    function ScriptOfPeer(Peer) {
        var Candidate = data(Peer, 'wat-script');
        return (ValueIsText(Candidate) ? Candidate : undefined);
    }
    /**** StateOfPeer ****/
    function StateOfPeer(Peer) {
        var Candidate = data(Peer, 'wat-state');
        if (Candidate == null) {
            return null;
        }
        try {
            return JSON.parse(Candidate);
        }
        catch (Signal) {
            return null;
        }
    }
    /**** VisualBuiltFromPeer - extremely forgiving (not to break an applet) ****/
    function VisualBuiltFromPeer(Peer, allowedCategory) {
        var Category = CategoryOfPeer(Peer, allowedCategory);
        if (CategoryContradictsExpectation(Category, allowedCategory)) {
            var originalCategory = Category;
            switch (allowedCategory) {
                case 'Layer':
                    Category = 'Card';
                    break;
                case 'Component': Category = (filtered(Peer.children, '.WAT.Control,.WAT.Compound').length > 0
                    ? 'Compound'
                    : 'Control');
                default: Category = allowedCategory;
            }
            var Visual_1 = VisualOfCategory(Category, Peer);
            var Applet_1 = AppletOfPeer(Peer);
            if (Applet_1 != null) {
                setErrorInfoOfVisual(Visual_1, {
                    Title: 'Inappropriate Category',
                    longMessage: 'This visual belongs to category ' +
                        quoted(originalCategory) + ', which is not allowed here',
                    shortMessage: 'inappropriate category ' + quoted(originalCategory),
                    Applet: Applet_1,
                    Sufferer: Visual_1,
                    Property: 'Category'
                });
                buildInnerVisuals();
            }
            return Visual_1;
        }
        function buildInnerVisuals() {
            switch (Category) {
                case 'Applet':
                    filtered(Peer.children, '.WAT.Card,.WAT.Overlay').forEach(function (Peer) {
                        buildVisualFromPeer(Peer, 'Layer');
                    });
                    break;
                case 'Card':
                case 'Overlay':
                case 'Compound':
                    filtered(Peer.children, '.WAT.Control,.WAT.Compound').forEach(function (Peer) {
                        buildVisualFromPeer(Peer, 'Component');
                    });
            }
        }
        var Visual = VisualOfCategory(Category, Peer);
        var Applet = AppletOfPeer(Peer);
        if (Applet != null) {
            var Master = MasterOfPeer(Peer, Category);
            var MasterInfo = MasterRegistry[Master];
            if (MasterInfo == null) {
                setErrorInfoOfVisual(Visual, {
                    Title: 'No such Master',
                    longMessage: 'A visual master called ' + quoted(Master) + ' is not ' +
                        'available',
                    shortMessage: 'unknown master ' + quoted(Master),
                    Applet: Applet,
                    Sufferer: Visual,
                    Property: 'Master'
                });
                buildInnerVisuals();
                return Visual;
            }
            var Classes = MasterInfo.Classes;
            if (Classes != null) {
                Classes.forEach(function (Class) { Peer.classList.add(Class); });
            }
            if (MasterInfo.Category !== Category) {
                setErrorInfoOfVisual(Visual, {
                    Title: 'Inappropriate Master',
                    longMessage: 'Master ' + quoted(Master) + ' is not foreseen for ' +
                        'category ' + quoted(Category),
                    shortMessage: 'inappropriate master ' + quoted(Master),
                    Applet: Applet,
                    Sufferer: Visual,
                    Property: 'Master'
                });
                buildInnerVisuals();
                return Visual;
            }
            var Version_1 = VersionOfPeer(Peer);
            if ((Version_1 != null) && !VersionAmatchesB(Version_1, MasterInfo.Version)) {
                setErrorInfoOfVisual(Visual, {
                    Title: 'Inappropriate Version',
                    longMessage: 'This visual requires a different version of master ' +
                        quoted(Master) + ' than available',
                    shortMessage: 'inappropriate master ' + quoted(Master),
                    Applet: Applet,
                    Sufferer: Visual,
                    Property: 'Version'
                });
                buildInnerVisuals();
                return Visual;
            }
            if (MasterInfo.ErrorInfo != null) {
                setErrorInfoOfVisual(Visual, MasterInfo.ErrorInfo);
                buildInnerVisuals();
                return Visual;
            }
            if (Category === 'Applet') { // every applet must always contain >= 1 cards
                if (filtered(Peer.children, '.WAT.Card').length === 0) {
                    Peer.insertBefore(ElementFromHTML('<div class="WAT Card" data-wat-master="plainCard" style="visibility:visible"></div>'), Peer.firstChild);
                }
            }
            var Name = NameOfPeer(Peer);
            if ((Name != null) && (Name[0] === '#')) {
                try {
                    registerGlobalVisualOfApplet(Applet, Visual);
                }
                catch (Signal) {
                    setErrorInfoOfVisual(Visual, {
                        Title: 'Global name Collision',
                        longMessage: 'The global name of this visual ' + quoted(Name) + ' ' +
                            'has already been used',
                        shortMessage: 'global name collision ' + quoted(Name),
                        Applet: Applet,
                        Sufferer: Visual,
                        Property: 'Name'
                    });
                    buildInnerVisuals();
                    return Visual;
                }
            }
            var State = StateOfPeer(Peer);
            if (State != null) {
                InternalsOfVisual(Visual).State = State;
            }
            var VisualScript = ScriptOfPeer(Peer);
            if ((MasterInfo.compiledScript != null) || (VisualScript != null)) {
                var toGet = definePropertyGetterForVisual.bind(null, Visual);
                var toSet = definePropertySetterForVisual.bind(null, Visual);
                var on_1 = registerEventHandlerForVisual.bind(null, Visual);
                var off_1 = unregisterEventHandlerForVisual.bind(null, Visual);
                var trigger_1 = triggerEventFromVisual.bind(null, Visual);
                var Reactivity = function () {
                    var _a;
                    var ArgumentList = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        ArgumentList[_i] = arguments[_i];
                    }
                    ArgumentList.unshift(Visual);
                    return (_a = InternalsOfVisual(Applet).ReactivityContext) === null || _a === void 0 ? void 0 : _a.$.apply(
                    // @ts-ignore don't worry about number of arguments
                    null, ArgumentList // since number of arguments is important
                    );
                };
                if (MasterInfo.compiledScript != null) {
                    try {
                        MasterInfo.compiledScript.call(Visual, toGet, toSet, on_1, off_1, trigger_1, Reactivity);
                    }
                    catch (Signal) {
                        setErrorInfoOfVisual(Visual, {
                            Title: 'Execution Error in Master Script',
                            longMessage: 'The script of master ' + quoted(Master) + ' could ' +
                                'not be applied to this visual',
                            shortMessage: Signal.message,
                            Reason: Signal,
                            Applet: Applet,
                            Sufferer: Visual,
                            Property: 'Master'
                        });
                        buildInnerVisuals();
                        return Visual;
                    }
                }
                var compiledScript = void 0;
                if (VisualScript != null) {
                    try {
                        compiledScript = new Function('toGet', 'toSet', 'on', 'off', 'trigger', '$', VisualScript);
                    }
                    catch (Signal) {
                        setErrorInfoOfVisual(Visual, {
                            Title: 'Compilation Error',
                            longMessage: 'The script of this visual could not be compiled',
                            shortMessage: Signal.message,
                            Reason: Signal,
                            Applet: Applet,
                            Sufferer: Visual,
                            Property: 'Script'
                        });
                        buildInnerVisuals();
                        return Visual;
                    }
                    try {
                        compiledScript.call(Visual, toGet, toSet, on_1, off_1, trigger_1, Reactivity);
                    }
                    catch (Signal) {
                        setErrorInfoOfVisual(Visual, {
                            Title: 'Execution Error in Visual Script',
                            longMessage: 'The script of this visual failed',
                            shortMessage: Signal.message,
                            Reason: Signal,
                            Applet: Applet,
                            Sufferer: Visual,
                            Property: 'Script'
                        });
                        buildInnerVisuals();
                        return Visual;
                    }
                }
            }
            buildInnerVisuals();
        }
        return Visual;
    }
    /**** buildVisualFromPeer ****/
    function buildVisualFromPeer(Peer, allowedCategory) {
        VisualBuiltFromPeer(Peer, allowedCategory);
    }
    /**** VisualOfCategory - for creating new or refreshing existing visuals ****/
    var uniqueIdCounter = 0;
    function VisualOfCategory(Category, Peer) {
        var uniqueId;
        var oldVisual = VisualForDOMElement.get(Peer);
        if (oldVisual == null) { // deserialization
            var serializedId = attr(Peer, 'data-wat-unique-id');
            if (serializedId != null) {
                var newId = parseInt(serializedId, 10);
                if (ValueIsOrdinal(newId) &&
                    (newId < uniqueIdCounter) &&
                    (VisualRegistry[newId] == null)) {
                    uniqueId = newId;
                }
                attr(Peer, 'data-wat-unique-id', undefined);
            }
        }
        else { // refresh
            uniqueId = InternalsForVisual.get(oldVisual).uniqueId;
        }
        if (uniqueId == null) {
            uniqueId = newUniqueId();
        }
        var newVisual;
        switch (Category) {
            case 'Applet':
                newVisual = new WAT_Applet();
                break;
            case 'Card':
                newVisual = new WAT_Card();
                break;
            case 'Overlay':
                newVisual = new WAT_Overlay();
                break;
            case 'Control':
                newVisual = new WAT_Control();
                break;
            case 'Compound':
                newVisual = new WAT_Compound();
                break;
            default: throwError('InternalError: unforeseen visual category');
        }
        VisualForDOMElement.set(Peer, newVisual);
        VisualRegistry[uniqueId] = newVisual;
        Peer.classList.add('WAT', Category);
        InternalsForVisual.set(newVisual, { uniqueId: uniqueId, Peer: Peer });
        if (Category === 'Applet') {
            var Internals = InternalsForVisual.get(newVisual);
            Internals.globalVisualSet = Object.create(null);
            Internals.ReactivityContext = ReactivityContext(newVisual);
        }
        return newVisual;
    }
    /**** newUniqueId ****/
    function newUniqueId() {
        return ++uniqueIdCounter;
    }
    WAT.newUniqueId = newUniqueId;
    /**** CategoryContradictsExpectation ****/
    function CategoryContradictsExpectation(Category, allowedCategory) {
        switch (allowedCategory) {
            case 'Applet': return (Category !== 'Applet');
            case 'Layer': return (Category !== 'Card') && (Category !== 'Overlay');
            case 'Card': return (Category !== 'Card');
            case 'Overlay': return (Category !== 'Overlay');
            case 'Component': return (Category !== 'Control') && (Category !== 'Compound');
            case 'Control': return (Category !== 'Control');
            case 'Compound': return (Category !== 'Compound');
            default: throwError('InternalError: unforeseen visual category');
        }
    }
    /**** applyStyleToVisual ****/
    function applyStyleToVisual(Visual, StyleName, StyleValue) {
        var MasterInfo = MasterRegistry[Visual.Master];
        if (((MasterInfo === null || MasterInfo === void 0 ? void 0 : MasterInfo.Styles) != null) && (StyleName in MasterInfo.Styles)) {
            var MasterStyle = MasterInfo.Styles[StyleName];
            if (MasterStyle === 'initial') {
                return;
            }
            else {
                StyleValue = MasterStyle;
            }
        }
        css(PeerOfVisual(Visual), StyleName, StyleValue);
    }
    /**** applyStylesToVisual ****/
    function applyStylesToVisual(Visual, StyleSet) {
        var newStyleSet = undefined;
        var MasterInfo = MasterRegistry[Visual.Master];
        if ((MasterInfo === null || MasterInfo === void 0 ? void 0 : MasterInfo.Styles) == null) {
            for (var StyleName in StyleSet) {
                if (StyleSet.hasOwnProperty(StyleName) &&
                    (StyleSet[StyleName] !== null)) {
                    if (newStyleSet == null) {
                        newStyleSet = {};
                    }
                    newStyleSet[StyleName] = StyleSet[StyleName];
                }
            }
        }
        else {
            var MasterStyles = MasterInfo.Styles;
            for (var StyleName in StyleSet) {
                if (StyleSet.hasOwnProperty(StyleName) && !(StyleName in MasterStyles)) {
                    if (newStyleSet == null) {
                        newStyleSet = {};
                    }
                    newStyleSet[StyleName] = StyleSet[StyleName];
                }
            }
        }
        if (newStyleSet != null) {
            for (var StyleName in newStyleSet) {
                if (newStyleSet.hasOwnProperty(StyleName)) {
                    css(PeerOfVisual(Visual), StyleName, newStyleSet[StyleName]);
                }
            }
        }
    }
    /**** refreshVisual ****/
    function refreshVisual(Visual, oldMaster) {
        var Peer = Visual.Peer; // Peer remains the same, but Visual changes
        if (oldMaster != null) {
            MasterOfPeer(Peer); // new Visual will use this master
            Peer.data('wat-master', oldMaster); // but the current one still uses this
        }
        Visual.trigger('prepare-refresh'); // still using the current master
        releaseVisual(Visual); // NOT recursively!
        buildVisualFromPeer(Peer, Visual.Category); // may throw!
    }
    /**** releaseVisual ****/
    function releaseVisual(Visual, recursively) {
        var _a;
        unregisterAllEventHandlersForVisual(Visual);
        var uniqueId = Visual.uniqueId;
        if (ValueIsOrdinal(uniqueId)) {
            delete VisualRegistry[uniqueId]; // n.b.: "Internals.uniqueId" remains!
        } // (i.e.: after "refresh", uniqueId is restored)
        var Name = Visual.Name;
        if ((Name != null) && (Name[0] === '#')) {
            unregisterGlobalVisualOfApplet(Visual.Applet, Visual);
        }
        (_a = InternalsOfVisual(Visual.Applet).ReactivityContext) === null || _a === void 0 ? void 0 : _a.unregisterReactiveFunctionsOfVisual(Visual);
        if (recursively) {
            filtered(Visual.Peer.children, '.WAT.Card,.WAT.Overlay,.WAT.Compound,.WAT.Control').forEach(function (Peer) { releaseVisual(VisualOfElement(Peer), recursively); });
        }
    }
    //----------------------------------------------------------------------------//
    //                                 WAT_Visual                                 //
    //----------------------------------------------------------------------------//
    var WAT_Visual = /** @class */ (function () {
        function WAT_Visual() {
        }
        Object.defineProperty(WAT_Visual.prototype, "uniqueId", {
            /**** uniqueId ****/
            get: function () { return InternalsOfVisual(this).uniqueId; },
            set: function (newId) {
                expectOrdinal('new unique id', newId);
                var uniqueId = InternalsOfVisual(this).uniqueId;
                switch (true) {
                    case (newId === uniqueId):
                        return;
                    case (newId > uniqueIdCounter): throwError('InvalidArgument: forbidden id value given');
                    case (VisualRegistry[newId] != null): throwError('InvalidArgument: the given id is not unique');
                }
                delete VisualRegistry[uniqueId];
                VisualRegistry[newId] = this;
                InternalsOfVisual(this).uniqueId = newId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Peer", {
            /**** Peer ****/
            get: function () { return InternalsOfVisual(this).Peer; },
            set: function (newPeer) { throwReadOnlyError('Peer'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "isAttached", {
            /**** isAttached ****/
            get: function () {
                return document.body.contains(InternalsOfVisual(this).Peer);
            },
            set: function (newAttachment) { throwReadOnlyError('isAttached'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Id", {
            /**** Id ****/
            get: function () {
                var Candidate = attr(PeerOfVisual(this), 'id');
                return (ValueIsId(Candidate) ? Candidate : undefined);
            },
            set: function (newId) {
                WAT.allowId('id', newId);
                var Peer = PeerOfVisual(this);
                var oldId = attr(Peer, 'id');
                if (newId == oldId) {
                    return;
                }
                if (newId == null) {
                    attr(Peer, 'id', undefined);
                }
                else {
                    if (document.getElementById(newId) == null) {
                        attr(Peer, 'id', newId);
                    }
                    else {
                        throwError('InvalidArgument: the given HTML id is not unique');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Name", {
            /**** Name ****/
            get: function () {
                var Candidate = data(PeerOfVisual(this), 'wat-name');
                return (ValueIsUniversalName(Candidate) ? Candidate : undefined);
            },
            set: function (newName) {
                var _a, _b, _c, _d;
                WAT.allowUniversalName('name', newName);
                var Peer = PeerOfVisual(this);
                var oldName = data(Peer, 'wat-name');
                if (newName == oldName) {
                    return;
                }
                var Applet = this.Applet;
                if (oldName.startsWith('#')) {
                    unregisterGlobalVisualOfApplet(Applet, oldName);
                    (_b = (_a = InternalsOfVisual(this.Applet)) === null || _a === void 0 ? void 0 : _a.ReactivityContext) === null || _b === void 0 ? void 0 : _b.clearReactiveVariable(oldName);
                }
                data(Peer, 'wat-name', newName || undefined);
                if (newName.startsWith('#')) {
                    registerGlobalVisualOfApplet(Applet, this);
                    (_d = (_c = InternalsOfVisual(this.Applet)) === null || _c === void 0 ? void 0 : _c.ReactivityContext) === null || _d === void 0 ? void 0 : _d.setReactiveVariable(newName, this.Value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Label", {
            /**** Label ****/
            get: function () {
                var Candidate = data(PeerOfVisual(this), 'wat-label');
                return (ValueIsLabel(Candidate) ? Candidate : undefined);
            },
            set: function (newLabel) {
                WAT.allowLabel('label', newLabel);
                data(PeerOfVisual(this), 'wat-label', newLabel || undefined);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Category", {
            /**** Category ****/
            get: function () {
                var Peer = PeerOfVisual(this);
                switch (true) {
                    case Peer.classList.contains('Applet'): return 'Applet';
                    case Peer.classList.contains('Card'): return 'Card';
                    case Peer.classList.contains('Overlay'): return 'Overlay';
                    case Peer.classList.contains('Control'): return 'Control';
                    case Peer.classList.contains('Compound'): return 'Compound';
                    default: throwError('BrokenVisual: cannot determine category of given visual');
                }
            },
            set: function (newCategory) { throwReadOnlyError('Category'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Master", {
            /**** Master ****/
            get: function () {
                var Peer = PeerOfVisual(this);
                var Master = data(Peer, 'wat-master');
                if (ValueIsName(Master)) {
                    return Master; // independent of whether master exists or not
                }
                else {
                    throwError('InvalidVisual: the given visual does not have a master');
                }
            },
            set: function (newMaster) {
                WAT.allowName('master', newMaster);
                if (newMaster == null) {
                    newMaster = 'plain' + this.Category;
                }
                else {
                    var MasterInfo = MasterRegistry[newMaster];
                    if ((MasterInfo != null) && (MasterInfo.Category !== this.Category))
                        throwError('InvalidArgument: the given master is not made for visuals of type ' +
                            quoted(this.Category));
                }
                var Peer = PeerOfVisual(this);
                var oldMaster = data(Peer, 'wat-master');
                if (newMaster == oldMaster) {
                    return;
                }
                data(Peer, 'wat-master', newMaster);
                refreshVisual(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "ErrorInfo", {
            /**** ErrorInfo ****/
            get: function () { return ErrorInfoOfVisual(this); },
            set: function (newErrorInfo) { throwReadOnlyError('ErrorInfo'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Container", {
            /**** Container ****/
            get: function () {
                var ContainerPeer = closestParent(PeerOfVisual(this), '.WAT.Card,.WAT.Overlay,.WAT.Compound');
                return (ContainerPeer == null
                    ? undefined
                    : VisualOfElement(ContainerPeer));
            },
            set: function (newContainer) { throwReadOnlyError('Container'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Layer", {
            /**** Layer ****/
            get: function () {
                var LayerPeer = PeerOfVisual(this).closest('.WAT.Card,.WAT.Overlay'); // no typo!
                return (LayerPeer == null
                    ? undefined
                    : VisualOfElement(LayerPeer));
            },
            set: function (newLayer) { throwReadOnlyError('Layer'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Applet", {
            /**** Applet ****/
            get: function () {
                var AppletPeer = PeerOfVisual(this).closest('.WAT.Applet'); // no typo!
                return (AppletPeer == null
                    ? undefined
                    : VisualOfElement(AppletPeer));
            },
            set: function (newApplet) { throwReadOnlyError('Applet'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "mayBeDesigned", {
            /**** mayBeDesigned ****/
            get: function () {
                return (this.Peer.data('wat-designability') !== 'false');
            },
            set: function (newDesignability) {
                expectBoolean('designability', newDesignability);
                this.Peer.data('wat-designability', newDesignability === false ? 'false' : null);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "mayBeDeleted", {
            /**** mayBeDeleted ****/
            get: function () {
                return (this.Peer.data('wat-deletability') !== 'false');
            },
            set: function (newDeletability) {
                expectBoolean('deletability', newDeletability);
                this.Peer.data('wat-deletability', newDeletability === false ? 'false' : null);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "isVisible", {
            /**** isVisible ****/
            get: function () {
                return (css(this.Peer, 'visibility') !== 'hidden');
            },
            set: function (newVisibility) {
                expectBoolean('visibility', newVisibility);
                applyStyleToVisual(this, 'visibility', newVisibility === true ? 'visible' : 'hidden');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "isShown", {
            /**** isShown ****/
            get: function () {
                var Peer = this.Peer;
                if (!document.body.contains(Peer)) {
                    return false;
                }
                while (Peer !== document.body) {
                    if ((css(Peer, 'display') === 'none') ||
                        (css(Peer, 'visibility') === 'hidden')) {
                        return false;
                    }
                    Peer = Peer.parentElement;
                }
                return true;
            },
            set: function (newEmergence) { throwReadOnlyError('isShown'); },
            enumerable: false,
            configurable: true
        });
        /**** show/hide ****/
        WAT_Visual.prototype.show = function () { this.isVisible = true; };
        WAT_Visual.prototype.hide = function () { this.isVisible = false; };
        Object.defineProperty(WAT_Visual.prototype, "isEnabled", {
            /**** isEnabled ****/
            get: function () {
                return !this.Peer.disabled;
            },
            set: function (newEnabling) {
                expectBoolean('enabling', newEnabling);
                this.Peer.disabled = !newEnabling;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "isDisabled", {
            /**** isDisabled ****/
            get: function () {
                return this.Peer.disabled;
            },
            set: function (newDisabling) {
                expectBoolean('disabling', newDisabling);
                this.Peer.disabled = newDisabling;
            },
            enumerable: false,
            configurable: true
        });
        /**** enable/disable ****/
        WAT_Visual.prototype.enable = function () { this.isEnabled = false; };
        WAT_Visual.prototype.disable = function () { this.isEnabled = true; };
        Object.defineProperty(WAT_Visual.prototype, "PropertySet", {
            /**** PropertySet ****/
            get: function () {
                var PropertySet = Object.create(null);
                var MasterInfo = MasterRegistry[this.Master];
                if (MasterInfo == null) {
                    return PropertySet;
                }
                var Properties = MasterInfo.Properties;
                if (Properties == null) {
                    return PropertySet;
                }
                for (var i = 0, l = Properties.length; i < l; i++) {
                    var Property = Properties[i];
                    PropertySet[Property.Identifier] = Object.assign(Object.create(null), Property);
                    if (Property.ValueList != null) {
                        PropertySet[Property.Identifier].ValueList = Property.ValueList.slice();
                    }
                }
                return PropertySet;
            },
            set: function (newPropertySet) { throwReadOnlyError('PropertySet'); },
            enumerable: false,
            configurable: true
        });
        /**** PropertyMayBeDesigned - a method especially for the Designer ****/
        WAT_Visual.prototype.PropertyMayBeDesigned = function (PropertyName) {
            WAT.expectIdentifier('property name', PropertyName);
            var MasterInfo = MasterRegistry[this.Master];
            return (((MasterInfo === null || MasterInfo === void 0 ? void 0 : MasterInfo.undesignablePropertySet) == null) ||
                !(PropertyName in MasterInfo.undesignablePropertySet));
        };
        Object.defineProperty(WAT_Visual.prototype, "State", {
            /**** State ****/
            get: function () { return InternalsOfVisual(this).State; },
            set: function (newState) {
                if (newState == null) {
                    delete InternalsOfVisual(this).State;
                }
                else {
                    InternalsOfVisual(this).State = newState;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Value", {
            /**** Value (default implementation, may be overwritten) ****/
            get: function () {
                var State = InternalsOfVisual(this).State;
                return (State == null ? undefined : State.Value);
            },
            set: function (newValue) {
                var State = InternalsOfVisual(this).State;
                if (newValue == null) {
                    if (State != null) {
                        delete State.Value;
                    }
                }
                else {
                    if (State == null) {
                        State = InternalsOfVisual(this).State = {};
                    }
                    State.Value = newValue;
                }
                this.trigger('value-changed', newValue); // finally also triggers reactivity
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Script", {
            /**** Script ****/
            get: function () { return this.Peer.data('wat-script'); },
            set: function (newScript) { throwReadOnlyError('Script'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "pendingScript", {
            /**** pendingScript ****/
            get: function () { return this.Peer.data('wat-pending-script'); },
            set: function (newPendingScript) {
                allowText('script', newPendingScript);
                this.Peer.data('wat-pending-script', (newPendingScript || '').trim() === '' ? null : newPendingScript);
            },
            enumerable: false,
            configurable: true
        });
        /**** activatePendingScript ****/
        WAT_Visual.prototype.activatePendingScript = function () {
            this.clearPendingScriptError();
            var Internals = InternalsOfVisual(this);
            var pendingScript = this.pendingScript;
            if (pendingScript == null) {
                if ((this.Script || '').trim() !== '') {
                    this.Peer.data('wat-script', null);
                    refreshVisual(this); // serialization still done by old script!
                }
            }
            else {
                var pendingScriptError = void 0;
                try { // just compile in order to check for errors
                    var compiledScript = new Function('toGet', 'toSet', 'on', 'off', 'trigger', '$', pendingScript);
                }
                catch (Signal) {
                    pendingScriptError = {
                        Title: 'Compilation Error',
                        longMessage: 'pending visual script could not be compiled',
                        shortMessage: Signal.message,
                        Reason: Signal,
                        Applet: this.Applet,
                        Sufferer: this,
                        Property: 'pendingScript'
                    };
                    Internals.pendingScriptError = pendingScriptError;
                }
                if (pendingScriptError == null) {
                    this.Peer.data('wat-script', pendingScript);
                    this.Peer.data('wat-pending-script', null);
                    refreshVisual(this); // serialization still done by old script!
                }
            }
        };
        Object.defineProperty(WAT_Visual.prototype, "pendingScriptError", {
            /**** activeScript ****/
            get: function () { return InternalsOfVisual(this).pendingScriptError; },
            set: function (newError) { throwReadOnlyError('pendingScriptError'); },
            enumerable: false,
            configurable: true
        });
        /**** clearPendingScriptError ****/
        WAT_Visual.prototype.clearPendingScriptError = function () {
            delete InternalsOfVisual(this).pendingScriptError;
        };
        Object.defineProperty(WAT_Visual.prototype, "Classes", {
            /**** Classes ****/
            get: function () {
                var ClassNameList = this.Peer.classList.slice();
                return ClassNameList.sort().join(' ');
            },
            set: function (newClasses) {
                allowString('class list', newClasses); // a better test follows in a moment
                var newClassNameList = newClasses.trim().replace(/\s+/g, ' ').split(' ');
                for (var i = 0, l = newClassNameList.length; i < l; i++) {
                    var ClassName = newClassNameList[i];
                    if (!ValueIsName(ClassName)) {
                        throwError('InvalidArgument: invalid class name ' + quoted(ClassName) + ' given');
                    }
                }
                var ClassNameSet = KeySetOf(newClassNameList);
                ClassNameSet['WAT'] = true;
                ClassNameSet[this.Category] = true;
                var MasterInfo = MasterRegistry[this.Master];
                if ((MasterInfo === null || MasterInfo === void 0 ? void 0 : MasterInfo.Classes) != null) {
                    MasterInfo.Classes.forEach(function (ClassName) { return ClassNameSet[ClassName] = true; });
                }
                var ClassNameList = [];
                for (var ClassName in ClassNameSet) {
                    ClassNameList.push(ClassName);
                }
                this.Peer.className = ClassNameList.join(' ');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "TabIndex", {
            /**** TabIndex ****/
            get: function () {
                var rawValue = attr(this.Peer, 'tabindex');
                return (rawValue == null ? undefined : parseInt(rawValue, 10));
            },
            set: function (newTabIndex) {
                allowIntegerInRange('tab index', newTabIndex, -1, 32767);
                attr(this.Peer, 'tabindex', newTabIndex + '');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "PointerSensitivity", {
            /**** PointerSensitivity ****/
            get: function () {
                return (css(this.Peer, 'pointer-events') !== 'none');
            },
            set: function (newPointerSensitivity) {
                expectBoolean('pointer sensitivity', newPointerSensitivity);
                applyStyleToVisual(this, 'pointer-events', (newPointerSensitivity === true ? 'auto' : 'none'));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Overflows", {
            /**** Overflows ****/
            get: function () {
                function normalizedOverflow(Overflow) {
                    switch (Overflow) {
                        case 'visible':
                        case 'hidden':
                        case 'scroll':
                        case 'auto':
                            return Overflow;
                        case 'clip':
                            return 'hidden';
                        case 'overlay':
                        default:
                            return 'auto';
                    }
                }
                var Overflows = css(this.Peer, 'overflow').split(' ');
                var horizontalOverflow = normalizedOverflow(Overflows[0]);
                var verticalOverflow = normalizedOverflow(Overflows[1] || horizontalOverflow);
                return [horizontalOverflow, verticalOverflow];
            },
            set: function (newOverflows) {
                allowArray('list of overflow settings', newOverflows);
                if (newOverflows != null) {
                    expectOneOf('horizontal overflow', newOverflows[0], WAT.WAT_Overflows);
                    expectOneOf('vertical overflow', newOverflows[1], WAT.WAT_Overflows);
                }
                if (newOverflows == null) {
                    applyStyleToVisual(this, 'overflow', null);
                }
                else {
                    applyStyleToVisual(this, 'overflow', newOverflows.join(' '));
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "TextOverflow", {
            /**** TextOverflow ****/
            get: function () {
                return (css(this.Peer, 'text-overflow') === 'clip' ? 'clip' : 'ellipsis');
            },
            set: function (newTextOverflow) {
                allowOneOf('text overflow', newTextOverflow, WAT.WAT_TextOverflows);
                applyStyleToVisual(this, 'text-overflow', newTextOverflow);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Opacity", {
            /**** Opacity ****/
            get: function () {
                return Math.round(100 * parseFloat(css(this.Peer, 'opacity')));
            },
            set: function (newOpacity) {
                allowNumberInRange('opacity', newOpacity, 0, 1);
                applyStyleToVisual(this, 'opacity', Math.round(newOpacity) + '%');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "x", {
            /**** x ****/
            get: function () { return GeometryOfVisual(this).x; },
            set: function (newX) {
                WAT.expectLocation('x coordinate', newX);
                changeGeometryOfVisualTo(this, newX, undefined, undefined, undefined);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "y", {
            /**** y ****/
            get: function () { return GeometryOfVisual(this).y; },
            set: function (newY) {
                WAT.expectLocation('y coordinate', newY);
                changeGeometryOfVisualTo(this, undefined, newY, undefined, undefined);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Width", {
            /**** Width ****/
            get: function () { return GeometryOfVisual(this).Width; },
            set: function (newWidth) {
                WAT.expectDimension('width', newWidth);
                changeGeometryOfVisualTo(this, undefined, undefined, newWidth, undefined);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Height", {
            /**** Height ****/
            get: function () { return GeometryOfVisual(this).Height; },
            set: function (newHeight) {
                WAT.expectDimension('height', newHeight);
                changeGeometryOfVisualTo(this, undefined, undefined, undefined, newHeight);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Position", {
            /**** Position ****/
            get: function () {
                var Geometry = GeometryOfVisual(this);
                return { x: Geometry.x, y: Geometry.y };
            },
            set: function (newPosition) {
                expectPlainObject('position', newPosition);
                WAT.expectLocation('x coordinate', newPosition.x);
                WAT.expectLocation('y coordinate', newPosition.y);
                changeGeometryOfVisualTo(this, newPosition.x, newPosition.y, undefined, undefined);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Size", {
            /**** Size ****/
            get: function () {
                var Geometry = GeometryOfVisual(this);
                return { Width: Geometry.Width, Height: Geometry.Height };
            },
            set: function (newSize) {
                expectPlainObject('size', newSize);
                WAT.expectDimension('width', newSize.Width);
                WAT.expectDimension('height', newSize.Height);
                changeGeometryOfVisualTo(this, undefined, undefined, newSize.Width, newSize.Height);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Geometry", {
            /**** Geometry ****/
            get: function () { return GeometryOfVisual(this); },
            set: function (newGeometry) {
                expectObject('visual geometry', newGeometry);
                WAT.expectLocation('x coordinate', newGeometry.x);
                WAT.expectLocation('y coordinate', newGeometry.y);
                WAT.expectDimension('width', newGeometry.Width);
                WAT.expectDimension('height', newGeometry.Height);
                changeGeometryOfVisualTo(this, newGeometry.x, newGeometry.y, newGeometry.Width, newGeometry.Height);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "GeometryOnDisplay", {
            /**** GeometryOnDisplay ****/
            get: function () { return GeometryOfVisualOnDisplay(this); },
            set: function (newGeometry) { throwReadOnlyError('GeometryOnDisplay'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "horizontalAnchoring", {
            /**** horizontalAnchoring ****/
            get: function () { return horizontalAnchoringOfVisual(this); },
            set: function (newAnchoring) {
                expectOneOf('horizontal anchoring', newAnchoring, WAT.WAT_horizontalAnchorings);
                changeHorizontalAnchoringOfVisualTo(this, newAnchoring);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "verticalAnchoring", {
            /**** verticalAnchoring ****/
            get: function () { return verticalAnchoringOfVisual(this); },
            set: function (newAnchoring) {
                expectOneOf('vertical anchoring', newAnchoring, WAT.WAT_verticalAnchorings);
                changeVerticalAnchoringOfVisualTo(this, newAnchoring);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "horizontalOffsets", {
            /**** horizontalOffsets ****/
            get: function () { return horizontalOffsetsOfVisual(this); },
            set: function (newOffsets) {
                switch (horizontalAnchoringOfVisual(this)) {
                    case 'left-width':
                        WAT.allowLocation('"left" offset', newOffsets[0]);
                        WAT.allowDimension('"width" offset', newOffsets[1]);
                        break;
                    case 'width-right':
                        WAT.allowDimension('"width" offset', newOffsets[0]);
                        WAT.allowLocation('"right" offset', newOffsets[1]);
                        break;
                    case 'left-right':
                        WAT.allowLocation('"left" offset', newOffsets[0]);
                        WAT.allowLocation('"right" offset', newOffsets[1]);
                }
                changeHorizontalOffsetsOfVisualTo(this, newOffsets);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "verticalOffsets", {
            /**** verticalOffsets ****/
            get: function () { return verticalOffsetsOfVisual(this); },
            set: function (newOffsets) {
                switch (verticalAnchoringOfVisual(this)) {
                    case 'top-height':
                        WAT.allowLocation('"top" offset', newOffsets[0]);
                        WAT.allowDimension('"height" offset', newOffsets[1]);
                        break;
                    case 'height-bottom':
                        WAT.allowDimension('"height" offset', newOffsets[0]);
                        WAT.allowLocation('"bottom" offset', newOffsets[1]);
                        break;
                    case 'top-bottom':
                        WAT.allowLocation('"top" offset', newOffsets[0]);
                        WAT.allowLocation('"bottom" offset', newOffsets[1]);
                }
                changeVerticalOffsetsOfVisualTo(this, newOffsets);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "minWidth", {
            /**** min/maxWidth ****/
            get: function () {
                return parseFloat(css(this.Peer, 'min-width'));
            },
            set: function (newMinimum) {
                WAT.allowDimension('minimal width', newMinimum);
                applyStyleToVisual(this, 'min-width', Math.round(newMinimum) + 'px');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "maxWidth", {
            get: function () {
                var maxWidth = css(this.Peer, 'max-width');
                return (maxWidth === 'none' ? Infinity : parseFloat(maxWidth));
            },
            set: function (newMaximum) {
                WAT.allowDimension('maximal width', newMaximum);
                if (newMaximum === Infinity) {
                    applyStyleToVisual(this, 'max-width', 'none');
                }
                else {
                    applyStyleToVisual(this, 'max-width', Math.round(newMaximum) + 'px');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "minHeight", {
            /**** min/maxHeight ****/
            get: function () {
                return parseFloat(css(this.Peer, 'min-height'));
            },
            set: function (newMinimum) {
                WAT.allowDimension('minimal height', newMinimum);
                applyStyleToVisual(this, 'min-height', Math.round(newMinimum) + 'px');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "maxHeight", {
            get: function () {
                var maxHeight = css(this.Peer, 'max-height');
                return (maxHeight === 'none' ? Infinity : parseFloat(maxHeight));
            },
            set: function (newMaximum) {
                WAT.allowDimension('maximal height', newMaximum);
                if (newMaximum === Infinity) {
                    applyStyleToVisual(this, 'max-height', 'none');
                }
                else {
                    applyStyleToVisual(this, 'max-height', Math.round(newMaximum) + 'px');
                }
            },
            enumerable: false,
            configurable: true
        });
        /**** coversPointOnDisplay ****/
        WAT_Visual.prototype.coversPointOnDisplay = function (xOnDisplay, yOnDisplay) {
            WAT.expectLocation('x coordinate', xOnDisplay);
            WAT.expectLocation('y coordinate', yOnDisplay);
            var GeometryOnDisplay = this.GeometryOnDisplay;
            return ((xOnDisplay >= GeometryOnDisplay.x) &&
                (xOnDisplay < GeometryOnDisplay.x + GeometryOnDisplay.Width) &&
                (yOnDisplay >= GeometryOnDisplay.y) &&
                (yOnDisplay < GeometryOnDisplay.y + GeometryOnDisplay.Height));
        };
        Object.defineProperty(WAT_Visual.prototype, "FontFamily", {
            /**** FontFamily ****/
            get: function () {
                return css(this.Peer, 'font-family');
            },
            set: function (newFontFamily) {
                allowTextline('font family', newFontFamily);
                applyStyleToVisual(this, 'font-family', newFontFamily);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "FontSize", {
            /**** FontSize ****/
            get: function () {
                return parseFloat(css(this.Peer, 'font-size'));
            },
            set: function (newFontSize) {
                WAT.allowDimension('font size', newFontSize);
                applyStyleToVisual(this, 'font-size', newFontSize == null ? null : Math.round(newFontSize) + 'px');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "FontWeight", {
            /**** FontWeight ****/
            get: function () {
                var FontWeight = css(this.Peer, 'font-weight');
                switch (FontWeight) {
                    case 'lighter':
                    case 'normal':
                    case 'bolder':
                    case 'bold':
                        return FontWeight;
                    default:
                        var BoldnessIndex = Math.max(1, Math.min(9, Math.round(parseFloat(FontWeight) / 100))) - 1;
                        return WAT.WAT_FontWeights[BoldnessIndex];
                }
            },
            set: function (newFontWeight) {
                allowOneOf('font weight', newFontWeight, WAT.WAT_FontWeights);
                switch (newFontWeight) {
                    case null:
                    case undefined:
                        applyStyleToVisual(this, 'font-weight', null);
                        break;
                    case 'lighter':
                    case 'normal':
                    case 'bolder':
                    case 'bold':
                        applyStyleToVisual(this, 'font-weight', newFontWeight);
                        break;
                    default:
                        applyStyleToVisual(this, 'font-weight', WAT_FontWeightValues[newFontWeight]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "FontStyle", {
            /**** FontStyle ****/
            get: function () {
                var FontStyle = css(this.Peer, 'font-style');
                switch (FontStyle) {
                    case 'normal':
                    case 'italic':
                        return FontStyle;
                    default:
                        return (FontStyle.startsWith('oblique') ? 'italic' : 'normal');
                }
            },
            set: function (newFontStyle) {
                allowOneOf('font weight', newFontStyle, WAT.WAT_FontStyles);
                applyStyleToVisual(this, 'font-style', newFontStyle);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "LineHeight", {
            /**** LineHeight ****/
            get: function () {
                var LineHeight = css(this.Peer, 'line-height');
                switch (true) {
                    case (LineHeight === 'normal'):
                        return Math.round(this.FontSize * 1.5);
                    case (LineHeight.indexOf('%') > 0):
                        return Math.round(this.FontSize * 100 * parseFloat(LineHeight));
                    default:
                        return parseFloat(LineHeight);
                }
            },
            set: function (newLineHeight) {
                WAT.allowDimension('line height', newLineHeight);
                applyStyleToVisual(this, 'line-height', newLineHeight == null ? null : Math.round(newLineHeight) + 'px');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "TextDecoration", {
            /**** TextDecoration ****/
            get: function () {
                var _a = window.getComputedStyle(this.Peer), textDecorationColor = _a.textDecorationColor, textDecorationLine = _a.textDecorationLine, textDecorationStyle = _a.textDecorationStyle, 
                // @ts-ignore
                textDecorationThickness = _a.textDecorationThickness;
                if ((textDecorationLine === 'none') ||
                    !ValueIsOneOf(textDecorationLine, WAT.WAT_TextDecorationLines)) {
                    return { Line: 'none' };
                }
                else {
                    var Thickness = parseFloat(textDecorationThickness);
                    return {
                        Line: textDecorationLine,
                        Color: HexColor(textDecorationColor || '#000000'),
                        Style: ValueIsOneOf(textDecorationStyle, WAT.WAT_TextDecorationStyles) ? textDecorationStyle : 'solid',
                        Thickness: isNaN(Thickness) ? 1 : Math.round(Thickness)
                    };
                }
            },
            set: function (newTextDecoration) {
                allowPlainObject('text decoration', newTextDecoration);
                if (newTextDecoration != null) {
                    expectOneOf('text decoration shape', newTextDecoration.Line, WAT.WAT_TextDecorationLines);
                    allowColor('text decoration color', newTextDecoration.Color);
                    expectOneOf('text decoration style', newTextDecoration.Style, WAT.WAT_TextDecorationStyles);
                    WAT.allowDimension('text decoration thickness', newTextDecoration.Thickness);
                }
                if (newTextDecoration == null) {
                    applyStylesToVisual(this, {
                        'text-decoration-color': undefined,
                        'text-decoration-line': undefined,
                        'text-decoration-style': undefined,
                        'text-decoration-thickness': undefined
                    });
                }
                else {
                    if (newTextDecoration.Line === 'none') {
                        applyStyleToVisual(this, 'text-decoration-line', 'none');
                    }
                    else {
                        applyStylesToVisual(this, {
                            'text-decoration-color': (newTextDecoration.Color == null
                                ? 'currentColor'
                                : shortHexColor(HexColor(newTextDecoration.Color))),
                            'text-decoration-line': newTextDecoration.Line,
                            'text-decoration-style': newTextDecoration.Style,
                            'text-decoration-thickness': (newTextDecoration.Thickness == null
                                ? 'from-font'
                                : Math.round(newTextDecoration.Thickness) + 'px')
                        });
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "TextShadow", {
            /**** TextShadow ****/
            get: function () {
                var TextShadow = css(this.Peer, 'text-shadow');
                if (TextShadow === 'none') {
                    return { xOffset: 0, yOffset: 0, BlurRadius: 0, Color: '#00000000' };
                }
                else {
                    TextShadow = TextShadow.replace(/,.*$/, '').split(' ');
                    return {
                        xOffset: parseFloat(TextShadow[0]),
                        yOffset: parseFloat(TextShadow[1]),
                        BlurRadius: parseFloat(TextShadow[2]),
                        Color: HexColor(TextShadow[3])
                    };
                }
            },
            set: function (newTextShadow) {
                allowPlainObject('text shadow', newTextShadow);
                if (newTextShadow != null) {
                    WAT.expectLocation('text shadow x offset', newTextShadow.xOffset);
                    WAT.expectLocation('text shadow y offset', newTextShadow.yOffset);
                    WAT.expectDimension('text shadow blur radius', newTextShadow.BlurRadius);
                    expectColor('text shadow color', newTextShadow.Color);
                }
                if (newTextShadow == null) {
                    applyStyleToVisual(this, 'text-shadow', null);
                }
                else {
                    var Color = HexColor(newTextShadow.Color);
                    if (Color === '#00000000') {
                        applyStyleToVisual(this, 'text-shadow', 'none');
                    }
                    else {
                        applyStyleToVisual(this, 'text-shadow', Math.round(newTextShadow.xOffset) + 'px ' +
                            Math.round(newTextShadow.yOffset) + 'px ' +
                            Math.round(newTextShadow.BlurRadius) + 'px ' +
                            shortHexColor(Color));
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "TextAlignment", {
            /**** TextAlignment ****/
            get: function () {
                return css(this.Peer, 'text-align');
            },
            set: function (newTextAlignment) {
                allowOneOf('text alignment', newTextAlignment, WAT.WAT_TextAlignments);
                applyStyleToVisual(this, 'text-align', newTextAlignment);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "ForegroundColor", {
            /**** ForegroundColor ****/
            get: function () {
                return HexColor(css(this.Peer, 'color'));
            },
            set: function (newColor) {
                allowColor('foreground color', newColor);
                applyStyleToVisual(this, 'color', newColor == null ? null : HexColor(newColor));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Color", {
            /**** Color (just a synonym for "ForegroundColor") ****/
            get: function () { return this.ForegroundColor; },
            set: function (newColor) { this.ForegroundColor = newColor; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BackgroundColor", {
            /**** BackgroundColor ****/
            get: function () {
                return HexColor(css(this.Peer, 'background-color'));
            },
            set: function (newColor) {
                allowColor('background color', newColor);
                applyStyleToVisual(this, 'background-color', newColor == null ? null : HexColor(newColor));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BackgroundTexture", {
            /**** BackgroundTexture ****/
            get: function () {
                var _a = window.getComputedStyle(this.Peer), backgroundImage = _a.backgroundImage, backgroundPosition = _a.backgroundPosition, backgroundSize = _a.backgroundSize, backgroundRepeat = _a.backgroundRepeat;
                var Result = { ImageURL: '', Mode: 'normal', xOffset: 0, yOffset: 0 };
                if (backgroundImage !== 'none') {
                    Result.ImageURL = backgroundImage.slice(5, backgroundImage.length - 2);
                }
                var Positions = backgroundPosition.split(' ');
                if (Positions[0].endsWith('px')) {
                    Result.xOffset = Math.round(parseFloat(Positions[0]));
                }
                if (Positions[1].endsWith('px')) {
                    Result.yOffset = Math.round(parseFloat(Positions[1]));
                }
                if (backgroundRepeat === 'no-repeat') {
                    switch (backgroundSize) {
                        case 'contain':
                        case 'cover':
                            Result.Mode = backgroundSize;
                            break;
                        case '100% 100%':
                            Result.Mode = 'fill';
                            break;
                    }
                }
                else {
                    Result.Mode = 'tile';
                }
                return Result;
            },
            set: function (newTexture) {
                allowPlainObject('background texture', newTexture);
                if (newTexture != null) {
                    expectURL('background image url', newTexture.ImageURL);
                    expectOneOf('background image mode', newTexture.Mode, WAT.WAT_BackgroundModes);
                    WAT.expectLocation('background image x offset', newTexture.xOffset);
                    WAT.expectLocation('background image y offset', newTexture.yOffset);
                }
                if (newTexture == null) {
                    applyStylesToVisual(this, {
                        'background-image': undefined, 'background-position': undefined,
                        'background-size': undefined, 'background-repeat': undefined
                    });
                }
                else {
                    var BackgroundSize = void 0;
                    switch (newTexture.Mode) {
                        case 'contain':
                        case 'cover':
                            BackgroundSize = newTexture.Mode;
                            break;
                        case 'fill':
                            BackgroundSize = '100% 100%';
                            break;
                        case 'tile':
                            BackgroundSize = 'auto auto';
                            break;
                    }
                    applyStylesToVisual(this, {
                        'background-image': 'url("' + newTexture.ImageURL + '")',
                        'background-position': Math.round(newTexture.xOffset) + 'px ' + Math.round(newTexture.yOffset) + 'px',
                        'background-size': BackgroundSize,
                        'background-repeat': newTexture.Mode === 'tile' ? 'repeat' : 'no-repeat'
                    });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BorderWidths", {
            /**** BorderWidths ****/
            get: function () {
                var Peer = this.Peer;
                return [
                    parseFloat(css(Peer, 'border-top-width')),
                    parseFloat(css(Peer, 'border-right-width')),
                    parseFloat(css(Peer, 'border-bottom-width')),
                    parseFloat(css(Peer, 'border-left-width'))
                ];
            },
            set: function (newBorderWidths) {
                allowArray('list of border widths', newBorderWidths);
                if (newBorderWidths != null) {
                    WAT.expectDimension('top border width', newBorderWidths[0]);
                    WAT.expectDimension('right border width', newBorderWidths[1]);
                    WAT.expectDimension('bottom border width', newBorderWidths[2]);
                    WAT.expectDimension('left border width', newBorderWidths[3]);
                }
                if (newBorderWidths == null) {
                    applyStylesToVisual(this, {
                        'border-top-width': undefined,
                        'border-right-width': undefined,
                        'border-bottom-width': undefined,
                        'border-left-width': undefined
                    });
                }
                else {
                    applyStylesToVisual(this, {
                        'border-top-width': Math.round(newBorderWidths[0]) + 'px',
                        'border-right-width': Math.round(newBorderWidths[1]) + 'px',
                        'border-bottom-width': Math.round(newBorderWidths[2]) + 'px',
                        'border-left-width': Math.round(newBorderWidths[3]) + 'px'
                    });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BorderColors", {
            /**** BorderColors ****/
            get: function () {
                var Peer = this.Peer;
                return [
                    HexColor(css(Peer, 'border-top-color')),
                    HexColor(css(Peer, 'border-right-color')),
                    HexColor(css(Peer, 'border-bottom-color')),
                    HexColor(css(Peer, 'border-left-color'))
                ];
            },
            set: function (newBorderColors) {
                allowArray('list of border colors', newBorderColors);
                if (newBorderColors != null) {
                    expectColor('top border color', newBorderColors[0]);
                    expectColor('right border color', newBorderColors[1]);
                    expectColor('bottom border color', newBorderColors[2]);
                    expectColor('left border color', newBorderColors[3]);
                }
                if (newBorderColors == null) {
                    applyStylesToVisual(this, {
                        'border-top-color': undefined,
                        'border-right-color': undefined,
                        'border-bottom-color': undefined,
                        'border-left-color': undefined
                    });
                }
                else {
                    applyStylesToVisual(this, {
                        'border-top-color': newBorderColors[0],
                        'border-right-color': newBorderColors[1],
                        'border-bottom-color': newBorderColors[2],
                        'border-left-color': newBorderColors[3]
                    });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BorderStyles", {
            /**** BorderStyles ****/
            get: function () {
                function normalizedBorderStyle(Value) {
                    return (ValueIsOneOf(Value, WAT.WAT_BorderStyles) ? Value : 'none');
                }
                var Peer = this.Peer;
                return [
                    normalizedBorderStyle(css(Peer, 'border-top-style')),
                    normalizedBorderStyle(css(Peer, 'border-right-style')),
                    normalizedBorderStyle(css(Peer, 'border-bottom-style')),
                    normalizedBorderStyle(css(Peer, 'border-left-style'))
                ];
            },
            set: function (newBorderStyles) {
                allowArray('list of border styles', newBorderStyles);
                if (newBorderStyles != null) {
                    expectOneOf('top border style', newBorderStyles[0], WAT.WAT_BorderStyles);
                    expectOneOf('right border style', newBorderStyles[1], WAT.WAT_BorderStyles);
                    expectOneOf('bottom border style', newBorderStyles[2], WAT.WAT_BorderStyles);
                    expectOneOf('left border style', newBorderStyles[3], WAT.WAT_BorderStyles);
                }
                if (newBorderStyles == null) {
                    applyStylesToVisual(this, {
                        'border-top-style': undefined,
                        'border-right-style': undefined,
                        'border-bottom-style': undefined,
                        'border-left-style': undefined
                    });
                }
                else {
                    applyStylesToVisual(this, {
                        'border-top-style': newBorderStyles[0],
                        'border-right-style': newBorderStyles[1],
                        'border-bottom-style': newBorderStyles[2],
                        'border-left-style': newBorderStyles[3]
                    });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BorderRadii", {
            /**** BorderRadii ****/
            get: function () {
                var Peer = this.Peer;
                return [
                    parseFloat(css(Peer, 'border-top-left-radius')),
                    parseFloat(css(Peer, 'border-top-right-radius')),
                    parseFloat(css(Peer, 'border-bottom-right-radius')),
                    parseFloat(css(Peer, 'border-bottom-left-radius'))
                ];
            },
            set: function (newBorderRadii) {
                allowArray('list of border radii', newBorderRadii);
                if (newBorderRadii != null) {
                    WAT.expectDimension('top-left border radius', newBorderRadii[0]);
                    WAT.expectDimension('top-right border radius', newBorderRadii[1]);
                    WAT.expectDimension('bottom-right border radius', newBorderRadii[2]);
                    WAT.expectDimension('bottom-left border radius', newBorderRadii[3]);
                }
                if (newBorderRadii == null) {
                    applyStyleToVisual(this, 'border-radius', null);
                }
                else {
                    applyStylesToVisual(this, {
                        'border-top-left-radius': Math.round(newBorderRadii[0]) + 'px',
                        'border-top-right-radius': Math.round(newBorderRadii[1]) + 'px',
                        'border-bottom-right-radius': Math.round(newBorderRadii[2]) + 'px',
                        'border-bottom-left-radius': Math.round(newBorderRadii[3]) + 'px'
                    });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BoxShadow", {
            /**** BoxShadow ****/
            get: function () {
                var BoxShadow = css(this.Peer, 'box-shadow');
                if (BoxShadow === 'none') {
                    return { isInset: false, xOffset: 0, yOffset: 0, BlurRadius: 0, SpreadRadius: 0, Color: '#00000000' };
                }
                else {
                    BoxShadow = BoxShadow.replace(/,.*$/, '').split(' ');
                    var isInset = (BoxShadow[0] === 'inset');
                    if (isInset) {
                        BoxShadow.shift();
                    }
                    return {
                        isInset: isInset,
                        xOffset: parseFloat(BoxShadow[0]),
                        yOffset: parseFloat(BoxShadow[1]),
                        BlurRadius: parseFloat(BoxShadow[2]),
                        SpreadRadius: parseFloat(BoxShadow[3]),
                        Color: HexColor(BoxShadow[4])
                    };
                }
            },
            set: function (newBoxShadow) {
                allowPlainObject('box shadow', newBoxShadow);
                if (newBoxShadow != null) {
                    expectBoolean('box shadow direction', newBoxShadow.isInset);
                    WAT.expectLocation('box shadow x offset', newBoxShadow.xOffset);
                    WAT.expectLocation('box shadow y offset', newBoxShadow.yOffset);
                    WAT.expectDimension('box shadow blur radius', newBoxShadow.BlurRadius);
                    WAT.expectDimension('box shadow spread radius', newBoxShadow.SpreadRadius);
                    expectColor('box shadow color', newBoxShadow.Color);
                }
                if (newBoxShadow == null) {
                    applyStyleToVisual(this, 'box-shadow', null);
                }
                else {
                    if (HexColor(newBoxShadow.Color) === '#00000000') {
                        applyStyleToVisual(this, 'box-shadow', 'none');
                    }
                    else {
                        applyStyleToVisual(this, 'box-shadow', (newBoxShadow.isInset ? 'inset ' : '') +
                            Math.round(newBoxShadow.xOffset) + 'px ' +
                            Math.round(newBoxShadow.yOffset) + 'px ' +
                            Math.round(newBoxShadow.BlurRadius) + 'px ' +
                            Math.round(newBoxShadow.SpreadRadius) + 'px ' +
                            shortHexColor(HexColor(newBoxShadow.Color)));
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Cursor", {
            /**** Cursor ****/
            get: function () {
                var CursorSpec = css(this.Peer, 'cursor');
                return (CursorSpec.indexOf(',') > 0
                    ? CursorSpec.replace(/^.*,\s*/, '')
                    : CursorSpec);
            },
            set: function (newCursor) {
                allowOneOf('cursor', newCursor, WAT.WAT_Cursors);
                if (newCursor == null) {
                    applyStyleToVisual(this, 'cursor', null); // also clears any "customCursor"
                }
                else {
                    var CursorSpec = css(this.Peer, 'cursor');
                    var Prefix = (CursorSpec.indexOf(',') > 0
                        ? CursorSpec.replace(/,[^,]+$/, ', ')
                        : '');
                    applyStyleToVisual(this, 'cursor', Prefix + newCursor);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "customCursor", {
            /**** customCursor ****/
            get: function () {
                var Match = /^url\(([^\)])\)(\s+\d+)?(\s+\d+)?,/.exec(css(this.Peer, 'cursor'));
                if (Match == null) {
                    return undefined;
                }
                else {
                    var ImageURL = Match[1];
                    var xOffset = parseFloat(Match[2]);
                    var yOffset = parseFloat(Match[3]);
                    if ('\'"'.indexOf(ImageURL[0]) >= 0) {
                        ImageURL = ImageURL.slice(1, ImageURL.length - 1);
                    }
                    if (!ValueIsNumberInRange(xOffset, 0, 31)) {
                        xOffset = 0;
                    }
                    if (!ValueIsNumberInRange(yOffset, 0, 31)) {
                        yOffset = 0;
                    }
                    return { ImageURL: ImageURL, xOffset: xOffset, yOffset: yOffset };
                }
            },
            set: function (newCustomCursor) {
                allowPlainObject('custom cursor', newCustomCursor);
                if (newCustomCursor != null) {
                    expectURL('custom cursor image url', newCustomCursor.ImageURL);
                    expectNumberInRange('custom cursor x offset', newCustomCursor.xOffset, 0, 31);
                    expectNumberInRange('custom cursor y offset', newCustomCursor.yOffset, 0, 31);
                }
                var CursorSpec = css(this.Peer, 'cursor');
                var standardCursor = (CursorSpec.indexOf(',') > 0
                    ? CursorSpec.replace(/^.*,\s*/, '')
                    : CursorSpec);
                if (newCustomCursor == null) {
                    applyStyleToVisual(this, 'cursor', standardCursor);
                }
                else {
                    applyStyleToVisual(this, 'cursor', ('url("' + newCustomCursor.ImageURL + '") ' +
                        Math.round(newCustomCursor.xOffset) + 'px ' + Math.round(newCustomCursor.yOffset) + 'px, ' +
                        standardCursor));
                }
            },
            enumerable: false,
            configurable: true
        });
        /**** trigger ****/
        WAT_Visual.prototype.trigger = function () {
            var ArgumentList = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                ArgumentList[_i] = arguments[_i];
            }
            triggerEventFromVisual.apply(void 0, __spreadArray([this], ArgumentList));
        };
        return WAT_Visual;
    }());
    WAT.WAT_Visual = WAT_Visual;
    //----------------------------------------------------------------------------//
    //                                 WAT_Applet                                 //
    //----------------------------------------------------------------------------//
    var WAT_Applet = /** @class */ (function (_super) {
        __extends(WAT_Applet, _super);
        function WAT_Applet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(WAT_Applet.prototype, "Name", {
            /**** Name ****/
            get: function () {
                var Candidate = data(PeerOfVisual(this), 'wat-name');
                return (ValueIsUniversalName(Candidate) ? Candidate : undefined);
            },
            set: function (newName) { throwReadOnlyError('Name'); },
            enumerable: false,
            configurable: true
        });
        /**** globalVisual ****/
        WAT_Applet.prototype.globalVisual = function (globalName) {
            WAT.expectUniversalName('global visual name', globalName);
            if (globalName[0] === '#') {
                return globalVisualOfApplet(this, globalName);
            }
            else {
                throwError('InvalidArgument: the given visual name is not a global one');
            }
        };
        Object.defineProperty(WAT_Applet.prototype, "isBeingPreserved", {
            /**** isBeingPreserved ****/
            get: function () {
                return (InternalsOfVisual(this).BackupStatus === 'isBeingPreserved');
            },
            set: function (newState) { throwReadOnlyError('isBeingPreserved'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "isBeingRestored", {
            /**** isBeingRestored ****/
            get: function () {
                return (InternalsOfVisual(this).BackupStatus === 'isBeingRestored');
            },
            set: function (newState) { throwReadOnlyError('isBeingRestored'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "isBeingRemoved", {
            /**** isBeingRemoved ****/
            get: function () {
                return (InternalsOfVisual(this).BackupStatus === 'isBeingRemoved');
            },
            set: function (newState) { throwReadOnlyError('isBeingRemoved'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "CardList", {
            /**** CardList ****/
            get: function () {
                var Result = [];
                var Peer = PeerOfVisual(this);
                filtered(Peer.children, '.WAT.Card').forEach(function (Peer) {
                    Result.push(VisualOfElement(Peer));
                });
                return Result;
            },
            set: function (newCardList) { throwReadOnlyError('CardList'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "CardLabelList", {
            /**** CardLabelList ****/
            get: function () {
                var Result = [];
                var Peer = PeerOfVisual(this);
                filtered(Peer.children, '.WAT.Card').forEach(function (Peer) {
                    Result.push(VisualOfElement(Peer).Label);
                });
                return Result;
            },
            set: function (newLabelList) { throwReadOnlyError('CardLabelList'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "CardCount", {
            /**** CardCount ****/
            get: function () {
                var Peer = PeerOfVisual(this);
                return filtered(Peer.children, '.WAT.Card').length;
            },
            set: function (newCardCount) { throwReadOnlyError('CardCount'); },
            enumerable: false,
            configurable: true
        });
        /**** Card ****/
        WAT_Applet.prototype.Card = function (CardOrNameOrIndex) {
            switch (true) {
                case ValueIsCard(CardOrNameOrIndex): return (CardOrNameOrIndex.Applet === this
                    ? CardOrNameOrIndex
                    : undefined);
                case ValueIsOrdinal(CardOrNameOrIndex):
                    return this.CardAtIndex(CardOrNameOrIndex);
                case ValueIsName(CardOrNameOrIndex):
                    return this.CardNamed(CardOrNameOrIndex);
                default: throwError('InvalidArgument: card, card name or card index expected');
            }
        };
        /**** CardAtIndex ****/
        WAT_Applet.prototype.CardAtIndex = function (Index) {
            expectOrdinal('card index', Index);
            return this.CardList[Index];
        };
        /**** CardNamed ****/
        WAT_Applet.prototype.CardNamed = function (Name) {
            WAT.expectName('card name', Name);
            var Result = undefined;
            var Peer = this.Peer;
            filtered(Peer.children, '.WAT.Card').forEach(function (Peer) {
                var Candidate = VisualForElement(Peer);
                if (Candidate.Name === Name) {
                    Result = Candidate;
                }
            });
            return Result;
        };
        /**** CardLabelled ****/
        WAT_Applet.prototype.CardLabelled = function (Label) {
            WAT.expectLabel('card label', Label);
            var Result = undefined;
            var Peer = this.Peer;
            filtered(Peer.children, '.WAT.Card').forEach(function (Peer) {
                var Candidate = VisualForElement(Peer);
                if (Candidate.Label === Label) {
                    Result = Candidate;
                }
            });
            return Result;
        };
        /**** IndexOfCard ****/
        WAT_Applet.prototype.IndexOfCard = function (CardOrNameOrIndex) {
            var Card = this.Card(CardOrNameOrIndex);
            return (Card == null ? -1 : this.CardList.indexOf(Card));
        };
        /**** acceptsCardAt ****/
        WAT_Applet.prototype.acceptsCardAt = function (CardOrNameOrIndex, InsertionPoint) {
            var Index = this.IndexOfCard(CardOrNameOrIndex);
            if (Index >= 0) {
                return this.CardMayBeShiftedTo(Index, InsertionPoint);
            } // let "CardMayBeShiftedTo" do the validation
            Index = (InsertionPoint == null
                ? this.CardCount
                : this.IndexOfCard(InsertionPoint));
            if (Index < 0) {
                return false;
            }
            return true;
        };
        /**** acceptsNewCardAt - but only for an existing master ****/
        WAT_Applet.prototype.acceptsNewCardAt = function (Master, InsertionPoint) {
            //    expectName('master name',Master)                  // will be checked below
            var MasterInfo = existingInfoForMaster(Master);
            if (MasterInfo.Category !== 'Card') {
                return false;
            }
            var Index = (InsertionPoint == null
                ? this.CardCount
                : this.IndexOfCard(InsertionPoint));
            if (Index < 0) {
                return false;
            }
            return true;
        };
        /**** newCardInsertedAt - but only for an existing master ****/
        WAT_Applet.prototype.newCardInsertedAt = function (Master, InsertionPoint) {
            //    expectName('master name',Master)                  // will be checked below
            var MasterInfo = existingInfoForMaster(Master);
            if (MasterInfo.Category !== 'Card')
                throwError('InvalidMaster: the given master cannot be used for a (new) card');
            var Index = (InsertionPoint == null
                ? this.CardCount
                : this.IndexOfCard(InsertionPoint));
            if (Index < 0)
                throwError('InvalidArgument: the given insertion point does not exist or is not ' +
                    'part of this applet');
            return this.CardDeserializedFrom(MasterInfo.Template, Index);
        };
        /**** DuplicateOfCard ****/
        WAT_Applet.prototype.DuplicateOfCard = function (CardOrNameOrIndex) {
            var Index = this.IndexOfCard(CardOrNameOrIndex);
            if (Index < 0)
                throwError('InvalidArgument: the given card does not exist or is not part of ' +
                    'this applet');
            var CardSerialization = serializedVisual(this.CardList[Index]);
            return this.CardDeserializedFrom(CardSerialization, Index + 1);
        };
        /**** CardDeserializedFrom ****/
        WAT_Applet.prototype.CardDeserializedFrom = function (Serialization, InsertionPoint) {
            expectText('card serialization', Serialization);
            var Index = (InsertionPoint == null
                ? this.CardCount
                : this.IndexOfCard(InsertionPoint));
            if (Index < 0)
                throwError('InvalidArgument: the given insertion point does not exist or is not ' +
                    'part of this applet');
            var CardPeer = ElementFromHTML(Serialization);
            var NeighbourCard = this.CardAtIndex(Index);
            if (NeighbourCard == null) {
                this.Peer.append(CardPeer);
            }
            else {
                this.Peer.insertBefore(CardPeer, NeighbourCard.Peer);
            }
            var newCard;
            try {
                newCard = VisualBuiltFromPeer(CardPeer, 'Card');
            }
            catch (Signal) {
                remove(CardPeer);
                throw Signal;
            }
            if (!this.acceptsCardAt(newCard, Index)) {
                remove(CardPeer);
                throwError('InvalidOperation: the given serialized card must not be ' +
                    'inserted into this applet');
            }
            return newCard;
        };
        /**** CardMayBeShiftedUp/Down ****/
        WAT_Applet.prototype.CardMayBeShiftedUp = function (CardOrNameOrIndex) {
            return (this.IndexOfCard(CardOrNameOrIndex) > 0);
        };
        WAT_Applet.prototype.CardMayBeShiftedDown = function (CardOrNameOrIndex) {
            var oldIndex = this.IndexOfCard(CardOrNameOrIndex);
            return (oldIndex >= 0) && (oldIndex < this.CardCount - 1);
        };
        /**** CardMayBeShiftedTo ****/
        WAT_Applet.prototype.CardMayBeShiftedTo = function (CardOrNameOrIndex, InsertionPoint) {
            var oldIndex = this.IndexOfCard(CardOrNameOrIndex);
            var newIndex = this.IndexOfCard(InsertionPoint);
            return (oldIndex >= 0) && (newIndex >= 0) && (oldIndex !== newIndex);
        };
        /**** shiftCardUp/Down ****/
        WAT_Applet.prototype.shiftCardUp = function (CardOrNameOrIndex) {
            var _a;
            var oldIndex = this.IndexOfCard(CardOrNameOrIndex);
            if (oldIndex < 0)
                throwError('InvalidArgument: the given card does not exist or is not part of ' +
                    'this applet');
            if (oldIndex > 0) {
                var prevCard = this.CardAtIndex(oldIndex - 1);
                (_a = this.CardAtIndex(oldIndex)) === null || _a === void 0 ? void 0 : _a.Peer.insertBefore(prevCard.Peer);
            }
        };
        WAT_Applet.prototype.shiftCardDown = function (CardOrNameOrIndex) {
            var _a;
            var oldIndex = this.IndexOfCard(CardOrNameOrIndex);
            if (oldIndex < 0)
                throwError('InvalidArgument: the given card does not exist or is not part of ' +
                    'this applet');
            if (oldIndex < this.CardCount - 1) {
                var nextCard = this.CardAtIndex(oldIndex + 1);
                (_a = this.CardAtIndex(oldIndex)) === null || _a === void 0 ? void 0 : _a.Peer.insertAfter(nextCard.Peer);
            }
        };
        /**** shiftCardTo ****/
        WAT_Applet.prototype.shiftCardTo = function (CardOrNameOrIndex, InsertionPoint) {
            var oldIndex = this.IndexOfCard(CardOrNameOrIndex);
            if (oldIndex < 0)
                throwError('InvalidArgument: the given card does not exist or is not part of ' +
                    'this applet');
            var newIndex = this.IndexOfCard(InsertionPoint);
            if (newIndex < 0)
                throwError('InvalidArgument: the given insertion point does not exist or is not ' +
                    'part of this applet');
            if (oldIndex === newIndex) {
                return;
            }
            var Card = this.CardAtIndex(oldIndex);
            if (oldIndex === 0) {
                this.Peer.prepend(Card.Peer);
            }
            else {
                if (oldIndex < newIndex) {
                    newIndex += 1;
                }
                var prevCard = this.CardAtIndex(newIndex);
                if (prevCard == null) {
                    this.Peer.append(Card.Peer);
                }
                else {
                    Card.Peer.insertAfter(prevCard.Peer);
                }
            }
        };
        /**** removeCard ****/
        WAT_Applet.prototype.removeCard = function (CardOrNameOrIndex) {
            var Card = this.Card(CardOrNameOrIndex);
            if (Card == null) {
                return;
            } // this method is idempotent
            releaseVisual(Card, 'recursively');
            remove(Card.Peer);
            if (this.CardCount === 0) { // an applet should always contain >= 1 cards
                css(this.newCardInsertedAt('plainCard', 0).Peer, 'visibility', 'visible');
            }
        };
        Object.defineProperty(WAT_Applet.prototype, "shownCard", {
            /**** shownCard ****/
            get: function () {
                var CardList = this.CardList;
                for (var i = 0, l = CardList.length; i < l; i++) {
                    if (CardList[i].isVisible) {
                        return CardList[i];
                    }
                }
                if (CardList.length === 0) {
                    CardList = [this.newCardInsertedAt('plainCard', 0)];
                }
                this.showCard(CardList[0]);
                return CardList[0];
            },
            set: function (newCard) { throwReadOnlyError('shownCard'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "shownCardIndex", {
            /**** shownCardIndex ****/
            get: function () {
                var CardList = this.CardList;
                for (var i = 0, l = CardList.length; i < l; i++) {
                    if (CardList[i].isVisible) {
                        return i;
                    }
                }
                if (CardList.length === 0) {
                    CardList = [this.newCardInsertedAt('plainCard', 0)];
                }
                this.showCard(CardList[0]);
                return 0;
            },
            set: function (newIndex) { throwReadOnlyError('shownCardIndex'); },
            enumerable: false,
            configurable: true
        });
        /**** CardIsShown ****/
        WAT_Applet.prototype.CardIsShown = function (CardOrNameOrIndex) {
            var CardIndex = this.IndexOfCard(CardOrNameOrIndex);
            return (CardIndex >= 0) && this.CardAtIndex(CardIndex).isVisible;
        };
        /**** showCard ****/
        WAT_Applet.prototype.showCard = function (CardOrNameOrIndex) {
            var CardIndex = this.IndexOfCard(CardOrNameOrIndex);
            if (CardIndex < 0) {
                throwError('InvalidArgument: the given card does not exist or is not part of ' +
                    'this applet');
            }
            else {
                var CardElement_1 = PeerOfVisual(this.CardAtIndex(CardIndex));
                filtered(this.Peer.children, '.WAT.Card').forEach(function (Peer) {
                    if (Peer === CardElement_1) {
                        css(Peer, 'visibility', 'visible');
                    }
                    else {
                        css(Peer, 'visibility', 'hidden');
                    }
                });
            }
        };
        /**** showFirst/Prev/Next/LastCard ****/
        WAT_Applet.prototype.showFirstCard = function () {
            this.showCard(0);
        };
        WAT_Applet.prototype.showPrevCard = function () {
            this.showCard(Math.max(0, this.shownCardIndex - 1));
        };
        WAT_Applet.prototype.showPreviousCard = function () {
            this.showCard(Math.max(0, this.shownCardIndex - 1));
        };
        WAT_Applet.prototype.showNextCard = function () {
            this.showCard(Math.min(this.shownCardIndex + 1, this.CardCount - 1));
        };
        WAT_Applet.prototype.showLastCard = function () {
            this.showCard(this.CardCount - 1);
        };
        Object.defineProperty(WAT_Applet.prototype, "OverlayList", {
            /**** OverlayList ****/
            get: function () {
                var Result = [];
                var Peer = PeerOfVisual(this);
                filtered(Peer.children, '.WAT.Overlay').forEach(function (Peer) {
                    Result.push(VisualOfElement(Peer));
                });
                return Result;
            },
            set: function (newOverlayList) { throwReadOnlyError('OverlayList'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "OverlayLabelList", {
            /**** OverlayLabelList ****/
            get: function () {
                var Result = [];
                var Peer = PeerOfVisual(this);
                filtered(Peer.children, '.WAT.Overlay').forEach(function (Peer) {
                    Result.push(VisualOfElement(Peer).Label);
                });
                return Result;
            },
            set: function (newLabelList) { throwReadOnlyError('OverlayLabelList'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "OverlayCount", {
            /**** OverlayCount ****/
            get: function () {
                var Peer = PeerOfVisual(this);
                return filtered(Peer.children, '.WAT.Overlay').length;
            },
            set: function (newOverlayCount) { throwReadOnlyError('OverlayCount'); },
            enumerable: false,
            configurable: true
        });
        /**** Overlay ****/
        WAT_Applet.prototype.Overlay = function (OverlayOrNameOrIndex) {
            switch (true) {
                case ValueIsOverlay(OverlayOrNameOrIndex): return (OverlayOrNameOrIndex.Applet === this
                    ? OverlayOrNameOrIndex
                    : undefined);
                case ValueIsOrdinal(OverlayOrNameOrIndex):
                    return this.OverlayAtIndex(OverlayOrNameOrIndex);
                case ValueIsName(OverlayOrNameOrIndex):
                    return this.OverlayNamed(OverlayOrNameOrIndex);
                default: throwError('InvalidArgument: overlay, overlay name or overlay index expected');
            }
        };
        /**** OverlayAtIndex ****/
        WAT_Applet.prototype.OverlayAtIndex = function (Index) {
            expectOrdinal('card index', Index);
            return this.OverlayList[Index];
        };
        /**** OverlayNamed ****/
        WAT_Applet.prototype.OverlayNamed = function (Name) {
            WAT.expectName('overlay name', Name);
            var Result = undefined;
            var Peer = this.Peer;
            filtered(Peer.children, '.WAT.Overlay').forEach(function (Peer) {
                var Candidate = VisualForElement(Peer);
                if (Candidate.Name === Name) {
                    Result = Candidate;
                }
            });
            return Result;
        };
        /**** OverlayLabelled ****/
        WAT_Applet.prototype.OverlayLabelled = function (Label) {
            WAT.expectLabel('overlay label', Label);
            var Result = undefined;
            var Peer = this.Peer;
            filtered(Peer.children, '.WAT.Overlay').forEach(function (Peer) {
                var Candidate = VisualForElement(Peer);
                if (Candidate.Label === Label) {
                    Result = Candidate;
                }
            });
            return Result;
        };
        /**** IndexOfOverlay ****/
        WAT_Applet.prototype.IndexOfOverlay = function (OverlayOrNameOrIndex) {
            var Overlay = this.Overlay(OverlayOrNameOrIndex);
            return (Overlay == null ? -1 : this.OverlayList.indexOf(Overlay));
        };
        /**** acceptsOverlayAt ****/
        WAT_Applet.prototype.acceptsOverlayAt = function (OverlayOrNameOrIndex, InsertionPoint) {
            var Index = this.IndexOfOverlay(OverlayOrNameOrIndex);
            if (Index >= 0) {
                return this.OverlayMayBeShiftedTo(Index, InsertionPoint);
            } // let "OverlayMayBeShiftedTo" do the validation
            Index = (InsertionPoint == null
                ? this.OverlayCount
                : this.IndexOfOverlay(InsertionPoint));
            if (Index < 0) {
                return false;
            }
            return true;
        };
        /**** acceptsNewOverlayAt - but only for an existing master ****/
        WAT_Applet.prototype.acceptsNewOverlayAt = function (Master, InsertionPoint) {
            //    expectName('master name',Master)                  // will be checked below
            var MasterInfo = existingInfoForMaster(Master);
            if (MasterInfo.Category !== 'Overlay') {
                return false;
            }
            var Index = (InsertionPoint == null
                ? this.OverlayCount
                : this.IndexOfOverlay(InsertionPoint));
            if (Index < 0) {
                return false;
            }
            return true;
        };
        /**** newOverlayInsertedAt - but only for an existing master ****/
        WAT_Applet.prototype.newOverlayInsertedAt = function (Master, InsertionPoint) {
            //    expectName('master name',Master)                  // will be checked below
            var MasterInfo = existingInfoForMaster(Master);
            if (MasterInfo.Category !== 'Overlay')
                throwError('InvalidMaster: the given master cannot be used for a (new) overlay');
            var Index = (InsertionPoint == null
                ? this.OverlayCount
                : this.IndexOfOverlay(InsertionPoint));
            if (Index < 0)
                throwError('InvalidArgument: the given insertion point does not exist or is not ' +
                    'part of this applet');
            return this.OverlayDeserializedFrom(MasterInfo.Template, Index);
        };
        /**** DuplicateOfOverlay ****/
        WAT_Applet.prototype.DuplicateOfOverlay = function (OverlayOrNameOrIndex) {
            var Index = this.IndexOfOverlay(OverlayOrNameOrIndex);
            if (Index < 0)
                throwError('InvalidArgument: the given overlay does not exist or is not part of ' +
                    'this applet');
            var OverlaySerialization = serializedVisual(this.OverlayList[Index]);
            return this.OverlayDeserializedFrom(OverlaySerialization, Index + 1);
        };
        /**** OverlayDeserializedFrom ****/
        WAT_Applet.prototype.OverlayDeserializedFrom = function (Serialization, InsertionPoint) {
            expectText('overlay serialization', Serialization);
            var Index = (InsertionPoint == null
                ? this.OverlayCount
                : this.IndexOfOverlay(InsertionPoint));
            if (Index < 0)
                throwError('InvalidArgument: the given insertion point does not exist or is not ' +
                    'part of this applet');
            var OverlayPeer = ElementFromHTML(Serialization);
            var NeighbourOverlay = this.OverlayAtIndex(Index);
            if (NeighbourOverlay == null) {
                this.Peer.append(OverlayPeer);
            }
            else {
                this.Peer.insertBefore(OverlayPeer, NeighbourOverlay.Peer);
            }
            var newOverlay;
            try {
                newOverlay = VisualBuiltFromPeer(OverlayPeer, 'Overlay');
            }
            catch (Signal) {
                remove(OverlayPeer);
                throw Signal;
            }
            if (!this.acceptsOverlayAt(newOverlay, Index)) {
                remove(OverlayPeer);
                throwError('InvalidOperation: the given serialized overlay must not be ' +
                    'inserted into this applet');
            }
            return newOverlay;
        };
        /**** OverlayMayBeShiftedUp/Down ****/
        WAT_Applet.prototype.OverlayMayBeShiftedUp = function (OverlayOrNameOrIndex) {
            return (this.IndexOfOverlay(OverlayOrNameOrIndex) > 0);
        };
        WAT_Applet.prototype.OverlayMayBeShiftedDown = function (OverlayOrNameOrIndex) {
            var oldIndex = this.IndexOfOverlay(OverlayOrNameOrIndex);
            return (oldIndex >= 0) && (oldIndex < this.OverlayCount - 1);
        };
        /**** OverlayMayBeShiftedTo ****/
        WAT_Applet.prototype.OverlayMayBeShiftedTo = function (OverlayOrNameOrIndex, InsertionPoint) {
            var oldIndex = this.IndexOfOverlay(OverlayOrNameOrIndex);
            var newIndex = this.IndexOfOverlay(InsertionPoint);
            return (oldIndex >= 0) && (newIndex >= 0) && (oldIndex !== newIndex);
        };
        /**** shiftOverlayUp/Down ****/
        WAT_Applet.prototype.shiftOverlayUp = function (OverlayOrNameOrIndex) {
            var _a;
            var oldIndex = this.IndexOfOverlay(OverlayOrNameOrIndex);
            if (oldIndex < 0)
                throwError('InvalidArgument: the given overlay does not exist or is not part of ' +
                    'this applet');
            if (oldIndex > 0) {
                var prevOverlay = this.OverlayAtIndex(oldIndex - 1);
                (_a = this.OverlayAtIndex(oldIndex)) === null || _a === void 0 ? void 0 : _a.Peer.insertBefore(prevOverlay.Peer);
            }
        };
        WAT_Applet.prototype.shiftOverlayDown = function (OverlayOrNameOrIndex) {
            var _a;
            var oldIndex = this.IndexOfOverlay(OverlayOrNameOrIndex);
            if (oldIndex < 0)
                throwError('InvalidArgument: the given overlay does not exist or is not part of ' +
                    'this applet');
            if (oldIndex < this.OverlayCount - 1) {
                var nextOverlay = this.OverlayAtIndex(oldIndex + 1);
                (_a = this.OverlayAtIndex(oldIndex)) === null || _a === void 0 ? void 0 : _a.Peer.insertAfter(nextOverlay.Peer);
            }
        };
        /**** shiftOverlayTo ****/
        WAT_Applet.prototype.shiftOverlayTo = function (OverlayOrNameOrIndex, InsertionPoint) {
            var oldIndex = this.IndexOfOverlay(OverlayOrNameOrIndex);
            if (oldIndex < 0)
                throwError('InvalidArgument: the given overlay does not exist or is not part of ' +
                    'this applet');
            var newIndex = this.IndexOfOverlay(InsertionPoint);
            if (newIndex < 0)
                throwError('InvalidArgument: the given insertion point does not exist or is not ' +
                    'part of this applet');
            if (oldIndex === newIndex) {
                return;
            }
            var Overlay = this.OverlayAtIndex(oldIndex);
            if (oldIndex === 0) {
                this.Peer.prepend(Overlay.Peer);
            }
            else {
                if (oldIndex < newIndex) {
                    newIndex += 1;
                }
                var prevOverlay = this.OverlayAtIndex(newIndex);
                if (prevOverlay == null) {
                    this.Peer.append(Overlay.Peer);
                }
                else {
                    Overlay.Peer.insertAfter(prevOverlay.Peer);
                }
            }
        };
        /**** removeOverlay ****/
        WAT_Applet.prototype.removeOverlay = function (OverlayOrNameOrIndex) {
            var Overlay = this.Overlay(OverlayOrNameOrIndex);
            if (Overlay == null) {
                return;
            } // this method is idempotent
            releaseVisual(Overlay, 'recursively');
            remove(Overlay.Peer);
        };
        /**** frontmostOverlayOfClass ****/
        WAT_Applet.prototype.frontmostOverlayOfClass = function (ClassName) {
            WAT.expectName('HTML class name', ClassName);
            var PeerList = filtered(this.Peer.children, '.WAT.Overlay.' + ClassName);
            var Candidate = PeerList[PeerList.length - 1];
            return (Candidate == null
                ? undefined
                : VisualOfElement(Candidate));
        };
        /**** bringOverlayToFrontOfClass ****/
        WAT_Applet.prototype.bringOverlayToFrontOfClass = function (OverlayOrNameOrIndex, ClassName) {
            var _this = this;
            WAT.expectName('HTML class name', ClassName);
            var Overlay = this.Overlay(OverlayOrNameOrIndex);
            if (Overlay == null)
                throwError('InvalidArgument: the given overlay does not exist or is not part of ' +
                    'this applet');
            var OverlayPeer = Overlay.Peer;
            if (!OverlayPeer.classList.contains(ClassName))
                throwError('InvalidArgument: the given overlay does not have class ' +
                    quoted(ClassName) + ' itself');
            var OverlayFound = false;
            filtered(this.Peer.children, '.WAT.Overlay.' + ClassName).forEach(function (Peer) {
                switch (true) {
                    case (OverlayPeer === Peer):
                        OverlayFound = true;
                        break;
                    case OverlayFound: _this.Peer.insertBefore(Peer, OverlayPeer);
                } // does not touch Overlay itself (keeps menus etc. intact)
            });
        };
        return WAT_Applet;
    }(WAT_Visual));
    WAT.WAT_Applet = WAT_Applet;
    //----------------------------------------------------------------------------//
    //                               WAT_Container                                //
    //----------------------------------------------------------------------------//
    var WAT_Container = /** @class */ (function (_super) {
        __extends(WAT_Container, _super);
        function WAT_Container() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(WAT_Container.prototype, "ComponentList", {
            /**** ComponentList ****/
            get: function () {
                var Result = [];
                var Peer = PeerOfVisual(this);
                filtered(Peer.children, '.WAT.Control,.WAT.Compound').forEach(function (Peer) {
                    Result.push(VisualOfElement(Peer));
                });
                return Result;
            },
            set: function (newComponentList) { throwReadOnlyError('ComponentList'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Container.prototype, "ComponentLabelList", {
            /**** ComponentLabelList ****/
            get: function () {
                var Result = [];
                var Peer = PeerOfVisual(this);
                filtered(Peer.children, '.WAT.Control,.WAT.Compound').forEach(function (Peer) {
                    Result.push(VisualOfElement(Peer).Label);
                });
                return Result;
            },
            set: function (newLabelList) { throwReadOnlyError('ComponentLabelList'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Container.prototype, "ComponentCount", {
            /**** ComponentCount ****/
            get: function () {
                var Peer = PeerOfVisual(this);
                return filtered(Peer.children, '.WAT.Control,.WAT.Compound').length;
            },
            set: function (newComponentCount) { throwReadOnlyError('ComponentCount'); },
            enumerable: false,
            configurable: true
        });
        /**** Component ****/
        WAT_Container.prototype.Component = function (ComponentOrNameOrIndex) {
            switch (true) {
                case ValueIsControl(ComponentOrNameOrIndex): return (ComponentOrNameOrIndex.Container === this
                    ? ComponentOrNameOrIndex
                    : undefined);
                case ValueIsCompound(ComponentOrNameOrIndex): return (ComponentOrNameOrIndex.Container === this
                    ? ComponentOrNameOrIndex
                    : undefined);
                case ValueIsOrdinal(ComponentOrNameOrIndex):
                    return this.ComponentAtIndex(ComponentOrNameOrIndex);
                case ValueIsName(ComponentOrNameOrIndex):
                    return this.ComponentNamed(ComponentOrNameOrIndex);
                default: throwError('InvalidArgument: component, component name or component index expected');
            }
        };
        /**** ComponentAtIndex ****/
        WAT_Container.prototype.ComponentAtIndex = function (Index) {
            expectOrdinal('component index', Index);
            return this.ComponentList[Index];
        };
        /**** ComponentNamed ****/
        WAT_Container.prototype.ComponentNamed = function (Name) {
            WAT.expectName('component name', Name);
            var Result = undefined;
            var Peer = this.Peer;
            filtered(Peer.children, '.WAT.Control,.WAT.Compound').forEach(function (Peer) {
                var Candidate = VisualForElement(Peer);
                if (Candidate.Name === Name) {
                    Result = Candidate;
                }
            });
            return Result;
        };
        /**** ComponentLabelled ****/
        WAT_Container.prototype.ComponentLabelled = function (Label) {
            WAT.expectLabel('component label', Label);
            var Result = undefined;
            var Peer = this.Peer;
            filtered(Peer.children, '.WAT.Control,.WAT.Compound').forEach(function (Peer) {
                var Candidate = VisualForElement(Peer);
                if (Candidate.Label === Label) {
                    Result = Candidate;
                }
            });
            return Result;
        };
        /**** IndexOfComponent ****/
        WAT_Container.prototype.IndexOfComponent = function (ComponentOrNameOrIndex) {
            var Component = this.Component(ComponentOrNameOrIndex);
            return (Component == null ? -1 : this.ComponentList.indexOf(Component));
        };
        /**** acceptsComponentAt ****/
        WAT_Container.prototype.acceptsComponentAt = function (ComponentOrNameOrIndex, InsertionPoint) {
            var Index = this.IndexOfComponent(ComponentOrNameOrIndex);
            if (Index >= 0) {
                return this.ComponentMayBeShiftedTo(Index, InsertionPoint);
            } // let "ComponentMayBeShiftedTo" do the validation
            Index = (InsertionPoint == null
                ? this.ComponentCount
                : this.IndexOfComponent(InsertionPoint));
            if (Index < 0) {
                return false;
            }
            return true;
        };
        /**** acceptsNewComponentAt - but only for an existing master ****/
        WAT_Container.prototype.acceptsNewComponentAt = function (Master, InsertionPoint) {
            //    expectName('master name',Master)                  // will be checked below
            var MasterInfo = existingInfoForMaster(Master);
            if ((MasterInfo.Category !== 'Control') &&
                (MasterInfo.Category !== 'Compound')) {
                return false;
            }
            var Index = (InsertionPoint == null
                ? this.ComponentCount
                : this.IndexOfComponent(InsertionPoint));
            if (Index < 0) {
                return false;
            }
            return true;
        };
        /**** newComponentInsertedAt - but only for an existing master ****/
        WAT_Container.prototype.newComponentInsertedAt = function (Master, InsertionPoint) {
            //    expectName('master name',Master)                  // will be checked below
            var MasterInfo = existingInfoForMaster(Master);
            if ((MasterInfo.Category !== 'Control') &&
                (MasterInfo.Category !== 'Compound'))
                throwError('InvalidMaster: the given master cannot be used for a (new) component');
            var Index = (InsertionPoint == null
                ? this.ComponentCount
                : this.IndexOfComponent(InsertionPoint));
            if (Index < 0)
                throwError('InvalidArgument: the given insertion point does not exist or is not ' +
                    'part of this applet');
            return this.ComponentDeserializedFrom(MasterInfo.Template, Index);
        };
        /**** DuplicateOfComponent ****/
        WAT_Container.prototype.DuplicateOfComponent = function (ComponentOrNameOrIndex) {
            var Index = this.IndexOfComponent(ComponentOrNameOrIndex);
            if (Index < 0)
                throwError('InvalidArgument: the given component does not exist or is not part ' +
                    'of this applet');
            var ComponentSerialization = serializedVisual(this.ComponentList[Index]);
            return this.ComponentDeserializedFrom(ComponentSerialization, Index + 1);
        };
        /**** ComponentDeserializedFrom ****/
        WAT_Container.prototype.ComponentDeserializedFrom = function (Serialization, InsertionPoint) {
            expectText('component serialization', Serialization);
            var Index = (InsertionPoint == null
                ? this.ComponentCount
                : this.IndexOfComponent(InsertionPoint));
            if (Index < 0)
                throwError('InvalidArgument: the given insertion point does not exist or is not ' +
                    'part of this container');
            var ComponentPeer = ElementFromHTML(Serialization);
            var NeighbourComponent = this.ComponentAtIndex(Index);
            if (NeighbourComponent == null) {
                this.Peer.append(ComponentPeer);
            }
            else {
                this.Peer.insertBefore(ComponentPeer, NeighbourComponent.Peer);
            }
            var newComponent;
            try {
                newComponent = VisualBuiltFromPeer(ComponentPeer, 'Component');
            }
            catch (Signal) {
                remove(ComponentPeer);
                throw Signal;
            }
            if (!this.acceptsComponentAt(newComponent, Index)) {
                remove(ComponentPeer);
                throwError('InvalidOperation: the given serialized component must not be ' +
                    'inserted into this container');
            }
            return newComponent;
        };
        /**** ComponentMayBeShiftedUp/Down ****/
        WAT_Container.prototype.ComponentMayBeShiftedUp = function (ComponentOrNameOrIndex) {
            return (this.IndexOfComponent(ComponentOrNameOrIndex) > 0);
        };
        WAT_Container.prototype.ComponentMayBeShiftedDown = function (ComponentOrNameOrIndex) {
            var oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex);
            return (oldIndex >= 0) && (oldIndex < this.ComponentCount - 1);
        };
        /**** ComponentMayBeShiftedTo ****/
        WAT_Container.prototype.ComponentMayBeShiftedTo = function (ComponentOrNameOrIndex, InsertionPoint) {
            var oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex);
            var newIndex = this.IndexOfComponent(InsertionPoint);
            return (oldIndex >= 0) && (newIndex >= 0) && (oldIndex !== newIndex);
        };
        /**** shiftComponentToTop ****/
        WAT_Container.prototype.shiftComponentToTop = function (ComponentOrNameOrIndex) {
            var oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex);
            if (oldIndex < 0)
                throwError('InvalidArgument: the given component does not exist or is not part ' +
                    'of this applet');
            if (oldIndex > 0) {
                var Component = this.ComponentAtIndex(oldIndex);
                this.Peer.prepend(Component.Peer);
            }
        };
        /**** shiftComponentUp ****/
        WAT_Container.prototype.shiftComponentUp = function (ComponentOrNameOrIndex) {
            var _a;
            var oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex);
            if (oldIndex < 0)
                throwError('InvalidArgument: the given component does not exist or is not part ' +
                    'of this applet');
            if (oldIndex > 0) {
                var prevComponent = this.ComponentAtIndex(oldIndex - 1);
                (_a = this.ComponentAtIndex(oldIndex)) === null || _a === void 0 ? void 0 : _a.Peer.insertBefore(prevComponent.Peer);
            }
        };
        /**** shiftComponentDown ****/
        WAT_Container.prototype.shiftComponentDown = function (ComponentOrNameOrIndex) {
            var _a;
            var oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex);
            if (oldIndex < 0)
                throwError('InvalidArgument: the given component does not exist or is not part ' +
                    'of this applet');
            if (oldIndex < this.ComponentCount - 1) {
                var nextComponent = this.ComponentAtIndex(oldIndex + 1);
                (_a = this.ComponentAtIndex(oldIndex)) === null || _a === void 0 ? void 0 : _a.Peer.insertAfter(nextComponent.Peer);
            }
        };
        /**** shiftComponentToBottom ****/
        WAT_Container.prototype.shiftComponentToBottom = function (ComponentOrNameOrIndex) {
            var oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex);
            if (oldIndex < 0)
                throwError('InvalidArgument: the given component does not exist or is not part ' +
                    'of this applet');
            if (oldIndex < this.ComponentCount - 1) {
                var Component = this.ComponentAtIndex(oldIndex);
                this.Peer.append(Component.Peer);
            }
        };
        /**** shiftComponentTo ****/
        WAT_Container.prototype.shiftComponentTo = function (ComponentOrNameOrIndex, InsertionPoint) {
            var oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex);
            if (oldIndex < 0)
                throwError('InvalidArgument: the given component does not exist or is not part ' +
                    'of this applet');
            var newIndex = this.IndexOfComponent(InsertionPoint);
            if (newIndex < 0)
                throwError('InvalidArgument: the given insertion point does not exist or is not ' +
                    'part of this applet');
            if (oldIndex === newIndex) {
                return;
            }
            var Component = this.ComponentAtIndex(oldIndex);
            if (oldIndex === 0) {
                this.Peer.prepend(Component.Peer);
            }
            else {
                if (oldIndex < newIndex) {
                    newIndex += 1;
                }
                var prevComponent = this.ComponentAtIndex(newIndex);
                if (prevComponent == null) {
                    this.Peer.append(Component.Peer);
                }
                else {
                    this.Peer.insertAfter(Component.Peer, prevComponent.Peer);
                }
            }
        };
        /**** ComponentMayBeRemoved ****/
        WAT_Container.prototype.ComponentMayBeRemoved = function (ComponentOrNameOrIndex) {
            return (this.IndexOfComponent(ComponentOrNameOrIndex) >= 0);
        };
        /**** removeComponent ****/
        WAT_Container.prototype.removeComponent = function (ComponentOrNameOrIndex) {
            var Component = this.Component(ComponentOrNameOrIndex);
            if (Component == null) {
                return;
            } // this method is idempotent
            releaseVisual(Component, 'recursively');
            remove(Component.Peer);
        };
        return WAT_Container;
    }(WAT_Visual));
    WAT.WAT_Container = WAT_Container;
    //----------------------------------------------------------------------------//
    //                                 WAT_Layer                                  //
    //----------------------------------------------------------------------------//
    var WAT_Layer = /** @class */ (function (_super) {
        __extends(WAT_Layer, _super);
        function WAT_Layer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return WAT_Layer;
    }(WAT_Container));
    WAT.WAT_Layer = WAT_Layer;
    //----------------------------------------------------------------------------//
    //                                  WAT_Card                                  //
    //----------------------------------------------------------------------------//
    var WAT_Card = /** @class */ (function (_super) {
        __extends(WAT_Card, _super);
        function WAT_Card() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(WAT_Card.prototype, "isVisible", {
            /**** isVisible ****/
            get: function () {
                return (css(this.Peer, 'visibility') !== 'hidden');
            },
            set: function (newVisibility) {
                expectBoolean('visibility', newVisibility);
                if (newVisibility === true) {
                    this.Applet.showCard(this);
                }
                else {
                    throwError('InvalidArgument: a card cannot be explicitly hidden, please ' +
                        'select another card to be shown instead');
                }
            },
            enumerable: false,
            configurable: true
        });
        /**** show ****/
        WAT_Card.prototype.show = function () { this.isVisible = true; };
        Object.defineProperty(WAT_Card.prototype, "mayBeDisplaced", {
            /**** mayBeDisplaced ****/
            get: function () { return false; },
            set: function (newSetting) { throwReadOnlyError('mayBeDisplaced'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "mayBeDeformed", {
            /**** mayBeDeformed ****/
            get: function () { return false; },
            set: function (newSetting) { throwReadOnlyError('mayBeDeformed'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "Index", {
            /**** Index ****/
            get: function () { return this.Applet.IndexOfCard(this); },
            set: function (newIndex) { throwReadOnlyError('Index'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "mayBeShiftedUp", {
            /**** mayBeShiftedUp/Down ****/
            get: function () { return this.Applet.CardMayBeShiftedUp(this); },
            set: function (newValue) { throwReadOnlyError('mayBeShiftedUp'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "mayBeShiftedDown", {
            get: function () { return this.Applet.CardMayBeShiftedDown(this); },
            set: function (newValue) { throwReadOnlyError('mayBeShiftedDown'); },
            enumerable: false,
            configurable: true
        });
        /**** mayBeShiftedTo ****/
        WAT_Card.prototype.mayBeShiftedTo = function (InsertionPoint) {
            return this.Applet.CardMayBeShiftedTo(this, InsertionPoint);
        };
        /**** shiftUp/Down ****/
        WAT_Card.prototype.shiftUp = function () { this.Applet.shiftCardUp(this); };
        WAT_Card.prototype.shiftDown = function () { this.Applet.shiftCardDown(this); };
        /**** shiftTo ****/
        WAT_Card.prototype.shiftTo = function (InsertionPoint) {
            this.Applet.shiftCardTo(this, InsertionPoint);
        };
        Object.defineProperty(WAT_Card.prototype, "mayBeRemoved", {
            /**** mayBeRemoved ****/
            get: function () { return this.Applet.CardMayBeRemoved(this); },
            set: function (newValue) { throwReadOnlyError('mayBeRemoved'); },
            enumerable: false,
            configurable: true
        });
        /**** remove ****/
        WAT_Card.prototype.remove = function () {
            this.Applet.removeCard(this);
        };
        return WAT_Card;
    }(WAT_Layer));
    WAT.WAT_Card = WAT_Card;
    //----------------------------------------------------------------------------//
    //                                WAT_Overlay                                 //
    //----------------------------------------------------------------------------//
    var WAT_Overlay = /** @class */ (function (_super) {
        __extends(WAT_Overlay, _super);
        function WAT_Overlay() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(WAT_Overlay.prototype, "mayBeDisplaced", {
            /**** mayBeDisplaced ****/
            get: function () { return true; },
            set: function (newSetting) { throwReadOnlyError('mayBeDisplaced'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Overlay.prototype, "mayBeDeformed", {
            /**** mayBeDeformed ****/
            get: function () { return true; },
            set: function (newSetting) { throwReadOnlyError('mayBeDeformed'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Overlay.prototype, "Index", {
            /**** Index ****/
            get: function () { return this.Applet.IndexOfOverlay(this); },
            set: function (newIndex) { throwReadOnlyError('Index'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Overlay.prototype, "mayBeShiftedUp", {
            /**** mayBeShiftedUp/Down ****/
            get: function () { return this.Applet.OverlayMayBeShiftedUp(this); },
            set: function (newValue) { throwReadOnlyError('mayBeShiftedUp'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Overlay.prototype, "mayBeShiftedDown", {
            get: function () { return this.Applet.OverlayMayBeShiftedDown(this); },
            set: function (newValue) { throwReadOnlyError('mayBeShiftedDown'); },
            enumerable: false,
            configurable: true
        });
        /**** mayBeShiftedTo ****/
        WAT_Overlay.prototype.mayBeShiftedTo = function (InsertionPoint) {
            return this.Applet.OverlayMayBeShiftedTo(this, InsertionPoint);
        };
        /**** shiftUp/Down ****/
        WAT_Overlay.prototype.shiftUp = function () { this.Applet.shiftOverlayUp(this); };
        WAT_Overlay.prototype.shiftDown = function () { this.Applet.shiftOverlayDown(this); };
        /**** shiftTo ****/
        WAT_Overlay.prototype.shiftTo = function (InsertionPoint) {
            this.Applet.shiftOverlayTo(this, InsertionPoint);
        };
        Object.defineProperty(WAT_Overlay.prototype, "mayBeRemoved", {
            /**** mayBeRemoved ****/
            get: function () { return this.Applet.OverlayMayBeRemoved(this); },
            set: function (newValue) { throwReadOnlyError('mayBeRemoved'); },
            enumerable: false,
            configurable: true
        });
        /**** remove ****/
        WAT_Overlay.prototype.remove = function () {
            this.Applet.removeOverlay(this);
        };
        /**** showAround ****/
        WAT_Overlay.prototype.showAround = function (x, y, Constraint) {
            if (Constraint === void 0) { Constraint = 'withinViewport'; }
            WAT.expectLocation('x coordinate', x);
            WAT.expectLocation('y coordinate', y);
            expectOneOf('positioning constraint', Constraint, ['withinApplet', 'withinViewport']);
            var Applet = this.Applet;
            if (Constraint === 'withinApplet') { // x/y are coord.s relative to applet
                x = Math.max(0, Math.min(x, Applet.Width - this.Peer.offsetWidth));
                y = Math.max(0, Math.min(y, Applet.Height - this.Peer.offsetHeight));
                changeGeometryOfVisualTo(this, x, y, undefined, undefined);
            }
            else {
                var ViewportWidth = document.body.clientWidth;
                var ViewportHeight = Math.max(window.innerHeight, document.body.clientHeight);
                x = Math.max(0, Math.min(x, ViewportWidth - this.Peer.offsetWidth));
                y = Math.max(0, Math.min(y, ViewportHeight - this.Peer.offsetHeight));
                var AppletGeometryOnDisplay = Applet.GeometryOnDisplay;
                var AppletX = AppletGeometryOnDisplay.x;
                var AppletY = AppletGeometryOnDisplay.y;
                changeGeometryOfVisualTo(this, x - AppletX, y - AppletY, undefined, undefined);
            } // x/y are viewport coord.s, but Overlay is placed within its applet
        };
        /**** isFrontmostOfClass ****/
        WAT_Overlay.prototype.isFrontmostOfClass = function (ClassName) {
            return (this.Applet.frontmostOverlayOfClass(ClassName) === this);
        };
        /**** bringToFrontOfClass ****/
        WAT_Overlay.prototype.bringToFrontOfClass = function (ClassName) {
            this.Applet.bringOverlayToFrontOfClass(ClassName);
        };
        return WAT_Overlay;
    }(WAT_Layer));
    WAT.WAT_Overlay = WAT_Overlay;
    //----------------------------------------------------------------------------//
    //                                WAT_Compound                                //
    //----------------------------------------------------------------------------//
    var WAT_Compound = /** @class */ (function (_super) {
        __extends(WAT_Compound, _super);
        function WAT_Compound() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(WAT_Compound.prototype, "mayBeDisplaced", {
            /**** mayBeDisplaced ****/
            get: function () {
                var Container = this.Container;
                if (Container == null) {
                    return false;
                }
                var MasterInfo = MasterRegistry[Container.Master];
                if (MasterInfo == null) {
                    return false;
                }
                var MasterStyles = MasterInfo.Styles || {};
                return !(('left' in MasterStyles) ||
                    ('width' in MasterStyles) && ('right' in MasterStyles)) || !(('top' in MasterStyles) ||
                    ('height' in MasterStyles) && ('bottom' in MasterStyles));
            },
            set: function (newSetting) { throwReadOnlyError('mayBeDisplaced'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Compound.prototype, "mayBeDeformed", {
            /**** mayBeDeformed ****/
            get: function () {
                var Container = this.Container;
                if (Container == null) {
                    return false;
                }
                var MasterInfo = MasterRegistry[Container.Master];
                if (MasterInfo == null) {
                    return false;
                }
                var MasterStyles = MasterInfo.Styles || {};
                return !(('width' in MasterStyles) ||
                    ('left' in MasterStyles) && ('right' in MasterStyles)) || !(('height' in MasterStyles) ||
                    ('top' in MasterStyles) && ('bottom' in MasterStyles));
            },
            set: function (newSetting) { throwReadOnlyError('mayBeDeformed'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Compound.prototype, "Index", {
            /**** Index ****/
            get: function () { return this.Container.IndexOfComponent(this); },
            set: function (newIndex) { throwReadOnlyError('Index'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Compound.prototype, "mayBeShiftedUp", {
            /**** mayBeShiftedUp/Down ****/
            get: function () { return this.Container.CompoundMayBeShiftedUp(this); },
            set: function (newValue) { throwReadOnlyError('mayBeShiftedUp'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Compound.prototype, "mayBeShiftedDown", {
            get: function () { return this.Container.CompoundMayBeShiftedDown(this); },
            set: function (newValue) { throwReadOnlyError('mayBeShiftedDown'); },
            enumerable: false,
            configurable: true
        });
        /**** mayBeShiftedTo ****/
        WAT_Compound.prototype.mayBeShiftedTo = function (InsertionPoint) {
            return this.Container.CompoundMayBeShiftedTo(this, InsertionPoint);
        };
        /**** shiftUp/Down ****/
        WAT_Compound.prototype.shiftUp = function () { this.Container.shiftCompoundUp(this); };
        WAT_Compound.prototype.shiftDown = function () { this.Container.shiftCompoundDown(this); };
        /**** shiftTo ****/
        WAT_Compound.prototype.shiftTo = function (InsertionPoint) {
            this.Container.shiftCompoundTo(this, InsertionPoint);
        };
        Object.defineProperty(WAT_Compound.prototype, "mayBeRemoved", {
            /**** mayBeRemoved ****/
            get: function () { return this.Container.ComponentMayBeRemoved(this); },
            set: function (newValue) { throwReadOnlyError('mayBeRemoved'); },
            enumerable: false,
            configurable: true
        });
        /**** remove ****/
        WAT_Compound.prototype.remove = function () {
            this.Container.removeCompound(this);
        };
        return WAT_Compound;
    }(WAT_Container));
    WAT.WAT_Compound = WAT_Compound;
    //----------------------------------------------------------------------------//
    //                                WAT_Control                                 //
    //----------------------------------------------------------------------------//
    var WAT_Control = /** @class */ (function (_super) {
        __extends(WAT_Control, _super);
        function WAT_Control() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(WAT_Control.prototype, "mayBeDisplaced", {
            /**** mayBeDisplaced ****/
            get: function () {
                var Container = this.Container;
                if (Container == null) {
                    return false;
                }
                var MasterInfo = MasterRegistry[Container.Master];
                if (MasterInfo == null) {
                    return false;
                }
                var MasterStyles = MasterInfo.Styles || {};
                return !(('left' in MasterStyles) ||
                    ('width' in MasterStyles) && ('right' in MasterStyles)) || !(('top' in MasterStyles) ||
                    ('height' in MasterStyles) && ('bottom' in MasterStyles));
            },
            set: function (newSetting) { throwReadOnlyError('mayBeDisplaced'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Control.prototype, "mayBeDeformed", {
            /**** mayBeDeformed ****/
            get: function () {
                var Container = this.Container;
                if (Container == null) {
                    return false;
                }
                var MasterInfo = MasterRegistry[Container.Master];
                if (MasterInfo == null) {
                    return false;
                }
                var MasterStyles = MasterInfo.Styles || {};
                return !(('width' in MasterStyles) ||
                    ('left' in MasterStyles) && ('right' in MasterStyles)) || !(('height' in MasterStyles) ||
                    ('top' in MasterStyles) && ('bottom' in MasterStyles));
            },
            set: function (newSetting) { throwReadOnlyError('mayBeDeformed'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Control.prototype, "Index", {
            /**** Index ****/
            get: function () { return this.Container.IndexOfComponent(this); },
            set: function (newIndex) { throwReadOnlyError('Index'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Control.prototype, "mayBeShiftedUp", {
            /**** mayBeShiftedUp/Down ****/
            get: function () { return this.Container.CompoundMayBeShiftedUp(this); },
            set: function (newValue) { throwReadOnlyError('mayBeShiftedUp'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Control.prototype, "mayBeShiftedDown", {
            get: function () { return this.Container.CompoundMayBeShiftedDown(this); },
            set: function (newValue) { throwReadOnlyError('mayBeShiftedDown'); },
            enumerable: false,
            configurable: true
        });
        /**** mayBeShiftedTo ****/
        WAT_Control.prototype.mayBeShiftedTo = function (InsertionPoint) {
            return this.Container.CompoundMayBeShiftedTo(this, InsertionPoint);
        };
        /**** shiftUp/Down ****/
        WAT_Control.prototype.shiftUp = function () { this.Container.shiftCompoundUp(this); };
        WAT_Control.prototype.shiftDown = function () { this.Container.shiftCompoundDown(this); };
        /**** shiftTo ****/
        WAT_Control.prototype.shiftTo = function (InsertionPoint) {
            this.Container.shiftCompoundTo(this, InsertionPoint);
        };
        Object.defineProperty(WAT_Control.prototype, "mayBeRemoved", {
            /**** mayBeRemoved ****/
            get: function () { return this.Container.ComponentMayBeRemoved(this); },
            set: function (newValue) { throwReadOnlyError('mayBeRemoved'); },
            enumerable: false,
            configurable: true
        });
        /**** remove ****/
        WAT_Control.prototype.remove = function () {
            this.Container.removeCompound(this);
        };
        return WAT_Control;
    }(WAT_Visual));
    WAT.WAT_Control = WAT_Control;
    //----------------------------------------------------------------------------//
    //                             intrinsic Masters                              //
    //----------------------------------------------------------------------------//
    MasterRegistry.plainApplet = {
        Name: 'plainApplet', Version: normalized(parsedVersion('1.0.0')), Category: 'Applet',
        Template: '<div class="WAT Applet"></div>',
        undesignablePropertySet: Object.assign(Object.create(null), {
            Name: true, mayBeDeleted: true, Overflows: true,
            x: true, y: true, Width: true, Height: true,
            Position: true, Size: true, Geometry: true,
            horizontalAnchoring: true, verticalAnchoring: true,
            horizontalOffsets: true, verticalOffsets: true,
            minWidth: true, maxWidth: true, minHeight: true, maxHeight: true
        }),
        UsageCount: 0
    };
    MasterRegistry.plainCard = {
        Name: 'plainCard', Version: normalized(parsedVersion('1.0.0')), Category: 'Card',
        Template: '<div class="WAT Card"></div>',
        undesignablePropertySet: Object.assign(Object.create(null), {
            x: true, y: true, Width: true, Height: true,
            Position: true, Size: true, Geometry: true,
            horizontalAnchoring: true, verticalAnchoring: true,
            horizontalOffsets: true, verticalOffsets: true,
            minWidth: true, maxWidth: true, minHeight: true, maxHeight: true
        }),
        UsageCount: 0
    };
    MasterRegistry.plainOverlay = {
        Name: 'plainOverlay', Version: normalized(parsedVersion('1.0.0')), Category: 'Overlay',
        Template: '<div class="WAT Overlay"></div>', UsageCount: 0
    };
    MasterRegistry.plainControl = {
        Name: 'plainControl', Version: normalized(parsedVersion('1.0.0')), Category: 'Control',
        Template: '<div class="WAT Control"></div>', UsageCount: 0
    };
    MasterRegistry.plainCompound = {
        Name: 'plainCompound', Version: normalized(parsedVersion('1.0.0')), Category: 'Compound',
        Template: '<div class="WAT Compound"></div>', UsageCount: 0
    };
    /**** AppletPeersInDocument ****/
    function AppletPeersInDocument() {
        return filtered(document.body.querySelectorAll('.WAT.Applet'), function (Peer) {
            return (closestParent(Peer, '.WAT.Applet') == null);
        });
    }
    WAT.AppletPeersInDocument = AppletPeersInDocument;
    var Designer;
    /**** registerDesigner ****/
    function registerDesigner(newDesigner) {
        expectPlainObject('WAT designer', newDesigner);
        if (!ValueIsFunction(newDesigner.startDesigning) ||
            !ValueIsFunction(newDesigner.layoutsApplet))
            throwError('InvalidArgument: the given object is no valid WAT Designer');
        if (Designer == null) {
            Designer = newDesigner;
        }
        else {
            if (Designer !== newDesigner)
                throwError('DesignerExists: another WAT Designer has already been registered');
        }
    }
    WAT.registerDesigner = registerDesigner;
    /**** ready - similar to jQuery.ready ****/
    var WAT_isReady = false;
    var ReadyFunctionsToCall = [];
    function ready(FunctionToCall) {
        expectFunction('function to call', FunctionToCall);
        if (WAT_isReady && !ReadyFunctionsAreRunning) {
            return FunctionToCall(); // may throw!
        }
        else {
            ReadyFunctionsToCall.push(FunctionToCall);
        }
    }
    WAT.ready = ready;
    /**** invokeAllReadyFunctionsToCall - WAT is ready but applets not started ****/
    // ReadyFunctionsToCall may be extended while invokeAllReadyFunctionsToCall is running!
    var ReadyFunctionsAreRunning = false;
    function invokeAllReadyFunctionsToCall() {
        console.log('WAT is ready');
        ReadyFunctionsAreRunning = true;
        for (var i = 0; i < ReadyFunctionsToCall.length; i++) {
            try {
                ReadyFunctionsToCall[i]();
            }
            catch (signal) {
                console.error('registered WAT "ready" handler failed with ', signal);
            }
        }
        ReadyFunctionsAreRunning = false;
    }
    /**** running - similar to jQuery.ready ****/
    var WAT_isRunning = false;
    var RunningFunctionsToCall = [];
    function running(FunctionToCall) {
        expectFunction('function to call', FunctionToCall);
        if (WAT_isRunning && !RunningFunctionsAreRunning) {
            return FunctionToCall(); // may throw!
        }
        else {
            RunningFunctionsToCall.push(FunctionToCall);
        }
    }
    WAT.running = running;
    /**** invokeAllRunningFunctionsToCall - all WAT applets are running ****/
    // RunningFunctionsToCall may be extended while invokeAllRunningFunctionsToCall is running!
    var RunningFunctionsAreRunning = false;
    function invokeAllRunningFunctionsToCall() {
        console.log('WAT is running');
        RunningFunctionsAreRunning = true;
        for (var i = 0; i < RunningFunctionsToCall.length; i++) {
            try {
                RunningFunctionsToCall[i]();
            }
            catch (signal) {
                console.error('registered WAT "running" handler failed with ', signal);
            }
        }
        RunningFunctionsAreRunning = false;
    }
    //----------------------------------------------------------------------------//
    //                                WAT Start-Up                                //
    //----------------------------------------------------------------------------//
    global$1['WAT'] = Object.assign(WAT.ready, WAT);
    /**** startWAT ****/
    function startWAT() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        WAT_isReady = true;
                        invokeAllReadyFunctionsToCall();
                        return [4 /*yield*/, startAllApplets()];
                    case 1:
                        _a.sent();
                        WAT_isRunning = true;
                        invokeAllRunningFunctionsToCall();
                        return [2 /*return*/];
                }
            });
        });
    }
    /**** startAllApplets ****/
    function startAllApplets() {
        return __awaiter(this, void 0, void 0, function () {
            var AppletPeerList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        AppletPeerList = AppletPeersInDocument();
                        return [4 /*yield*/, AppletPeerList.forEach(function (AppletPeer) {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, startAppletFromPeer(AppletPeer)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    /**** startAppletFromPeer ****/
    function startAppletFromPeer(AppletPeer) {
        return __awaiter(this, void 0, void 0, function () {
            var Applet, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = BackupIsSupported;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, AppletHasBackup(AppletPeer)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, AppletRestoredIntoPeer(AppletPeer)];
                    case 3:
                        Applet = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        Applet = VisualBuiltFromPeer(AppletPeer, 'Applet'); // act. makes the applet
                        _b.label = 5;
                    case 5:
                        Applet.trigger('applet-started', Applet);
                        return [2 /*return*/];
                }
            });
        });
    }
    /**** start WAT and applets ****/
    function startup() {
        defineForbiddenPropertyNames();
        registerMastersInDocument(); // nota bene: WAT is not yet "ready"!
        installEventHandlerForErrorIndicators();
        if (BackupIsSupported) {
            localforage.ready(function () {
                AppletStore = localforage.createInstance({
                    name: 'WAT Applets'
                });
                startWAT();
            });
        }
        else {
            startWAT();
        }
    }
    /**** wait for the proper trigger to start WAT ****/
    if ((document.readyState === 'complete') ||
        (document.readyState === 'interactive')) {
        setTimeout(startup, 1);
    }
    else {
        window.addEventListener('DOMContentLoaded', startup);
    }
    global$1.WAT = WAT;
})(WAT || (WAT = {}));
//# sourceMappingURL=webapp-tinkerer-runtime.esm.js.map
