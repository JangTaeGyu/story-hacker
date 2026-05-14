import Link from 'next/link';
import Image from 'next/image';
import { storyEpisodes } from '@/data/storyEpisodes';
import { deductionEpisodes } from '@/data/deductionEpisodes';
import Header from '@/components/ui/Header';

export default function ModeSelectPage() {
  return (
    <div className="min-h-screen">
      <Header backHref="/" />

      <div className="px-7 pt-24 pb-12">
        {/* 타이틀 */}
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-faint">
          Choose Your Approach
        </p>
        <h2 className="mt-2 font-display text-3xl text-noct-ink">수사 방식</h2>

        {/* 모드 선택 */}
        <div className="mt-9 space-y-px">
          {/* 스토리 모드 */}
          <Link
            href="/story"
            className="group block border-t border-noct-ink/10 pt-6 pb-7 transition-colors"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <Image
                src="/images/story/ep-1.png"
                alt=""
                fill
                sizes="448px"
                className="noct-img object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-noct-black via-noct-black/30 to-noct-black/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-noct-black to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-noct-ink-faint">
                  Act I
                </span>
                <h3 className="mt-1 font-display text-2xl text-noct-ink">스토리 모드</h3>
              </div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <p className="font-serif text-sm leading-relaxed text-noct-ink-dim">
                이야기 속에 흩어진 단서를 읽어 비밀번호를 추리한다.
              </p>
              <span className="shrink-0 font-mono text-[10px] tracking-[0.15em] uppercase text-noct-ink-faint">
                {storyEpisodes.length} EP
              </span>
            </div>
            <div className="mt-3 flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
              <span>독해</span>
              <span>·</span>
              <span>추론</span>
              <span className="ml-auto text-noct-gold-dim transition-colors group-hover:text-noct-gold">
                들어가기 ▸
              </span>
            </div>
          </Link>

          {/* 추리 모드 */}
          <Link
            href="/deduction"
            className="group block border-t border-noct-ink/10 pt-6 pb-7 transition-colors"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <Image
                src="/images/story/ep-11.png"
                alt=""
                fill
                sizes="448px"
                className="noct-img object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-noct-black via-noct-black/30 to-noct-black/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-noct-black to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-noct-ink-faint">
                  Act II
                </span>
                <h3 className="mt-1 font-display text-2xl text-noct-ink">추리 모드</h3>
              </div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <p className="font-serif text-sm leading-relaxed text-noct-ink-dim">
                턴마다 드러나는 단서를 종합해 비밀번호를 해독한다.
              </p>
              <span className="shrink-0 font-mono text-[10px] tracking-[0.15em] uppercase text-noct-ink-faint">
                {deductionEpisodes.length} EP
              </span>
            </div>
            <div className="mt-3 flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
              <span>논리</span>
              <span>·</span>
              <span>연역</span>
              <span className="ml-auto text-noct-gold-dim transition-colors group-hover:text-noct-gold">
                들어가기 ▸
              </span>
            </div>
          </Link>
        </div>

        {/* 모드 차이 설명 */}
        <div className="mt-10 border-t border-noct-ink/10 pt-5">
          <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-noct-ink-faint">
            Mode Difference
          </h4>
          <div className="mt-3 space-y-2 font-serif text-[13px] leading-relaxed text-noct-ink-dim">
            <p>
              <span className="text-noct-ink">스토리</span> — 일러스트와 함께 사건에 몰입하며 추리한다.
            </p>
            <p>
              <span className="text-noct-ink">추리</span> — 틀릴 때마다 새 단서가 열린다. 빠를수록 높은
              평가.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
