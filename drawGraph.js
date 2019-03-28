const d3 = require('d3')
const fs = require('fs')

const writeSvg = svg =>
  fs.writeFileSync('graph.svg', svg, 'utf-8')
// passez la chaine de charactère à writeSvg pour écrire graph.svg

const DATA = require('./asylumByCountry.json');

const graph = DATA => `<svg width="1920" heigth="1080" xmlns="http://www.w3.org/2000/svg">
	${DATA.map((d,i) => `<rect width="30" height="${d.somme*10}" x="${(i+1)*65}" y="0" fill="green" />
	<text x="${(i+1)*65}" y="${(d.somme*10)+15}" font-family= "monospace" font-size="10">${d.p} ${d.somme} </text>`)}
	</svg>`



writeSvg(graph(DATA));