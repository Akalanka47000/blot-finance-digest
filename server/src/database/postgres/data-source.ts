import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { default as config } from '@/config';
import { Post } from '../../modules/posts/models';
import { User } from '../../modules/users/models';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.DB_URL,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Post],
  migrations: ['./src/database/postgres/migrations/*.ts']
});

export default AppDataSource;
