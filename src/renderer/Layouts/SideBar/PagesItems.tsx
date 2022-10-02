import { useLiveQuery } from 'dexie-react-hooks';
import { NavLink } from 'react-router-dom';
import { Page } from 'renderer/database/DB';
import dbService from 'renderer/database/dbService';

const PagesItems = () => {
  const pages = useLiveQuery(() => dbService.findPages(), []);
  if (!pages) {
    return null;
  }
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
            <PageLinkItem key={page.id} page={page} />
          ))}
        </>
      )}
      <li className="menu-title">
        <span>Pages</span>
      </li>
      {others?.map((page) => (
        <PageLinkItem key={page.id} page={page} />
      ))}
    </div>
  );
};
const PageLinkItem = ({ page }: { page: Page }) => {
  return (
    <li>
      <NavLink style={{ textDecoration: 'none' }} to={`/${page.id}`}>
        {page?.icon && <span>{page?.icon}</span>}
        <span>{page.title || 'Untitled'}</span>
      </NavLink>
    </li>
  );
};
export default PagesItems;
