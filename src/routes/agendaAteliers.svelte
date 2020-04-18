<script>
import {onDestroy} from 'svelte'
import {buildSiteAtelier} from './../utils/updateNetlify.js'
import FormAtelier from './../components/FormAtelier.svelte'
import Dialog from '../components/Dialog.svelte';
import Busy from '../components/busy.svelte'
import {onMount} from 'svelte';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { listeAteliers, majHoraireAtelier } from "./../graphQL/ateliers.js"
import { auth } from "./../stores/auth.js"
import { user } from "./../stores/user.js"

import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

let flagDialogAtelier = false;
let dateDebutAtelier = new Date();
let dateFinAtelier = new Date();

let calendarEl;
let calendar;
let lesAteliers=[];
let flagMAJAtelier = false;
let flagEdition = false;
let dataAtelier = {
    id: "",
    titre:"",
    espace: "Latelier",
    urlImage: "logoLBFSeul_a1t4af.png",
    nbParticipants: 8,
    surInscription: true,
    dateDebut: new Date(),
    dateFin: new Date(),
    description: "Une description",
    inscrits:[],
    tarifs: [ [ "Adhérent", "10", true ], [ "Non adhérent", "15", false ] ]
}

function majListeAteliers() {

    flagDialogAtelier = false
    flagMAJAtelier = true
    listeAteliers($auth, $user.estAdmin).then((ateliers) => {
        lesAteliers = ateliers
        flagMAJAtelier = false
    })
}

function updateHoraireAtelier(id, debut, fin) {
    flagMAJAtelier = true
    const variables = {
        id: id,
        dateDebut: debut,
        dateFin: fin
    }
    if ($auth && $user) {
        majHoraireAtelier($auth, $user.estAdmin, variables).then((retour) => {
            flagMAJAtelier = false
            majListeAteliers()
        })
    }
}

$: {
    if (calendar) {
        calendar.removeAllEvents()
        let lesEvents = calendar.getEvents()
        lesAteliers.forEach((atelier)=> {
            const atelierEvent = {
                id: atelier.id,
                title: atelier.titre,
                start:atelier.dateDebut,
                end:atelier.dateFin,
                editable: atelier.inscritsAteliers.length===0,
                extendedProps: atelier,
                color: "#ee732e"
            }
            calendar.addEvent(atelierEvent)
        })
    }
}

onMount(async ()=> {
    calendar = new Calendar(calendarEl, {
        selectable: true,
        editable: true,
        plugins: [timeGridPlugin, interactionPlugin],
        defaultView: 'timeGridWeek',
        locale: 'fr',
        firstDay: 1,
        slotDuration: '00:30',
        scrollTime: '09:00:00',
        slotMinTime: '09:00:00',
        slotMaxTime: '22:00:00',
        allDaySlot: false,
        buttonText: {
            today:    'aujourd\'hui',
            month:    'mois',
            week:     'semaine',
            day:      'jour',
            list:     'liste'
            },
        select: function(info) {
            dataAtelier.dateDebut = info.start
            dataAtelier.dateFin = info.end
            flagEdition = false
            flagDialogAtelier = true
        },
        eventResize: function(info) {
            updateHoraireAtelier(info.event.id, info.event.start, info.event.end)
        },
        eventDrop: function(info) {
            updateHoraireAtelier(info.event.id, info.event.start, info.event.end)
        },
        eventClick: function(info) {
            flagEdition = true
            dataAtelier = {}
            dataAtelier = info.event.extendedProps
            flagDialogAtelier = true
        },
        eventContent: function (args) {
            let leTitre = document.createElement('div')
            leTitre.classList.add('event-titre-atelier')
            leTitre.textContent = args.event.title
            let illustration = document.createElement('img')
            illustration.src='https://res.cloudinary.com/la-bonne-fabrique/image/upload/c_fill,w_auto,q_40/' + args.event.extendedProps.urlImage
            illustration.classList.add('event-img-atelier')
            let arrayOfDomNodes = [ leTitre, illustration ]
            return { domNodes: arrayOfDomNodes }
        } 
    });
    calendar.render();
    majListeAteliers()
})

onDestroy(()=> {
    console.log('destroy')
    buildSiteAtelier()
})

</script>

<main >
    <div bind:this={calendarEl} ></div>
    <!-- dialog info Atelier -->
    <Dialog bind:visible={flagDialogAtelier} on:close={majListeAteliers}>
        <FormAtelier bind:dataAtelier={dataAtelier} bind:flagEdition={flagEdition} on:close={majListeAteliers}/>
    </Dialog>
    <!-- operation en cours -->
    <Busy visible={flagMAJAtelier} >Modification de la fiche atelier en cours...</Busy>
</main>