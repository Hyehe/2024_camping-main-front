"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function RequestPage() {
  const [isWriting, setIsWriting] = useState(false);
  const [requests, setRequests] = useState([
    { id: 1, title: "서울 마포구 캠핑장 등록 부탁드립니다", writer: "관리자", date: "2020-03-10" },
    { id: 2, title: "경기도 수원 캠핑장 등록 부탁드립니다", writer: "들*", date: "2024-11-28" },
    { id: 3, title: "부산 서면 캠핑장 등록 부탁드립니다", writer: "짱*", date: "2024-11-27" },
  ]);

  const [newRequest, setNewRequest] = useState({
    title: "",
    writer: "",
    content: "",
  });

  const handleAddRequest = () => {
    const newId = requests.length + 1;
    const currentDate = new Date().toISOString().split("T")[0];
    setRequests([
      ...requests,
      { id: newId, title: newRequest.title, writer: newRequest.writer, date: currentDate },
    ]);
    setIsWriting(false);
    setNewRequest({ title: "", writer: "", content: "" });
  };

  return (
    <Box>
      {!isWriting ? (
        <>
          <Typography variant="h6" gutterBottom>
            캠핑장 등록 및 수정 요청
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>제목</TableCell>
                  <TableCell>작성자</TableCell>
                  <TableCell>등록일</TableCell>
                  <TableCell align="center">더보기</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>{request.writer}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => setIsWriting(true)}
          >
            글쓰기
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            캠핑장 등록 및 수정 요청
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="제목"
              margin="normal"
              variant="outlined"
              value={newRequest.title}
              onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="작성자"
              margin="normal"
              variant="outlined"
              value={newRequest.writer}
              onChange={(e) => setNewRequest({ ...newRequest, writer: e.target.value })}
            />
            <TextField
              fullWidth
              label="내용"
              margin="normal"
              multiline
              rows={4}
              variant="outlined"
              value={newRequest.content}
              onChange={(e) => setNewRequest({ ...newRequest, content: e.target.value })}
            />
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={handleAddRequest}
                disabled={!newRequest.title || !newRequest.writer || !newRequest.content}
              >
                제출
              </Button>
              <Button
                startIcon={<CloseIcon />}
                variant="outlined"
                onClick={() => setIsWriting(false)}
              >
                취소
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
