import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData } from '../redux/courseSlice'

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

const getCreatorCourse = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    return (
        useEffect(() => {
            const creatorCourses = async () => {
                try {
                    const result = await axios.get(`${serverUrl}/api/course/getcreator`, { withCredentials: true })
                    console.log(result.data)
                    dispatch(setCreatorCourseData(result.data));
                } catch (error) {
                    console.log(error)
                    toast.error("Some Error Occured")
                }
            }
            creatorCourses()
        }, [userData])
    )
}

export default getCreatorCourse