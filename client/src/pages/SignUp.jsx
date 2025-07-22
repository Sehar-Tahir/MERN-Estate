import {Link} from 'react-router-dom'

const SignUp = () => {
  return (
    <>
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7"> Sign Up </h1>
      <form className=" flex flex-col gap-5">
        <input type="text" className="p-3 bg-white rounded-lg shadow-lg focus:outline-none" id="username" placeholder="username" required />
        <input type="email" className="p-3 bg-white rounded-lg shadow-lg focus:outline-none" id="email" placeholder="email" required />
        <input type="password" className="p-3 bg-white rounded-lg shadow-lg focus:outline-none" id="password" placeholder="password" required />
        <button className="bg-slate-700 text-white p-2.5 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign Up</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?
          <Link to={"/sign-in"}><span className="text-blue-700"> Sign in</span></Link>
        </p>
      </div>
      </div>
    </>
  )
}

export default SignUp
