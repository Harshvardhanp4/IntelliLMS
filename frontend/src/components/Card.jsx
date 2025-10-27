
import { IoStar } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

function Card({ title, category, price, id, thumbnail }) {
    const navigate = useNavigate();
    return (
        <div className='max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300 hover:shadow-emerald-300 cursor-pointer' onClick={() => navigate(`/viewcourse/${id}`)}>
            <img src={thumbnail} alt="" className='w-full h-48 object-cover' />
            <div className='p-5 space-y-2'>
                <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
                <span className='px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 capitalize'>{category}</span>

                <div className='flex justify-between text-sm text-gray-600 mt-3 px-[10px]'>
                    <span className='font-semibold text-gray-800'>₹{price}</span>
                    <span className='flex items-center'>5<IoStar className='text-yellow-400' /></span>
                </div>
            </div>
        </div>
    )
}

export default Card