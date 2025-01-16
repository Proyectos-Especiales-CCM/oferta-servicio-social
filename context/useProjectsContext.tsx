import { useContext } from "react";
import { ProjectsContext } from "./ProjectsContext";

export const useProjectsContext = () => {
  
     const context = useContext(ProjectsContext);
  
     if (context === undefined) {
      throw new Error('ProjectsContext must be used within a ProjectsProvider');
     }
  
     return context;
};