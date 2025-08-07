import { useState } from "react";
import { useSelector } from "react-redux"
// import { useRef } from "react";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure,
  signOutUserStart, signOutUserSuccess, signOutUserFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { currentUser, loading, error } = useSelector(state => state.user);
  // const fileRef =  useRef(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);


  const handleChange = (e) => {
    setFormData(({ ...formData, [e.target.id]: e.target.value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }


  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');

      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }


  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-4">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* <input type="file" hidden ref={fileRef} accept="images/*" /> */}
          {/* <img onClick={()=> fileRef.current.click()} src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" /> */}
          <img src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
          <input type="text" defaultValue={currentUser.username} onChange={handleChange} className="p-3 bg-white rounded-lg shadow-lg focus:outline-none" placeholder="username" id="username" />
          <input type="email" defaultValue={currentUser.email} onChange={handleChange} className="p-3 bg-white rounded-lg shadow-lg focus:outline-none" placeholder="email" id="email" />
          <input type="password" defaultValue={currentUser.password} onChange={handleChange} className="p-3 bg-white rounded-lg shadow-lg focus:outline-none" placeholder="password" id="password" />
          <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-2.5 uppercase hover-opacity-95 disabled:opacity-80">
            {loading ? 'Loading...' : 'update'}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
        </div>
        <p className="text-red-700 mt-5">{error ? error : ''}</p>
        <p className="text-green-700 mt-5">{updateSuccess ? 'User is updated successfully!' : ''}</p>
      </div>
    </>
  )
}

export default Profile
