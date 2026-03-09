import { Injectable } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';

@Injectable()
export class BlogService {
  private blogs = [
    { _id: 1, title: 'First Blog', content: 'This is the first blog post.' },
    { _id: 2, title: 'Second Blog', content: 'This is the second blog post.' },
  ];

  findAll(queryParams: { page: number; limit: number }) {
    // const { page, limit } = queryParams;
    // const startIndex = (page - 1) * limit;
    // return this.blogs.slice(startIndex, startIndex + limit);
    return this.blogs;
  }
  findOne(id: string) {
    const blog = this.blogs.find((blog) => blog._id.toString() === id);
    if (blog) {
      return blog;
    } else {
      throw new Error('Blog not found');
    }
  }
  create(body: BlogDto) {
    const newBlog = {
      _id: this.blogs.length + 1,
      title: body.title,
      content: body.content,
    };
    this.blogs.push(newBlog);
    return newBlog;
  }
  update(id: string, body: BlogDto) {
    const blog = this.findOne(id);
    blog.title = body.title;
    blog.content = body.content;
    return blog;
  }
  delete(id: string) {
    const blog = this.findOne(id);
    const newBlogs = this.blogs.filter((b) => b._id !== blog._id);
    return newBlogs;
  }
}
