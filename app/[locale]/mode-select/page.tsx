import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { storyEpisodeIds } from '@/data/storyEpisodes';
import { deductionEpisodeIds } from '@/data/deductionEpisodes';
import { localePath, toLocale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { alternatesFor, breadcrumbJsonLd, openGraphLocale } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Header from '@/components/ui/Header';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = getMessages(locale);

  return {
    title: t.meta.modeSelect.title,
    description: t.meta.modeSelect.description,
    alternates: alternatesFor(locale, '/mode-select'),
    openGraph: {
      ...openGraphLocale(locale),
      title: t.meta.modeSelect.title,
      description: t.meta.modeSelect.description,
    },
  };
}

export default async function ModeSelectPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getMessages(locale);

  const modes = [
    {
      key: 'story' as const,
      href: localePath(locale, '/story'),
      act: 'Act I',
      image: '/images/story/ep-1.png',
      count: storyEpisodeIds.length,
      ...t.modeSelect.story,
    },
    {
      key: 'deduction' as const,
      href: localePath(locale, '/deduction'),
      act: 'Act II',
      image: '/images/story/ep-11.png',
      count: deductionEpisodeIds.length,
      ...t.modeSelect.deduction,
    },
  ];

  return (
    <div className="min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: 'Story Hacker', path: '' },
          { name: t.meta.modeSelect.title, path: '/mode-select' },
        ])}
      />
      <Header backHref={localePath(locale)} right={<LanguageSwitcher />} />

      <div className="mx-auto max-w-md lg:max-w-6xl px-7 lg:px-8 pt-24 pb-12">
        {/* 타이틀 */}
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-faint">
          {t.modeSelect.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl text-noct-ink">{t.modeSelect.title}</h1>

        {/* 모드 선택 */}
        <div className="mt-9 space-y-px lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
          {modes.map((mode) => (
            <Link
              key={mode.key}
              href={mode.href}
              className="group block border-t border-noct-ink/10 pt-6 pb-7 transition-colors"
            >
              <div className="relative h-28 lg:h-44 w-full overflow-hidden">
                <Image
                  src={mode.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 480px, 448px"
                  className="noct-img object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-noct-black via-noct-black/30 to-noct-black/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-noct-black to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-5">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-noct-ink-faint">
                    {mode.act}
                  </span>
                  <h2 className="mt-1 font-display text-2xl text-noct-ink">{mode.name}</h2>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <p className="font-serif text-sm leading-relaxed text-noct-ink-dim">
                  {mode.description}
                </p>
                <span className="shrink-0 font-mono text-[10px] tracking-[0.15em] uppercase text-noct-ink-faint">
                  {mode.count} EP
                </span>
              </div>
              <div className="mt-3 flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
                <span>{mode.tags[0]}</span>
                <span>·</span>
                <span>{mode.tags[1]}</span>
                <span className="ml-auto text-noct-gold-dim transition-colors group-hover:text-noct-gold">
                  {t.modeSelect.enter} ▸
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 모드 차이 설명 */}
        <div className="mt-10 border-t border-noct-ink/10 pt-5">
          <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-noct-ink-faint">
            {t.modeSelect.differenceTitle}
          </h3>
          <div className="mt-3 space-y-2 font-serif text-[13px] leading-relaxed text-noct-ink-dim">
            <p>
              <span className="text-noct-ink">{t.modeSelect.story.shortName}</span> —{' '}
              {t.modeSelect.story.difference}
            </p>
            <p>
              <span className="text-noct-ink">{t.modeSelect.deduction.shortName}</span> —{' '}
              {t.modeSelect.deduction.difference}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
