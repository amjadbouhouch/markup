import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import TipTapEditor from 'renderer/components/tiptap';
import dbService from 'renderer/database/dbService';
import PageBanner from './PageBanner';
import PageHeader from './PageHeader';
import PageTitle from './PageTitle';

const Page = () => {
  const params = useParams();
  const id = params.blockId as string;

  const { data: page } = useQuery(['page', id], () => dbService.retrieve(id));

  const { data: blocks } = useQuery(
    ['blocks', id],
    () => dbService.list(page!._id),
    {
      enabled: page?._id !== undefined,
    }
  );

  if (page === undefined || blocks === undefined) return <div />;
  return (
    <div
      className="flex flex-col w-full h-full mx-auto overflow-hidden"
      key={`page_${page._id}`}
    >
      <PageHeader page={page} />
      <div className="container flex flex-col flex-1 w-full h-full mx-auto space-y-6 overflow-auto">
        <PageBanner page={page} />
        <PageTitle page={page} />
        {/* mx-auto */}
        <div className="px-8 pb-40">
          <TipTapEditor key={page._id} page={page} blocks={blocks} />
        </div>
      </div>
    </div>
  );
};

export default Page;
