"use client";

import React from "react";

import { useGlobalContext } from "@/context/pokemon.context";

import InputSearch, { IInputSearchProps } from "./home/input-search";
import InputSelect, { IInputSelectProps } from "./home/input-select";

type TFilterProps = IInputSearchProps &
  Pick<IInputSelectProps, "onChangeSelect">;

const Filter = (props: TFilterProps) => {
  const { state } = useGlobalContext();

  return (
    <div className="relative flex justify-center items-center bg-white px-0 py-4 mx-60 gap-x-4">
      <div className="w-1/2">
        <InputSearch onChangeSearch={(e) => props.onChangeSearch(e)} />
      </div>
      <div className="w-1/2">
        <InputSelect
          types={state.types}
          onChangeSelect={(v) => props.onChangeSelect(v)}
        />
      </div>
    </div>
  );
};

export default Filter;
