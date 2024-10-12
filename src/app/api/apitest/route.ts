
export async function GET() {
    console.log('API Route - getuser called');
    return Response.json({ message: 'Hello from getuser' }, { status: 200 });
}