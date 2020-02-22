// Not in use

import firebase from './firebase.js'


const startEmailLogin = (email = "wally5@wally.com", password = "wally5") => {

    console.log("startEmailLogin... Email:", email + ' ' + password)
    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
        
        console.log("Auth worked...", result)
        return result

    }, (error) => {
        
        console.log("Auth error:", error)

    })
}

export { startEmailLogin as default }
