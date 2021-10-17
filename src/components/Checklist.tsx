import styled from '@emotion/styled';

import Typography from '~/components/Typography';
import { Align, FontType } from '~/utils/font';
import { BasicColor } from '~/utils/color';
import AddIcon from '../../public/assets/icons/icon-add.svg';
import CheckIcon from '../../public/assets/icons/icon-check.svg';
import CloseIcon from '../../public/assets/icons/icon-close.svg';
import { Todo } from '~/types/Obejct';

interface Props {
  todos: Todo[];
  onClearTodo: (todo: Todo) => void;
  onDeleteTodo: (todo: Todo) => void;
}

const Checklist = ({ todos, onClearTodo, onDeleteTodo }: Props) => {
  return (
    <ChecklistStyled>
      <ChecklistTitle>
        <Typography font={FontType.BOLD_TITLE_02}>체크리스트</Typography>
        <ChecklistAddButton onClick={() => console.log('add')}>
          <AddIcon />
        </ChecklistAddButton>
      </ChecklistTitle>
      <ChecklistView>
        {todos.length === 0 ? (
          <NoneChecklist>
            <Typography
              font={FontType.BOLD_BODY}
              color={BasicColor.DARK70}
              align={Align.CENTER}
              marginBottom={5}
            >
              아직 작성된 작은 목표가 없어요.
            </Typography>
            <Typography
              font={FontType.LIGHT_CAPTION}
              color={BasicColor.DARK70}
              align={Align.CENTER}
            >
              간단한 목표라도 괜찮으니 부담없이 작성해보세요!
              <br />
              작은 목표들이 모여 순간을 더욱 알차게 채워준답니다 :)
            </Typography>
          </NoneChecklist>
        ) : (
          todos.map((todo, index) => (
            <ChecklistItem key={index} last={index === todos.length - 1}>
              <ChecklistItemInfo onClick={() => onClearTodo(todo)}>
                <CheckIconStyled clear={todo.clear}>
                  <CheckIcon
                    fill={todo.clear ? BasicColor.WHITE : BasicColor.DARK40}
                  />
                </CheckIconStyled>
                <Typography
                  tag="span"
                  font={FontType.BOLD_BODY}
                  color={todo.clear ? BasicColor.BLUE100 : BasicColor.DARK100}
                >
                  {todo.text}
                </Typography>
              </ChecklistItemInfo>
              <DeleteButtonStyled onClick={() => onDeleteTodo(todo)}>
                <CloseIcon stroke={BasicColor.DARK40} />
              </DeleteButtonStyled>
            </ChecklistItem>
          ))
        )}
      </ChecklistView>
    </ChecklistStyled>
  );
};

const ChecklistStyled = styled.div`
  width: 400px;
  height: auto;
  position: relative;
  top: 130px;
  left: 50px;
  background-color: ${BasicColor.WHITE};
  border: 2px solid ${BasicColor.BLUE40};
  box-sizing: border-box;
  box-shadow: 0px 20px 24px rgba(0, 0, 0, 0.08);
  border-radius: 30px;
  padding: 20px;
`;

const NoneChecklist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 40px;
`;

const ChecklistTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ChecklistAddButton = styled.button``;

const ChecklistView = styled.div`
  margin-top: 8px;
`;

const ChecklistItem = styled.div<{ last: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: ${({ last }) => !last && `1px solid ${BasicColor.DARK10}`};
`;

const ChecklistItemInfo = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CheckIconStyled = styled.div<{ clear: boolean }>`
  width: 24px;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ clear }) => (clear ? BasicColor.BLUE100 : 'none')};
  border: 1px solid
    ${({ clear }) => (clear ? BasicColor.BLUE100 : BasicColor.DARK40)};
  transition: 0.1s;
  margin-right: 8px;
`;

const DeleteButtonStyled = styled.button`
  margin-right: 8px;
`;

export default Checklist;
