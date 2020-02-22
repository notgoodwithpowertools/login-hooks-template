import React from 'react';
import Image from './Image.jsx';

const AboutItem = ( { src, text } ) => {

  const style = {

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px'

  }

  const textStyle = {

    margin: '5px',
    marginRight: '15px',

  }

  return (

    <div style={style}>
      <Image src={src} />
      <p style={textStyle}>{text}</p>
    </div>

  )

}

export { AboutItem as default}
