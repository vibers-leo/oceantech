"use client";

import React, { useState, useEffect } from "react";
import styles from "./business-plan.module.css";

export default function BusinessPlanPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    bizNo: "",
    ceo: "",
    establishmentDate: "",
    address: "",
    website: "",
    managerName: "",
    managerTel: "",
    managerEmail: "",

    // Financials
    sales2023: "",
    sales2024: "",
    sales2025: "",
    export2023: "",
    export2024: "",
    export2025: "",

    // Status
    itemParams: "", // 품목명
    hscode: "",

    // Sections
    overview: "",
    productDetails: "",
    marketAnalysis: "",
    marketingPlan: "",

    // Budget
    budgetItems: [
      { category: "홍보/광고", detail: "Google 검색 광고", amount: "10,000" },
      {
        category: "브랜드 개발",
        detail: "외국어 카탈로그 제작",
        amount: "5,000",
      },
      { category: "", detail: "", amount: "" },
    ],
  });

  const [statusMessage, setStatusMessage] = useState("");

  // Load from API (File) on mount
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/api/export-voucher/save");
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setFormData(data);
            setStatusMessage("데이터를 불러왔습니다.");
          }
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setStatusMessage("저장 중...");
    try {
      const response = await fetch("/api/export-voucher/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage(
          `저장 완료! (${new Date().toLocaleTimeString()}) - AI와 공유되었습니다.`
        );
        // Fallback to local storage as well
        localStorage.setItem("exportVoucherPlan", JSON.stringify(formData));
      } else {
        setStatusMessage("저장 실패");
      }
    } catch (error) {
      console.error("Error saving:", error);
      setStatusMessage("저장 중 오류 발생");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetChange = (index: number, field: string, value: string) => {
    const newBudget = [...formData.budgetItems];
    newBudget[index] = { ...newBudget[index], [field]: value };
    setFormData((prev) => ({ ...prev, budgetItems: newBudget }));
  };

  const addBudgetRow = () => {
    setFormData((prev) => ({
      ...prev,
      budgetItems: [
        ...prev.budgetItems,
        { category: "", detail: "", amount: "" },
      ],
    }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>2026년 수출지원기반활용사업 사업계획서</h1>
        <p className={styles.subtitle}>
          [서식 제3호] 수출바우처사업 사업계획서
        </p>
        <div style={{ marginTop: "15px", fontSize: "13px" }}>
          <span style={{ marginRight: "10px" }}>참고양식 다운로드:</span>
          <a
            href="/수출바우처/1. (최종)_2026년_수출지원기반활용사업_참여기업_1차_모집공고.docx"
            download
            className={styles.subtitle}
            style={{
              textDecoration: "underline",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            DOCX 양식
          </a>
          <a
            href="/수출바우처/1. (최종)_2026년_수출지원기반활용사업_참여기업_1차_모집공고 (1).HWPX"
            download
            className={styles.subtitle}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            HWPX 양식
          </a>
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={handleSave}
            style={{
              background: "#0056b3",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            저장하기
          </button>
          {statusMessage && (
            <span style={{ fontSize: "13px", color: "#0056b3" }}>
              {statusMessage}
            </span>
          )}
        </div>
      </header>

      {/* 1. 기본정보 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. 신청기업 일반현황</h2>
        <div className={styles.formGrid}>
          <div className={styles.label}>기업명</div>
          <div className={styles.value}>
            <input
              className={styles.input}
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="(주)예시기업"
            />
          </div>
          <div className={styles.label}>사업자등록번호</div>
          <div className={styles.value}>
            <input
              className={styles.input}
              name="bizNo"
              value={formData.bizNo}
              onChange={handleChange}
              placeholder="000-00-00000"
            />
          </div>

          <div className={styles.label}>대표자명</div>
          <div className={styles.value}>
            <input
              className={styles.input}
              name="ceo"
              value={formData.ceo}
              onChange={handleChange}
            />
          </div>
          <div className={styles.label}>설립일자</div>
          <div className={styles.value}>
            <input
              className={styles.input}
              name="establishmentDate"
              value={formData.establishmentDate}
              onChange={handleChange}
              placeholder="YYYY. MM. DD"
            />
          </div>

          <div className={styles.label}>본사 주소</div>
          <div className={`${styles.value} ${styles.fullWidth}`}>
            <input
              className={styles.input}
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className={styles.label}>홈페이지</div>
          <div className={`${styles.value} ${styles.fullWidth}`}>
            <input
              className={styles.input}
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* 2. 매출 및 수출 현황 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. 매출 및 수출 실적</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th rowSpan={2}>구분</th>
              <th colSpan={2}>2023년 (확정)</th>
              <th colSpan={2}>2024년 (확정/잠정)</th>
              <th colSpan={2}>2025년 (신청해 목표)</th>
            </tr>
            <tr>
              <th>금액 (백만원)</th>
              <th>비중 (%)</th>
              <th>금액 (백만원)</th>
              <th>비중 (%)</th>
              <th>금액 (백만원)</th>
              <th>비중 (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  background: "#f9f9f9",
                  fontWeight: "bold",
                }}
              >
                전체 매출액
              </td>
              <td>
                <input
                  className={styles.input}
                  name="sales2023"
                  value={formData.sales2023}
                  onChange={handleChange}
                  style={{ textAlign: "right" }}
                />
              </td>
              <td style={{ textAlign: "center" }}>-</td>
              <td>
                <input
                  className={styles.input}
                  name="sales2024"
                  value={formData.sales2024}
                  onChange={handleChange}
                  style={{ textAlign: "right" }}
                />
              </td>
              <td style={{ textAlign: "center" }}>-</td>
              <td>
                <input
                  className={styles.input}
                  name="sales2025"
                  value={formData.sales2025}
                  onChange={handleChange}
                  style={{ textAlign: "right" }}
                />
              </td>
              <td style={{ textAlign: "center" }}>-</td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  background: "#f9f9f9",
                  fontWeight: "bold",
                }}
              >
                직수출액
              </td>
              <td>
                <input
                  className={styles.input}
                  name="export2023"
                  value={formData.export2023}
                  onChange={handleChange}
                  style={{ textAlign: "right" }}
                />
              </td>
              <td style={{ textAlign: "center" }}>
                {formData.sales2023 && formData.export2023
                  ? Math.round(
                      (Number(formData.export2023) /
                        Number(formData.sales2023)) *
                        100
                    )
                  : 0}
                %
              </td>
              <td>
                <input
                  className={styles.input}
                  name="export2024"
                  value={formData.export2024}
                  onChange={handleChange}
                  style={{ textAlign: "right" }}
                />
              </td>
              <td style={{ textAlign: "center" }}>
                {formData.sales2024 && formData.export2024
                  ? Math.round(
                      (Number(formData.export2024) /
                        Number(formData.sales2024)) *
                        100
                    )
                  : 0}
                %
              </td>
              <td>
                <input
                  className={styles.input}
                  name="export2025"
                  value={formData.export2025}
                  onChange={handleChange}
                  style={{ textAlign: "right" }}
                />
              </td>
              <td style={{ textAlign: "center" }}>
                {formData.sales2025 && formData.export2025
                  ? Math.round(
                      (Number(formData.export2025) /
                        Number(formData.sales2025)) *
                        100
                    )
                  : 0}
                %
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.helperText}>
          * 직수출액은 관세청 무역통계(K-Stat) 기준 실적을 기재합니다.
        </div>
      </section>

      {/* 3. 기업 및 제품 현황 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. 기업 및 제품/서비스 상세</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            3-1. 기업 개요 (주요 연혁 및 사업내용)
          </h3>
          <div className={styles.helperText}>
            * 설립 배경, 주요 기술력, 국내외 인증 현황 등을 중심으로 기술
          </div>
          <textarea
            className={styles.textarea}
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            placeholder="당사는 20XX년 설립 이래..."
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            3-2. 주요 제품/서비스 특징
          </h3>
          <div className={styles.helperText}>
            * 주력 수출 품목의 경쟁력(품질, 가격, 기술 등)에 대해 구체적 기술
          </div>
          <div
            className={styles.formGrid}
            style={{ marginBottom: "10px", borderBottom: "1px solid #ddd" }}
          >
            <div className={styles.label}>주력 품목명</div>
            <div className={styles.value}>
              <input
                className={styles.input}
                name="itemParams"
                value={formData.itemParams}
                onChange={handleChange}
              />
            </div>
            <div className={styles.label}>HS CODE</div>
            <div className={styles.value}>
              <input
                className={styles.input}
                name="hscode"
                value={formData.hscode}
                onChange={handleChange}
                placeholder="6자리 또는 10자리"
              />
            </div>
          </div>
          <textarea
            className={styles.textarea}
            name="productDetails"
            value={formData.productDetails}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* 4. 해외마케팅 계획 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. 해외 마케팅 추진 계획</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            4-1. 목표 시장 분석 및 선정 사유
          </h3>
          <div className={styles.helperText}>
            * 주요 타겟 국가/지역 및 해당 시장의 규모, 성장성, 진입 장벽 등 분석
          </div>
          <textarea
            className={styles.textarea}
            name="marketAnalysis"
            value={formData.marketAnalysis}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            4-2. 마케팅 실행 전략
          </h3>
          <div className={styles.helperText}>
            * 바이어 발굴, 홍보, 유통망 구축 등 구체적인 진출 전략 기술
          </div>
          <textarea
            className={styles.textarea}
            name="marketingPlan"
            value={formData.marketingPlan}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* 5. 바우처 활용 계획 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          5. 수출바우처 활용 계획 (소요 예산)
        </h2>
        <div className={styles.helperText}>
          * 메뉴판 서비스 중 활용할 서비스와 예상 소요 비용을 기재 (천원 단위)
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>서비스 분야</th>
              <th style={{ width: "60%" }}>세부 활용 계획 (서비스명 등)</th>
              <th style={{ width: "20%" }}>예산 (천원)</th>
            </tr>
          </thead>
          <tbody>
            {formData.budgetItems.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    className={styles.input}
                    value={item.category}
                    onChange={(e) =>
                      handleBudgetChange(idx, "category", e.target.value)
                    }
                    placeholder="예) 디자인개발"
                    style={{ textAlign: "center" }}
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    value={item.detail}
                    onChange={(e) =>
                      handleBudgetChange(idx, "detail", e.target.value)
                    }
                    placeholder="상세 내용을 입력하세요"
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    value={item.amount}
                    onChange={(e) =>
                      handleBudgetChange(idx, "amount", e.target.value)
                    }
                    placeholder="0"
                    style={{ textAlign: "right" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "10px", textAlign: "right" }}>
          <button
            onClick={addBudgetRow}
            style={{
              padding: "5px 10px",
              fontSize: "13px",
              cursor: "pointer",
              background: "#eee",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            + 행 추가
          </button>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f8f9fa",
            borderRadius: "4px",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          총 소요 예산:{" "}
          {formData.budgetItems
            .reduce(
              (acc, curr) => acc + (Number(curr.amount.replace(/,/g, "")) || 0),
              0
            )
            .toLocaleString()}{" "}
          천원
        </div>
      </section>

      <div className={styles.buttonArea}>
        <button
          onClick={handleSave}
          style={{
            background: "#0056b3",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          저장하기
        </button>
        <button className={styles.printButton} onClick={() => window.print()}>
          PDF 저장 / 인쇄
        </button>
      </div>
    </div>
  );
}
