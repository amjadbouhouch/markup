import { SuggestionProps } from '@tiptap/suggestion';
import React from 'react';
import {
  SuggestionDropdown,
  SuggestionDropdownRef,
} from './SuggestionDropdown';

type CommandItem = {
  label: string;
  value: string;
};
type CommandsListDropDownProps = Pick<SuggestionProps, 'command'> & {
  items: CommandItem[];
};
const CommandsListDropDown = React.forwardRef<
  SuggestionDropdownRef,
  CommandsListDropDownProps
>(({ items, command }, ref) => (
  <SuggestionDropdown<CommandItem>
    forwardedRef={ref}
    items={items}
    onSelect={command}
    renderItem={(elem: CommandItem) => {
      return <a key={elem.value}>{elem.label}</a>;
    }}
  />
));

export default CommandsListDropDown;
