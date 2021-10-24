/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { nanoid } from 'nanoid';
import { createConnection, getConnection } from 'typeorm';
import { MusicEntity } from '~/server/entities/MusicEntity';
import { ReviewEntity } from '~/server/entities/ReviewEntity';
import { RoomCategoryEntity } from '~/server/entities/RoomCategoryEntity';
import { RoomEntity } from '~/server/entities/RoomEntity';
import { UserEntity } from '~/server/entities/UserEntity';
import { CreateReviewData } from '~/types/Review';
import { User } from '~/types/User';

let connectionReadyPromise: Promise<void> | null = null;

function prepareConnection() {
  console.log('endpoint', process.env.RDB_ENDPOINT);
  console.log('username', process.env.RDB_USERNAME);
  console.log('password', process.env.RDB_PASSWORD?.slice(0, 5));
  console.log('port', Number(process.env.RDB_PORT));
  console.log('db', process.env.RDB_DATABASE);
  console.log('?', connectionReadyPromise);

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
          MusicEntity,
          ReviewEntity,
          RoomCategoryEntity,
          RoomEntity,
          UserEntity,
        ],
        logging: 'all',
        useUTC: false,
        connectTimeoutMS: 7_000,
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
    .leftJoinAndSelect('room.reviews', 'reviews')
    .leftJoinAndSelect('reviews.author', 'reviewAuthor')
    .addOrderBy('reviews.createdAt', 'DESC')
    .getOneOrFail();

  return room;
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

// Music
export async function getMusicRepository() {
  const database = await getDatabase();
  const MusicRepository = database.getRepository(MusicEntity);

  return MusicRepository;
}

export async function findAllMusics() {
  const MusicRepository = await getMusicRepository();

  return MusicRepository.find({
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

type CreateReviewParams = CreateReviewData & {
  user?: User;
};

export async function createReview(payload: CreateReviewParams) {
  const ReviewRepository = await getReviewRepository();
  const review = new ReviewEntity();

  review.room = await getRoomById(payload.roomId);

  if (payload.user != null) {
    review.author = await findUserByProfileId(payload.user.profileId);
  } else {
    review.guestName = `방문자-${nanoid(6)}`;
  }

  review.objective = payload.objective;
  review.comment = payload.comment;
  review.recommend = payload.recommend;

  return ReviewRepository.save(review);
}
