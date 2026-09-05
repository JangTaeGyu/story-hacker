/**
 * 구조화 데이터 삽입.
 *
 * 서버 컴포넌트에서만 쓴다 — 클라이언트 번들에 실을 이유가 없다.
 * `dangerouslySetInnerHTML`은 JSON-LD를 넣는 표준 방법이고, 값은 우리가
 * 만든 객체라 외부 입력이 섞이지 않는다. 다만 `</script>` 시퀀스만은
 * 이스케이프해서 스크립트가 조기 종료되는 일을 막는다.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
