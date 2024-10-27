import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/contansts';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';

const Request = () => {

    const dispatch = useDispatch();
    const requests = useSelector( (store) => store.request);
    const getRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials:true});
            
            dispatch(addRequests(res?.data?.connectionRequest));
        }
        catch(err){
            console.error(err);
        }
    };

    useEffect( () => {
        getRequests();
    }, []);
if(!requests)  return;
if(requests.length === 0) return <h1>No Connection Request found</h1>
return (
    <div className=' text-center ' >
        <h1 className=' text-2xl my-3'>Connection Requests</h1>
        {requests.map( (req) => {
           
     return (
        <div className=' flex justify-center items-center' key={req?.fromUserId?._id}>
         <div className="card bg-base-300 w-96 shadow-xl   my-4 " >
            <div className="card-body flex  " key={req?.fromUserId?._id}>
            <div className="avatar">
                <div className="mask mask-hexagon w-24">
                    <img src={ req?.fromUserId?.photoUrl ? req?.fromUserId?.photoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
            </div>
            </div>
              <h2 className="card-title">{req?.fromUserId?.firstName + " " + req?.fromUserId?.lastName}</h2>
              <p className=' text-left'>{req?.fromUserId?.description}</p>
              <div className="card-actions justify-start">
                <button className="btn btn-primary ">Reject </button>
                <button className="btn btn-primary ">Accept</button>
              </div>
            </div>
          </div>
          </div>
          )
        })}
    </div>
  );
}

export default Request