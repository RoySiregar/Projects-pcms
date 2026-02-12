import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Tambahkan Validasi Global (Penting untuk Clean Code)
  app.useGlobalPipes(new ValidationPipe());

  // 2. Konfigurasi Swagger UI
  const config = new DocumentBuilder()
    .setTitle('Seatrium PCMS - Project Tracking API')
    .setDescription('Sistem API untuk monitoring progress fabrikasi offshore dan marine. Dibuat sebagai portofolio PCMS Developer.')
    .setVersion('1.0')
    .addTag('projects')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  // Endpoint dokumentasi akan ada di: http://localhost:3003/api-docs
  SwaggerModule.setup('api-docs', app, document);

  // 3. Aktifkan CORS agar bisa diakses dari frontend (jika nanti ada)
  app.enableCors();

  await app.listen(3003);
  console.log(`Application is running on: http://localhost:3003`);
  console.log(`Swagger documentation available at: http://localhost:3003/api-docs`);
}
bootstrap();