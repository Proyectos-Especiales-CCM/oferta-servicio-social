"use client"

import { ProjectTagsSplit, mapProjectToProjectTagsSplit } from '@/lib/types/project/schema';
import { Chip, Image } from '@nextui-org/react';
import { Calendar, ChevronRightSquare, Clock, Goal, Hammer, Map, Package, PersonStanding, Users2, Watch } from 'lucide-react';
import NextImage from "next/image";
import React, { useCallback } from 'react';
import BackButton from '@/components/ui/BackButton';
import FavoriteButton from './favorite-button';
import { createClient } from '@/lib/supabase/client';
import { useProjectsContext } from '@/context/useProjectsContext';

const periodOptions = [
  { label: "Verano", value: "verano" },
  { label: "Agosto - Diciembre", value: "ago-dic" },
  { label: "Invierno", value: "invierno" },
  { label: "Febrero - Junio", value: "feb-jun" },
];


export default function Page(context: any) {
  const { projects } = useProjectsContext();

  const [project, setProject] = React.useState<ProjectTagsSplit>();
  const [error, setError] = React.useState<string | null>(null);

  const supabase = createClient();

  const fetchProject = useCallback(async (id: number) => {
    let { data: fetchedProject, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id);
    if (error) setError(error.message);
    else if (fetchedProject) {
      const parsedProject = mapProjectToProjectTagsSplit(fetchedProject[0]);
      setProject(parsedProject);
    }
  }, [supabase]);

  React.useEffect(() => {
    const id = Number(context.params.proyecto);
    // Try getting the project from context first
    if (projects) {
      const project = projects.find(project => project.id === id);
      if (project) setProject(project); else fetchProject(id);
    } else fetchProject(id);
  }, [context.params.proyecto, fetchProject, projects]);

  return (
    <main className="flex flex-col px-4 md:px-36 pt-6 pb-10">
      <div className="relative flex flex-col md:flex-row justify-between items-center w-full pb-4">
        <FavoriteButton id={context.params.proyecto} />
        <div className="flex flex-col gap-1 w-full md:w-2/3">
          <h1 className="text-3xl font-bold">{project?.title}<span className='ml-4 text-lg font-medium text-red-700'>{periodOptions.find(option => option.value === project?.period)?.label}</span></h1>
          <p className="text-sm">{project?.organization}</p>
          <div className='flex flex-row gap-1 flex-wrap'>
            {project && project.tags?.map((tag, index) => (
              <Chip key={index} size="sm" className={`${tag.color} text-white mb-2`}>
                {tag.name}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full lg:w-1/3 justify-center items-center">
          {project?.image && (
            <Image
              as={NextImage}
              isBlurred
              removeWrapper
              alt="Card example background"
              className="z-0 max-w-xs max-h-40 group-hover/card:scale-125 transition-all duration-200 ease-in-out object-contain"
              src={supabase.storage.from('ServicioSocialProjectImages').getPublicUrl(project?.image).data.publicUrl}
              width={500}
              height={500}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 w-full">
        <div className="col-span-6 md:col-span-2">
          <div className="flex items-center py-2">
            <Goal className="h-6 w-6 mr-2 text-blue-700" strokeWidth={1.5} />
            <p className="w-[90%] text-medium font-medium py-2"><span className='font-bold'>Objetivo del Proyecto: </span>{project?.objective}</p>
          </div>
          <p className="text-medium font-bold pb-0.5">Actividades a realizar</p>
          <p className="text-medium whitespace-pre-line">{project?.description}</p>
        </div>

        <div className="flex flex-col gap-4 col-span-6 md:col-span-4">
          <div className="flex py-2 bg-zinc-100 border border-zinc-300 w-full rounded-md">
            <div className='w-full justify-center items-center flex flex-row px-4'>
              <ChevronRightSquare className="h-[1.125rem] w-[1.125rem] text-zinc-500" strokeWidth={1.6} />
              <div className='flex flex-col gap-2 w-[90%]'>
                <p className="text-xs text-zinc-600 text-center">Clave para inscribir este proyecto</p>
                <p className='text-lg font-bold text-zinc-700 text-center'>{project?.groupKey} Grupo {project?.group}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-1.5 bg-zinc-100 rounded-md border border-zinc-300 p-3'>
            <div className="relative flex items-center gap-2">
              <Watch className="h-3 w-3 text-zinc-500" strokeWidth={1.5} />
              <p className="text-tiny text-zinc-500 w-[90%]">Horario: <span className="font-bold">{project?.schedule}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <Hammer className="h-3 w-3 text-zinc-500" strokeWidth={1.5} />
              <p className="text-tiny text-zinc-500 w-[90%]">Competencias requeridas: <span className="font-bold">{project?.abilities}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <Users2 className="h-3 w-3 text-zinc-500" strokeWidth={1.5} />
              <p className="text-tiny text-zinc-500 w-[90%]">Cupo: <span className="font-bold">{project?.max} estudiantes</span></p>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-3 w-3 text-zinc-500" strokeWidth={1.5} />
              <p className="text-tiny text-zinc-500 w-[90%]">Modalidad: <span className="font-bold">{project?.model}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <span className='ml-5 text-zinc-400 text-xs'>
                {project?.model === 'CLIP | Proyecto Solidario Mixto' ? 'Proyectos mixtos son 75% presencial y 25% virtual' : null}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Map className="h-3 w-3 text-zinc-500" strokeWidth={1.5} />
              <p className="text-tiny text-zinc-500 w-[90%]">Lugar de trabajo: <span className="font-bold">{project?.location}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-zinc-500" strokeWidth={1.5} />
              <p className="text-tiny text-zinc-500 w-[90%]">Duración: <span className="font-bold">{project?.duration}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <PersonStanding className="h-3 w-3 text-zinc-500" strokeWidth={1.5} />
              <p className="text-tiny text-zinc-500 w-[90%]">Población que atiende la organización: <span className="font-bold">{project?.population}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-zinc-500" strokeWidth={1.5} />
              <p className="text-tiny text-zinc-500 w-[90%]">Horas máximas a acréditar: <span className="font-bold">{project?.hours} horas</span></p>
            </div>
          </div>
          {project?.extraComments && (
            <div className="flex py-2 bg-zinc-100 border border-zinc-300 w-full rounded-md">
              <div className='w-full justify-center items-center flex flex-col px-4'>
                <span className='font-bold text-xs pb-2'>Comentarios adicionales</span>
                <p className='text-xs'>{project?.extraComments}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <BackButton />
    </main>
  );
};

