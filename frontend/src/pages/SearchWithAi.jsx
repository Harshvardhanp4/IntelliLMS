import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import ai from "../assets/ai.png"
import ai1 from "../assets/SearchAi.png"
import { RiMicAiFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function SearchWithAi() {
    const navigate = useNavigate()
    const [input, setInput] = useState("")
    const [recommendations, setRecommendations] = useState([])


    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    if (!recognition) {
        toast.error("Speech recognition not supported!")

    }


    const handleSearch = async (req, res) => {
        if (!recognition) return;
        recognition.start();
        recognition.onresult = async (e) => {
            console.log(e)
        }
    }


    return (
        <div className='min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-16'>
            {/* SEARCH COMPONENT */}

            <div className='bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative'>
                <FaArrowLeftLong className='text-black w-[22px] h-[22px] cursor-pointer absolute' />

                <h1 className='text-2xl sm:text-3xl font-bold text-gray-950 mb-6  flex items-center justify-center gap-2'><img src={ai} alt="" className='w-8 h-8 sm:h-[30px]' />Search with <span className='text-[#be74b8]'> AI</span></h1>

                {/* INPUT  */}
                <div className='flex items-center bg-white  overflow-hidden shadow-lg relative w-full'>
                    <input type="text" className='flex-grow px-4 py-3 bg-transparent text-black  border border-black focus:outline-none text-sm sm:text-base' placeholder='What do you want to learn? (eg:- MERN, WEBDEV, Cloud...)' />
                    <button className='absolute right-14 sm:right-16'><img src={ai} alt="" className='w-10 h-10 p-2 rounded-full bg-gray-100' /></button>

                    {/* Speech Recognition button */}
                    <button className='absolute right-2  rounded-full w-10 h-10 flex items-center justify-centers cursor-pointer' onClick={handleSearch} ><RiMicAiFill className='w-5 h-5 text-[#be74b8]' /></button>
                </div>

            </div>



        </div>
    )
}

export default SearchWithAi