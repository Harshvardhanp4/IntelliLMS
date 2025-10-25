import razorpay from 'razorpay'
import dotenv from "dotenv"
import Course from "../models/courseModel.js"
import User from "../models/userModel.js"
dotenv.config()

const RazorPayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET

})


export const RazorpayOrder = async (req, res) => {
    try {
        const { courseId } = req.body
        if (!courseId) {
            return res.status(404).json({
                message: "Course not found!"
            })
        }
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({
                message: "Course Not Found"
            })
        }

        const options = {
            amount: course.price * 100,
            currency: 'INR',
            receipt: String(courseId)

        }

        const order = await RazorPayInstance.orders.create(options)
        return res.status(200).json(order)

    } catch (error) {
        return res.status(500).json({
            message: "Failed to create razorpay order"
        })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { courseId, userId, razorpay_order_id } = req.body
        const orderInfo = await RazorPayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            const user = await User.findById(userId)
            if (!user.enrolledCourses.includes(courseId)) {
                await user.enrolledCourses.push(courseId)
                await user.save()
            }
            const course = await Course.findById(courseId).populate("lectures")
            if (!course.enrolledStudents.includes(userId)) {
                await course.enrolledStudents.push(userId)
                await course.save()

            }
            return res.status(200).json({
                message: "Payment Verified and Enrollment Successful!"
            })
        }
        else {
            return res.status(400).json({
                message: "Payment Failed"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error during payment verification ${error}`
        })
    }
}