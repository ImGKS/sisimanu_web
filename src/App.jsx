import { Route, Routes } from "react-router"
import Body from "./Body"
import Login from "./pages/Login"
import Home from "./pages/Home"
import SignUp from "./pages/Signup"
import Feed from "./pages/Feed"

function App() {
  return (
    <div  style={{background: "#833AB4 linear-gradient(90deg,rgba(131, 58, 180, 1) 8%, rgba(179, 66, 66, 1) 57%, rgba(99, 17, 17, 1) 100%)"}} >
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App