import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let base: string = `
    <!doctype html>
    <html>
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    
    <body class="bg-white">
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>
    </body>
    
    </html>
  `
  const response = new NextResponse(base)

  // There is no content-type by default!
  response.headers.set('Content-Type', 'text/html; charset=utf-8')

  // set response headers, cookies, etc, if desired
  return response;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/preview',
}