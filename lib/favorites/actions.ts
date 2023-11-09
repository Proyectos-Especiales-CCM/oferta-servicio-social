'use server'

import { createClient } from '../supabase/server'

export async function addToFavorites(formData: FormData) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    const data = {
        project_id: formData.get('project_id') as string,
        user_id: user?.id as string,
    }

    const { data: response, error } = await supabase.from('favorites_projects').insert(data).select()

    if (error) {
        throw new Error('Error al agregar a favoritos')
    }

    return response
}

export async function removeFromFavorites(formData: FormData) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    const data = {
        project_id: formData.get('project_id') as string,
        user_id: user?.id as string,
    }

    const { data: response, error } = await supabase.from('favorites_projects').delete().match(data).select()

    if (error) {
        throw new Error('Error al eliminar de favoritos')
    }

    return response
}
