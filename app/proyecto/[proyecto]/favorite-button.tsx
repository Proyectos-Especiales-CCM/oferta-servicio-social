"use client"

import React from "react";
import { Button } from "@nextui-org/react"
import { Star } from "lucide-react"

export default function FavoriteButton({ id }: { id: string }) {
  const [favorite, setFavorite] = React.useState(false);

  React.useEffect(() => {
    // Access localStorage inside useEffect
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    // Set the initial state based on the localStorage value if its defined
    setFavorite(favorites[id] || false);
  }, [id]);

  /**
   * Change the favorite state and update localStorage
   */
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    const newFavValue = !favorite;
    setFavorite(newFavValue);
    if (newFavValue) {
      favorites[id] = true; // Set this project as a favorite
    } else {
      delete favorites[id]; // Remove this project from favorites
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <Button className="absolute z-10 top-3 right-0 bg-zinc-100 border border-zinc-300" size="sm" isIconOnly onClick={(e) => handleFavoriteClick(e)}>
      <Star className={`w-4 h-4 ${favorite && "fill-yellow-500"}`} strokeWidth={1} />
    </Button>
  )
};
