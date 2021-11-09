/* eslint-disable @typescript-eslint/no-non-null-assertion,@typescript-eslint/no-var-requires */
import 'reflect-metadata';

import { nanoid } from 'nanoid';
import { paginate } from 'nestjs-typeorm-paginate';
import { createConnection, getConnection, In } from 'typeorm';

// !!!순서 주의!!!
import { MusicEntity } from '~/server/entities/MusicEntity';
import { MusicCategoryEntity } from '~/server/entities/MusicCategoryEntity';
import {
  ReviewEntity,
  RoomBookmarkEntity,
  RoomEntity,
  RoomGuestBookEntity,
} from '~/server/entities/RoomEntity';
import { RoomCategoryEntity } from '~/server/entities/RoomCategoryEntity';
import { UserEntity } from '~/server/entities/UserEntity';
import { PaginationOptions } from '~/types/pagination';
// !!!순서 주의!!!

import { CreateReviewData } from '~/types/Review';
import { CreateRoomData } from '~/types/Room';
import { CreateRoomGuestBookData } from '~/types/RoomGuestBook';
import { User } from '~/types/User';

let connectionReadyPromise: Promise<void> | null = null;

function prepareConnection() {
  if (connectionReadyPromise == null) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }

      // wait for new default connection
      await createConnection({
        type: 'postgres',
        host: process.env.RDB_ENDPOINT!,
        port: Number(process.env.RDB_PORT!),
        username: process.env.RDB_USERNAME,
        password: process.env.RDB_PASSWORD,
        database: process.env.RDB_DATABASE,
        entities: [
          MusicCategoryEntity,
          MusicEntity,
          UserEntity,
          RoomEntity,
          ReviewEntity,
          RoomGuestBookEntity,
          RoomCategoryEntity,
          RoomBookmarkEntity,
        ],
        useUTC: false,
      });
    })();
  }

  return connectionReadyPromise;
}

export async function getDatabase() {
  await prepareConnection();
  return getConnection();
}

// User
export async function getUserRepository() {
  const database = await getDatabase();
  const UserRepository = database.getRepository(UserEntity);

  return UserRepository;
}

export async function findUserByProfileId(profileId: string) {
  const UserRepository = await getUserRepository();

  return UserRepository.findOne({ profileId });
}

export async function getUserByProfileId(profileId: string) {
  const UserRepository = await getUserRepository();

  return UserRepository.findOneOrFail({ profileId });
}

export async function saveUser(user: UserEntity) {
  const UserRepository = await getUserRepository();

  return UserRepository.save(user);
}

// Room
export async function getRoomRepository() {
  const database = await getDatabase();
  const RoomRepository = database.getRepository(RoomEntity);

  return RoomRepository;
}

export async function findAllRooms(options?: {
  filters?: {
    categoryName?: string;
    creatorId?: number;
  };
}) {
  const { filters } = options ?? {};
  const RoomRepository = await getRoomRepository();

  const query = RoomRepository.createQueryBuilder('room')
    .leftJoinAndSelect('room.creator', 'creator')
    .leftJoinAndSelect('room.category', 'category');

  if (filters?.categoryName != null) {
    query.andWhere('category.name = :categoryName', {
      categoryName: filters.categoryName,
    });
  }

  if (filters?.creatorId != null) {
    query.andWhere('creator.id = :creatorId', { creatorId: filters.creatorId });
  }

  query.addOrderBy('room.createdAt', 'DESC');

  return query.getMany();
}

export async function getRoomById(roomId: number) {
  const RoomRepository = await getRoomRepository();
  const room = await RoomRepository.createQueryBuilder('room')
    .andWhere('room.id = :roomId', { roomId })
    .leftJoinAndSelect('room.creator', 'creator')
    .leftJoinAndSelect('room.category', 'category')
    .leftJoinAndSelect('room.musics', 'musics')
    .leftJoinAndSelect('musics.category', 'musicCategory')
    .leftJoinAndSelect('room.reviews', 'reviews')
    .leftJoinAndSelect('reviews.author', 'reviewAuthor')
    .leftJoinAndSelect('room.bookmarks', 'bookmarks')
    .addOrderBy('reviews.createdAt', 'DESC')
    .getOneOrFail();

  return room;
}

type CreateRoomParams = CreateRoomData & {
  user: User;
};

