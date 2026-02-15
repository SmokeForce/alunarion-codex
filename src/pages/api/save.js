import { Redis } from '@upstash/redis';

// Note: In production, you'd put these in a .env file.
// For now, just paste your specific URL and Token from the Upstash dashboard here.
const redis = new Redis({
    url: import.meta.env.UPSTASH_REDIS_REST_URL,
    token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function POST({ request }) {
    try {
        const body = await request.json();

        // Save the massive JSON object to the cloud under the key 'codex-data'
        await redis.set('alunaria-codex', body);

        return new Response(JSON.stringify({ success: true, message: "Saved to cloud!" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Save Error:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}