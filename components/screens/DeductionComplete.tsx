'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { consumeClearToken } from '@/lib/clearToken';
import { clearRun, useProgress } from '@/lib/progress';
import { SITE_URL } from '@/lib/site';
import { useI18n } from '@/components/i18n/LocaleProvider';

interface DeductionCompleteProps {
  episodeId: number;
  episodeTitle: string;
  nextEpisodeId: number | null;
}

export default function DeductionComplete({
  episodeId,
  episodeTitle,
  nextEpisodeId,
}: DeductionCompleteProps) {
  const { t, href } = useI18n();
  const searchParams = useSearchParams();
  const queryStars = parseInt(searchParams.get('stars') || '3', 10);
  const turnsUsed = parseInt(searchParams.get('turns') || '1', 10);

  const [showContent, setShowContent] = useState(false);
  // 실제로 기록된 별점. 직접 URL로 들어온 경우에는 null로 남는다.
  const [awardedStars, setAwardedStars] = useState<number | null>(null);
  const { recordClear, isInitialized } = useProgress();

  // 에피소드 완료 저장 (localStorage 초기화 완료 후 실행)
  useEffect(() => {
    if (!isInitialized) return;

    // 방금 끝낸 판이 발급한 토큰이 있을 때만 기록한다.
    // 쿼리스트링의 stars는 표시에만 쓰고 신뢰하지 않는다.
    const stars = consumeClearToken('deduction', episodeId);
    if (stars === null) return;

    setAwardedStars(stars);
    recordClear(episodeId, stars);
    // 에피소드를 끝냈으므로 이어하기 지점은 필요 없다.
    clearRun('deduction', episodeId);
  }, [isInitialized, episodeId, recordClear]);

  const stars = awardedStars ?? queryStars;

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // 공유 문구는 한 곳에서 만든다 — 버튼마다 따로 쓰면 언어가 어긋난다.
  const shareText = t.share.deduction(
    episodeId - 100,
    episodeTitle,
    `${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}`,
    turnsUsed
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-noct-black">
      <div
        className={`w-full max-w-xs lg:max-w-sm text-center ${
          showContent ? 'animate-fadeIn' : 'opacity-0'
        }`}
      >
        {/* 서브라인 */}
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-faint mb-5">
          {t.complete.deduction.eyebrow}
        </p>

        {/* 타이틀 */}
        <h1 className="font-display text-4xl text-noct-gold mb-4">
          {t.complete.deduction.title}
        </h1>

        {/* 에피소드 */}
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-noct-ink-dim mb-8">
          EP.{episodeId - 100} — {episodeTitle}
        </p>

        {/* 골드 그라데이션 디바이더 */}
        <div className="h-px w-24 mx-auto mb-8 bg-gradient-to-r from-transparent via-noct-gold-dim to-transparent" />

        {/* 별점 */}
        <div className="mb-2 text-3xl tracking-[0.2em]">
          <span className="text-noct-gold">{'★'.repeat(stars)}</span>
          <span className="text-noct-ink-faint">{'☆'.repeat(3 - stars)}</span>
        </div>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-dim mb-1">
          {t.complete.deduction.ranks[stars - 1]}
        </p>
        <p className="font-serif text-xs text-noct-ink-faint mb-10">
          {t.complete.deduction.attempt(turnsUsed)}
        </p>

        {/* SNS 공유 */}
        <div className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-faint mb-4">
            {t.complete.share}
          </p>
          <div className="flex justify-center gap-3">
            {/* X (Twitter) */}
            <button
              onClick={() => {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
              }}
              className="w-11 h-11 bg-noct-black-2 border border-noct-ink/10 flex items-center justify-center hover:border-noct-ink/25 transition-colors"
              title="X"
            >
              <svg className="w-4 h-4 text-noct-ink-dim" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            {/* Facebook */}
            <button
              onClick={() => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}&quote=${encodeURIComponent(shareText)}`, '_blank');
              }}
              className="w-11 h-11 bg-noct-black-2 border border-noct-ink/10 flex items-center justify-center hover:border-noct-ink/25 transition-colors"
              title="Facebook"
            >
              <svg className="w-4 h-4 text-noct-ink-dim" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.092.042 1.543.084v3.244h-1.1c-1.637 0-2.144.619-2.144 2.228v2.002h3.094l-.532 3.667h-2.562v8.08z" />
              </svg>
            </button>
            {/* Threads */}
            <button
              onClick={() => {
                window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(shareText)}`, '_blank');
              }}
              className="w-11 h-11 bg-noct-black-2 border border-noct-ink/10 flex items-center justify-center hover:border-noct-ink/25 transition-colors"
              title="Threads"
            >
              <svg className="w-4 h-4 text-noct-ink-dim" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.775.776c-1.035-3.718-3.541-5.583-7.546-5.604-2.643.018-4.631.92-5.912 2.682-1.166 1.604-1.762 3.926-1.782 6.583.02 2.656.616 4.976 1.782 6.58 1.281 1.764 3.272 2.666 5.912 2.683 1.99-.013 3.546-.474 4.651-1.394.957-.8 1.59-1.967 1.867-3.395-.726-.037-1.467-.116-2.206-.24-1.918-.32-3.56-.958-4.757-1.846-1.397-1.035-2.108-2.442-2.108-4.078 0-1.487.618-2.77 1.788-3.715 1.06-.856 2.462-1.33 3.937-1.33.975 0 1.876.2 2.654.558-.163-.86-.406-1.593-.742-2.187-.49-.867-1.205-1.516-2.123-1.93-.892-.4-1.965-.61-3.18-.623l.012-2.739c1.633.017 3.088.315 4.32.886 1.287.597 2.303 1.497 3.02 2.674.63 1.035 1.04 2.259 1.25 3.621.408.147.793.318 1.152.516 1.395.77 2.376 1.92 2.826 3.317.346 1.075.392 2.383.017 3.678-.576 1.99-2.07 3.54-4.305 4.47-1.372.57-2.985.883-4.787.927zm1.873-8.694c.357.06.707.103 1.044.13.07-1.263-.236-2.178-.904-2.684-.498-.377-1.143-.567-1.918-.567-.707 0-1.322.194-1.773.558-.455.367-.685.84-.685 1.403 0 .736.37 1.334 1.1 1.777.798.484 1.91.847 3.136 1.383z" />
              </svg>
            </button>
            {/* 텍스트 복사 */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareText);
                alert(t.complete.copied);
              }}
              className="w-11 h-11 bg-noct-black-2 border border-noct-ink/10 flex items-center justify-center hover:border-noct-ink/25 transition-colors"
              title={t.complete.copy}
            >
              <svg className="w-4 h-4 text-noct-ink-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="space-y-4">
          {nextEpisodeId !== null && (
            <Link
              href={href(`/deduction/${nextEpisodeId}`)}
              className="block w-full py-3.5 border border-noct-gold-dim text-noct-gold font-mono text-[11px] tracking-[0.3em] uppercase hover:bg-noct-gold/5 transition-colors"
            >
              {t.common.nextEpisode}
            </Link>
          )}
          <Link
            href={href(`/deduction/${episodeId}`)}
            className="block font-mono text-[11px] tracking-[0.3em] uppercase text-noct-ink-dim hover:text-noct-ink transition-colors"
          >
            <span className="border-b border-noct-ink/20 pb-1">{t.common.replay}</span>
          </Link>
          <Link
            href={href('/deduction')}
            className="block font-mono text-[11px] tracking-[0.3em] uppercase text-noct-ink-dim hover:text-noct-ink transition-colors"
          >
            <span className="border-b border-noct-ink/20 pb-1">{t.common.episodeSelect}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
