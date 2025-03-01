import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CustomRepository } from '@/database/postgres';

@Entity({ name: 'users', comment: 'Stores all users within the application' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  last_login_time: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updated_at: Date;

  static cleanse(user: IUser) {
    delete user.password;
    return user;
  }

  static repository() {
    return new CustomRepository(this);
  }
}

declare global {
  export type IUser = InstanceType<typeof User>;
}
