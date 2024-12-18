"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";

export default function NoticeDetailPage() {
  const searchParams = useSearchParams();

  // 쿼리 파라미터에서 데이터 가져오기
  const title = searchParams.get("title");
  const content = searchParams.get("content");
  const writer = searchParams.get("writer");
  const date = searchParams.get("date");
  const image = searchParams.get("image");

  // title 또는 content가 없을 경우 에러 메시지 표시
  if (!title || !content) {
    return (
      <Box>
        <Typography variant="h6" color="error">
          공지사항을 찾을 수 없습니다.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* 제목 */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      {/* 작성자 및 날짜 */}
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {writer} - {date}
      </Typography>
      {/* 이미지 */}
      {image && (
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: "100%",
            maxHeight: "1100px",
            objectFit: "cover",
            borderRadius: "8px",
            margin: "16px 0",
          }}
        />
      )}
      {/* 내용용 */}
      <Typography variant="body1" sx={{ mt: 2 }}>
        {content}
      </Typography>
    </Box>
  );
}
