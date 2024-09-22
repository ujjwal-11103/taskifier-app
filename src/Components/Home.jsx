import React, { useState } from 'react'

const Home = () => {

    const [items, setItems] = useState("")
    const [allItems, setAllItems] = useState([])
    const [editIndex, setEditIndex] = useState(null)


    const handleItems = () => {

        if (editIndex !== null) {

            const editedItems = allItems.map((val, ind) => (ind === editIndex ? items : val))
            setAllItems(editedItems)
            setEditIndex(null)  // Reset edit mode

            console.log("Edit", editedItems);

        } else {
            setAllItems((prevallItems) => [...prevallItems, items])
        }

        setItems("")
        console.log(allItems);


    }


    const handleDelete = (index) => {

        const deletedItems = allItems.filter((val, i) => i !== index)

        setAllItems(deletedItems)

        console.log(deletedItems);

    }

    const handleEdit = (index) => {

        const updatedItem = allItems.filter((val, i) => i == index)

        console.log(updatedItem);

        setItems(allItems[index])

        setEditIndex(index)

    }


    return (
        <div className='text-center'>
            <h1>Home</h1>

            <input type="text" className='border' value={items} onChange={(e) => setItems(e.target.value)} />
            <button onClick={handleItems}>Submit</button>

            <h1>Items :</h1>
            {allItems.length !== 0 ?
                <>
                    {allItems.map((val, i) => (
                        <div key={i} className='flex justify-center gap-5'>
                            <h1>{val}</h1>
                            <h1 onClick={() => handleDelete(i)} className='cursor-pointer'> Del</h1>
                            <h1 onClick={() => handleEdit(i)} className='cursor-pointer'> Edit</h1>
                        </div>

                    ))}
                </>
                :
                <h1>No items yet</h1>
            }

        </div>
    )
}

export default Home
