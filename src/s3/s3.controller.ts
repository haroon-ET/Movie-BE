import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { S3Service } from './s3.service';
import { JwtAuthGuard } from 'src/auth/jwt-guard.guard';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @UseGuards(JwtAuthGuard)
  @Get('image-signed-url')
  presignedUrl(@Query('contentType') contentType: string) {
    return this.s3Service.generatePresignedUrl(contentType);
  }
}
