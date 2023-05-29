import create, { SetState } from 'zustand'
interface Error {
  error: boolean
  description: string
}

interface State {
  loadingText: string
  setLoadingText: (newLoadingText: string) => void
  error: Error
  setError: (error: Error) => void
}

export const useStore = create<State>((set: SetState<State>) => ({
  loadingText: '',
  setLoadingText: (newLoadingText: string) => set(() => ({ loadingText: newLoadingText })),

  error: {
    error: false,
    description: ''
  },
  setError: (error: Error) => set(() => ({ error }))
}))
