export interface ApiErrorR {
  statusCode: number
  error: string
  message: string
  issues?: {
    path: string
    message: string
  }[]
}
