import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import { Button, Modal } from 'antd';
import { Input } from 'antd';
import { FloatButton } from 'antd';
import { IoIosAdd } from "react-icons/io";




const Cards = ({ allItems, setAllItems, filteredItems, setFilteredItems }) => {

    // console.log('Filtered Items in Cards = ', filteredItems);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUniModalOpen, setIsUniModalOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [clickIndex, setClickIndex] = useState("")
    const [showUpdate, setShowUpdate] = useState(false)
    const [showInput, setShowInput] = useState(false)

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        console.log("Modal closed");
        setIsModalOpen(false);
        setIsUniModalOpen(false);
    };

    const { TextArea } = Input;

    const [items, setItems] = useState("")
    const [editIndex, setEditIndex] = useState(null)
    const [description, setDescription] = useState("")



    // ADD ITEMS
    const handleItems = () => {

        const bothValues = {
            heading: items,
            des: description
        }

        // console.log(bothValues);

        if (editIndex !== null) {

            // const editedItems = filteredItems.map((val, ind) => (ind === editIndex ? bothValues : val))
            const editedItems = allItems.map((val, ind) => (ind === editIndex ? bothValues : val))

            // setFilteredItems(editedItems)
            setAllItems(editedItems)

            setEditIndex(null)  // Reset edit mode

            console.log("Edit", editedItems);

        } else {
            setAllItems((prevallItems) => [...prevallItems, bothValues])
        }

        setItems("")
        setDescription("")
        setIsModalOpen(false)
        setIsUniModalOpen(false)
        setShowUpdate(false)
        setShowInput(false)

    }

    useEffect(() => {
        console.log("All items", allItems);
        console.log("All Filtered items", filteredItems);
    }, [filteredItems, allItems])




    //DELETE ITEM
    const handleDelete = (index) => {
        if (filteredItems[index]) {
            const originalIndex = filteredItems[index].originalIndex; // Get original index
            const deletedItems = allItems.filter((val, i) => i !== originalIndex); // Use original index for deletion

            console.log("Deleting item at originalIndex:", originalIndex); // Debug log
            setAllItems(deletedItems);
            setIsModalOpen(false);
            setClickIndex(""); // Reset clickIndex after deletion
        } else {
            console.error("Item not found in filteredItems"); // If item not found
        }
    };

    //EDIT ITEM
    const handleEdit = (index) => {
        console.log("edit me hu");
        console.log(index);
        console.log(allItems[index]);


        if (allItems[index]) {
            const originalItem = allItems[index]
            setItems(allItems[index].heading);
            setDescription(allItems[index].des);
            setShowUpdate(true);
            setEditIndex(index);  // Store original index for editing

            console.log("Editing item at originalIndex:", originalItem); // Debug log
            setShowInput(true);
        } else {
            console.error("Item not found in filteredItems"); // If item not found
        }
    }

    const handleClickCard = (index) => {
        const originalIndex = filteredItems[index]?.originalIndex;
        console.log("card clicked");

        console.log(originalIndex);

        if (originalIndex !== undefined) {
            setClickIndex(originalIndex);  // Use original index for delete/edit actions
            setIsModalOpen(true);
            setMessage(filteredItems[index]); // Show card content based on filteredItems
        } else {
            console.error("Card not found at this index in filteredItems");
        }
    };


    return (
        <div className='bg-black text-white text-3xl font-semibold py-2'>

            <h1 className='text-center'>All Tasks</h1>
            <div className='flex justify-start items-start min-h-screen h-auto bg-black text-white'>


                <div className="flex justify-between items-start flex-wrap gap-y-9 p-8">

                    {
                        filteredItems.length !== 0 ?
                            <>
                                {filteredItems.map((val, i) => (

                                    <div key={i} className="p-2">

                                        <Card
                                            className='cursor-pointer'
                                            title={val.heading}
                                            onClick={() => handleClickCard(i)}
                                            bordered={false}
                                            style={{
                                                width: 300,
                                            }}
                                        >
                                            <h1>{val.des}</h1>

                                        </Card>


                                    </div>
                                ))}
                            </>
                            :
                            <h1>No items Found</h1>
                    }


                    {/* Card modal */}

                    {showInput ?

                        <Modal open={isModalOpen} onCancel={handleCancel} footer={[

                            <Button key="Edit" onClick={() => handleEdit(clickIndex)}>
                                Edit
                            </Button>,

                            showUpdate && (
                                <Button key="Add" onClick={() => handleItems()}>
                                    Update
                                </Button>),

                            <Button key="Delete" type="primary" danger onClick={() => handleDelete(clickIndex)}>
                                Delete
                            </Button>
                        ]}>
                            <h1 className='font-semibold'> Heading :</h1>
                            <Input className='w-3/4 mb-5' placeholder="Enter heading..." value={items} onChange={(e) => setItems(e.target.value)} />
                            <h1 className='font-semibold'>Description :</h1>
                            <TextArea placeholder='Enter description...' rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />

                        </Modal>

                        :

                        <Modal open={isModalOpen} onCancel={handleCancel} footer={[

                            <Button key="Edit" onClick={() => handleEdit(clickIndex)}>
                                Edit
                            </Button>,

                            showUpdate && (
                                <Button key="Add" onClick={() => handleItems()}>
                                    Update
                                </Button>),

                            <Button key="Delete" type="primary" danger onClick={() => handleDelete(clickIndex)}>
                                Delete
                            </Button>
                        ]}>
                            <h1 className='font-semibold mb-5 border-b  text-xl'>{message.heading}</h1>
                            <h1 className='mb-8'>{message.des}</h1>
                        </Modal>
                    }



                    {/* Univarsal modal */}
                    <Modal open={isUniModalOpen} onCancel={handleCancel} footer={[
                        <Button key="Add" onClick={handleItems}>
                            Add
                        </Button>
                    ]}>
                        <h1 className='font-semibold'> Heading :</h1>
                        <Input className='w-5/6 mb-8' placeholder="Enter Heading..." value={items} onChange={(e) => setItems(e.target.value)} />

                        <h1 className='font-semibold'>Description :</h1>
                        <TextArea placeholder='Enter description...' rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />


                    </Modal>

                    <FloatButton icon={<IoIosAdd />} onClick={() => setIsUniModalOpen(true)} />

                </div>
            </div >

        </div>
    )
}

export default Cards
