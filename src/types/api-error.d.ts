interface ApiError {
  status: string;
  isOperational: boolean;
  errorCode: number;
  errorMessage: string;
}
export default ApiError;
