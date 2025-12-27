import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { query, Response } from "express";
import { ResponseDto } from "../dto/response.dto";
import { IS_DEV } from "src/config/constants";
import { QueryFailedError } from "typeorm";

// 捕获所有异常（包括内置异常和自定义异常）
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception, 99999);
    console.log((exception as any)?.message, 99999);

    // 1. 处理 HTTP 内置异常（如 400/404/500）
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      // 提取错误信息（兼容 NestJS 内置异常的返回格式）
      const msg =
        typeof exceptionResponse === "string"
          ? exceptionResponse
          : exceptionResponse["message"] || "请求失败";

      response.status(HttpStatus.OK).json(ResponseDto.fail(msg, status));
      return;
    }

    if (IS_DEV && exception instanceof QueryFailedError) {
      response.status(HttpStatus.OK).json(
        ResponseDto.fail(
          `${exception.message}: ${exception.message}`,
          500,
          null,
          {
            stack: exception.stack,
            query: exception.query,
            parameters: exception.parameters,
          }
        )
      );
      return;
    }

    if (IS_DEV && exception instanceof Error) {
      response.status(HttpStatus.OK).json(
        ResponseDto.fail(`${exception.name}: ${exception.message}`, 500, null, {
          stack: exception.stack,
        })
      );
      return;
    }

    response
      .status(HttpStatus.OK)
      .json(ResponseDto.fail("服务器内部错误", 500));
  }
}
