import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { mongo } from 'mongoose';

@Schema()
export class Cell {
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
}

export const CellSchema = SchemaFactory.createForClass(Cell);
