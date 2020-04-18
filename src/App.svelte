<script context="module">
  import { register } from 'svelte-loadable'

  // Loaders must be registered outside of the render tree.
  const agendaAteliers = register({
    loader: () => import('./routes/agendaAteliers.svelte'),
    resolve: () => './agendaAteliers'
  })
  const archivesAteliers = register({
    loader: () => import('./routes/archivesAteliers.svelte'),
    resolve: () => './archivesAteliers'
  })
  const HomeLoader = register({
    loader: () => import('./routes/index.svelte'),
    resolve: () => './'
  })
</script>

<script>
    import { Router, Link, Route } from "svelte-routing";
    import Loadable from 'svelte-loadable'
    import Chargement from './components/chargement.svelte'

    import { listeEspacesBF } from './graphQL/espacesBF.js'

    import { auth } from "./stores/auth.js"
    import { user } from "./stores/user.js"
    import { espacesBF } from "./stores/espacesBF.js"

    import Header from './layouts/header.svelte'
    import Navigation from "./layouts/navigation.svelte"
    var flagEspace = false

    $: if ($auth && $user && $espacesBF && !flagEspace) {
        listeEspacesBF($auth, $user.estAdmin).then(async (retour )=>{
        var listeEspaces = []
        retour.forEach((valeur) => {
            listeEspaces.push({label: valeur.espace.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/(L)(e)/g, '$1\'$2').replace(/(L)(ate)/g, '$1\'$2').replace('Partage', 'partagé'), value: valeur.espace})
        })
        espacesBF.set(listeEspaces)
        flagEspace = true
    })
    }

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

    // export let name = "bibi";
    export let url = "";
</script> 
 
<Router url={url}>
    <div class="fixed w-full h-20 p-22 flex flex-row bg-gray-900 z-20">
        <Header />
    </div>
    <div class="fixed w-240px h-full bg-gray-900 mt-20 z-20">
        <Navigation />
    </div>
    <div class="ml-240px p-4 pt-20">
        <Route path="/agendaAteliers" >
            <Loadable loader="{agendaAteliers}">
            <div slot="loading">
                <Chargement>La page se charge, merci de patienter...</Chargement>
            </div>
            </Loadable>
        </Route>
        <Route path="/archivesAteliers" >
            <Loadable loader="{archivesAteliers}">
            <div slot="loading">
                <Chargement>La page se charge, merci de patienter...</Chargement>
            </div>
            </Loadable>
        </Route>
        <Route path="/">
            <Loadable loader="{HomeLoader}" />
            <div slot="loading">
                <Chargement>La page se charge, merci de patienter...</Chargement>
            </div>
        </Route>
    </div>
</Router>

<!-- 
    
        <svelte:component this={cmp} />
    </div>
    -->