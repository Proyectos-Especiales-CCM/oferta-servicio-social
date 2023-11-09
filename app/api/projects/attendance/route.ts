'use server';

import { getProjectsAdministrators } from '@/lib/attendace/actions';
import { ProjectAdministration } from '@/lib/types/project/schema';
import { NextResponse } from 'next/server';

/**
 * GET method to fetch all projects for the authenticated user.
 *
 * This endpoint fetches all projects from the `socioformadores_projects` table.
 * It is used for retrieving projects managed by the authenticated user.
 *
 * @returns {Promise<NextResponse<ProjectAdministration[] | { error: string }>>} A JSON response of project administrators
 * 
 * @example
 * fetch('/api/projects/attendance')
 *  .then(res => res.json())
 *  .then(data => console.log(data))
 *  .catch(err => console.error(err));
 */
export async function GET(): Promise<NextResponse<ProjectAdministration[] | { error: string }>> {
  try {
    const projectAdministrators = await getProjectsAdministrators();
    return NextResponse.json(projectAdministrators);
  } catch (error: any) {
    console.error('Error fetching administered projects for user:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
