const d3 = require('d3')
const fs = require('fs')

const data = require('./asylumByCountry.json')

const writeSvg = svg =>
  fs.writeFileSync('graph.svg', svg, 'utf-8')

const WIDTH = 500
const HEIGHT = 500
const BAR_SPACE = HEIGHT / data.length
const BAR_HEIGHT = BAR_SPACE * 0.7
const BAR_COLOR = '#1F40E6'
const NAME_MARGIN_LEFT = WIDTH / 50
const NAME_COLOR = 'white'
const SUM_MARGIN_RIGHT = WIDTH / 50
const SUM_COLOR = 'white'

const scale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.sum)])
  .range([0, WIDTH])

  const drawBar = (sum, index) =>
  `<rect
    y="${index * BAR_SPACE}"
    height="${BAR_HEIGHT}"
  width="${scale(sum)}" 
      fill="${BAR_COLOR}"/>`

    const drawBars = data =>
  data
    .map((d, i) => drawBar(d.sum, i))
    .join('\n')

const writeCountryName = (name, index) =>
  `<text
    x="${NAME_MARGIN_LEFT}"
    y="${index * BAR_SPACE + BAR_HEIGHT * 0.7}"
    fill="${NAME_COLOR}">
    ${name.toUpperCase()}
  </text>`

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

const writeNumbersofDemands = data =>
  data
    .map((d, i) => writeNumberofDemands(d.sum, i))
    .join('\n')

    const svg = data => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${drawBars(data)}
    ${writeNumbersofDemands(data)}
    ${writeNames(data)}
  </svg>
`

fs.writeFileSync('graphe.svg', svg(data), 'utf-8')