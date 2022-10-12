import React, { useRef } from 'react';
import { IBlock } from 'renderer/database/DB';
import dbService from 'renderer/database/dbService';

interface BLockTitleProps {
  block: IBlock;
}
const PageTitle = ({ block }: BLockTitleProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const onBlur = () => {
    if (titleRef.current && block.title !== titleRef.current.value.trim()) {
      const newTitle = titleRef.current.value.trim();
      dbService.updatePageTitle(block._id!, newTitle);
    }
  };
  return (
    <div className="ml-4">
      <input
        ref={titleRef}
        defaultValue={block.title}
        className="w-full text-4xl bg-transparent appearance-none outline-0 placeholder:text-base-content"
        placeholder="Untitled"
        onBlur={onBlur}
      />
    </div>
  );
};

export default PageTitle;
