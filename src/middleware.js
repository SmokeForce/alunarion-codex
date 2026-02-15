import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
    const { url, cookies, redirect } = context;

    // We only want to protect the /admin page and the /api/save endpoint
    if (url.pathname.startsWith('/admin') || url.pathname === '/api/save') {

        // Check if our secret cookie exists
        const authCookie = cookies.get('codex_admin_session');

        if (authCookie?.value !== 'authenticated') {
            // No cookie? Kick them to the login page!
            // If they tried to hit the API directly, return an unauthorized error
            if (url.pathname === '/api/save') {
                return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
            }
            return redirect('/login');
        }
    }

    // If they have the cookie (or aren't on an admin route), let them through
    return next();
});