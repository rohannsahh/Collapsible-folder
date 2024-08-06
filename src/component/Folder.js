import React, { useState,useEffect } from 'react';

const Folder = ({ name, children, isLeaf }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const openModal = (detail) => {
    setSelectedDetail(detail);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDetail(null);
  };

  const handleInputChange = (e) => {
    setSelectedDetail({
      ...selectedDetail,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="folder">
      <div
        className="flex items-center p-2 m-1 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md"
        onClick={toggleOpen}
      >
        <span className={`mr-2 transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>
          ▶
        </span>
        <span>{name}</span>
      </div>
      {isOpen && (
        <div className="pl-4">
          {isLeaf ? (
            <div className="p-4 bg-gray-100 rounded-md">
              {isMobile ? (
                <div className="grid gap-2">
                  {children.details.map((detail, index) => (
                    <div key={index} className="p-2 border border-gray-300 rounded-md">
                      <div><strong>Name:</strong> {detail.name}</div>
                      <div><strong>Title:</strong> {detail.title}</div>
                      <div><strong>Email:</strong> {detail.email}</div>
                      <div><strong>Role:</strong> {detail.role}</div>
                      <button
                        className="mt-2 text-blue-500"
                        onClick={() => openModal(detail)}
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <table className="min-w-full border border-gray-300 table-fixed">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="p-2 border-b border-gray-300 w-1/4">Name</th>
                      <th className="p-2 border-b border-gray-300 w-1/4">Title</th>
                      <th className="p-2 border-b border-gray-300 w-1/4">Email</th>
                      <th className="p-2 border-b border-gray-300 w-1/4">Role</th>
                      <th className="p-2 border-b border-gray-300 w-1/4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {children.details.map((detail, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-2 border-b border-gray-300 truncate" title={detail.name}>
                          {detail.name}
                        </td>
                        <td className="p-2 border-b border-gray-300 truncate" title={detail.title}>
                          {detail.title}
                        </td>
                        <td className="p-2 border-b border-gray-300 truncate" title={detail.email}>
                          {detail.email}
                        </td>
                        <td className="p-2 border-b border-gray-300 truncate" title={detail.role}>
                          {detail.role}
                        </td>
                        <td className="p-2 border-b border-gray-300">
                          <button
                            className="text-blue-500"
                            onClick={() => openModal(detail)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            children
          )}
        </div>
      )}

      {isModalOpen && selectedDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Details</h2>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={selectedDetail.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={selectedDetail.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="text"
                name="email"
                value={selectedDetail.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
  <label className="block mb-1">Role</label>
  <div className="flex items-center">
    <label className="mr-4">
      <input
        type="radio"
        name="role"
        value="Admin"
        checked={selectedDetail.role === "Admin"}
        onChange={handleInputChange}
        className="mr-1"
      />
      Admin
    </label>
    <label>
      <input
        type="radio"
        name="role"
        value="Member"
        checked={selectedDetail.role === "Member"}
        onChange={handleInputChange}
        className="mr-1"
      />
      Member
    </label>
  </div>
</div>

            <div className="flex justify-end">
              <button
                className="mr-2 p-2 bg-gray-200 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-blue-500 text-white rounded-md"
                onClick={() => {
                  closeModal();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
