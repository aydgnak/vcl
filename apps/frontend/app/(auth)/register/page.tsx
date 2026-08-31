import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kayıt Ol',
}

export default function RegisterPage() {
  return (
    <div>
      Register Page

      <br></br>
      <br></br>

      <Link href="/login">Login</Link>
    </div>
  )
}
