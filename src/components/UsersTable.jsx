import ActionButton from '../components/ActionButton';
import UserCard from './UserCard';
import { useState } from 'preact/hooks';

const UsersTable = ({ users = [], onApprove }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  if (users.length === 0) {
    return <div className="text-center p-4">No pending users found</div>;
  }

  const getStatusDisplay = (isRegistered) => {
    return isRegistered === "Y" 
      ? { text: "Active", classes: "bg-green-100 text-green-700" }
      : { text: "Pending", classes: "bg-yellow-100 text-yellow-700" };
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => 
      prev < users.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  // Custom action buttons for UserCard to show only Approve button
  const renderCustomActions = (user) => (
    <ActionButton
      label="Approve"
      iconClass="fas fa-check"
      onClick={() => onApprove(user.userName)}
      className="py-2 px-4 text-sm"
    />
  );

  return (
    <div>
      {/* Desktop view - table */}
      <div className="hidden lg:block overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">User Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => {
              const status = getStatusDisplay(user.isRegistered);
              return (
                <tr key={user.userName} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{user.userName}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full ${status.classes}`}>
                      {status.text}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <ActionButton
                      label="Approve"
                      iconClass="fas fa-check"
                      onClick={() => onApprove(user.userName)}
                      className="py-2 px-4 text-sm"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet view - cards */}
      <div className="lg:hidden">
        {users.length > 0 && (
          <>
            <UserCard
              user={users[currentCardIndex]}
              editData={{}}
              isPending={users[currentCardIndex].isRegistered === "N"}
              isActive={users[currentCardIndex].isRegistered === "Y"}
              hasChanges={false}
              onInputChange={() => {}}
              onUpdate={() => {}}
              onDelete={() => {}}
              hideDefaultActions={true}
              customActions={renderCustomActions(users[currentCardIndex])}
              showFields={false} // Not showing the fields in Pending Users
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
                className={`px-4 ${currentCardIndex === users.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentCardIndex === users.length - 1}
              />
            </div>
            <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
              {currentCardIndex + 1} of {users.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersTable;