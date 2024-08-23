import React from "react";

import Image from "next/image";

import { MdFavorite } from "react-icons/md";
import { BsBoxArrowInUpRight } from "react-icons/bs";

interface IPokemonItemProps {
  image_url: string;
  name: string;
  onFavorite?: () => void;
  onDetail?: () => void;
  isFavorite?: boolean;
}

const PokemonItem = (props: IPokemonItemProps) => {
  return (
    <div
      className="flex flex-col shadow-[1px_3px_5px_rgba(0,0,0,0.04)] cursor-pointer transition-all duration-[0.3s] ease-[ease] rounded-xl hover:shadow-[1px_3px_5px_rgba(0,0,0,0.1)] hover:translate-y-[-5px] hover:rounded-xl"
      onClick={() => {}}
    >
      <div className="h-[250px]">
        <Image
          src={props.image_url}
          alt={props.name}
          width={0}
          height={0}
          className="size-full object-contain bg-white rounded-t-xl"
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="h-[200px] bg-neutral-50 flex flex-col justify-between p-4 rounded-br-xl rounded-bl-xl">
        <h3 className="text-[1.4rem] text-[#333] capitalize">{props.name}</h3>
        <div className="flex items-center gap-x-4">
          <MdFavorite
            size={24}
            color={props.isFavorite ? "red" : "#d8d8d8"}
            onClick={props.onFavorite}
          />
          <BsBoxArrowInUpRight
            size={24}
            color="#7263f3"
            onClick={props.onDetail}
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonItem;
