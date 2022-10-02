import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router-dom';
import TipTapEditor from 'renderer/components/tiptap';
import dbService from 'renderer/database/dbService';

const Page = () => {
  const params = useParams();
  const id = Number(params.pageId as string);
  const page = useLiveQuery(() => dbService.getPageById(id), [id]);

  if (!page) return <div />;

  return (
    <div className="p-6">
      <TipTapEditor key={page.id} page={page} />
    </div>
  );
};

export default Page;
