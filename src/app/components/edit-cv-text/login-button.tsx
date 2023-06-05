'use client'
import { useStore } from '@/app/store/store'
import { Button, Subtitle } from '@tremor/react'
import { useSession, signIn, signOut } from 'next-auth/react'

export function LoginButton () {
  const { data, status } = useSession()
  const { login, setLogin } = useStore(state => state)
  console.log(data, status)
  console.log(login)
  if (status !== 'authenticated') {
    return (
      <>
        <Button
          onClick={async (event: any) => {
            event.preventDefault()
            await signIn('infojobs')
          }}
          size='xs'
          // disabled={login}
        >Iniciar Sesion
        </Button>
      </>
    )
  } else {
    setLogin({
      user: data.user?.email as string,
      isLogged: true
    })
    return (
      <>
        <Subtitle>{data.user?.email ?? ''}</Subtitle>
        <Subtitle>{data.user?.name ?? ''}</Subtitle>
        <Button onClick={async () => await signOut()} size='xs'>Cerrar Sesion</Button>
      </>
    )
  }
}
