import { NextRequest, NextResponse } from 'next/server';

const PORTONE_API_SECRET = process.env.PORTONE_API_SECRET || '';

export async function POST(req: NextRequest) {
  try {
    const { paymentId, orderId, expectedAmount } = await req.json();

    if (!paymentId || !orderId || !expectedAmount) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // PortOne V2 REST API로 결제 조회
    const res = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
      {
        headers: {
          Authorization: `PortOne ${PORTONE_API_SECRET}`,
        },
      }
    );

    if (!res.ok) {
      const errBody = await res.text();
      console.error('PortOne API 오류:', res.status, errBody);
      return NextResponse.json(
        { error: '결제 정보를 조회할 수 없습니다.' },
        { status: 502 }
      );
    }

    const payment = await res.json();

    // 결제 상태 확인
    if (payment.status !== 'PAID') {
      return NextResponse.json(
        { error: '결제가 완료되지 않았습니다.', status: payment.status },
        { status: 400 }
      );
    }

    // 금액 일치 검증
    if (payment.amount.total !== expectedAmount) {
      console.error(
        `금액 불일치: 예상 ${expectedAmount}, 실제 ${payment.amount.total}`
      );
      return NextResponse.json(
        { error: '결제 금액이 일치하지 않습니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      amount: payment.amount.total,
      currency: payment.currency,
    });
  } catch (err) {
    console.error('결제 검증 실패:', err);
    return NextResponse.json(
      { error: '결제 검증 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
