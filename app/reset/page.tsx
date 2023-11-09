'use client'

import { resetPassword } from "@/lib/auth/actions"

export default function Page() {

  const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await resetPassword(formData);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl">Restablecer contraseña</h1>
      <form className="flex flex-col" id="reset-password-form" onSubmit={handleResetPassword}>
        <input className="border-1 border-slate-400 rounded m-1 px-2 h-8 max-w-96" type="email" placeholder="ejemplo@tec.mx" id="email" name="email"/>
        <button className="m-1 self-end px-4 py-2 inline-flex items-center justify-center rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90" type="submit">Enviar</button>
      </form>
    </div>
  )
}
