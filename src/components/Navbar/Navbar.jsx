import { useSelector } from "react-redux"

export const Navbar = () => {

    const user = useSelector((state) => state?.user)
    
    return (
        <div className="navbar h-16 bg-black/60 text-white flex items-center justify-between px-4 shadow-md">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">TinderGO</a>
            </div>
            <div className="flex gap-2">
            {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
                <div className="dropdown dropdown-end flex items-center">
                    {user?.firstName && 
                        <h4 className="px-3">Welcome,
                            <span className="font-bold"> {user?.firstName}</span>
                        </h4>
                    }
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={ user ? user?.profilePic : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl">
                        <li>
                            <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
      </div>
    )
}