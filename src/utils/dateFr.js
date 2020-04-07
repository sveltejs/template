export const tableFr = {
    mois: [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
],
moisShort:  [
    "jan.",
    "fév.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juill.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc."
],
jours: [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi"
]
}

export function getHoraire(value){
    //var d = DateTime.fromISO(value).setZone("Europe/Paris");
    var d = new Date(value)
    var minute = d.getMinutes() == 0 ? '00': d.getMinutes();
    return d.getHours() + "h" + minute;
}

export function getJour(value){
    //var d = DateTime.fromISO(value).setZone("Europe/Paris");
    var d = new Date(value)
    console.log('day', d)
    return d.getDay();
}

export function getMoisShort(value) {
    var d = (new Date(value)).getMonth();
    return tableFr.moisShort[d];
}

export function dateInscription(debut, fin) {
    //var leDebut = DateTime.fromISO(debut).setZone("Europe/Paris"); 
    //var laFin = DateTime.fromISO(fin).setZone("Europe/Paris");
    var leDebut = new Date(debut)
    var laFin = new Date(fin)
    var leJour = (new Date(debut)).getDate();
    var leJourSemaine = tableFr.jours[(new Date(debut)).getDay()];
    var leMois = tableFr.mois[(new Date(debut)).getMonth()]
    var minuteDebut = leDebut.getMinutes() == 0 ? '00': leDebut.getMinutes();
    var minuteFin = laFin.getMinutes() == 0 ? '00': laFin.getMinutes();
    return 'le ' + leJourSemaine + ' ' + leJour + ' ' + leMois + ' de ' + leDebut.getHours() + 'h' + minuteDebut + ' à ' + laFin.getHours() + 'h' + minuteFin;
}