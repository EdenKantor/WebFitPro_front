import { useState, useEffect } from 'preact/hooks';
import { usePendingUsersLogic } from '../utils/PendingUsersLogic';
import UsersTable from '../components/UsersTable';
import ActionButton from '../components/ActionButton';
import Title from '../components/Title';
import LoadingSpinner from '../components/LoadingSpinner';

const PendingUsers = () => {
    const { pendingUsers, fetchPendingUsers, approveUser, sortUsersByName } = usePendingUsersLogic();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            await fetchPendingUsers();
            setLoading(false);
        };
        loadUsers();
    }, []);

    const handleApprove = async (userName) => {
        setLoading(true);
        await approveUser(userName);
        setLoading(false);
    };

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
                <Title text="Pending Users" className="mb-4 sm:mb-0"/>
                <div className="flex justify-end mb-4">
                    <ActionButton
                        label="Sort by name"
                        iconClass="fas fa-sort-alpha-down"
                        onClick={sortUsersByName}
                        className="text-xs sm:text-sm px-3 py-2  mt-3 sm:mt-0"
                    />
                </div>
                <UsersTable 
                    users={pendingUsers}
                    onApprove={handleApprove}
                />
            </div>
        </div>
    );
};

export default PendingUsers;