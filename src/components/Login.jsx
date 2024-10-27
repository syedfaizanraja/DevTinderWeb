import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contansts";


const Login = () => {

    const [emailId, setEmailId] = useState("Hafsha@gamil.com");
    const [password, setPassword] = useState("Hafsha@123");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const res = await axios.post(BASE_URL + "/login", {
            emailId,
            password,
        },{withCredentials: true});

        dispatch(addUser(res.data));
        return navigate("/");
    }
    catch(err){
        setError(err?.response?.data);
        console.log("Error :", err);
    }

    }

  return (
    <div className="flex justify-center my-7 ">
        <div className="card card-side bg-base-300 shadow-xl ">
            <figure>
                <img className="h-[100%]"
                src="https://tse4.mm.bing.net/th/id/OIP.jIa1rTb5r9NVzW3fjFypjQHaH7?w=171&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Login</h2>
                <div className="">
                  
                    <label className="input input-bordered flex items-center gap-2 m-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Email" 
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 m-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow"   value={password} onChange={(e) => setPassword(e.target.value)} 

                    />
                    </label>
                </div>
                <p className="text-red-500 py-2">{error}</p>
                <div className="card-actions justify-center">
                
        
                <button className="btn btn-primary px-6 py-2 " onClick={handleLogin} >Login</button>
              
                </div>
            </div>
        </div>

    </div>
  )
}

export default Login