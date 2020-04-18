import React from 'react'

import ItemRow from './ItemRow.jsx'

import '../css/ItemsTable.css'

const ItemsTablePanel = (props) => {

    const { items, queryPath } = props;

    const getRows = () => {

        if (items.length > 0) {

            return items.map((item, index) => {

                return (

                    <ItemRow key={index} anItem={item} num={index} queryPath={queryPath} />

                )

            })

        }
        else {

            return (

                <tr key='1'>
                    <th className="itemsTable">1</th>
                    <td>No items</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                </tr>

            )

        }
    }

    return (

        <div className="itemsTablePanel" >
            <table className="itemsTable">
                <thead>
                    <tr className="itemsTableHead">
                        <th className='itemsTableDesc'>Desc</th>
                        <th>Date</th>
                        <th>Value</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {getRows()}
                </tbody>
            </table>
        </div >
    )

}

export { ItemsTablePanel as default }
