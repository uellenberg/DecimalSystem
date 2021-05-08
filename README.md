<h1 align="center">Decimal System</h1>
<p align="center">
    <a href="https://www.codefactor.io/repository/github/uellenberg/decimalsystem">
        <img src="https://www.codefactor.io/repository/github/uellenberg/decimalsystem/badge" alt="CodeFactor">
    </a>
    <a href="https://codecov.io/gh/uellenberg/DecimalSystem">
        <img src="https://codecov.io/gh/uellenberg/DecimalSystem/branch/master/graph/badge.svg?token=4XYK0SCZ9S" alt="Codecov">
    </a>
    <img src="https://img.shields.io/github/workflow/status/uellenberg/DecimalSystem/Build%20and%20Test/master" alt="Build">
    <img src="https://img.shields.io/npm/dt/decimalsystem" alt="Downloads">
</p>
DecimalSystem is a powerful base conversion library that can convert any (real) number to any base (over 1), including non-integer bases like base PI.

## How?
Using the library is simple. For example, to convert a number to base sqrt(2) is simple:
```typescript
import {Num} from "decimalsystem";

new Num(9).toBase(Math.sqrt(2)).toString(); //1000000.1001
```
And to convert it back:
```typescript
import {Num} from "decimalsystem";

new Num({num: "1000000.1001", base: Math.sqrt(2)}).toBase(10).toString(); //8.957106781186551 (close enough)
```

## Why?
Non-integer number systems are pretty interesting, and the [Wikipedia Article](https://en.wikipedia.org/wiki/Non-integer_base_of_numeration) (which was very unhelpful towards the development of this library) on the subject is fairly limited. Other than that, there are (to my knowledge) no libraries available to convert to non-integer number systems. So I made this to solve that issue.

## Installation
To install it, simply run `npm install decimalsystem`, then use it with:
```typescript
import {Num} from "decimalsystem";
```
Look at the usage instructions above for more information on how to use it.
## Notation
While currently not supported, special notation will be used for negative numbers. Any negative sign at the start of a number signifies that it is a negative number. If some of its digits are negative and others are positive, it will not include a negative sign at the beginning of the number. For example, `-100` and `1[-1]2` are valid, but `-1[-2]3` is not.

## Acknowledgments
https://chridd.nfshost.com/convert/original was extremely helpful towards removing decimals from digits ([7ed5bcb](https://github.com/uellenberg/DecimalSystem/commit/7ed5bcbeb2f97a75dabac5d06fccd1abf3d1c6fe)) as it provided examples of small numbers in non-integer bases which were used to modify the algorithm for converting to non-integer bases to increase precision and remove decimals from digits.