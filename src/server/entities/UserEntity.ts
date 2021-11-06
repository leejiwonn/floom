import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ReviewEntity,
  RoomEntity,
  RoomBookmarkEntity,
  RoomGuestBookEntity,
} from '~/server/entities/RoomEntity';
import type { UserProvider } from '~/types/User';

@Entity('user')
export class UserEntity {
  @OneToMany(() => RoomEntity, (room) => room.creator)
  createdRooms: RoomEntity[];

  @OneToMany(() => RoomBookmarkEntity, (bookmark) => bookmark.marker)
  bookmarks: RoomBookmarkEntity[];

  @OneToMany(() => RoomGuestBookEntity, (roomGuestBook) => roomGuestBook.author)
  guestBooks: RoomGuestBookEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.author)
  reviews: ReviewEntity[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  email?: string;

  @Column({
    nullable: true,
  })
  username?: string;

  @Column({
    unique: true,
  })
  profileId: string;

  @Column({
    type: 'varchar',
  })
  provider: UserProvider;

  @Column()
  providerAccessToken: string;

  @Column()
  providerRefreshToken: string;

  @Column()
  authToken: string;

  @Column({
    nullable: true,
  })
  displayName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
