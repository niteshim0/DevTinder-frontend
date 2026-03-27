import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../redux/slices/feedSlice";
import { useEffect, useState } from "react";
import { Card } from "./Card";

export const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);

  // Move to next card
  const nextCard = () => {
    setIndex((prev) => (feed.length ? (prev + 1) % feed.length : 0));
  };

  // Move to previous card
  const prevCard = () => {
    setIndex((prev) => (feed.length ? (prev - 1 + feed.length) % feed.length : 0));
  };

  // Fetch feed from backend
  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}feed`, { withCredentials: true });
      dispatch(addFeed(res.data));

      // random start index
      const randomIndex = Math.floor(Math.random() * res.data.length);
      setIndex(randomIndex);
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    }
  };

  useEffect(() => {
    if (!feed || feed.length === 0) getFeed();
  }, [feed]);

  // Optimistic removal handler
  const handleRemoveUser = (_id) => {
    // Adjust index if needed
    setIndex((prev) => (prev >= feed.length - 1 ? 0 : prev));

    // Remove from feed immediately
    dispatch(removeUserFromFeed(_id));
  };

  if (!feed || feed.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex justify-center">
      <div className="mt-30 mb-240">
        <Card
          user={feed[index]}
          handleRemove={handleRemoveUser}
        />

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