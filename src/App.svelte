<script>
    import { Router, Link, Route } from "svelte-routing";
    import Accueil from "./routes/index.svelte";
    import ListeAteliers from "./routes/listeAteliers.svelte";
    import NouvelAtelier from "./routes/nouvelAtelier.svelte";
    import {auth} from "./stores/auth.js"
    import {user} from "./stores/user.js"

    import Header from './layouts/header.svelte'
    import Navigation from "./layouts/navigation.svelte"
    var keycloak = new Keycloak({
        realm: 'LBF',
        url: 'https://cloud.labonnefabrique.fr/auth',
        clientId: 'lbf-frontend'
    })

    keycloak.init({
        onLoad: 'login-required'
    }).then(function(authenticated) {
    if (!authenticated) {keycloak.login()} else {keycloak.loadUserProfile()
    .then(function(profile) {
        var userTemp = {}
        userTemp.nom = profile.lastName
        userTemp.prenom  = profile.firstName
        userTemp.email = profile.email
        userTemp.estAdmin = $auth.hasResourceRole('admin')
        user.set(userTemp)
    }).catch(function() {
        console.log('Failed to load user profile');
    });}
        auth.set(keycloak);
    }).catch(function() {
        console.log('failed to initialize');
    }); 

    export let name = "bibi";
    export let url = "";
</script> 
 
<Router url="{url}">
    <div class="fixed w-full h-20 p-22 flex flex-row bg-gray-900 z-100">
        <Header />
    </div>
    <div class="fixed w-240px h-full bg-gray-900 mt-20 z-100">
        <Navigation />
    </div>
    <div class="ml-240px p-4 pt-20">
        <Route path="NouvelAtelier"> <NouvelAtelier/> </Route>
        <Route path="/" ><Accueil name={name}/></Route>
        <Route path="/ListeAteliers" ><ListeAteliers /></Route>
    </div>
</Router>