import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'USER' })
  role: 'USER' | 'ADMIN';

  @Prop({ default: true })
  isActivated: boolean;

  @Prop({ default: 'defaultLink' })
  activationLink: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: 0 })
  attempts: number;

  @Prop({ default: '' })
  token: '' | string;
}

export const UserSchema = SchemaFactory.createForClass(User);
