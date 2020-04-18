export const dateFr = {
    mois: [
    ["janvier", "jan."],
    ["février", "fév."],
    ["mars", "mars"],
    ["avril", "avr."],
    ["mai", "mai"],
    ["juin", "juin"],
    ["juillet", "juil."],
    ["août", "août"],
    ["septembre", "sept."],
    ["octobre", "oct."],
    ["novembre", "nov."],
    ["décembre", "déc."]
],
jours: [
    ["dimanche", "dim."],
    ["lundi", "lun."],
    ["mardi", "mar."],
    ["mercredi", "mer."],
    ["jeudi", "jeu."],
    ["vendredi", "ven."],
    ["samedi", "sam."]
]
}

export function getHoraire(value){
    var d = new Date(value)
    var minute = d.getMinutes() == 0 ? '00': d.getMinutes();
    return d.getHours() + "h" + minute;
}

export function getJour(value){
    var d = new Date(value)
    return d.getDate();
}

export function getMoisShort(value) {
    var d = (new Date(value)).getMonth();
    return dateFr.mois[d][1];
}

export function dateInscription(debut, fin) {
    var leDebut = new Date(debut)
    var laFin = new Date(fin)
    var leJour = (new Date(debut)).getDate();
    var leJourSemaine = dateFr.jours[(new Date(debut)).getDay()][0];
    var leMois = dateFr.mois[(new Date(debut)).getMonth()][0]
    var minuteDebut = leDebut.getMinutes() == 0 ? '00': leDebut.getMinutes();
    var minuteFin = laFin.getMinutes() == 0 ? '00': laFin.getMinutes();
    return 'le ' + leJourSemaine + ' ' + leJour + ' ' + leMois + ' de ' + leDebut.getHours() + 'h' + minuteDebut + ' à ' + laFin.getHours() + 'h' + minuteFin;
}