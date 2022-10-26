import { useForm, Resolver } from 'react-hook-form';

type LoginFormValues = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<LoginFormValues>();
  return (
    <div className="py-[4em]">
      <div className="relative max-w-[768px] mx-auto bg-slate-100 p-8 rounded-[5px] lgmx:max-w-full lgmx:w-[90%] lgmx:py-4 lgmx:px-8">
        <div className="w-full p-5">
          <div className="max-w-md">
            <h4 className="text-3xl font-bold">Log In</h4>
          </div>
        </div>

        <form className="relative p-5" onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="flex flex-col items-start mb-4">
            <label className="mb-2">Email</label>
            <input
              {...register('email', {
                required: 'Email Address is required',
                pattern: {
                  value: /\w+\.*@\w+\.\w{2,3}$/gim,
                  message: 'The input is not a valid email'
                }
              })}
              type="text"
              placeholder="Email"
              aria-invalid={errors.email ? 'true' : 'false'}
              className={`w-full h-10 pl-4 rounded-md ${
                errors.email
                  ? 'border-solid border-2 border-red-600'
                  : 'border-solid border-2 border-slate-200'
              }`}
              autoComplete="off"
            />
            {errors.email && <p className="mt-2 text-red-600">{errors.email?.message}</p>}
          </div>
          <div className="flex flex-col items-start mb-4">
            <label className="mb-2">Password</label>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              placeholder="Password"
              className={`w-full h-10 pl-4 rounded-md ${
                errors.password
                  ? 'border-solid border-2 border-red-600'
                  : 'border-solid border-2 border-slate-200'
              }`}
            />
            {errors.password && <p className="mt-2 text-red-600">{errors.password?.message}</p>}
          </div>

          <div className="text-center">
            <button type="submit" className="w-full my-4 p-3 bg-amber-900 text-white">
              Login
            </button>
          </div>

          <div className="text-center p3-regular-14 mb-4 mt-7">
            <p>
              Don&#39;t have an account?
              <a href="/signup">
                <span className="ml-1 info underline cursor-pointer">Sign Up</span>
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
