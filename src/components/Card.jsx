export const Card = ({ user, preview = false }) => {

  if (!user) return null;

  return (
    <div className="card bg-base-100 w-96 shadow-xl">

      {/* PROFILE IMAGE */}
      <figure >
       <img
          src={user?.profilePhoto}
          alt={user?.name}
          className={`object-cover ${preview ? "h-32 w-32 rounded-full m-auto" : "h-60 w-full"}`}
        />
      </figure>

      {/* BODY */}
      <div className="card-body">

        <h2 className="card-title justify-center">{user?.name}</h2>

        {user?.bio && <p>{user?.bio}</p>}

        {preview && (
          <>
            <p>
              <span className="font-semibold">📈 :</span>{" "}
              {user?.experienceLevel}
            </p>

            <p>
              <span className="font-semibold">📍:</span>{" "}
              {user?.location}
            </p>

            <div>
              <span className="font-semibold">🛠:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {user?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-outline"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SWIPE BUTTONS ONLY WHEN NOT PREVIEW */}
        {!preview && (
          <div className="card-actions justify-center mt-4 gap-4">
            <button className="btn btn-primary">Left Swipe</button>
            <button className="btn btn-secondary">Right Swipe</button>
          </div>
        )}

      </div>
    </div>
  );
};