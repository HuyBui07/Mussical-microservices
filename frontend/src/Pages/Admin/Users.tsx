import React from "react";

const User = () => {
  // Sample user data
  const userData = [
    {
      id: 1,
      name: "Nguyễn Hoàng Minh",
      email: "minh.nguyen@example.com",
      role: "admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Bùi Gia Huy",
      email: "huy.bui@example.com",
      role: "client",
      status: "Unknown",
    },
    {
      id: 3,
      name: "Hồ Trung Hưng",
      email: "hung.ho@example.com",
      role: "admin",
      status: "Active",
    },
    // Add more user data as needed
  ];

  // Function to handle edit action
  const handleEdit = () => {
    console.log("Edit clicked");
  };

  // Function to handle delete action
  const handleDelete = () => {
    console.log("Delete clicked");
  };

  return (
    <div className="m-2 ml-4 bg-zinc-800 h-[98vh] rounded-lg p-4">
      <div className="flex justify-between items-center">
        <p className="font-bold text-xl ml-6 ">Users</p>
        <button
          // onClick={handleImportSong}
          className="mb-2 mr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Import
        </button>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto flex-grow">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-neutral-900 py-4">
                  <tr className="py-4">
                    <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-s font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-s font-medium text-white uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-s font-medium text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-neutral-600">
                  {userData.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://w7.pngwing.com/pngs/891/743/png-transparent-david-beckham-portrait-art-beckham-colorful-avatar-color-splash-face-heroes.png"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-white">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-gray-500">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{user.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={handleEdit}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="ml-2 text-red-600 hover:text-red-900"
                          onClick={handleDelete}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
