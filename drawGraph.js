const d3 = require('d3')
const fs = require('fs')


const data = require('./asylumByCountry.json')

const writeSvg = svg =>
  fs.writeFileSync('graph.svg', svg, 'utf-8')
// passez la chaine de charactère à writeSvg pour écrire graph.svg


// configuration du graphique
const WIDTH = 500
const HEIGHT = 500
const BAR_SPACE = HEIGHT / data.length
const BAR_HEIGHT = BAR_SPACE * 0.7
const BAR_COLOR = 'steelblue'
const NAME_MARGIN_LEFT = WIDTH / 50
const NAME_COLOR = 'black'
const SUM_MARGIN_RIGHT = WIDTH / 50
const SUM_COLOR = 'black'

const scale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.affected)])
  .range([0, WIDTH])

  const drawBar = (sum, index) =>
  `<rect
    y="${index * BAR_SPACE}"
    height="${BAR_HEIGHT}"
  width="${scale(sum)}" 
      fill="${BAR_COLOR}"/>`

    const drawBars = data =>
  data
    // pour chaque élément de la liste nous passons la clé "sum" et l'index à "drawBar"
    .map((d, i) => drawBar(d.affected, i))
    // "drawBar" retourne une chaîne de charactères que nous joignons avec "\n" (à la ligne)
    .join('\n')


const writeCountryName = (name, index) =>
  `<text
    x="${NAME_MARGIN_LEFT}"
    y="${index * BAR_SPACE + BAR_HEIGHT * 0.7}"
    fill="${NAME_COLOR}">
    ${name.toUpperCase()}
  </text>`

// écrire tous les noms d'artistes
const writeNames = data =>
  data
    .map((d, i) => writeCountryName(d.country, i))
    .join('\n')



const writeNumberofDemands = (sum, index) =>
  `<text
    x="${scale(sum) - SUM_MARGIN_RIGHT}"
    y="${index * BAR_SPACE + BAR_HEIGHT * 0.7}"
    fill="${SUM_COLOR}"
    text-anchor="end">
    ${sum}
    </text>`

// écrire le nombre de chansons sur tous les bâtons
const writeNumbersofDemands = data =>
  data
    .map((d, i) => writeNumberofDemands(d.affected, i))
    .join('\n')


    const svg = data => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${drawBars(data)}
   ${writeNumbersofDemands(data)}
      ${writeNames(data)}


  </svg>
`
// écrire le fichier "graph.svg"
fs.writeFileSync('graphe.svg', svg(data), 'utf-8')

