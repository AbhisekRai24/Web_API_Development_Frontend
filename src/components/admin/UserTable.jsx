// import React, { useState } from "react";
// import { useAdminUser, useDeleteUser } from "../../hooks/admin/useAdminUser";
// import DeleteModel from "../DeleteModel";
// import { Link } from "react-router-dom";

// export default function UserTable() {
//     const { users, error, isLoading, isError } = useAdminUser();
//     const [deleteId, setDeleteId] = useState(null);
//     const deleteUserMutation = useDeleteUser();

//     const handleConfirmDelete = () => {
//         deleteUserMutation.mutate(deleteId, {
//             onSuccess: () => {
//                 setDeleteId(null);
//             },
//             onError: (err) => {
//                 alert(err.message || "Failed to delete user");
//             },
//         });
//     };

//     return (
//         <div className="p-10 bg-gray-50 shadow-md rounded-xl">
//             <div className="flex items-center justify-between mb-10">
//                 <h2 className="text-2xl font-bold mb-6 text-gray-800">Users</h2>
//                 <Link to="/admin/user/create">
//                     <button className="bg-gray-600 text-white px-4 py-2 rounded-lg border border-green-500 hover:bg-blue-700 transition">
//                         Add User
//                     </button>
//                 </Link>
//             </div>

//             {isLoading && <p className="text-gray-500">Loading users...</p>}
//             {isError && <p className="text-red-500">Error: {error.message}</p>}

//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white rounded-lg shadow">
//                     <thead>
//                         <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                             <th className="py-3 px-6 text-left">Name</th>
//                             <th className="py-3 px-6 text-left">Email</th>
//                             <th className="py-3 px-6 text-left">Role</th>
//                             <th className="py-3 px-6 text-center">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-gray-600 text-sm font-light">
//                         {users.length === 0 && (
//                             <tr>
//                                 <td colSpan={4} className="text-center py-4">
//                                     No users found.
//                                 </td>
//                             </tr>
//                         )}
//                         {users.map((user) => (
//                             <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
//                                 <td className="py-3 px-6 text-left whitespace-nowrap font-semibold text-black">
//                                     {user.username}
//                                 </td>                                <td className="py-3 px-6 text-left font-semibold text-black">{user.email}</td>
//                                 <td className="py-3 px-6 text-left">{user.role}</td>
//                                 <td className="py-3 px-6 text-center">
//                                     <div className="flex item-center justify-center gap-4">
//                                         <Link to={`/admin/user/${user._id}`} className="text-blue-600 hover:underline">
//                                             View
//                                         </Link>
//                                         <Link to={`/admin/user/${user._id}/edit`} className="text-green-600 hover:underline">
//                                             Edit
//                                         </Link>
//                                         <button
//                                             onClick={() => setDeleteId(user._id)}
//                                             className="text-red-600 hover:underline"
//                                             disabled={deleteUserMutation.isLoading}
//                                         >
//                                             {deleteUserMutation.isLoading && deleteId === user._id ? "Deleting..." : "Delete"}
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Delete Modal */}
//             {deleteId && (
//                 <DeleteModel
//                     onClose={() => setDeleteId(null)}
//                     onConfirm={handleConfirmDelete}
//                     message="Are you sure you want to delete this user?"
//                 />
//             )}
//         </div>
//     );
// }
import React, { useState } from "react";
import { useAdminUser, useDeleteUser } from "../../hooks/admin/useAdminUser";
import DeleteModel from "../DeleteModel";
import { Link } from "react-router-dom";

export default function UserTable() {
    const { users, error, isLoading, isError } = useAdminUser();
    const [deleteId, setDeleteId] = useState(null);
    const deleteUserMutation = useDeleteUser();

    const handleConfirmDelete = () => {
        deleteUserMutation.mutate(deleteId, {
            onSuccess: () => {
                setDeleteId(null);
            },
            onError: (err) => {
                alert(err.message || "Failed to delete user");
            },
        });
    };

    return (
        <div className="p-6 bg-gray-50 shadow-md rounded-xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Users</h2>
                <Link to="/admin/user/create">
                    <button className="bg-[#A62123] text-white px-4 py-2 rounded-md hover:bg-red-500 transition">
                        Add User
                    </button>
                </Link>
            </div>

            {isLoading && <p className="text-gray-500">Loading users...</p>}
            {isError && <p className="text-red-500">Error: {error.message}</p>}

            {users.length === 0 ? (
                <p className="text-center text-gray-500">No users found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                    {users.map((user) => (
                        <div key={user._id} className="bg-gray-500 p-5 rounded-xl shadow hover:shadow-lg transition">
                            <div className="mb-2">
                                <h3 className="text-lg font-semibold text-white">{user.username}</h3>
                                <p className="text-sm font-medium text-white">{user.email}</p>
                                <p className="text-sm text-gray-500">Role: {user.role}</p>
                            </div>
                            <div className="flex justify-between mt-4 text-sm">
                                <Link
                                    to={`/admin/user/${user._id}`}
                                    className="bg-white text-blue-600 px-3 py-1 rounded-md text-center font-medium hover:bg-blue-50 transition hover:scale-105 transform transition-transform duration-200"
                                >
                                    View
                                </Link>
                                <Link
                                    to={`/admin/user/${user._id}/edit`}
                                    className="bg-white text-green-600 px-3 py-1 rounded-md font-medium hover:bg-green-50 transition hover:scale-105 transform transition-transform duration-200"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => setDeleteId(user._id)}
                                    className="text-red-600 hover:scale-105 transform transition-transform duration-200 "
                                    disabled={deleteUserMutation.isLoading}
                                >
                                    {deleteUserMutation.isLoading && deleteId === user._id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Modal */}
            {deleteId && (
                <DeleteModel
                    onClose={() => setDeleteId(null)}
                    onConfirm={handleConfirmDelete}
                    message="Are you sure you want to delete this user?"
                />
            )}
        </div>
    );
}
