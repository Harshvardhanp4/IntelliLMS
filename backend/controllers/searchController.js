import { GoogleGenAI } from "@google/genai";
import Course from "../models/courseModel.js"
import dotenv from 'dotenv'

dotenv.config()

export const searchWithAi = async (req, res) => {

    try {

        const { input } = req.body;

        if (!input) {
            return res.status(400).json({
                message: "Search Query is required!"
            });
        }

        let keyword = input;

        try {

            const ai = new GoogleGenAI({
                apiKey: process.env.GEMINI_API_KEY
            });

            const prompt = `
            You are an intelligent assistant for an LMS platform.
            Return ONLY one keyword from:
            App Dev, AI/ML, AI Tools, Data Science,
            Data Analytics, Ethical Hacking,
            UI UX Designing, Web Dev, Others,
            Beginner, Intermediate, Advanced

            Query: ${input}
            `;

            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt,
            });

            console.log(response);

            keyword = response.text?.trim() || input;

        } catch (err) {

            console.log("Gemini Failed:", err.message);

        }

        const courses = await Course.find({
            isPublished: true,
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { subtitle: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } },
                { level: { $regex: keyword, $options: 'i' } },
            ]
        });

        return res.status(200).json(courses);

    } catch (error) {

        return res.status(500).json({
            msg: "Failed to search",
            error: error.message
        });

    }

}