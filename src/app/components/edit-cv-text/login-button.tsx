'use client'
import { useStore } from '@/app/store/store'
import { Button, Subtitle } from '@tremor/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect } from 'react'

export function LoginButton () {
  const { data, status } = useSession()
  const { login, setLogin } = useStore(state => state)
  console.log(data, status)
  console.log(login)
  useEffect(() => {
    if (status === 'authenticated') {
      setLogin({
        user: data.user?.email as string,
        isLogged: true
      })
    }
  }, [status, data, setLogin])

  if (status !== 'authenticated') {
    return (
      <>
        <Button
          onClick={async (event: any) => {
            event.preventDefault()
            await signIn('infojobs')
          }}
          size='xs'
          // disabled={login.isLogged}
        >Iniciar Sesion
        </Button>
      </>
    )
  } else {
    return (
      <>
        <Subtitle>{data.user?.email ?? ''}</Subtitle>
        <Subtitle>{data.user?.name ?? ''}</Subtitle>
        <Button onClick={async () => await signOut()} size='xs'>Cerrar Sesion</Button>
      </>
    )
  }
}
