import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Background } from '~/constants/background';
import { MusicEntity } from '~/server/entities/MusicEntity';
import { ReviewEntity } from '~/server/entities/ReviewEntity';
import { RoomCategoryEntity } from '~/server/entities/RoomCategoryEntity';
import { UserEntity } from '~/server/entities/UserEntity';
import { RoomLight, RoomWallColor } from '~/types/Room';

@Entity('room')
export class RoomEntity {
  @ManyToOne(() => RoomCategoryEntity, (category) => category.rooms)
  category: RoomCategoryEntity;

  @OneToMany(() => ReviewEntity, (review) => review.room)
  reviews: ReviewEntity[];

  @ManyToMany(() => MusicEntity)
  @JoinTable()
  musics: MusicEntity[];

  @ManyToOne(() => UserEntity, (user) => user.createdRooms)
  creator: UserEntity;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  assets: string;

  @Column()
  title: string;

  @Column({
    type: 'varchar',
  })
  light: RoomLight;

  @Column({
    type: 'text',
  })
  objectIds: string;

  @Column({
    type: 'varchar',
  })
  background: Background;

  @Column({
    type: 'varchar',
  })
  wallColor: RoomWallColor;

  @Column()
  roomImage: string;

  @Column({
    type: 'varchar',
    array: true,
  })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
