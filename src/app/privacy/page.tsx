import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: '개인정보처리방침 | Lacan & R-minu',
  description: '오션해양테크 개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>개인정보처리방침</h1>
        <p className={styles.date}>시행일자: 2026년 3월 28일</p>

        <section className={styles.section}>
          <p className={styles.text}>
            주식회사 오션해양테크(이하 &ldquo;회사&rdquo;)는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제1조 (개인정보의 처리 목적)</h2>
          <p className={styles.text}>회사는 다음의 목적을 위하여 개인정보를 처리합니다.</p>
          <div className={styles.subSection}>
            <h3 className={styles.subHeading}>1. 회원가입 및 관리</h3>
            <ul className={styles.list}>
              <li>회원 가입의사 확인, 본인 식별·인증</li>
              <li>회원자격 유지·관리, 서비스 부정이용 방지</li>
            </ul>
          </div>
          <div className={styles.subSection}>
            <h3 className={styles.subHeading}>2. 서비스 제공</h3>
            <ul className={styles.list}>
              <li>프리미엄 왁싱 제품 판매 서비스 제공</li>
              <li>상품 주문·결제·배송 처리</li>
              <li>고객 상담 및 문의 응대</li>
            </ul>
          </div>
          <div className={styles.subSection}>
            <h3 className={styles.subHeading}>3. 민원 처리</h3>
            <ul className={styles.list}>
              <li>민원인의 신원 확인, 민원사항 확인</li>
              <li>사실조사를 위한 연락·통지, 처리결과 통보</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제2조 (개인정보의 처리 및 보유기간)</h2>
          <p className={styles.text}>① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
          <div className={styles.infoBox}>
            <h3 className={styles.infoTitle}>개인정보 처리 및 보유기간</h3>
            <div className={styles.infoItem}>
              <p className={styles.infoLabel}>• 회원 정보 (이메일, 이름, 전화번호)</p>
              <p className={styles.infoValue}>보유기간: 회원 탈퇴 시까지</p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.infoLabel}>• 결제 정보</p>
              <p className={styles.infoValue}>보유기간: 5년 (전자상거래법 준수)</p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.infoLabel}>• 배송지 정보</p>
              <p className={styles.infoValue}>보유기간: 5년 (전자상거래법 준수)</p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.infoLabel}>• 서비스 이용 기록</p>
              <p className={styles.infoValue}>보유기간: 3개월 (통신비밀보호법 준수)</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제3조 (처리하는 개인정보의 항목)</h2>
          <div className={styles.infoBox}>
            <h3 className={styles.infoTitle}>1. 회원가입 시</h3>
            <p className={styles.infoValue}>• 필수항목: 이메일, 이름, 전화번호</p>
          </div>
          <div className={styles.infoBox}>
            <h3 className={styles.infoTitle}>2. 상품 주문 시</h3>
            <p className={styles.infoValue}>• 결제정보 (PortOne 결제대행사를 통해 처리)</p>
            <p className={styles.infoValue}>• 배송지 주소, 수령인 정보</p>
          </div>
          <div className={styles.infoBox}>
            <h3 className={styles.infoTitle}>3. 자동 수집 항목</h3>
            <p className={styles.infoValue}>• IP 주소, 쿠키, 서비스 이용 기록, 방문 일시</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제4조 (개인정보의 제3자 제공)</h2>
          <p className={styles.text}>① 회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
          <p className={styles.text}>② 회사는 현재 개인정보를 제3자에게 제공하고 있지 않습니다.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제5조 (개인정보처리의 위탁)</h2>
          <p className={styles.text}>회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
          <div className={styles.infoBox}>
            <div className={styles.infoItem}>
              <p className={styles.infoLabel}>• PortOne</p>
              <p className={styles.infoValue}>결제 대행 및 정산</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제6조 (정보주체의 권리·의무 및 행사방법)</h2>
          <p className={styles.text}>정보주체는 회사에 대해 언제든지 다음 권리를 행사할 수 있습니다.</p>
          <ol className={styles.orderedList}>
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리정지 요구</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제7조 (개인정보의 파기)</h2>
          <p className={styles.text}>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
          <ul className={styles.list}>
            <li>전자적 파일 형태: 복구 및 재생되지 않도록 안전하게 삭제</li>
            <li>종이에 출력된 개인정보: 분쇄기로 분쇄하거나 소각</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제8조 (개인정보의 안전성 확보조치)</h2>
          <ol className={styles.orderedList}>
            <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
            <li>기술적 조치: 접근권한 관리, 접근통제시스템 설치, 암호화, 보안프로그램 설치</li>
            <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제9조 (개인정보 보호책임자)</h2>
          <div className={styles.contactBox}>
            <h3 className={styles.contactTitle}>개인정보 보호책임자</h3>
            <p>• 성명: 이준호</p>
            <p>• 직책: 개인정보관리책임자</p>
            <p>• 연락처: 010-9249-3872</p>
            <p>• 이메일: info@oceantechlab.com</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제10조 (권익침해 구제방법)</h2>
          <p className={styles.text}>정보주체는 개인정보침해로 인한 구제를 받기 위하여 다음 기관에 상담 등을 신청할 수 있습니다.</p>
          <div className={styles.remedyGrid}>
            <div className={styles.remedyItem}>
              <p className={styles.remedyTitle}>개인정보분쟁조정위원회</p>
              <p className={styles.remedyInfo}>전화: 1833-6972 | www.kopico.go.kr</p>
            </div>
            <div className={styles.remedyItem}>
              <p className={styles.remedyTitle}>개인정보침해신고센터</p>
              <p className={styles.remedyInfo}>전화: (국번없이) 118 | privacy.kisa.or.kr</p>
            </div>
            <div className={styles.remedyItem}>
              <p className={styles.remedyTitle}>대검찰청 사이버범죄수사단</p>
              <p className={styles.remedyInfo}>전화: 1301 | www.spo.go.kr</p>
            </div>
            <div className={styles.remedyItem}>
              <p className={styles.remedyTitle}>경찰청 사이버안전국</p>
              <p className={styles.remedyInfo}>전화: (국번없이) 182 | cyberbureau.police.go.kr</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>제11조 (개인정보 처리방침 변경)</h2>
          <p className={styles.text}>이 개인정보 처리방침은 2026. 3. 28.부터 적용됩니다.</p>
        </section>

        <div className={styles.contactBox} style={{ marginTop: '3rem' }}>
          <h3 className={styles.contactTitle}>개인정보 처리방침 관련 문의</h3>
          <p>이메일: info@oceantechlab.com</p>
          <p>개인정보 보호책임자: 이준호</p>
          <p>연락처: 010-9249-3872</p>
        </div>

        <div className={styles.backLink}>
          <Link href="/">← 홈으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
}
