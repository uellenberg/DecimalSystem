# NumberSystem
An experimental library to convert numbers to different number systems, especially non-integer ones. What this means is up for you to decide. If you want to use it, take a look at some tests.

## Why?
Non-integer number systems are pretty interesting, and the [Wikipedia Article](https://en.wikipedia.org/wiki/Non-integer_base_of_numeration) (which was very unhelpful towards the development of this library) on the subject is fairly limited. Other than that, there are (to my knowledge) no tools available to convert to non-integer number systems. So I made this to solve that issue.

## Limitations
This library is extremely imprecise at small number systems. For example, base 2.5 is off by +- .15, and base sqrt(2) is unusable. For larger number systems, however, this library performs extremely well.