import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import { useThunk } from '../hooks/use-thunk'
import ExpandablePanel from "./ExpandablePanel";

function UserListItem({ user }) {
    const [doRemoveUser, isDeletingUser, error] = useThunk(removeUser);
    
    const handleClick = () => {
        doRemoveUser(user);
    };
    const header = <>
        <Button className="mr-3" loading={isDeletingUser} onClick={handleClick}>
            <GoTrashcan />
        </Button>
        {error && <div>Error deleting user.</div>}
        {user.name}
    </>;

    return (
        <ExpandablePanel key={user.id} header={header}>
            CONTENT
        </ExpandablePanel>
    );
}

export default UserListItem;