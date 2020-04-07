import { vaChercher } from './vaChercher.js'

export async function listeAteliers(auth, isAdmin) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `query lesAteliers {
            __typename
            ateliers(where: {espaceBF: {espace: {_eq: "Latelier"}}}, order_by: {dateDebut: asc}) {
                id
                titre
                dateFin
                dateDebut
                description
                espace
                nbParticipants
                surInscription
                tarifs
                urlImage
                inscritsAteliers {
                id
                email
                nom
                prenom
                }
            }
            }`
        retourResultat = await vaChercher(query, entetes)
    }
    ).catch(function() {
        alert('Failed to refresh the token, or the session has expired');
        retourResultat = undefined
    });
return retourResultat!==undefined?retourResultat.ateliers:undefined
    }