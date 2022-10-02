import { FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ThemeChanger from 'renderer/components/themes/ThemeChanger';
import dbService from 'renderer/database/dbService';
import PagesItems from './PagesItems';

const SideBar = () => {
  const navigate = useNavigate();
  const createNewPage = async () => {
    const pageId = await dbService.createPage('');
    navigate(`${pageId.toString()}`);
  };

  return (
    <div className="shrink-0 drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay" />
      <ul className="p-2 overflow-y-auto border-r w-80 border-base-300 menu bg-base-100 text-base-content">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl normal-case btn btn-ghost">
              Markup
            </Link>

            <button
              type="button"
              onClick={createNewPage}
              className="btn btn-square btn-ghost"
            >
              <FaPlus className="w-5 h-5" />
            </button>
          </div>
          <PagesItems />
        </div>
        <ThemeChanger />
      </ul>
    </div>
  );
};

export default SideBar;
