"use client"
import ModifyProjectPanel from "@/components/admin/ModifyProjectPanel";
import { createClient } from "@/lib/supabase/client";
import { Project } from "@/lib/types/project/schema";
import { useEffect, useState } from "react";
import BackButton from "@/components/ui/BackButton";

export default function Page(context: any) {
  const [project, setProject] = useState<Project>();
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async (id: string) => {
    const supabase = createClient();
    let { data: fetchedProject, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id);
    if (error) setError(error.message);
    else if (fetchedProject) {
      setProject(fetchedProject[0]);
    }
  };

  useEffect(() => {
    const id = context.params.project;
    fetchProject(id);
  }, [context.params.project]);

  return (
    <div className="p-6">
      {project ? (
        <>
          <ModifyProjectPanel originProject={project} />
          <BackButton />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
} 
