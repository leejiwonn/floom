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
      if (todos.length < 5 && e.target.value.length <= 20) {
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
          <EmojiStyled>
            <Typography
              tag="span"
              font={FontType.EXTRA_BOLD_HEAD_03}
              color={BasicColor.BLUE100}
            >
              {objective}
            </Typography>
            <Emoji>{EMOJI.EYES}</Emoji>에
          </EmojiStyled>
          <br />
          몰입하며 이룰{' '}
          <EmojiStyled>
            작은 목표<Emoji>{EMOJI.OBJECTIVE}</Emoji>들을 적어주세요.
          </EmojiStyled>
        </>
      }
      content={
        <TodolistStyled>
          <PlusTagStyled>
            <TextInput
              maxLength={20}
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
              <PlusIcon width={30} height={30} stroke={BasicColor.WHITE} />
            </PlusButton>
          </PlusTagStyled>
          <TagListStyled>
            {todos?.length === 0 ? (
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
              todos?.map((todo, index) => (
                <TagItem key={index}>
                  <Typography
                    font={FontType.SEMI_BOLD_BODY}
                    color={BasicColor.BLUE100}
                  >
                    {todo.text}
                  </Typography>
                  <TagDeleteButton onClick={() => onDeleteTodo(todo)}>
                    <CloseIcon stroke={BasicColor.BLUE80} />
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

const NoneChecklist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
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

const EmojiStyled = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

const Emoji = styled.span`
  display: inline-flex;
  width: 36px;
  height: 36px;
  padding: 0 3px;
`;

export default StepC;
