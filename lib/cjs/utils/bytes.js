"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexZeroPad = exports.hexStripZeros = exports.hexValue = exports.hexConcat = exports.hexDataSlice = exports.hexDataLength = exports.hexlify = exports.isHexString = exports.zeroPad = exports.stripZeros = exports.concat = exports.arrayify = exports.isBytes = exports.isBytesLike = void 0;
// primarily duplicate code from https://github.com/ethers-io/ethers.js/blob/f599d6f23dad0d0acaa3828d6b7acaab2d5e455b/packages/bytes/src.ts/index.ts
const logger_1 = require("../logger/logger.js");
function isHexable(value) {
    return !!value.toHexString;
}
function isBytesLike(value) {
    return (isHexString(value) && !(value.length % 2)) || isBytes(value);
}
exports.isBytesLike = isBytesLike;
function isInteger(value) {
    return typeof value === 'number' && value == value && value % 1 === 0;
}
function isBytes(value) {
    if (value == null) {
        return false;
    }
    if (value.constructor === Uint8Array) {
        return true;
    }
    if (typeof value === 'string') {
        return false;
    }
    if (!isInteger(value.length) || value.length < 0) {
        return false;
    }
    for (let i = 0; i < value.length; i++) {
        const v = value[i];
        if (!isInteger(v) || v < 0 || v >= 256) {
            return false;
        }
    }
    return true;
}
exports.isBytes = isBytes;
function arrayify(value, options) {
    if (!options) {
        options = {};
    }
    if (typeof value === 'number') {
        logger_1.logger.checkSafeUint53(value, 'invalid arrayify value');
        const result = [];
        while (value) {
            result.unshift(value & 0xff);
            value = parseInt(String(value / 256));
        }
        if (result.length === 0) {
            result.push(0);
        }
        return new Uint8Array(result);
    }
    if (options.allowMissingPrefix &&
        typeof value === 'string' &&
        value.substring(0, 2) !== '0x') {
        value = '0x' + value;
    }
    if (isHexable(value)) {
        value = value.toHexString();
    }
    if (isHexString(value)) {
        let hex = value.substring(2);
        if (hex.length % 2) {
            if (options.hexPad === 'left') {
                hex = '0' + hex;
            }
            else if (options.hexPad === 'right') {
                hex += '0';
            }
            else {
                logger_1.logger.throwArgumentError('hex data is odd-length', 'value', value);
            }
        }
        const result = [];
        for (let i = 0; i < hex.length; i += 2) {
            result.push(parseInt(hex.substring(i, i + 2), 16));
        }
        return new Uint8Array(result);
    }
    if (isBytes(value)) {
        return new Uint8Array(value);
    }
    return logger_1.logger.throwArgumentError('invalid arrayify value', 'value', value);
}
exports.arrayify = arrayify;
function concat(arrayOfBytesLike) {
    const objects = arrayOfBytesLike.map((item) => arrayify(item));
    const length = objects.reduce((accum, item) => accum + item.length, 0);
    const result = new Uint8Array(length);
    objects.reduce((offset, object) => {
        result.set(object, offset);
        return offset + object.length;
    }, 0);
    return result;
}
exports.concat = concat;
function stripZeros(value) {
    let result = arrayify(value);
    if (result.length === 0) {
        return result;
    }
    // Find the first non-zero entry
    let start = 0;
    while (start < result.length && result[start] === 0) {
        start++;
    }
    // If we started with zeros, strip them
    if (start) {
        result = result.slice(start);
    }
    return result;
}
exports.stripZeros = stripZeros;
function zeroPad(value, length) {
    value = arrayify(value);
    if (value.length > length) {
        logger_1.logger.throwArgumentError('value out of range', 'value', value);
    }
    const result = new Uint8Array(length);
    result.set(value, length - value.length);
    return result;
}
exports.zeroPad = zeroPad;
function isHexString(value, length) {
    if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
}
exports.isHexString = isHexString;
const HexCharacters = '0123456789abcdef';
function hexlify(value, options) {
    if (!options) {
        options = {};
    }
    if (typeof value === 'number') {
        logger_1.logger.checkSafeUint53(value, 'invalid hexlify value');
        let hex = '';
        while (value) {
            hex = HexCharacters[value & 0xf] + hex;
            value = Math.floor(value / 16);
        }
        if (hex.length) {
            if (hex.length % 2) {
                hex = '0' + hex;
            }
            return '0x' + hex;
        }
        return '0x00';
    }
    if (typeof value === 'bigint') {
        value = value.toString(16);
        if (value.length % 2) {
            return '0x0' + value;
        }
        return '0x' + value;
    }
    if (options.allowMissingPrefix &&
        typeof value === 'string' &&
        value.substring(0, 2) !== '0x') {
        value = '0x' + value;
    }
    if (isHexable(value)) {
        return value.toHexString();
    }
    if (isHexString(value)) {
        if (value.length % 2) {
            if (options.hexPad === 'left') {
                value = '0x0' + value.substring(2);
            }
            else if (options.hexPad === 'right') {
                value += '0';
            }
            else {
                logger_1.logger.throwArgumentError('hex data is odd-length', 'value', value);
            }
        }
        return value.toLowerCase();
    }
    if (isBytes(value)) {
        let result = '0x';
        for (let i = 0; i < value.length; i++) {
            const v = value[i];
            result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
        }
        return result;
    }
    return logger_1.logger.throwArgumentError('invalid hexlify value', 'value', value);
}
exports.hexlify = hexlify;
function hexDataLength(data) {
    if (typeof data !== 'string') {
        data = hexlify(data);
    }
    else if (!isHexString(data) || data.length % 2) {
        return null;
    }
    return (data.length - 2) / 2;
}
exports.hexDataLength = hexDataLength;
function hexDataSlice(data, offset, endOffset) {
    if (typeof data !== 'string') {
        data = hexlify(data);
    }
    else if (!isHexString(data) || data.length % 2) {
        logger_1.logger.throwArgumentError('invalid hexData', 'value', data);
    }
    offset = 2 + 2 * offset;
    if (endOffset != null) {
        return '0x' + data.substring(offset, 2 + 2 * endOffset);
    }
    return '0x' + data.substring(offset);
}
exports.hexDataSlice = hexDataSlice;
function hexConcat(items) {
    let result = '0x';
    items.forEach((item) => {
        result += hexlify(item).substring(2);
    });
    return result;
}
exports.hexConcat = hexConcat;
function hexValue(value) {
    const trimmed = hexStripZeros(hexlify(value, { hexPad: 'left' }));
    if (trimmed === '0x') {
        return '0x0';
    }
    return trimmed;
}
exports.hexValue = hexValue;
function hexStripZeros(value) {
    if (typeof value !== 'string') {
        value = hexlify(value);
    }
    if (!isHexString(value)) {
        logger_1.logger.throwArgumentError('invalid hex string', 'value', value);
    }
    value = value.substring(2);
    let offset = 0;
    while (offset < value.length && value[offset] === '0') {
        offset++;
    }
    return '0x' + value.substring(offset);
}
exports.hexStripZeros = hexStripZeros;
function hexZeroPad(value, length) {
    if (typeof value !== 'string') {
        value = hexlify(value);
    }
    else if (!isHexString(value)) {
        logger_1.logger.throwArgumentError('invalid hex string', 'value', value);
    }
    if (value.length > 2 * length + 2) {
        logger_1.logger.throwError('value out of range', { value, length });
    }
    while (value.length < 2 * length + 2) {
        value = '0x0' + value.substring(2);
    }
    return value;
}
exports.hexZeroPad = hexZeroPad;