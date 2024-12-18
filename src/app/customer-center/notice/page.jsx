"use client";

import React from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

export default function NoticePage() {
  const notices = [
    {
      id: 1,
      title: "서울로 떠나는 캠핑-나는 서울에서 논다",
      writer: "관리자",
      date: "2024-12-01",
      content: "캠핑장 관련 공지사항의 상세 내용입니다. 운영 시간, 변경 사항 등에 대한 정보를 확인하세요.",
      image: "/images/m_main_0512.jpg", 
    },
    {
      id: 2,
      title: "공지사항 테스트",
      writer: "관리자",
      date: "2024-11-30",
      content: "함께해요 공지사항 테스트",
      image: "/images/15055_63027_3713.jpg", 
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        공지사항
      </Typography>
      <Box>
        {notices.map((notice) => (
          <Link
            key={notice.id}
            href={{
              pathname: "/customer-center/notice/detail",
              query: { id: notice.id, title: notice.title, content: notice.content, 
                writer: notice.writer, date: notice.date, image: notice.image, },
            }}
            passHref
          >
            <Box
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "black" }}>
                {notice.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {notice.writer} - {notice.date}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
