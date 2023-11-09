"use client"

import { columns } from '@/components/admin/columns';
import { DataTable } from "@/components/table/data-table";
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal';
import { createClient } from '@/lib/supabase/client';
import { Project } from '@/lib/types/project/schema';
import { RefreshCcw, EyeOffIcon, Trash2, Upload, Sheet } from "lucide-react";
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';


type Row = Array<string | number | boolean | null>;

const AdminPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [newProjects, setNewProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFunction, setModalFunction] = useState<(() => void) | null>(null);

  /**
   * Reads an excel file and parses it into a list of projects
   * 
   * @param file The excel file to read
   * 
   * @returns A promise that resolves with the list of projects
   * 
   * @example
   * <input
   *   type="file"
   *   onChange={(e) => {
   *     if (!e.target.files) return;
   *     const file = e.target.files[0];
   *     readExcel(file);
   *   }}
   * />
   */
  const readExcel = (file: File) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        if (!e.target) return;
        // Get the data from the file
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data: Row[] = XLSX.utils.sheet_to_json(ws, { header: 1 });

        // Obtain the indexes of the columns by their headers
        const headers = data[0];
        const organizationIndex = headers.indexOf('Nombre oficial de la Organización Socio Formadora');
        const populationIndex = headers.indexOf('Población que atiende la organización');
        const titleIndex = headers.indexOf('Nombre del Proyecto Solidario');
        const objectiveIndex = headers.indexOf('Objetivo del Proyecto');
        const descriptionIndex = headers.indexOf('Actividades a realizar');
        const scheduleIndex = headers.indexOf('Horario');
        const tagsIndex = headers.indexOf('Carreras');
        const abilitiesIndex = headers.indexOf('Habilidades o competencias requeridas');
        const maxIndex = headers.indexOf('Cupo');
        const modelIndex = headers.indexOf('Modalidad');
        const locationIndex = headers.indexOf('Lugar de trabajo');
        const durationIndex = headers.indexOf('Duración de la experiencia');
        const hoursIndex = headers.indexOf('Posibles horas a acréditar');
        const groupIndex = headers.indexOf('Grupo');
        const keyIndex = headers.indexOf('Clave materia');
        const extraCommentsIndex = headers.indexOf('Comentarios adicionales');

        // Parse the data
        const filteredData = data.slice(1).map(row => ({
          organization: row[organizationIndex],
          population: row[populationIndex],
          title: row[titleIndex],
          objective: row[objectiveIndex],
          description: row[descriptionIndex],
          schedule: row[scheduleIndex],
          tags: row[tagsIndex],
          abilities: row[abilitiesIndex],
          max: row[maxIndex],
          model: row[modelIndex],
          location: row[locationIndex],
          duration: row[durationIndex],
          hours: row[hoursIndex],
          group: row[groupIndex],
          groupKey: row[keyIndex],
          extraComments: row[extraCommentsIndex],
          status: 'visible',
        }));

        resolve(filteredData);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setNewProjects(d as Project[]);
    });
  };

  const fetchProjects = async () => {
    const supabase = createClient();
    let { data: fetchedProjects, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: false });
    if (error) setError(error.message);
    else if (fetchedProjects) {
      setProjects(fetchedProjects);
    }
  };

  const uploadProjects = async () => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(newProjects),
    });
    if (response.ok) {
      await fetchProjects();
    } else {
      setError('Error uploading projects');
    }
  };

  const deleteProjects = async () => {
    const projectsIds = projects.map(project => project.id);
    const response = await fetch('/api/projects', {
      method: 'DELETE',
      body: JSON.stringify(projectsIds),
    });
    if (response.ok) {
      await fetchProjects();
    } else {
      setError('Error deleting projects');
    }
  };

  const hideAllProjects = async () => {
    const payload = {
      criteria: 'status',
      criteria_value: ['visible'],
      new_values: { status: 'hidden' },
    };

    await fetch('/api/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (response.ok) {
        fetchProjects();
      } else {
        setError('Error hiding projects');
      }
    });
  };

  const setModalFunToHideAllProjects = () => {
    setModalFunction(() => hideAllProjects);
    setModalOpen(true);
  };

  const setModalFunToDeleteAllProjects = () => {
    setModalFunction(() => deleteProjects);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-6xl font-bold font-sans'>Administración de Proyectos</h1>
      <div className='flex flex-wrap justify-between gap-4 my-6'>
        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={(e) => {
            if (!e.target.files) return;
            const file = e.target.files[0];
            readExcel(file);
            setFileName(file.name);
          }}
        />
        <label
          htmlFor="file-input"
          className="bg-green-600 text-white hover:bg-green-600/80 py-2 px-4 rounded cursor-pointer flex items-center"
        >
          <Sheet className='mr-2' size={16}/>Leer archivo de Excel
        </label>
        {fileName ? 
          (<span className='self-center border-b-1'>{fileName}</span>) :
          (<span className='self-center border-b-1'>Ningún archivo seleccionado</span>)
        }
        <Button variant='default' className='text-white' onClick={uploadProjects}>
          <Upload className='mr-2' size={16} /> Subir {newProjects.length} nuevos proyectos
        </Button>
        <Button variant='destructive' className='text-white' onClick={setModalFunToDeleteAllProjects}>
          <Trash2 className='mr-2' size={16} /> Eliminar todos los proyectos
        </Button>
        <Button variant='default' className='text-white' onClick={setModalFunToHideAllProjects}>
          <EyeOffIcon className='mr-2' size={16} /> Ocultar todos los proyectos
        </Button>
        <Button variant='default' className='text-white' onClick={fetchProjects}>
          <RefreshCcw className='mr-2' size={16} /> Recargar proyectos
        </Button>
      </div>
      {error && <p>Error: {error}</p>}
      {projects.length > 0 ? (
        <DataTable data={projects} columns={columns} />
      ) : (
        <p>No projects found</p>
      )}
      <Modal className='flex flex-col gap-6' open={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className='text-lg font-bold'>¡Atención!</h3>
        <span>Esta acción puede tener un gran impacto en los datos almacenados.</span>
        <div className='flex flex-wrap justify-between'>
          <Button variant='secondary' onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button variant='destructive' className='text-white' onClick={() => {
            modalFunction && modalFunction();
            setModalOpen(false);
          }}>
            Continuar
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminPage;
