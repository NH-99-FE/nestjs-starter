import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as requestIp from 'request-ip'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger()
  constructor(private readonly httpAdapterHost: HttpAdapterHost){ }
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    
    const msg: unknown = (exception as any)?.response || 'Internal Server Error';

    // 这里可以加入更多异常处理逻辑
    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toLocaleString('zh-CN', { hour12: false }).toString(),
      // 还可以加入一些用户信息
      // IP信息
      ip: requestIp.getClientIp(request),
      exceptioin: (exception as any)?.name,
      error: msg,
    };

    this.logger.error('[all-exception]', responseBody);
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
