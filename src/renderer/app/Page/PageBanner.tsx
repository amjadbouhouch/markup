import { useState } from 'react';
import EmojiPicker from 'renderer/components/EmojiPicker';
import { Page } from 'renderer/database/DB';
import dbService from 'renderer/database/dbService';

interface PageBannerProps {
  page: Page;
}
const PageBanner = ({ page }: PageBannerProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const toggle = () => setShowEmojiPicker((prev) => !prev);
  const onIconChange = (icon: any) => {
    toggle();
    dbService.updatePageIcon(page.id as number, icon.native);
  };

  return (
    <div className="relative h-48 bg-gray-200">
      <img
        alt="page cover"
        loading="lazy"
        src={page.cover || 'https://via.placeholder.com/800x600'}
        className="object-cover w-full h-full"
      />
      <div className="absolute right-3 bottom-3">
        <button type="button" className="btn btn-sm">
          Change cover
        </button>
      </div>
      <button
        onClick={toggle}
        type="button"
        className="absolute text-lg -bottom-4 left-5 btn btn-square"
      >
        {page.icon || '🏠'}
      </button>
      {showEmojiPicker && (
        <div className="absolute z-50 left-16 top-28">
          <EmojiPicker onClickOutside={toggle} onIconChange={onIconChange} />
        </div>
      )}
    </div>
  );
};

export default PageBanner;
