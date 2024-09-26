const fetch = require('node-fetch');
const d3 = require('d3');
const R = require('ramda');
const fs = require('fs');

const file = require('./asylum.json');

const saveJSON = data => {
  fs.writeFile(
    'asylumByCountry.json',
    JSON.stringify(data, null, 2),
    'utf-8',
    err => err ? console.log(err) : console.log('Saved file')
  )
}

const getCountry = country => {
  const countries = country.map(R.prop('country'));
  return R.uniq(countries);
}

const sumAffectedByCountry = (file, country) =>
  file
   .filter(d => d.country === country)
   .map(d => d.affected)
   .reduce((result, affected) => result + affected, 0)

const formatData = country => {
  const countries = getCountry(country);
  return countries
  .map(country=>({
    country, 
    sum: sumAffectedByCountry(file,country),
  }))
   .sort((a, b) => b.affected - a.affected);
}

var data = (formatData(file));
saveJSON(data);