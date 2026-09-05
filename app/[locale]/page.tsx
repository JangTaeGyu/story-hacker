import Link from 'next/link';
import Image from 'next/image';
import { storyEpisodeIds } from '@/data/storyEpisodes';
import { deductionEpisodeIds } from '@/data/deductionEpisodes';
import { localePath, toLocale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { websiteJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getMessages(locale);

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col lg:grid lg:max-w-6xl lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
      <JsonLd data={websiteJsonLd(locale, t.site.description)} />

      {/* 상단 마이크로 라벨 */}
      <p className="absolute top-6 inset-x-0 z-20 text-center font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-faint">
        {t.home.eyebrow}
      </p>

      {/* 언어 전환 — 홈에서는 우상단 */}
      <LanguageSwitcher className="absolute top-6 right-5 z-30 lg:right-8" />

      {/* 히어로 이미지 — 상단을 채우고 어둠으로 녹아든다 */}
      <div className="relative w-full h-[58vh] min-h-[320px] lg:order-2 lg:h-[76vh]">
        <Image
          src="/images/story/ep-1.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 576px, 448px"
          className="noct-img object-cover object-center"
        />
        {/* noct-black 으로 그라데이션 페이드 */}
        <div className="absolute inset-0 bg-gradient-to-b from-noct-black/50 via-noct-black/10 to-noct-black lg:bg-gradient-to-l lg:from-noct-black/40 lg:via-transparent lg:to-noct-black" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-noct-black" />
        {/* 데스크톱: 위쪽 가장자리도 묻어 사진이 붙여넣은 사각형처럼 보이지 않게 한다 */}
        <div className="absolute inset-x-0 top-0 hidden h-1/4 bg-gradient-to-b from-noct-black to-transparent lg:block" />
      </div>

      {/* 하단 어두운 영역 */}
      <div className="relative z-10 flex-1 -mt-12 px-7 pb-12 flex flex-col lg:order-1 lg:mt-0 lg:px-0 lg:pb-0">
        {/* 워드마크 */}
        <h1 className="font-display leading-[0.95]">
          <span className="block text-5xl sm:text-6xl lg:text-7xl text-noct-ink">STORY</span>
          <span className="block text-5xl sm:text-6xl lg:text-7xl text-noct-ink-dim">HACKER</span>
        </h1>

        {/* 태그라인 */}
        <p className="mt-5 font-serif text-[15px] leading-relaxed text-noct-ink-dim">
          {t.home.tagline}
        </p>

        {/* 진입 액션 — 조용한 텍스트 링크 */}
        <Link
          href={localePath(locale, '/mode-select')}
          className="group mt-10 inline-flex items-center gap-3 self-start"
        >
          <span className="font-serif text-lg text-noct-ink transition-colors group-hover:text-noct-gold">
            {t.home.cta}
          </span>
          <span className="text-noct-gold text-sm transition-transform group-hover:translate-x-1">
            ▸
          </span>
        </Link>
        <span className="mt-2 block h-px w-28 bg-noct-gold-dim/60" />

        {/* 에피소드 카운트 — 조용히 */}
        <p className="mt-auto pt-12 font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
          Story {storyEpisodeIds.length} · Deduction {deductionEpisodeIds.length}
        </p>
      </div>
    </div>
  );
}
