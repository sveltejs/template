<script>
    import {onMount, onDestroy, createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher();

    import {createCloudinary} from './../utils/cloudinary.js'
    import FilePond from 'filepond'
    //console.log("fp", FilePond)

    let inputElement;
    var pond;

    function onProcessFile(error, file) {
        console.log('terminé !', pond)
        dispatch('uploadDone', {
                fileProps: {idImage: file.serverId, format: file.fileExtension}
            });
        pond.removeFile();
    }

    onMount(async () => {
        pond = FilePond.create( inputElement, {
            server: createCloudinary("la-bonne-fabrique", "howigptf"),
            onprocessfile: onProcessFile,
            labelIdle: 'Déposez vos fichiers ou <span class="filepond--label-action"> cliquez </span>',
            labelFileProcessing: 'Téléversement en cours',
            labelTapToCancel: 'Cliquez sur le cercle pour annuler',
            labelFileProcessingComplete: 'Téléversement terminé',
            labelFileLoadError: 'Un problème est survenu',
            labelTapToRetry: 'Cliquez sur le cercle pour essayer à nouveau'
        } );
    })

    onDestroy(() => {
        pond.destroy()
    })

</script>

<div>
    <input type="file" bind:this={inputElement}>
</div>
