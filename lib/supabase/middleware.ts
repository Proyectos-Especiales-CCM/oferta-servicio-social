import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { AdminProfile } from '../types/users/schema'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    (
      request.nextUrl.pathname.startsWith('/favoritos') ||
      request.nextUrl.pathname.startsWith('/admin') ||
      request.nextUrl.pathname.startsWith('/account') ||
      request.nextUrl.pathname.startsWith('/api')
    )
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  } else if (user) {
    // user is logged in, potentially respond by redirecting the user to the dashboard
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
      const url = request.nextUrl.clone()
      url.pathname = '/account'
      return NextResponse.redirect(url)
    } else if (request.nextUrl.pathname === '/admin') {
      // Get the list of the admin profiles
      const { data: fetchedAdmins, error } = await supabase
        .from('admin_profiles')
        .select('*') as { data: AdminProfile[], error: any }
      if (error || fetchedAdmins.length === 0 || !fetchedAdmins.find(admin => admin.email === user.email)) {
        // If there are no admin profiles or a match, redirect to the error page
        const url = request.nextUrl.clone()
        url.pathname = '/error'
        url.searchParams.set('code', '403')
        return NextResponse.redirect(url)
      }
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}