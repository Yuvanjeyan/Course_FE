import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

import {
  getUsers,
  deleteUser,
} from "../services/adminService";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();

    setUsers(data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);

    fetchUsers();
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="bg-white p-6 rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Role
              </th>

              <th className="p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b"
              >
                <td className="p-3">
                  {user.name}
                </td>

                <td className="p-3">
                  {user.email}
                </td>

                <td className="p-3">
                  {user.role}
                </td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      handleDelete(user._id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;