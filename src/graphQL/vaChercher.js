export async function vaChercher(query, entetes, variables) {
    var body = {query: query}
    if (variables!== undefined) {
        body.variables = variables
    }
    var options = {
        method: "POST",
        headers: entetes,
        cache: "no-cache",
        body: JSON.stringify(body)
    }
    return await fetch("https://graphql.labonnefabrique.fr/v1/graphql", options)
        .then(async retour => {
            let resultat = await retour.json();
            console.log('retour VaChercher', resultat)
            return resultat.data
        }).catch((error)=>{console.log('erreur va chercher', error)})
}