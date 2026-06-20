import React, { createContext, useContext, useEffect, useState } from 'react';
import { Project, initialProjects } from '../data/projects';
import { loadData, saveData } from '../utils/storage';

type NewProject = Omit<Project, 'id'>;

type ProjectsContextValue = {
  projects: Project[];
  addProject: (project: NewProject) => void;
  removeProject: (id: string) => void;
  resetProjects: () => void;
};

const STORAGE_KEY = 'portfolio_projects';
const ProjectsContext = createContext<ProjectsContextValue | undefined>(undefined);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      const saved = await loadData<Project[]>(STORAGE_KEY);
      if (saved && saved.length > 0) setProjects(saved);
      setLoaded(true);
    }
    loadProjects();
  }, []);

  useEffect(() => {
    if (loaded) saveData(STORAGE_KEY, projects);
  }, [projects, loaded]);

  function addProject(project: NewProject) {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects((current) => [newProject, ...current]);
  }

  function removeProject(id: string) {
    setProjects((current) => current.filter((project) => project.id !== id));
  }

  function resetProjects() {
    setProjects(initialProjects);
  }

  return (
    <ProjectsContext.Provider value={{ projects, addProject, removeProject, resetProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) throw new Error('useProjects musi być użyty wewnątrz ProjectsProvider');
  return context;
}
