"use client";

import React from "react";
import { Box, Button, Grid } from "@mui/material";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <Box sx={{ flexGrow: 1, padding: 3, bgcolor: "#ffffff", minHeight: "100vh" }}>
      <Grid container spacing={2} sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* 사이드 메뉴 */}
        <Grid
          item
          xs={12}
          sm={3} // 작은 화면에서는 전체 너비, 큰 화면에서는 3/12 너비
          sx={{
            bgcolor: "#ffffff",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRight: { sm: "1px solid #ddd" }, // 작은 화면에서는 구분선 제거
          }}
        >
          <Link href="/customer-center/notice" style={{ textDecoration: "none" }}>
            <Button
              startIcon={<AnnouncementIcon />}
              fullWidth
              variant="outlined"
              sx={{
                justifyContent: "flex-start",
                height: "50px",
                borderColor: "#32CD32", // 연두색 테두리
                color: "#32CD32", // 연두색 텍스트
                "&:hover": {
                  bgcolor: "#E0FFE0", // 연두색 배경 강조
                },
              }}
            >
              공지사항
            </Button>
          </Link>
          <Link href="/customer-center/request" style={{ textDecoration: "none" }}>
            <Button
              startIcon={<AssignmentIcon />}
              fullWidth
              variant="outlined"
              sx={{
                justifyContent: "flex-start",
                height: "50px",
                borderColor: "#32CD32", // 연두색 테두리
                color: "#32CD32", // 연두색 텍스트
                "&:hover": {
                  bgcolor: "#E0FFE0", // 연두색 배경 강조
                },
              }}
            >
              캠핑장 등록 및 수정 요청
            </Button>
          </Link>
          <Link href="/customer-center/faq" style={{ textDecoration: "none" }}>
            <Button
              startIcon={<QuestionAnswerIcon />}
              fullWidth
              variant="outlined"
              sx={{
                justifyContent: "flex-start",
                height: "50px",
                borderColor: "#32CD32", // 연두색 테두리
                color: "#32CD32", // 연두색 텍스트
                "&:hover": {
                  bgcolor: "#E0FFE0", // 연두색 배경 강조
                },
              }}
            >
              자주 묻는 질문
            </Button>
          </Link>
        </Grid>

        {/* 메인 콘텐츠 */}
        <Grid item xs={12} sm={9}>
          <Box sx={{ padding: 3 }}>{children}</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
