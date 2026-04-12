import { useDispatch, useSelector } from "react-redux";
import {
  removeUserFromFeed,
  insertUserAtIndex,
} from "../redux/slices/feedSlice";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";

export const Card = ({ user, preview = false }) => {
  const { _id } = user || {};
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSwipes = async (status) => {
    if (loading) return;

    const backupUser = user;
    const index = feed.findIndex((u) => u._id === _id);

    // ✅ Optimistic remove
    dispatch(removeUserFromFeed(_id));
    setLoading(true);

    try {
      await axios.post(
        `${BASE_URL}request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      setError(null);

    } catch (err) {
      // ❌ rollback at same position
      dispatch(insertUserAtIndex({ user: backupUser, index }));

      setError(
        err.response?.status === 401
          ? "Please login first"
          : err.response?.status === 404
          ? "Connections not found"
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <motion.div
      className="card bg-base-100 w-96 shadow-xl"
      drag={!preview ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(event, info) => {
        if (preview || loading) return;

        if (info.offset.x > 120) {
          handleSwipes("interested"); // 👉 Right swipe
        } else if (info.offset.x < -120) {
          handleSwipes("ignored"); // 👉 Left swipe
        }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* IMAGE */}
      <figure>
        <img
          src={user?.profilePhoto}
          alt={user?.name}
          className={`object-cover ${
            preview
              ? "h-32 w-32 rounded-full m-auto"
              : "h-60 w-full"
          }`}
        />
      </figure>

      {/* BODY */}
      <div className="card-body">
        <h2 className="card-title justify-center">
          {user?.name}
        </h2>

        {user?.bio && <p>{user?.bio}</p>}

        {preview && (
          <>
            <p><b>📈:</b> {user?.experienceLevel}</p>
            <p><b>📍:</b> {user?.location}</p>

            <div>
              <b>🛠:</b>
              <div className="flex flex-wrap gap-2 mt-1">
                {user?.skills?.map((skill, i) => (
                  <span key={i} className="badge badge-outline">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* BUTTONS */}
        {!preview && (
          <div className="card-actions justify-center mt-4 gap-4">
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={() => handleSwipes("ignored")}
            >
              ⬅️ Left
            </button>

            <button
              className="btn btn-secondary"
              disabled={loading}
              onClick={() => handleSwipes("interested")}
            >
              ➡️ Right
            </button>
          </div>
        )}

        {loading && (
          <p className="text-blue-500 text-center">Processing...</p>
        )}

        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}
      </div>
    </motion.div>
  );
};