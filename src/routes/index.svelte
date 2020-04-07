<script>
import { auth } from "./../stores/auth.js"
import { user } from "./../stores/user.js"
import * as ateliersGQL from "./../graphQL/ateliers.js"
import * as connexionManagement from './../utils/connexionManagement.js'
import ImageUpload from "./../components/imageUpload.svelte"
import Fa from 'svelte-fa'
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons'
// composant imageUpload test
import { urlImage } from './../utils/urlImages.js'
const optionsULRThumbs = [
        {
          ar: '16:9',
          cropType: 'fill'
        },
        {
          width: 'auto',
          qualite: 'auto',
          cropType: 'scale'
        }
      ]

var lesAteliers;
var illustration = "u6iuwlfyik8lyedep2l3.png"

async function getListesAteliers() {
    lesAteliers = await ateliersGQL.listeAteliers($auth, $user.estAdmin)
}

$: if ($auth) {console.log("auth index", $auth.hasResourceRole('admin'))}

$:     if ($auth && $user) {getListesAteliers()}
$: console.log('les ateliers', lesAteliers)

</script>

<main>
	<h1 >Titre h1</h1>
    <h2 >Titre h2</h2>
    <h3 >Titre h3</h3>
    <h4 >Titre h4</h4>
    <h5 >Titre h5</h5>
    <h6 >Titre h6</h6>
	<p class="body-1 my-2">Body-1 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec leo ut dui tincidunt euismod ac id nisi. Quisque finibus dolor vel lacus imperdiet rhoncus. Integer vehicula quis tellus pharetra eleifend. Nulla egestas, dolor in mattis iaculis, dolor magna ultrices justo, vitae consectetur libero felis sed enim. Cras at sodales enim. Vivamus aliquam massa nibh, ac consequat mauris placerat ut. Proin egestas non massa eu molestie. Mauris vitae nibh ultrices est posuere elementum. Proin gravida magna metus, id auctor ex vestibulum in. Nunc id ipsum nec mi aliquam bibendum. Ut in leo mollis, dictum massa sed, aliquam lorem. Integer tincidunt velit ac neque aliquet, ut faucibus sapien rhoncus. Nulla hendrerit a sem ac tempus. Curabitur vitae elit vitae ex luctus malesuada vitae vel erat.</p>
    <p class="body-2 my-2">Body-2 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec leo ut dui tincidunt euismod ac id nisi. Quisque finibus dolor vel lacus imperdiet rhoncus. Integer vehicula quis tellus pharetra eleifend. Nulla egestas, dolor in mattis iaculis, dolor magna ultrices justo, vitae consectetur libero felis sed enim. Cras at sodales enim. Vivamus aliquam massa nibh, ac consequat mauris placerat ut. Proin egestas non massa eu molestie. Mauris vitae nibh ultrices est posuere elementum. Proin gravida magna metus, id auctor ex vestibulum in. Nunc id ipsum nec mi aliquam bibendum. Ut in leo mollis, dictum massa sed, aliquam lorem. Integer tincidunt velit ac neque aliquet, ut faucibus sapien rhoncus. Nulla hendrerit a sem ac tempus. Curabitur vitae elit vitae ex luctus malesuada vitae vel erat.</p>

<ImageUpload nomImage={illustration} options = {optionsULRThumbs} altImage="Une il" />

</main>

