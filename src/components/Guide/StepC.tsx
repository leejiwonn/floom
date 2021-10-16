import styled from '@emotion/styled';
import { useState, useCallback } from 'react';

import { BasicColor, GradientColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import TextInput from '../TextInput';
import Typography from '../Typography';
import StepTemplate from './StepTemplate';
import PlusIcon from '../../../public/assets/icons/icon-plus.svg';
import CloseIcon from '../../../public/assets/icons/icon-close.svg';

interface Props {
  objective: string;
  placeholderInfo: string;
  todos: string[];
  onChangeTodos: (todo: string) => void;
  onDeleteTodo: (todo: string) => void;
  onSliderShow: (value: boolean) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

const StepC = ({
  objective,
  placeholderInfo,
  todos,
  onChangeTodos,
  onDeleteTodo,
  onSliderShow,
  onPrevPage,
  onNextPage,
}: Props) => {
  const [textInput, setTextInput] = useState('');

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (todos.length < 5 && e.target.value.length <= 7) {
        setTextInput(e.target.value);
      }
    },
    [todos, setTextInput],
  );

  const handlePlusButtonClick = () => {
    if (todos.length < 5) {
      onChangeTodos(textInput);
      setTextInput('');
    }
  };

  const handleNextStepButtonClick = () => {
    onNextPage();
    onSliderShow(false);
  };

  return (
    <StepTemplate
      title={
        <>
          <Typography
            tag="span"
            font={FontType.EXTRA_BOLD_HEAD_03}
            color={BasicColor.BLUE100}
          >
            {objective}
          </Typography>
          에
          <br />
          몰입하며 이룰 작은 목표들을 적어주세요.
        </>
      }
      content={
        <TodolistStyled>
          <PlusTagStyled>
            <TextInput
              value={textInput}
              onChangeInput={handleChangeInput}
              placeholder={todos.length < 5 ? placeholderInfo : '입력 끝!'}
              marginLeft={-5}
              font={FontType.BOLD_TITLE_01}
            />
            <PlusButton
              onClick={handlePlusButtonClick}
              active={todos.length < 5}
            >
              <PlusIcon />
            </PlusButton>
          </PlusTagStyled>
          <TagListStyled>
            {todos?.map((todo, index) => (
              <TagItem key={index}>
                <Typography
                  font={FontType.SEMI_BOLD_BODY}
                  color={BasicColor.BLUE100}
                >
                  {todo}
                </Typography>
                <TagDeleteButton onClick={() => onDeleteTodo(todo)}>
                  <CloseIcon />
                </TagDeleteButton>
              </TagItem>
            ))}
          </TagListStyled>
        </TodolistStyled>
      }
      prevButtonText="이전"
      onPrevPage={onPrevPage}
      nextButtonText={
        todos.length !== 0 ? '이제 방을 체험해볼까요?' : '생략할래요!'
      }
      nextButtonStatus={todos.length !== 0}
      onNextPage={handleNextStepButtonClick}
    />
  );
};

const TodolistStyled = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
`;

const PlusTagStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PlusButton = styled.button<{ active: boolean }>`
  background: ${({ active }) =>
    active ? GradientColor.BLUE : BasicColor.GRAY70};
  border-radius: 8px;
  padding: 8px;
  margin-left: 15px;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
`;

const TagListStyled = styled.div`
  width: 100%;
  height: 15vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const TagItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 14px;
  background-color: ${BasicColor.BLUE20};
  border-radius: 8px;
`;

const TagDeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default StepC;
