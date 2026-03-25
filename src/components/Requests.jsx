import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../redux/slices/requestSlice";

export const Requests = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [isError, setIsError] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}user/requests/pending`,
        { withCredentials: true }
      );

      const data = res?.data?.pendingRequests || [];
      dispatch(addRequest(data)); 

      setError(null);

    } catch (err) {
      const msg =
        err.response?.status === 401
          ? "Please login first"
          : err.response?.status === 404
          ? "Requests not found"
          : "Something went wrong";

      setError(msg);

      setIsError(true);
      setToastMsg(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

 
  const handleAction = async (id, type) => {
    if (actionLoading) return;

    try {
      setActionLoading(id);

      await axios.post(
        `${BASE_URL}request/review/${type}/${id}`,
        {},
        { withCredentials: true }
      );

      const updated = requests.filter((r) => r._id !== id);
      dispatch(addRequest(updated)); 

      setIsError(false);
      setToastMsg(
        type === "accepted"
          ? "Request accepted ✅"
          : "Request rejected ❌"
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);

    } catch (err) {
      const msg = "Action failed, try again";

      setError(msg);
      setIsError(true);
      setToastMsg(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);

    } finally {
      setActionLoading(null);
    }
  };

  return (
    <>
      
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div
            className={`alert ${
              isError ? "alert-error" : "alert-success"
            }`}
          >
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      <div className="p-4 max-w-md mx-auto">

        <h2 className="text-center mb-4 text-xl font-semibold">
          Requests
        </h2>

        {/* Refresh */}
        <button
          onClick={fetchRequests}
          className="text-blue-500 text-sm mb-4"
        >
          Refresh
        </button>

        {/* Loading */}
        {loading && (
          <p className="text-center">Loading...</p>
        )}

        {/* Error */}
        {error && !showToast && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {/* Empty */}
        {!loading && !error && requests?.length === 0 && (
          <p className="text-center text-gray-500">
            No requests found
          </p>
        )}

        {/* List */}
        {!loading && !error && requests?.length > 0 && (
          <div className="flex flex-col gap-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className = "flex items-center justify-between gap-6 p-4 rounded-2xl bg-gray-700 hover:bg-gray-600 transition shadow-md"
              >
                {/* Profile */}
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12">
                    <img
                      src={
                        request?.senderId?.profilePhoto ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="profile"
                      className="w-full h-full object-cover rounded-full border"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-base text-white">
  {request?.senderId?.name || "Unknown User"}
</p>

<p className="text-sm text-gray-300">
  {request?.senderId?.experienceLevel || "N/A"}
</p>

<p className="text-xs text-gray-400 max-w-xs truncate">
  {request?.senderId?.bio || "No bio available"}
</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleAction(request._id, "accepted")
                    }
                    disabled={actionLoading === request._id}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                  >
                    {actionLoading === request._id
                      ? "..."
                      : "Accept"}
                  </button>

                  <button
                    onClick={() =>
                      handleAction(request._id, "rejected")
                    }
                    disabled={actionLoading === request._id}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                  >
                    {actionLoading === request._id
                      ? "..."
                      : "Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};