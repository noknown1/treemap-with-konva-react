This project is an example for how to create and render a treemap (squarified) in Javascript using react-konva.
It allows you to render the treemap from some data, as well as filter our specific categories from the data.

## Dependancies

- squarify (npm install --save squarify), https://www.npmjs.com/package/squarify
- react-konva (npm install react-konva konva --save), https://www.npmjs.com/package/react-konva

## Data

Data should be provided somehow in the 'getData()' function in 'data.js'. Keep in mind that it should be formatted 
according to the squarify package. Look to the Usage section at https://www.npmjs.com/package/squarify to see how this
is done.