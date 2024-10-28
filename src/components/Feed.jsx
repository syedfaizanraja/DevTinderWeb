import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/contansts";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";


const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector( (store) => store.feed);

   
      const fetchFeed = async () =>{
        if(feedData) return ;
        try {
          const res = await axios.get(BASE_URL + "/feed",  {withCredentials: true});
          dispatch(addFeed(res?.data?.users));
        
          
        }
        catch(Err){
          console.error(Err);
        }

    }
  
 useEffect( () => {
      fetchFeed();
    }, []);

    if(!feedData) return;
    if(feedData.length <= 0) return <h1 className=" text-center text-2xl my-3">No Feed to Show</h1>
  return (
    feedData && (
    <div className="flex justify-center my-10">
        <UserCard user = {feedData[0]} key={feedData._id}/>
      </div>
      )
  )
}

export default Feed