import Accordion from '@/components/accordion';
import TextInput from '@/components/input';
import ExternalLink from '@/components/link';
import Radio from '@/components/radio';
import RoundRadio from '@/components/roundRadio';
import {
  Mode,
  ModeType,
  calcToDjmax,
  calcToEz2on,
} from '@/core/speedCalculator';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const MODE_NEW_TEXT = '동일 시간 (NEW)';
const MODE_OLD_TEXT = '동일 시간 (OLD)';
const MODE_SAME_TEXT = '동일 속도';
const TITLE = 'EZ2DJMAX 노트 속도 계산기';
const TO_DJMAX_TEXT = 'to DJMAX';
const TO_EZ2ON_TEXT = 'to EZ2ON';
const URL_DJMAX = 'https://store.steampowered.com/app/960170/DJMAX_RESPECT_V/';
const URL_EZ2ON = 'https://store.steampowered.com/app/1477590/EZ2ON_REBOOT__R/';
const YOUTUBE_ID_50_58 = 'lKOdpC0Jj6M';
const YOUTUBE_ID_70_81 = 'ik7PtSH1j8o';

export default function Home() {
  const [direction, setDirection] = useState<DirectionType>(Direction.TO_DJMAX);
  const [mode, setMode] = useState<ModeType>(Mode.SAME);
  const [speed, setSpeed] = useState('5');

  const [output, setOutput] = useState('');
  const [subOutput, setSubOutput] = useState('');

  const onChangeSpeed = (value: string) => {
    if (value.length <= 8) {
      setSpeed(value);
    }
  };

  const showError = (message: string) => {
    setOutput('X_X');
    setSubOutput(message);
  };

  const showValue = (value: number) => {
    setOutput((Math.round(value * 10) / 10).toFixed(1));
    setSubOutput((Math.round(value * 10000) / 10000).toFixed(4));
  };

  useEffect(() => {
    if (speed.length > 8) {
      setSpeed(speed.substring(0, 8));
      return;
    }

    if (!speed.trim()) {
      setOutput('-.-');
      setSubOutput('숫자를 입력해주세요');
      return;
    }

    let input = parseFloat(speed);
    if (isNaN(input)) {
      showError('입력이 잘못되었습니다');
      return;
    } else if (input < 0) {
      showError('양수를 입력해주세요');
      return;
    }

    const calc = direction === Direction.TO_DJMAX ? calcToDjmax : calcToEz2on;
    let value = calc(input, mode);
    showValue(value);
  }, [direction, mode, speed]);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>

      <main className="container mx-auto min-h-screen max-w-screen-xl p-8">
        <header>
          <h1 className="mx-2">{TITLE}</h1>
          <hr />
          <p className="mx-1">
            <ExternalLink href={URL_DJMAX}>DJMAX RESPECT V</ExternalLink>와
            <ExternalLink href={URL_EZ2ON}>EZ2ON REBOOT : R</ExternalLink>
            서로 간에 노트 속도를 동일하게 설정할 수 있도록 배속을 계산해주는
            간단한 계산기입니다.
          </p>
        </header>
        <div className="p-8" />

        <div className="container mx-auto flex max-w-screen-sm flex-col">
          <div className="flex space-x-4">
            <div className="flex w-full flex-col items-end justify-around">
              <RoundRadio.Group className="w-full max-w-[256px]">
                <RoundRadio
                  checked={direction === Direction.TO_DJMAX}
                  id="direction-djmax"
                  name="direction"
                  onChange={() => setDirection(Direction.TO_DJMAX)}
                >
                  {TO_DJMAX_TEXT}
                </RoundRadio>
                <RoundRadio
                  checked={direction === Direction.TO_EZ2ON}
                  id="direction-ez2on"
                  name="direction"
                  onChange={() => setDirection(Direction.TO_EZ2ON)}
                >
                  {TO_EZ2ON_TEXT}
                </RoundRadio>
              </RoundRadio.Group>
              <TextInput
                className="h-10 w-full max-w-[256px]"
                id="speed"
                label="Speed"
                onChange={(e) => onChangeSpeed(e.currentTarget.value)}
                value={speed}
              />
            </div>
            <div className="w-full">
              <Radio.Group>
                <Radio
                  checked={mode === Mode.SAME}
                  id="mode-same"
                  name="mode"
                  onChange={() => setMode(Mode.SAME)}
                >
                  <span className="text-xl font-light">{MODE_SAME_TEXT}</span>
                </Radio>
                <Radio
                  checked={mode === Mode.NEW}
                  id="mode-new"
                  name="mode"
                  onChange={() => setMode(Mode.NEW)}
                >
                  <span className="text-xl font-light">{MODE_NEW_TEXT}</span>
                </Radio>
                <Radio
                  checked={mode === Mode.OLD}
                  id="mode-old"
                  name="mode"
                  onChange={() => setMode(Mode.OLD)}
                >
                  <span className="text-xl font-light">{MODE_OLD_TEXT}</span>
                </Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="p-4" />
          <p className="text-center text-8xl tracking-tight">{output}</p>
          <div className="p-2" />
          <p className="text-center text-2xl">( {subOutput} )</p>
        </div>
        <div className="p-8" />

        <div className="rounded-xl border-2 border-gray-200 p-4 shadow-md">
          <Accordion id="acc-help" title="도움말">
            <section className="m-4 border-y-2 border-gray-200 p-4">
              <article>
                <h2 className="p-2">변환 방향</h2>
                <p>입력한 배속을 어떠한 방향으로 변환할 것인지 선택합니다.</p>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th>방향</th>
                      <th>설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{TO_DJMAX_TEXT}</td>
                      <td>입력한 배속을 DJMAX 배속으로 변환합니다.</td>
                    </tr>
                    <tr>
                      <td>{TO_EZ2ON_TEXT}</td>
                      <td>입력한 배속을 EZ2ON 배속으로 변환합니다.</td>
                    </tr>
                  </tbody>
                </table>
              </article>
              <article>
                <h2 className="p-2">변환 방법</h2>
                <p>
                  입력한 배속을 어떠한 기준으로 변환할 것인지 선택합니다. 동일
                  속도 방법은 노트 속도가 동일하도록, 동일 시간 방법은 노트가
                  보이기 시작한 시점부터 판정선까지 도달하는 데 걸리는 시간이
                  동일하도록 계산합니다.
                </p>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th>방법</th>
                      <th>설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{MODE_SAME_TEXT}</td>
                      <td>
                        스킨의 비율에 관계 없이 노트의 속도가 동일하도록
                        계산합니다.
                      </td>
                    </tr>
                    <tr>
                      <td>{MODE_NEW_TEXT}</td>
                      <td>
                        EZ2ON의 Judge line: NEW 설정 시의 스킨 높이를 고려하여
                        노트 속도를 계산합니다.
                      </td>
                    </tr>
                    <tr>
                      <td>{MODE_OLD_TEXT}</td>
                      <td>
                        EZ2ON의 Judge line: OLD 설정 시의 스킨 높이를 고려하여
                        노트 속도를 계산합니다.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </article>
              <article>
                <h2 className="p-2">사용 팁</h2>
                <p>
                  EZ2ON에서 FADE IN 1 이펙터를 사용하면 노트 출력 - 판정선
                  까지의 높이가 DJMAX 스킨과 유사해집니다. DJMAX와 EZ2ON의 서로
                  다른 스킨 높이에 적응이 힘들 경우 동일 속도 변환 설정과 함께
                  FADE IN 1 이펙터 사용을 추천합니다.
                </p>
              </article>
            </section>
          </Accordion>
          <hr className="bg-gray-400" />
          <Accordion id="acc-comp" title="비교 영상">
            <section className="m-4 border-y-2 border-gray-200 p-4">
              <div className="flex flex-wrap justify-evenly">
                <YoutubeBox
                  id={YOUTUBE_ID_50_58}
                  title="DJMAX 5.0 - EZ2ON 5.8"
                />
                <YoutubeBox
                  id={YOUTUBE_ID_70_81}
                  title="DJMAX 7.0 - EZ2ON 8.1"
                />
              </div>
            </section>
          </Accordion>
        </div>
      </main>
    </>
  );
}

export const Direction = {
  TO_DJMAX: 'TO_DJMAX',
  TO_EZ2ON: 'TO_EZ2ON',
} as const;
type DirectionType = (typeof Direction)[keyof typeof Direction];

type YoutubeBoxType = {
  id: string;
  title: string;
};

function YoutubeBox({ id, title }: YoutubeBoxType) {
  const onPlayerReady: YouTubeProps['onReady'] = (e) => {
    e.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '324',
    width: '300',
  };

  return (
    <figure className="m-2 inline-flex flex-col items-center">
      <YouTube onReady={onPlayerReady} opts={opts} videoId={id} />
      <figcaption>{title}</figcaption>
    </figure>
  );
}
