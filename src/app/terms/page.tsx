import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../privacy/privacy.module.css';

export const metadata: Metadata = {
  title: '이용약관 | Lacan & R-minu',
  description: '오션해양테크 이용약관',
};

export default function TermsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>이용약관</h1>
        <p className={styles.date}>시행일자: 2026년 3월 28일</p>

        <section className={styles.section}>
          <h2 className={styles.heading}>제1조 (목적)</h2>
          <p className={styles.text}>
            본 약관은 주식회사 오션해양테크(이하 &ldquo;회사&rdquo;)가 운영하는 라캉 & 알마이너 웹사이트(이하 &ldquo;사이트&rdquo;)에서 제공하는 프리미엄 왁싱 제품 판매 서비스(이하 &ldquo;서비스&rdquo;)를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제2조 (정의)</h2>
          <ol className={styles.orderedList}>
            <li>&ldquo;서비스&rdquo;라 함은 회사가 제공하는 왁싱 제품 판매, 상담, 배송 등 제반 서비스를 의미합니다.</li>
            <li>&ldquo;이용자&rdquo;라 함은 사이트에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</li>
            <li>&ldquo;상품&rdquo;이라 함은 회사가 판매하는 Lacan 및 Alminer 브랜드 제품을 의미합니다.</li>
            <li>&ldquo;개인정보&rdquo;라 함은 생존하는 개인에 관한 정보로서 개인을 식별할 수 있는 정보를 말합니다.</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제3조 (약관의 게시와 개정)</h2>
          <p className={styles.text}>① 회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 사이트 내에 게시합니다.</p>
          <p className={styles.text}>② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</p>
          <p className={styles.text}>③ 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 사이트에 그 적용일자 7일 전부터 적용일자 전일까지 공지합니다.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제4조 (서비스의 제공 및 변경)</h2>
          <p className={styles.text}>① 회사는 다음과 같은 서비스를 제공합니다.</p>
          <ul className={styles.list}>
            <li>Lacan 전문가용 프리미엄 왁스 판매</li>
            <li>Alminer(R-minu) 홈케어용 왁스 판매</li>
            <li>상품 주문 및 배송 서비스</li>
            <li>B2B 도매 상담 서비스</li>
            <li>기타 회사가 추가 개발하거나 제휴를 통해 제공하는 서비스</li>
          </ul>
          <p className={styles.text}>② 회사는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할 수 있습니다.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제5조 (청약철회 및 환불)</h2>
          <p className={styles.text}>① 이용자는 상품을 배송받은 날부터 7일 이내에 청약의 철회를 할 수 있습니다.</p>
          <p className={styles.text}>② 다만, 다음의 경우에는 청약철회가 제한될 수 있습니다.</p>
          <ul className={styles.list}>
            <li>이용자의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우</li>
            <li>포장을 훼손한 경우</li>
            <li>시간의 경과에 의하여 재판매가 곤란할 정도로 상품의 가치가 감소한 경우</li>
          </ul>
          <p className={styles.text}>③ 환불은 청약철회 요청일로부터 3영업일 이내에 처리됩니다.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제6조 (서비스의 중단)</h2>
          <p className={styles.text}>① 회사는 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</p>
          <p className={styles.text}>② 불가항력으로 인한 서비스 중단에 대해서는 배상하지 아니합니다. 다만, 회사에 고의 또는 중과실이 있는 경우에는 그러하지 아니합니다.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제7조 (이용자의 의무)</h2>
          <ul className={styles.list}>
            <li>신청 또는 변경 시 허위 내용의 등록 금지</li>
            <li>타인의 정보 도용 금지</li>
            <li>회사의 지적재산권 침해 금지</li>
            <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위 금지</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제8조 (분쟁해결)</h2>
          <p className={styles.text}>① 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.</p>
          <p className={styles.text}>② 회사와 이용자 간에 발생한 분쟁에 대하여는 대한민국 법을 적용하며, 분쟁에 관한 소송은 민사소송법상의 관할법원에 제기합니다.</p>
        </section>

        <section className={styles.section} style={{ paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <h2 className={styles.heading}>부칙</h2>
          <p className={styles.text}>본 약관은 2026년 3월 28일부터 시행됩니다.</p>
        </section>

        <div className={styles.infoBox} style={{ marginTop: '3rem' }}>
          <h3 className={styles.infoTitle}>이용약관 관련 문의</h3>
          <p className={styles.infoValue}>이메일: info@oceantechlab.com</p>
          <p className={styles.infoValue}>사업자: 주식회사 오션해양테크 (대표 조제복)</p>
        </div>

        <div className={styles.backLink}>
          <Link href="/">← 홈으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
}
