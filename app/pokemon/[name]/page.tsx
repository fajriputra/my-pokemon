import PokemonDetailWrapper from "@/components/detail";

export async function generateStaticParams() {
  const pokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=300");
  const data = await pokemons.json();

  return data.results?.map((rest: { name: string; url: string }) => ({
    name: rest.name,
  }));
}

export default function PokemonDetailPage({
  params: { name },
}: {
  params: { name: string };
}) {
  return <PokemonDetailWrapper name={name} />;
}
