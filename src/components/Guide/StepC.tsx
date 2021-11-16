import styled from '@emotion/styled';
import { useState, useCallback } from 'react';

import { BasicColor, GradientColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';
import TextInput from '~/components/TextInput';
import Typography from '~/components/Typography';
import { Todo } from '~/types/Obejct';
import EMOJI from '~/constants/emoji';
import StepTemplate from './StepTemplate';

import PlusIcon from '../../../public/assets/icons/icon-plus.svg';
import CloseIcon from '../../../public/assets/icons/icon-close.svg';

interface Props {
  objective: string;
  placeholderInfo: string;
  todos: Todo[];
  onChangeTodos: (todo: Todo) => void;
  onDeleteTodo: (todo: Todo) => void;
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
      if (todos.length < 5 && e.target.value.length <= 30) {
        setTextInput(e.target.value);
      }
    },
    [todos, setTextInput],
  );

  const handlePlusButtonClick = () => {
    if (todos.length < 5) {
      onChangeTodos({ text: textInput, clear: false });
      setTextInput('');
    }
  };

  const handleNextStepButtonClick = () => {
    onNextPage?.();
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
          <Emoji>{EMOJI.EYES}</Emoji>에 몰입하며
          <br />
          이룰 작은 목표<Emoji>{EMOJI.OBJECTIVE}</Emoji>들을 적어주세요.
        </>
      }
      content={
        <TodolistStyled>
          <PlusTagStyled>
            <TextInput
              maxLength={30}
              value={textInput}
              onChangeInput={handleChangeInput}
              placeholder={todos.length < 5 ? placeholderInfo : '입력 끝!'}
              marginLeft={-0.5}
              font={FontType.BOLD_TITLE_01}
            />
            <PlusButton
              onClick={handlePlusButtonClick}
              active={todos.length < 5}
            >
              <PlusIcon width="3em" height="3em" stroke={BasicColor.WHITE} />
            </PlusButton>
          </PlusTagStyled>
          <TagListStyled className="scrollbar">
            {todos?.length === 0 ? (
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
              todos?.map((todo, index) => (
                <TagItem key={index}>
                  <Typography
                    font={FontType.SEMI_BOLD_BODY}
                    color={BasicColor.BLUE100}
                  >
                    {todo.text}
                  </Typography>
                  <TagDeleteButton onClick={() => onDeleteTodo(todo)}>
                    <CloseIcon
                      width="2.2em"
                      height="2.2em"
                      stroke={BasicColor.BLUE80}
                    />
                  </TagDeleteButton>
                </TagItem>
              ))
            )}
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
  margin-top: 4em;
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
  border-radius: 0.8em;
  padding: 0.8em;
  margin-left: 1.5em;
`;

const TagListStyled = styled.div`
  width: 100%;
  height: 20vh;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  margin-top: 3em;
`;

const NoneChecklist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1em;
`;

const TagItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  margin-bottom: 1.4em;
  background-color: ${BasicColor.BLUE20};
  border-radius: 0.8em;
`;

const TagDeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Emoji = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3.6em;
  height: 3.6em;
  padding: 0 0.4em;
`;

export default StepC;
