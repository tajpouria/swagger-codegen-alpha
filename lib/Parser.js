"use strict";
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
var Parser = /** @class */ (function () {
    function Parser() {
        var _this = this;
        this.convertURLPathParametersToTemplateStringVar = function () {
            var newPaths = {};
            Object.entries(_this._schema.paths).forEach(function (_a) {
                var _b = __read(_a, 2), url = _b[0], path = _b[1];
                var urlTemp = url;
                var containPathParamRegex = /\/{\w+}/gi;
                if (containPathParamRegex.test(url)) {
                    var braceAfterSlashRegex = /\/{\b/g;
                    urlTemp = urlTemp.replace(braceAfterSlashRegex, '/${');
                }
                newPaths[urlTemp] = path;
            });
            _this._schema.paths = newPaths;
            return _this;
        };
    }
    Object.defineProperty(Parser.prototype, "schema", {
        get: function () {
            return this._schema;
        },
        set: function (inputSchema) {
            this._schema = inputSchema;
        },
        enumerable: true,
        configurable: true
    });
    return Parser;
}());
exports.Parser = Parser;
exports.parser = new Parser();
