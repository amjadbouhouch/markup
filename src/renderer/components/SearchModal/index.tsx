import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

const items = Array.from({ length: 100 }).fill((_, i) => i);
const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
        className="relative z-50 rounded-md"
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg bg-white rounded">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full rounded-none rounded-t input-sm input input-bordered input-accent"
            />
            <div className="container overflow-y-auto h-96 bg-neutral">
              {items.map((elem) => (
                <div
                  key={elem}
                  className="p-4 cursor-pointer hover:bg-neutral-focus"
                >
                  <div>Lorem ipsum dolor</div>
                </div>
              ))}
            </div>
            <div className="justify-between p-2 footer bg-neutral">
              <div className="neutral-content">153 results</div>
              <div className="neutral-content">Use arrow keys to navigate</div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearchModal;
