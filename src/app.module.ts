import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects.module'; 

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT as string) || 5432, 
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password_anda', 
      database: process.env.DB_NAME || 'db_pcms',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    ProjectsModule,
  ],
})
export class AppModule {}