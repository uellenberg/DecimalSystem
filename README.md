# NumberSystem
An experimental library to convert numbers to different number systems, especially non-integer ones. What this means is up for you to decide. If you want to use it, take a look at some tests.

## Why?
Non-integer number systems are pretty interesting, and the [Wikipedia Article](https://en.wikipedia.org/wiki/Non-integer_base_of_numeration) (which was very unhelpful towards the development of this library) on the subject is fairly limited. Other than that, there are (to my knowledge) no tools available to convert to non-integer number systems. So I made this to solve that issue.

## Limitations
This library is extremely imprecise at small number systems. For example, base 2.5 is off by +- .15, and base sqrt(2) is unusable. For larger number systems, however, this library performs extremely well.

## Notation
When using non-integer bases, some digits cannot be represented with the standard notation. Because of this, this library includes a small extension to the notation of number: any non-decimal digits may not always be integers, and to express them, they are enclosed with brackets ([]). Anything inside of brackets is considered to be a single digit. For example, the number `12[3.5]45` has 5 digits, the third being `3.5`. 

While currently not supported, this should also extend to negative numbers. Any negative sign at the start of a number signifies that it is a negative number. If some of its digits are negative and others are positive, it will not include a negative sign at the beginning of the number. For example, `-100` and `1[-1]2` are valid, but `-1[-2]3` is not.