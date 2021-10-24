import { GetServerSideProps } from 'next';
import { ComponentProps } from 'react';
import Play from '~/pages/Play';
import api from '~/utils/api';

export default Play;

export const getServerSideProps: GetServerSideProps<
  ComponentProps<typeof Play>
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

  const { data: room } = await api.get(`/api/rooms/${roomId}`);

  return {
    props: {
      room,
    },
  };
};
