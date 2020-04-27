import React, { useState } from 'react'

import '../css/CategoriesComp.css'

import Cat1Comp from './Cat1Comp.jsx'
import MatInput from './MatInput.jsx'
import MatButton from './MatButton.jsx'

import { addCat } from '../utils/db-actions.js'
import { listCategoryBadges } from '../utils/component-funcs.js'

const CategoriesComp = (props) => {

    const { cat1, categories = ['Turkey', 'Chicken', 'Beef'] } = props
    const [ newCatName, setNewCatName ] = useState('')
 
    const buttonAction = () => {
        console.log("Button clicked ...", newCatName)
        addCat(cat1, newCatName)
        setNewCatName('')
    }

    const disableButton = () => {

        return (newCatName !== "") ? false : true

    }

    return (

        <div className='CategoriesComp'>
            <div className='CategoriesPanel'>
                <Cat1Comp />
                <div className='CategoryAddPanel'>
                  <MatInput value={newCatName} onChange={setNewCatName} type={"textarea"} label={"New Category"} required />
                  <MatButton text={"Add"} onClick={buttonAction} disabled={disableButton()}/>
                </div>
                {listCategoryBadges(categories)}
            </div>
        </div>

    )

}

export { CategoriesComp as default }