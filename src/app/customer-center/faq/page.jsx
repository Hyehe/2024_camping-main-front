"use client";

import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQPage() {
  const faqs = [
    { question: "예약 최소 하고 싶어요.", answer: "최소 하루 전까지 예약 가능합니다." },
    { question: "캠핑장에 Wi-Fi가 제공되나요?", answer: "일부 캠핑장에서 제공됩니다." },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        자주 묻는 질문
      </Typography>
      <Box>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
