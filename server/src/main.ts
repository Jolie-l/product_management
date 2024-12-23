import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe,ClassSerializerInterceptor } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //自动删除没有任何验证修饰器的属性，防止客户端提交过多无用的属性
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  //使用此拦截器从响应对象中删除字段password
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  // 注册 Swagger
  const config = new DocumentBuilder()
    .setTitle('Product Management API')
    .setDescription('The Product Management API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 注册全局异常过滤器
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
