const fetch = require('node-fetch');
const d3 = require('d3');
const R = require('ramda');
const fs = require('fs');

const writeJson = require('./writeJson')

const url = 'https://raw.githubusercontent.com/idris-maps/heig-datavis-2019/master/20190322-node/exercice_node/ch_asylum_demands.csv';

const makeNumbers = function (csv) {
  return csv.map(d => ({affected: Number(d.affected), country: d.country_asylum, year: Number(d.year)}));
}

const removeAffected = function (csv) {
  return csv.filter(element => element.affected >= 0);
}

const makeUSA = function (list) {
  return list.map(d => ({...d, country: d.country.includes("USA") ? "USA" : d.country}));
}

const save = data => fs.writeFile('asylum.json', JSON.stringify(data, null, 2), 'utf-8', err => err ? console.log(err): console.log('Fichier prêt'))

fetch(url)
    .then(data => data.text())
    .then(csv => d3.csvParse(csv))
    .then(csv => makeNumbers(csv))
    .then(csv => removeAffected(csv))
    .then(list => makeUSA(list))
    .then(list => save(list));