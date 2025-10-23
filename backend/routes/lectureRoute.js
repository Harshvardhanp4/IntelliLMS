
import courseRouter from "./courseRoute"
import isAuth from "../middlewares/isAuth"
import { createLecture, editLecture, getCourseLecture, removeLecture } from "../controllers/lectureController"
import upload from "../middlewares/multer"

//create lecture
courseRouter.post("/createlecture/:courseId", isAuth, createLecture)

//get courses
courseRouter.get("/courselecture/:courseId", isAuth, getCourseLecture)

//edit courses
courseRouter.post("/editlecture/:lectureId", isAuth, upload.single("videoUrl"), editLecture)

//delete courses
courseRouter.delete("/removelecture/:lectureId", isAuth, removeLecture)
