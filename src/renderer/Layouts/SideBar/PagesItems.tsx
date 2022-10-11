import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { IBlock } from 'renderer/database/DB';
import dbService from 'renderer/database/dbService';

const PagesItems = () => {
  // const pages: any[] = [];
  const { data: pages = [] } = useQuery(['pages'], () => dbService.list());
  const favorites = pages?.filter((p) => p.isFavorite);
  const others = pages?.filter((p) => !p.isFavorite);
  const withFavorites = favorites?.length > 0;
  return (
    <div className="menu bg-base-100">
      {withFavorites && (
        <>
          <li className="menu-title">
            <span>Favorites</span>
          </li>
          {favorites?.map((page) => (
            <PageLinkItem key={page._id} page={page} />
          ))}
        </>
      )}
      <li className="menu-title">
        <span>Pages</span>
      </li>
      {others?.map((page) => (
        <PageLinkItem key={page._id} page={page} />
      ))}
    </div>
  );
};
const PageLinkItem = ({ page }: { page: IBlock }) => {
  return (
    <li>
      <NavLink style={{ textDecoration: 'none' }} to={`/${page._id}`}>
        {page?.icon && <span>{page?.icon}</span>}
        <span>{page.title || 'Untitled'}</span>
      </NavLink>
    </li>
  );
};
export default PagesItems;
