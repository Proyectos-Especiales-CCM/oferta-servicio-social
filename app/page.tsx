"use client"

import { Button } from "@nextui-org/react";
import { LeafyGreen, Sun } from "lucide-react";
import { Suspense } from "react";


function PageContent() {
  return (
    <main className="flex min-h-screen flex-col px-4 lg:px-20 py-10 items-center">
      <h1 className="text-5xl font-bold py-5">Ofertas Servicio Social</h1>
      <div className="flex flex-col md:flex-row md:space-x-10">
        <a className="m-10 p-4 size-80 lg:size-96 rounded border-black border-2 bg-gradient-to-br from-lime-200 to-lime-500" href="/catalogo/?period=verano">
          <div className="flex flex-col items-center h-full justify-between">
            <h2 className="text-2xl font-mono font-bold">VERANO</h2>
            <Sun className="size-32" />
            <Button className="text-small" color="primary" radius="full" size="sm">Ver oferta</Button>
          </div>
        </a>
        <a className="m-10 p-4 size-80 lg:size-96 rounded border-black border-2 bg-gradient-to-br from-orange-200 to-orange-500" href="/catalogo/?period=ago-dic">
          <div className="flex flex-col items-center h-full justify-between">
            <div className="relative text-center font-mono">
              <span className="text-tiny absolute bottom-12 left-28">OTOÑO</span>
              <h2 className="text-2xl font-bold">AGOSTO</h2>
              <div className="border-t border-1.5 border-black w-full" />
              <h2 className="text-2xl font-bold">DICIEMBRE</h2>
            </div>
            <LeafyGreen className="size-32" />
            <Button className="text-small" color="primary" radius="md" size="sm">Ver oferta</Button>
          </div>
        </a>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
