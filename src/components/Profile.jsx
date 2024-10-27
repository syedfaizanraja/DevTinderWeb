import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Profile = () => {
    const profileData = useSelector( (store) => store.user);
  return (
   profileData && ( <div className='my-20 flex justify-center h-[100%] '>
        <div className="card card-side bg-base-300 shadow-xl  w-[70%] mx-4">
            <figure>
                <img
                className='w-40 h-[100%]'
                src={profileData.photoUrl ? profileData.photoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                alt="Movie" />
            </figure>
            <div className="card-body items-center">
                <h1 className="card-title">{profileData.firstName + " " + profileData.lastName}</h1>
                <p>{profileData.description}</p>
                {profileData.age && profileData.gender && profileData.skills 
                && (<><p>{profileData.age}</p><p>{profileData.gender}</p><p>{profileData.skills}</p></> )}
                <div className="card-actions justify-center">
                <Link to= "/editProfile"> 
                <button className="btn btn-primary ">
                 Edit Profile
                </button>
                </Link>  
                </div>
            </div>
        </div>
    </div>)
  )
}

export default Profile