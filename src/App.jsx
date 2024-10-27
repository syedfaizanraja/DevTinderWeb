import Body from "./components/Body";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Connnections from "./components/Connections";
import Request from "./components/Request";

function App() {
  return (
    <>
      <Provider store={appStore}>
       <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element ={<Body/>}>
                <Route path="/" element = {<Feed/>}/>
                <Route path="/login" element = {<Login/>}/>
                <Route path="/profile" element = {<Profile/>}/>
                <Route path="/editProfile" element = {<EditProfile/>}/>
                <Route path="/connections" element = {<Connnections/>}/>
                <Route path="/requests" element = {<Request/>}/>
            </Route>
          </Routes>
       </BrowserRouter>
       </Provider>
    </>
  )
}

export default App
