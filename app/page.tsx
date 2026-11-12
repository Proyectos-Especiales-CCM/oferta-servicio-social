
"use client";

import { Button } from "@nextui-org/react";
import { Flower, Snowflake } from "lucide-react";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col px-4 lg:px-20 py-10 items-center">
      <h1 className="text-5xl font-bold py-5">
        Ofertas Servicio Social
      </h1>

      <div className="flex flex-col md:flex-row md:space-x-10">
        {/* Enero - Junio 2027 */}
        <a
          className="m-10 p-4 size-80 lg:size-96 rounded border-black border-2 bg-gradient-to-br from-pink-200 to-pink-500"
          href="/catalogo/?period=feb-jun"
        >
          <div className="flex flex-col items-center h-full justify-between">
            <div className="text-center font-mono">
              <h2 className="text-2xl font-bold">FEBRERO - JUNIO</h2>
              <h3 className="text-xl font-bold">2027</h3>
            </div>

            <Flower className="size-32" />

            <Button color="primary" radius="md" size="sm">
              Ver oferta
            </Button>
          </div>
        </a>

        {/* Invierno 2027 */}
        <a
          className="m-10 p-4 size-80 lg:size-96 rounded border-black border-2 bg-gradient-to-br from-sky-200 to-sky-500"
          href="/catalogo/?period=invierno"
        >
          <div className="flex flex-col items-center h-full justify-between">
            <div className="text-center font-mono">
              <h2 className="text-2xl font-bold">INVIERNO</h2>
              <h3 className="text-xl font-bold">2027</h3>
            </div>

            <Snowflake className="size-32" />

            <Button color="primary" radius="md" size="sm">
              Ver oferta
            </Button>
          </div>
        </a>
      </div>
    </main>
  );
}
