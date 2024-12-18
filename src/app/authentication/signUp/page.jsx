"use client";
import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Checkbox, FormControlLabel, List, ListItem, ListItemText, Collapse, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";
import styles from "../Authentication.module.css";
import InputForm from "../../component/InputForm";

function SignupPage() {
  const [mId, setMId] = useState("");
  const [mPw, setMPw] = useState("");
  const [mPwConfirm, setMPwConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);// 인증 완료?

  const [verificationCode, setVerificationCode] = useState("");  //입력한 인증 코드
  
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [openTerms, setOpenTerms] = useState({ term1: false, term2: false });
  const [countdown, setCountdown] = useState(180); // 3분 (180초)
  const [verificationSent, setVerificationSent] = useState(false);  // 이메일 발송 여부 확인

  const [passwordCheck, setPasswordCheck] = useState(false); //비밀번호 중복 확인
  const [idStatus, setIdStatus] = useState({ message: "", isAvailable: true }); // 아이디 중복 여부 상태


  const router = useRouter();

  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
  

  // 입력 핸들러
  const handleIdChange = (e) => setMId(e.target.value);
  const handlePwChange = (e) => setMPw(e.target.value);
  const handleMPwConfirmChange = (e) => setMPwConfirm(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);    // 이메일
  const handleZipcodeChange = (e) => setZipcode(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleAddressDetailChange = (e) => setAddressDetail(e.target.value);
  const handleAgreeChange = (e) => setAgreed(e.target.checked);
  const handleVerificationCodeChange = (e) => setVerificationCode(e.target.value);

  // 약관 열기/닫기 핸들러
  const toggleTerm = (term) => {
    setOpenTerms((prev) => ({ ...prev, [term]: !prev[term] }));
  };
  
  // 아이디 중복 확인
  useEffect(() => {
    const id = mId;
  
    if (id && id.length > 0) {
      const checkIdAvailability = async () => {
        try {
          const response = await axios.get(`${LOCAL_API_BASE_URL}/members/idCheck`, {
            params: { m_id: id }
          });
  
          const data = response.data;
  
          if (data.success) {
            setIdStatus({ message: "사용 가능한 아이디입니다.", isAvailable: true });
          } else {
            setIdStatus({ message: "사용 중인 아이디입니다.", isAvailable: false });
          }
        } catch (error) {
          console.error("아이디 중복 체크 오류:", error);
        }
      };
  
      checkIdAvailability();
    } else {
      setIdStatus({ message: "", isAvailable: true }); // 아이디가 비어있으면 메시지 초기화
    }
  }, [mId]);

  // 비밀번호 일치 확인
  useEffect(() => {
    if(mPwConfirm == mPw) {
      setPasswordCheck(true);
      console.log(passwordCheck);
    } else {
      setPasswordCheck(false);
      console.log(passwordCheck);
    }
  },[mPwConfirm, passwordCheck])

  useEffect(() => {
    // 카카오 주소 검색 스크립트 추가
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  //handle
  const handlePostCode = () => {
    // 카카오 주소 검색 팝업 실행
    new window.daum.Postcode({
      oncomplete: (data) => {
        // 도로명 주소와 우편번호 저장
        setZipcode(data.zonecode);
        setAddress(data.address);
      },
    }).open(); // 팝업 열기
  };

  //회원가입 버튼 클릭 이벤트
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };



  // 회원가입 버튼 클릭 처리
  const handleSignup = () => {
    if (!mId || !mPw || !mPwConfirm || !name || !phone || !email || !zipcode || !address || !addressDetail) {
      setError("모든 필드를 입력하세요.");
      return;
    }
    if(!idStatus){
      setError("이미 사용중인 아이디입니다.");
    }
    if (mPw !== mPwConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!emailVerified) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }
    if (!agreed) {
      setError("약관에 동의해야 회원가입이 가능합니다.");
      return;
    }

    // 회원가입 로직 추가 (예: 서버에 데이터 전송)
    console.log("회원가입 성공:", { mId, mPw, name, phone, email, zipcode, address, addressDetail });

    // 회원가입 성공 후 로그인 페이지로 이동
    router.push("/login");
  };



  //이메일 인증 타이머
  useEffect(() => {
    let timer;
    if (countdown > 0 && verificationSent) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(timer);
      setVerificationSent(180);
    }
    return () => clearInterval(timer);
  }, [countdown, verificationSent]);

  // 인증 코드 발송 
  const handleVerifyClick = async () => {
    const API_URL = `${LOCAL_API_BASE_URL}/signup/sendVerificationEmail`
    if(email == ""){
      alert("이메일을 입력해주세요.");
      return;
    } else if(!email.includes("@")){
      alert("올바른 형식으로 입력해주세요.")
      return;
    }
    try {
      const response = await axios.post(API_URL,{
        "email" : email
      });
      //성공
      if(response.data.success){
        setError("");  // 에러 초기화
        alert(response.data.message);
        setVerificationSent(true);
        setVerificationCode("");
      } else {
        setError("이메일 발송에 실패했습니다.");
        alert(error);
      }
    } catch (error) {
      setError("오류가 발생했습니다.");
      alert(error);
    }
  };

  //인증 코드 확인
  const verifyCode = async () => {

    //인증코드 발송 안했으면
    if(!verificationSent){
      alert("인증코드를 발송해주세요.");
      return
    }

    const API_URL = `${LOCAL_API_BASE_URL}/signup/verifyEmail`
    try {
      const response = await axios.post(API_URL,{
        "email" : email,
        "verificationCode" : verificationCode
      })
      if(response.data.success){
        setError("");  // 에러 초기화
        alert(response.data.message);
        setEmailVerified(true);
      } else {
        setError("인증번호가 다릅니다.");
        alert(error);
      }
    } catch (error) {
      setError("오류가 발생했습니다.");
      alert(error);
    }
  };

  return (
    <div className="authenticationBox">
      <Box
        component="main"
        sx={{
          maxWidth: "510px",
          ml: "auto",
          mr: "auto",
          padding: "50px 0 100px",
        }}
      >
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Box>
            {/* 페이지 제목 */}
            <Typography as="h1" fontSize="28px" fontWeight="700" mb="5px">
              Get’s started.{" "}
              <img
                src="/images/favicon.png" //메인 이미지
                alt="favicon"
                className={styles.favicon}
              />
            </Typography>
            
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Box
                sx={{
                  background: "#fff",
                  padding: "30px 20px",
                  borderRadius: "10px",
                  mb: "20px",
                }}
                className="bg-black"
              >
                <Grid container alignItems="center" spacing={2}>
                  {/* 입력 필드 */}
                  <InputForm
                    label="아이디"
                    name="id"
                    value={mId}
                    onChange={handleIdChange}
                  />
                  {/* 아이디 중복확인 */}
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2, ml: 3 }}>
                    {idStatus.message}
                  </Typography>
                  <InputForm
                    label="비밀번호"
                    type="password"
                    name="pw"
                    value={mPw}
                    onChange={handlePwChange}
                  />
                  <InputForm
                    label="비밀번호 확인"
                    type="password"
                    name="pwChk"
                    value={mPwConfirm}
                    onChange={handleMPwConfirmChange}
                  />

                   {/* 비밀번호 일치 확인 */}
                  {/* InputForm(label, type, name, value, onChange) */}
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2, ml: 3 }}>
                    {mPwConfirm == "" ?  "" : (passwordCheck ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다.")}
                  </Typography>


                </Grid>
              </Box>
              <Box
                sx={{
                  background: "#fff",
                  padding: "30px 20px",
                  borderRadius: "10px",
                  mb: "20px",
                }}
                className="bg-black"
              >
                <Grid container alignItems="center" spacing={2}>
                  <InputForm
                    label="이름" 
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                  <InputForm
                    label="휴대폰번호"
                    name="phone1"
                    value={phone}
                    onChange={handlePhoneChange}
                    xs={12}
                  />
                    {/* <Button
                      xs={4}
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => setPhoneVerified(true)}
                    >
                      휴대폰 인증하기
                    </Button> */}
                </Grid>
            </Box>
            <Box
              sx={{
                background: "#fff",
                padding: "30px 20px",
                borderRadius: "10px",
                mb: "20px",
              }}
              className="bg-black"
            >
              <Grid container alignItems="center" spacing={2}>
                <InputForm
                  label="이메일"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={emailVerified}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 2,
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "16px",
                    ml:"20px",
                    mr:"2px",
                    padding: "10px 10px",
                    color: "#fff !important",
                  }}
                  onClick={handleVerifyClick}
                  disabled={emailVerified}
                >
                  인증번호 보내기
                </Button>
                <InputForm
                  label="인증 코드"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={handleVerificationCodeChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 2,
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "16px",
                    ml:"20px",
                    mr:"2px",
                    padding: "10px 10px",
                    color: "#fff !important",
                  }}
                  onClick={verifyCode}
                  disabled={emailVerified}
                >
                  인증번호 확인
                </Button>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 3, ml: 3 }}>
                  {emailVerified
                    ? '인증 완료되었습니다.'
                    : verificationSent
                    ? `인증 코드가 이메일로 발송되었습니다. 남은 시간: ${Math.floor(countdown / 60)}:${countdown % 60}`
                    : null}
                </Typography>
                
              </Grid>
              
            </Box>            
            <Box
              sx={{
                background: "#fff",
                padding: "30px 20px",
                borderRadius: "10px",
                mb: "20px",
              }}
              className="bg-black"
            >
            <Grid container alignItems="center" spacing={2}>
              <InputForm 
                label="우편번호"
                name="zipcode"
                value={zipcode}
                onChange={handleZipcodeChange}
                disabled
              />
            </Grid>
            
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "16px",
                mr:"2px",
                padding: "10px 10px",
                color: "#fff !important",
              }}
              onClick={handlePostCode}
            >
              우편번호 검색
            </Button>
            <Grid container alignItems="center" spacing={2}>
                <InputForm 
                  label="주소"
                  value={address}
                  onChange={handleAddressChange}
                  disabled
                />
                <InputForm 
                  label="상세주소"
                  value={addressDetail}
                  onChange={handleAddressDetailChange}
                />
              </Grid>
            </Box>
          </Box>

        {/* 약관 목록 */}
        <Box
          sx={{
            background: "#fff",
            padding: "30px 20px",
            borderRadius: "10px",
            mb: "20px",
          }}
          className="bg-black"
        >
          <Box
            sx={{
              width: "auto",
              margin: 0,
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              boxShadow: 1
            }}
          >
            <Typography variant="subtitle1">약관</Typography>
            <List>
              {/* 약관 1 */}
              <ListItem button onClick={() => toggleTerm("term1")}>
                <ListItemText primary="이용약관" />
                {openTerms.term1 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openTerms.term1} timeout="auto" unmountOnExit>
                <Box sx={{ padding: 2, backgroundColor: "#f1f1f1", borderRadius: "4px" }}>
                  <Typography variant="body2">
                    이 약관은 사용자가 서비스를 이용함에 있어 필요한 조건과 규정을 담고 있습니다.
                  </Typography>
                </Box>
              </Collapse> 

              {/* 약관 2 */}
              <ListItem button onClick={() => toggleTerm("term2")}>
                <ListItemText primary="개인정보 처리방침" />
                {openTerms.term2 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openTerms.term2} timeout="auto" unmountOnExit>
                <Box sx={{ padding: 2, backgroundColor: "#f1f1f1", borderRadius: "4px" }}>
                  <Typography variant="body2">
                    개인정보는 안전하게 보호되며, 법적 요건에 따라 처리됩니다.
                  </Typography>
                </Box>
              </Collapse>
            </List>
          </Box>

          {/* 약관 동의 */}
          <FormControlLabel
            control={<Checkbox checked={agreed} onChange={handleAgreeChange} />}
            label={<Typography variant="body2">회원가입 약관에 동의합니다.</Typography>}
            sx={{ marginTop: 2, alignSelf: "flex-start" }}
          />

          {/* 에러 메시지 */}
          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}

          {/* 회원가입 버튼 */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignup}
            sx={{ marginTop: 2 }}
            disabled={false}
          >
            회원가입
          </Button>

          {/* 로그인 페이지로 이동 */}
          <Button
            variant="text"
            color="secondary"
            fullWidth
            onClick={() => router.push("/authentication/login")}
            sx={{ marginTop: 1 }} 
          >
            이미 계정이 있으신가요? 로그인
          </Button>
        </Box>
      </Box>
    </Grid>
  </Box>
  </div>
  );
}

export default SignupPage;