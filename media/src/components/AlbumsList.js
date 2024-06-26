import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumListItem from './AlbumsListItem';

const AlbumsList = ({ user }) => {
    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    // isLoading 只會在第一次 fetch 的時候是 true, 有 response 或 error 時會是 false, 之後永遠不會再變成 true
    // isFetching 是每次
    const [addAlbum, { isLoading: isAdding }] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    };

    let content;
    if (isFetching) {
        content = <Skeleton className="h-10 w-full" times={3} />;
    } else if (error) {
        content = <div>Error fetching albums.</div>;
    } else {
        content = data.map(album => {
            return <AlbumListItem key={album.id} 
                album={album} user={user}
            />
        });
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums for {user.name}</h3>
                <Button onClick={handleAddAlbum} loading={isAdding}>
                    + Add Album
                </Button>
            </div>
            <div>{content}</div>
        </div>
    );
}

export default AlbumsList;
