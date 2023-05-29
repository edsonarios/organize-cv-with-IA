import { useStore } from '@/app/store/store'
import { Snackbar, Alert } from '@mui/material'

export const ErrorSnackbar = () => {
  const error = useStore((state) => state.error)
  const setError = useStore((state) => state.setError)

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return
    setError({
      error: false,
      description: ''
    })
  }

  return (
    <Snackbar
      open={error.error}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleCloseSnackbar} severity='error' sx={{ width: '100%' }}>
        {error.description}
      </Alert>
    </Snackbar>
  )
}
