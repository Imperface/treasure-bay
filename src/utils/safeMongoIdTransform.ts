import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export const SafeMongoIdTransform = ({ value }) => {
  try {
    if (Types.ObjectId.isValid(value) === value) {
      return value;
    }
    throw new BadRequestException('Id validation fail');
  } catch (error) {
    throw new BadRequestException('Id validation fail');
  }
};
