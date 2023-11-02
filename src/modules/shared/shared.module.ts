import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import config from 'config';
import { diskStorage } from 'multer';
import { User, UserSchema } from './schemas/user.schema';
import { JwtStrategy } from './strategies/jwt.strategy';
import models from './models';
import { Homework, HomeworkSchema } from './schemas/homework.schema';
import { Class, ClassSchema } from './schemas/class.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('app.auth.jwtSecret'),
          signOptions: {
            expiresIn: configService.get('app.auth.jwtTokenExpiry'),
          },
        };
      },
      inject: [ConfigService],
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file: Express.Multer.File, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtension = file.mimetype.split('/')[1];
          cb(null, `${uniqueSuffix}.${fileExtension}`);
        },
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('db.uri'),
        };
      },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Homework.name, schema: HomeworkSchema },
      { name: Class.name, schema: ClassSchema },
    ]),
  ],
  providers: [Logger, JwtStrategy, ...models],
  exports: [Logger, JwtStrategy, JwtModule, ConfigModule, MulterModule, ...models],
})
export class SharedModule {}
