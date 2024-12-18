"use client"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

function InputForm({label, type="text", name, value, onChange, xs=12, disabled=false}) {
  const [showPassword, setShowPassword] = useState(false);

  // 비밀번호 표시 상태 변경 함수
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function textField(){
    // 비밀번호 입력창일 경우
    if(type=="password"){
      return(
        <TextField
        name={name}
        type={showPassword ? "text" : "password"}
        required
        fullWidth
        id={name}
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-readonly
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleTogglePasswordVisibility}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      )
      //비밀번호 입력창이 아닐 경우
    } else {
      return(
        <TextField
        name={name}
        type={type}
        required
        fullWidth
        id={name}
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-readonly
        InputProps={{
          style: { borderRadius: 8 }
        }}
      />
      )
    }

  }

  return (
    <Grid item xs={xs}>
      <Typography
        component="label"
        sx={{
          fontWeight: "500",
          fontSize: "14px",
          mb: "10px",
          display: "block",
          textAlign: "left"
        }}
      >
        {label}
      </Typography>
      {textField()}

    </Grid>
  );
}

export default InputForm;