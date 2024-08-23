"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { useGlobalContext } from "@/context/pokemon.context";

import PokemonItem from "@/components/home/pokomen-item";
import Filter from "@/components/filter";

const HomeWrapper = () => {
  const router = useRouter();
  const { next, state, onAddFavorite, onDeleteFavorite, allPokemonData } =
    useGlobalContext();

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
      <Filter
        onChangeSearch={(e) => setSearch(e)}
        onChangeSelect={(e) => setType(e)}
      />

      {state.loading ? (
        <div className="relative flex justify-center items-center min-h-screen">
          <h1 className="text-[#333] text-3xl">Loading...</h1>
        </div>
      ) : filteredPokemon.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8 mx-60 my-12 p-4">
          {filteredPokemon.map((pokemon) => (
            <PokemonItem
              key={pokemon.name}
              image_url={pokemon.sprites.other.home.front_shiny}
              name={pokemon.name}
              onDetail={() => router.push(`/pokemon/${pokemon.name}`)}
              onFavorite={() => {
                if (state.favorites.includes(pokemon)) {
                  onDeleteFavorite(pokemon);
                }
                if (!state.favorites.includes(pokemon)) {
                  onAddFavorite(pokemon);
                }
              }}
              isFavorite={state.favorites.includes(pokemon)}
            />
          ))}
        </div>
      ) : (
        <div className="relative flex justify-center items-center min-h-screen">
          <h1 className="text-[#333] text-3xl">No pokemon found</h1>
        </div>
      )}

      {filteredPokemon.length > 0 && (
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
