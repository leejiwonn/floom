import { GetServerSideProps } from 'next';
import { ComponentProps } from 'react';
import Home from '~/pages/Home';
import { fetchRoomCategories } from '~/remotes/room';

export default Home;

export const getServerSideProps: GetServerSideProps<
  ComponentProps<typeof Home>
> = async () => {
  return {
    props: {
      categories: await fetchRoomCategories(),
    },
  };
};
