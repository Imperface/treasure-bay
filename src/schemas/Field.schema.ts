import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { mongo } from 'mongoose';

@Schema()
export class Field {
  @Prop({ required: true })
  cells: [
    {
      coordinates: number[];
      entity: 'reward' | 'empty';
      isSelected: { type: boolean; default: false };
      owner: { type: null | mongo.ObjectId; default: null };
      openingDate: { type: null | Date; default: null };
    },
  ];

  @Prop({ required: true })
  createdAt: Date;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
