
import Course from "../models/courseModel.js"


export const searchWithAi = async (req, res) => {
    try {
        const { input } = req.body
        if (!input) {
            return res.status(400).json({ message: "Search Query is required!" })
        }

        const courses = await Course.find({
            isPublished: true,
            $or: [
                { title: { $regex: input, $options: 'i' } },//insensitive
                { subtitle: { $regex: input, $options: 'i' } }, //insensitive
                { category: { $regex: input, $options: 'i' } }, //insensitive
                { level: { $regex: input, $options: 'i' } }, //insensitive

            ]
        });

        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({
            msg: "Failed to search"
        })
    }
}