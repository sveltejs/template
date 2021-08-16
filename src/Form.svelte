<script>
import Input from './components/Input.svelte'
import {username} from './store'

function onSubmit(){

}

</script>

<main>
    <form on:submit|preventDefault={onSubmit}>
        <Input label="username" name="username" value={username}/>

        <button class="button" type="submit">Submit</button>
    </form>
</main>