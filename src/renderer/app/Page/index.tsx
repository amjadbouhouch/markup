import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TipTapEditor from 'renderer/components/tiptap';
import dbService from 'renderer/database/dbService';
import PageBanner from './PageBanner';
import PageHeader from './PageHeader';
import PageTitle from './PageTitle';

const Page = () => {
  const params = useParams();
  const id = Number(params.pageId as string);
  const page = useLiveQuery(() => dbService.getPageById(id), [id]);
  useEffect(() => {
    localStorage.setItem('lastPageSeen', id.toString());
  }, [id]);
  if (!page) return <div />;

  return (
    <div
      className="flex flex-col w-full h-full overflow-hidden"
      key={`page_${page.id}`}
    >
      <PageHeader page={page} />
      <div className="h-full space-y-6 overflow-auto">
        <PageBanner page={page} />
        <PageTitle page={page} />
        <div className="ml-4">
          <TipTapEditor key={page.id} page={page} />
        </div>
      </div>
    </div>
  );
};

export default Page;
