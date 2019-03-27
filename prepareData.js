
/*
  writeJson prends deux arguments:
    * le nom du fichier
    * un objet ou une liste JSON

  ex:
    writeJson('asylum.json', data)

	Utilisez node-fetch pour télécharger le fichier disponible ici
	Utilsez d3.parseCsv pour transformer en JSON
	Enlevez les lignes où affected est inconnu (*)
	Dans chaque objet affected et year doivent être numériques (1999, pas "1999")
	Les États-Unis sont divisés en deux USA (EOIR) et USA (INS/DHS), changez les en USA

	exemple
	const data =[{a:'1',b:'x' },{a:'2',b:'y'}]
	numb (data[0].a)
	=>1

	data.map(d => Number(d.a))
		=> [1,2]

	data.map(d=> ({...d,a:Number(d.a)}))
*/



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

const URL = 'https://raw.githubusercontent.com/idris-maps/heig-datavis-2019/master/20190322-node/exercice_node/ch_asylum_demands.csv'
// le lien vers le fichier CSV

// télécharge le fichier disponible via l'url
fetch(URL)

// transforme le fichier csv en texte
.then(r => r.text())

// transforme en JSON
.then(d3.csvParse)

// Enlevez les lignes où affected est inconnu (*)
.then(list => list.filter(d => d.affected !== "*"))

// affected et year doivent être numériques (1999, pas "1999")
.then(data => data.map(d => ({...d, year: Number(d.year)})))
.then(data => data.map(d => ({...d, affected: Number(d.affected)})))

// USA (EOIR) et USA (INS/DHS) deviennent USA
// si cela contient usa (?) on remplace par usa sinon (:) on affiche juste le pays
.then(data => data.map(d => ({...d, country_asylum: d.country_asylum.includes("USA") ? "USA" : d.country_asylum})))

.then(console.log)
