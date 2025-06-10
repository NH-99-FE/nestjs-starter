import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT', 3000)
  const errorFilterFlag = configService.get<string>('ERROR_FILTER')
  const cors = configService.get('CORS', false)
  const prefix = configService.get('PREFIX', '/api')
  const versionStr = configService.get<string>('VERSION');
  let version: string | string[] | typeof VERSION_NEUTRAL;

  if (!versionStr) {
    version = VERSION_NEUTRAL;
  } else if (versionStr.includes(',')) {
    version = versionStr.split(',').filter(Boolean);
  } else {
    version = versionStr;
  }

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  app.setGlobalPrefix(prefix)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: version,
  })

  if (cors === 'true'){
    app.enableCors();
  }

  if (errorFilterFlag === 'true'){
    const httpAdapter = app.get(HttpAdapterHost)
    app.useGlobalFilters(new AllExceptionFilter(httpAdapter))
  }

  // 全局类校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除类上不存在的字段--true
      whitelist: true
    })
  )

  await app.listen(port);
}
bootstrap();
