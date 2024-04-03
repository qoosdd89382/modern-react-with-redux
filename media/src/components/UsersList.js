import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import Skeleton from './Skeleton';
import Button from './Button';
import Panel from './Panel';

function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError, ] = useThunk(addUser);
    const { data } = useSelector(({ users }) => users);

    useEffect(() => {
        doFetchUsers()
    }, []);   // [dispatch] 

    const handleUserAdd = () => {
        doCreateUser();
    };

    if (isLoadingUsers) {
        return <Skeleton
            times={6}
            className="h-10 w-full"
        />;
    }

    if (loadingUsersError != null) {
        return <div>Error fetching data...</div>
    }

    const renderedUsers = data.map(user => {
        return (
            <div key={user.id} className='mb-2 border rounded'>
                <div className='flex p-2 justify-between items-center cursor-pointer'>
                    {user.name}
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className='flex flex-row justify-between m-3'>
                <h1 className='m-2 text-xl'>List of Users </h1>
                    <Button loading={isCreatingUser} onClick={handleUserAdd}>
                        {/* 下面這行是 children */}
                        + Add User
                    </Button>
                {creatingUserError && 'Error creating user...'}
            </div>
            {renderedUsers}
            <Panel />
        </div>
    );
}

export default UsersList;