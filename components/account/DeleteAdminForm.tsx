'use client'

import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import { deleteAdmin } from '@/lib/auth/actions'

export default function DeleteAdminForm() {
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent default and reset error and success states
    event.preventDefault()
    setError('')
    setSuccess(false)
    // Send form data to changePassword function
    const formData = new FormData(event.currentTarget)
    await deleteAdmin(formData)
    .then(() => {
      setSuccess(true)
      // Reset form values
      if (formRef.current) {
        formRef.current.reset()
      }
    })
    .catch((error) => {
      setError(error.message)
    })
  }

  return (
    <form ref={formRef} className='flex flex-col gap-4 py-2' onSubmit={handleSubmit}>
      <input className='border-1 rounded px-2 max-w-96 h-8' type='text' placeholder='Correo electrónico' id='email-delete' name='email' />
      {success && <span className='self-center text-sm text-green-500'>Administrador eliminado con éxito</span>}
      {error && <span className='self-center text-sm text-red-500'>{error}</span>}
      <Button variant='destructive' className='self-end' type='submit'>Eliminar administrador</Button>
    </form>
  )
}
