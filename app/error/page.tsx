'use client'

import { useSearchParams } from "next/navigation"

export default function ErrorPage() {
    const searchParams = useSearchParams()
    const code = searchParams.get('code')

    const erros: { [key: string]: string } = {
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        500: 'Internal Server Error',
        over_email_send_rate_limit: 'Se ha superado el límite de envío de correos electrónicos',
    }

    return (
        <div className="p-6">
            <p className="text-2xl font-bold">Lo sentimos, ha ocurrido un error.</p>
            {code && <p>Error: {erros[code]}</p>}
            {!code && <p>Unknown error</p>}
        </div>
    )
}
