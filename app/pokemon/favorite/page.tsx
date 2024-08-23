import { Metadata } from "next";

import FavoriteWrapper from "@/components/favorite";

export const metadata: Metadata = {
  title: "Favorite Pokémon - Your Personal Collection",
  description:
    "Discover and manage your favorite Pokémon with detailed stats, evolutions, and abilities. Keep track of your top picks in the Pokémon universe.",
};

const FavoritePage = () => {
  return <FavoriteWrapper />;
};

export default FavoritePage;
