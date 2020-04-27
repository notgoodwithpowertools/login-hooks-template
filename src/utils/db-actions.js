import firebase, { firestoreDB, firebaseStorageRef } from '../utils/firebase.js'

export var deleteFSDocId = (collection, id) => {

    console.log(`Deleting item at ${collection} with id: ${id}`);
    firestoreDB.collection(collection).doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        // Go on to provide additional db changes if needed
        //   firestoreDB.collection("votes").doc(id).delete().then(() => {
        //     console.log("Votes deleted!");
        //   }).catch(function(error) {
        //     console.error("Error removing votes: ", error);
        //   })
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });

}

export var deleteFBStorageItem = (url) => {

    console.log(`Deleting Storage item at ${url}`)
    
    var imgRef = firebaseStorageRef.child(url);

    console.log("imgRef:", imgRef)
    imgRef.delete().then(function () {
        // File deleted successfully 
        console.log(`File at ${url} deleted`)
    }).catch(function (error) {
        // error   
        console.log(`Error deleting File at ${url} - ${error}`)

    })
   
}

export let addCat= (cat1Cat, catName) => {

    console.log(`addCat: Adding category to FS ... ${cat1Cat}/${catName}`)
    // Atomically add a new region to the "regions" array field.
    let ref = firestoreDB.collection("items").doc(cat1Cat);
    ref.update({
       colls: firebase.firestore.FieldValue.arrayUnion(catName)
    })

}

export var addItem = (dbPath, desc, comment, value, aDate, imageFile) => {

    const dateStamp = (aDate !== '') ? new Date(aDate) : new Date()

    let autoID = firestoreDB.collection(dbPath).doc().id;

    let filePath = (imageFile.name !== '') ? `${dbPath}/${autoID}.${imageFile.name.split('.').pop()}` : ''

    return firestoreDB.collection(dbPath).doc(autoID)
        // add items to FS
        .set({

            desc: desc,
            comment: comment,
            value: value,
            date: dateStamp,
            imageURL: filePath

        })
        // load the image to FB Storage
        .then( (ref) => {

            console.log(`Does this execute first? imageFile:${imageFile}`)
            if (imageFile.name !== '') {
                filePath = `${dbPath}/${autoID}.${imageFile.name.split('.').pop()}`

                let userImagesRef = firebaseStorageRef.child(filePath);
                console.log("reference:", userImagesRef)

                let task = userImagesRef.put(imageFile)
                task.on('state_changed',
                    function progress(snapshot) {
                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("%:", percentage);
                        console.log("In progress");

                    },
                    function error() {
                        console.log("Error with file upload!");
                        firestoreDB.collection(dbPath).doc(ref.id).update('')
                    },
                    function complete() {
                        console.log("Upload complete");
                    }
                );
            }
            
            return autoID

        })
    // moved the promise return to the component - Promises only resolve once

}

export let getDownloadLink = (filePath) => {

    console.log("getDownloadLink...filepath:", filePath)

    if (filePath !== '') {
        firebaseStorageRef.child(filePath).getDownloadURL()
            .then((url) => {
                console.log("getDownloadLink...url:", url)
                return url

            })
    }

}
