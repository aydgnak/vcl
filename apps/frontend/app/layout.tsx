export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        Root Layout
        {children}
      </body>
    </html>
  )
}
