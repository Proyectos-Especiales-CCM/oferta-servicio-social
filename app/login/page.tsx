'use client';

import { Button } from "@/components/ui/button";
import { login, signup } from "@/lib/auth/actions";
import Link from "next/link";
import React, { useState } from 'react';

export default function ClientForm() {
  const [error, setError] = useState<string>('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    setError('');
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await login(formData).catch((error) => { setError(error.message); });
  };

  const handleSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = new FormData((event.currentTarget.closest('form') as HTMLFormElement));
    await signup(formData).catch((error) => { setError(error.message); }); 
  };

  return (
    <form className="flex flex-col p-6" onSubmit={handleLogin}>
      <label className="text-lg font-bold pl-2" htmlFor="email">Correo:</label>
      <input className="border-1 border-slate-400 rounded m-1 px-2 h-8" id="email" name="email" type="email" required />
      <label className="text-lg font-bold pl-2" htmlFor="password">Contraseña:</label>
      <input className="border-1 border-slate-400 rounded m-1 px-2 h-8" id="password" name="password" type="password" required />
      <div className="flex justify-between">
        <Link href="/reset" className="text-sm text-gray hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
      <div className="flex flex-wrap justify-between mt-2">
        <Button variant="secondary" onClick={handleSignup} type="button">Registrar</Button>
        <Button variant="default" type="submit">Iniciar sesión</Button>
      </div>
    </form>
  );
}
