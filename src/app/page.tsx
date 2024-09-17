'use client';

import Accordion from '@/components/accordion';
import Dropdown from '@/components/dropdown';
import TextInput from '@/components/input';
import ExternalLink from '@/components/link';
import {
  ButtonOptionList,
  ButtonOptionMap,
} from '@/components/option/buttonOption';
import {
  RadioOptionList,
  RadioOptionMap,
} from '@/components/option/radioOption';
import {
  calculateNoteTime,
  convertSpeed_bar,
  convertSpeed_height,
  ConvertSpeedFunction,
  Graphic,
  GRAPHIC_DJMAX,
  GRAPHIC_EZ2ON_NEW,
  GRAPHIC_EZ2ON_OLD,
} from '@/core/calculator';
import { unfocus } from '@/utility/utility';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const TITLE = 'EZ2DJMAX 노트 속도 계산기';

const DEFAULT_SELECT_GRAPHIC_TEXT = '( 선택 )';
const GRAPHIC_DJMAX_TEXT = 'DJMAX';
const GRAPHIC_EZ2ON_NEW_TEXT = 'EZ2ON (NEW)';
const GRAPHIC_EZ2ON_OLD_TEXT = 'EZ2ON (OLD)';

const CONVERT_MODE_SAME_SPEED = '동일 속도';
const CONVERT_MODE_SAME_TIME = '동일 시간';

const URL_DJMAX = 'https://store.steampowered.com/app/960170/DJMAX_RESPECT_V/';
const URL_EZ2ON = 'https://store.steampowered.com/app/1477590/EZ2ON_REBOOT__R/';
const YOUTUBE_ID_50_58 = 'lKOdpC0Jj6M';
const YOUTUBE_ID_70_81 = 'ik7PtSH1j8o';

const graphicOptionMap: ButtonOptionMap<Graphic> = new Map();
graphicOptionMap.set(GRAPHIC_DJMAX, {
  id: 'djmax',
  text: GRAPHIC_DJMAX_TEXT,
});
graphicOptionMap.set(GRAPHIC_EZ2ON_NEW, {
  id: 'ez2on-new',
  text: GRAPHIC_EZ2ON_NEW_TEXT,
});
graphicOptionMap.set(GRAPHIC_EZ2ON_OLD, {
  id: 'ez2on-old',
  text: GRAPHIC_EZ2ON_OLD_TEXT,
});

const ConvertMode = {
  SAME_SPEED: 'SAME_SPEED',
  SAME_TIME: 'SAME_TIME',
} as const;
type ConvertModeType = (typeof ConvertMode)[keyof typeof ConvertMode];

const convertModeOptionMap: RadioOptionMap<ConvertModeType> = new Map();
convertModeOptionMap.set(ConvertMode.SAME_SPEED, {
  id: 'same-speed',
  text: CONVERT_MODE_SAME_SPEED,
});
convertModeOptionMap.set(ConvertMode.SAME_TIME, {
  id: 'same-time',
  text: CONVERT_MODE_SAME_TIME,
});

