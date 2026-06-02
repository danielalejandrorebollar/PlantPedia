import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export const  setLanguageCookie  = ( res: NextApiResponse ,locale:string):void =>{
  
  const serializedCookie = serialize('NEXT_LOCALE', locale, {
    httpOnly: true, // Mayor seguridad contra ataques XSS
    // secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 semana en segundos
    path: '/',
  });
  res.setHeader('Set-Cookie', serializedCookie);
}

const DEFAULT_LOCALE = 'es'

const PREFERRED_LOCALE_COOKIE = 'NEXT_LOCALE'

// Este es el manejador por defecto de la API Route
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  // 1. Validar que el método sea POST (buena práctica para modificar datos/cookies)
  
  if (req.method === 'GET') {
    // return res.status(405).json({ message: 'Método no permitido' });
    const preferredLocale = req.cookies[PREFERRED_LOCALE_COOKIE] || ''

    return res.status(200).json({
      preferredLocale,
      defaultLocale:DEFAULT_LOCALE
    })
  }

  // 2. Obtener el idioma enviado desde el frontend (ej. { "locale": "en" })
  const newLocale  = req.body.locale as string;

  if (!newLocale) {
    return res.status(400).json({ message: 'Falta el parámetro locale' });
  }

  // 3. Ejecutar tu función pasando el objeto 'res' recibido por defecto
  setLanguageCookie(res, newLocale);

  // 4. Responder al cliente que todo salió bien
  // res.redirect('/') 
  // return res.end()
  return res.status(200).json({ success: true, newLocale });
}