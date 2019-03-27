const fetch = require('node-fetch');
const d3 = require('d3');
const R = require('ramda');
const fs = require('fs');

const file = require('./asylum.json');


const saveJSON = data => {
  // data est la liste d'objets créés avec "formatData"
  fs.writeFile(
    'asylumByCountry.json', // le nom du fichier
    JSON.stringify(data, null, 2), // les données transformées en chaîne de charactères
    'utf-8', // l'encodage du fichier
    err => err ? console.log(err) : console.log('Saved file')
    // cette fonction est appelée quand le fichier a été sauvé
    // ou si une erreur est survenue
    // elle prends un argument "err" qui est l'erreur s'il y en a une
    // si "err" existe, nous écrivons l'erreur dans la console
    // sinon nous disons que le fichier a été sauvé
  )
}

const getCountry=country=>{
	const countries = country.map(R.prop('country'))
	return R.uniq(countries)
}

const sumAffectedByCountry = (file, country) =>
  file
   .filter(d => d.country === country) // ne prendre que les éléments relatifs à ce pays
   .map(d => d.affected) // une liste de chiffres genre [1,2,3,1]
   .reduce((result, affected) => result + affected, 0) // faire la somme



const formatData = country => {
	const countries = getCountry(country);
	return countries
	.map(country=>({
		country, 
		affected: sumAffectedByCountry(file,country),
	}))
	 .sort((a, b) => b.affected - a.affected);
}



var data = (formatData(file));
saveJSON(data);
// var test= sumAffectedByCountry('Canada',list)
//saveJSON(test);