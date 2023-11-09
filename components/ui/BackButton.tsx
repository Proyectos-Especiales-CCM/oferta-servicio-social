"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';

export default function BackButton() {

  const router = useRouter()

  return (
    <div className="flex justify-center items-center w-full mt-10 md:mt-20">
      <Button variant='secondary' className='text-tiny flex flex-row gap-1 hover:bg-secondary/50' onClick={() => router.back()}>
        <Undo2 className='w-3 h-3 text-zinc-500 mr-1' />
        Regresar
      </Button>
    </div>
  )
}
