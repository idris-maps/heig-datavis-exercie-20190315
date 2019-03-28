const R = require('ramda')
const writeJson = require('./writeJson')
/*
  writeJson prends deux arguments:
    * le nom du fichier
    * un objet ou une liste JSON

  ex:
    writeJson('asylumByCountry.json', list)
*/


const data = require('./asylum.json')
// asylum.json doit être créé avec prepareData


const pays = R.uniq(data.map(d => d.country_asylum))//Sert à retourner le nom de tous les pays présents dans la liste seulement 1 seule fois.

//Le calcul des sommesest identitiques à l'exercice des villes fait il y a quelques semaines
const calcSomme = (resultat, d) => resultat + d
const somme = pays => data.filter(d => d.country_asylum === pays).map(d => d.affected).reduce(calcSomme, 0)

//Je liste chaque pays avec leur somme respective
const statistiques = pays.map(p => ({p, somme:somme(p)}))

writeJson('asylumByCountry.json', statistiques) //Crée le fichier asylumByCountry.json