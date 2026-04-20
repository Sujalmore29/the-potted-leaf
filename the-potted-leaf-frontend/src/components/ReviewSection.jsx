import axios from '../api/axios'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ReviewSection = ({ plantId }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!plantId) return; //stop Api call if plantId is not available yet
        fetchReviews();
    }, [plantId]);

    const fetchReviews = async () => {
        try{
            const res = await axios.get(`/review/${plantId}`);
            setReviews(res.data);
        } catch(err){
            toast.error("Failed to load reviews.");
            console.error(err);
        }
    };

    const submitReview = async () => {
        if(!rating || !comment) {
            toast.error("Please provide both rating and comment.");
            return;
        }

        try{
            setLoading(true);

            const res = await axios.post("/review/add", {
                plantId,
                rating,
                comment,
            });

            //Success
            if(res.data.success){
                toast.success(res.data.message);
                fetchReviews();
                setRating("");
                setComment("");
            }
        } catch(err) {
            const message = err.response?.data?.comment || "Something went wrong";
            
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className='max-w-3xl mx-auto py-16'>

        { /* Title */ }
        <h2 className='text-3xl font-bold text-green-800 mb-8'>Customer Reviews</h2>

        { /* Review Form */ }
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-green-50 p-6 rounded-2xl shadow-sm mb-12'>
                <h3 className='text-xl font-semibold mb-4'>
                    Write a Review
                </h3>

                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className='w-full border p-3 rounded-lg mb-4'>
                        <option value="">Select Rating</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="1">⭐</option>
                    </select>

                    <textarea placeholder='Share your experience...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='w-full border p-3 rounded-lg mb-4' />

                    <button onClick={submitReview}
                    disabled={loading}
                    className='bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition'>
                        {loading ? "Submitting... " : "Submit Review"}
                    </button>
            </motion.div>

        { /* Reviews List */ }
        <div className='space-y-6'>
            {reviews.length === 0 && (
                <p className='text-gray-500'>No reviews yet. Be the first to review this plant 🌿</p>
            )}
            {reviews.map((rev, index) => (
                <motion.div
                    key={rev.id || rev._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='bg-white shadow-md rounded-2xl p-5'>
                        <div className='flex items-center justify-between'>
                            <h4 className='font-semibold text-gray-800'>{rev.user?.name || "Customer"}</h4>
                            <div className='text-yellow-500'>
                                {"⭐".repeat(Number(rev.rating) || 0)}
                            </div>
                        </div>

                        <p className='text-gray-600 mt-3'>{rev.comment}</p>
                </motion.div>
            ))}
        </div>
    </div>
  );
};

export default ReviewSection