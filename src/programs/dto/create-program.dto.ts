import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProgramDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  slug?: string

  @ApiProperty()
  @IsInt()
  directorId: number

  @ApiProperty()
  @IsInt()
  locationId: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  thumbnail?: string

  @ApiProperty() @IsOptional() @IsString()
  videoUrl?: string
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  metaTitle?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  metaDescription?: string

}