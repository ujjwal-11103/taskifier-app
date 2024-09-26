import React, { useState } from 'react'
import Navbar from './Navbar'
import Cards from './Cards'
import Slider from './Slider'

const Home = () => {

    const [allItems, setAllItems] = useState([])

    const [filteredItems, setFilteredItems] = useState(allItems)


    return (
        <div>

            <Navbar allItems={allItems} setAllItems={setAllItems} setFilteredItems={setFilteredItems} />
            <Slider />
            <Cards allItems={allItems} setAllItems={setAllItems} filteredItems={filteredItems} />

        </div>


    )
}

export default Home
