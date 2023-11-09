"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Star } from "lucide-react";
import { createClient } from '@/lib/supabase/client';
import { addToFavorites, removeFromFavorites } from "@/lib/favorites/actions";

export default function FavoriteButton({ id }: { id: string }) {
  const [favorite, setFavorite] = useState(false);
  const [favoritesIDs, setFavoritesIDs] = useState<number[]>([]);
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    fetchProjects().finally(() => setIsLoading(false)); 
  }, []);

  const fetchProjects = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: favorites, error: favoritesError } = await supabase
      .from('favorites_projects')
      .select('project_id')
      .eq('user_id', user?.id);

    if (favoritesError) {
      setError(favoritesError.message);
      console.error(favoritesError.message);
    } else if (favorites) {
      const favoritesList = favorites.map((favorite) => favorite.project_id);
      setFavoritesIDs(favoritesList);
      setFavorite(favoritesList.includes(Number(id))); 
    }
  };

  const handleFavoriteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevenimos el comportamiento por defecto
  
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return;
      }
  
      setIsLoading(true);
      setFavorite(!favorite);
  
      const formData = new FormData(e.target as HTMLFormElement);
  
      formData.append('id', id);
      formData.set('project_id', Number(id).toString());
  
      if (favorite) {
        await removeFromFavorites(formData);
      } else {
        await addToFavorites(formData);
      }
  
      console.log("Favorite added/removed successfully");
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
      setFavorite(!favorite); // Revertimos si ocurre un error
    } finally {
      setIsLoading(false); // Quitamos el estado de carga
    }
  };
  

  return (
    
      <form method="post" onSubmit={handleFavoriteSubmit}>
           <Button 
        className="absolute z-10 top-3 right-2 bg-white/50" 
        size="sm" 
        isIconOnly 
        type="submit"
        isLoading={isLoading} 
        disabled={isLoading} 
      >
        <Star className={`w-4 h-4 ${favorite && "fill-yellow-500"}`} strokeWidth={1} />
      </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} 
      </form>
  );
}