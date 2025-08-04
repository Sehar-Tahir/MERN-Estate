
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { SignInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'

const SignIn = () => {

  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state) => state.user)

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(SignInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7"> Sign In </h1>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-5">
          <input type="email" className="p-3 bg-white rounded-lg shadow-lg focus:outline-none" id="email" placeholder="email"
            required onChange={handleChange} />
          <input type="password" className="p-3 bg-white rounded-lg shadow-lg focus:outline-none" id="password" placeholder="password"
            required onChange={handleChange} />
          <button disabled={loading} className="bg-slate-700 text-white p-2.5 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? 'Loading...' : 'Sign In'}</button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don&#39;t have an account?  </p>
          <Link to={"/sign-up"}><span className="text-blue-700"> Sign up</span></Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </>
  )
}

export default SignIn


