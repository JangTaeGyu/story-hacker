import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findStoryEpisode, storyEpisodeIds } from '@/data/storyEpisodes';
import StoryComplete from '@/components/screens/StoryComplete';
import { toLocale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string; episodeId: string }>;
}

export function generateStaticParams() {
  return storyEpisodeIds.map((id) => ({ episodeId: id.toString() }));
}

// 부모 [locale]의 dynamicParams=false가 여기까지 내려오면, 없는 에피소드 id는
// 라우팅 단계에서 잘려 이 파일의 notFound()가 실행되지 않는다 — 상태는 404지만
// 화면은 Next 기본 404가 된다. 에피소드 세그먼트에서만 다시 열어, 잘못된 id도
// 우리 not-found 화면(app/[locale]/not-found.tsx)을 거치게 한다.
export const dynamicParams = true;

// 결과 화면은 플레이 후에만 의미가 있는 일회성 페이지다.
// robots.txt로도 막지만, 외부에서 링크되는 경우를 대비해 메타로도 못 박는다.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default async function StoryCompletePage({ params }: PageProps) {
  const { locale: raw, episodeId } = await params;
  const locale = toLocale(raw);
  const id = parseInt(episodeId, 10);
  const episode = findStoryEpisode(locale, id);

  if (!episode) {
    notFound();
  }

  const nextEpisode = findStoryEpisode(locale, id + 1);

  return (
    // useSearchParams를 쓰는 클라이언트 컴포넌트라 Suspense가 필요하다.
    // 감싸지 않으면 이 라우트 전체가 동적 렌더로 떨어진다.
    <Suspense>
      <StoryComplete
        episodeId={episode.id}
        episodeTitle={episode.title}
        epilogue={episode.epilogue ?? null}
        nextEpisodeId={nextEpisode?.id ?? null}
      />
    </Suspense>
  );
}
