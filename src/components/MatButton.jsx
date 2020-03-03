import React from 'react'

import '../css/MatButton.css'

const MatButton = (props) => {

    const { text = 'Login', onClick, disabled } = props;

    return (

        <button className='matbtn' onClick={ (e) => onClick(e) } disabled={disabled}>

            {text}

        </button>

    )

}
export { MatButton as default }