'use client';

import {
  Box, Typography, TextField, IconButton, Chip, Grid, Paper, Avatar, Fab, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../../globals.css';


// const meetings = [
//   {
//     id: 1,
//     region: '서울',
//     title: '글램핑 겨울 크리스마스',
//     date: '2024.12.22',
//     location: '은평구',
//     members: '25/50',
//     image: '/images/photo-3.jpg',
//     tags: ['#카라반', '#글램핑', '#산'],
//     liked: false, // 좋아요 상태 추가,
//     host: {
//       name: "소경빈",
//       description: "서울숲 산책 모임",
//       profileImage: "/images/tree-1.jpg",
//     },
//   },
//   {
//     id: 2,
//     region: '경기',
//     title: '경빈 캠프',
//     date: '2024.12.09',
//     location: '마포구',
//     members: '14/21',
//     image: '/images/tree-3.jpg',
//     tags: ['#야영', '#바다', '#산'],
//     liked: false,
//     host: {
//       name: "박지민",
//       description: "즐거운 캠핑 모임",
//       profileImage: "/images/tree-2.jpg",
//     },
//   },
//   {
//     meeting_idx: 3,
//     region: '인천',
//     name: '유앤캠',
//     created_at: '2024.11.30',
//     subregion: '마포구',
//     personnel: '5/7',
//     profile_image: '/images/bg-dark.jpg',
//     tags: ['#오토캠핑', '#야영', '#카라반'],
//     favorites_idx: false,
//   },
//   {
//     id: 4,
//     region: '강원도',
//     title: '2024 굿바이 캠핑',
//     date: '2024.12.29',
//     location: '구로구',
//     members: '18/24',
//     image: '/images/sims.gif',
//     tags: ['#바다', '#글램핑', '#오토캠핑'],
//     liked: false,
//   },
//   {
//     id: 5,
//     region: '서울',
//     title: '2025 하이바이 캠핑',
//     date: '2024.12.29',
//     location: '마포구',
//     members: '17/24',
//     image: '/images/yellowsb.gif',
//     tags: ['#바다', '#야영', '#자연'],
//     liked: false,
//   },
//   {
//     id: 6,
//     region: '경기',
//     title: '노는게 제일 좋아',
//     date: '2024.02.29',
//     location: '강서구',
//     members: '10/35',
//     image: '/images/tree-2.jpg',
//     tags: ['#산', '#글램핑', '#오토캠핑'],
//     liked: false,
//   },
// ];

const regions = ['전체', '서울', '경기', '인천', '강원도', '부산', '광주', '수원', '용인', '고양', '창원', '대구', '대전', '울산', '충청도', '전라도'];
const tags = ['#카라반', '#글램핑', '#야영', '#산', '#바다',
  '#캠프파이어', '#오토캠핑', '#자연', '#별 관찰', '#텐트',
  '#캠핑 장비', '#팀워크', '#소통', '#즐거운 추억', '#자연 보호',
  '#힐링', '#맛있는 음식', '#트레킹', '#낚시', '#자전거 타기',
  '#하이킹', '#스모어', '#캠핑 요리', '#자연 탐험', '#야외 게임',
  '#일출', '#일몰', '#야생동물 관찰', '#사진', '#물놀이',
  '#친목', '#산책', '#명상', '#휴식', '#오프그리드 생활',];

export default function RegularMeetingPage() {
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tagPage, setTagPage] = useState(0);
  const router = useRouter();

  const [searchHistory, setSearchHistory] = useState({});
  const [topSearches, setTopSearches] = useState([]);
  const [currentRank, setCurrentRank] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const [meetings, setMeetings] = useState([]);
  

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL}/regular-meetings`);
        if (response.ok) {
          
          const data = await response.json();
  
          // 백엔드 데이터 구조에 맞게 상태값 초기화
          const formattedMeetings = data.map((meeting) => ({
            id: meeting.id,
            title: meeting.name,
            region: meeting.region,
            location: meeting.subRegion || '',
            date: meeting.date || '날짜 미정',
            members: `${meeting.capacity}`, // e.g., '25/50'
            image: meeting.profileImage,   // || '/images/default-image.jpg',
            tags: meeting.hashtags.split(', '), // 문자열을 배열로 변환
            liked: false, // 초기 좋아요 상태
          }));
  
          setMeetings(formattedMeetings);
          setFilteredMeetings(formattedMeetings);
        } else {
          console.error("Failed to fetch meetings");
        }
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };
  
    fetchMeetings();
  }, []);
  


  const handleCardClick = (id) => {
    router.push(`/MeetingGroup/regular-Meeting/detail/${id}`);
  };

  // 좋아요 상태 로드
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedMeetings')) || {};
    setFilteredMeetings((prevMeetings) =>
      prevMeetings.map((meeting) => ({
        ...meeting,
        liked: !!savedLikes[meeting.id],
      }))
    );
  }, []);

  // 좋아요 상태 저장
  const toggleLike = (id) => {
    setFilteredMeetings((prevMeetings) => {
      const updatedMeetings = prevMeetings.map((meeting) =>
        meeting.id === id ? { ...meeting, liked: !meeting.liked } : meeting
      );

      // 로컬 스토리지 업데이트
      const likedState = updatedMeetings.reduce((acc, meeting) => {
        if (meeting.liked) acc[meeting.id] = true;
        return acc;
      }, {});
      localStorage.setItem('likedMeetings', JSON.stringify(likedState));

      return updatedMeetings;
    });
  };




  // 태그 버튼 검색 필터
  const handleTagFilter = (tag) => {
    // setSelectedTag(tag);
    setFilteredMeetings(meetings.filter((meeting) => meeting.tags.includes(tag)));
  };

  // 지역 버튼
  const handleRegionFilter = (region) => {
    if (region === '전체') {
      setFilteredMeetings(meetings);
    } else {
      setFilteredMeetings(meetings.filter((meeting) => meeting.region === region));
    }
  };

  // 검색바의 검색 필터 
  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const lowerSearchTerm = searchTerm.toLowerCase();

    setFilteredMeetings(
      meetings.filter(
        (meeting) =>
          meeting.region.toLowerCase().includes(lowerSearchTerm) ||
          meeting.title.toLowerCase().includes(lowerSearchTerm) ||
          meeting.date.includes(lowerSearchTerm) ||
          meeting.location.toLowerCase().includes(lowerSearchTerm) ||
          meeting.tags.some((tag) => tag.toLowerCase().includes(lowerSearchTerm))
      )
    );

    // 검색어 기록 추가 및 저장
    const updatedSearchHistory = { ...searchHistory };
    updatedSearchHistory[searchTerm] = (updatedSearchHistory[searchTerm] || 0) + 1;
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory)); // 로컬스토리지 저장
    updateTopSearches(updatedSearchHistory);
  };

  // 태그 페이징
  const handleTagPagination = (direction) => {
    setTagPage((prevPage) => {
      // 태그 갯수를 기준으로 총 페이지 수 계산
      const totalPages = Math.ceil(tags.length / 7); // 7개씩 표시하므로 총 페이지 수는 태그 길이 / 7

      if (direction === 'next') {
        // 마지막 페이지에서 오른쪽 화살표 클릭 시 첫 페이지로 돌아가도록 설정
        return prevPage === totalPages - 1 ? 0 : prevPage + 1; // 현재 마지막 페이지면 첫 페이지로, 아니면 다음 페이지로
      } else {
        // 첫 페이지에서 왼쪽 화살표 클릭 시 마지막 페이지로 돌아가도록 설정
        return prevPage === 0 ? totalPages - 1 : prevPage - 1; // 현재 첫 페이지면 마지막 페이지로, 아니면 이전 페이지로
      }
    });
  };

  const visibleTags = tags.slice(tagPage * 7, (tagPage + 1) * 7);

  // 실시간 검색 기능

  // 로컬스토리지에서 검색 기록 로드
  useEffect(() => {
    const savedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || {};
    setSearchHistory(savedSearchHistory);
    updateTopSearches(savedSearchHistory);
  }, []);

  // 실시간 검색어 리스트에서 검색어 클릭 시 필터링
  const handleSearchFromList = (term) => {
    setSearchTerm(term);
    setFilteredMeetings(
      meetings.filter(
        (meeting) =>
          meeting.region.toLowerCase().includes(term.toLowerCase()) ||
          meeting.title.toLowerCase().includes(term.toLowerCase()) ||
          meeting.date.includes(term) ||
          meeting.location.toLowerCase().includes(term.toLowerCase()) ||
          meeting.tags.some((tag) => tag.toLowerCase().includes(term.toLowerCase()))
      )
    );

    // 실검에서 누른 것도 기록 추가 및 저장
    const updatedSearchHistory = { ...searchHistory };
    updatedSearchHistory[term] = (updatedSearchHistory[term] || 0) + 1;
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory)); // 로컬스토리지 저장
    updateTopSearches(updatedSearchHistory);
  };

  // 상위 검색어 업데이트 함수
  const updateTopSearches = (searchHistory) => {
    const sortedSearches = Object.entries(searchHistory)
      .sort(([, a], [, b]) => b - a) // 검색 횟수로 정렬
      .slice(0, 10); // 상위 10개만 표시
    setTopSearches(sortedSearches);
  };

  // 순환 기능 (1위씩 순환)
  useEffect(() => {
    if (!isExpanded) {
      const interval = setInterval(() => {
        setCurrentRank((prevRank) => (prevRank + 1) % topSearches.length);
      }, 2000); // 2초마다 순위 변경
      return () => clearInterval(interval);
    }
  }, [isExpanded, topSearches]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };


  return (
    <Box sx={{ padding: '20px', textAlign: 'center', paddingTop: '80px', margin: '0 auto', width: '70%' }}>
      {/* 페이지 제목 */}
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          <a href='/MeetingGroup/regular-Meeting' style={{ textDecoration: 'none', color: 'inherit' }}>
            정규모임 &nbsp;
          </a>
          <Fab size="small" color="secondary" aria-label="add" href='/MeetingGroup/regular-Meeting-Make'
            style={{ backgroundColor: '#597445' }}>
            <AddIcon />
          </Fab>
        </Typography>

      </Box>
      <br />

      {/* 검색바 및 실시간 검색어 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { md: 'center', xs: 'center' },
          alignItems: 'center',
          gap: 2,
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        {/* 검색창 */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="검색어를 입력하세요"
            sx={{ width: { xs: '100%', md: '300px' } }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch(); // Enter키 눌러도 검색 가능
              }
            }}
          />
          <IconButton size="large" onClick={handleSearch}>
            <SearchIcon sx={{ color: 'green' }} />
          </IconButton>
        </Box>

        {/* 실시간 검색어 */}
        <Box
          sx={{
            position: { md: 'absolute', lg: 'absolute' },
            right: 0,
            top: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-end' },
            width: { xs: '100%', md: 'auto' },
          }}
        >
          <Typography
            variant="h8"
            sx={{
              fontWeight: 'bold', display: 'flex', alignItems: 'center'
              // ,justifyContent: { xs: 'center', md: 'flex-start' }, 
            }}
          >
            실시간 검색어
            <IconButton onClick={toggleExpand}>
              <ArrowDropDownIcon fontSize="large" />
            </IconButton>
          </Typography>

          {!isExpanded ? (
            // 순환 모드
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              {topSearches[currentRank] && (
                <>
                  <Box
                    key={currentRank} // 순환 검색어에 고유 key 설정
                    sx={{
                      animation: 'slideUp 0.5s ease-in-out', // 애니메이션 적용
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h8" sx={{ marginRight: '10px', fontWeight: 'bold' }}>
                      {currentRank + 1}위
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'blue', cursor: 'pointer', textDecoration: 'none', color: 'black', marginRight: '50px' }}
                      onClick={() => handleSearchFromList(topSearches[currentRank][0])}
                    >
                      {topSearches[currentRank][0]}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          ) : (
            // 전체 목록 보기
            <TableContainer
              component={Paper}
              sx={{
                width: '280px',
                // width: { xs: '100%', md: '300px' },
                maxHeight: '300px',
                overflowY: 'auto',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                marginTop: '10px',
                zIndex: '10'
              }}
            >
              <Table>
                <TableBody>
                  {topSearches.map(([term, count], index) => (
                    <TableRow key={index}>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                        {index + 1}위
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: 'blue', cursor: 'pointer', textDecoration: 'none', color: 'black' }}
                        onClick={() => handleSearchFromList(term)}
                      >
                        {term}
                      </TableCell>
                      <TableCell align="center" sx={{ color: 'gray' }}>
                        {count}회
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
      <br /><br />

      {/* 키워드 태그 */}
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', marginBottom: '20px', flexWrap: 'nowrap' }}>
        <IconButton onClick={() => handleTagPagination('prev')} disabled={tagPage === 0} sx={{ alignSelf: 'center' }}>
          <ArrowBackIosIcon />
        </IconButton>
        {visibleTags.map((tag, idx) => (
          <Chip
            key={idx}
            label={tag}
            clickable
            onClick={() => handleTagFilter(tag)}
            sx={{
              fontSize: '14px',
              padding: '10px',
              backgroundColor: '#f2fce8',
              '&:hover': { backgroundColor: '#d7f0c2' },
              '&.MuiChip-clicked': { backgroundColor: '#a0d996', color: 'white' }, // 클릭 후 배경 및 글자색
              whiteSpace: 'nowrap', // 텍스트가 한 줄로만 표시되도록 설정
            }}
          />
        ))}

        <IconButton onClick={() => handleTagPagination('next')} disabled={(tagPage + 1) * 7 >= tags.length} sx={{ alignSelf: 'center' }}>
          <ArrowForwardIosIcon sx={{ fontSize: '24px' }} />
        </IconButton>

      </Box>

      {/* 지역 필터 */}
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        {regions.map((region, idx) => (
          <Chip
            key={idx}
            label={region}
            clickable
            onClick={() => handleRegionFilter(region)}
            sx={{
              fontSize: '14px',
              padding: '10px',
              backgroundColor: '#F0F0F0',
              '&:hover': { backgroundColor: '#D9D9D9' },
            }}
          />
        ))}
      </Box>
      <br />

      {/* 모임 카드 */}
      <Grid container spacing={3} justifyContent="center">
        {filteredMeetings.map((meeting) => (
          <Grid item key={meeting.id}>
            <Paper
              elevation={3}
              onClick={() => handleCardClick(meeting.id)}
              sx={{
                cursor: 'pointer',
                width: '360px',
                height: '230px',
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: meeting.liked ? '#ffe5b4' : '#f5eedc',
                color: meeting.liked ? '#704C2E' : '#595959',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                position: 'relative',  // 하트 아이콘을 절대 위치로 배치
                borderRadius: '12px', // 둥근 테두리
                transition: 'background-color 0.3s, transform 0.3s', // 부드러운 전환 효과
                '&:hover': {
                  // backgroundColor: '#ffa354',
                  backgroundColor: meeting.liked ? '#ffd18c' : '#e4d7c5',
                  transform: 'scale(1.02)', // hover 시 확대 효과
                },
              }}
            >
              {/* 하트 아이콘 */}
              <Box
                onClick={(e) => {
                  e.stopPropagation(); // 카드 클릭 이벤트와 구분
                  toggleLike(meeting.id);
                }}
                sx={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  cursor: 'pointer',
                  zIndex: 10,
                  animation: meeting.liked ? 'likeAnimation 0.3s ease-in-out' : 'none', // 클릭 시 애니메이션
                }}
              >
                <img
                  src={meeting.liked ? '/images/heart-fill-icon.svg' : '/images/heart-icon.svg'}
                  alt="좋아요"
                  style={{ width: '25px', height: '25px', }}
                />
               
              </Box>

              {/* 모임 이미지 */}
              <Box
                component="img"
                src={meeting.image}
                alt={meeting.title}
                sx={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  marginRight: '16px',
                  flexShrink: 0, // 이미지가 늘어나거나 줄어들지 않도록 설정
                }}
              />
              {/* 모임 설명 */}
              <Box
                sx={{
                  width: 'calc(100% - 146px)', // 이미지 크기 + margin을 제외한 너비 설정
                  overflow: 'hidden',
                }}
              >
                <Typography variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    whiteSpace: 'nowrap', // 텍스트가 한 줄에만 표시되도록 설정
                    overflow: 'hidden', // 텍스트가 넘치면 숨기기
                    textOverflow: 'ellipsis', // 넘친 텍스트에 "..." 표시
                  }}
                >
                  {meeting.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {meeting.region} · {meeting.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {meeting.date}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ marginRight: '8px' }}>
                    인원: {meeting.members}
                  </Typography>
                  <AvatarGroup max={4}>
                    <Avatar alt="User 1" src="/images/picture4.png" />
                    <Avatar alt="User 2" src="/images/picture3.png" />
                    <Avatar alt="User 3" src="/images/picture1.png" />
                    {/* <Avatar alt="User 4" src="/images/picture2.png" /> */}
                  </AvatarGroup>
                </Box>
                <Box sx={{ marginTop: '8px', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {meeting.tags.map((tag, idx) => (
                    <Chip key={idx} label={tag} sx={{ backgroundColor: '#b3d468', fontSize: '12px' }} />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
