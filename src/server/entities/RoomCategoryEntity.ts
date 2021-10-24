import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomEntity } from '~/server/entities/RoomEntity';

@Entity('room_category')
export class RoomCategoryEntity {
  @OneToMany(() => RoomEntity, (room) => room.category)
  rooms: RoomEntity[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
