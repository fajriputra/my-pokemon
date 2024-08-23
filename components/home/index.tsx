"use client";

import React, { useState } from "react";

import { useGlobalContext } from "@/context/pokemon.context";

import InputSearch from "@/components/home/input-search";
import PokemonItem from "@/components/home/pokomen-item";
import InputSelect from "@/components/home/input-select";

const HomeWrapper = () => {
  const { next, state, allPokemonData } = useGlobalContext();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const filteredPokemon = allPokemonData.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.types.some(
        (t) => t?.type?.name?.toLowerCase() === type.toLowerCase()
      )
  );

  return (
    <>
      <div className="relative flex justify-center items-center bg-white px-0 py-4 mx-60 gap-x-4">
        <div className="w-1/2">
          <InputSearch onChangeSearch={(e) => setSearch(e)} />
        </div>
        <div className="w-1/2">
          <InputSelect types={state.types} onChangeSelect={(v) => setType(v)} />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8 mx-60 my-12 p-4">
        {state.loading
          ? "Loading..."
          : filteredPokemon.map((pokemon) => (
              <PokemonItem
                key={pokemon.name}
                image_url={pokemon.sprites.other.home.front_shiny}
                name={pokemon.name}
              />
            ))}
      </div>

      {allPokemonData.length > 0 && (
        <div className="relative flex justify-center items-center mx-0 my-16 pb-8">
          <button
            className="bg-white shadow-[1px_3px_5px_rgba(0,0,0,0.04)] cursor-pointer text-[inherit] font-medium text-[#7263f3] transition-all duration-[0.3s] ease-[ease] px-8 py-4 rounded-lg border-[none] hover:text-[#333]"
            onClick={next}
          >
            Load More &darr;
          </button>
        </div>
      )}
    </>
  );
};

export default HomeWrapper;
