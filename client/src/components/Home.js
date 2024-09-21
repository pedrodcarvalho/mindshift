import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const Home = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  let authSchema = {};
  isRegister
    ? (authSchema = z.object({
        username: z.string().min(3, 'Username must be at least 3 characters long'),
        email: z.string().email('Invalid e-mail address'),
        password: z.string().min(8, 'Password must be at least 8 characters long'),
      }))
    : (authSchema = z.object({
        email: z.string().email('Invalid e-mail address'),
        password: z.string().min(8, 'Password must be at least 8 characters long'),
      }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data) => {
    try {
      setFormError('');

      const url = isRegister ? `/auth/register` : `/auth/login`;
      const response = await axios.post(url, data);
      localStorage.removeItem('token');
      localStorage.setItem('token', response.data.token);

      if (isRegister) {
        setIsRegister(false);
        return;
      }

      navigate('/game');
    } catch (error) {
      setFormError(error.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">{isRegister ? 'Register' : 'Login'}</h2>
        {formError && <div className="mb-4 text-red-500 text-center">{formError}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          {isRegister && (
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="username"
                {...register('username')}
                className={`mt-1 block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500`}
              />
              {errors.username && <span className="text-red-500">{errors.username.message}</span>}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              {...register('email')}
              className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500`}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register('password')}
              className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500`}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-slate-600 hover:underline focus:outline-none"
              >
                {isRegister ? 'Already have an account?' : 'Create an account'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
