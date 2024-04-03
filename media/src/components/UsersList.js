import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import Skeleton from './Skeleton';
import Button from './Button';
import Panel from './Panel';
import UserListItem from './UserListItem';

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
    
    let content;
    if (isLoadingUsers) {
        content = <Skeleton
            times={6}
            className="h-10 w-full"
        />;
    } else if (loadingUsersError != null) {
        content = <div>Error fetching data...</div>
    } else { 
        content = data.map(user => {
            return (
                <UserListItem key={user.id} user={user} />
            );
        });
    }

    return (
        <div>
            <div className='flex flex-row justify-between items-center m-3'>
                <h1 className='m-2 text-xl'>List of Users </h1>
                    <Button loading={isCreatingUser} onClick={handleUserAdd}>
                        {/* 下面這行是 children */}
                        + Add User
                    </Button>
                {creatingUserError && 'Error creating user...'}
            </div>
            {content}
            <Panel />
        </div>
    );
}

export default UsersList;