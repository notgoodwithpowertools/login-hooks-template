import React from 'react'

import '../css/MatButton.css'

const MatButton = (props) => {

    // Allow for case where onClick i not defined
    const { text = 'Login', onClick = null, disabled } = props
    
    return (

        <button className='matbtn' onClick={ (e) => { return (onClick ? onClick(e) : null) } } disabled={disabled}>

            {text}

        </button>

    )

}
export { MatButton as default }