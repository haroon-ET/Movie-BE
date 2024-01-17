import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  publishingYear: number;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
