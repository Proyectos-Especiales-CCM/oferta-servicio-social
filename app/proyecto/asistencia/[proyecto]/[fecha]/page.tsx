export default function Page(context: any) {
  return (
    <>
      <span>Hola, esta es la asistencia del proyecto: {context.params.proyecto}</span>
      <span>Para el día: {context.params.fecha}</span>
    </>
  )
};