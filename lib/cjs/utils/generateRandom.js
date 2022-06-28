"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandom = void 0;
const ethers_1 = require("ethers");
function generateRandom() {
    const characters ='abcdef0123456789';
        function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const privKey = "0x" + generateString(64)
    const address = ethers_1.utils.computeAddress(privKey)
    return "\x1b[36mPrivate Key : \x1b[0m" + `\x1b[33m${privKey}\x1b[0m` + "\r\n" + "\x1b[36mAddress : \x1b[0m" + `\x1b[33m${address}\x1b[0m`;
}
exports.generateRandom = generateRandom;