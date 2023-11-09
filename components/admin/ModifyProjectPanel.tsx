"use client"

import { createClient } from "@/lib/supabase/client";
import { Project } from "@/lib/types/project/schema";
import { SupabaseImageData } from "@/lib/types/supabase/schema";
import { RefreshCcw } from "lucide-react";
import React, { useEffect } from "react";
import SupabaseImage from "../SupabaseImage";
import './ModifyProjectPanel.css';
import ProjectImageUpload from "./ProjectImageUpload";

const validModels = ['CLIN | Proyecto Solidario en Línea', 'PSP | Proyecto Solidario Presencial'];
const validHours = ['Hasta 60', 'Hasta 120', 'Hasta 180', 'Hasta 200']
const validDuration = ['5 semanas', '10 semanas', '15 semanas'];

interface ModifyProjectPanelProps {
  originProject: Project;
}

export default function ModifyProjectPanel({ originProject }: ModifyProjectPanelProps): React.ReactNode {
  const [images, setImages] = React.useState<SupabaseImageData[]>([]);
  const [project, setProject] = React.useState<Project>(originProject);
  const [openImages, setOpenImages] = React.useState<boolean>(false);

  const verifyModel = (model: string) => {
    return validModels.includes(model);
  };

  const verifyHours = (hours: string) => {
    return validHours.includes(hours);
  };

  const verifyDuration = (duration: string) => {
    return validDuration.includes(duration);
  };

  const handleOpenImages = () => {
    setOpenImages(!openImages);
  };

  const updateProject = async () => {
    const payload = {
      criteria: 'id',
      criteria_value: [project.id],
      new_values: project,
    };

    await fetch('/api/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (response.ok) {
        alert('Project updated successfully');
        //fetchProjects();
      } else {
        alert('Error updating project');
      }
    });
  };

  const setNewImageUrl = (url: string) => {
    setProject({ ...project, image: url });
  };

  const fetchImages = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.storage.from('ServicioSocialProjectImages').list();
    if (error) {
      console.error('Error fetching images:', error.message);
    } else {
      const imagesData = data?.map((image) => {
        const url = supabase.storage.from('ServicioSocialProjectImages').getPublicUrl(image.name).data.publicUrl;
        return { name: image.name, url };
      }) || [];
      setImages(imagesData);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h3 className="text-lg border-b-1">Modificando proyecto <b>{project.id}</b></h3>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <p className="flex gap-2"><b>Título:</b>
          <input className="border-1 w-full rounded px-1 h-6" type="text" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} /></p>
        <p className="flex gap-2"><b>Organización:</b>
          <input className="border-1 w-full rounded px-1 h-6" type="text" value={project.organization} onChange={(e) => setProject({ ...project, organization: e.target.value })} /></p>
        <p className="flex gap-2"><b>Población:</b>
          <input className="border-1 w-full rounded px-1 h-6" type="text" value={project.population} onChange={(e) => setProject({ ...project, population: e.target.value })} /></p>
        <p className="flex gap-2"><b>Objetivo:</b>
          <textarea rows={3} className="border-1 w-full rounded px-1" value={project.objective} onChange={(e) => setProject({ ...project, objective: e.target.value })} /></p>
        <p className="flex gap-2"><b>Descripción:</b>
          <textarea rows={3} className="border-1 w-full rounded px-1" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} /></p>
        <p className="flex gap-2"><b>Horario:</b>
          <input className="border-1 w-full rounded px-1 h-6" type="text" value={project.schedule} onChange={(e) => setProject({ ...project, schedule: e.target.value })} /></p>
        <p className="flex gap-2"><b>Carreras:</b>
          <input className="border-1 w-full rounded px-1 h-6" type="text" value={project.tags} onChange={(e) => setProject({ ...project, tags: e.target.value })} /></p>
        <p className="flex gap-2"><b>Capacidad:</b>
          <input className="border-1 w-full rounded px-1 h-6" type="number" value={project.max} onChange={(e) => setProject({ ...project, max: parseInt(e.target.value) })} /></p>
        <div>
          {!verifyModel(project.model) ?
            <p className="text-red-500">El modelo actual no es válido, por favor seleccione una de las opciones válidas y después actualice el proyecto.</p> : null}
          <p className="flex gap-2"><label htmlFor="model"><b>Modelo:</b></label>
            <select className="w-full border-1 rounded" name="model" id="model" value={project.model} onChange={(e) => setProject({ ...project, model: e.target.value })}>
              <option value="CLIN | Proyecto Solidario en Línea">CLIN | Proyecto Solidario en Línea</option>
              <option value="PSP | Proyecto Solidario Presencial">PSP | Proyecto Solidario Presencial</option>
            </select></p></div>
        <p className="flex gap-2"><b>Lugar:</b>
          <input className="border-1 w-full rounded px-1 h-6" type="text" value={project.location} onChange={(e) => setProject({ ...project, location: e.target.value })} /></p>
        <div>
          {!verifyDuration(project.duration) ?
            <p className="text-red-500">La duración introducida no es válida, por favor seleccione una de las opciones válidas y después actualice el proyecto.</p> : null}
          <p className="flex gap-2"><label htmlFor="duration"><b>Duración:</b></label>
            <select className="w-full border-1 rounded" name="duration" id="duration" value={project.duration} onChange={(e) => setProject({ ...project, duration: e.target.value })}>
              <option value="5 semanas">5 semanas</option>
              <option value="10 semanas">10 semanas</option>
              <option value="15 semanas">15 semanas</option>
            </select></p></div>
        <div>
          {!verifyHours(project.hours) ?
            <p className="text-red-500">Las horas introducidas no son válidas, por favor seleccione una de las opciones válidas y después actualice el proyecto.</p> : null}
          <p className="flex gap-2"><label htmlFor="hours"><b>Horas:</b></label>
            <select className="w-full border-1 rounded" name="hours" id="hours" value={project.hours} onChange={(e) => setProject({ ...project, hours: e.target.value })}>
              <option value="Hasta 60">Hasta 60</option>
              <option value="Hasta 120">Hasta 120</option>
              <option value="Hasta 180">Hasta 180</option>
              <option value="Hasta 200">Hasta 200</option>
            </select></p></div>
        <p className="flex gap-2"><b>Grupo:</b>
          <input className="border-1 w-full rounded px-1 h-6" type="number" value={project.group} onChange={(e) => setProject({ ...project, group: parseInt(e.target.value) })} /></p>
        <p className="flex gap-2"><b>Clave:</b>
          <input className="border-1 w-full rounded px-1 h-6" type="text" value={project.groupKey} onChange={(e) => setProject({ ...project, groupKey: e.target.value })} /></p>
        <p className="flex gap-2"><b>Comentarios adicionales:</b>
          <textarea rows={3} className="border-1 w-full rounded px-1" value={project.extraComments} onChange={(e) => setProject({ ...project, extraComments: e.target.value })} /></p>
        <p className="flex gap-2 items-center"><label htmlFor="status"><b>Estado:</b></label>
          <select className="w-full border-1 rounded" name="status" id="status" value={project.status} onChange={(e) => setProject({ ...project, status: e.target.value })}>
            <option value="hidden">Hidden</option>
            <option value="visible">Visible</option>
          </select></p>
      </div>
      <p className="flex items-center gap-4">
        <b>Imagen:</b> <SupabaseImage imageName={project.image} className="max-h-20" />
      </p>

      {
        openImages && (
          <div className="bg-slate-100 rounded p-2">
            <div className="flex gap-4 items-center my-2">
              <h3 className="text-lg">Lista de todas las imagenes disponibles</h3>
              <button className="border-1 shake rounded-lg p-1 hover:bg-slate-300" onClick={() => fetchImages()} ><RefreshCcw size={20} /></button>
            </div>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {images.map((image) => (
                <li key={image.name} onClick={() => setNewImageUrl(image.name)} className="flex justify-center items-center cursor-pointer p-2 border-1 rounded-lg hover:bg-slate-300 transition-colors">
                  <SupabaseImage imageName={image.name} className="w-52" />
                </li>
              ))}
            </ul>
          </div>
        )
      }
      <div className="flex gap-4 mt-2 items-end">
        <ProjectImageUpload />
        <button onClick={handleOpenImages} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded text-sm h-fit">{openImages ? 'Cerrar' : 'Ver imágenes'}</button>
        <button onClick={updateProject} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded ml-auto">Actualizar proyecto</button>
      </div>
    </div >
  );
}
