import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BlogCategory } from './blog-category.schema';

@Schema({ timestamps: true })
class Blog extends Document {
  @Prop()
  title?: string;
  @Prop()
  content?: string;

  @Prop({ type: Types.ObjectId, ref: BlogCategory.name, required: true })
  category?: BlogCategory;
}

const BlogSchema = SchemaFactory.createForClass(Blog);

export { Blog, BlogSchema };
