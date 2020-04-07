import { vaChercher } from './vaChercher.js'

export async function listeIllustrationsByEspace(auth, isAdmin, variables) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `
            query listeIllustrationFSelonEspace($espace: espaceBF_enum, $typeIllustration: TypeIllustration_enum) {
            __typename
            illustrations(where: {espace: {_eq: $espace}, _and: {typeIllustration: {_eq: $typeIllustration}}}) {
                id
                idImage
                format
            }
            }
            `
        retourResultat = await vaChercher(query, entetes, variables)
    }
    ).catch(function(error) {
        console.log('Failed to refresh the token, or the session has expired', error);
        retourResultat = undefined
    });
return retourResultat!==undefined?retourResultat.illustrations:undefined
    }

export async function ajoutIllustration(auth, isAdmin, variables) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query =     `
            mutation insert_illustration(
                $idImage: String!
                $format: String!
                $espace: espaceBF_enum!
                $typeIllustration: TypeIllustration_enum!
            ) {
                __typename
                insert_illustrations(
                objects: {
                    format: $format
                    idImage: $idImage
                    espace: $espace
                    typeIllustration: $typeIllustration
                }
                ) {
                returning {
                    id
                }
                }
            }
            `
        retourResultat = await vaChercher(query, entetes, variables)
    }
    ).catch(function(error) {
        console.log('Failed to refresh the token, or the session has expired', error);
        retourResultat = undefined
    });
        return retourResultat!==undefined?retourResultat.insert_illustrations:undefined
    }

export async function effaceCloudinary(auth, isAdmin, variables) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query =     `
            query effaceImage($imageId: String!) {
                effaceImage(imageId: $imageId) {
                message
                }
            }
            `
        retourResultat = await vaChercher(query, entetes, variables)
    }
    ).catch(function(error) {
        console.log('Failed to refresh the token, or the session has expired', error);
        retourResultat = undefined
    });
        return retourResultat!==undefined?retourResultat.effaceImage:undefined
    }

    export async function effaceIllustration(auth, isAdmin, variables) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `
            mutation deleteIllu($id: uuid!) {
                __typename
                delete_illustrations(where: { id: { _eq: $id } }) {
                returning {
                    id
                }
                }
            }
            `
        retourResultat = await vaChercher(query, entetes, variables)
    }
    ).catch(function(error) {
        console.log('Failed to refresh the token, or the session has expired', error);
        retourResultat = undefined
    });
        return retourResultat!==undefined?retourResultat.delete_illustrations:undefined
    }
