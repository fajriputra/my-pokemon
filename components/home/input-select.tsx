import React, { useState } from "react";

export interface IInputSelectProps {
  types: Array<{ name: string; url: string }>;
  onChangeSelect: (v: string) => void;
}

const InputSelect = (props: IInputSelectProps) => {
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState(false);

  const internalHandleSelect = (value: string) => {
    const newValue = selectedType === value ? undefined : value;
    setSelectedType(newValue);
    setIsOpen(false);

    if (props.onChangeSelect) {
      props.onChangeSelect(newValue ?? "");
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="w-full bg-neutral-50 text-[inherit] font-medium text-[#333] transition-all duration-[0.3s] ease-[ease] border-neutral-50 shadow-[1px_5px_10px_rgba(0,0,0,0.1)] px-8 py-4 rounded-xl border-2 border-solid focus:border-2 focus:outline-0 placeholder:text-[#333] placeholder:opacity-30 focus:border-solid focus:border-[#7263f3] outline-0"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <span className="block truncate capitalize">
            {selectedType || "Select by type"}
          </span>
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {props.types.map((type) => (
            <li
              className="relative cursor-default select-none py-2 px-8 text-gray-900"
              id="listbox-option-0"
              key={type.name}
              onClick={() => internalHandleSelect(type.name)}
            >
              <div className="flex items-center">
                <span className="block truncate font-normal capitalize">
                  {type.name}
                </span>
              </div>

              {selectedType === type.name && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSelect;
