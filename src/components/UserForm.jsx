import React, { useContext } from 'react'

import { firestoreDB, firebaseStorageRef } from '../utils/firebase.js'

import '../css/UserForm.css'

import { UserContext } from '../context/UserContext.js'

const UserForm = (props) => {

  const { user } = useContext(UserContext)
  console.log("CRA UserContextValues:", user)

  const changePic = (event) =>  {

    console.log("ChangePic Event", event)
    const aFile = event.target.files[0];
    console.log("aFile:", aFile);
    const fileExt = aFile.name.split('.').pop()
    console.log("aFile extension:", fileExt)
    var userImagesRef = firebaseStorageRef.child('userimages/' + user.name + '.' + fileExt);
    console.log("reference:", userImagesRef);

    //upload file and set user image file link info
    let task = userImagesRef.put(aFile)
    task.on('state_changed',
      function progress (snapshot) {
        
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("%:", percentage);
        console.log("In progress");

      },
      function error () {

        console.log("Error with file upload!");

      },
      function complete () {

        console.log("Upload complete");
        task.snapshot.ref.getDownloadURL().then( (downloadURL) => {
          console.log("downloadURL:", downloadURL);
          firestoreDB.collection("users").doc(user.uid).update({imageURL: downloadURL})
        })

      }
    );
  }

  return (

    <div className="App">
      <div className='UserForm'>
        <h3>Email: </h3>
        <p>{user.email}</p>
        <h3>User Name:</h3>
        <p>{user.name}{user.admin ? ' - Administrator' : ''}</p>
        <img className='UserFormItem' src={user.imageURL} alt={user.imageURL} />
        <input type='file' name='img' accept='.gif,.jpg,.jpeg,.png' onChange={(e) => changePic(e)} />
      </div>
    </div>

  )
}

export { UserForm as default }
