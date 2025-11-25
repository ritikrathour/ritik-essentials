export class ApiResponse<T> {
  public statusCode: number;
  public success: boolean;
  public message: string;
  public data: T;

  constructor(statusCode: number, data: T, message: string) {
    (this.statusCode = statusCode),
      (this.message = message),
      (this.data = data);
    this.success = statusCode < 400;
  }
}
