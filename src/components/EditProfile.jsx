import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/contansts';
import { addUser } from '../utils/userSlice';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [firstName , setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [description, setDescription] = useState(user?.description || "");
    const [photoUrl , setPhotoUrl] = useState(user?.photoUrl || "");
    const [error, setError] = useState("");

    const saveProfile = async () =>{
        setError(""); // clear the errors
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,age,gender,description,photoUrl
            }, {withCredentials:true});
            dispatch(addUser(res?.data?.data));
            toast.success("Profile updated Successfully");
           setTimeout( () => {
            navigate("/profile");
           }, 3000) ;
        }
        catch(err){
            setError(err?.response?.data);
            console.error(err);
        }
    }
   
    useEffect( () => {
        if(user?.firstName){
            setFirstName(user.firstName);
        }
        if(user?.lastName){
            setLastName(user.lastName);
        }
        if(user?.age){
            setAge(user.age);
        }
        if(user?.gender){
            setGender(user.gender);
        }
        if(user?.description){
            setDescription(user.description);
        }
        if(user?.photoUrl){
            setPhotoUrl(user.photoUrl);
        }
        
    }, [user]) ; // this will run for once and will sync redux with local state variables
    
  return (
    <div className='flex justify-center my-10 '>
    <div className="flex justify-center mx-4 ">
        <div className="card card-side bg-base-300 shadow-xl px-5 ">
            <div className="card-body">
                <h2 className="card-title flex justify-center">Edit Profile</h2>
                <div className="">      
                <label className="input input-bordered flex items-center gap-2 my-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" value={firstName} placeholder="FirstName"
                    onChange={ (e) => setFirstName(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" value={lastName} placeholder="LastName" 
                    onChange={(e) => setLastName(e.target.value)}/>
                </label>
                <label className="input input-bordered flex items-center gap-2 my-4">
                    <input type="text" className="grow" value={age} placeholder="Age" 
                    onChange={(e) => setAge(e.target.value)}/>
                </label>
                <label className="input input-bordered flex items-center gap-2 my-4">
                    <input type="text" className="grow" value={gender} placeholder="Gender" 
                    onChange={(e) => setGender(e.target.value)}/>
                </label>
                <textarea className="textarea textarea-bordered" placeholder="About" value={description}   onChange={(e) => setDescription(e.target.value)} ></textarea>
                <label className="input input-bordered flex items-center gap-2 my-4">
                    <input type="Textarea" className="grow" value={photoUrl} placeholder="PhotoUrl" 
                    onChange={(e) => setPhotoUrl(e.target.value)}/>
                </label>
                                    
                </div>  
                <p className='text-red-500'>{error}</p>
                <div className="card-actions justify-center">
                <button className="btn btn-primary px-6 py-2 "  onClick={saveProfile}>Save Profile</button>
                <ToastContainer/>
                </div>
            </div>
        </div>
    </div>
    <div className='flex justify-center '>

    <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body items-center text-center ">
            <h2 className="card-title">Preview!</h2>
            <UserCard user= {{firstName ,lastName, age, gender,photoUrl, description }}/>
        </div>
        </div>
       
    </div>
    </div>
  )
}

export default EditProfile