const d3 = require('d3')
const fs = require('fs')

const writeSvg = svg =>
fs.writeFileSync('graph.svg', svg, 'utf-8') // passez la chaine de charactère à writeSvg pour écrire graph.svg

const data = require('./asylumByCountry.json'); //Je me baserai sur la liste de chaque pays avec leur somme respective



const graph = DATA =>
`<svg width="1000" heigth="1000" xmlns="http://www.w3.org/2000/svg">
${data.map((pays,i) => `<rect width="90" height="${pays.somme*8}" x="${(i)*100}" y="0" fill="blue" />
<text x="${(i)*100}" y="${(100)}" font-family="Comic Sans MS" font-size="12" fill="black" >${pays.p} ${"="} ${pays.somme} </text>`)}
</svg>`



writeSvg(graph(data));