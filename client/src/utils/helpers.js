import { toast } from 'react-toastify'

const options = {
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export const toastInfo = (info) => toast.info(info, options)

export const toastError = (error) =>
  toast.error(error, { ...options, position: 'top-center' })
