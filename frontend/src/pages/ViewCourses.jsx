import { FaArrowLeftLong, FaLock, FaStar } from "react-icons/fa6"
import { IoStar } from 'react-icons/io5'
import { IoIosPlayCircle, IoMdLock } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { setSelectedCourse } from "../redux/courseSlice";
import { useEffect, useState } from "react";
import axios from "axios"
import img from "../assets/empty.jpg"
import { serverUrl } from "../App";
import Card from "../components/Card";



function ViewCourses() {
    const navigate = useNavigate();
    const { courseData } = useSelector(state => state.course);
    const { courseId } = useParams();
    const { selectedCourse } = useSelector(state => state.course)
    const dispatch = useDispatch();
    const [selectedLecture, setSelectedLecture] = useState(null)
    const [creatorData, setCreatorData] = useState(null)
    const [creatorCourses, setCreatorCourses] = useState(null)

    const fetchCourseData = async () => {
        courseData.map((course) => {
            if (course._id === courseId) {
                dispatch(setSelectedCourse(course))
                console.log(selectedCourse)

                return null
            }
        })
    }

    useEffect(() => {

        const handleCreator = async () => {
            if (selectedCourse?.creator) {
                try {
                    const result = await axios.post(serverUrl + "/api/course/creator", { userId: selectedCourse?.creator }, { withCredentials: true })
                    console.log(result.data)
                    setCreatorData(result.data)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        handleCreator()
    }, [selectedCourse])

    useEffect(() => {
        fetchCourseData()
    }, [courseData, courseId])

    useEffect(() => {
        if (creatorData?._id && courseData.length > 0) {
            const creatorCourse = courseData.filter((course) =>
                course.creator === creatorData?._id && course._id !== courseId)
            setCreatorCourses(creatorCourse)
        }

    }, [creatorData, courseData])



    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">
                {/* TOP AREA */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Thumbnail */}
                    <div className="w-full md:w-1/2">
                        <FaArrowLeftLong className="w-[22px] h-[22px] cursor-pointer" onClick={() => navigate("/")} />
                        {selectedCourse?.thumbnail ? <img src={selectedCourse?.thumbnail} alt="" className="rounded-xl w-full object-cover pt-5" /> : <img src={img} alt="" className="rounded-xl w-full object-cover" />}
                    </div>
                    {/* COURSE INFO */}
                    <div className="flex-1 space-y-2 mt-[20px] pt-5">
                        <h2 className="text-2xl font-bold">{selectedCourse?.title}</h2>
                        <div className="flex items-start flex-col justify-between">
                            <div className="text-yellow-500 font-medium flex gap-2">
                                <span className="flex items-center justify-start gap-1">5{" "}<IoStar /></span>
                                <span className="text-gray-400">(1,500 Reviews)</span>
                            </div>
                            <div className="pt-2">
                                <span className="text-2xl font-semibold text-black ">₹{selectedCourse?.price}</span>{" "}
                                <span className="line-through text-sm text-gray-400">  ₹599</span>
                            </div>

                            <ul className="text-md text-black space-y-1 pt-2">
                                <li> ✓  10+ hours of video content</li>
                                <li> ✓ Lifetime access to course materials</li>
                            </ul>
                            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-600 mt-3 cursor-pointer">Enroll Now!</button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">What you'll get to learn</h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Learn {selectedCourse?.category} from beginning</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Who this course is for</h2>
                    <p className="text-gray-700 pl-1">Beginners, aspiring developers and people looking to upgrade their skills</p>
                </div>
                {/* MAIN AREA */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200">
                        <h2 className="text-2xl font-bold mb-1 text-gray-800">Course Curriculum</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            {selectedCourse?.lectures?.length} Lectures
                        </p>
                        <div className="flex flex-col gap-3">
                            {selectedCourse?.lectures?.map((lecture, index) => (

                                <button key={index} className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left${lecture.isPreviewFree ? "hover:bg-gray-100 cursor-pointer border-gray-300" : "cursor-not-allowed opacity-60 border-gray-200"} ${selectedLecture?.lectureTitle === lecture?.lectureTitle ? "bg-gray-300 border border-gray-400" : ""}`}
                                    disabled={!lecture.isPreviewFree}
                                    onClick={() => {
                                        if (lecture.isPreviewFree) {
                                            setSelectedLecture(lecture)
                                        }
                                    }
                                    }>
                                    <span className="text-lg text-gray-700">
                                        {lecture.isPreviewFree ? <IoIosPlayCircle />
                                            : <IoMdLock />}
                                    </span>
                                    <span className="text-sm font-medium text-gray-800">{lecture.lectureTitle}</span>
                                </button>
                            ))}

                        </div>
                    </div>


                    <div className="bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200">
                        <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
                            {selectedLecture?.videoUrl ? <video className="w-full h-full object-cover" src={selectedLecture?.videoUrl} controls></video> : <span className="text-white text-sm">Select a preview lecture to watch (Click on a Lecture) </span>}

                        </div>
                    </div>
                </div>

                {/* REVIEW SECTION */}

                <div className="mt-8 border-t pt-6">
                    <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
                    <div className="mb-4">
                        <div className="flex gap-1 mb-2">
                            {
                                [1, 2, 3, 4, 5].map((star) => (
                                    <FaStar key={star} className="fill-gray-300" />
                                ))
                            }
                        </div>
                        <textarea className="w-full border border-gray-300 rounded-lg p-2" placeholder="Write your review here.." rows={3}></textarea>
                        <button className="bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800 cursor-pointer">Submit Review</button>
                    </div>
                </div>
                {/* CREATOR INFO */}
                <div className="flex items-center gap-3 pt-4 border-t">
                    {creatorData?.photoUrl ? <img src={creatorData?.photoUrl} alt="" className="w-16 h-16 rounded-full object-cover border border-black " /> : <img src={img} alt="" className="w-16 h-16 rounded-full object-cover border border-black" />}
                    <div>
                        <h2 className="text-lg font-bold text-gray-700">{creatorData?.name}</h2>
                        <p className="md:text-sm font-semibold text-gray-700 text-[10px]">{creatorData?.description}</p>
                        <p className="md:text-sm font-semibold text-gray-700 text-[10px]">{creatorData?.email}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xl font-semibold mb-2">Other published courses by Educator</p>

                </div>

                <div className="w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]">
                    {
                        creatorCourses?.map((course, index) => (
                            <Card key={index} thumbnail={course.thumbnail} id={course._id} price={course.price} title={course.title} category={course.category} />
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default ViewCourses