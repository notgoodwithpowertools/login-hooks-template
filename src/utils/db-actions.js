import { firestoreDB } from '../utils/firebase.js'

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

export var addItem = (dbPath, desc, comment, value, aDate) => {

    const dateStamp = new Date(aDate);
    
    return firestoreDB.collection(dbPath)
        .add({

            desc: desc,
            comment: comment,
            value: value,
            date: dateStamp

        })
        // moved the promise return to the component - Promises only resolve once.
        // .then(ref => {
        //     console.log('Added new document with ID: ', ref.id);
        //     // ref.update({datestamp: fieldValue.serverTimestamp()})
        //     return ref.id;
        // })
        // .catch(function (error) {
        //     console.error("Error adding new document: ", error);
        // });

}
