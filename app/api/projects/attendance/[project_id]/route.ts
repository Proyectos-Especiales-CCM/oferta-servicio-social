'use server';

import { getAttendanceFromProject } from '@/lib/attendace/actions';
import { ProjectAttendance } from '@/lib/types/project/schema';
import { NextResponse } from 'next/server';

/**
 * API route to fetch attendance data for a specific project.
 *
 * This function handles GET requests to retrieve attendance data for a project based on the provided `project_id`.
 * It calls the `getAttendanceFromProject` function to fetch the attendance information and returns it in the response.
 * If an error occurs during data retrieval, it returns a JSON response with an error message and a 500 status code.
 * 
 * @returns {Promise<NextResponse<ProjectAttendance | { error: string }>>} A promise that resolves to a JSON response 
 * containing the attendance data or an error message in case of failure.
 * 
 * @throws {Error} Throws an error if there is a failure while fetching attendance data.
 * 
 * @example
 * // Example of calling the API route
 * fetch('/api/projects/attendance/123')
 *   .then((res) => res.json())
 *   .then((data) => console.log(data))
 *   .catch((err) => console.error('Error fetching attendance data:', err.message)); 
 */
export async function GET(
  request: Request,
  { params }: { params: { project_id: string } }
): Promise<NextResponse<ProjectAttendance | { error: string }>> {
  const { project_id } = params;
  try {
    const projectAdministrators = await getAttendanceFromProject(Number(project_id));
    return NextResponse.json(projectAdministrators);
  } catch (error: any) {
    console.error('Error fetching administered projects for user:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
