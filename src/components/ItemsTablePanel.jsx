import React from 'react'

import MatButton from './MatButton.jsx'

import { deleteFSDocId } from '../utils/db-actions.js'
import { getDateMDY } from '../utils/datefuncs.js'

import '../css/ItemsTable.css'

const ItemsTablePanel = (props) => {

    const { items, queryPath } = props;


    const ItemRow = (props) => {

        const { num, anItem } = props

        console.log("ItemRow:", anItem)

        const deleteRowItem = () => {
            deleteFSDocId(queryPath, anItem.id)
          }

        return (
            <tr key={anItem.id}>
                <th scope="row">{num + 1}</th>
                <td align='left'>{anItem.desc}</td>
                <td align='left'>{(anItem.date ? getDateMDY(anItem.date.toDate()) : "")}</td>
                <td>${anItem.value}</td>
                <td>{anItem.image}</td>
                <td><MatButton onClick={deleteRowItem} text={'Remove'}/></td>
            </tr>
        )

    }

    const getRows = () => {

        if (items.length > 0) {

            return items.map((item, index) => {

                return (

                    <ItemRow key={index} anItem={item} num={index} />

                )

            })
        }
        else {
            return (
                
                <tr key='1'>
                    <th scope="row">1</th>
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
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" align='left'>Desc</th>
                        <th scope="col" align='left'>Date</th>
                        <th scope="col">Value</th>
                        <th scope="col">Image</th>
                        <th scope="col">Action</th>
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

