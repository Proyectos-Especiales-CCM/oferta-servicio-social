import { createClient } from "@/lib/supabase/client";
import { Tag } from "@/lib/types/project/schema";
import { Button, Card, CardFooter, CardHeader, Chip, Image } from "@nextui-org/react";
import { Boxes, Clock, Star } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CardComponentProps {
  id: number;
  title: string;
  tags: Tag[];
  image: string;
  description: string;
  hours: string;
  organization: string;
  group: number;
  groupKey: string;
  favoritesIDs: number[];
}

/**
 * Renders a card-style component with the Project information
 * and a link to the individual Project page.
 * 
 * @returns
 */
export default function ProjectCard({ id, title, tags, image, description, hours, organization, group, groupKey, favoritesIDs }: CardComponentProps) {
  const [favorite, setFavorite] = useState(false);

  const supabase = createClient();

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

  useEffect(() => {
    if (favoritesIDs.includes(id)) setFavorite(true);
  }, [favoritesIDs, id]);

  return (
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-4 group/card">
      <Button className="absolute z-10 top-3 right-2 bg-white/50" size="sm" isIconOnly onClick={(e) => handleFavoriteClick(e)}>
        <Star className={`w-4 h-4 ${favorite && "fill-yellow-500"}`} strokeWidth={1} />
      </Button>
      <Link href={`/proyecto/${id}`} className="w-full h-full relative z-0">
        <CardHeader className="absolute z-10 flex-col items-start bg-gradient-to-b from-black/60">
          <h4 className="w-[90%] text-zinc-100 font-medium text-xl lg:text-2xl">
            {title.length > 50 ? `${title.slice(0, 50)}...` : title}
          </h4>
          <p className="w-[80%] text-zinc-100 text-tiny truncate pb-1.5">{organization}</p>
          <div className="flex flex-wrap gap-x-1">
            {tags.map((tag, index) => (
              <Chip key={index} size="sm" className={`${tag.color} text-zinc-200 mb-2`}>
                {tag.name}
              </Chip>
            ))}
          </div>
        </CardHeader>
        <div className="flex justify-center items-center w-full h-full relative z-0">
          {image && (
            <Image
              as={NextImage}
              isBlurred
              removeWrapper
              alt="Card example background"
              className="z-0 w-1/2 h-auto object-cover group-hover/card:scale-125 transition-all duration-200 ease-in-out"
              src={supabase.storage.from('ServicioSocialProjectImages').getPublicUrl(image).data.publicUrl}
              width={500}
              height={500}
            />
          )}
        </div>
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div className="w-3/4 gap-1">
            {/* <p className="text-black text-sm truncate">{description}</p> */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <Boxes className="w-3 h-3" strokeWidth={1} />
                <p className="text-black text-sm font-medium ml-1">Clave a inscribir: {groupKey} Grupo {group}</p>
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3" strokeWidth={1} />
                <p className="text-black text-tiny ml-1">{hours} Horas</p>
              </div>
            </div>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Ver más
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
