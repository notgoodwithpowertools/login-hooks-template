import React from 'react'

import '../css/MatSelect.css'

const MatSelect = (props) => {

    const { category, categories = ['qwerty', 'banana', 'wally'], onChange } = props

    return (
       
            <div className='MatSelectPanel'>
                <label className='MatSelect'>Category</label>
                <select className='MatSelect'
                    value={category}
                    onChange={(e) => { return (onChange ? onChange(e.target.value) : null) }}
                >
                    {categories.map((x, y) => <option key={y}>{x}</option>)}
                </select>
                
            </div>
 

    )

}

export { MatSelect as default }
