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
      if (e.target.value.length <= 30) {
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

  const getTodoClearStatus = (fullNumber: number) => {
    let clearCount = 0;
    todos.map((todo) => todo.clear && (clearCount += 1));

    return clearCount
      ? parseInt((clearCount * Math.max(fullNumber / todos.length)).toFixed())
      : 0;
  };

  return (
    <ChecklistStyled ref={modalRef}>
      <ChecklistTitle noneShow={show === true && todos.length === 0}>
        <Typography font={FontType.BOLD_TITLE_02}>???????????????</Typography>
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
            ??????
          </Typography>
        </ChecklistAddButton>
      </ChecklistTitle>
      {todos.length ? (
        <StatusBarStyled>
          <StatusBarActive status={getTodoClearStatus(380)} />
          <StatusBarBackground />
          <Typography
            tag="span"
            font={FontType.BOLD_CAPTION_X}
            color={BasicColor.GREEN150}
            marginRight={1}
            marginTop={0.1}
          >
            {`${getTodoClearStatus(100)}%`}
          </Typography>
        </StatusBarStyled>
      ) : null}
      <ChecklistView>
        {!show && todos.length === 0 ? (
          <NoneChecklist>
            <Typography
              font={FontType.BOLD_BODY}
              color={BasicColor.DARK70}
              align={Align.CENTER}
              marginBottom={0.5}
            >
              ?????? ????????? ?????? ????????? ?????????.
            </Typography>
            <Typography
              font={FontType.LIGHT_CAPTION}
              color={BasicColor.DARK70}
              align={Align.CENTER}
            >
              ????????? ???????????? ???????????? ???????????? ??????????????????!
              <br />
              ?????? ???????????? ?????? ????????? ?????? ????????? ?????????????????? :)
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
            maxLength={30}
            value={textInput}
            onChangeInput={handleChangeInput}
            placeholder="?????????????????? ??????????????????."
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
  z-index: 998;
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

  :hover {
    background-color: ${BasicColor.BLUE97};
    transition: 0.1s;
  }
`;

const ChecklistView = styled.div`
  margin-top: 0.6em;
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

const StatusBarStyled = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-radius: 5.3em;
  margin-top: 1.4em;
`;

const StatusBarActive = styled.div<{ status: number }>`
  width: ${({ status }) => status / 10 + 'em'};
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5.3em;
  background-color: ${BasicColor.GREEN100};
  opacity: 0.6;
  transition: 0.1s;
  z-index: -1;
`;

const StatusBarBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${BasicColor.GREEN10};
  z-index: -2;
`;

export default Checklist;
