# statistics_solidity

`Statitics Functions` in Solidity

# Usage

With npm:

```bash
$ npm i statistics_solidity
```

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@partylikeits1983/statistics_solidity/contracts/Statistics.sol";

contract model {

    function test(int x) public view returns (int y) {

        y = Statistics.pdf(x);

        return y;
    }
}
```

Version 1.0

| Functions | Description                                                                                        | Gas Estimation |
| --------- | -------------------------------------------------------------------------------------------------- | -------------- |
| pdf       | [Probability Density Function](https://en.wikipedia.org/wiki/Probability_density_function)         | 32869          |
| cdf       | [Cumulative Distribution Function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) | 31522          |
| err       | [Error Function](https://en.wikipedia.org/wiki/Error_function)                                     | 30137          |

## Testing

```sh
npx hardhat test test/stats.test.js
```

```sh
node test/stats.js
```

## License

Licensed under either of

- [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
- [MIT license](http://opensource.org/licenses/MIT)

at your option.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you, as defined in the Apache-2.0 license, shall be
dual licensed as above, without any additional terms or conditions.
