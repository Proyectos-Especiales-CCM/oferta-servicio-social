# Proyecto Oferta Servicio Social

## Descripción

Este proyecto es una aplicación web que permite a los alumnos del Tec de Monterrey a encontrar ofertas de servicio social que se adapten a sus necesidades. Se utilizó [Next.js](https://nextjs.org/docs) utilizando App router junto con [Tailwind](https://tailwindcss.com/) para darle estilo a los elementos. También se utilizaron dos librerías de componentes [NextUI](https://nextui.org/docs/guide/introduction) y [shadcn/ui](https://ui.shadcn.com/docs).

## Instalación

Para poder instalar el proyecto, se debe de clonar el repositorio en la carpeta que se desee, para ello se debe de ejecutar el siguiente comando en la terminal:

```bash
git clone 
```

Una vez clonado el repositorio, se debe de instalar las dependencias del proyecto, para ello se debe de ejecutar el siguiente comando en la terminal:

```bash
npm install
```

## Uso

Para poder utilizar el proyecto, se debe de ejecutar el siguiente comando en la terminal:

```bash
npm run dev
```

## Siguientes pasos

### Backend

- [ ] Crear la base de datos para guardar los registros (Recomendación: [Supabase](https://supabase.com/), [PlanetScale](https://planetscale.com/))
- [ ] Crear el backend con una funcionalidad sencilla de CRUD.
- [ ] Restringir el acceso a las funciones de modificación con un login sencillo (Recomendación: [Clerk](https://clerk.com/))
- [ ] Guardar métricas de usuario. (Páginas más visitadas)

### Frontend

- [ ] Optimizar pagina web. Revisar insights con [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=es) Score actual: **56**
- [ ] Arreglar errores de hydration

## Como deployear el código

La aplicación actualmente está hosteada en [Vercel](https://vercel.com/), se necesita una crear una cuenta gratuita para poder subir los cambios.

Para deployear tu propia instancia se necesitan se ejecutan los siguientes comandos:

```bash
npm i -g vercel
```

Para hacer un deploy en development el comando es:

```bash
vercel deploy
```

y para hacer un deploy en producción agregar el tag **--prod**

```bash
vercel --prod
```

Extraído de: [How to Deploy a React Site with Vercel](https://vercel.com/guides/deploying-react-with-vercel#vercel-cli)
