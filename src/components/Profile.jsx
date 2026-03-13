import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Profile = () => {
  const user = useSelector((store) => store.user);


  return (
    <div className="flex flex-col items-center mt-20 mb-20 gap-10">

      {/* TOP SECTION */}
      <div className="flex gap-10 flex-wrap justify-center">

        {/* LEFT CARD */}
        <div className="card w-96 bg-base-200 shadow-2xl border border-base-300 hover:-translate-y-1 hover:shadow-blue-500/20 transition-all duration-300 p-6 items-center text-center">

          <div className="avatar">
            <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.profilePhoto} alt="profile" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-4 text-primary">
            {user?.name}
          </h2>

          <p className="text-base-content/70 mt-2">
            {user?.bio}
          </p>
          
          <div className="mt-4 flex justify-center gap-6">
          <p className="mt-4 badge badge-primary badge-lg">
            Connections: {user?.connections?.length || 0}
          </p>
          <p className="mt-4 badge badge-primary badge-lg">
            <Link to="/editProfile">Edit Profile</Link>
          </p>
          </div>

        </div>

        {/* RIGHT CARD */}
        <div className="card w-96 bg-base-200 shadow-2xl border border-base-300 hover:-translate-y-1 hover:shadow-purple-500/20 transition-all duration-300 p-6">

          <h2 className="text-xl font-bold mb-4 text-center text-primary">
            Details
          </h2>

          <div className="space-y-2">

            <p>
              <span className="font-semibold text-primary">
                🎓 : 
              </span>{" "}
              MMMUT Gorakhpur
            </p>

            <p>
              <span className="font-semibold text-primary">
                📍
              </span>{" "}
              {user?.location} 
            </p>

            <p>
              <span className="font-semibold text-primary">
                🐙 : 
              </span>{" "}
              <a
                href="https://github.com/niteshim0"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                github.com/niteshim0
              </a>
            </p>

            <p>
              <span className="font-semibold text-primary">
                🔗 : 
              </span>{" "}
              <a
                href="https://www.linkedin.com/in/niteshim111/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                linkedin.com/in/niteshim111
              </a>
            </p>

            <p>
              <span className="font-semibold text-primary">
                🌐 : 
              </span>{" "}
              <span className="text-blue-400 hover:underline cursor-pointer">
                Portfolio
              </span>
            </p>

          </div>
        </div>
      </div>

      {/* PROJECTS SECTION */}
      <div className="card w-[832px] bg-base-200 shadow-2xl border border-base-300 hover:shadow-indigo-500/20 transition-all p-6">

        <h2 className="text-xl font-bold mb-6 text-center text-primary">
          Projects
        </h2>

        <div className="grid md:grid-cols-1 gap-6">

          {/* Static Projects */}

          <div className="border border-base-300 rounded-xl p-4 hover:bg-base-300/40 transition-all">
            <h3 className="font-bold text-lg">1. ShopWave</h3>

            <p className="text-base-content/70 mt-1">
              Project Description
            </p>

            <div className="flex gap-3 mt-3">
              <p className="btn btn-sm btn-outline">Code</p>
              <p className="btn btn-sm btn-primary">Live</p>
            </div>
          </div>

          <div className="border border-base-300 rounded-xl p-4 hover:bg-base-300/40 transition-all">
            <h3 className="font-bold text-lg">
              2. WhatsApp Chat Analyzer
            </h3>

            <p className="text-base-content/70 mt-1">
              Project Description
            </p>

            <div className="flex gap-3 mt-3">
              <p className="btn btn-sm btn-outline">Code</p>
              <p className="btn btn-sm btn-primary">Live</p>
            </div>
          </div>

          <div className="border border-base-300 rounded-xl p-4 hover:bg-base-300/40 transition-all">
            <h3 className="font-bold text-lg">3. DevConnect</h3>

            <p className="text-base-content/70 mt-1">
              Project Description
            </p>

            <div className="flex gap-3 mt-3">
              <p className="btn btn-sm btn-outline">Code</p>
              <p className="btn btn-sm btn-primary">Live</p>
            </div>
          </div>


          {/* Dynamic Projects */}

          {user?.projects?.map((project, index) => (
            <div
              key={index}
              className="border border-base-300 rounded-xl p-4 hover:bg-base-300/40 transition-all"
            >
              <h3 className="font-bold text-lg">
                {project.name}
              </h3>

              <p className="text-base-content/70 mt-1">
                {project.description}
              </p>

              <div className="flex gap-3 mt-3">

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline"
                  >
                    Code
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    Live
                  </a>
                )}

              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};