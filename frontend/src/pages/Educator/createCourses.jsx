import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

function CreateCourses() {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
            <div className='max-w-xl w-[600px] mx-auto p-6 bg-gray-200 shadow-md rounded-md mt-10 relative'>
                <FaArrowLeftLong className='absolute top-[8%]  left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/courses")} />
                <h2 className='text-2xl font-semibold mb-6 text-center'>Create Courses</h2>
                <form className='space-y-5'>
                    <div>
                        <label htmlFor="title" className='block text-sm font-medium text-gray-950 mb-1'>Course Title</label>
                        <input type="text" id='title' placeholder='Enter Course Title' className='w-full text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black' />

                    </div>
                    <div>
                        <label htmlFor="cat" className='block text-sm font-medium text-gray-950 mb-1'>Course Category</label>
                        <select id="cat" className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 fcous:ring-black'>
                            <option value="">Select Category</option>
                            <option value="">Web Dev</option>
                            <option value="">App Dev</option>
                            <option value="">UI/UX Design</option>
                            <option value="">AI/ML</option>
                            <option value="">AI/ML Tools</option>
                            <option value="">Data Science</option>
                            <option value="">Data Analytics</option>
                            <option value="">Ethical Hacking</option>
                            <option value="">Other</option>
                        </select>
                    </div>
                    <button className='w-full bg-black text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition'>Create Course</button>
                </form>
            </div>
        </div>
    )
}

export default CreateCourses