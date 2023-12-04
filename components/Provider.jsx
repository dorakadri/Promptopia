"use client"
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Provider = ({children,session}) => {

  return (
    <SessionProvider session={session}>
      
      {children}</SessionProvider>
  )
}

export default Provider