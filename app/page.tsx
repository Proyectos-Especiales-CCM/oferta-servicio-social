"use client"

import { Filter, ProjectCard, SearchBar } from "@/components/home";
import { useProjectsContext } from "@/context/useProjectsContext";
import { createClient } from "@/lib/supabase/client";
import { mapProjectToProjectTagsSplit } from '@/lib/types/project/schema';
import { Button } from "@nextui-org/react";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";


export default function App() {
  const { projects, setProjects } = useProjectsContext();

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const [searchTerm, setSearchTerm] = React.useState(searchParams.get('search') || '');
  const [selectedHours, setSelectedHours] = React.useState(searchParams.get('hours') || '');
  const [selectedTags, setSelectedTags] = React.useState(searchParams.get('tags') || '');
  const [favoritesIDs, setFavoritesIDs] = React.useState<number[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    // Try getting the projects from context first
    if (projects === undefined) {
      try {
        const supabase = createClient();
        let { data: fetchedProjects, error } = await supabase
          .from('projects')
          .select('*')
          .order('id', { ascending: true })
          .eq('status', 'visible');
        if (error) setError(error.message);
        else if (fetchedProjects) {
          const mappedProjects = fetchedProjects.map(mapProjectToProjectTagsSplit);
          setProjects(mappedProjects);
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the projects");
      }
    }
  }, [projects, setProjects]);

  const handleReset = () => {
    router.push(pathname)
    setSearchTerm('');
    setSelectedHours('');
    setSelectedTags('');
  };

  const handleSearch = (term: string) => {
    router.push(pathname + '?' + createQueryString('search', term))
    setSearchTerm(term.toLowerCase());
  };

  const handleHoursFilterChange = (selectedHours: string) => {
    router.push(pathname + '?' + createQueryString('hours', selectedHours))
    setSelectedHours(selectedHours);
  };

  const handleTagsFilterChange = (selectedTags: string) => {
    router.push(pathname + '?' + createQueryString('tags', selectedTags))
    setSelectedTags(selectedTags);
  };

  const filteredData = (projects ?? [])
    .filter((item) => item.title.toLowerCase().includes(searchTerm))
    .filter((item) => {
      if (selectedHours.length === 0) return true;
      return selectedHours.includes(item.hours);
    })
    .filter((item) => {
      if (selectedTags.length === 0) return true;
      return item.tags.some(tag => selectedTags.includes(tag.name));
    });

  // Extract unique hours from filteredData for the Filter component
  const hoursOptions = Array.from(new Set((projects ?? []).map(item => item.hours)))
    .map(hours => ({ label: `${hours} Horas`, value: hours }));

  const tagOptions = Array.from(new Set((projects ?? []).flatMap(item => item.tags.map(tag => tag.name))))
    .map(tagName => ({ label: tagName, value: tagName }));

  React.useEffect(() => {
    // Fetch favorites from the user
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    setFavoritesIDs(Object.keys(favorites).map(Number));
    fetchProjects();
  }, [fetchProjects]);

  return (
    <main className="flex min-h-screen flex-col px-4 lg:px-20 pb-10">
      <h1 className="text-3xl font-bold py-5">Oferta Servicio Social - Febrero - Junio - 2025</h1>
      <div className="flex flex-col md:flex-row mb-6 gap-2 items-center">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        {/* Add the Filter component here */}
        <div className="flex flex-row gap-2">
          <Filter
            values={selectedHours}
            title="Filtrar por Horas"
            options={hoursOptions}
            onChange={handleHoursFilterChange}
          />
          <Filter
            values={selectedTags}
            title="Filtrar por Carrera"
            options={tagOptions}
            onChange={handleTagsFilterChange}
          />
          {(searchTerm || selectedHours || selectedTags) && (
            <Button isIconOnly size="sm" color="secondary" startContent={<X className="w-4 h-4" />} onClick={handleReset} />
          )}
        </div>
      </div>
      <div className="max-w-[1500px] gap-2 grid grid-cols-12 grid-rows-2 px-2 md:px-8">
        {filteredData.map((data) => (
          <ProjectCard key={data.id} {...data} favoritesIDs={favoritesIDs} />
        ))}
      </div>
    </main>
  );
}
