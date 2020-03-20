import React, { useState } from 'react'

import { addItem } from '../utils/db-actions.js'
import { getDateString } from '../utils/datefuncs.js'

import MatInput from './MatInput.jsx'
import MatButton from './MatButton.jsx'

import '../css/AddItemForm.css'

const AddItemForm = (props) => {

    const { queryPath } = props

    const [description, setDescription] = useState("")
    const [comments, setComments] = useState("")
    const [value, setValue] = useState(0.00)
    const [date, setDate] = useState(new Date())

    // console.log('getDateString:', getDateString(date))
    
    // <MatInput value={date} onChange={setDate} /* onFocus={setMessage} */ type={"date"} label={"Date"} required />

    // console.log("Desc:", description)

    const resetForm = () => {

        setDescription('')
        setComments('')
        setValue(0.00)
        setDate(new Date())
    
    }

    const buttonAction = () => {

        console.log("queryPath:", queryPath)
        console.log("Add item:", description)
        console.log("Comments:", comments)
        console.log("value:", value)
        console.log("Date:", date)

        addItem(queryPath, description, comments, value, date)
        .then(ref => {
            console.log('Added new document with ID: ', ref.id);
            // ref.update({datestamp: fieldValue.serverTimestamp()})
            // return ref.id;
            console.log("Ref:", ref.id)
            resetForm()
        })
        .catch(function (error) {
            console.error("Error adding new document: ", error);
        });
        // resetForm()

    }

    const disableButton = () => {

        const regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/
        // console.log("test:", regex.test(value))

        return ((description !== "") && regex.test(value))? false : true

    }

    return (

        <div className='addItemForm'>

            <MatInput value={description} onChange={setDescription} /* onFocus={setMessage} */ type={"textarea"} label={"Description"} required />
            <MatInput value={comments} onChange={setComments} /* onFocus={setMessage} */ type={"textarea"} label={"Comments"} />
            <MatInput value={value} onChange={setValue} /* onFocus={setMessage} */ type={"number"} step="0.01" label={"$ Value"} />
            <MatInput value={getDateString(date)} onChange={setDate} /* onFocus={setMessage} */ type={"date"} label={"Date"} />
            <MatButton text={"Add"} onClick={buttonAction} disabled={disableButton()} />

        </div>

    )
}

export { AddItemForm as default }