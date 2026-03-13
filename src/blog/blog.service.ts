import { Injectable } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schemas/blog.schema';
import { Model } from 'mongoose';
import { BlogQueryDto } from './dtos/blog-query.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async findAll(queryParams: BlogQueryDto) {
    const { limit = 5, page = 1, title } = queryParams;
    const query: any = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    const blogs = await this.blogModel
      .find(query)
      .skip(page - 1)
      .limit(limit)
      .exec();
    const count = await this.blogModel.countDocuments(query).exec();
    return { blogs, count };
  }

  async findOne(id: string) {
    const blog = await this.blogModel.findOne({ _id: id }).exec();
    if (blog) {
      return blog;
    } else {
      throw new Error('Blog not found');
    }
  }

  async create(body: BlogDto) {
    const newBlog = new this.blogModel(body);
    return await newBlog.save();
  }

  async update(id: string, body: BlogDto) {
    const blog = await this.findOne(id);
    blog.title = body.title;
    blog.content = body.content;
    await blog.save();
    return blog;
  }

  async delete(id: string) {
    const blog = await this.findOne(id);
    await blog.deleteOne();
  }
}
