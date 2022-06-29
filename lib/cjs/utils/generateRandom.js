"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandom = void 0;
const toAddress_1 = require("./toAddress.js");
const bytes_1 = require("./bytes.js");
const secp256k1_1 = require("@noble/secp256k1");
function generateRandom() {
    const hexCharacters ='abcdef0123456789';
        function generateString(length) {
        let result = '';
        const hexCharactersLength = hexCharacters.length;
        for ( let i = 0; i < length; i++ ) {
            result += hexCharacters.charAt(Math.floor(Math.random() * hexCharactersLength));
        }
        return result;
    }
    const privKey = "0x" + generateString(64)
    const address = toAddress_1.toAddress(privKey)
    return "\x1b[36mPrivate Key : \x1b[0m" + `\x1b[33m${privKey}\x1b[0m` + "\r\n" + "\x1b[36mAddress : \x1b[0m" + `\x1b[33m${address}\x1b[0m`;
}
exports.generateRandom = generateRandom;