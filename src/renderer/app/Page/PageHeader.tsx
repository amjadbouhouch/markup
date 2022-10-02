import { FaRegStar, FaStar, FaTrashAlt } from 'react-icons/fa';
import { FcHome } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { Page } from 'renderer/database/DB';
import dbService from 'renderer/database/dbService';
import { makeToast } from 'utils/helpers';

interface PageHeaderProps {
  page: Page;
}
const PageHeader = ({ page }: PageHeaderProps) => {
  const navigation = useNavigate();
  const toggleFavorite = () => dbService.toggleFavorite(page.id as number);
  const remove = async () => {
    try {
      await dbService.remove(page.id as number);
      makeToast.success('Page deleted Successfully!');
      navigation(-1);
    } catch (error) {}
  };
  return (
    <div className="border-b navbar bg-base-100 border-base-200">
      <div className="flex-none">
        <label
          htmlFor="my-drawer-2"
          className="lg:hidden btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <FcHome className="w-5 h-5" />
            </li>
            <li className="flex items-center space-x-2">
              {page?.icon && <span>{page?.icon}</span>}
              <span>{page?.title || 'Untitled'}</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button
          onClick={toggleFavorite}
          type="button"
          className="btn btn-circle btn-ghost"
        >
          {page.isFavorite ? (
            <FaStar className="w-5 h-5 text-yellow-500" />
          ) : (
            <FaRegStar className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={remove}
          type="button"
          className="btn btn-circle btn-ghost"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};
const UserBar = () => (
  <>
    <div className="flex-none gap-2">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered"
        />
      </div>
    </div>

    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ring ring-offset-2 ring-primary ring-offset-base-100">
          <img src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&rounded=true" />
        </div>
      </label>

      <ul
        tabIndex={0}
        className="p-2 mt-3 shadow w-52 menu menu-compact dropdown-content bg-base-100 rounded-box"
      >
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  </>
);
export default PageHeader;
