"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateType = void 0;
const validateType = (value, allowedTypes) => {
    if (!allowedTypes.includes(typeof value)) {
        throw new Error(`${allowedTypes.join(' or ')} required. Received ${typeof value}`);
    }
};
exports.validateType = validateType;
