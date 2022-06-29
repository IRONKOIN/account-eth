![package](https://badgen.net/badge/package/account-eth/blue)
![downloads](https://badgen.net/npm/dw/account-eth)
![size](https://img.shields.io/github/languages/code-size/ayushch80/account-eth)
![dependencies](https://img.shields.io/librariesio/release/npm/account-eth)
![commit](https://img.shields.io/github/last-commit/ayushch80/account-eth)
<br>
![issues](https://badgen.net/github/open-issues/ayushch80/account-eth)
![stars](https://badgen.net/github/stars/ayushch80/account-eth)
# account-eth
Fastest⚡JS library for address generation
## installation
```
npm i account-eth
```
## utils
### `generateRandom()`
generates a random address from random private key
#### usage
```
const { generateRandom } = require('account-eth');
const xyz = generateRandom();
console.log(xyz)
//output
/*
Private Key : 0x05f20d9885086bf7120164b5e4e27e5b67621595473a5ce1634c8e962dd1ea16
Address : 0x6B449C80DC341e790C0219c249eD248a2caB499f
*/
```
### `toAddress()`
generates address of the private key entered
#### usage
```
const { generateRandom } = require('account-eth');
const address = toAddress("0x9ff2670e0eabecc927ce0fb7a46c1e94e7a45f0c25db5d58987a8ac1ea563834")
console.log(address)

//output
//0x2a30A25E540cd44c8Fc4dd688d0Cbf5b860b16a1
```