import express from "express"
import { createCourse, editCourse, getCourseById, getCreatorCourses, getPublishedCourses, removeCourses } from "../controllers/courseController.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { createLecture, editLecture, getCourseLecture, removeLecture } from "../controllers/lectureController.js";


const courseRouter = express.Router();


courseRouter.post("/create", isAuth, createCourse)
courseRouter.get("/getpublished", getPublishedCourses)
courseRouter.get("/getcreator", isAuth, getCreatorCourses)
courseRouter.post("/editcourse/:courseId", isAuth, upload.single("thumbnail"), editCourse)
courseRouter.get("/getcourse/:courseId", isAuth, getCourseById)
courseRouter.delete("/remove/:courseId", isAuth, removeCourses)



//create lecture
courseRouter.post("/createlecture/:courseId", isAuth, createLecture)

//get courses
courseRouter.get("/courselecture/:courseId", isAuth, getCourseLecture)

//edit courses
courseRouter.post("/editlecture/:lectureId", isAuth, upload.single("videoUrl"), editLecture)

//delete courses
courseRouter.delete("/removelecture/:lectureId", isAuth, removeLecture)


export default courseRouter;