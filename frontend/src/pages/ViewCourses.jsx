import { FaArrowLeftLong } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { setSelectedCourse } from "../redux/courseSlice";
import { useEffect } from "react";
import img from "../assets/empty.jpg"


function ViewCourses() {
    const navigate = useNavigate();
    const { courseData } = useSelector(state => state.course);
    const { courseId } = useParams();
    const { selectedCourse } = useSelector(state => state.course)
    const dispatch = useDispatch();

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
        fetchCourseData()
    }, [courseData, courseId])


    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">
                {/* TOP AREA */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Thumbnail */}
                    <div className="w-full md:w-1/2">
                        <FaArrowLeftLong className="w-[22px] h-[22px] cursor-pointer" onClick={() => navigate("/")} />
                        {selectedCourse?.thumbnail ? <img src={selectedCourse?.thumbnail} alt="" className="rounded-xl w-full object-cover" /> : <img src={img} alt="" className="rounded-xl w-full object-cover" />}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ViewCourses