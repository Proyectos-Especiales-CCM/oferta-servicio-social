'use server'

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * API route to upload images to the project images bucket
 * 
 * @example
 * const formData = new FormData();
 * formData.append('file', file);
 * formData.append('name', 'servicio-logo.webp');
 * const response = await fetch('/api/project-images', {
 *  method: 'POST',
 * body: formData,
 * });
 * 
 * 
 * @param request 
 * @returns 
 */
export async function POST(request: Request) {
  const supabase = createClient();

  // Parsing the request to get the file
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const name_of_file = formData.get('name') as string;

  if (!file || !name_of_file) {
    return NextResponse.json({ error: 'File or name not provided' }, { status: 400 });
  }

  // Uploading the file to the bucket
  const { data, error } = await supabase.storage
    .from('ServicioSocialProjectImages')
    .upload(name_of_file, file);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}