export async function GET() {
  const data = {
    NEXT_PUBLIC_HELLO: process.env.NEXT_PUBLIC_HELLO,
    NEXT_PUBLIC_WORLD: process.env.NEXT_PUBLIC_WORLD,
    NEXT_PUBLIC_HELLO_WORLD: process.env.NEXT_PUBLIC_HELLO_WORLD,
    HELLO_WORLD: process.env.HELLO_WORLD,
  }

  return Response.json({
    data,
  })
}
