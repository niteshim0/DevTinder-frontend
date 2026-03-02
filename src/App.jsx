function App() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-lg px-4">

        {/* LEFT SECTION */}
        <div className="navbar-start">

          {/* MOBILE MENU */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
            {/* Mobile menu need to figure out how it works. */}
            </ul>
          </div>

          {/* LOGO */}
          <a className="btn btn-ghost text-xl text-secondary hover:text-primary">DevConnect</a>
        </div>


        {/* RIGHT SECTION */}
        <div className="navbar-end gap-2">
           <ul className="menu menu-horizontal px-1">
             <li><a className="hover:text-primary">Explore</a></li>
             <li><a className="hover:text-primary">Projects</a></li>
          </ul>

          {/* Messages */}
          <button className="btn btn-ghost hover:btn-primary btn-circle text-lg">
            💬
          </button>

          {/* NOTIFICATION */}
          <button className="btn btn-ghost hover:btn-primary hover btn-circle text-lg">
            🔔
          </button>

          {/* PROFILE DROPDOWN */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost hover:btn-primary btn-circle text-lg">
              👤
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
            >
              <li><a>Profile</a></li>
              <li><a>My Projects</a></li>
              <li><a>Create Project</a></li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>

        </div>

      </div>
    </>
  )
}

export default App