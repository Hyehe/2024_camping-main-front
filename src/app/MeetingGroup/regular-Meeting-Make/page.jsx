'use client';

import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  FormHelperText,
} from '@mui/material';
import { useEffect, useState } from 'react';

// 해시태그와 지역 리스트
const hashtags = [
  '#카라반', '#글램핑', '#야영', '#산', '#바다',
  '#오토캠핑', '#자연', '#캠프파이어', '#별 관찰', '#텐트',
  '#캠핑 장비', '#팀워크', '#소통', '#즐거운 추억', '#자연 보호',
  '#힐링', '#맛있는 음식', '#트레킹', '#낚시', '#자전거 타기',
  '#하이킹', '#스모어', '#캠핑 요리', '#자연 탐험', '#야외 게임',
  '#일출', '#일몰', '#야생동물 관찰 ', '#사진', '#물놀이',
  '#친목', '#산책', '#명상', '#휴식', '#오프그리드 생활',
];
const regions = ['서울', '경기', '인천', '강원도', '부산', '광주', '수원', '용인', '고양', '창원', '대구', '대전', '울산', '충청도', '전라도', '기타'];

export default function CreateMeetingPage() {
  const [title, setTitle] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubRegion, setSelectedSubRegion] = useState('');
  const [otherRegion, setOtherRegion] = useState('');
  const [description, setDescription] = useState('');
  const [personnel, setPersonnel] = useState('');

  // 실제 업로드할 파일
  const [selectedFile, setSelectedFile] = useState(null);
  // 미리보기용 이미지 경로
  const [previewImage, setPreviewImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // 해시태그 클릭
  const handleHashtagClick = (hashtag) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(selectedHashtags.filter((t) => t !== hashtag));
    } else if (selectedHashtags.length < 3) {
      setSelectedHashtags([...selectedHashtags, hashtag]);
    }
  };

  // 파일 선택
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));  // 미리보기
    }
  };

  // 유효성 검사
  const validateForm = () => {
    const newErrors = {};

    // (1) 모임 제목
    if (!title.trim()) {
      newErrors.title = '필수 입력입니다.';
    }
    // (2) 이미지 선택
    if (!selectedFile) {
      newErrors.image = '필수 입력입니다.';
    }
    // (3) 해시태그 최소 1개
    if (selectedHashtags.length === 0) {
      newErrors.hashtags = '최소 1개의 해시태그를 선택해주세요.';
    }
    // (4) 지역
    if (!selectedRegion) {
      newErrors.region = '필수 입력입니다.';
    } else if (selectedRegion !== '기타') {
      // 일반 지역 선택 시
      if (!selectedSubRegion.trim()) {
        newErrors.subRegion = '구/군 등을 입력해주세요.';
      }
    } else {
      // 기타 지역 선택 시
      if (!otherRegion.trim()) {
        newErrors.otherRegion = '기타 지역을 입력해주세요.';
      }
    }
    // (5) 모임 내용
    if (!description.trim()) {
      newErrors.description = '필수 입력입니다.';
    }
    // (6) 정원
    if (!personnel || Number(personnel) <= 0) {
      newErrors.personnel = '1 이상의 숫자를 입력해주세요.';
    }

    setErrors(newErrors);
    setIsSubmitDisabled(Object.keys(newErrors).length > 0);
  };

  // 값들이 변경될 때마다 유효성 검사
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title,selectedFile,selectedHashtags,selectedRegion,selectedSubRegion,otherRegion,description,personnel]);

  // 작성 버튼
  const handleSubmit = async () => {
    // 유효성 검사 다시
    validateForm();
    if (isSubmitDisabled) return;

    try {
      // FormData로 구성
      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);
      // 지역 설정
      if (selectedRegion === '기타') {
        formData.append("region", otherRegion);
        // subregion은 안 쓰거나, 별도 로직
        formData.append("subregion", otherRegion);
      } else {
        formData.append("region", selectedRegion);
        formData.append("subregion", selectedSubRegion);
      }

      formData.append("personnel", personnel);
      formData.append("hashtags", selectedHashtags.join(",")); // CSV 형태

      // 파일
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      // 서버에 전송
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL}/regular-meetings`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("정규 모임이 작성되었습니다.");
        // 목록 페이지로 이동
        window.location.href = "/MeetingGroup/regular-Meeting";
      } else {
        // 서버 에러메시지 확인
        const errorData = await response.text();
        alert(`오류 발생: ${errorData}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("정규 모임 생성 중 오류가 발생했습니다.");
    }
  };


  return (
    <Box sx={{ padding: '20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '80px' }}>
      {/* 제목 */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        정규 모임 만들기
      </Typography>

      {/* 모임 제목 */}
      <TextField
        fullWidth
        label="모임 제목"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={!!errors.title}
        helperText={errors.title}
        sx={{
          marginBottom: '20px',
          '& .MuiOutlinedInput-root.Mui-error': {
            '& fieldset': {
              borderColor: 'black', // 테두리 색상을 검정으로 변경
            },
          },
          '& .MuiFormLabel-root.Mui-error': {
            color: 'black', // 라벨(placeholder)의 색상을 검정으로 설정
          },
          '& .MuiInputBase-input': {
            color: 'black', // 입력된 텍스트 색상을 검정으로 설정
          },
          '& .MuiFormHelperText-root.Mui-error': {
            color: 'green', // 오류 메시지 색상 유지
          },
        }}
      />
      {/* 모임 프로필 사진 */}
      <Box sx={{ marginBottom: '20px', textAlign: 'left' }}>
        <Button
          variant="contained"
          component="label"
          style={{ backgroundColor: '#79c75f' }}
        >
          프로필 사진 선택
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>
        {errors.image && (
          <FormHelperText
            sx={{
              color: 'green', // 오류 메시지를 초록색으로 설정
              marginTop: '5px',
            }}
          >
            {errors.image}
          </FormHelperText>
        )}
        {previewImage && (
          <Box sx={{ marginTop: '10px' }}>
            <Typography variant="body2" sx={{ marginBottom: '5px' }}>미리보기:</Typography>
            <Avatar
              src={previewImage}
              alt="Selected Profile"
              sx={{
                width: '100px', height: '100px', borderRadius: '8px',
                border: errors.image ? '2px solid black' : 'none',
              }}
            />
          </Box>
        )}
      </Box>

      {/* 해시태그 */}
      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        관련된 해시태그 선택 (최대 3개)
      </Typography>
      <Box sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '20px',
      }}>
        {hashtags.map((tag, idx) => (
          <Chip
            key={idx}
            label={tag}
            clickable
            onClick={() => handleHashtagClick(tag)}
            sx={{
              backgroundColor: selectedHashtags.includes(tag) ? '#79c75f' : '#E0E0E0',
              color: selectedHashtags.includes(tag) ? 'white' : 'black',
            }}
          />
        ))}
      </Box>
      {errors.hashtags && (
        <FormHelperText sx={{
          color: 'green', // 오류 메시지를 초록색으로 설정
        }}>
          {errors.hashtags}
        </FormHelperText>
      )}

      {/* 지역 선택 */}
      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        지역 선택
      </Typography>
      <FormControl
        fullWidth
        sx={{
          marginBottom: '20px',
          '& .MuiOutlinedInput-root.Mui-error': {
            '& fieldset': {
              borderColor: 'black', // 테두리 색상을 검정으로 설정
            },
          },
          '& .MuiFormHelperText-root.Mui-error': {
            color: 'green', // 오류 메시지 색상을 초록색으로 설정
          },
        }}
      >
        <Select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          error={!!errors.region}
          displayEmpty
        >
          <MenuItem value="" disabled>
            지역을 선택하세요
          </MenuItem>
          {regions.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </Select>
        {errors.region && <FormHelperText error>{errors.region}</FormHelperText>}
      </FormControl>


      {/* 상세 지역 선택 */}
      {selectedRegion !== '기타' && (
        <TextField
          fullWidth
          label="구 작성 (예: 강남구)"
          variant="outlined"
          value={selectedSubRegion}
          onChange={(e) => setSelectedSubRegion(e.target.value)}
          error={!!errors.subRegion}
          helperText={errors.subRegion}
          sx={{
            marginBottom: '20px',
            '& .MuiOutlinedInput-root.Mui-error': {
              '& fieldset': {
                borderColor: 'black', // 테두리 색상을 검정으로 변경
              },
            },
            '& .MuiFormLabel-root.Mui-error': {
              color: 'black', // 라벨(placeholder)의 색상을 검정으로 설정
            },
            '& .MuiInputBase-input': {
              color: 'black', // 입력된 텍스트 색상을 검정으로 설정
            },
            '& .MuiFormHelperText-root.Mui-error': {
              color: 'green', // 오류 메시지 색상 유지
            },
          }}
        />
      )}
      {selectedRegion === '기타' && (
        <TextField
          fullWidth
          label="기타 지역 입력 (시.도.구)"
          variant="outlined"
          value={otherRegion}
          onChange={(e) => setOtherRegion(e.target.value)}
          error={!!errors.otherRegion}
          helperText={errors.otherRegion}
          sx={{
            marginBottom: '20px',
            '& .MuiOutlinedInput-root.Mui-error': {
              '& fieldset': {
                borderColor: 'black', // 테두리 색상을 검정으로 변경
              },
            },
            '& .MuiFormLabel-root.Mui-error': {
              color: 'black', // 라벨(placeholder)의 색상을 검정으로 설정
            },
            '& .MuiInputBase-input': {
              color: 'black', // 입력된 텍스트 색상을 검정으로 설정
            },
            '& .MuiFormHelperText-root.Mui-error': {
              color: 'green', // 오류 메시지 색상 유지
            },
          }}
        />
      )}

      {/* 모임 내용 */}
      <TextField
        fullWidth
        label="모임 내용"
        multiline
        rows={10}
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={!!errors.description}
        helperText={errors.description}
        sx={{
          marginBottom: '20px',
          '& .MuiOutlinedInput-root.Mui-error': {
            '& fieldset': {
              borderColor: 'black', // 테두리 색상을 검정으로 변경
            },
          },
          '& .MuiFormLabel-root.Mui-error': {
            color: 'black', // 라벨(placeholder)의 색상을 검정으로 설정
          },
          '& .MuiInputBase-input': {
            color: 'black', // 입력된 텍스트 색상을 검정으로 설정
          },
          '& .MuiFormHelperText-root.Mui-error': {
            color: 'green', // 오류 메시지 색상 유지
          },
        }}
      />

      {/* 정원 */}
      <TextField
        fullWidth
        label="정원 (숫자만 입력)"
        variant="outlined"
        type="number"
        value={personnel}
        onChange={(e) => setPersonnel(e.target.value)}
        error={!!errors.personnel}
        helperText={errors.personnel}
        sx={{
          marginBottom: '20px',
          '& .MuiOutlinedInput-root.Mui-error': {
            '& fieldset': {
              borderColor: 'black', // 테두리 색상을 검정으로 변경
            },
          },
          '& .MuiFormLabel-root.Mui-error': {
            color: 'black', // 라벨(placeholder)의 색상을 검정으로 설정
          },
          '& .MuiInputBase-input': {
            color: 'black', // 입력된 텍스트 색상을 검정으로 설정
          },
          '& .MuiFormHelperText-root.Mui-error': {
            color: 'green', // 오류 메시지 색상 유지
          },
        }}
      />

      {/* 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ backgroundColor: '#79c75f' }}
          disabled={isSubmitDisabled} // 버튼 비활성화 조건
          href="/MeetingGroup/regular-Meeting"
        >
          작성
        </Button><span />
        <Button
          variant="outlined"
          sx={{
            color: 'green', // 텍스트 색상
            borderColor: 'green', // 테두리 색상
            '&:hover': {
              borderColor: 'darkgreen', // 호버 시 테두리 색상
              backgroundColor: 'rgba(0, 128, 0, 0.1)', // 호버 시 배경색
            },
          }}
          href="/MeetingGroup/regular-Meeting"
        >
          취소
        </Button>

      </Box>
    </Box>
  );
}
