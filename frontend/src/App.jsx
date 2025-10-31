import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import getCurrentUser from "./custom_hooks/getCurrentUser";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/forgetPassword";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Educator/Dashboard";
import Courses from "./pages/Educator/Courses";
import CreateCourses from "./pages/Educator/createCourses";
import getCreatorCourse from "./custom_hooks/getCreatorCourse";
import EditCourse from "./pages/Educator/EditCourse";
import getPublishedCourse from "./custom_hooks/getPublishedCourse";
import AllCourses from "./pages/AllCourses";
import CreateLecture from "./pages/Educator/CreateLecture";
import EditLecture from "./pages/Educator/EditLecture";
import ViewCourses from "./pages/ViewCourses";
import ScrollToTop from "./custom_hooks/ScrollToTop";
import ViewLecture from "./pages/ViewLecture";
import MyEnrolledCourses from "./pages/MyEnrolledCourses";
import getAllReviews from "./custom_hooks/getAllReviews";
import SearchWithAi from "./pages/SearchWithAi";


export const serverUrl = import.meta.env.VITE_SERVER_URL;

function App() {
  getCurrentUser();
  getCreatorCourse();
  getPublishedCourse();
  getAllReviews();


  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Routes>

        <Route path="/" element={<Home />} />


        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to={"/"} />}
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to={"/signup"} />}
        ></Route>

        <Route path="/forget" element={<ForgetPassword />}></Route>

        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to={"/signup"} />}
        ></Route>

        <Route
          path="/allcourses"
          element={userData ? <AllCourses /> : <Navigate to={"/signup"} />}
        ></Route>

        {/* -----------------------COURSES ROUTES------------------------------------------ */}

        <Route
          path="/dashboard"
          element={
            userData?.role === "educator" ? (
              <Dashboard />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        ></Route>

        <Route
          path="/courses"
          element={
            userData?.role === "educator" ? (
              <Courses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        ></Route>


        <Route
          path="/createcourse"
          element={
            userData?.role === "educator" ? (
              <CreateCourses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        ></Route>


        <Route
          path="/editcourse/:courseId"
          element={
            userData ? (
              <EditCourse />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        ></Route>


        <Route
          path="/viewcourse/:courseId"
          element={
            userData ? (
              <ViewCourses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        ></Route>

        <Route
          path="/mycourses"
          element={
            userData ? (
              <MyEnrolledCourses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        ></Route>


        <Route
          path="/search"
          element={
            userData ? (
              <SearchWithAi />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        ></Route>



        {/*--------- LECTURE ROUTE -----------------*/}

        <Route
          path="/createlecture/:courseId"
          element={
            userData?.role === "educator" ? (
              <CreateLecture />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        ></Route>

        <Route
          path="/editlecture/:courseId/:lectureId"
          element={
            userData?.role === "educator" ? (
              <EditLecture />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        ></Route>

        <Route
          path="/viewlecture/:courseId"
          element={
            userData ? (
              <ViewLecture />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        ></Route>

      </Routes >
    </>






  );
}

export default App;
