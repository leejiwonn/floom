import styled from '@emotion/styled';

import { BasicColor, GradientColor } from '~/utils/color';
import { getCategoryEmoji } from '~/utils/emoji';
import { Align, FontType } from '~/utils/font';
import { useUserProfile } from '~/hooks/useUser';
import { RoomCategory } from '~/types/RoomCategory';
import Typography from './Typography';

import LogoutIcon from '../../public/assets/icons/icon-logout.svg';
import EyesIcon from '../../public/assets/emojis/emoji-eyes.svg';

interface Props {
  categories: RoomCategory[];
  category: RoomCategory;
  setCategory: (value: RoomCategory) => void;
  onLogoutButtonClick: () => void;
}

const Sidebar = ({
  categories,
  category,
  setCategory,
  onLogoutButtonClick,
}: Props) => {
  const { data: user } = useUserProfile();

  return (
    <SidebarStyled>
      <Typography
        font={FontType.EXTRA_BOLD_HEAD_03}
        color={BasicColor.WHITE}
        marginBottom={1.4}
      >
        몰입의 즐거움을
        <br />
        경험하다!
      </Typography>
      <Typography
        font={FontType.SEMI_BOLD_BODY}
        color={BasicColor.WHITE}
        marginBottom={5.5}
      >
        어떤 일에 몰입하고 싶은가요?
      </Typography>
      <CategoryList>
        {categories?.map((value, index) => (
          <CategoryItem key={index} onClick={() => setCategory(value)}>
            <CategoryItemIcon active={category === value}>
              {getCategoryEmoji(value.name)}
            </CategoryItemIcon>
            <Typography
              font={FontType.BOLD_TITLE_02}
              color={BasicColor.WHITE}
              align={Align.CENTER}
            >
              {value.name}
            </Typography>
          </CategoryItem>
        ))}
      </CategoryList>
      {user != null ? (
        <>
          <Line />
          <CategoryItem onClick={() => setCategory({ id: 0, name: 'myFloom' })}>
            <CategoryItemIcon active={category.name === 'myFloom'}>
              <EyesIcon />
            </CategoryItemIcon>
            <Typography
              font={FontType.BOLD_TITLE_02}
              color={BasicColor.WHITE}
              align={Align.CENTER}
            >
              마이플룸
            </Typography>
          </CategoryItem>
          <LogoutButton onClick={onLogoutButtonClick}>
            <LogoutIcon width="2em" height="2em" />
            <Typography
              font={FontType.SEMI_BOLD_CAPTION}
              color={BasicColor.WHITE}
              marginLeft={0.6}
            >
              로그아웃
            </Typography>
          </LogoutButton>
        </>
      ) : (
        <KakaoLoginButton href="/api/auth/kakao">
          <KakaoLoginIcon src="/assets/images/image-kakao-login.png" />
        </KakaoLoginButton>
      )}
    </SidebarStyled>
  );
};

const SidebarStyled = styled.div`
  width: 18%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5em 3em;
  padding-top: 10em;
  padding-left: 3em;
  background: ${GradientColor.BLUE};
  z-index: 1;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${BasicColor.BLUE80};
  margin-top: 2.8em;
  margin-bottom: 1.8em;
`;

const CategoryItem = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1.2em 0;

  :hover {
    div {
      background-color: ${BasicColor.BLUE20};
      box-shadow: 0 0.4em 0.4em rgba(0, 0, 0, 0.08);
    }
  }
`;

const CategoryItemIcon = styled.div<{ active?: boolean }>`
  width: 4em;
  height: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) =>
    active ? BasicColor.WHITE : BasicColor.BLUE80};
  box-sizing: border-box;
  box-shadow: ${({ active }) => active && '0 0.4em 0.4em rgba(0, 0, 0, 0.08)'};
  border-radius: 1.4em;
  margin-right: 1.5em;
  transition: 0.1s;

  svg {
    width: 60%;
    height: 60%;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  bottom: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${BasicColor.BLUE90};
  border: 1px solid ${BasicColor.BLUE80};
  border-radius: 4em;
  padding: 1em 1.3em;
`;

const KakaoLoginButton = styled.a`
  width: 10em;
  position: absolute;
  bottom: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KakaoLoginIcon = styled.img`
  width: 100%;
`;

export default Sidebar;
