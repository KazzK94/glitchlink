
export { default } from 'next-auth/middleware'

export const config = {
	// El matcher aplica en este caso next-auth/middleware, que redirige al login si el usuario no está autenticado
	matcher: [
		// sintaxis del middleware de NextJS
		'/profile*',
		'/u/:path*',
		'/messages/:path*',
		'/admin/:path*'
	]
}