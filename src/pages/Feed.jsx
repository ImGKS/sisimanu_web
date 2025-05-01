import React, { useEffect, useState } from 'react'
import FeedCard from '../components/FeedCard'
import axios from 'axios'
import { BASE_URL } from '../utils/urlConstant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../store/feedSlice'
import { motion } from "framer-motion";

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handleSwipe = (direction) => {
    console.log(direction === "right" ? "Interested" : "Ignore");
    setCurrentIndex((prev) => (prev < feed.length - 1 ? prev + 1 : prev));
  };

  const getFeed = async () => {
    if (feed) return
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

  return (
    <div className="min-h-fit flex justify-center items-center">
      {feed?.[currentIndex] ? (
        <motion.div
          className="absolute w-80"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setDragging(true)}
          onDragEnd={(e, info) => {
            setDragging(false);
            if (info.offset.x > 100) {
              handleSwipe("right");
            } else if (info.offset.x < -100) {
              handleSwipe("left");
            }
          }}
          animate={{
            x: 0,
            rotate: dragging ? 5 : 0,
            scale: dragging ? 1.02 : 1,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FeedCard user={feed[currentIndex]} />
        </motion.div>
      ) : (
        <div className="text-white text-xl">No more cards</div>
      )}
    </div>
     
  )
}

export default Feed