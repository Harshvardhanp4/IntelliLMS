import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong, FaFire } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/empty.jpg"
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice";

function EditCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const thumb = useRef();
  const [isPublished, setIsPublished] = useState(false);
  const [selectCourse, setSelectCourse] = useState(null);
  const [title, setTitle] = useState("")
  const [subtitle, setSubTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [price, setPrice] = useState("")
  const [frontdImage, setFrontDImage] = useState(img)
  const [backdImage, setBackdImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const dispatch = useDispatch()
  const { courseData } = useSelector(state => state.course)
  const handleThumbnail = (e) => {
    const file = e.target.files[0]
    setBackdImage(file)
    setFrontDImage(URL.createObjectURL(file))
  }

  const getCourseById = async () => {
    try {
      const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, { withCredentials: true })
      setSelectCourse(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "")
      setSubTitle(selectCourse.subtitle || "")
      setDescription(selectCourse.description || "")
      setCategory(selectCourse.category || "")
      setLevel(selectCourse.level || "")
      setPrice(selectCourse.price || "")
      setFrontDImage(selectCourse.thumbnail || img)
      setIsPublished(selectCourse?.isPublished)


    }
  }, [selectCourse])

  useEffect(() => {
    getCourseById();
  }, [])

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData()
    formData.append("title", title)
    formData.append("subTitle", subtitle)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("level", level)
    formData.append("price", price)
    formData.append("thumbnail", backdImage)
    formData.append("isPublished", isPublished)
    try {
      const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}`, formData, { withCredentials: true })
      const updatedCourse = result.data

      if (updatedCourse && updatedCourse.isPublished) {
        const updated = (courseData || []).map(c => c._id === updatedCourse._id ? updatedCourse : c)
        if (!updated.some(c => c._id === updatedCourse._id)) updated.push(updatedCourse)
        dispatch(setCourseData(updated))
      } else {
        const filtered = (courseData || []).filter(c => c._id !== courseId)
        dispatch(setCourseData(filtered))
      }
      console.log(result.data)
      setLoading(false)
      navigate("/courses")
      toast.success("Course Update Successfully")
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error("Failed To Update Course")
    }
  }

  const handleRemoveCourse = async () => {
    try {
      setLoading1(true)
      const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}`, { withCredentials: true })
      console.log(result.data)
      const filtered = (courseData || []).filter(c => c._id !== courseId)
      dispatch(setCourseData(filtered))
      setLoading1(false)
      toast.success("Course Removed Successfully")
      navigate("/courses")
    } catch (error) {
      console.log(error)
      setLoading1(false)
      toast.error("Error while removing Course")
    }
  }
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* TOPBAR */}
      <div className="flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative">
        <FaArrowLeftLong className="top[-10%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer" onClick={() => navigate("/courses")} />

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
          <button className="bg-red-600 text-white px-4 py-2 rounded-md border border-black cursor-pointer" onClick={handleRemoveCourse}>Remove Course</button>
        </div>
        <form action="" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="pt-3">
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-1">Title</label>
            <input id="title" type="text" className="w-full border px-4 py-2 rounded-md" placeholder="Enter Course Title" onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-lg font-medium text-gray-700 mb-1">Subtitle</label>
            <input id="subtitle" type="text" className="w-full border px-4 py-2 rounded-md" placeholder="Enter Course Subtitle" onChange={(e) => setSubTitle(e.target.value)} value={subtitle} />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-1">Description</label>
            <textarea id="description" type="text" className="w-full border px-4 py-2 rounded-md h-20 resize-none" placeholder="Enter Course Description" onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">

            {/* FOR CATEGORY */}
            <div className="flex-1">
              <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">Course Category</label>
              <select name="" id="" className="w-full border px-4 py-2 rounded-md bg-white" onChange={(e) => setCategory(e.target.value)} value={category}>
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
              <select name="" id="" className="w-full border px-4 py-2 rounded-md bg-white" onChange={(e) => setLevel(e.target.value)} value={level}>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner 🛡️</option>
                <option value="Intermediate">Intermediate 🏹</option>
                <option value="Advanced">Advanced ⚔️</option>

              </select>
            </div>


            {/* FOR PRICE */}
            <div className="flex-1">
              <label htmlFor="price" className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">Course Price (INR)</label>
              <input id="price" type="number" className="w-full border px-4 py-2 rounded-md" placeholder="₹" onChange={(e) => setPrice(e.target.value)} value={price} />
            </div>


          </div>
          <div>
            <label htmlFor="" className="block text-md font-medium text-gray-700 mb-1"> Add Course Thumbnail</label>
            <input type="file" hidden ref={thumb} accept="image/*" onChange={handleThumbnail} />
          </div>
          <div className="relative w-[300px] h-[170px]">
            <img src={frontdImage} alt="" className="w-[100%] h-[100%] border-1 border-black rounded-[5px] cursor-pointer hover:opacity-20" onClick={() => thumb.current.click()} />
            <FaEdit className="w-[20px] h-[20px] absolute top-2 right-2 cursor-pointer hover:opacity-20" onClick={() => thumb.current.click()} />
          </div>
          <div className="flex items-center justify-start gap-[15px]">
            <button type="submit" className="bg-black text-white px-7 py-2 rounded-md hover:bg-green-600 cursor-pointer" onClick={handleEditCourse}>{loading ? <ClipLoader size={30} color="white" /> : "Save"}</button>
            <button type="button" className="bg-black text-white px-7 py-2 rounded-md hover:bg-red-400 cursor-pointer" onClick={() => navigate("/courses")}>Cancel</button>
            <p className="bg-red-200">MAKE SURE TO PUBLISH YOUR COURSE :)</p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditCourse;
