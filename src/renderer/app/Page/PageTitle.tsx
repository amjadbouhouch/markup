import React, { useRef } from 'react';
import { Page } from 'renderer/database/DB';
import dbService from 'renderer/database/dbService';

interface PageTitleProps {
  page: Page;
}
const PageTitle = ({ page }: PageTitleProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const onBlur = () => {
    if (titleRef.current && page.title !== titleRef.current.value.trim()) {
      const newTitle = titleRef.current.value.trim();
      dbService.updatePageTitle(page.id!, newTitle);
    }
  };
  return (
    <div className="ml-4">
      <input
        ref={titleRef}
        defaultValue={page.title}
        className="w-full text-4xl bg-transparent appearance-none outline-0 placeholder:text-base-content"
        placeholder="Untitled"
        onBlur={onBlur}
      />
    </div>
  );
};

export default PageTitle;
