import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config';
import repositories from './repositories';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        port: configService.get('db.port'),
        database: configService.get('db.database'),
        synchronize: true,
        entities: [__dirname + '/../../databases/entities/*.entity.{js,ts}'],
        logging: ['error'] as any,
      }),
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
  ],
  providers: [Logger, JwtStrategy, ...repositories],
  exports: [Logger, TypeOrmModule, JwtStrategy, JwtModule, ConfigModule, ...repositories],
})
export class SharedModule {}
