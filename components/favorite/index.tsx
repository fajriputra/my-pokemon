"use client";

import { useRouter } from "next/navigation";

import { useGlobalContext } from "@/context/pokemon.context";

import PokemonItem from "@/components/home/pokomen-item";

const FavoriteWrapper = () => {
  const router = useRouter();
  const { state, onDeleteFavorite } = useGlobalContext();

  return (
    <>
      {state.favorites.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8 mx-60 my-12 p-4">
          {state.favorites.map((pokemon) => (
            <PokemonItem
              key={pokemon.name}
              image_url={pokemon.sprites.other.home.front_shiny}
              name={pokemon.name}
              onDetail={() => router.push(`/pokemon/${pokemon.name}`)}
              isFavorite={state.favorites.includes(pokemon)}
              onFavorite={() => onDeleteFavorite(pokemon)}
            />
          ))}
        </div>
      ) : (
        <div className="relative flex justify-center items-center min-h-screen">
          <h1 className="text-[#333] text-3xl">No favorite pokemon found</h1>
        </div>
      )}
    </>
  );
};

export default FavoriteWrapper;
