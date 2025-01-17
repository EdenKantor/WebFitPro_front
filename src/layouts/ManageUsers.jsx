import { useState, useEffect } from 'preact/hooks';
import { useManageUsersLogic } from '../utils/ManageUsersLogic';
import ManageUsersTable from '../components/ManageUsersTable';
import ActionButton from '../components/ActionButton';
import Title from '../components/Title';
import Popup from '../components/Popup';
import LoadingSpinner from '../components/LoadingSpinner';

const ManageUsers = () => {
    const {
        users,
        updateUser,
        sortUsersByName,
        fetchUsers,
        deleteUser,
        handleDeleteClick,
        handleClosePopup,
        showPopup,
        userToDelete,
        showUpdatePopup,
        updatedUserName,
        handleCloseUpdatePopup
    } = useManageUsersLogic();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            await fetchUsers();
            setLoading(false);
        };
        loadUsers();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }   

    return (
        <div className="min-h-screen p-6 bg-white text-black transition-all duration-300 dark:bg-gray-900 dark:text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <Title text="Manage Users" className="mb-4 sm:mb-0" />
                    <ActionButton
                        label="Sort by name"
                        iconClass="fas fa-sort-alpha-down"
                        onClick={sortUsersByName}
                        className="text-xs sm:text-sm px-3 py-2  mt-3 sm:mt-0"
                    />
                </div>
                <ManageUsersTable 
                    users={users}
                    onUpdate={updateUser}
                    onDeleteClick={handleDeleteClick}
                />
                
                <Popup
                    isOpen={showPopup}
                    onClose={handleClosePopup}
                    onConfirm={() => deleteUser(userToDelete)}
                    message={`Are you sure you want to delete "${userToDelete}" user?`}
                    showSuccess={false}
                    isError={false}
                />

                <Popup
                    isOpen={showUpdatePopup}
                    onClose={handleCloseUpdatePopup}
                    message={`"${updatedUserName}" user updated successfully`}
                    showSuccess={true}
                    isError={true}
                />
            </div>
        </div>
    );
};

export default ManageUsers;