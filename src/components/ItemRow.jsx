import React, { useState, useEffect } from 'react'

import MatButton from './MatButton.jsx'

import { firebaseStorageRef } from '../utils/firebase.js'

import { deleteFSDocId, deleteFBStorageItem } from '../utils/db-actions.js'
import { getDateMDY } from '../utils/datefuncs.js'

const ItemRow = (props) => {

    const { num, anItem, queryPath } = props
    const [ linkTxt, setLinkTxt ] = useState('')

    console.log("ItemRow:", anItem)

    useEffect(() => { // get and set linkTxt

        console.log("ItemRow useEffect ...get and set linkTxt ...", anItem.imageURL);
 
        (anItem.imageURL !== '') ? setLinkTxt('View') : setLinkTxt('')

    }, [ anItem.imageURL ])

    const deleteRowItem = () => {

        deleteFSDocId(queryPath, anItem.id)
        if (anItem.imageURL) {
            console.log(`Next step is deleting associated image for: ${anItem.id}`)
            deleteFBStorageItem(anItem.imageURL)
        }
        else {
            console.log(`No image to delete for: ${anItem.id}`)
        }
    }

    const launchLink = () => {

        console.log("launchLink ... imageURL:", anItem.imageURL)

        if (anItem.imageURL !== '') {
            firebaseStorageRef.child(anItem.imageURL).getDownloadURL()
                .then((url) => {
                    console.log("Download URL:", url)
                    window.open(url, '_blank')
                    
                })

        }
    
    }

    return (
        <tr key={anItem.id}>
            <th scope="row">{num + 1}</th>
            <td align='left'>{anItem.desc}</td>
            <td align='left'>{(anItem.date ? getDateMDY(anItem.date.toDate()) : "")}</td>
            <td>${anItem.value}</td>
            <td className='urlLink' onClick={() => launchLink()}>{linkTxt}</td>
            <td><MatButton onClick={deleteRowItem} text={'Remove'} /></td>
        </tr>
    )

}

export { ItemRow as default }