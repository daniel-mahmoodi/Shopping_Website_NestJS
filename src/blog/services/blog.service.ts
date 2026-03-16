import { Injectable } from '@nestjs/common';
import { BlogDto } from '../dtos/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from '../schemas/blog.schema';
import { Model } from 'mongoose';
import { BlogQueryDto } from '../dtos/blog-query.dto';
import { sortFunction } from 'src/shared/utils/sort-utils';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async findAll(queryParams: BlogQueryDto, selectObject: any = { __v: 0 }) {
    const { limit = 5, page = 1, title, sort } = queryParams;
    const query: any = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    const sortObject = sortFunction(sort);
    const blogs = await this.blogModel
      .find(query)
      .skip((page - 1) * limit)
      .sort(sortObject)
      .populate('category', { title: 1 })
      .select(selectObject)
      .limit(limit)
      .exec();
    const count = await this.blogModel.countDocuments(query).exec();
    return { blogs, count };
  }

  async findOne(id: string, selectObject: any = { __v: 0 }) {
    const blog = await this.blogModel
      .findOne({ _id: id })
      .populate('category', { title: 1 })
      .select(selectObject)
      .exec();
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
    // const blog = await this.findOne(id, { title: 1, content: 1 });
    // blog.title = body.title;
    // blog.content = body.content;
    // await blog.save();
    // return blog;
    return await this.blogModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  async delete(id: string) {
    const blog = await this.findOne(id, { _id: 1 });
    await blog.deleteOne();
  }
}
