// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./dependencies/prb-math/PRBMathSD59x18.sol";

/// @title Statistics 
/// @author DeltaDex
/// @notice probability density function (pdf), cumulative distribution function (cdf), error function (erf)
/// @dev sourced from https://www.johndcook.com/blog/cpp_phi/
/// @dev link: https://github.com/DeltaDex-Protocol/research/blob/1048345ba7b75634892f4312d4e7d043d753377b/cdf.cpp

library Statistics {
    using PRBMathSD59x18 for int256;

    int constant a1 = 254829592000000000;
    int constant a2 = -284496736000000000;
    int constant a3 = 1421413741000000000;
    int constant a4 = -1453152027000000000;
    int constant a5 = 1061405429000000000;
    int constant p = 327591100000000000;

    int constant SQRT_2 = 1414213562373095100;

    // @dev probability density function
    // another way to calculate => (1/(math.sqrt(2*math.pi))) * math.e**(-1**2 / 2)
    function pdf(int x) public pure returns (int y) {
        y = ((-1 * x.pow(2e18)).div(2e18)).exp().div(2506628274631000200);
        return y;
    }
    
    // @dev cumulative distribution function
    function cdf(int x) public pure returns (int y) {
        y = (erf(x.div(SQRT_2)) + 1e18).div(2e18);
        return y;
    }

    // @dev error function 
    function erf(int x) public pure returns (int y) {
        // save the sign
        int sign = 1;
        if (x < 0) {
            sign = -1;
        }
        x = x.abs();
        int t = 1e36/ (1e18 + (p*x) / 1e18);
        y = 1e18 - ((((((a5*t/1e18 + a4)*t/1e18) + a3)*t/1e18 + a2)*t/1e18 + a1)*t/1e18) * ((-x*x)/1e18).exp() / 1e18;

        return sign*y; 
    }
}