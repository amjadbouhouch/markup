import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useClickOutside } from 'renderer/hooks/useClickOutside';

interface EmojiPickerProps {
  onIconChange: (icon: any) => void;
  onClickOutside?: () => void;
}
const EmojiPicker = ({ onIconChange, onClickOutside }: EmojiPickerProps) => {
  const ref = useClickOutside(() => {
    onClickOutside && onClickOutside();
  });
  return (
    <div ref={ref} className="z-50">
      <Picker data={data} onEmojiSelect={onIconChange} />
    </div>
  );
};

export default EmojiPicker;
