import React from 'react'
import about from "../assets/ME.png"
import video from "../assets/video.mp4"
import { IoMdCheckmark } from 'react-icons/io'
function About() {
    return (
        <div className='w-[100vw] lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px]'>
            {/* LEFT AREA */}
            <div className='lg:w-[40%] md:w-[80%] w-[100%] h-[100%] flex items-center justify-center relative'>
                <img src={about} alt="" className='w-[80%] h-[90%] rounded-lg' />
                {/* <div className='max-w-[350px] mx-auto p-4 absolute top-[55%] left-[50%]'><video src={video} className='w-full rounded-xl shadow-lg border-2 border-white' controls autoPlay loop></video></div> */}
            </div>
            {/* RIGHT AREA */}
            <div className='lg:w-[50%] md:w-[70%] w-[100%] h-[100%] flex items-start justify-center flex-col px-[35px] md:px-[80px]'>
                <div className='flex text-[20px] items-center justify-center gap-[20px]'>About Us -</div>
                <div className='md:text-[45px] text-[35px] font-semibold'>We maximize your learning growth!</div>
                <div className='text-[15px]'><p>Here at IntelliLMS we provide a system to simplify online education, track progress, and enhance student-instructor collaboration effectively</p></div>
                <div className='w-[100%] lg:w-[60%]'>
                    <div className='flex items-center justify-between mt-[40px]'>

                        <div className='flex items-center justify-center gap-[10px]'><IoMdCheckmark />Simplified Learning </div>
                        <div className='flex items-center justify-center gap-[10px]'><IoMdCheckmark />Expert Educators </div></div>
                    <div className='flex items-center justify-between mt-[40px]'>
                        <div className='flex items-center justify-center gap-[10px]'><IoMdCheckmark />Lifetime Access </div>
                        <div className='flex items-center justify-center gap-[10px]'><IoMdCheckmark />Customer Support</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default About