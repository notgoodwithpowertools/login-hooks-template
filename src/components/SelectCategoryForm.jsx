import React from 'react'

import '../css/AddItemForm.css'

const SelectCategoryForm = (props) => {

    const { category, categories, onChange } = props

    return (

        <div className='addItemForm'>
            <select
            value={category} 
            onChange={(e) => { return (onChange ? onChange(e.target.value) : null) } } 
            >
            {categories.map((x,y) => <option key={y}>{x}</option>)}
            </select>
        </div>

    )

}

export { SelectCategoryForm as default }
