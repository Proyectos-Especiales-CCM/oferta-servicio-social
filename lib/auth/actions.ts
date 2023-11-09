'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) { throw new Error('Verifica tus credenciales') }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error.message)
    if (error.message.includes('already exists')) {
      throw new Error('El correo ya está registrado')
    } else if (error.message.includes('valid email')) {
      throw new Error('Ingresa un correo válido')
    } else if (error.message.includes('password')) {
      throw new Error('La contraseña debe tener al menos 6 caracteres')
    } else if (error.message.includes('email_not_confirmed')) {
      throw new Error('Confirma tu correo electrónico')
    } else if (error.message.includes('Email rate limit exceeded')) {
      throw new Error('Demasiados intentos, intenta más tarde')
    }
  }
  revalidatePath('/', 'layout')
  redirect('/auth/checkinbox')
}

export async function resetPassword(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string

  const { data, error } = await supabase.auth
    .resetPasswordForEmail(email)

  if (error) {
    redirect(`/error?code=${error.code}`)
  }

  revalidatePath('/', 'layout')
  redirect('/reset/success')
}

export async function changePassword(formData: FormData) {
  const supabase = createClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) { throw new Error('Las contraseñas no coinciden') }
  if (password.length < 6) { throw new Error('La contraseña debe tener al menos 6 caracteres') }

  const { data, error } = await supabase.auth.updateUser({ password: password })

  if (error) { throw new Error(error.message) }

  return data
}

export async function addAdmin(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string

  const { data: matchingUser, error: fetchUserError } = await supabase
    .from('users')
    .select('id, email')
    .eq('email', email)
    .single()

  if (fetchUserError) { throw new Error('Error al buscar el usuario') }
  if (!matchingUser) { throw new Error('Usuario no encontrado') }

  const { data, error: insertError } = await supabase
    .from('admin_profiles')
    .insert({ id: matchingUser.id, email: matchingUser.email })

  if (insertError) { throw new Error('Error al agregar el usuario') }

  return data
}

export async function deleteAdmin(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string

  const { data, error } = await supabase
    .from('admin_profiles')
    .delete()
    .eq('email', email)

  if (error) { throw new Error('Error al eliminar el usuario') }

  return data
}
