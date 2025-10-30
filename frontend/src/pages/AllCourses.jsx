import { FaArrowLeftLong } from "react-icons/fa6"
import { Navbar } from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ai from "../assets/SearchAi.png"
import Card from "../components/Card";

function AllCourses() {
    const navigate = useNavigate();
    const { courseData } = useSelector(state => state.course);
    const [category, setCategory] = useState([])
    const [filterCourses, setFilterCourses] = useState([])
    const [isSideBarVisible, setisSideBarVisible] = useState(false)

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(c => c !== e.target.value))  //will remove others and use category of selected

        }

        else {
            //consist more than one
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let courseCopy = courseData?.slice()
        if (category.length > 0) {
            courseCopy = courseCopy.filter(c => category.includes(c.category)) //will check if selected Web Dev then it will filter courses and put in courseCopy
        }

        setFilterCourses(courseCopy)
    }

    useEffect(() => {
        setFilterCourses(courseData || [])
    }, [courseData])

    useEffect(() => {
        applyFilter()
    }, [category])



    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navbar />
            <button className="fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black" onClick={() => setisSideBarVisible(prev => !prev)}>
                {isSideBarVisible ? 'Hide' : 'Show'} Filters
            </button>

            {/* SIDEBAR */}
            <aside className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 ${isSideBarVisible ? "translate-x-0" : "-translate-x-full"} md:block md:translate-x-0`}>
                <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6"><FaArrowLeftLong className="text-white cursor-pointer" size={20} onClick={() => navigate("/")} />Filter By Category</h2>
                <form action="" className="space-y-4 text-sm bg-gray-200 border border-white text-white p-[20px]" onSubmit={(e) => e.preventDefault()}>
                    <button className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer" onClick={() => navigate("/search")}>Search with AI <img src={ai} alt="" className="w-[30px] h-[30px]" /></button>
                    <label htmlFor="" className="flex items-center gap-3 cursor-pointer hover:text-gray-800 transition text-black">
                        <input type="checkbox" className="accent-black w-4 h-4 rounded-md cursor-pointer" value={'App Dev'} onChange={toggleCategory} />App Development
                    </label>

                    <label htmlFor="" className="flex items-center gap-3 cursor-pointer hover:text-gray-800 transition text-black">
                        <input type="checkbox" className="accent-black w-4 h-4 rounded-md cursor-pointer" value={'Web Dev'} onChange={toggleCategory} />Web Development
                    </label>

                    <label htmlFor="" className="flex items-center gap-3 cursor-pointer hover:text-gray-800 transition text-black">
                        <input type="checkbox" className="accent-black w-4 h-4 rounded-md cursor-pointer" value={'AI/ML'} onChange={toggleCategory} />AI/ML
                    </label>

                    <label htmlFor="" className="flex items-center gap-3 cursor-pointer hover:text-gray-800 transition text-black">
                        <input type="checkbox" className="accent-black w-4 h-4 rounded-md cursor-pointer" value={'Data Science'} onChange={toggleCategory} />Data Science
                    </label>

                    <label htmlFor="" className="flex items-center gap-3 cursor-pointer hover:text-gray-800 transition text-black">
                        <input type="checkbox" className="accent-black w-4 h-4 rounded-md cursor-pointer" value={'Data Analytics'} onChange={toggleCategory} />Data Analytics
                    </label>

                    <label htmlFor="" className="flex items-center gap-3 cursor-pointer hover:text-gray-800 transition text-black">
                        <input type="checkbox" className="accent-black w-4 h-4 rounded-md cursor-pointer" value={'Ethical Hacking'} onChange={toggleCategory} />Ethical Hacking
                    </label>

                    <label htmlFor="" className="flex items-center gap-3 cursor-pointer hover:text-gray-800 transitionn text-black">
                        <input type="checkbox" className="accent-black w-4 h-4 rounded-md cursor-pointer" value={'UI/UX Desigining'} onChange={toggleCategory} />UI/UX Designing
                    </label>

                    <label htmlFor="" className="flex items-center gap-3 cursor-pointer hover:text-gray-800 transitionn text-black">
                        <input type="checkbox" className="accent-black w-4 h-4 rounded-md" value={'Other'} onChange={toggleCategory} />Other
                    </label>
                </form>
            </aside>

            {/* MAIN */}
            <main className="w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]"> {
                filterCourses?.map((course, index) => (
                    <Card key={index} thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price} id={course._id} reviews={course.reviews} />
                ))

            }</main>

        </div >
    )
}

export default AllCourses