import React, { useEffect, useState } from 'react'
import img1 from "../images/img1.jpg"
import img2 from "../images/img2.jpg"
import img3 from "../images/img3.jpg"
import { GrLinkNext } from "react-icons/gr";

import { BiArrowBack } from "react-icons/bi";




const Slider = () => {
    const images = [img1, img2, img3]

    console.log(images.length);

    const [count, setCount] = useState(0)

    const handleNext = () => {
        if (count < (images.length - 1)) {
            setCount((prevCount) => prevCount + 1)
        } else
            setCount(0)
    }

    const handlePrev = () => {
        if (count <= 0) {
            setCount((images.length - 1))
        } else {
            setCount((prevCount) => prevCount - 1)
        }

    }

    useEffect(() => {
        const intervaId = setInterval(() => {
            handleNext()
        }, 5000)

        return () => clearInterval(intervaId)
    }, [count])

    useEffect(() => {
        console.log("Count = ", count);
    }, [count])

    return (
        <div className='flex justify-around items-center bg-black border-b-2 border-b-slate-400'>

            <div className=" border rounded-full flex justify-center items-center p-3">

                <button onClick={handlePrev}> <BiArrowBack className='text-3xl text-white' /> </button>

            </div>

            <div className="w-60 ">
                <h3 className='text-center text-white'>Image {count + 1}</h3>
                <img src={images[count]} className='rounded my-2 mb-5' alt="img" />
            </div>

            <div className=" border rounded-full flex justify-center items-center p-3">

                <button onClick={handleNext}><GrLinkNext className='text-2xl text-white font-bold' /> </button>

            </div>
        </div>
    )
}

export default Slider
