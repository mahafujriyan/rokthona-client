
import React, { useState, useRef, useEffect, cloneElement } from 'react';

// Wrapper for the whole dropdown
export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);

  // Clone children to pass props to trigger/content components
  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (child.type === DropdownMenuTrigger) {
      return cloneElement(child, { open, setOpen });
    }

    if (child.type === DropdownMenuContent) {
      return cloneElement(child, { open, setOpen });
    }

    return child;
  });

  return <div className="relative inline-block text-left">{childrenWithProps}</div>;
}

// Button that toggles the dropdown
export function DropdownMenuTrigger({ children, open, setOpen }) {
  return (
    <div onClick={() => setOpen(!open)} className="cursor-pointer">
      {children}
    </div>
  );
}

// Dropdown content
export function DropdownMenuContent({ children, open, setOpen }) {
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div className="py-1">{children}</div>
    </div>
  );
}

// Each item inside dropdown
export function DropdownMenuItem({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </button>
  );
}
