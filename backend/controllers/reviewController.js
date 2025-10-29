import Course from "../models/courseModel.js"
import Review from "../models/reviewModel.js"



export const createReview = async (req, res) => {
    try {
        const { rating, comment, courseId } = req.body
        const userId = req.userId

        if (!rating || !courseId) {
            return res.status(400).json({ message: "Rating and courseId are required!" })
        }

        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({ message: "Course not found!" })
        }
        const alreadyreviewed = await Review.findOne({ course: courseId, user: userId })
        if (alreadyreviewed) {
            return res.status(400).json({ message: "You have already reviewed the course!" })
        }

        const review = new Review({
            course: courseId,
            user: userId,
            rating,
            comment
        })
        await review.save()
        course.reviews.push(review._id)
        await course.save()

        return res.status(201).json({ message: "Review Sent Successfully", review })

    } catch (error) {
        console.error("Error in createReview:", error);
        return res.status(500).json({
            message: "Failed to create review",
            error: error.message
        })
    }
}

export const getReviews = async (req, res) => {
    try {
        const review = await Review.find({}).populate("user course").sort({ reviewedAt: -1 }) //this will fetch the latest reviews up
        return res.status(200).json(review)

    } catch (error) {
        return res.status(500).json({
            message: "Failed to create review"
        })
    }
}
