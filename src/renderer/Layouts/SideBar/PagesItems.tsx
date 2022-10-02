import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import { NavLink } from 'react-router-dom';
import dbService from 'renderer/database/dbService';

const PagesItems = () => {
  const pages = useLiveQuery(() => dbService.findPages(), []);
  // const { url } = useRouteMatch()
  return (
    <>
      {pages?.map((page) => (
        <li key={page.id}>
          <NavLink
            // activeClassName="text-white"
            style={{ textDecoration: 'none' }}
            to={`/${page.id}`}
            className="flex items-center justify-between normal-case"
          >
            <span>{page.name}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              type="button"
              className="btn btn-ghost btn-xs"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default PagesItems;
