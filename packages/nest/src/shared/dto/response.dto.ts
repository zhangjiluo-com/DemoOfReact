export class ResponseDto<T = any> {
  code: number;
  msg: string;
  data: T;
  error?: any;

  private constructor(code: number, msg: string, data: T, error?: any) {
    this.code = code;
    this.msg = msg;
    this.data = data;
    this.error = error;
  }

  /**
   * 创建成功响应
   * @param data 响应数据，默认为null
   * @param msg 响应消息，默认为空字符串
   * @returns ResponseDto实例
   */
  static success<T = any>(
    data: T | null = null,
    msg: string = ""
  ): ResponseDto<T | null> {
    return new ResponseDto<T | null>(0, msg, data);
  }

  /**
   * 创建失败响应
   * @param msg 错误消息
   * @param code 错误码，默认为500
   * @param data 错误数据，默认为null
   * @returns ResponseDto实例
   */
  static fail<T = any>(
    msg: string,
    code: number = 500,
    data: T | null = null,
    error?: any
  ): ResponseDto<T | null> {
    return new ResponseDto<T | null>(code, msg, data, error);
  }
}
