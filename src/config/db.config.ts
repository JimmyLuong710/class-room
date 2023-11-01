// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  username: process.env.MYSQL_USERNAME || 'admin',
  password: process.env.MYSQL_PASSWORD || '1',
  port: process.env.MYSQL_PORT || 3306,
  database: process.env.MYSQL_DATABASE || 'class-room',
}));
