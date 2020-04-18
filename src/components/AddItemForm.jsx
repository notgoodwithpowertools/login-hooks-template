import React, { useState } from 'react'

import { addItem } from '../utils/db-actions.js'
import { getDateString } from '../utils/datefuncs.js'

import MatSelect from './MatSelect.jsx'
import MatInput from './MatInput.jsx'
import ImageForm from './ImageForm.jsx'
import MatButton from './MatButton.jsx'

import '../css/AddItemForm.css'

const AddItemForm = (props) => {

    const { dbPath, categories } = props

    const [description, setDescription] = useState("")
    const [comments, setComments] = useState("")
    const [value, setValue] = useState(0.00)
    const [date, setDate] = useState(new Date())
    const [imageFile, setImageFile] = useState(new File([""], ""))
    const [category, setCategory] = useState('cowes')


    const resetForm = () => {

        setCategory('cowes')
        setDescription('')
        setComments('')
        setValue(0.00)
        setDate(new Date())
        setImageFile(new File([""], ""))

    }

    const buttonAction = () => {

        console.log("Add item...")
        console.log("dbPath:", `${dbPath}/${category}`)
        console.log("Desc", description)
        console.log("Comments:", comments)
        console.log("value:", value)
        console.log("Date:", date)
        console.log("ImageFile:", imageFile)

        addItem(`${dbPath}/${category}`, description, comments, value, date, imageFile)
        .then( (id) => {
            console.log('Added new ref: ', id);
            return id
        })
        .then(ref => {
            console.log('Added new document with ID: ', ref);
            // resetForm()
        })
        .catch(function (error) {
            console.error("Error adding new document: ", error);
        });
        resetForm()

    }

    const disableButton = () => {

        const regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/
        // console.log("test:", regex.test(value))

        return ((description !== "") && regex.test(value))? false : true

    }

    return (

        <div className='addItemForm'>

            <MatSelect categories={categories} onChange={setCategory} />
            <MatInput value={description} onChange={setDescription} /* onFocus={setMessage} */ type={"textarea"} label={"Description"} required />
            <MatInput value={comments} onChange={setComments} /* onFocus={setMessage} */ type={"textarea"} label={"Comments"} />
            <MatInput value={value} onChange={setValue} /* onFocus={setMessage} */ type={"number"} step="0.01" label={"$ Value"} />
            <MatInput value={getDateString(date)} onChange={setDate} /* onFocus={setMessage} */ type={"date"} label={"Date"} />
            <ImageForm imageFileName={imageFile.name} onChange={setImageFile}/>
            <MatButton text={"Add"} onClick={buttonAction} disabled={disableButton()} />

        </div>

    )
}

export { AddItemForm as default }