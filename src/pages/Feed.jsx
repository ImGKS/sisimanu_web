import React, { useEffect, useState } from 'react'
import FeedCard from '../components/FeedCard'
import axios from 'axios'
import { BASE_URL } from '../utils/urlConstant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../store/feedSlice'
import { motion } from "framer-motion";
import { toast } from 'react-toastify'

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed)

  const currentIndex = 0;
  const [dragging, setDragging] = useState(false);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
      dispatch(addFeed(res?.data?.data))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFeed()
  },[])

  const updateUserRequest = async (status, id) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${id}`, 
          {},
          {withCredentials: true}
      ); 
      toast.success("Request updated successfully.")
      getFeed()

    } catch (error) {
        console.log("Error :", error.message);
        toast.error("Request couldn't get send. Please try again.")
    }
  }

  return (
    <div className="min-h-fit flex justify-center items-center cursor-pointer">
      {feed?.[currentIndex] ? (
        <motion.div
          className="absolute w-80"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setDragging(true)}
          onDragEnd={(e, info) => {
            setDragging(false);
            if (info.offset.x > 100) {
              updateUserRequest("interested", feed?.[currentIndex]?._id)
            } else if (info.offset.x < -100) {
              updateUserRequest("ignored", feed?.[currentIndex]?._id)
            }
          }}
          animate={{
            x: 0,
            rotate: dragging ? 5 : 0,
            scale: dragging ? 1.02 : 1,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FeedCard user={feed[currentIndex]} updateUserRequest={updateUserRequest} />
        </motion.div>
      ) : (
        <div className="text-white text-3xl">No more user. Wait for new users.</div>
      )}
    </div>
  )
}

export default Feed