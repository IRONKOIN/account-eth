"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checksum = void 0;
const keccak_1 = require("./keccak.js");
const validate_type_1 = require("../shared/validate-type");
function checksum(address) {
    (0, validate_type_1.validateType)(address, ['string']);
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        throw new Error(`Invalid Ethereum address "${address}"`);
    }
    const _address = address.toLowerCase().replace(/^0x/i, '');
    const Keccak = new keccak_1.keccak(256);
    const addressHash = Keccak.update(_address).hex.replace(/^0x/i, '');
    let checksumAddress = '0x';
    for (let i = 0; i < _address.length; i++) {
        // If ith character is 8 to f then make it uppercase
        if (parseInt(addressHash[i], 16) > 7) {
            checksumAddress += _address[i].toUpperCase();
        }
        else {
            checksumAddress += _address[i];
        }
    }
    if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) &&
        checksumAddress !== address) {
        throw new Error(`Invalid Checksum address for "${address}"`);
    }
    return checksumAddress;
}
exports.checksum = checksum;
