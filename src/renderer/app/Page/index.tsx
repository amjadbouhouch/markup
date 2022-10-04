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
      className="flex flex-col w-full h-full mx-auto overflow-hidden"
      key={`page_${page.id}`}
    >
      <PageHeader page={page} />
      <div className="container flex flex-col flex-1 w-full h-full mx-auto space-y-6 overflow-auto">
        <PageBanner page={page} />
        <PageTitle page={page} />
        {/* mx-auto */}
        <div className="px-8 pb-40">
          <TipTapEditor key={page.id} page={page} />
        </div>
      </div>
    </div>
  );
};

export default Page;
