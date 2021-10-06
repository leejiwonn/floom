import { GetServerSideProps } from 'next';

interface Props {
  category: string;
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const category = query.category as string;
  const id = query.id as string;

  if (category == null || id == null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      category,
      id,
    },
  };
};
