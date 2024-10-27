import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/contansts';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const dispatch = useDispatch();
    const connection = useSelector( (store) => store.connection);
    const getConnections = async () =>{
        try{
            const res = await axios.get(BASE_URL + "/user/connections" , {withCredentials :true});
            dispatch(addConnections(res?.data?.data));
        }
        catch(err){
            console.error(err);
        }
    };

    useEffect( () => {
        getConnections();
    }, []);
    if(!connection)  return;
    if(connection.length === 0) return <h1>No connections to show</h1>
  return (
    <div className=' text-center ' >
        <h1 className=' text-2xl my-3'>Connections</h1>
        {connection.map( (con) => {
            console.log(con);
            
         return (
        <div className=' flex justify-center ' key={con._id}>
         <div className="card bg-base-300 w-96 shadow-xl   my-4 " >
            <div className="card-body flex  " key={con._id}>
            <div className="avatar">
                <div className="mask mask-hexagon w-24">
                    <img src={ con.photoUrl ? con.photoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
            </div>
            </div>
              <h2 className="card-title">{con.firstName + " " + con.lastName}</h2>
              <p className=' text-left'>{con.description}</p>
              <div className="card-actions justify-start">
                <button className="btn btn-primary ">Start Conversation</button>
              </div>
            </div>
          </div>
          </div>
          )
        })}
    </div>
  )
}

export default Connections;