interface ApiSuccess<T> {
  status: "Success" | "Fail";
  statusCode: number;
  message: string;
  data?: T;
  page?: number;
  totalData?: number;
}
export default ApiSuccess;
