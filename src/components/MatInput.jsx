import React from 'react'

import '../css/MatInput.css'

const MatInput = (props) => {

    const { value, onChange, onFocus = null, type, required, label } = props
    // console.log("onfocus - setMessage", onFocus)
    // console.log("onChange - setField:", onChange)

    return (

        <div className='matitem'>

            <input className='mat'

                value={value} 
                type={type} 
                onChange={(e) => onChange(e.target.value)} 
                onFocus={(e) => { return (onFocus ? onFocus('') : null) }} 
                required={required}

            />

            <label className='mat'>{label}</label>

        </div>

    )
}

export { MatInput as default }