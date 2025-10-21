import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/ims_logo.png";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

export function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      console.log(result.data);
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
      toast.error("Error while logging out");
    }
  };

  return (
    <div>
      <div className="w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10">
        <div className="lg:w[-20%] w-[40%] lg:pl-[50px]">
          <img
            src={logo}
            alt="logo"
            className="w-[60px] rounded-[5px] border-2 border-white "
          />
        </div>
        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden">
          {/* profile */}

          {!userData && (
            <IoPersonCircle
              className="w-[50px] h-[50px] fill-black border-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            ></IoPersonCircle>
          )}
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          ) : (
            <div
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )}
          {userData?.role === "educator" && (
            <div
              className="px-[20px] py-[10px] border-2 lg:border-white lg:text-white  text-black rounded-[10px] text-[18px] font-light  cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
          {show && (
            <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white hover:text-cursor-pointer hover:bg-black ">
              <span
                className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                My profile
              </span>
              <span className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 cursor-pointer">
                My courses
              </span>
            </div>
          )}
        </div>

        <RxHamburgerMenu
          className="w-[35px] h-[35px] lg:hidden text-white cursor-pointer"
          onClick={() => setShowHam((prev) => !prev)}
        />

        <div
          className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden 
            ${showHam
              ? "translate-x-[0] transition duration-600"
              : "translate-x-[-100%] transition duration-600"
            }`}
        >
          <AiOutlineClose
            className="w-[35px] h-[35px] fill-white absolute top-5 right-[4%]"
            onClick={() => setShowHam((prev) => !prev)}
          />

          {!userData && (
            <IoPersonCircle className="w-[50px] h-[50px] fill-black cursor-pointer"></IoPersonCircle>
          )}
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            />
          ) : (
            <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer">
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div
            className="w-[200px] h-[60px] border-2 border-white text-white flex items-center justify-center bg-black text-black rounded-[10px] text-[18px] font-light  cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            My profile
          </div>

          <div className="w-[200px] h-[60px] border-2 border-white text-white flex items-center justify-center bg-black text-black rounded-[10px] text-[18px] font-light  cursor-pointer">
            My courses
          </div>
          {userData?.role === "educator" && (
            <div className="w-[200px] h-[60px] border-2 border-white text-white flex items-center justify-center bg-black text-black rounded-[10px] text-[18px] font-light  cursor-pointer" onClick={() => navigate("/dashboard")}>
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              className="w-[200px] h-[60px] border-2 border-white text-white flex items-center justify-center bg-black text-black rounded-[10px] text-[18px] font-light  cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="w-[200px] h-[60px] border-2 border-white text-white flex items-center justify-center bg-black text-black rounded-[10px] text-[18px] font-light  cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
