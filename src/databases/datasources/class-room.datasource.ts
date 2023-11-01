// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  username: process.env.MYSQL_USERNAME || 'admin',
  password: process.env.MYSQL_PASSWORD || '1',
  port: Number(process.env.MYSQL_PORT) || 3306,
  database: process.env.MYSQL_DATABASE || 'class-room',
  synchronize: false,
  logging: true,
  logger: 'file',
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
});
