import { useNavigate } from "react-router-dom"
import logo from "../assets/ims_logo.png"
function Footer() {
    const navigate = useNavigate();
    return (
        <div className='bg-black text-gray-300 py-10 px-6'>

            <div className='max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-[40px] lg:gap-[150px] flex-col lg:flex-row'>
                <div className='lg:w-[40%] md:w-[50%] w-[100%]'>
                    <img src={logo} alt="" className="h-10 mb-3 border-1 rounded-[5px]" />
                    <h2 className="text-xl font-bold text-white mb-3">IntelliLMS</h2>
                    <p className="text-sm">An AI-Powered learning platform to help you grow smarter. Learn anything, anytime, anywhere</p>
                </div>

                <div className="lg:w-[30%] md:w-[100%]">
                    <div className="text-white font-semibold mb-2">Quick links</div>
                    <ul className="text-sm space-y-1">
                        <li className="hover:text-white cursor-pointer" onClick={() => navigate("/")}>Home</li>
                        <li className="hover:text-white cursor-pointer" onClick={() => navigate("/allcourses")}>All Courses</li>
                        <li className="hover:text-white cursor-pointer" onClick={() => navigate("/login")}>Login</li>
                        <li className="hover:text-white cursor-pointer" onClick={() => navigate("/profile")}>My Profile</li>
                    </ul>
                </div>
                <div className="lg:w-[30%] md:w-[100%]">
                    <div className="text-white font-semibold mb-2">About Me:-</div>
                    <ul className="text-sm space-y-1">
                        <li className="hover:text-white cursor-pointer" onClick={() => window.open("https://www.linkedin.com/in/harshvardhanp4/")}>Linkedin</li>
                        <li className="hover:text-white cursor-pointer" onClick={() => window.open("https://github.com/Harshvardhanp4")}>Github</li>
                        <li className="hover:text-white cursor-pointer" onClick={() => window.open("https://x.com/harshspeaks04")}>Twitter</li>
                        <li className="hover:text-white cursor-pointer" onClick={() => window.open("https://www.linkedin.com/in/harshvardhanp4/")}>Instagram</li>
                    </ul>
                </div>
            </div>
            <div></div>
            <div className="border-t border-gray-700 mt-10 pt-5 text-sm text-center text-gray-500">{new Date().getFullYear()} ©IntelliLMS. All rights reserved</div>
            <div className="mt-1 pt-5 text-sm text-center text-gray-500"> Made with ♥  by Harshvardhan Patil</div>
        </div>
    )
}

export default Footer