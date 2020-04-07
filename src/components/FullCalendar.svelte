<script>
import {onMount} from 'svelte';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'


let calendarEl;

onMount(()=> {
  var calendar = new Calendar(calendarEl, {
    plugins: [timeGridPlugin],
    defaultView: 'timeGridWeek',
    locale: 'fr',
    firstDay: 1,
    slotDuration: '00:30',
    scrollTime: '09:00:00',
    minTime: '09:00:00',
    maxTime: '22:00:00',
    allDaySlot: false,
    buttonText: {
        today:    'aujourd\'hui',
        month:    'mois',
        week:     'semaine',
        day:      'jour',
        list:     'liste'
        }
  });
  calendar.render();
  console.log(calendar.view)
})
</script>

<div >
<div bind:this={calendarEl}></div>
</div>