import { ChangePasswordForm, AddAdminForm, DeleteAdminForm } from '@/components/account'
import { AdminProfile, User } from '@/lib/types/users/schema'
import { createClient } from '@/lib/supabase/server'

export default async function Account() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: fetchedAdmins, error } = await supabase
    .from('admin_profiles')
    .select('*') as { data: AdminProfile[], error: any }

  return (
    <div className='p-6 flex flex-col items-center'>
      <h1 className='text-4xl font-bold'>Tu Perfil</h1>
      <span className='font-semibold mt-2'>Correo electrónico: </span><span>{user?.email}</span>

      <h3 className='text-xl font-semibold mt-2'>Cambiar contraseña</h3>
      <ChangePasswordForm />

      {!error && fetchedAdmins && fetchedAdmins.length > 0 && (
        <>
          <h3 className='text-xl font-semibold mt-20 mb-2'>Administradores</h3>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 w-4/5 max-h-52 overflow-y-scroll border-1 rounded p-2'>
            {fetchedAdmins.map((admin, index) => (
              <span key={admin.id} className='truncate'><b>{index + 1}.</b> {admin.email}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className='p-4 rounded border-1'>
              <h3 className='text-xl font-semibold mt-4'>Añadir un nuevo administrador</h3>
              <AddAdminForm />
            </div>
            <div className='p-4 rounded border-1'>
              <h3 className='text-xl font-semibold mt-4'>Eliminar a un administrador</h3>
              <DeleteAdminForm />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
