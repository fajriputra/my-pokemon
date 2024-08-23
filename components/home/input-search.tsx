import { useDebounceFn } from "ahooks";
import { useState } from "react";

interface IInputSearchProps {
  onChangeSearch: (v: string) => void;
}

const InputSearch = (props: IInputSearchProps) => {
  const [searchValue, setSearchValue] = useState<string | undefined>("");

  const searchDebounce = useDebounceFn(
    (v: string) => {
      internalHandleOnChange(v);
    },
    {
      wait: 500,
    }
  );

  const internalHandleOnChange = (v: string) => {
    props.onChangeSearch && props.onChangeSearch(v);
  };

  return (
    <input
      type="text"
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value);
        searchDebounce.run(e.target.value);
      }}
      placeholder="Search for a Pokemon..."
      className="w-full bg-neutral-50 text-[inherit] font-medium text-[#333] transition-all duration-[0.3s] ease-[ease] border-neutral-50 shadow-[1px_5px_10px_rgba(0,0,0,0.1)] px-8 py-4 rounded-xl border-2 border-solid focus:border-2 focus:outline-0 placeholder:text-[#333] placeholder:opacity-30 focus:border-solid focus:border-[#7263f3] outline-0"
    />
  );
};

export default InputSearch;
