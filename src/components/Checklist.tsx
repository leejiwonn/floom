import styled from '@emotion/styled';
import { useState, useCallback } from 'react';

import Typography from '~/components/Typography';
import { Align, FontType } from '~/utils/font';
import { BasicColor } from '~/utils/color';
import useOutsideEvent from '~/hooks/useOutsideEvent';
import { Todo } from '~/types/Obejct';
import TextInput from './TextInput';

import PlusIcon from '../../public/assets/icons/icon-plus.svg';
import CheckIcon from '../../public/assets/icons/icon-check.svg';
import CloseIcon from '../../public/assets/icons/icon-close.svg';

interface Props {
  todos: Todo[];
  onClearTodo: (todo: Todo) => void;
  onDeleteTodo: (todo: Todo) => void;
  onAddTodo: (todo: Todo) => void;
}

const Checklist = ({ todos, onClearTodo, onDeleteTodo, onAddTodo }: Props) => {
  const [textInput, setTextInput] = useState('');
  const [show, setShow] = useState<boolean>();
  const { modalRef } = useOutsideEvent<HTMLDivElement>({
    onOutsideClick: () => setShow(undefined),
  });

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 20) {
        setTextInput(e.target.value);
      }
    },
    [setTextInput],
  );

  const handleClearButtonClick = (todo: Todo) => {
    onClearTodo(todo);
    setTextInput('');
    setShow(false);
  };

  const handleDeleteButtonClick = (todo: Todo) => {
    onDeleteTodo(todo);
    setTextInput('');
    setShow(false);
  };

  const handleSubmitButtonClick = () => {
    if (
      textInput !== '' &&
      todos.findIndex((item) => item.text === textInput) === -1
    ) {
      onAddTodo({ text: textInput, clear: false });
      setShow(false);
    } else {
      setTextInput('');
    }
  };

  return (
    <ChecklistStyled ref={modalRef}>
      <ChecklistTitle noneShow={show === true && todos.length === 0}>
        <Typography font={FontType.BOLD_TITLE_02}>체크리스트</Typography>
        <ChecklistAddButton
          onClick={() => {
            setTextInput('');
            setShow(todos.length < 5);
          }}
          active={todos.length < 5}
        >
          <PlusIcon width="1.5em" height="1.5em" stroke={BasicColor.WHITE} />
          <Typography
            tag="span"
            font={FontType.SEMI_BOLD_BODY}
            color={BasicColor.WHITE}
            marginLeft={0.2}
            lineHeight={0}
          >
            추가
          </Typography>
        </ChecklistAddButton>
      </ChecklistTitle>
      <ChecklistView>
        {!show && todos.length === 0 ? (
          <NoneChecklist>
            <Typography
              font={FontType.BOLD_BODY}
              color={BasicColor.DARK70}
              align={Align.CENTER}
              marginBottom={0.5}
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
              <ChecklistItemInfo onClick={() => handleClearButtonClick(todo)}>
                <CheckIconStyled clear={todo.clear}>
                  <CheckIcon
                    width="1.5em"
                    height="1.3em"
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
              <DeleteButtonStyled onClick={() => handleDeleteButtonClick(todo)}>
                <CloseIcon
                  width="2.2em"
                  height="2.2em"
                  stroke={BasicColor.DARK40}
                />
              </DeleteButtonStyled>
            </ChecklistItem>
          ))
        )}
        {show && (
          <TextInput
            maxLength={20}
            value={textInput}
            onChangeInput={handleChangeInput}
            placeholder="체크리스트를 작성해주세요."
            submitButton={true}
            onSubmitButtonClick={handleSubmitButtonClick}
          />
        )}
      </ChecklistView>
    </ChecklistStyled>
  );
};

const ChecklistStyled = styled.div`
  width: 40em;
  height: auto;
  position: relative;
  top: 13em;
  left: 5em;
  background-color: ${BasicColor.WHITE};
  border: 0.2em solid ${BasicColor.BLUE40};
  box-sizing: border-box;
  box-shadow: 0 2em 2.4em rgba(0, 0, 0, 0.08);
  border-radius: 3em;
  padding: 2em;
`;

const NoneChecklist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 3em;
  padding-bottom: 4em;
`;

const ChecklistTitle = styled.div<{ noneShow: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ noneShow }) => noneShow && '2em'};
`;

const ChecklistAddButton = styled.button<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ active }) =>
    active ? BasicColor.BLUE100 : BasicColor.GRAY70};
  border-radius: 1.2em;
  padding: 1em 1.5em;
  transition: 0.1s;
`;

const ChecklistView = styled.div`
  margin-top: 0.8em;
`;

const ChecklistItem = styled.div<{ last: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.4em 0;
  border-bottom: ${({ last }) => !last && `1px solid ${BasicColor.DARK10}`};
`;

const ChecklistItemInfo = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CheckIconStyled = styled.div<{ clear: boolean }>`
  width: 2.4em;
  height: 2.4em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ clear }) => (clear ? BasicColor.BLUE100 : 'none')};
  border: 0.1em solid
    ${({ clear }) => (clear ? BasicColor.BLUE100 : BasicColor.DARK40)};
  transition: 0.1s;
  margin-right: 0.8em;
`;

const DeleteButtonStyled = styled.button`
  margin-right: 0.8em;
`;

export default Checklist;
