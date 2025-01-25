import { useState, useEffect } from "preact/hooks";
import ActionButton from "../components/ActionButton";
import FormField from "../components/FormField";
import UserCard from "./UserCard";

const ManageUsersTable = ({ users = [], onUpdate, onDeleteClick }) => {
  if (!users || users.length === 0) {
    return <p>No users available</p>;
  }

  const [editableData, setEditableData] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const filteredUsers = users.filter((user) => user.userName !== "admin");

  useEffect(() => {
    // If current index is out of bounds, reset to last valid index
    if (currentCardIndex >= filteredUsers.length) {
      setCurrentCardIndex(Math.max(0, filteredUsers.length - 1));
    }
  }, [filteredUsers]);

  const handleInputChange = (userName, field, value) => {
    if (/^[1-9]\d*$/.test(value)) {
      setEditableData((prev) => ({
        ...prev,
        [userName]: { ...prev[userName], [field]: value },
      }));
    }
  };

  const handleUpdate = (userName, originalData) => {
    const updatedData = editableData[userName] || {};
    const mergedData = { ...originalData, ...updatedData };
    onUpdate(userName, mergedData, originalData.isRegistered === "Y");

    setEditableData((prev) => {
      const { [userName]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => 
      prev < filteredUsers.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  return (
    <div>
      {/* Desktop view - table */}
      <div className="hidden lg:block overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="w-1/6 px-6 py-3 text-center">User Name</th>
              <th className="w-1/6 px-6 py-3 text-center">Status</th>
              <th className="w-1/6 px-6 py-3 text-center">Age</th>
              <th className="w-1/6 px-6 py-3 text-center">Height</th>
              <th className="w-1/6 px-6 py-3 text-center">Weight</th>
              <th className="w-1/6 px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const isActive = user.isRegistered === "Y";
              const isPending = user.isRegistered === "N";
              const editData = editableData[user.userName] || {};
              const hasChanges = Object.keys(editData).length > 0;

              return (
                <tr key={user.userName} className="text-center">
                  <td className="px-6 py-4 truncate">{user.userName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                      isActive ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {isActive ? "Active" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <FormField
                      type="text"
                      value={editData.age ?? user.age}
                      placeholder="Enter age"
                      onChange={(e) => !isPending && handleInputChange(user.userName, "age", e.target.value)}
                      disabled={isPending}
                      className="w-full"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <FormField
                      type="text"
                      value={editData.height ?? user.height}
                      placeholder="Enter height"
                      onChange={(e) => !isPending && handleInputChange(user.userName, "height", e.target.value)}
                      disabled={isPending}
                      className="w-full"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <FormField
                      type="text"
                      value={editData.weight ?? user.weight}
                      placeholder="Enter weight"
                      onChange={(e) => !isPending && handleInputChange(user.userName, "weight", e.target.value)}
                      disabled={isPending}
                      className="w-full"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <ActionButton
                        label="Update"
                        iconClass="fas fa-edit"
                        onClick={() => handleUpdate(user.userName, user)}
                        className={`${!isActive || !hasChanges ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={!isActive || !hasChanges}
                      />
                      <ActionButton
                        label="Delete"
                        iconClass="fas fa-times"
                        onClick={() => onDeleteClick && !isPending && onDeleteClick(user.userName)}
                        className={`${
                          isPending 
                            ? "opacity-50 cursor-not-allowed bg-gray-500 dark:bg-gray-500" 
                            : "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                        }`}
                        disabled={isPending}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet view - cards */}
      <div className="lg:hidden">
        {filteredUsers.length > 0 && currentCardIndex < filteredUsers.length &&(
          <>
            <UserCard
              user={filteredUsers[currentCardIndex]}
              editData={editableData[filteredUsers[currentCardIndex].userName] || {}}
              isPending={filteredUsers[currentCardIndex].isRegistered === "N"}
              isActive={filteredUsers[currentCardIndex].isRegistered === "Y"}
              hasChanges={Object.keys(editableData[filteredUsers[currentCardIndex].userName] || {}).length > 0}
              onInputChange={handleInputChange}
              onUpdate={handleUpdate}
              onDelete={onDeleteClick}
            />
            <div className="flex justify-center space-x-4 mt-4">
              <ActionButton
                label=""
                iconClass="fas fa-chevron-left"
                onClick={handlePrevCard}
                className={`px-4 ${currentCardIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentCardIndex === 0}
              />
              <ActionButton
                label=""
                iconClass="fas fa-chevron-right"
                onClick={handleNextCard}
                className={`px-4 ${currentCardIndex === filteredUsers.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentCardIndex === filteredUsers.length - 1}
              />
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              {currentCardIndex + 1} of {filteredUsers.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageUsersTable;
