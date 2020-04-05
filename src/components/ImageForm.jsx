import React from 'react'

import '../css/ImageForm.css'
import upload from '../images/upload.png'

const ImageForm = (props) => {

    const { onChange, imageFileName = 'No file selected...' } = props

    return (

        <div className='imageForm'>
            <label htmlFor="file-upload" >
            <img src={upload} alt="Upload" height="20" width="20"/> 
                Upload Image
            </label>

            <input id="file-upload" type="file" accept='.gif,.jpg,.jpeg,.png' onChange={(e) => onChange(e.target.files[0])} />
            <p>{imageFileName}</p>
        </div>

    )

}

export { ImageForm as default }
