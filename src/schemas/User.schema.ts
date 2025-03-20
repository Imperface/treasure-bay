import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { mongo } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'USER' })
  role: 'USER' | 'ADMIN';

  @Prop({ required: true })
  isActivated: boolean;

  @Prop({ required: true })
  activationLink: string;

  @Prop({ required: true })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
