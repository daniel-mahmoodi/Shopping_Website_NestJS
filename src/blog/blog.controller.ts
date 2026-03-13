import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogDto } from './dtos/blog.dto';
import { BlogService } from './blog.service';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}
  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Post()
  create(@Body() Body: BlogDto) {
    return this.blogService.create(Body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() Body: BlogDto) {
    return this.blogService.update(id, Body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
  @Patch(':id')
  patch(@Param('id') id: string, @Body() Body: BlogDto) {
    return this.blogService.update(id, Body);
  }
}
