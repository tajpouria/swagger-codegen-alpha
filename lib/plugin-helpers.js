"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SingletonWriterPropsProvider_1 = require("./SingletonWriterPropsProvider");
var paramHelpers_1 = require("./paramHelpers");
exports.useAddToWritePartition = function (partitions) {
    return SingletonWriterPropsProvider_1.SingletonWriterPropsProvider.createWritePartitons(partitions);
};
exports.wrap = function (wrapperStartWith, toWrapContent, wrapperEndWith, wrapperLevel) {
    if (wrapperLevel === void 0) { wrapperLevel = 0; }
    return ({
        wrapperStartWith: wrapperStartWith,
        wrapperEndWith: wrapperEndWith,
        toWrapContent: toWrapContent,
        wrapperLevel: wrapperLevel,
    });
};
function isInstanceOfWrappedObject(object) {
    return (typeof object === 'object' &&
        'wrapperStartWith' in object &&
        'wrapperEndWith' in object &&
        'toWrapContent' in object &&
        'wrapperLevel' in object);
}
exports.isInstanceOfWrappedObject = isInstanceOfWrappedObject;
exports.parseParametersInfo = function (parametes) {
    var parametersInfo = {
        query: [],
        path: [],
        body: [],
        header: [],
    };
    parametes.forEach(function (parameter) {
        var previousParamInfo = parametersInfo[parameter.in];
        parametersInfo[parameter.in] = previousParamInfo.concat(paramHelpers_1.resolveParameterInfo(parameter));
    });
    return parametersInfo;
};
