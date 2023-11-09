'use client'

import { getAttendanceFromProject as getAttendanceData } from "@/lib/attendace/actions"
import { useEffect } from "react"

export default function Page(context: any) {

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAttendanceData();
      console.log(data);
    }
    fetchData();
  }, []);
  
  return (
    <h6>Hola, esta es la asistencia del proyecto: {context.params.proyecto}</h6>
  )
};
