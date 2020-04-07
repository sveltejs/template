export function urlImage(nom, optionsURL) {
      let adresse = 'https://res.cloudinary.com/la-bonne-fabrique/image/upload'
      optionsURL.forEach(transformation => {
        adresse = adresse + '/'
        if (!!transformation.cropType) {
          if (adresse.slice(-1) === '/') {
            adresse = adresse + 'c_' + transformation.cropType
          } else {
            adresse = adresse + ',c_' + transformation.cropType
          }
        }
        if (!!transformation.ar) {
          if (adresse.slice(-1) === '/') {
            adresse = adresse + 'ar_' + transformation.ar
          } else {
            adresse = adresse + ',ar_' + transformation.ar
          }
        }
        if (!!transformation.height) {
          if (adresse.slice(-1) == '/') {
            adresse = adresse + 'h_' + transformation.height
          } else {
            adresse = adresse + ',h_' + transformation.height
          }
        }
        if (!!transformation.width) {
          if (adresse.slice(-1) == '/') {
            adresse = adresse + 'w_' + transformation.width
          } else {
            adresse = adresse + ',w_' + transformation.width
          }
        }
        if (!!transformation.qualite) {
          if (adresse.slice(-1) == '/') {
            adresse = adresse + 'q_' + transformation.qualite
          } else {
            adresse = adresse + ',q_' + transformation.qualite
          }
        }

        if (transformation.effet === 'blur') {
          adresse = adresse + ',e_blur:300'
        }
      })
      adresse = adresse + '/' + nom
      return adresse
    }

export function urlImageOriginale(nom, width, height) {
      let urlImage =
        'https://res.cloudinary.com/la-bonne-fabrique/image/upload/f_auto,h_' +
        height.toString() +
        ',w_' +
        width.toString() +
        ',c_pad,b_black/' +
        nom
      return urlImage
    }
