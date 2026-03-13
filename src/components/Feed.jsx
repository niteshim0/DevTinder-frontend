import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/slices/feedSlice";
import { useEffect, useState } from "react";
import {Card} from "./Card";

export const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % feed.length);
  };

  const prevCard = () => {
    setIndex((prev) => (prev - 1 + feed.length) % feed.length);
  };

  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data));

      // random start index
      const randomIndex = Math.floor(Math.random() * res.data.length);
      setIndex(randomIndex);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!feed || feed.length === 0) {
      getFeed();
    }
  }, []);

  if (!feed || feed.length === 0) return <div>Loading...</div>;
  return (
  <div className="flex justify-center">
    <div className="mt-30 mb-240">
      <Card {...feed[index]} />

      <div className="flex justify-center gap-6 mt-4">
        <button
          className="text-secondary hover:text-primary"
          onClick={prevCard}
        >
          Prev
        </button>

        <button
          className="text-secondary hover:text-primary"
          onClick={nextCard}
        >
          Next
        </button>
      </div>

    </div>
  </div>
);
};