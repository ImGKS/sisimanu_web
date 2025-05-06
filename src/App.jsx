import { Route, Routes, useNavigate } from "react-router"
import Body from "./Body"
import Login from "./pages/Login"
import Home from "./pages/Home"
import SignUp from "./pages/Signup"
import Feed from "./pages/Feed"
import { BASE_URL } from "./utils/urlConstant"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "./store/userSlice"
import { useEffect } from "react"
import Profile from "./pages/Profile"
import Connection from "./pages/Connection"
import Requests from "./pages/Requests"
import ViewProfileCard from "./components/ViewProfileCard"
import Chat from "./components/Chat"
import Premium from "./pages/Premium"
import { toast, ToastContainer } from "react-toastify"

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      })

      dispatch(addUser(res.data))
    } catch (error) {
      if(error.status === 401) {
        navigate("/login")
        toast.info('Please login to continue.')
      }
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchUser()
    }
  },[])

  return (
    <div  style={{background: "#833AB4 linear-gradient(90deg,rgba(131, 58, 180, 1) 8%, rgba(179, 66, 66, 1) 57%, rgba(99, 17, 17, 1) 100%)"}} >
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/viewProfile/:userId" element={<ViewProfileCard />} />
          <Route path="/chat/:userId" element={<Chat />} />
          <Route path="/premium" element={<Premium />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default App