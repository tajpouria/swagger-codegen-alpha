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
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("./Parser");
var schemaProvider_1 = require("./schemaProvider");
var SingletonWriterPropsProvider_1 = require("./SingletonWriterPropsProvider");
var Writer_1 = require("./Writer");
var Generator = /** @class */ (function () {
    function Generator(generatorProps) {
        this.generatorProps = generatorProps;
    }
    Generator.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, schemaPath, plugin, schemaURL, prettierOptions, jsonSchema, _b, _c, _d, host, basePath, paths, main, imports, urlPathFunc, urlPathList, methodPathPropsFuncList_1, writerProps, err_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this.generatorProps, schemaPath = _a.schemaPath, plugin = _a.plugin, schemaURL = _a.schemaURL, prettierOptions = _a.prettierOptions;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 4, , 5]);
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, schemaProvider_1.schemaProvider({ schemaPath: schemaPath, schemaURL: schemaURL })];
                    case 2:
                        jsonSchema = _c.apply(_b, [_e.sent()]);
                        Parser_1.parser.schema = jsonSchema;
                        _d = Parser_1.parser.convertURLPathParametersToTemplateStringVar().schema, host = _d.host, basePath = _d.basePath, paths = _d.paths;
                        main = plugin.main, imports = plugin.imports;
                        urlPathFunc = main({ host: host, basePath: basePath });
                        urlPathList = Object.entries(paths);
                        methodPathPropsFuncList_1 = urlPathList.map(urlPathFunc);
                        urlPathList.map(function (_a, idx) {
                            var _b = __read(_a, 2), path = _b[1];
                            return Object.entries(path).map(function (methodPathProps) {
                                return methodPathPropsFuncList_1[idx](methodPathProps);
                            });
                        });
                        SingletonWriterPropsProvider_1.SingletonWriterPropsProvider.addImports(imports);
                        writerProps = SingletonWriterPropsProvider_1.SingletonWriterPropsProvider.produceWriterProps();
                        return [4 /*yield*/, new Writer_1.Writer(writerProps)
                                .concatWritePatitions()
                                .concatImportToWriteContent()
                                .formatWriteContent(prettierOptions)
                                .write()];
                    case 3:
                        _e.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _e.sent();
                        console.error(err_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Generator;
}());
exports.Generator = Generator;
