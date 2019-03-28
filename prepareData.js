const fetch = require('node-fetch')
const d3 = require('d3')
const R = require('ramda')
const writeJson = require('./writeJson')

/*
  writeJson prends deux arguments:
    * le nom du fichier
    * un objet ou une liste JSON
  
  ex:
    writeJson('asylum.json', data)
*/

const URL = 'https://raw.githubusercontent.com/idris-maps/heig-datavis-2019/master/20190322-node/exercice_node/ch_asylum_demands.csv' //Je charge le fichier .csv
fetch(URL)
    .then(data => data.text()) //Je transforme toutes les données de l'URL en format text
    .then(d3.csvParse) //Converti en Json
    .then(data => data.filter(x => x.affected !=="*")) //Parcours le tableau et supprime tout élément affected étant rempli par un  * 
    .then(data => data.map(x => ({...x, affected:Number(x.affected),year:Number(x.year)}))) //Converti les chaînes de caractères des colonnes affected et year en format numérique
    .then(data => data.map(x =>({...x,country_asylum: x.country_asylum.includes("USA") ? "USA" : x.country_asylum}))) //Transforme toute donnée dans la colonne country possédant les lettres "USA" en USA
    .then(data => writeJson('asylum.json', data)) //Crée le fichier asylum.json