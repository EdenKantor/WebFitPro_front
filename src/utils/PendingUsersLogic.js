import { useState } from "preact/hooks";

const apiUrl = "https://web-fit-pro-back-rose.vercel.app/api/pendingUsers";

export const usePendingUsersLogic = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [originalPendingUsers, setOriginalPendingUsers] = useState([]); // Save the original list
    const [sortMode, setSortMode] = useState('default');

    const fetchPendingUsers = async () => {
        try {
            const response = await fetch("https://web-fit-pro-back-rose.vercel.app/api/pendingUsers", {
                method: "GET",
            });
            const data = await response.json();
            setPendingUsers(data.users || []);
            setOriginalPendingUsers(data.users || []); // Save the original list
        } catch (error) {
            console.error("Error fetching pending users:", error);
            setPendingUsers([]);
            setOriginalPendingUsers([]);
        }
    };

    const approveUser = async (userName) => {
        try {
            const response = await fetch(apiUrl, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: userName,
                }),
            });
            if(response.ok){
                setPendingUsers((prevUsers) =>
                    prevUsers.filter((user) => user.userName !== userName)
                );
                setOriginalPendingUsers((prevOriginal) =>
                    prevOriginal.filter((user) => user.userName !== userName)
                );
            }
        } catch (error) {
            console.error("Error approving user:", error);
        }
    };

    const sortUsers = (usersToSort) => {
        return [...usersToSort].sort((a, b) =>
            a.userName.localeCompare(b.userName)
        );
    };

    const sortUsersByName = () => {
        setSortMode(prevMode => {
            if (prevMode === 'default') {
                const sortedUsers = sortUsers(pendingUsers);
                setPendingUsers(sortedUsers);
                return 'alphabetical';
            } else {
                setPendingUsers([...originalPendingUsers]);
                return 'default';
            }
        });
    };

    return {
        pendingUsers,
        sortMode,
        fetchPendingUsers,
        approveUser,
        sortUsersByName,
    };
};
