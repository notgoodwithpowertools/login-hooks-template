import React from 'react'
import CategoryBadge from '../components/CategoryBadge.jsx'

export const listCategoryBadges = (categories, className, toggle) => {
    const listItems = categories.map((category) =>
        
        <CategoryBadge key={category} name={category} className={className} toggle={false}/>

    )
    return listItems
}

export { listCategoryBadges as default }

