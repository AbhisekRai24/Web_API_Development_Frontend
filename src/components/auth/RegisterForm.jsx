import React, { useState } from 'react';
import { useRegisterUser } from '../../hooks/useRegisterUser';
import logo from '../../assets/images/logo.png';

export default function RegisterForm() {
    const { register, isLoading, data, error } = useRegisterUser();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await register(formData);
        if (response) {
            console.log('User registered:', response);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 text-center">
            {/* Logo */}
            <img
                src={logo}
                alt="Logo"
                className="mx-auto mb-6 w-32 h-auto"
            />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 text-left mt-6"
            >
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 border border-gray-300 rounded-md"
                />
    <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>

                {error && <p className="text-red-500">Error: {error.message}</p>}
                {data && <p className="text-green-500">Registration successful!</p>}
            </form>
        </div>
    );
}

