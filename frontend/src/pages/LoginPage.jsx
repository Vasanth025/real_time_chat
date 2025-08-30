import { Eye, EyeOffIcon, Loader2, Lock, Mail, MessageSquare } from 'lucide-react'
import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [showPass, setShowPass] = React.useState(false);
  const [formData,setFormData] = React.useState({
    email:"",
    password:""
  })
  const navigate = useNavigate();

  const handleSubmit =()=>{
    login(formData)
    navigate("/")

  }
  const {isLoggingIn, login} = useAuthStore();
  return (
    <div className='min-h-screen grid  lg:grid-cols-2'>
      {/*left side */}
      <div className='flex flex-col justify-center items-center gap-4 p-6 sm:p-12' >
        <div className=' w-full max-w-md space-y-8' >
        <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to our account</p>
            </div>
          </div>
          <form action={handleSubmit} className='space-y-6'>
            <div className="form-control">
              <label className="label" >
                <span className='label-text font-medium mb-0.5'>Email</span>
              </label>
              <div className='relative'>
                <div className=' absolute inset-y-0 left-0 pl-3 flex flex-row items-center pointer-events-none'>
                  <Mail className='size-5 z-10  text-base-content/40 ' />
                </div>
                  <input type="email"
                  className={`input input-bordered w-full pl-10`} 
                  placeholder='your@example.com'
                  onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
                  value={formData.email}
                  />
              </div>
            </div>
            <div className="form-control">
              <label className="label" >
                <span className='label-text font-medium mb-0.5'>Password</span>
              </label>
              <div className='relative'>
                <div className=' absolute inset-y-0 left-0 pl-3 flex flex-row items-center pointer-events-none'>
                  <Lock className='size-5 z-10  text-base-content/40 ' />
                </div>
                  <input 
                  type={showPass ? "text" : 'password'}
                  className={`input input-bordered w-full pl-10`} 
                  placeholder='*******'
                  onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
                  value={formData.password}
                  />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <EyeOffIcon className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary text-gray-950 w-full mt-2" disabled={isLoggingIn} >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create Account
              </Link>
            </p>
            </div>
        </div>
      </div>
      

      <AuthImagePattern 
      title="Join our community"
      subtitle="Connect with friends, share moments, and stay in touch with your loved ones." />

    </div>
  )
}

export default LoginPage