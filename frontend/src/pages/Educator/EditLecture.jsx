import axios from "axios";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { serverUrl } from "../../App";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";


function EditLecture() {
    const { courseId, lectureId } = useParams();
    const { lectureData } = useSelector(state => state.lecture)
    const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
    const navigate = useNavigate();

    const [lectureTitle, setLectureTitle] = useState(selectedLecture.lectureTitle)
    const [videoUrl, setVideoUrl] = useState();
    const [isPreviewFree, setIsPreviewFree] = useState(false);
    const [loading, setLoading] = useState();
    const [loading1, setLoading1] = useState();
    const dispatch = useDispatch()




    const handleEditLecture = async () => {
        setLoading(true)
        try {

            const formdata = new FormData()
            formdata.append("lectureTitle", lectureTitle)
            if (videoUrl) formdata.append("videoUrl", videoUrl)
            formdata.append("isPreviewFree", isPreviewFree)


            const result = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}`, formdata, { withCredentials: true })
            console.log(result.data)
            dispatch(setLectureData(lectureData.filter(lec => lec._id !== lectureId).concat(result.data)))
            toast.success("Lecture Updated Successfully!")
            navigate("/courses")
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error("Error while updating lecture")
            setLoading(false)
        }
    }


    const removeLecture = async () => {
        setLoading1(true)
        try {
            const result = await axios.delete(serverUrl + `/api/course/removelecture/${lectureId}`, { withCredentials: true })
            console.log(result.data)
            setLoading1(false)
            navigate(`/createlecture/${courseId}`)
            toast.success("Lecture Removed Successfully")

        } catch (error) {
            setLoading1(false)
            console.log(error)
            toast.error("Error while removing course")
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
                {/* HEADER */}
                <div className="flex items-center gap-2 mb-2">
                    <FaArrowLeftLong className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={() => navigate(`/createlecture/${courseId}`)} />
                    <h2 className="text-xl font-semibold text-gray-800">Update Course Lecture</h2>
                </div>

                <button className="mt-2 px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-300 transition-all text-sm cursor-pointer" disabled={loading1} onClick={removeLecture}>{loading1 ? <ClipLoader size={30} color="white" /> : "Remove Lecture"}</button>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="">Lecture Title*</label>
                        <input className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none" type="text" required onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="">Video URL*</label>
                        <input className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-gray-900 file:text-white hover:file:bg-gray-500 file:cursor-pointer file:rounded-md" type="file" required accept="video/*" onChange={(e) => setVideoUrl(e.target.files[0])} />
                    </div>

                    <div className="flex items-center gap-3 pl-1">
                        <input type="checkbox" className="accent-black h-4 w-4" id="isFree" onChange={() => setIsPreviewFree(prev => !prev)} />
                        <label htmlFor="" className="text-sm text-gray-800">is the Video Free?</label>
                    </div>
                    {loading ? <p>Uploading video.. Please wait</p> : ""}

                    <div className="pt-4">
                        <button className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition" onClick={handleEditLecture} disabled={loading}>{loading ? <ClipLoader size={30} color="white" /> : "Update Lecture"}</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditLecture