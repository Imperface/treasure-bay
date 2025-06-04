import { Module } from '@nestjs/common';
import { AdminFieldsController } from './controllers/admin-fields.controller';
import { AdminUsersController } from './controllers/admin-users.controller';
import { AdminFieldsService } from './services/admin-fields.service';
import { AdminUsersService } from './services/admin-users.service';
import { UsersModule } from 'src/users/users.module';
import { FieldsModule } from 'src/fields/fields.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { Field, FieldSchema } from 'src/schemas/Field.schema';

@Module({
  imports: [
    UsersModule,
    FieldsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
  ],
  controllers: [AdminFieldsController, AdminUsersController],
  providers: [AdminFieldsService, AdminUsersService],
})
export class AdminModule {}
