"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keccak256 = void 0;
const keccak_1 = require("./keccak.js");
function keccak256(data) {
    let bufferableData;
    if (typeof data === 'string') {
        bufferableData = Buffer.from(data.replace(/^0x/, ''), 'hex');
    }
    else {
        bufferableData = Buffer.from(data);
    }
    const Keccak = new keccak_1.keccak(256);
    const addressHash = '0x' + Keccak.update(bufferableData).hex;
    return addressHash;
}
exports.keccak256 = keccak256;
