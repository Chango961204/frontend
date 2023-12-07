import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import ReCaptcha from 'react-google-recaptcha';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errors: signInErrors } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordShown((prev) => !prev);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/add-product');
    } else {
      console.log("No está autenticado");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-md">
        {signInErrors.map((error, i) => (
          <div className="bg-red-500 p-2 -my-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="space-y-4">
          <h1 className="text-black text-3xl font-bold my-3 text-center">Iniciar Sesión</h1>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } text-black`} // Agrega la clase text-black
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {errors.email && <p className="text-red-500">Email requerido</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={passwordShown ? 'text' : 'password'}
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300 text-black" // Agrega la clase text-black
                placeholder="Contraseña"
                {...register('password', { required: true, minLength: 6 })}
              />
              {passwordShown ? (
                <IoEyeSharp
                  size={20}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoEyeOffSharp
                  size={20}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            {errors.password?.type === 'required' && (
              <p className="text-red-500">Contraseña requerida</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-500">Contraseña requerida mínimo 6 caracteres</p>
            )}
          </div>

          <ReCaptcha sitekey="6Le41iUpAAAAABikfLZu1Sa_vyswImk8cZ_WJBC5" onChange={(value) => setCaptchaValue(value)} />

          <button
            className="w-full bg-blue-500 text-white px-4 py-3 rounded-md focus:outline-none hover:bg-blue-600"
            type="submit"
            disabled={!captchaValue}
          >
            Iniciar Sesión <IoLogIn size={30} className="ml-1" />
          </button>
        </form>

        <p className="text-center text-sm mt-4 text to-blue-500">
          ¿No tienes una cuenta?{''}
          <Link to="/register" className="text-blue-500">
            ¡Crea una! <IoPersonAdd size={20} className="ml-1" />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
