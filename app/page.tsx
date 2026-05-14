import Link from 'next/link';
import Image from 'next/image';
import { storyEpisodes } from '@/data/storyEpisodes';
import { deductionEpisodes } from '@/data/deductionEpisodes';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 상단 마이크로 라벨 */}
      <p className="absolute top-6 inset-x-0 z-20 text-center font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-faint">
        A Mystery In Twenty Acts
      </p>

      {/* 히어로 이미지 — 상단을 채우고 어둠으로 녹아든다 */}
      <div className="relative w-full h-[58vh] min-h-[320px]">
        <Image
          src="/images/story/ep-1.png"
          alt=""
          fill
          priority
          sizes="448px"
          className="noct-img object-cover object-center"
        />
        {/* noct-black 으로 그라데이션 페이드 */}
        <div className="absolute inset-0 bg-gradient-to-b from-noct-black/50 via-noct-black/10 to-noct-black" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-noct-black" />
      </div>

      {/* 하단 어두운 영역 */}
      <div className="relative z-10 flex-1 -mt-12 px-7 pb-12 flex flex-col">
        {/* 워드마크 */}
        <h1 className="font-display leading-[0.95]">
          <span className="block text-5xl sm:text-6xl text-noct-ink">STORY</span>
          <span className="block text-5xl sm:text-6xl text-noct-ink-dim">HACKER</span>
        </h1>

        {/* 태그라인 */}
        <p className="mt-5 font-serif text-[15px] leading-relaxed text-noct-ink-dim">
          새벽 3시, 풀리지 않은 사건 하나가 당신을 기다린다.
        </p>

        {/* 진입 액션 — 조용한 텍스트 링크 */}
        <Link
          href="/mode-select"
          className="group mt-10 inline-flex items-center gap-3 self-start"
        >
          <span className="font-serif text-lg text-noct-ink transition-colors group-hover:text-noct-gold">
            사건 파일 열기
          </span>
          <span className="text-noct-gold text-sm transition-transform group-hover:translate-x-1">
            ▸
          </span>
        </Link>
        <span className="mt-2 block h-px w-28 bg-noct-gold-dim/60" />

        {/* 에피소드 카운트 — 조용히 */}
        <p className="mt-auto pt-12 font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
          Story {storyEpisodes.length} · Deduction {deductionEpisodes.length}
        </p>
        <p className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint/70">
          v3.0.0 — Next.js
        </p>
      </div>
    </div>
  );
}
