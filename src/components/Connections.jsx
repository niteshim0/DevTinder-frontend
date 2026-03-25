import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/slices/connectionSlice";
import { useNavigate } from "react-router-dom";

export const Connections = () => {
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${BASE_URL}user/connections/accepted`,
                { withCredentials: true }
            );

            if(!connections) dispatch(addConnections(res?.data?.refinedData));
            setError(null);

        } catch (err) {
            if (err.response?.status === 401) {
                setError("Please login first");
            } else if (err.response?.status === 404) {
                setError("Connections not found");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        <div className="connections p-4 max-w-md mx-auto">

            <h2 className="text-center mb-4 text-xl font-semibold">
                Connections
            </h2>

            <button 
                onClick={fetchConnections}
                className="text-blue-500 text-sm mb-4"
            >
                Refresh
            </button>

            {loading && <p className="text-center">Loading...</p>}

            {error && <p className="text-red-500 text-center">{error}</p>}

            {!loading && !error && connections?.length === 0 && (
                <p className="text-center text-gray-500">
                    No connections found
                </p>
            )}

            {!loading && !error && connections?.length > 0 && (
                <div className="flex flex-col gap-4">
                    {connections.map((conn) => (
                        <div
                            key={conn._id}
                            onClick={() => navigate(`/chat/${conn._id}`)}
                            className="flex items-center gap-4 p-3 rounded-xl bg-gray-500 hover:bg-gray-600 transition cursor-pointer"
                        >
                            <div className="w-12 h-12">
                                <img
                                    src={
                                        conn?.profilePhoto ||
                                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    }
                                    alt="profile"
                                    className="w-full h-full object-cover rounded-full border"
                                />
                            </div>

                            <div>
                                <p className="font-semibold text-sm">
                                    {conn.name}
                                </p>
                                <p className="text-xs text-gray-900">
                                    {conn.experienceLevel}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};