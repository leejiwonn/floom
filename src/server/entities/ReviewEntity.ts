import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomEntity } from '~/server/entities/RoomEntity';
import { UserEntity } from '~/server/entities/UserEntity';

@Entity('review')
export class ReviewEntity {
  @ManyToOne(() => RoomEntity, (room) => room.reviews)
  room: RoomEntity;

  @ManyToOne(() => UserEntity, (user) => user.reviews, {
    nullable: true,
  })
  author?: UserEntity;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  guestName?: string;

  @Column({
    type: 'text',
  })
  objective: string;

  @Column({
    type: 'text',
  })
  comment: string;

  @Column({
    type: 'boolean',
  })
  recommend: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
