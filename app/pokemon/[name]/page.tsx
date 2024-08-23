import Image from "next/image";
import Link from "next/link";

export async function getPokemon(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function generateMetadata({
  params: { name },
}: {
  params: { name: string };
}) {
  const pokemon = await getPokemon(name);

  return {
    title: `Pokémon: ${pokemon.name}`,
    description: `Learn more about ${pokemon.name} and its stats, abilities, and evolutions.`,
  };
}

export async function PokemonDetailPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const pokemon = await getPokemon(name);

  let front_default = "";

  if (pokemon?.sprites?.other) {
    const { "official-artwork": link } = pokemon?.sprites?.other;
    front_default = link.front_default;
  }

  const pkColors = [
    "#f8d5a3",
    "#f5b7b1",
    "#c39bd3",
    "#aed6f1",
    "#a3e4d7",
    "#f9e79f",
    "#fadbd8",
    "#d2b4de",
    "#a9cce3",
    "#a2d9ce",
    "#f7dc6f",
    "#f5cba7",
    "#bb8fce",
    "#85c1e9",
    "#76d7c4",
  ];

  const randomColor = pkColors[Math.floor(Math.random() * pkColors.length)];

  return (
    <div className="flex flex-col justify-center gap-y-10">
      <div className="flex gap-x-4 items-center px-6">
        <Link href="/" className="">
          Back
        </Link>
        <h2 className="text-lg font-semibold capitalize text-[#333]">
          Detail of Pokemon {pokemon?.name}
        </h2>
      </div>
      <div
        className="absolute -translate-x-2/4 -translate-y-2/4 max-w-2xl h-auto transition-all duration-[0.3s] ease-[ease-in-out] shadow-[2px_3px_5px_rgba(0,0,0,0.1)] rounded-xl left-2/4 top-2/4"
        style={{
          background: randomColor,
        }}
      >
        <div className="relative flex flex-col justify-center gap-y-6 h-[380px]">
          <Image
            src={
              pokemon?.sprites?.other?.home.front_default
                ? pokemon?.sprites?.other?.home.front_default
                : front_default
            }
            alt={pokemon.name}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="size-full object-contain"
            quality={100}
          />
        </div>
        <div className="px-12 py-10">
          <h2 className="text-[2.5rem] font-semibold capitalize text-white mb-4 px-0 py-2">
            {pokemon?.name}
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center flex-wrap gap-2">
              <h5 className="text-[1.2rem] font-semibold text-white">Name:</h5>
              <p className="text-[1.2rem] font-medium text-[#333]">
                {pokemon?.name},
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <h5 className="text-[1.2rem] font-semibold text-white">Type:</h5>
              {pokemon?.types?.map((type: any) => (
                <p
                  className="text-[1.2rem] font-medium text-[#333]"
                  key={type.type.name}
                >
                  {type.type.name},
                </p>
              ))}
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <h5 className="text-[1.2rem] font-semibold text-white">
                Height:
              </h5>
              <p className="text-[1.2rem] font-medium text-[#333]">
                {pokemon?.height}
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <h5 className="text-[1.2rem] font-semibold text-white">
                Abilities:
              </h5>
              {pokemon?.abilities?.map((ability: any) => (
                <p
                  className="text-[1.2rem] font-medium text-[#333]"
                  key={ability.ability.name}
                >
                  {ability.ability.name},
                </p>
              ))}
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <h5 className="text-[1.2rem] font-semibold text-white">Stats:</h5>
              {pokemon?.stats?.map((stat: any) => (
                <p
                  className="text-[1.2rem] font-medium text-[#333]"
                  key={stat.stat.name}
                >
                  {stat.stat.name},
                </p>
              ))}
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <h5 className="text-[1.2rem] font-semibold text-white">
                A few moves:
              </h5>
              {pokemon?.moves?.slice(0, 3).map((move: any) => (
                <p
                  className="text-[1.2rem] font-medium text-[#333]"
                  key={move.move.name}
                >
                  {move.move.name},
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
