import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// исполняется на сервере, работает до рендера страниц

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl; //about
    const token = await getToken({
        req:request,
        secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    }); //извлекает jwt доступ из куки, 
    // валидирует (происходит проверка подписи, проверка срока действия токена)
     console.log('Token in middleware:', token );

    const protectedRoutes = ['/ingredients', '/recipes/new', '/recipes/:path*']
    
    if (protectedRoutes.some((route)=> pathname.startsWith(route.replace(':path','')))) {
        
        // начинается ли наш pathname с одного из путей в массиве защищенных путей. 
        // Если наш путь начинается с защищенного пути, а это значит,
        // что пользователь пытается зайти на страницу, которая доступна только 
        // авторизованным пользователям, в таком случае мы проверяем наличие токена. 
        // Если в куках отсутсвует токен, то пользователь не авторизован 
        if (!token) {
            const url = new URL('/error', request.url)
            url.searchParams.set('message','Недостаточно прав');
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/ingredients', '/recipes/new', '/recipes/:path*'] // matcher указывает к каким маршрутам приминяется middleware
}