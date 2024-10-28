import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/contansts";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector( (store) => store.user);

  const fetchProfile = async () => {
    if (userData) return ;
    try{
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    }
    catch(err){
      if(err.status === 401){
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect( ()=>{
   
    fetchProfile();
  }, [])

  return (
    <div>
      <NavBar />
      <Outlet />
       <Footer/> 
    </div>
  );
};

export default Body;
