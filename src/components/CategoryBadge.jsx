import React from 'react'

const CategoryBadge = (props) => {

    const { name = 'toast', className = '', onClick = null, disabled='' } = props

    return (
        <div className={`CategoryBadge ${className}`} disabled={`${disabled}`} onClick={(e) => { return (onClick ? onClick(name) : null) }} >{name}</div>
    )
}

export { CategoryBadge as default }