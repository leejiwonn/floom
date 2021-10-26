import styled from '@emotion/styled';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import Typography from './Typography';

interface Props {
  title: string;
  tags: string[];
  selectedTags: string[];
  onToggleTagClick: (tag: string) => void;
}

const TagList = ({ title, tags, selectedTags, onToggleTagClick }: Props) => {
  return (
    <TagListStyled>
      <Typography font={FontType.SEMI_BOLD_TITLE_02}>{title}</Typography>
      <TagsStyled>
        {tags.map((tag, index) => (
          <TagItem
            key={index}
            onClick={() => onToggleTagClick(tag)}
            active={selectedTags?.includes(tag)}
          >
            <Typography
              font={FontType.SEMI_BOLD_BODY}
              color={BasicColor.GREEN150}
            >
              {tag}
            </Typography>
          </TagItem>
        ))}
      </TagsStyled>
    </TagListStyled>
  );
};

const TagListStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 18px;
  border-top: 1px solid ${BasicColor.DARK10};
`;

const TagsStyled = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 7px;
`;

const TagItem = styled.button<{ active: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  padding: 4px 10px;
  background-color: ${({ active }) =>
    active ? BasicColor.GREEN10 : BasicColor.WHITE};
  border: 1px solid
    ${({ active }) => (active ? BasicColor.GREEN20 : BasicColor.GRAY60)};
  border-radius: 24px;
  margin-right: 8px;
  margin-bottom: 8px;
`;

export default TagList;
