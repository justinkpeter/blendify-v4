import { getToken } from 'next-auth/jwt'
import { NextResponse } from "next/server";

export async function middleware(req){

    // token will exist only if user is logged in
    const token = await getToken({req, secret: process.env.JWT_SECRET})
    const {pathname} = req.nextUrl

    // allow requests if the following is true
    // 1. a request is made for next-auth session & provider fetching
    // 2. token exists (user is logged in)

    if(pathname.includes('/api/auth') || token){
        // open the golden gates and let them through
        return NextResponse.next()
    }

    // redirect them to login if they don't have a token AND are requesting a protected route
    if(!token && pathname !== "/login"){
        return NextResponse.redirect(new URL('/login', req.url))
    }


}

export const config = {
    matcher: '/',
}
