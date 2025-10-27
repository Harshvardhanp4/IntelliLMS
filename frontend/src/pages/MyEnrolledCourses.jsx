import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6"

function MyEnrolledCourses() {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    return (
        <div className="min-h-screen w-full px-4 py-9 bg-gray-50">
            <FaArrowLeftLong className="absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer" onClick={() => navigate("/")} />
            <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">My Enrolled Courses</h1>

            {
                userData?.enrolledCourses?.length === 0 ? (
                    <p className="text-gray-500 text-center w-full">You haven't enrolled in any course yet..</p>
                ) : (
                    <div className="flex items-center justify-center flex-wrap gap-[30px]">
                        {userData?.enrolledCourses?.map((course, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden border">
                                <img src={course?.thumbnail} alt="" className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{course?.title}</h2>
                                    <p className="text-sm text-gray-600 mb-2">{course?.category}</p>
                                    <p className="text-sm text-gray-600 mb-2">{course?.level}</p>
                                    <h1 className="bg-black border border-black text-white font-bold  rounded px-[10px] py-[10px] flex items-center  justify-center text-center cursor-pointer hover:bg-gray-700" onClick={() => navigate(`/viewlecture/${course._id}`)}>Watch Now</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

        </div >
    )
}

export default MyEnrolledCourses