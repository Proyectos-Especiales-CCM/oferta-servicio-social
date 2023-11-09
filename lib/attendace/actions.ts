'use server'

import { createClient } from '@/lib/supabase/server';
import { AttendanceDate, ProjectAdministration, ProjectAttendance, Student } from '@/lib/types/project/schema';

/**
 * Fetch all projects for the authenticated user.
 *
 * This function fetches all projects from the `socioformadores_projects` table.
 * It is used for retrieving projects managed by the authenticated user.
 *
 * @returns {Promise<ProjectAdministration[]>} A promise that resolves with an array of project administrators.
 * @throws {Error} Throws an error if the project data retrieval fails.
 * 
 * @example
 * getProjectsAdministrators()
 *  .then(data => console.log(data))
 *  .catch(err => console.error('Failed to fetch project administrators:', err.message));
 */
export async function getProjectsAdministrators(): Promise<ProjectAdministration[]> {
  const supabase = createClient();

  // Fetch projects by user_id
  const { data, error } = await supabase
    .from('socioformadores_projects')
    .select('*');

  if (error) {
    console.error('Error fetching administered projects for user:', error.message);
    throw new Error(`Error fetching administered projects for user: ${error.message}`);
  }

  // Explicitly cast the data to ProjectAdministration[]
  return data as ProjectAdministration[];
};

/**
 * Fetches student and attendance data for a specific project.
 *
 * This function retrieves students associated with a specified project ID from the `students_projects` table
 * and attendance data from the `students_attendance` table. It processes the fetched attendance data
 * by grouping it by attendance date and mapping students to each date.
 *
 * @param {number} project_id - The ID of the project to fetch students and attendance data for.
 * @returns {Promise<ProjectAttendance>} A promise that resolves to an object containing the project ID, 
 * all students, and attendance data grouped by date.
 * 
 * @throws {Error} Throws an error if there's an issue fetching the students or attendance data from the database.
 * 
 * @example
 * getData(123)
 *   .then((data) => console.log(data))
 *   .catch((err) => console.error('Error fetching project data:', err.message));
 */
export async function getAttendanceFromProject(project_id: number): Promise<ProjectAttendance> {
  const supabase = createClient();

  // Fetch students for the specified project_id
  const { data: allStudentsData, error: allStudentsError } = await supabase
    .from('students_projects')
    .select('student_id')
    .eq('project_id', project_id);

  if (allStudentsError) {
    console.error('Error fetching students for project:', allStudentsError.message);
    throw new Error(`Error fetching students for project: ${allStudentsError.message}`);
  }

  const students: Student[] = allStudentsData.map((student) => ({
    id: student.student_id
  }));

  const { data: datesData, error: datesError } = await supabase
    .from('students_attendance')
    .select('*')
    .order('date', { ascending: true });

  if (datesError) {
    console.error('Error fetching attendance dates for project:', datesError.message);
    throw new Error(`Error fetching attendance dates for project: ${datesError.message}`);
  }

  const tempDates: AttendanceDate[] = datesData.reduce((acc: AttendanceDate[], attendance) => {
    const existingDate = acc.find((dateObj) => dateObj.date === attendance.date);

    if (existingDate) {
      // If the date already exists, add the student to that date
      existingDate.students.push({ id: attendance.student_id });
    } else {
      // If it's a new date, create a new entry
      acc.push({
        date: attendance.date,
        students: [{ id: attendance.student_id }]
      });
    }
    return acc;
  }, []);

  const parsedData: ProjectAttendance = {
    id: Number(project_id),
    allStudents: students,
    dates: tempDates
  };

  return parsedData;
};

export async function addAttendance(formData: FormData) {
  const supabase = createClient()

  const data = {
    project_id: formData.get('project_id') as string,
    student_id: formData.get('student_id') as string,
  }
  
  const { data: response, error } = await supabase.from('students_attendance').insert(data).select()
  
  if (error) {
    throw new Error('Error al añadir la asistencia')
  }
  
  return response
}

export async function removeAttendance(formData: FormData) {
  const supabase = createClient()
  
  const data = {
    project_id: formData.get('project_id') as string,
    student_id: formData.get('student_id') as string,
    created_at: formData.get('date') as string,
  }

  const { data: response, error } = await supabase.from('students_attendance').delete().match(data).select()

  if (error) {
    throw new Error('Error al eliminar la asistencia')
  }

  return response
}
