import create, { SetState } from 'zustand'
interface Error {
  error: boolean
  description: string
}
interface Login {
  user: string
  isLogged: boolean
}

interface State {
  loadingText: string
  setLoadingText: (newLoadingText: string) => void

  error: Error
  setError: (error: Error) => void

  login: Login
  setLogin: (error: Login) => void
}

export const useStore = create<State>((set: SetState<State>) => ({
  loadingText: '',
  setLoadingText: (newLoadingText: string) => set(() => ({ loadingText: newLoadingText })),

  error: {
    error: false,
    description: ''
  },
  setError: (error: Error) => set(() => ({ error })),

  login: {
    user: '',
    isLogged: false
  },
  setLogin: (login: Login) => set(() => ({ login }))
}))
