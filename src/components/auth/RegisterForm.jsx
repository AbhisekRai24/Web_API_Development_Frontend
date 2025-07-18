import React, { useState , useEffect  } from 'react';
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
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);

      // Update preview when profileImage changes
  useEffect(() => {
    if (!profileImage) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(profileImage);
    setPreview(objectUrl);

    // Cleanup the URL object when component unmounts or profileImage changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [profileImage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    for (const key in formData) {
      formPayload.append(key, formData[key]);
    }
    if (profileImage) {
      formPayload.append('profileImage', profileImage);
    }

    const response = await register(formPayload);
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

        {preview && (
            <img
                src={preview}
                alt="Profile Preview"
                className="mx-auto mb-4 w-24 h-24 rounded-full object-cover border border-gray-300"
            />
        )}

        <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 text-left mt-6"
        >
            <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleFileChange}
                className="px-3 py-2 border border-gray-300 rounded-md"
            />

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
);}


