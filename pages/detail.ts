import type { GetServerSideProps } from 'next';
import { ComponentProps } from 'react';
import Detail from '~/pages/Detail';
import api from '~/utils/api';

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

  const { data: room } = await api.get(`/api/rooms/${roomId}`);

  return {
    props: {
      room,
    },
  };
};
