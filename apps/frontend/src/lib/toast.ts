import { Toast } from '@base-ui/react/toast'

export interface ToastData {
  hideClose?: boolean
  variant?: 'destructive'
}

export const toast = Toast.createToastManager<ToastData>()
export const useToastManager = () => Toast.useToastManager<ToastData>()
