import { GoogleGenAI } from "@google/genai";
import Course from "../models/courseModel.js"
import dotenv from 'dotenv'
dotenv.config()

export const searchWithAi = async (req, res) => {
    try {
        const { input } = req.body
        if (!input) {
            return res.status(400).json({ message: "Search Query is required!" })
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:
        - App Dev
        - AI/ML
        - AI Tools
        - Data Science
        - Data Analytics
        - Ethical Hacking
        - UI UX Designing
        - Web Dev
        - Others
        - Beginner
        - Intermediate
        - Advanced
        
        Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text.
        
        Query:${input}
        `

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const keyword = response.text
        const courses = await Course.find({
            isPublished: true,
            $or: [
                { title: { $regex: input, $options: 'i' } },//insensitive
                { subtitle: { $regex: input, $options: 'i' } }, //insensitive
                { category: { $regex: input, $options: 'i' } }, //insensitive
                { level: { $regex: input, $options: 'i' } }, //insensitive

            ]
        });

        if (courses.length > 0) {
            return res.status(200).json(courses)
        }
        else {

            const courses = await Course.find({
                isPublished: true,
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },//insensitive
                    { subtitle: { $regex: keyword, $options: 'i' } }, //insensitive
                    { category: { $regex: keyword, $options: 'i' } }, //insensitive
                    { level: { $regex: keyword, $options: 'i' } }, //insensitive

                ]
            });

            return res.status(200).json(courses)

        }


    } catch (error) {
        return res.status(500).json({
            msg: "Failed to search"
        })
    }
}