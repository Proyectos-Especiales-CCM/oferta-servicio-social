'use server'

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Get all projects
export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
  if (error) {
    return NextResponse.error()
  }
  return NextResponse.json(data)
}

/**
 * POST method to upload projects
 * An authenticated user is required to upload projects
 * 
 * @example
 * const [projects, setProjects] = React.useState<Project[]>([]);
 * const [newProjects, setNewProjects] = React.useState<Project[]>([]);
 * const uploadProjects = async () => {
 *   const response = await fetch('/api/projects', {
 *     method: 'POST',
 *     body: JSON.stringify(newProjects),
 *   });
 *   if (response.ok) {
 *     setProjects([...projects, ...newProjects]);
 *   } else {
 *     setError('Error uploading projects');
 *   }
 * }
 * 
 * @param request
 * @returns
 *  
 */
export async function POST(request: Request) {
  const requestData = await request.json();
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .insert(requestData)
  if (error) {
    console.error('Error inserting project:', error.message);
    return NextResponse.error();
  }
  return NextResponse.json(data);
}

/**
 * DELETE method to delete projects based on an array of ids
 * An authenticated user is required to delete projects
 * 
 * @example
 * const deleteProjects = async () => {
 *   const response = await fetch('/api/projects', {
 *     method: 'DELETE',
 *     body: JSON.stringify([50,51]),
 *   });
 *   if (response.ok) {
 *     await fetchProjects();
 *   } else {
 *     setError('Error deleting projects');
 *   }
 * }
 * 
 * @param request 
 * @returns 
 */
export async function DELETE(request: Request) {
  const requestData = await request.json();
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .delete()
    .in('id', requestData)
  if (error) {
    console.error('Error deleting projects:', error.message);
    return NextResponse.error();
  }
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  try {
    const requestData = await request.json();
    const { criteria, criteria_value, new_values } = requestData;

    if (!criteria || !criteria_value || !new_values) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
    // Validate new_values is an object
    if (typeof new_values !== 'object') {
      return NextResponse.json({ error: 'Invalid new_values' }, { status: 400 });
    }

    // Validate criteria is a string
    if (typeof criteria !== 'string') {
      return NextResponse.json({ error: 'Invalid criteria' }, { status: 400 });
    }

    // Validate criteria_value is an array
    if (!Array.isArray(criteria_value)) {
      return NextResponse.json({ error: 'Invalid criteria_value' }, { status: 400 });
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .update(new_values)
      .in(criteria, criteria_value);

    if (error) {
      console.error('Error updating project:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}