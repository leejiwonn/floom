import type { GetServerSideProps } from 'next';
import { ComponentProps } from 'react';
import Detail from '~/pages/Detail';
import { fetchRoom } from '~/remotes/room';

export default Detail;

export const getServerSideProps: GetServerSideProps<
  ComponentProps<typeof Detail>
> = async ({ query }) => {
  const roomId = query.roomId as string | undefined;

  if (roomId == null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    return {
      props: {
        room: await fetchRoom(Number(roomId)),
      },
    };
  } catch (error) {
    console.error(error);

    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
};
