import styled from '@emotion/styled';
import { useRoom } from '../hooks/useRoom';
import { GetServerSideProps } from 'next';
import Header from '../components/Header';

interface Props {
  category: string;
  id: string;
}

const Play = ({ category, id }: Props) => {
  const { data } = useRoom(category, id);
  console.log(data);
  return (
    <>
      <Header title={data?.title} />
      <PlayStyled>play</PlayStyled>
    </>
  );
};

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

const PlayStyled = styled.div``;

export default Play;
