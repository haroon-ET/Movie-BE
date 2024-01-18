import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UserModule } from './auth/auth.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MoviesModule,
    UserModule,
    S3Module,
  ],
})
export class AppModule {}