export default function Home() {
  const [convertMode, setConvertMode] = useState<ConvertModeType>(
    ConvertMode.SAME_SPEED,
  );

  const [inputGraphic, setInputGraphic] = useState<Graphic>();
  const [outputGraphic, setOutputGraphic] = useState<Graphic>();

  const [inputSpeedText, setInputSpeedText] = useState('');
  const [inputTimeText, setInputTimeText] = useState('');

  const [outputSpeedText, setOutputSpeedText] = useState('');
  const [outputSpeedSubText, setOutputSpeedSubText] = useState('');
  const [outputTimeText, setOutputTimeText] = useState('');

  const getDropdownText = (graphic?: Graphic) => {
    let value = DEFAULT_SELECT_GRAPHIC_TEXT;

    if (graphic && graphicOptionMap.has(graphic)) {
      const text = graphicOptionMap.get(graphic)?.text;
      if (text) value = text;
    }

    return value;
  };

  useEffect(() => {
    if (inputSpeedText.length > 8) {
      setInputSpeedText(inputSpeedText.substring(0, 8));
      return;
    }

    setInputTimeText((0).toFixed(2));
    setOutputTimeText((0).toFixed(2));

    if (!inputGraphic || !outputGraphic) {
      const left = inputGraphic ? '!' : '?';
      const right = outputGraphic ? '!' : '?';
      setOutputSpeedText(left + '_' + right);
      setOutputSpeedSubText('변환할 대상을 선택해주세요');
      return;
    }

    if (!inputSpeedText.trim()) {
      setOutputSpeedText('-.-');
      setOutputSpeedSubText('숫자를 입력해주세요');
      return;
    }

    const inputSpeed = parseFloat(inputSpeedText);
    if (isNaN(inputSpeed)) {
      setOutputSpeedText('X_X');
      setOutputSpeedSubText('입력이 올바르지 않습니다');
      return;
    } else if (inputSpeed < 0) {
      setOutputSpeedText('+_+');
      setOutputSpeedSubText('양수를 입력해주세요');
      return;
    }

    const inputTime = calculateNoteTime(inputSpeed, inputGraphic);
    setInputTimeText((inputTime * 1000).toFixed(2));

    const converter: ConvertSpeedFunction =
      convertMode == ConvertMode.SAME_SPEED
        ? convertSpeed_bar
        : convertSpeed_height;

    const outputSpeed = converter(inputSpeed, inputGraphic, outputGraphic);
    setOutputSpeedText(outputSpeed.toFixed(1));
    setOutputSpeedSubText(outputSpeed.toFixed(4));

    const outputTime = calculateNoteTime(outputSpeed, outputGraphic);
    setOutputTimeText((outputTime * 1000).toFixed(2));
  }, [convertMode, inputGraphic, outputGraphic, inputSpeedText]);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>

      <main className="container mx-auto min-h-screen p-8 lg:max-w-screen-lg">
        <header>
          <h1 className="mx-2">{TITLE}</h1>
          <hr />
          <p className="mx-1">
            <ExternalLink href={URL_DJMAX}>DJMAX RESPECT V</ExternalLink>와
            <ExternalLink href={URL_EZ2ON}>EZ2ON REBOOT : R</ExternalLink>
            서로 간에 노트 속도를 동일하게 설정할 수 있도록 배속을 계산해주는
            계산기입니다.
          </p>
        </header>
        <div className="p-8" />

        <div className="m-auto max-w-screen-sm flex-row space-x-0 space-y-8 *:space-y-4 md:flex md:space-x-8 md:space-y-0">
          <div className="basis-3/4">
            <h2 className="text-center">변환 대상</h2>
            <div className="grid grid-cols-[max-content_auto] gap-4">
              <h2 className="content-center">입력</h2>
              <Dropdown text={getDropdownText(inputGraphic)}>
                <div className="round-button-list">
                  <ButtonOptionList
                    name="input-graphic"
                    onSelectOption={(x) => {
                      setInputGraphic(x);
                      unfocus();
                    }}
                    optionMap={graphicOptionMap}
                  />
                </div>
              </Dropdown>
              <h2 className="content-center">출력</h2>
              <Dropdown text={getDropdownText(outputGraphic)}>
                <div className="round-button-list">
                  <ButtonOptionList
                    name="output-graphic"
                    onSelectOption={(x) => {
                      setOutputGraphic(x);
                      unfocus();
                    }}
                    optionMap={graphicOptionMap}
                  />
                </div>
              </Dropdown>
            </div>
          </div>
          <div className="basis-1/4">
            <h2 className="text-center">변환 방법</h2>
            <div className="flat-radio-list">
              <RadioOptionList
                name="convert-mode"
                onSelectOption={setConvertMode}
                optionMap={convertModeOptionMap}
                selectedOptionKey={convertMode}
              />
            </div>
          </div>
        </div>
        <div className="p-8" />

        <div className="space-y-8">
          <div className="m-auto flex max-w-xl space-x-4">
            <TextInput
              className="w-full"
              id="speed"
              onChange={(e) => setInputSpeedText(e.currentTarget.value)}
              value={inputSpeedText}
            >
              Speed
            </TextInput>
            <span className="text-nowrap text-2xl text-blue-600">
              {inputTimeText} [ms]
            </span>
          </div>
          <div className="space-y-4 text-center">
            <p className="text-8xl tracking-tight">{outputSpeedText}</p>
            <p className="text-2xl">( {outputSpeedSubText} )</p>
            <p className="text-2xl text-blue-600">{outputTimeText} [ms]</p>
          </div>
        </div>
        <div className="p-16" />

        <div className="rounded-xl border-2 border-gray-200 p-4 shadow-md">
          <Accordion id="acc-help" title="도움말">
            <section className="m-4 border-y-2 border-gray-200 p-4">
              <article>
                <h2 className="p-2">변환 대상</h2>
                <p>
                  입력한 배속을 어떠한 게임의 배속으로 해석하고 변활할 것인지
                  선택합니다. 입력한 배속은 &quot;입력&quot;에 지정한 게임의
                  배속으로 해석되어 &quot;출력&quot;에 지정한 게임의 배속으로
                  변환됩니다.
                </p>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th>대상</th>
                      <th>설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{GRAPHIC_DJMAX_TEXT}</td>
                      <td>DJMAX의 배속과 스킨을 계산에 사용합니다.</td>
                    </tr>
                    <tr>
                      <td>{GRAPHIC_EZ2ON_NEW_TEXT}</td>
                      <td>
                        EZ2ON의 배속과 Judge line: NEW 설정 시의 스킨을 계산에
                        사용합니다.
                      </td>
                    </tr>
                    <tr>
                      <td>{GRAPHIC_EZ2ON_OLD_TEXT}</td>
                      <td>
                        EZ2ON의 배속과 Judge line: OLD 설정 시의 스킨을 계산에
                        사용합니다.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </article>
              <article>
                <h2 className="p-2">변환 방법</h2>
                <p>
                  입력한 배속을 어떠한 기준으로 변환할 것인지 선택합니다.
                  &quot;동일 속도&quot; 방법은 노트 속도가 동일하도록,
                  &quot;동일 시간&quot; 방법은 노트가 보이기 시작한 시점부터
                  판정선까지 도달하는 데 걸리는 시간이 동일하도록 계산합니다.
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
                      <td>{CONVERT_MODE_SAME_SPEED}</td>
                      <td>노트의 속도가 동일하도록 계산합니다.</td>
                    </tr>
                    <tr>
                      <td>{CONVERT_MODE_SAME_TIME}</td>
                      <td>노트의 출력 시간이 동일하도록 계산합니다.</td>
                    </tr>
                  </tbody>
                </table>
              </article>
              <article>
                <h2 className="p-2">사용 팁</h2>
                <p>
                  EZ2ON에서 FADE IN 1 이펙터를 사용하면 노트 출력 - 판정선
                  까지의 높이가 DJMAX 스킨과 유사해집니다. DJMAX와 EZ2ON의 서로
                  다른 스킨 높이에 적응이 힘들 경우 &quot;동일 속도&quot; 변환
                  설정과 함께 FADE IN 1 이펙터 사용을 추천합니다.
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
