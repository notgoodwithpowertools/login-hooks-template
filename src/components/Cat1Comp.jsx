import React, { useContext } from 'react'

import { ItemsCat1Context } from '../context/ItemsCat1Context.js'
import CategoryBadge from './CategoryBadge.jsx'

const Cat1Comp = (props) => {

    const { cat1State, itemsDispatch } = useContext(ItemsCat1Context)

    let cat1List = cat1State.cat1List
    let selectedCat1 = cat1State.cat1List[cat1State.selected]

    const setSelectedCat1 = (name) => {
        console.log("setSelected button ... ", name)
        let index = cat1List.indexOf(name, 0);
        itemsDispatch({ type: 'SET_CAT1_SELECTED', selected: index })
    }

    let className = 'Cat1Badge'

    const getBadgeState = (parsedName) => {

        let disabled = (parsedName !== selectedCat1) ? "disabled" : ''
        // console.log("getBadgeState...parsedName:", parsedName + " selectedCat1:", selectedCat1 + " disabled setting:", disabled)
        return (
            <CategoryBadge key={parsedName} name={parsedName} className={className} /* clickable="true"  */ onClick={setSelectedCat1} disabled={disabled} />
        )
    }

    const listCategoryBadges = (categories) => {
        if (categories) {
            const listItems = categories.map((itemCategory) => {
                return getBadgeState(itemCategory)
            })
            return listItems
        }
        else {
            return null
        }
    }

    return (

        <div className="Cat1Comp">
            {listCategoryBadges(cat1List, 'Cat1Badge')}
        </div>

    )
}

export { Cat1Comp as default }
