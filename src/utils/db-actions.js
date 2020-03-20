import { firestoreDB } from '../utils/firebase.js'

export var deleteFSDocId = (collection, id) => {

    console.log(`Deleting item at ${collection} with id: ${id}`);
    firestoreDB.collection(collection).doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        //   firestoreDB.collection("votes").doc(id).delete().then(() => {
        //     console.log("Votes deleted!");
        //   }).catch(function(error) {
        //     console.error("Error removing votes: ", error);
        //   });

    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });

}





// +++++++++++++++++++++++++++

export var addItem = (dbPath, desc, comment, value, aDate) => {

    const dateStamp = new Date(aDate);
    // console.log("Parsed datestamp:", dateStamp);

    return firestoreDB.collection(dbPath)
        .add({
            //   id: user.uid,
            desc: desc,
            comment: comment,
            value: value,
            date: dateStamp

        })
        // .then(ref => {
        //     console.log('Added new document with ID: ', ref.id);
        //     // ref.update({datestamp: fieldValue.serverTimestamp()})
        //     return ref.id;
        // })
        // .catch(function (error) {
        //     console.error("Error adding new document: ", error);
        // });

}
