import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
class Blog extends Document {
  @Prop()
  title?: string;
  @Prop()
  content?: string;
}

const BlogSchema = SchemaFactory.createForClass(Blog);

export { Blog, BlogSchema };
