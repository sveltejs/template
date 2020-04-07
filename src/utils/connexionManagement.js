export function verifToken(auth) {
    auth.updateToken(5)
    .then(function(refreshed) {
        return true
    }).catch(function() {
        console.log('pb ou session expirée')
        auth.login()
    });
}