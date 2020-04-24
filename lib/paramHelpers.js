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
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("./Parser");
function resolveParameterInfo(parameter) {
    var name = parameter.name, required = parameter.required;
    var t = {
        name: name,
        required: resolveParameterInfoRequired(required),
        type: resolveParameterInfoType(parameter),
    };
    return t;
}
exports.resolveParameterInfo = resolveParameterInfo;
function resolveParameterInfoType(parameter) {
    var type = parameter.type, schema = parameter.schema, $ref = parameter.$ref;
    if (parameter.enum) {
        return resolveParameterInfoEnumType(parameter);
    }
    if (isPrimitiveParamterInfoType(type)) {
        return resolveParameterInfoPrimitiveType(parameter);
    }
    if (type === 'object') {
        return resolveParameterInfoObjectType(parameter);
    }
    if (type === 'array') {
        return resolveParameterInfoArrayType(parameter);
    }
    if (schema) {
        return resolveParameterInfoSchemaType(parameter);
    }
    if ($ref) {
        return resolveParameterInfo$ref(parameter);
    }
    throw new Error("Cannot resolve Parameter " + name);
}
var resolveParameterInfoRequired = function (required) { return !!required; };
function isPrimitiveParamterInfoType(type) {
    return (type &&
        (type === 'string' ||
            type === 'number' ||
            type === 'boolean' ||
            type == 'integer'));
}
function resolveParameterInfoPrimitiveType(parameter) {
    var type = parameter.type;
    switch (type) {
        case 'string':
            return 'string';
        case 'number':
        case 'integer':
            return 'number';
        case 'boolean':
            return 'boolean';
        default:
            return 'any';
    }
}
function resolveParameterInfoEnumType(parameter) {
    if (parameter.enum) {
        return parameter.enum.reduce(function (acc, el) {
            if (acc) {
                return acc + "|'" + el + "'";
            }
            return "'" + el + "'";
        }, '');
    }
    return 'any';
}
function resolveParameterInfoObjectType(parameter) {
    var properties = parameter.properties;
    if (properties) {
        return Object.entries(properties).map(function (_a) {
            var _b = __read(_a, 2), propName = _b[0], prop = _b[1];
            return resolveParameterInfo(__assign({ name: propName }, prop));
        });
    }
    return 'any';
}
function resolveParameterInfoArrayType(parameter) {
    var items = parameter.items;
    if (items) {
        var type = resolveParameterInfoType(items);
        // TODO: Should changed to more general approach this kinda stuff should handled on client
        if (isPrimitiveParamterInfoType(type)) {
            return type + "[]";
        }
        else if (Array.isArray(type)) {
            return "{ " + type.reduce(function (acc, el) { return acc + "\n" + el.name + ":" + el.type + ";"; }, '') + " }[]";
        }
    }
    return 'any';
}
function resolveParameterInfoSchemaType(parameter) {
    var schema = parameter.schema;
    if (schema) {
        return resolveParameterInfoType(schema);
    }
    return 'any';
}
function resolveParameterInfo$ref(parameter) {
    var _a;
    var $ref = parameter.$ref;
    var schema = Parser_1.parser.schema;
    if ($ref && schema) {
        var refSegments = $ref.split('/');
        var refName = refSegments[refSegments.length - 1];
        var parameter_1 = (_a = schema.definitions) === null || _a === void 0 ? void 0 : _a[refName];
        return resolveParameterInfoType(parameter_1);
    }
    return 'any';
}
