"use client";

import React, { useState } from "react";
import Link from "next/link"; // Next.js의 Link 컴포넌트
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import '../../../../globals.css'

export default function MeetPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const host = {
    name: "소경빈",
    description: "[오프라인 걸스] 서울숲 산책 모임",
    profileImage: "/images/tree-1.jpg", // 프로필 이미지
    bannerImage: "/images/m_main_0512.jpg", // 배너 이미지
    introduction: "안녕하세요, 매거진 <하퍼스 바자> 피처 에디터 소경빈입니다.",
  };

  const members = [
    { id: 1, name: "멤버1", avatar: "/images/tree-1.jpg" },
    { id: 2, name: "멤버2", avatar: "/images/tree-2.jpg" },
    { id: 3, name: "멤버3", avatar: "/images/tree-3.jpg" },
    { id: 4, name: "멤버4", avatar: "/images/tree-4.jpg" },
  ];

  const recentPhotos = [
    { id: 1, image: "/images/tree-3.jpg", alt: "최근 사진 1", date: "2024-12-01" },
    { id: 2, image: "/images/tree-4.jpg", alt: "최근 사진 2", date: "2024-11-30" },
    { id: 3, image: "/images/tree-1.jpg", alt: "최근 사진 3", date: "2024-11-29" },
    { id: 4, image: "/images/tree-2.jpg", alt: "최근 사진 4", date: "2024-11-28" },
  ];

  const posts = [
    { id: 1, title: "오픈톡 안내", category: "공지", date: "2024-12-04" },
    { id: 2, title: "가입인사 양식", category: "가입인사", date: "2024-12-01" },
  ];

  const sortedRecentPhotos = recentPhotos.sort((a, b) => new Date(b.date) - new Date(a.date));
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // 가입 인사 제출 로직
    console.log("가입 인사:", greeting);
    alert("가입 완료!");
    setOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", padding: "20px 0" }}>
      <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
        {/* 햄버거 메뉴 */}
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            bottom: "80px",
            right: "16px",
            backgroundColor: "#28a745",
            color: "white",
            zIndex: 10,
            "&:hover": { backgroundColor: "#218838" },
            bottom: "26px",
            right: "26px",
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: {
              position: "absolute",
              top: "25vh", // 화면 위에서 25% 떨어진 위치
              height: "40vh", // 드로어 높이
              width: "300px", // 드로어 너비
              margin: "0 auto",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "16px", // 둥근 모서리
              backdropFilter: "blur(10px)", // 블러
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* 닫기 버튼 */}
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ display: "flex", justifyContent: "flex-end", margin: 1 }}
            >
              <CloseIcon />
            </IconButton>
            {/* 네비게이션 리스트 */}
            <List
              sx={{
                padding: 0, // 내부 여백 제거
                margin: 0,  // 외부 여백 제거
              }}
            >
              {[
                { label: "홈", href: `/MeetingGroup/regular-Meeting/detail/${posts.id}` },
                { label: "게시판", href: `/MeetingGroup/regular-Meeting/detail/${posts.id}/bulletinboard` },
                { label: "사진첩", href: `/MeetingGroup/regular-Meeting/detail/${posts.id}/photogallery` },
                { label: "채팅", href: `/MeetingGroup/regular-Meeting/detail/${posts.id}/chat` },
              ].map((item) => (
                <Link key={item.label} href={item.href} passHref legacyBehavior>
                  <a style={{ textDecoration: "none" }}> {/* Link 내 a 태그 명시 */}
                    <ListItem
                      component="div" // 'div'로 렌더링되도록 설정
                      onClick={handleDrawerToggle}
                      sx={{
                        textAlign: "center",
                        "&:hover": { backgroundColor: "#dff0d8" },
                        cursor: "pointer", // 클릭 가능하게 스타일링
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#333", // 글꼴 색상
                        }}
                      />
                    </ListItem>
                  </a>
                </Link>

              ))}
            </List>

          </Box>
        </Drawer>

        {/* 상단 배너 */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "250px",
            backgroundImage: `url(${host.bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
          }}
        >
          {/* 프로필과 텍스트 박스 */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: 2,
              padding: "10px 15px",
              width: "40%",
              textAlign: "center",
            }}
          >
            <Avatar
              src={host.profileImage}
              alt={host.name}
              sx={{
                width: 50,
                height: 50,
                margin: "0 auto",
                border: "2px solid white",
                marginBottom: "8px",
              }}
            />
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ fontSize: "15px", color: "black" }} // 글꼴 색상 변경
            >
              {host.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              fontWeight="bold"
              sx={{ color: "black" }} // 글꼴 색상 변경
            >
              {host.description}
            </Typography>
          </Box>
        </Box>

        {/* 소개글 */}
        <Box sx={{ mt: "70px", textAlign: "center", mb: 3 }}>
          <Typography variant="body2" sx={{ color: "black" }}>
            {host.introduction}
          </Typography>
        </Box>

        {/* 멤버 소개 */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "black", mb: 2 }}
          >
            멤버소개
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              src={host.profileImage}
              alt={host.name}
              sx={{ width: 50, height: 50 }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "black" }}>
                {host.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "black" }}>
                관심있는 취미들을 깊게 더 나눠보고 싶어요.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 함께할 멤버들 */}
        <Box
          sx={{
            backgroundColor: "#eaffea",
            borderRadius: "8px",
            padding: "15px",
            textAlign: "center",
            boxShadow: 2,
            mb: 4,
          }}
        >
          <Grid container justifyContent="center" spacing={1}>
            {members.map((member, index) => (
              <Grid item key={index}>
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{
                    width: 40,
                    height: 40,
                    border: "1px solid #fff",
                    boxShadow: 1,
                  }}
                />
              </Grid>
            ))}
            <Grid item>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  color: "#888",
                  fontWeight: "bold",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                +
              </Avatar>
            </Grid>
          </Grid>
          <Typography variant="body2" fontWeight="bold" sx={{ mt: 2, color: "black" }}>
            함께 할 멤버들을 먼저 확인하고 참여해 보세요!
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#28a745",
              color: "white",
              "&:hover": { backgroundColor: "#218838" },
            }}
            onClick={handleClickOpen} // 팝업 열기 함수 연결
          >
            가입하러 가기
          </Button>

          {/* 팝업창 */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>가입인사를 작성해주세요</DialogTitle>
            <DialogContent>
              {/* 가입 인사 입력 필드 */}
              <TextField
                autoFocus
                margin="dense"
                label="가입 인사"
                type="text"
                fullWidth
                variant="outlined"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                sx={{
                  width: '400px',
                }}
              />
            </DialogContent>
            <DialogActions>
              {/* 취소 버튼 */}
              <Button onClick={handleClose} sx={{ color: "#333" }}>
                취소
              </Button>
              {/* 제출 버튼 */}
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  backgroundColor: "#28a745",
                  color: "white",
                  "&:hover": { backgroundColor: "#218838" },
                }}
              >
                제출
              </Button>
            </DialogActions>
          </Dialog>

        </Box>

        {/* 사진첩 */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              사진첩
            </Typography>
            <Link href={`/MeetingGroup/regular-Meeting/detail/${posts.id}/photogallery`} passHref>
              <Button
                endIcon={<ArrowForwardIosIcon fontSize="small" />}
                sx={{
                  fontWeight: "bold",
                  color: "#28a745",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                더보기
              </Button>
            </Link>
          </Box>
          <Grid container spacing={2}>
            {sortedRecentPhotos.map((photo) => (
              <Grid item xs={12} sm={6} key={photo.id}>

                <Card
                  sx={{
                    boxShadow: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={photo.image}
                    alt={photo.alt}
                  />
                </Card>

              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 게시판 */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              게시판
            </Typography>
            <Link href={`/MeetingGroup/regular-Meeting/detail/${posts.id}/bulletinboard`} passHref>
              <Button
                endIcon={<ArrowForwardIosIcon fontSize="small" />}
                sx={{
                  fontWeight: "bold",
                  color: "#28a745",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                더보기
              </Button>
            </Link>
          </Box>
          {sortedPosts.map((post) => (
            <Link
              key={post.id} // Key 값으로 post.id 사용
              href={`/MeetingGroup/regular-Meeting/detail/${post.id}/bulletinboard`} // post.id로 경로 생성
              passHref
            >

              <Card
                sx={{
                  mb: 2,
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: 2,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ color: "black" }}
                  >
                    {post.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "black" }}>
                    {post.category} · {post.date}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
