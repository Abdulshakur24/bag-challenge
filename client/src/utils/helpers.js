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

export const toastInfo = (info, position = 'top-right') =>
  toast.info(info, { ...options, position })

export const toastError = (error, position = 'top-center') =>
  toast.error(error, { ...options, position })
