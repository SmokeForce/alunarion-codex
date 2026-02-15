export async function POST({ request, cookies }) {
    try {
        const { password } = await request.json();

        // Pull the password from the .env file
        const SECRET_PASSWORD = import.meta.env.ADMIN_PASSWORD;

        if (password && password === SECRET_PASSWORD) {
            cookies.set('codex_admin_session', 'authenticated', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7
            });

            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, error: "Incorrect password" }), { status: 401 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: "Bad request" }), { status: 400 });
    }
}