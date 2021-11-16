import styled from '@emotion/styled';

import WorkEmoji from '../../public/assets/emojis/emoji-work.svg';
import VisitEmoji from '../../public/assets/emojis/emoji-visit.svg';
import StudyEmoji from '../../public/assets/emojis/emoji-study.svg';
import StopEmoji from '../../public/assets/emojis/emoji-stop.svg';
import SpeechEmoji from '../../public/assets/emojis/emoji-speech.svg';
import RestEmoji from '../../public/assets/emojis/emoji-rest.svg';
import ExclamationMarkEmoji from '../../public/assets/emojis/emoji-exclamation-mark.svg';
import QuestionMarkEmoji from '../../public/assets/emojis/emoji-question-mark.svg';
import RecommendEmoji from '../../public/assets/emojis/emoji-recommend.svg';
import PlayEmoji from '../../public/assets/emojis/emoji-play.svg';
import ObjectiveEmoji from '../../public/assets/emojis/emoji-objective.svg';
import NextEmoji from '../../public/assets/emojis/emoji-next.svg';
import MusicEmoji from '../../public/assets/emojis/emoji-music.svg';
import HeartEmoji from '../../public/assets/emojis/emoji-heart.svg';
import EyesEmoji from '../../public/assets/emojis/emoji-eyes.svg';
import ClockEmoji from '../../public/assets/emojis/emoji-clock.svg';
import Check1Emoji from '../../public/assets/emojis/emoji-check1.svg';
import Check2Emoji from '../../public/assets/emojis/emoji-check2.svg';
import LightEmoji from '../../public/assets/emojis/emoji-light.svg';

import ClockGateEmoji from '../../public/assets/emojis/gate/emoji-gate-clock.svg';
import EyesGateEmoji from '../../public/assets/emojis/gate/emoji-gate-eyes.svg';
import LaptopGateEmoji from '../../public/assets/emojis/gate/emoji-gate-laptop.svg';
import LightGateEmoji from '../../public/assets/emojis/gate/emoji-gate-light.svg';
import SparkleGateEmoji from '../../public/assets/emojis/gate/emoji-gate-sparkle.svg';
import OneGateEmoji from '../../public/assets/emojis/gate/emoji-gate-one.svg';
import TwoGateEmoji from '../../public/assets/emojis/gate/emoji-gate-two.svg';
import ThreeGateEmoji from '../../public/assets/emojis/gate/emoji-gate-three.svg';

const EMOJI = {
  WORK: <WorkEmoji width="3.7em" height="2.9em" />,
  VISIT: <VisitEmoji width="3em" height="3em" />,
  STUDY: <StudyEmoji width="2.9em" height="2.8em" />,
  STOP: <StopEmoji />,
  SPEECH: <SpeechEmoji />,
  REST: <RestEmoji width="3em" height="3.2em" />,
  EXCLAMATION_MARK: <ExclamationMarkEmoji />,
  QUESTION_MARK: <QuestionMarkEmoji />,
  RECOMMEND: <RecommendEmoji />,
  PLAY: <PlayEmoji />,
  OBJECTIVE: <ObjectiveEmoji />,
  NEXT: <NextEmoji />,
  MUSIC: <MusicEmoji />,
  HEART: <HeartEmoji />,
  EYES: <EyesEmoji />,
  CLOCK: <ClockEmoji />,
  CHECK1: <Check1Emoji />,
  CHECK2: <Check2Emoji />,
  LIGHT: <LightEmoji />,
};

const EmojiStyled = styled.div`
  width: 4em;
  height: 4em;
  display: inline-block;
  position: relative;
  margin: 0 0.4em;

  svg {
    position: absolute;
    top: 0.8em;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const GATE_EMOJI = {
  CLOCK: (
    <EmojiStyled>
      <ClockGateEmoji />
    </EmojiStyled>
  ),
  EYES: (
    <EmojiStyled>
      <EyesGateEmoji />
    </EmojiStyled>
  ),
  LAPTOP: (
    <EmojiStyled>
      <LaptopGateEmoji />
    </EmojiStyled>
  ),
  LIGHT: (
    <EmojiStyled>
      <LightGateEmoji />
    </EmojiStyled>
  ),
  SPARKLE: (
    <EmojiStyled>
      <SparkleGateEmoji />
    </EmojiStyled>
  ),
  ONE: <OneGateEmoji />,
  TWO: <TwoGateEmoji />,
  THREE: <ThreeGateEmoji />,
};

export default EMOJI;
