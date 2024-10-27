import React from 'react'

const UserCard = ({user}) => {
    const {firstName, photoUrl, description , age, gender, skills} = user;
  return (
    <div className=''>
     <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
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
            <button className="btn btn-error">Ignored</button>
            <button className="btn btn-primary">Interested</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default UserCard