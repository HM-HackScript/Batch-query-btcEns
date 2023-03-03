"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var utils_1 = require("./utils");
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var axios_1 = __importDefault(require("axios"));
var moment_1 = __importDefault(require("moment"));
var ini_1 = __importDefault(require("ini"));
var filePath = (_a = {},
    _a['已注册'] = path_1["default"].join(utils_1.runPathRoot, '已注册.txt'),
    _a['未注册'] = path_1["default"].join(utils_1.runPathRoot, '未注册.txt'),
    _a['查询异常'] = path_1["default"].join(utils_1.runPathRoot, '查询异常.txt'),
    _a);
var _b = ini_1["default"].parse((0, fs_1.readFileSync)(path_1["default"].join(utils_1.runPathRoot, 'config.ini'), 'utf-8')), proxy = _b.proxy, entry = _b.entry;
var namesPath = String(entry).trim();
var fetchStatus = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resovle, reject) {
                axios_1["default"].get("https://api.sats.id/names/".concat(name, ".sats"), {
                    proxy: (0, utils_1.formatAxiosProxy)(proxy)
                })
                    .then(function (res) { return resovle(res); })["catch"](function (err) { return reject(err); });
            })];
    });
}); };
var runMian = function () { return __awaiter(void 0, void 0, void 0, function () {
    var names, namesArr, registeredFile, unRegisteredFile, index, name_1, quickQueryKey, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Start: \u914D\u7F6E\u6587\u4EF6 ".concat(namesPath));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                names = (0, fs_1.readFileSync)(path_1["default"].join(utils_1.runPathRoot, namesPath), 'utf-8');
                namesArr = names.split('\n');
                registeredFile = (0, fs_1.readFileSync)(filePath.已注册, 'utf-8');
                unRegisteredFile = (0, fs_1.readFileSync)(filePath.未注册, 'utf-8');
                console.log("===== Total Count: ".concat(namesArr.length, " ====="));
                index = 0;
                _a.label = 2;
            case 2:
                if (!(index < namesArr.length)) return [3 /*break*/, 8];
                name_1 = namesArr[index];
                quickQueryKey = "\u3010".concat(name_1, "\u3011");
                if (!registeredFile.includes(quickQueryKey)) return [3 /*break*/, 3];
                console.log("\u5E8F\u53F7: ".concat(index + 1, "\t \u8D26\u53F7: ").concat(name_1, "\t \u72B6\u6001: \u5DF2\u6CE8\u518C\t \u65F6\u95F4: ").concat((0, moment_1["default"])().format('HH:mm:ss')));
                return [3 /*break*/, 7];
            case 3:
                if (!unRegisteredFile.includes(quickQueryKey)) return [3 /*break*/, 4];
                console.error("\u5E8F\u53F7: ".concat(index + 1, "\t \u8D26\u53F7: ").concat(name_1, "\t \u72B6\u6001: \u672A\u6CE8\u518C\t \u65F6\u95F4: ").concat((0, moment_1["default"])().format('HH:mm:ss')));
                return [3 /*break*/, 7];
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, fetchStatus(name_1)];
            case 5:
                _a.sent();
                console.log("\u5E8F\u53F7: ".concat(index + 1, "\t \u8D26\u53F7: ").concat(name_1, "\t \u72B6\u6001: \u5DF2\u6CE8\u518C\t \u65F6\u95F4: ").concat((0, moment_1["default"])().format('HH:mm:ss')));
                (0, fs_1.writeFileSync)(path_1["default"].join(utils_1.runPathRoot, '已注册.txt'), "\u3010".concat(name_1, "\u3011\t"), { flag: 'a' });
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                if (error_1.response.status === 404) {
                    console.error("\u5E8F\u53F7: ".concat(index + 1, "\t \u8D26\u53F7: ").concat(name_1, "\t \u72B6\u6001: \u672A\u6CE8\u518C\t \u65F6\u95F4: ").concat((0, moment_1["default"])().format('HH:mm:ss')));
                    (0, fs_1.writeFileSync)(path_1["default"].join(utils_1.runPathRoot, '未注册.txt'), "\u3010".concat(name_1, "\u3011\t"), { flag: 'a' });
                }
                else {
                    console.error("\u5E8F\u53F7: ".concat(index + 1, "\t \u8D26\u53F7: ").concat(name_1, "\t \u72B6\u6001: \u6CE8\u518C\u5F02\u5E38\t \u539F\u56E0: ").concat(error_1.response.status, "-").concat(error_1.message, "  \u65F6\u95F4: ").concat((0, moment_1["default"])().format('HH:mm:ss')));
                    (0, fs_1.writeFileSync)(path_1["default"].join(utils_1.runPathRoot, '查询异常.txt'), "".concat(name_1, "\n"), { flag: 'a' });
                }
                return [3 /*break*/, 7];
            case 7:
                index++;
                return [3 /*break*/, 2];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_2 = _a.sent();
                console.log("\u8FD0\u884C\u5F02\u5E38\uFF1A".concat(error_2.message));
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
runMian();
