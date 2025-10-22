import React, { useState } from "react";
import { FaArrowLeftLong, FaFire } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


function EditCourse() {
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* TOPBAR */}
      <div className="flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative">
        <FaArrowLeftLong className="top[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer" onClick={() => navigate("/courses")} />

        <h2 className="text-2xl font-semibold md:pl-[60px]">Add detail information regarding the course</h2>
        <div className="space-x-2 space-y-2">
          <button className="bg-black text-white px-4 py-2 rounded-md">Go to Lectures page</button>
        </div>
      </div>
      {/* FORM DETAILS */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Course Information</h2>
        <div className="space-x-3 space-y-2">
          {!isPublished ? <button className="bg-green-300 text-green-800 px-4 py-2 rounded-md border-1 cursor-pointer" onClick={() => setIsPublished(prev => !prev)}>Click to Publish</button> : <button className="bg-red-100 text-red-600 px-4 py-2 rounded-md border-1 cursor-pointer" onClick={() => setIsPublished(prev => !prev)} >Click to Unpublish</button>}
          <button className="bg-red-600 text-white px-4 py-2 rounded-md border border-black cursor-pointer">Remove Course</button>
        </div>
        <form action="" className="space-y-6">
          <div className="pt-3">
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-1">Title</label>
            <input id="title" type="text" className="w-full border px-4 py-2 rounded-md" placeholder="Enter Course Title" />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-lg font-medium text-gray-700 mb-1">Subtitle</label>
            <input id="subtitle" type="text" className="w-full border px-4 py-2 rounded-md" placeholder="Enter Course Subtitle" />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-1">Description</label>
            <textarea id="description" type="text" className="w-full border px-4 py-2 rounded-md h-20 resize-none" placeholder="Enter Course Description" />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {/* FOR CATEGORY */}
            <div className="flex-1">
              <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">Course Category</label>
              <select name="" id="" className="w-full border px-4 py-2 rounded-md bg-white">
                <option value="">Select Category</option>
                <option value="Web Dev">Web Dev</option>
                <option value="App Dev">App Dev</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI/ML Tools">AI/ML Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* FOR LEVEL */}
            <div className="flex-1">
              <label htmlFor="" className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">Course Level<FaFire /></label>
              <select name="" id="" className="w-full border px-4 py-2 rounded-md bg-white">
                <option value="">Select Level</option>
                <option value="Beginner">Beginner 🛡️</option>
                <option value="Intermediate">Intermediate 🏹</option>
                <option value="Advanced">Advanced ⚔️</option>

              </select>
            </div>
            {/* FOR PRICE */}
            <div className="flex-1">
              <label htmlFor="price" className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">Course Price (INR)</label>
              <input id="price" type="number" className="w-full border px-4 py-2 rounded-md" placeholder="₹" />
            </div>

            
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditCourse;
