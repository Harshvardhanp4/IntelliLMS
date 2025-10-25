import uploadOnCloudinary from "../config/cloudinary.js"
import Course from "../models/courseModel.js"
import User from "../models/userModel.js"
export const createCourse = async (req, res) => {
    try {
        const { title, category } = req.body
        if (!title || !category) {
            return res.status(400).json({ message: "title or category is requuired" })
        }
        const course = await Course.create({
            title,
            category,
            creator: req.userId
        })
        return res.status(201).json(course)

    } catch (error) {
        return res.status(500).json({
            msg: "Error while creating course"
        })
    }
}

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate("lectures")
        if (!courses) {
            return res.status(400).json({ message: "Courses not found" })
        }
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({
            msg: "Error while fetching course"
        })
    }
}

export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.userId
        const courses = await Course.find({ creator: userId })

        if (!courses) {
            return res.status(400).json({ message: "Courses not found" })
        }
        return res.status(200).json(courses)

    } catch (error) {
        return res.status(500).json({
            msg: "Error while fetching courses"
        })
    }
}

export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params
        const { title, subTitle, description, category, level, isPublished, price } = req.body
        let thumbnail
        if (req.file) {
            thumbnail = await uploadOnCloudinary(req.file.path)
        }
        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({ message: "Courses not found" })
        }


        const updateData = { title, subTitle, description, category, level, isPublished, price, thumbnail }

        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true })
        return res.status(200).json(course)

    } catch (error) {
        return res.status(500).json({
            msg: "Failed to edit course"
        })
    }
}

export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params
        let course = await Course.findById(courseId)

        if (!course) {
            return res.status(400).json({ message: "Courses not found" })
        }
        return res.status(200).json(course)

    } catch (error) {
        return res.status(500).json({
            msg: "Failed to get course"
        })
    }
}

export const removeCourses = async (req, res) => {
    try {
        const { courseId } = req.params
        let course = await Course.findById(courseId)

        if (!course) {
            return res.status(400).json({ message: "Courses not found" })
        }
        course = await Course.findByIdAndDelete(courseId, { new: true })
        return res.status(200).json({ message: "Course Removed" })

    } catch (error) {
        return res.status(500).json({
            msg: "Failed to get course"
        })
    }
}

export const getCreatorById = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User Not Found!" })
        }

        return res.status(200).json(user)


    } catch (error) {
        return res.status(500).json({
            msg: "Failed to get creator"
        })

    }
}



