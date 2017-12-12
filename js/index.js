var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
};
import axios from 'axios';
import { Decode } from './utils';
var GoogleMirror = /** @class */ (function () {
    function GoogleMirror() {
        var _this = this;
        this.sourceUrl = 'https://raw.githubusercontent.com/xiaoyaozi1010/googleMirrorJson/master/googleMirror.json';
        chrome.browserAction.onClicked.addListener(function (tab) {
            chrome.browserAction.setIcon({ path: '../icons/loading.gif' }, function () {
                console.log('设置 icon 为 loading');
            });
            _this.getData(_this.sourceUrl)
                .then(function (res) {
                chrome.browserAction.setIcon({ path: '../icons/icon128.png' }, function () {
                    console.log('设置 icon 为 normal');
                });
                if (res.status == 200 || res.status == 304) {
                    return _this.getMirrorUrl(res.data);
                }
            })
                .then(function (url) { return chrome.tabs.create({ url: url }); });
        });
    }
    GoogleMirror.prototype.getMirrorUrl = function (urlHashes) {
        return __awaiter(this, void 0, void 0, function () {
            var urls, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urls = this.parseData(urlHashes);
                        return [4 /*yield*/, this.getFastest(urls)];
                    case 1:
                        url = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(url);
                            })];
                }
            });
        });
    };
    GoogleMirror.prototype.getData = function (url) {
        return axios.get(this.sourceUrl);
    };
    GoogleMirror.prototype.parseData = function (allHash) {
        var decode = new Decode();
        return allHash.map(function (_) { return decode.resolve(_); });
    };
    GoogleMirror.prototype.getFastest = function (urls) {
        var _this = this;
        var res = '';
        var temp = [];
        var allPromise = [];
        // todo: Promise 
        urls.forEach(function (url, i) {
            allPromise.push(_this.getRequestTime(url));
        });
        return Promise.race(allPromise);
    };
    GoogleMirror.prototype.getRequestTime = function (url) {
        var imgEle = document.createElement('img');
        var timestamp = Date.now();
        return new Promise(function (resolve, reject) {
            // let isRequestEnd: boolean = false;
            // let timeout: number = 1500;
            var counter = 0;
            // let timer: any = 0;
            imgEle.src = url + '/#' + timestamp;
            imgEle.addEventListener('error', function () {
                resolve(url);
            });
            // TODO: 请求成功后的url存入 cookie 或者 webDB, 设置过期时间
        });
    };
    return GoogleMirror;
}());
new GoogleMirror();
//# sourceMappingURL=index.js.map