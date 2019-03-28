const d3 = require('d3')
const fs = require('fs')

const writeSvg = svg =>
  fs.writeFileSync('graph.svg', svg, 'utf-8') // passez la chaine de charactère à writeSvg pour écrire graph.svg

const data = require('./asylumByCountry.json'); //Je me baserai sur la liste de chaque pays avec leur somme respective

writeSvg(graph(data));