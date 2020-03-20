import React from 'react'
import { NavLink } from 'react-router-dom'

import '../css/NavMenu.css'
import Image from './Image.jsx';
import logout_img from '../images/logout.png';
import user_img from '../images/man-24-128-white.png';
import info_img from '../images/information.png';

const NavMenu = ( { onLogout } ) => {

  const activeStyle = {

    color: 'white',
    backgroundColor: '#E21E31',
    borderBottomStyle: 'solid',
    borderBottomColor: '#E21E31',

  }

  return (

    <div className='nav'>
      <ul className='nav_ul'>
        <li className='nav_li'><NavLink exact to="/" activeStyle={activeStyle}><Image src={user_img} height={25} width={25} /><div className='nav_text'>User</div></NavLink></li>
        <li className='nav_li'><NavLink to="/cra" activeStyle={activeStyle}><Image src={user_img} height={25} width={25} /><div className='nav_text'>CRA</div></NavLink></li>
        <li className='nav_li'><NavLink to="/cra/other" activeStyle={activeStyle}><Image src={user_img} height={25} width={25} /><div className='nav_text'>Other</div></NavLink></li>
        <li className='nav_li'><NavLink to="/items" activeStyle={activeStyle}><Image src={user_img} height={25} width={25} /><div className='nav_text'>Items</div></NavLink></li>
        <li className='nav_li'><NavLink to="/about" activeStyle={activeStyle} exact={true} ><Image src={info_img} height={25} width={25} /><div className='nav_text'>About</div></NavLink></li>
        <li className='nav_li'><NavLink to="/login"  activeStyle={activeStyle} onClick={ () => onLogout() }><Image src={logout_img} height={25} width={25} /><div className='nav_text'>Logout</div></NavLink></li>
        {/* <li className='nav_li'><button to="#" onClick={ () => onLogout() }><div className='nav_text'>Logout</div></button></li> */}
      </ul>
    </div>

  )

}

export { NavMenu as default}
