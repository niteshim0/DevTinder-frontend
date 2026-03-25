import { BrowserRouter , Routes , Route } from "react-router-dom"
import { Login } from "./components/Login"
import { Profile } from "./components/Profile"
import { Body } from "./components/Body"
import { Feed } from "./components/Feed"
import { EditProfile } from "./components/EditProfile"
import { Connections } from "./components/Connections"
import { Requests } from "./components/Requests"
function App() {
  return (
    <>
     <BrowserRouter basename="/">
      <Routes>
        <Route path = "/" element = {<Body/>}>
            <Route path = "/login" element = {<Login/>}></Route>
            <Route path = "/profile" element = {<Profile/>}></Route>
            <Route path = "/feed" element = {<Feed/>}></Route>
            <Route path = "/editProfile" element = {<EditProfile/>}></Route>
            <Route path = "/connections" element = {<Connections/>}></Route>
            <Route path = "/requests" element = {<Requests/>}></Route>
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App