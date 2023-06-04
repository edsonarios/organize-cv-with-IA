'use client'
import { useStore } from '@/app/store/store'
import { Button, Subtitle } from '@tremor/react'
import { useSession, signIn, signOut } from 'next-auth/react'

export function LoginButton () {
  const { data, status } = useSession()
  const setLogin = useStore(state => state.setLogin)
  console.log(data)

  if (status !== 'authenticated') {
    return (
      <>
        <Button
          onClick={async (e) => {
            e.preventDefault()
            await signIn()
          }}
          size='xs'
        >Iniciar Sesion
        </Button>
      </>
    )
  } else {
    console.log(data)
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
