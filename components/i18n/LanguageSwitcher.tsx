'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeMeta, localePath, stripLocale } from '@/lib/i18n';
import { useI18n } from './LocaleProvider';

/**
 * 언어 전환 — 현재 화면의 같은 위치로 건너간다.
 *
 * 검색엔진 입장에서도 이 링크가 언어판 사이의 유일한 내부 연결이므로,
 * **색인 대상 화면(홈·모드 선택·두 목록)에는 빠짐없이 둔다.**
 * 게임 화면과 결과 화면에는 두지 않는다 — 판을 진행하는 중에 언어를 바꾸면
 * 같은 에피소드의 다른 언어판으로 이동하게 되어 흐름이 끊기고, 그 화면들은
 * 어차피 색인 대상이 아니다.
 * 표기는 NOCTURNE 톤에 맞춰 대문자 모노 두 글자(KO · EN · JA)다.
 */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const { locale, t } = useI18n();
  const rest = stripLocale(pathname ?? '');

  return (
    <nav
      aria-label={t.common.languageLabel}
      className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] ${className}`}
    >
      {locales.map((code, index) => (
        <span key={code} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden className="text-noct-ink-faint/40">·</span>}
          {code === locale ? (
            <span aria-current="true" className="text-noct-gold">
              {code}
            </span>
          ) : (
            <Link
              href={localePath(code, rest)}
              hrefLang={localeMeta[code].hreflang}
              className="text-noct-ink-faint transition-colors hover:text-noct-ink-dim"
            >
              {code}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
