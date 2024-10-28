import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/contansts';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const {_id, firstName, photoUrl, description , age, gender, skills} = user;
    const dispatch = useDispatch();

    const handleSendRequests = async (status, userId) =>{
        try{
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials:true});
            dispatch(removeFeed(userId));
        }
        catch(err){
            console.error(err);
        }
    };


  return (
    <div className=''>
     <div className="card bg-base-300 w-96 shadow-xl">
        <figure className=''>
            <img 
            className=' h-auto'
            src={photoUrl ? photoUrl :"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
            alt="profilePhoto" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName}</h2>
            <p>{description}</p>
            {age && gender && <p> {age + ", " + gender}</p>}
            <p>{skills}</p>
            <div className="card-actions justify-center">
            <button className="btn btn-error" onClick={() => handleSendRequests("ignored", _id )}>Ignored</button>
            <button className="btn btn-primary" onClick={() => handleSendRequests("interested", _id )}>Interested</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default UserCard