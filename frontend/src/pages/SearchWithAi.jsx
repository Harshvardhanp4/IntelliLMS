import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import ai from "../assets/ai.png"
import { RiMicAiFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'
import { serverUrl } from '../App';
import start from "../assets/start.mp3"

function SearchWithAi() {
    const startSound = new Audio(start)
    const navigate = useNavigate()
    const [input, setInput] = useState("")
    const [recommendations, setRecommendations] = useState([])
    const [listening, setListening] = useState(false)

    function speak(message) {
        let utterance = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterance)
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    if (!recognition) {
        toast.error("Speech recognition not supported!")

    }


    const handleSearch = async (req, res) => {
        if (!recognition) return;
        setListening(true)
        recognition.start();
        startSound.play()
        recognition.onresult = async (e) => {
            const transcript = e.results[0][0].transcript.trim()
            setInput(transcript)
            await handleRecommendation(transcript)
        }
    }

    const handleRecommendation = async (query) => {

        try {
            const result = await axios.post(
                `${serverUrl}/api/course/search`,
                { input: query.trim().replace(/[.,!?]$/, "") },
                { withCredentials: true }
            );
            console.log(result.data)
            setRecommendations(result.data)
            setListening(false)
            if (result.data.length > 0) {
                speak("These are the top courses i found for you")

            }
            else {
                speak("Sorry i couldn't find the related courses.")
            }
        } catch (error) {
            console.log(error)
            setListening(false)
        }
    }


    return (
        <div className='min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-16'>
            {/* SEARCH COMPONENT */}

            <div className='bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative'>
                <FaArrowLeftLong className='text-black w-[22px] h-[22px] cursor-pointer absolute' onClick={() => navigate("/")} />

                <h1 className='text-2xl sm:text-3xl font-bold text-gray-950 mb-6  flex items-center justify-center gap-2'><img src={ai} alt="" className='w-8 h-8 sm:h-[30px]' />Search with <span className='text-[#be74b8]'> AI</span></h1>

                {/* INPUT  */}
                <div className='flex items-center bg-white  overflow-hidden shadow-lg relative w-full'>
                    <input type="text" className='flex-grow px-4 py-3 bg-transparent text-black  border border-black focus:outline-none text-sm sm:text-base' placeholder='What do you want to learn? Type something to start searching' onChange={(e) => setInput(e.target.value)} value={input} />
                    {input && <button className='absolute right-14 sm:right-16' onClick={() => handleRecommendation(input)}><img src={ai} alt="" className='w-10 h-10 p-2 rounded-full bg-gray-100' /></button>
                    }
                    {/* Speech Recognition button */}
                    <button className='absolute right-2  rounded-full w-10 h-10 flex items-center justify-centers cursor-pointer' onClick={handleSearch} ><RiMicAiFill className='w-5 h-5 text-[#be74b8]' /></button>
                </div>

            </div>

            {
                recommendations.length > 0 ? (
                    <div className='w-full max-w-6xl mt-12 px-2 sm:px-4'>
                        <h1 className='text-xl sm:text-2xl font-semibold mb-6 text-white text-center'>AI Search Results:</h1>

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8'>
                            {
                                recommendations?.map((course, index) => (
                                    <div key={index} className='bg-white text-black p-5 rounded-2xl shadow-md hover:shadow-indigo-500/30 transition-all duration-200 border border-gray-200 cursor-pointer hover:bg-gray-200' onClick={() => navigate(`/viewcourse/${course._id}`)}>
                                        <h2 className='text-lg font-bold sm:text-xl'>{course.title}</h2>
                                        <img src="" alt="" />
                                        <p className='text-sm text-gray-600 mt-1'>{course.category}</p>
                                    </div>
                                ))
                            }

                        </div>



                    </div>
                ) : (

                    listening ? <h1 className='text-center text-xl sm:text-2xl mt-10 text-gray-400'>Listening....</h1> : <h1 className='text-center text-xl sm:text-2xl mt-10 text-gray-400'>No Courses Found</h1>

                )
            }

        </div>
    )
}

export default SearchWithAi