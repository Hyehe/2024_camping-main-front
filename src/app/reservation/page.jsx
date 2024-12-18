"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";

// 동적 로딩으로 Calendar 컴포넌트 가져오기
const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

const PayCalendar = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [nights, setNights] = useState(0);

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const start = new Date(dateRange[0]);
      const end = new Date(dateRange[1]);

      if (start > end) {
        alert("체크아웃 날짜는 체크인 날짜보다 나중이어야 합니다.");
        setDateRange([null, null]);
        setNights(0);
      } else {
        // 숙박 일수를 정수로 계산 (올림 처리)
        const nightsCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        setNights(nightsCount);
      }
    }
  }, [dateRange]);

  return (
    <div style={containerStyle}>
      <div style={calendarStyle}>
        <Calendar
          onChange={setDateRange}
          selectRange={true}
          value={dateRange}
          prev2Label={null}
          next2Label={null}
        />
      </div>
      <div style={detailsStyle}>
  <h3 style={headingStyle}>숙박 정보</h3>
  <p>
    체크인:{" "}
    {dateRange[0]
      ? `${dateRange[0].toDateString()} 오후 3시`
      : "날짜를 선택해주세요"}
  </p>
  <p>
    체크아웃:{" "}
    {dateRange[1]
      ? `${dateRange[1].toDateString()} 오전 11시`
      : "날짜를 선택해주세요"}
  </p>
  <p>숙박 일수: {nights > 0 ? `${nights}박` : "날짜를 선택해주세요"}</p>
  <button style={buttonStyle}>결제하기</button>
</div>

    </div>
  );
};

// 스타일 정의
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "30px",
  margin: "50px 0",
  fontFamily: "Arial, sans-serif",
};

const calendarStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const detailsStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const buttonStyle = {
  marginTop: "20px",
  padding: "12px 24px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background-color 0.3s",
};

// 버튼 호버 스타일은 직접 CSS로 작성 필요
const headingStyle = {
  marginBottom: "15px",
  fontSize: "20px",
  color: "#333",
};

export default PayCalendar;
