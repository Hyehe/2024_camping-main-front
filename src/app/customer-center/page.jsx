"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function CustomerCenterPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        고객센터 메인 페이지
      </Typography>
      <Typography gutterBottom>
        고객센터에 오신 것을 환영합니다. 아래에서 원하는 서비스를 선택하세요.
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Link href="/customer-center/notice" passHref>
          <Button variant="contained" color="primary">
            공지사항
          </Button>
        </Link>
        <Link href="/customer-center/request" passHref>
          <Button variant="contained" color="secondary">
            캠핑장 등록 및 수정 요청
          </Button>
        </Link>
        <Link href="/customer-center/faq" passHref>
          <Button variant="contained" color="success">
            자주 묻는 질문
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
