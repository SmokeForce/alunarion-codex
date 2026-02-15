export async function POST({ cookies }) {
    // Delete the cookie with explicit path matching
    cookies.delete('codex_admin_session', {
        path: '/'
    });

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}