"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var plugin_helpers_1 = require("./plugin-helpers");
var SingletonWriterPropsProvider = /** @class */ (function () {
    function SingletonWriterPropsProvider() {
    }
    SingletonWriterPropsProvider.imports = new Set();
    SingletonWriterPropsProvider.writePartitions = {};
    SingletonWriterPropsProvider.wrappedWriteContent = new Map();
    SingletonWriterPropsProvider.createWritePartitons = function (partitions) {
        var writePartions = SingletonWriterPropsProvider.writePartitions;
        partitions.forEach(function (par) {
            if (!writePartions[par]) {
                writePartions[par] = new Map();
            }
        });
        return Object.values(writePartions).map(function (targetWritePartition) {
            return SingletonWriterPropsProvider.addContentToWritePartition(targetWritePartition);
        });
    };
    SingletonWriterPropsProvider.addImports = function (newimport) {
        if (newimport === void 0) { newimport = ''; }
        if (Array.isArray(newimport)) {
            newimport.forEach(function (imp) { return SingletonWriterPropsProvider.addImports(imp); });
        }
        else {
            SingletonWriterPropsProvider.imports.add(newimport);
        }
        return SingletonWriterPropsProvider;
    };
    SingletonWriterPropsProvider.addContentToWritePartition = function (targetWritePartition) { return function (toAddFilePath, toAddContent) {
        var toAddContentTemp = toAddContent;
        var wrapperKey = '';
        if (plugin_helpers_1.isInstanceOfWrappedObject(toAddContentTemp)) {
            while (plugin_helpers_1.isInstanceOfWrappedObject(toAddContentTemp.toWrapContent)) {
                toAddContentTemp.toWrapContent = SingletonWriterPropsProvider.addContentToWritePartition(targetWritePartition)(toAddFilePath, __assign(__assign({}, toAddContentTemp.toWrapContent), { wrapperLevel: toAddContentTemp.toWrapContent.wrapperLevel + 1 }));
            }
            if (Array.isArray(toAddContentTemp.toWrapContent)) {
                toAddContentTemp.toWrapContent = utils_1.flatten(toAddContentTemp.toWrapContent).join('\n'.repeat(2));
            }
            wrapperKey = utils_1.createMd5(JSON.stringify({
                wrapperStartWith: toAddContentTemp.wrapperStartWith,
                wrapperEndWith: toAddContentTemp.wrapperEndWith,
            }));
            var wrappedWriteContent = SingletonWriterPropsProvider.wrappedWriteContent;
            var wrapperFile = wrappedWriteContent.get(toAddFilePath);
            var prevWrapper = wrapperFile === null || wrapperFile === void 0 ? void 0 : wrapperFile.get(wrapperKey);
            if (wrapperFile && prevWrapper) {
                var previousWrappedContent = prevWrapper.toWrapContent;
                wrapperFile.set(wrapperKey, __assign(__assign({}, prevWrapper), { toWrapContent: previousWrappedContent
                        .concat('\n'.repeat(3))
                        .concat(toAddContentTemp.toWrapContent) }));
            }
            else if (wrapperFile) {
                wrapperFile.set(wrapperKey, toAddContentTemp);
                toAddContentTemp = !toAddContentTemp.wrapperLevel ? wrapperKey : '';
            }
            else {
                var wrapper = new Map();
                wrapper.set(wrapperKey, toAddContentTemp);
                wrappedWriteContent.set(toAddFilePath, wrapper);
                toAddContentTemp = !toAddContentTemp.wrapperLevel ? wrapperKey : '';
            }
        }
        else if (Array.isArray(toAddContentTemp)) {
            toAddContentTemp = utils_1.flatten(toAddContentTemp, Infinity).join('\n'.repeat(2));
        }
        if (typeof toAddContentTemp === 'string') {
            var prevFileContent = targetWritePartition.get(toAddFilePath);
            if (prevFileContent) {
                targetWritePartition.set(toAddFilePath, prevFileContent.concat('\n'.repeat(2)).concat(toAddContentTemp));
            }
            else {
                targetWritePartition.set(toAddFilePath, toAddContentTemp);
            }
        }
        return wrapperKey;
    }; };
    SingletonWriterPropsProvider.produceWriterProps = function () {
        var imports = SingletonWriterPropsProvider.imports, writePartitions = SingletonWriterPropsProvider.writePartitions, wrappedWriteContent = SingletonWriterPropsProvider.wrappedWriteContent;
        // Sort WriteContents based on wrapperLevel
        wrappedWriteContent.forEach(function (files, fileName) {
            var sortedWriteContent = __spread(files.entries()).sort(function (a, b) { return a[1].wrapperLevel - b[1].wrapperLevel; });
            wrappedWriteContent.set(fileName, new Map(sortedWriteContent));
        });
        Object.values(writePartitions).forEach(function (writePartition) {
            wrappedWriteContent.forEach(function (wrapper, fileName) {
                var replacedWriteContent = '';
                wrapper.forEach(function (_a, wrapperKey) {
                    var wrapperStartWith = _a.wrapperStartWith, toWrapContent = _a.toWrapContent, wrapperEndWith = _a.wrapperEndWith;
                    var toReplaceWriteContent = writePartition.get(fileName);
                    if (toReplaceWriteContent) {
                        replacedWriteContent = toReplaceWriteContent === null || toReplaceWriteContent === void 0 ? void 0 : toReplaceWriteContent.replace(new RegExp(wrapperKey, 'g'), wrapperStartWith + "\n" + toWrapContent + "\n" + wrapperEndWith);
                    }
                    if (replacedWriteContent !== toReplaceWriteContent) {
                        writePartition.set(fileName, replacedWriteContent);
                    }
                });
            });
        });
        return {
            imports: __spread(imports).join('\n'),
            writePartitions: writePartitions,
        };
    };
    return SingletonWriterPropsProvider;
}());
exports.SingletonWriterPropsProvider = SingletonWriterPropsProvider;
