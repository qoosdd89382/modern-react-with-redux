import { GoTrashcan } from 'react-icons/go';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

const AlbumListItem = ({ album }) => {
    const header = <div>
        <Button><GoTrashcan /></Button>
        {album.title}
    </div>;
    return (
        <ExpandablePanel header={header}>
            CONTENT
        </ExpandablePanel>
    );
};

export default AlbumListItem;