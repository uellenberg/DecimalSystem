# DecimalSystem
An experimental library to convert numbers to different number systems, especially non-integer ones. What this means is up for you to decide. If you want to use it, take a look at some tests.

## Why?
Non-integer number systems are pretty interesting, and the [Wikipedia Article](https://en.wikipedia.org/wiki/Non-integer_base_of_numeration) (which was very unhelpful towards the development of this library) on the subject is fairly limited. Other than that, there are (to my knowledge) no libraries available to convert to non-integer number systems. So I made this to solve that issue.

## Notation
While currently not supported, special notation will be used for negative numbers. Any negative sign at the start of a number signifies that it is a negative number. If some of its digits are negative and others are positive, it will not include a negative sign at the beginning of the number. For example, `-100` and `1[-1]2` are valid, but `-1[-2]3` is not.

## Acknowledgments
https://chridd.nfshost.com/convert/original was extremely helpful towards removing decimals from digits ([7ed5bcb](https://github.com/uellenberg/NumberSystems/commit/7ed5bcbeb2f97a75dabac5d06fccd1abf3d1c6fe)) as it provided examples of small numbers in non-integer bases which were used to modify the algorithm for converting to non-integer bases to increase precision and remove decimals from digits.