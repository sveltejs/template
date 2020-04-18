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

export async function listeArchivesAteliers(auth, isAdmin) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `query lesAteliers {
        ateliers(where: {espaceBF: {espace: {_eq: "Latelier"}}, _and: {dateFin: {_lt: "now()"}}}, order_by: {dateDebut: asc}) {
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
        }
        `
        retourResultat = await vaChercher(query, entetes)
    }
    ).catch(function() {
        alert('Failed to refresh the token, or the session has expired');
        retourResultat = undefined
    });
return retourResultat!==undefined?retourResultat.ateliers:undefined
    }

export async function effacerAtelier(auth, isAdmin, variables) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `mutation effacerAtelier($id: uuid) {
            delete_ateliers(where: {id: {_eq: $id}}) {
                affected_rows
            }
            }`
        retourResultat = await vaChercher(query, entetes, variables)
    }
    ).catch(function() {
        alert('Failed to refresh the token, or the session has expired');
        retourResultat = undefined
    });
return retourResultat!==undefined?retourResultat.delete_ateliers:undefined
    }

export async function ajouterAtelier(auth, isAdmin, variables) {
    console.log('variables', variables)
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `
            mutation nouvelAtelier(
                $dateDebut: timestamptz
                $dateFin: timestamptz
                $description: String
                $espace: espaceBF_enum
                $titre: String
                $nbParticipants: Int
                $surInscription: Boolean
                $tarifs: _text
                $urlImage: String
            ) {
            __typename
            insert_ateliers(objects: {
                dateDebut: $dateDebut,
                dateFin: $dateFin,
                description: $description,
                espace: $espace,
                nbParticipants: $nbParticipants,
                surInscription: $surInscription,
                tarifs: $tarifs,
                titre: $titre,
                urlImage: $urlImage}) {
                returning {
                id
                }
            }
            }
        `
        retourResultat = await vaChercher(query, entetes, variables)
    }
    ).catch(function() {
        alert('Failed to refresh the token, or the session has expired');
        retourResultat = undefined
    });
console.log('retourTResultat', retourResultat)
return retourResultat!==undefined?retourResultat.insert_ateliers:undefined
    }

export async function majHoraireAtelier(auth, isAdmin, variables) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `mutation majDateAtelier($id: uuid, $dateDebut: timestamptz, $dateFin: timestamptz ) {
            update_ateliers(_set: {dateDebut: $dateDebut, dateFin: $dateFin}, where: {id: {_eq: $id}}) {
                returning {
                id
                }
            }
            }`
        retourResultat = await vaChercher(query, entetes, variables)
    }
    ).catch(function() {
        alert('Failed to refresh the token, or the session has expired');
        retourResultat = undefined
    });
return retourResultat!==undefined?retourResultat.update_ateliers:undefined
    }

    export async function majAtelier(auth, isAdmin, variables) {
        console.log('variables', variables)
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `mutation majAtelier(
            $id: uuid
            $dateDebut: timestamptz
            $dateFin: timestamptz
            $description: String
            $espace: espaceBF_enum
            $titre: String
            $nbParticipants: Int
            $surInscription: Boolean
            $tarifs: _text
            $urlImage: String
        ) {
            update_ateliers(_set: {
                dateDebut: $dateDebut,
                dateFin: $dateFin,
                description: $description,
                espace: $espace,
                nbParticipants: $nbParticipants,
                surInscription: $surInscription,
                tarifs: $tarifs,
                titre: $titre,
                urlImage: $urlImage
            }, where: {id: {_eq: $id}}) {
                returning {
                id
                }
            }
            }`
        retourResultat = await vaChercher(query, entetes, variables)
    }
    ).catch(function() {
        alert('Failed to refresh the token, or the session has expired');
        retourResultat = undefined
    });
return retourResultat!==undefined?retourResultat.update_ateliers:undefined
    }
    

    export async function listeInscrits(auth, isAdmin, variables) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `query listeInscrits($idAtelier: uuid) {
            inscritsAteliers(where: {atelierInscrit: {id: {_eq: $idAtelier}}}) {
                id
                email
                nom
                prenom
                atelierInscrit {
                id
                titre
                tarifs
                urlImage
                dateDebut
                dateFin
                }
            }
            }`
        retourResultat = await vaChercher(query, entetes, variables)
    }
    ).catch(function() {
        alert('Failed to refresh the token, or the session has expired');
        retourResultat = undefined
    });
return retourResultat!==undefined?retourResultat.inscritsAteliers:undefined
    }

    export async function saveNouvelInscrit(auth, isAdmin, variables) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `mutation nouvelInscrit($atelier:uuid, $nom: String, $prenom: String, $email:String) {
            insert_inscritsAteliers(objects: {nom: $nom, prenom: $prenom, atelier: $atelier, email: $email}) {
                returning {
                id
                }
            }
            }`
        retourResultat = await vaChercher(query, entetes, variables)
    }
    ).catch(function() {
        alert('Failed to refresh the token, or the session has expired');
        retourResultat = undefined
    });
return retourResultat!==undefined?retourResultat.insert_inscritsAteliers:undefined
    }

    export async function effaceInscrit(auth, isAdmin, variables) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `mutation effaceInscrit($id: uuid) {
            delete_inscritsAteliers(where: {id: {_eq: $id}}) {
                affected_rows
            }
            }`
        retourResultat = await vaChercher(query, entetes, variables)
    }
    ).catch(function() {
        alert('Failed to refresh the token, or the session has expired');
        retourResultat = undefined
    });
return retourResultat!==undefined?retourResultat.delete_inscritsAteliers:undefined
    }
