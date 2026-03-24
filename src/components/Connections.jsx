import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

export const Connections = () => {
    
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchConnections = async () => {
        try {
            setLoading(true);

            const res = await axios.get(`${BASE_URL}user/connections/accepted`,{
              withCredentials : true
            });

            console.log(res.data.refinedData); // ✅ correct log

            setConnections(res.data.refinedData); // ✅ FIXED
            setError(null);

        } catch (err) {
            console.log(err);

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
    
    <h2 className="text-center mb-6 text-xl font-semibold">Connections</h2>

    {loading && <p className="text-center">Loading connections...</p>}

    {error && <p className="text-red-500 text-center">{error}</p>}

    {!loading && !error && connections.length === 0 && (
        <p className="text-center text-gray-500">No connections found</p>
    )}

    {!loading && !error && connections.length > 0 && (
        <div className="flex flex-col gap-4">
            {connections.map((conn) => (
                <div
                    key={conn._id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-600 transition cursor-pointer"
                >
                    {/* Profile Image */}
                    <div className="w-12 h-12">
                        <img
                            src={conn?.profilePhoto || "https://www.freepik.com/free-vector/blue-circle-with-white-user_145857007.htm#fromView=keyword&page=1&position=0&uuid=89ea9382-298f-45e4-b1be-1754ee0c6fc2&query=Blank+profile"}
                            alt="profile"
                            className="w-full h-full object-cover rounded-full border"
                        />
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col">
                        <p className="font-semibold text-sm">{conn.name}</p>
                        <p className="text-xs text-gray-500">
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