export async function createRoom(payload: CreateRoomParams) {
  const RoomRepository = await getRoomRepository();

  const room = new RoomEntity();
  const [category, musics, creator] = await Promise.all([
    getRoomCategoryById(payload.categoryId),
    findAllMusicsByIds(payload.musicIds),
    getUserByProfileId(payload.user.profileId),
  ]);

  room.title = payload.title;
  room.light = payload.light;
  room.wallColor = payload.wallColor;
  room.objectIds = JSON.stringify(payload.objectIds);
  room.background = payload.background;
  room.assets = JSON.stringify(payload.assets);
  room.tags = payload.tags;
  room.roomImage = payload.roomImage;
  room.category = category;
  room.reviews = [];
  room.guestBooks = [];
  room.musics = musics;
  room.creator = creator;
  room.guestBooksEnabled = payload.guestBooksEnabled;
  room.guestBooksWelcomeMessage = payload.guestBooksWelcomeMessage;

  return RoomRepository.save(room);
}

// Room Category
export async function getRoomCategoryRepository() {
  const database = await getDatabase();
  const RoomCategoryRepository = database.getRepository(RoomCategoryEntity);

  return RoomCategoryRepository;
}

export async function findAllRoomCategories() {
  const RoomCategoryRepository = await getRoomCategoryRepository();

  return RoomCategoryRepository.find({
    order: {
      id: 'ASC',
    },
  });
}

export async function getRoomCategoryById(categoryId: number) {
  const RoomCategoryRepository = await getRoomCategoryRepository();
  const roomCategory = await RoomCategoryRepository.findOneOrFail(categoryId);

  return roomCategory;
}

// Music
export async function getMusicRepository() {
  const database = await getDatabase();
  const MusicRepository = database.getRepository(MusicEntity);

  return MusicRepository;
}

export async function findAllMusics() {
  const MusicRepository = await getMusicRepository();

  return MusicRepository.find({
    relations: ['category'],
    order: {
      id: 'ASC',
    },
  });
}

export async function findAllMusicsByCategoryId(categoryId: number) {
  const MusicRepository = await getMusicRepository();

  return MusicRepository.createQueryBuilder('music')
    .leftJoinAndSelect('music.category', 'category')
    .andWhere('category.id = :categoryId', { categoryId })
    .addOrderBy('music.createdAt', 'DESC')
    .getMany();
}

export async function findAllMusicsByIds(ids: number[]) {
  const MusicRepository = await getMusicRepository();

  return MusicRepository.find({
    relations: ['category'],
    where: {
      id: In(ids),
    },
  });
}

// Music Category
export async function getMusicCategoryRepository() {
  const database = await getDatabase();
  const MusicCategoryRepository = database.getRepository(MusicCategoryEntity);

  return MusicCategoryRepository;
}

export async function findAllMusicCategories() {
  const MusicCategoryRepository = await getMusicCategoryRepository();

  return MusicCategoryRepository.find({
    order: {
      id: 'ASC',
    },
  });
}

// Review
export async function getReviewRepository() {
  const database = await getDatabase();
  const ReviewRepository = database.getRepository(ReviewEntity);

  return ReviewRepository;
}

export async function findAllReviews(options?: {
  filters?: {
    roomId?: number;
    authorId?: number;
  };
}) {
  const { filters } = options ?? {};
  const ReviewRepository = await getReviewRepository();

  const query = ReviewRepository.createQueryBuilder('review')
    .leftJoinAndSelect('review.room', 'room')
    .leftJoinAndSelect('room.category', 'category')
    .leftJoinAndSelect('review.author', 'author');

  if (filters?.roomId != null) {
    query.andWhere('review.roomId = :roomId', {
      roomId: filters.roomId,
    });
  }

  if (filters?.authorId != null) {
    query.andWhere('review.authorId = :authorId', {
      authorId: filters.authorId,
    });
  }

  query.addOrderBy('review.createdAt', 'DESC');

  return query.getMany();
}

type CreateReviewParams = CreateReviewData & {
  user?: User;
};

