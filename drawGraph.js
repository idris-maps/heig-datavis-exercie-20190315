const d3 = require('d3')
const fs = require('fs')

const writeSvg = svg =>
  fs.writeFileSync('graph.svg', svg, 'utf-8')
// passez la chaine de charactère à writeSvg pour écrire graph.svg

const DATA = require('./asylumByCountry.json');

const graph = DATA => `<svg width="1920" heigth="1080" xmlns="http://www.w3.org/2000/svg">
	${DATA.map((d,i) => `<rect x="${(i+1)*87}" y="${d.somme}"  fill="green" />
						<text x="${(i+1)*80}" y="30" font-family="Helvetica" font-size="10">${d.p}(${d.somme})</text>`).join('\n')}
						<text x="700" y="220" font-family="Helvetica" font-size="20">Demandes d'asiles par pays</text>
</svg>`



writeSvg(graph(DATA));