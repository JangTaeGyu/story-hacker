import type { StoryEpisode } from '@/lib/types';

// 에피소드 1편 = 파일 1개. 새 에피소드는 ep-NN.ts를 만들고 아래 두 곳에 등록한다.
import ep01 from './ep-01';
import ep02 from './ep-02';
import ep03 from './ep-03';
import ep04 from './ep-04';
import ep05 from './ep-05';
import ep06 from './ep-06';
import ep07 from './ep-07';
import ep08 from './ep-08';
import ep09 from './ep-09';
import ep10 from './ep-10';
import ep11 from './ep-11';
import ep12 from './ep-12';
import ep13 from './ep-13';
import ep14 from './ep-14';
import ep15 from './ep-15';
import ep16 from './ep-16';
import ep17 from './ep-17';
import ep18 from './ep-18';
import ep19 from './ep-19';
import ep20 from './ep-20';

const episodes: StoryEpisode[] = [
  ep01, ep02, ep03, ep04, ep05,
  ep06, ep07, ep08, ep09, ep10,
  ep11, ep12, ep13, ep14, ep15,
  ep16, ep17, ep18, ep19, ep20,
];

export default episodes;
