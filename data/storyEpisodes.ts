import type { StoryEpisode } from '@/lib/types';

// 에피소드는 data/story/ep-NN.ts 모듈로 분리되어 있습니다.
// 새 에피소드 추가: data/story/ep-NN.ts 생성 후 아래 import와 배열에 등록.
import ep01 from './story/ep-01';
import ep02 from './story/ep-02';
import ep03 from './story/ep-03';
import ep04 from './story/ep-04';
import ep05 from './story/ep-05';
import ep06 from './story/ep-06';
import ep07 from './story/ep-07';
import ep08 from './story/ep-08';
import ep09 from './story/ep-09';
import ep10 from './story/ep-10';
import ep11 from './story/ep-11';
import ep12 from './story/ep-12';
import ep13 from './story/ep-13';
import ep14 from './story/ep-14';
import ep15 from './story/ep-15';
import ep16 from './story/ep-16';
import ep17 from './story/ep-17';
import ep18 from './story/ep-18';
import ep19 from './story/ep-19';
import ep20 from './story/ep-20';

export const storyEpisodes: StoryEpisode[] = [
  ep01, ep02, ep03, ep04, ep05,
  ep06, ep07, ep08, ep09, ep10,
  ep11, ep12, ep13, ep14, ep15,
  ep16, ep17, ep18, ep19, ep20,
];
