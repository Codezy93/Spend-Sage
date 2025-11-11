import { NextResponse } from 'next/server';


export function proxy(req) {
    const isProtected = req.nextUrl.pathname.startsWith('/dashboard');
    const hasSession = req.cookies.get('ss_session');
    if (isProtected && !hasSession) {
        const url = new URL('/auth/login', req.url);
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = { matcher: ['/dashboard'] };