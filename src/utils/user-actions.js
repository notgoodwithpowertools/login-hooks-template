import { firebaseRef, firestoreDB } from './firebase.js'

// export function saveUser (user, userName) {
let defURL = 'https://firebasestorage.googleapis.com/v0/b/fstore1-dev.appspot.com/o/userimages%2Fdefault2.png?alt=media&token=89913c6c-ce6b-4380-a7b8-b4da5a6af2db';
if (process.env.NODE_ENV === 'development') {
    // defURL = 'https://firebasestorage.googleapis.com/v0/b/footytips-dev.appspot.com/o/userimages%2Fdefault.jpg?alt=media&token=c534d444-e8c5-4738-838e-2b9275090878';
    defURL = 'https://firebasestorage.googleapis.com/v0/b/fstore1-dev.appspot.com/o/userimages%2Fdefault2.png?alt=media&token=89913c6c-ce6b-4380-a7b8-b4da5a6af2db';
};

const addUserToFBLeaderBoard = ( user, userName, imageURL ) => {
    
    console.log("Adding user to Firebase Leaderboard...", userName);
    firebaseRef.child(`leaderboard/${user.uid}/`)
        .set({
            name: userName,
            imageURL: imageURL
        })
        // .then(() => user)
        .then(function() {
            console.log("Document successfully written to Firebase Leaderboard store", userName);
        })
        .catch(function(error) {
            console.error("Error writing document to Firebase Leaderboard: ", error);
        });
}

const addUserToFS = ( user, userName, imageURL ) => {

    console.log("Adding user to Firestore User list ...", userName)
    firestoreDB.collection("users").doc(user.uid).set({
        uid: user.uid,
        name: userName,
        email: user.email,
        imageURL: imageURL
    })
    .then(function() {
        console.log("Document successfully written to FireStore User store", userName);
    })
    .catch(function(error) {
        console.error("Error writing document to FireStore Leaderboard: ", error);
    });

}

export const saveUser = (user, userName) => {
    
    console.log("Save User to Firebase:", user);
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    console.log("Email:", user.email);
    console.log("UID:", user.uid);
    console.log("Firstname:", userName);
    console.log("imageURL:", defURL);
  
    // var defURL = 'https://firebasestorage.googleapis.com/v0/b/footytips-dev.appspot.com/o/userimages%2Fdefault.jpg?alt=media&token=c534d444-e8c5-4738-838e-2b9275090878';
    // var defURL = 'https://firebasestorage.googleapis.com/v0/b/footytips-prod.appspot.com/o/userimages%2Fdefault.jpg?alt=media&token=1737256f-e52d-46de-a754-d64b7168ed96';
    // if (process.env.NODE_ENV === 'development') {
    //   defURL = 'https://firebasestorage.googleapis.com/v0/b/footytips-dev.appspot.com/o/userimages%2Fdefault.jpg?alt=media&token=c534d444-e8c5-4738-838e-2b9275090878';
    // }
  
    firebaseRef.child(`users/${user.uid}/info`)
        .set({
            uid: user.uid,
            name: userName,
            email: user.email,
            imageURL: defURL
        })
        .then(() => {
            // Functions after registration
            console.log("OK to perform funcs after registration ...")
            addUserToFBLeaderBoard(user, userName, defURL)
        })
        .then(() => {
            // Functions after registration
            console.log("OK to perform funcs after registration ...")
            addUserToFS(user, userName, defURL)
        })
        .catch(function (error) {
            console.error("Error writing document to database: ", error);
        })
        
}

export const loadUser = (uid) => {

    console.log("Loading user ...", uid)

    if (localStorage.getItem('loginType') === 'email') {
        
        var userRef = firebaseRef.child(`users/${uid}/info`)
        console.log("userRef:", userRef)
        userRef.on('value', (snap) => {
            console.log("SNAP:", snap.val())

        })/* .then( () =>  snap.val() ) */
    }

    
}

export { loadUser as default }
