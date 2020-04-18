import { vaChercher } from './vaChercher.js'

export async function listeEspacesBF(auth, isAdmin) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `
            query espacesBF {
            __typename
            espaceBF {
                espace
            }
            }
            `
        retourResultat = await vaChercher(query, entetes)
    }
    ).catch(function() {
        alert('Failed to refresh the token, or the session has expired');
        retourResultat = undefined
    });
return retourResultat!==undefined?retourResultat.espaceBF:undefined
    }