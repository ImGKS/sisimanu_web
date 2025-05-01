import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import { BASE_URL } from "../../utils/urlConstant"
import { removeUser } from "../../store/userSlice"
import { removeFeed } from "../../store/feedSlice"

export const Navbar = () => {

    const user = useSelector((state) => state?.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = async () => {
        await axios.post(BASE_URL+ "/logout", {}, { withCredentials: true });
        dispatch(removeUser());
        dispatch(removeFeed());
        navigate("/")
    }
    
    return (
        <div className="navbar h-16 bg-black/60 text-white flex items-center justify-between px-4 shadow-md">
            <div className="flex-1">
                <Link to={user ? "/feed" : "/"} className="btn btn-ghost text-xl">TinderGO</Link>
            </div>
            <div className="flex gap-2">
            {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
            {user &&
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-30 w-52 p-2 backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl">
                        <li>
                            <Link to={"/profile"} className="justify-between" onClick={() => document.activeElement.blur()}>Profile</Link>
                        </li>
                        <li>
                            <Link to={"/connection"} className="justify-between" onClick={() => document.activeElement.blur()}>Connections</Link>
                        </li>
                        <li>
                            <Link to={"/requests"} className="justify-between" onClick={() => document.activeElement.blur()}>Requests</Link>
                        </li>
                        <li><Link onClick={async () => {
                            document.activeElement.blur(),
                            await handleLogout()
                        }}>Logout</Link></li>
                    </ul>
                </div>
            }
            </div>
      </div>
    )
}