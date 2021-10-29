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
import { RoomCategoryEntity } from '~/server/entities/RoomCategoryEntity';
import { UserEntity } from '~/server/entities/UserEntity';
import { RoomLight, RoomWallColor } from '~/types/Room';

@Entity('room')
export class RoomEntity {
  @ManyToOne(() => RoomCategoryEntity, (category) => category.rooms)
  category: RoomCategoryEntity;

  @OneToMany(() => RoomGuestBookEntity, (roomGuestBook) => roomGuestBook.room)
  guestBooks: RoomGuestBookEntity[];

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

@Entity('room_guest_book')
export class RoomGuestBookEntity {
  @ManyToOne(() => RoomEntity, (room) => room.guestBooks)
  room: RoomEntity;

  @ManyToOne(() => UserEntity, (user) => user.roomGuestBooks, {
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
    type: 'varchar',
    nullable: true,
  })
  emoji?: string;

  @Column({
    type: 'text',
  })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
