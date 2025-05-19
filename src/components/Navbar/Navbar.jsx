import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import { BASE_URL } from "../../utils/urlConstant"
import { removeUser } from "../../store/userSlice"
import { removeFeed } from "../../store/feedSlice"
import { useEffect, useRef, useState } from "react"
import  sisi  from "../../assets/sisi.svg"
import  batch  from "../../assets/tickmark.png"
import { toast } from "react-toastify"

export const Navbar = () => {

    const user = useSelector((state) => state?.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cardRef = useRef(null);

    const [email, setEmail] = useState('');
    const [searchedUser, setSearchedUser] = useState({})

    useEffect(() => {
        function handleClickOutside(event) {
          if (cardRef.current && !cardRef.current.contains(event.target)) {
            setSearchedUser(null);
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setSearchedUser]);

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL+ "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            dispatch(removeFeed());
            toast.success("Logout successsfully.")
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    const handleEmailSearch = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(
                `${BASE_URL}/profile/user/get/${email}`,
                {withCredentials: true}
              );
            setSearchedUser(res?.data?.data?.[0])
        } catch (error) {
            console.error(error)
        }
    }

    const handleSearchCard = (id) => {
        setSearchedUser(null)
        setEmail('')
        navigate("/viewProfile/"+id)
    }

    useEffect(()=>{
        if(user._id === searchedUser._id) {
            toast.info("Searched User is same as LoggedIn user.")
            setEmail('')
        }
    },[searchedUser._id])
    
    return (
        <div className="navbar h-16 bg-black/60 text-white flex items-center justify-between px-4 shadow-md">
            <Link to={user ? "/feed" : "/"} className="flex items-center text-xl font-bold"  >
                <img src={sisi} alt="logo" className="h-15 w-15 " style={{ filter: 'invert(100%) brightness(1.3) contrast(1.2)' }}/>
                <h1 className="m-0">Sisimanu</h1>
            </Link>
            {user &&
                <>
                    <div>
                        <form onSubmit={handleEmailSearch} className="flex">
                            <label className="input bg-transparent border border-white text-white flex items-center gap-2">
                                <svg
                                    className="h-[1em] opacity-50 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                    >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                    </g>
                                </svg>
                                <input
                                    value={email}
                                    type="search"
                                    required
                                    placeholder="Search by emailId"
                                    className="bg-transparent text-white placeholder-white outline-none"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <button className="cursor-pointer bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 mx-3">
                                Search
                            </button>
                        </form>
                        {searchedUser?.firstName &&                                
                            <div className="flex justify-center absolute z-50">
                                {searchedUser._id !== user._id &&
                                    <div className=" top-full mt-2 cursor-pointer"  ref={cardRef} 
                                        onClick={() => handleSearchCard(searchedUser?._id)}>
                                        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl border border-white/20 px-5 py-2 flex flex-col md:flex-row items-center gap-3">
                                        <img
                                            src={searchedUser?.profilePic || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"}
                                            alt="Profile"
                                            className="w-15 h-15 rounded-full object-cover border-4 border-white/30 shadow-md"
                                        />
                                
                                            <div className="text-white flex-1">
                                                <h1 className="text-xl font-semibold">{searchedUser?.firstName} {searchedUser?.lastName}</h1>
                                                <h2 className="text-lg text-white/70 mb-2">{searchedUser?.age}, {searchedUser?.gender}</h2>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    
                    <div className="flex items-center gap-2 relative">
                        <div className="dropdown dropdown-end flex items-center">
                            {user?.firstName && 
                                <h4 className="flex px-3"> Welcome,
                                    <span className=" flex font-bold">
                                        {user?.firstName}
                                        {user?.isPremium &&
                                            <img src={batch} alt="icon" className="h-7 w-7" />
                                        }
                                    </span>
                                </h4>
                            }
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Navbar component"
                                        src={ user ? user?.profilePic : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-50 w-52 p-2 backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl">
                                <li>
                                    <Link to={"/profile"} className="justify-between" onClick={() => document.activeElement.blur()}>Profile</Link>
                                </li>
                                <li>
                                    <Link to={"/connection"} className="justify-between" onClick={() => document.activeElement.blur()}>Connections</Link>
                                </li>
                                <li>
                                    <Link to={"/requests"} className="justify-between" onClick={() => document.activeElement.blur()}>Requests</Link>
                                </li>
                                <li>
                                    <Link to={"/premium"} className="justify-between" onClick={() => document.activeElement.blur()}>Premium</Link>
                                </li>
                                <li><Link onClick={async () => {
                                    document.activeElement.blur(),
                                    await handleLogout()
                                }}>Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </>
            }
      </div>
    )
}