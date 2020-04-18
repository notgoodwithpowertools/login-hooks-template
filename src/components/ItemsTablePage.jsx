import React, { useEffect, useState } from 'react'

import { firestoreDB } from '../utils/firebase.js'

import '../css/ItemsTableComp.css'

import MatSelect from './MatSelect.jsx'
import ItemsTablePanel from './ItemsTablePanel.jsx'

const ItemsTablePage = ( props ) => {

    const { dbPath, categories } = props;
    const [category, setCategory] = useState('cowes')
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    // const [categoryPath, setCategoryPath] = useState(`${dbPath}/${category}`)

    let categoryPath = `${dbPath}/${category}`

    useEffect(() => { // get item documents for the selected path/category

        console.log("ItemsTablePage useEffect ... ")
    
        const itemsCollection = firestoreDB.collection(categoryPath)
        setLoading(true)
    
        const unsubscribe = itemsCollection.onSnapshot((docSnapshot) => {
          console.log("Snapshot ...")
          console.log("docSnapshot:", docSnapshot.docs)
          let parsedItems = []
    
          docSnapshot.docs.forEach((doc) => {
    
            parsedItems.push({
              id: doc.id,
              ...doc.data()
            })
    
          })
          setLoading(false)
          console.log('parsedItems:', parsedItems)
          setItems(parsedItems)
    
        })
        return () => {
    
          // Clean up the listener subscription
          console.log("Clean up the Items useEffect listener subscription...")
          unsubscribe()
    
        }
    
      }, [categoryPath])

    return (

        <div className='ItemsTableComp'>
            <MatSelect categories={categories} onChange={setCategory} />
            {loading ? <div>Loading...</div> : <ItemsTablePanel items={items} queryPath={categoryPath} />}
        </div>

    )
}

export { ItemsTablePage as default }