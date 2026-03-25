import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../redux/slices/requestSlice";

export const Requests = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  // ✅ Fetch Requests
  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}user/requests/pending`,
        { withCredentials: true }
      );

      const data = res?.data?.refinedData || [];

      // ✅ always sync redux
      dispatch(addRequest(data));

      setError(null);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Please login first");
      } else if (err.response?.status === 404) {
        setError("Requests not found");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Accept Request
  const acceptHandler = async (id) => {
    try {
      await axios.post(
        `${BASE_URL}request/review/accepted/${id}`,
        {},
        { withCredentials: true }
      );

      // ✅ update UI instantly
      const updated = requests.filter((r) => r._id !== id);
      dispatch(addRequest(updated));
    } catch (err) {
      console.error("Accept failed:", err);
    }
  };

  // ✅ Reject Request
  const rejectHandler = async (id) => {
    try {
      await axios.post(
        `${BASE_URL}request/review/rejected/${id}`,
        {},
        { withCredentials: true }
      );

      const updated = requests.filter((r) => r._id !== id);
      dispatch(addRequest(updated));
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  return (
    <div className="connections p-4 max-w-md mx-auto">
      <h2 className="text-center mb-4 text-xl font-semibold">
        Requests
      </h2>

      {loading && <p className="text-center">Loading...</p>}

      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}

      {!loading && !error && requests?.length === 0 && (
        <p className="text-center text-gray-500">
          No requests found
        </p>
      )}

      {!loading && !error && requests?.length > 0 && (
        <div className="flex flex-col gap-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="flex items-center justify-between gap-4 p-3 rounded-xl bg-gray-500 hover:bg-gray-600 transition"
            >
              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12">
                  <img
                    src={
                      request?.profilePhoto ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="profile"
                    className="w-full h-full object-cover rounded-full border"
                  />
                </div>

                <div>
                  <p className="font-semibold text-sm">
                    {request.name}
                  </p>
                  <p className="text-xs text-gray-900">
                    {request.experienceLevel}
                  </p>
                  <p className="text-xs text-gray-900">
                    {request.bio || "Bio missing!"}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => acceptHandler(request._id)}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Accept
                </button>

                <button
                  onClick={() => rejectHandler(request._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};