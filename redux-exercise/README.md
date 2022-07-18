This project contains exercises for Técnicas de Diseño - UBA

# Reverse Polish Notation Calculator Exercise

> Reverse Polish notation, also known as Polish postfix notation or simply postfix notation, is a mathematical notation in which operators follow their operands
>
> -- https://en.wikipedia.org/wiki/Reverse_Polish_notation

This calculator has a current number, a stack of previous numbers, and keys that modify them:

- Number keys modify the current number in the usual way.
- Operations act on the top elements of the stack, and return their result to the top of the stack.

With the following restrictions:

- Numbers can have at most one decimal dot.
- If an operation is performed while there is a number being input, the number is moved to the stack before performing the operation.
- If an operation doesn't have enough arguments, it does nothing.
- The "√" operation calculates the square root of the top item in the stack.
- The "Σ" operation sums all items in the stack.
- The "Undo" button reverts the last change that was not an undo.
- The "Intro" operation moves the current number into the stack.

# To run

1. Install Node JS
   1. https://nodejs.org/en/
2. Fork repository, add ayudantesTecnicas as member
3. Run npm install
4. Run npm start
5. Go to http://localhost:3000 to see the calculator

Make changes to

- onClick functions and their usage in src/components/Calculator.jsx
- The files under src/state
