import { vaChercher } from './vaChercher.js'

export async function envoieEmail(auth, isAdmin, variables) {
    var retourResultat;
    await auth.updateToken(5)
    .then(async function(refreshed) {
        const entetes = {
            Authorization: 'Bearer ' + auth.token,
            'x-hasura-role': isAdmin ? 'admin': 'user'
        }
        const query = `mutation envoiMail($email: [String!]!, $template: String, $templateId: String) {
                    sendEmail(
                    from: "atelierdusappey@gmail.com"
                    to: $email
                    templateId: $templateId
                    dynamic_template_data: $template
                    ) {
                    success
                    }
                }`
        retourResultat = await vaChercher(query, entetes, variables)
    }
    ).catch(function() {
        alert('Failed to refresh the token, or the session has expired');
        retourResultat = undefined
    });
return retourResultat!==undefined?retourResultat.sendEmail:undefined
    }