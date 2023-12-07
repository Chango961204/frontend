import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoPersonAdd, IoLogIn } from 'react-icons/io5';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/products');
        }
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white max-w-md p-8 rounded-xl shadow-lg'>
                <h1 className='text-4xl font-bold mb-9 text-center text-gray-800'>Registro</h1>

                {registerErrors.length > 0 && (
                    <div className='bg-red-500 p-2 -my-2 text-white'>
                        {registerErrors.map((error, i) => (
                            <p key={i}>{error}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={onSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor='username' className='block text-lg font-medium text-gray-800'>
                            Username
                        </label>
                        <input
                            type='text'
                            className='w-full px-4 py-2 mt-1 rounded-md border focus:outline-none focus:border-sky-500 text-lg text-gray-800'
                            placeholder='Username'
                            {...register('username', { required: true, minLength: 5 })}
                        />
                        {errors.username?.type === 'required' && (
                            <p className='text-red-500 text-lg'>Username es requerido</p>
                        )}
                        {errors.username?.type === 'minLength' && (
                            <p className='text-red-500 text-lg'>Username tiene que contener almenos 5 caracteres</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor='email' className='block text-lg font-medium text-gray-700'>
                            Email
                        </label>
                        <input
                            type='email'
                            className='w-full px-4 py-2 mt-1 rounded-md border focus:outline-none focus:border-sky-500 text-lg text-gray-800'
                            placeholder='Email'
                            {...register('email', { required: true, minLength: 5 })}
                        />
                        {errors.email?.type === 'required' && <p className='text-red-500 text-lg'>Email es requerido</p>}
                    </div>

                    <div>
                        <label htmlFor='password' className='block text-lg font-medium text-gray-700'>
                            Password
                        </label>
                        <input
                            type='password'
                            className='w-full px-4 py-2 mt-1 rounded-md border focus:outline-none focus:border-sky-500 text-lg text-gray-800'
                            placeholder='Password'
                            {...register('password', { required: true, minLength: 6 })}
                        />
                        {errors.password?.type === 'required' && (
                            <p className='text-red-500 text-lg'>Password es requerido</p>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <p className='text-red-500 text-lg'> El Password debe de tener almenos 6 caracteres</p>
                        )}
                    </div>

                    <button className='w-full bg-sky-500 text-white py-3 rounded-md text-lg'>
                        <IoPersonAdd size={24} className='mr-2' />
                        Register
                    </button>
                </form>

                <p className='mt-4 text-center text-gray-600 text-lg'>
                    Ya tienes cuenta?{' '}
                    <Link to='/login' className='text-sky-500'>
                        Log in <IoLogIn size={24} className='ml-1' />
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
