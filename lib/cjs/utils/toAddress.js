"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeAddress = void 0;
const checksum_1 = require("./checksum.js");
const bytes_1 = require("./bytes");
const keccak256_1 = require("./keccak256");
const secp256k1_1 = require("@noble/secp256k1");
function toAddress(key) {
    const key_ = (0, bytes_1.hexlify)(key).slice(2);
    const pubKey = '0x' + secp256k1_1.Point.fromPrivateKey(key_).toHex();
    return (0, checksum_1.checksum)((0, bytes_1.hexDataSlice)((0, keccak256_1.keccak256)((0, bytes_1.hexDataSlice)(pubKey, 1)), 12));
}
exports.toAddress = toAddress;
