import { useFetchAlbumsQuery } from "../store";
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

const AlbumsList = ({ user }) => {
    const { data, error, isLoading } = useFetchAlbumsQuery(user);
    // isLoading 只會在第一次 fetch 的時候是 true, 有 response 或 error 時會是 false, 之後永遠不會再變成 true
    // isFetching 是每次
    
    let content;
    if (isLoading) {
        content = <Skeleton />
    } else if (error) {
        content = <div>Error fetching albums.</div>
    } else {
        content = data.map(album => {
            const header = <div>{album.title}</div>;
            return (
                <ExpandablePanel key={album.id} header={header}>
                    CONTENT
                </ExpandablePanel>
            );
        });
    }

    return (
        <div>
            <div>Albums for {user.name}</div>
            <div>{content}</div>
        </div>
    );
}

export default AlbumsList;