export async function createReview(payload: CreateReviewParams) {
  const ReviewRepository = await getReviewRepository();
  const review = new ReviewEntity();

  review.room = await getRoomById(payload.roomId);

  if (payload.user != null) {
    review.author = await getUserByProfileId(payload.user.profileId);
  } else {
    review.guestName = `방문자-${nanoid(6)}`;
  }

  review.objective = payload.objective;
  review.comment = payload.comment;
  review.recommend = payload.recommend;

  return ReviewRepository.save(review);
}

// RoomGuestBook
export async function getRoomGuestBookRepository() {
  const database = await getDatabase();
  const RoomGuestBookRepository = database.getRepository(RoomGuestBookEntity);

  return RoomGuestBookRepository;
}

type FindAllRoomGuestBooksByPaginationParams = PaginationOptions & {
  roomId: number;
};

export async function findAllRoomGuestBooksByPagination({
  roomId,
  limit,
  page,
}: FindAllRoomGuestBooksByPaginationParams) {
  const RoomGuestBookRepository = await getRoomGuestBookRepository();
  const query = RoomGuestBookRepository.createQueryBuilder('roomGuestBook')
    .andWhere('roomGuestBook.roomId = :roomId', { roomId })
    .leftJoinAndSelect('roomGuestBook.author', 'author')
    .addOrderBy('roomGuestBook.createdAt', 'DESC');

  return paginate(query, { limit, page });
}

type CreateRoomGuestBookParams = CreateRoomGuestBookData & {
  roomId: number;
  user?: User;
};

export async function createRoomGuestBook(payload: CreateRoomGuestBookParams) {
  const RoomGuestBookRepository = await getRoomGuestBookRepository();
  const guestBook = new RoomGuestBookEntity();

  guestBook.room = await getRoomById(payload.roomId);

  if (payload.user != null) {
    guestBook.author = await getUserByProfileId(payload.user.profileId);
  } else {
    guestBook.guestName = `방문자-${nanoid(6)}`;
  }

  guestBook.emoji = payload.emoji;
  guestBook.body = payload.body;

  return RoomGuestBookRepository.save(guestBook);
}

// RoomBookmark
export async function getRoomBookmarkRepository() {
  const database = await getDatabase();
  const RoomBookmarkRepository = database.getRepository(RoomBookmarkEntity);

  return RoomBookmarkRepository;
}

export async function findRoomBookmark({ roomId, user }: BookmarkParams) {
  const RoomBookmarkRepository = await getRoomBookmarkRepository();
  const bookmark = await RoomBookmarkRepository.findOne({
    relations: ['room', 'marker'],
    where: {
      room: { id: roomId },
      marker: { id: user.id },
    },
  });

  return bookmark;
}

export async function findAllBookmarks(options?: {
  filters?: {
    roomId?: number;
    markerId?: number;
  };
}) {
  const { filters } = options ?? {};
  const RoomBookmarkRepository = await getRoomBookmarkRepository();

  const query = RoomBookmarkRepository.createQueryBuilder('roomBookmark')
    .leftJoinAndSelect('roomBookmark.room', 'room')
    .leftJoinAndSelect('roomBookmark.marker', 'marker');

  if (filters?.roomId != null) {
    query.andWhere('room.id = :roomId', {
      roomId: filters.roomId,
    });
  }

  if (filters?.markerId != null) {
    query.andWhere('roomBookmark.markerId = :markerId', {
      markerId: filters.markerId,
    });
  }

  query.addOrderBy('roomBookmark.createdAt', 'DESC');

  return query.getMany();
}

type BookmarkParams = {
  roomId: number;
  user: User;
};

export async function createBookmark(payload: BookmarkParams) {
  const RoomBookmarkRepository = await getRoomBookmarkRepository();

  if ((await findRoomBookmark(payload)) != null) {
    throw new Error('이미 북마크되어 있습니다.');
  }

  const bookmark = new RoomBookmarkEntity();
  const [room, marker] = await Promise.all([
    getRoomById(payload.roomId),
    getUserByProfileId(payload.user.profileId),
  ]);

  bookmark.room = room;
  bookmark.marker = marker;

  return RoomBookmarkRepository.save(bookmark);
}

export async function deleteBookmark(payload: BookmarkParams) {
  const RoomBookmarkRepository = await getRoomBookmarkRepository();
  const bookmark = await findRoomBookmark(payload);

  if (bookmark == null) {
    throw new Error('북마크가 없습니다.');
  }

  await RoomBookmarkRepository.delete(bookmark.id);
}
