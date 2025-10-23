import { SiViaplay } from "react-icons/si";
import { CgDesktop } from "react-icons/cg";
import SmallCourses from "./SmallCourses";
import { useNavigate } from "react-router-dom";
function ExploreCourses() {
  const navigate = useNavigate();
  return (
    <div className="w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]">
      {/* left/top div */}
      <div className="w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]">
        <span className="text-[35px] font-semibold">Explore Courses</span>
        <span className="text-[35px] font-semibold"></span>
        <p className="text-[17px]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maiores
          excepturi, adipisci reprehenderit ex, nobis nam corporis
          necessitatibus temporibus, cumque laborum fugiat at? Molestiae, cumque
          aperiam veritatis atque harum eius.
        </p>
        <button className="px-[20px] py-[10px] border-2 bg-black border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px] cursor-pointer" onClick={() => navigate("/allcourses")}>
          Explore Courses
          <SiViaplay className="w-[25px] h-[30px] lg:fill-white" />
        </button>
      </div>
      {/* right/bottom div */}
      <SmallCourses />
    </div>
  );
}

export default ExploreCourses;
