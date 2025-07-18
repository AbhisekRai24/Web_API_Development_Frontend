import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../auth/AuthProvider"
import { useUser, useUpdateUser } from "../../hooks/useLoginUser"
import { getBackendImageUrl } from "../../utils/backend-image"

export default function UserProfile() {
  const { user, setUser } = useContext(AuthContext)
  const { data: currentUser } = useUser(user._id)
  const { mutateAsync: updateUser } = useUpdateUser(user._id)

  const [form, setForm] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    profileImage: null,
  })

  useEffect(() => {
    if (currentUser) {
      setForm({
        username: currentUser.username || "",
        email: currentUser.email || "",
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        profileImage: currentUser.profileImage || null,
      })
    }
  }, [currentUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setForm((prev) => ({ ...prev, profileImage: file }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Prepare FormData for multipart upload
      const formData = new FormData()
      formData.append("username", form.username)
      formData.append("email", form.email)
      formData.append("firstName", form.firstName)
      formData.append("lastName", form.lastName)
      if (form.profileImage instanceof File) {
        formData.append("profileImage", form.profileImage)
      }

      const updatedUser = await updateUser(formData)
      setUser(updatedUser) // update context with new data
      alert("Profile updated successfully!")
    } catch (err) {
      alert(err.message || "Update failed")
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white dark:bg-[#1F1F1F] rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-[#B94E2E]">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
        />

        <div>
          <input type="file" onChange={handleFileChange} />
          {typeof form.profileImage === "string" && (
            <img
              src={getBackendImageUrl(form.profileImage)}
              alt="Profile"
              className="h-16 w-16 rounded-full mt-2 object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-[#B94E2E] text-white px-4 py-2 rounded hover:bg-[#922C1D]"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
