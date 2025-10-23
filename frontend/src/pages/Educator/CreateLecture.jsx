import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from '../../App';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { setLectureData } from '../../redux/lectureSlice';
import { toast } from 'react-toastify';
function CreateLecture() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [lectureTitle, setLectureTitle] = useState("")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { lectureData } = useSelector(state => state.lecture)

    const handleCreateLecture = async () => {
        if (!lectureTitle) { toast.error("Enter lecture title") }
        setLoading(true);
        try {
            const result = await axios.post(serverUrl + `/api/course/createlecture/${courseId}`, { lectureTitle }, { withCredentials: true })
            console.log(result.data)
            dispatch(setLectureData([...lectureData, result.data.lecture])) //push in array
            setLoading(false)
            toast.success("Lecture Added Successfully")
            setLectureTitle("")

        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error("Error while creating course")
        }
    }




    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
            <div className='bg-white shadow-xl rounded-xl w-full max-w-2xl p-6'>
                {/* header */}
                <div className='mb-6'>
                    <h1 className='text-2xl font-semibold text-gray-800 mb-1'>Add a Lecture</h1>
                    <p className='text-sm text-gray-500 pb-2'>Enter the title and add your video lectures to enhance your course content.</p>

                    {/* input areas */}
                    <input type="text" className='w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4' placeholder='eg:- Introduction to Mern Stack Dev' onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} />

                    {/* button */}
                    <div className='flex gap-4 mb-6'>
                        <button className='flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium cursor-pointer' onClick={() => navigate(`/editcourse/${courseId}`)} ><FaArrowLeftLong size={10} />Back to Course</button>
                        <button className='px-5 py-2 rounded-md bg-black text-white hover:bg-gray-600 transition-all text-sm font-medium shadow cursor-pointer' disabled={loading} onClick={handleCreateLecture}>{loading ? <ClipLoader size={30} color='white' /> : "+ Create Lecture"}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateLecture