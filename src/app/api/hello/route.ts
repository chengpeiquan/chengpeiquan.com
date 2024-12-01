export async function GET() {
  const data = {
    HELLO: process.env.NEXT_PUBLIC_HELLO,
    WORLD: process.env.NEXT_PUBLIC_WORLD,
    HELLO_WORLD: process.env.NEXT_PUBLIC_HELLO_WORLD,
    __HELLO_WORLD: process.env.HELLO_WORLD,
  }

  return Response.json({
    data,
  })
}
