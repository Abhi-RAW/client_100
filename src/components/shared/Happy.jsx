import React from "react";
import styled, { keyframes } from "styled-components";

// Online image URLs
const HappyImageLight = "https://cdn-icons-png.flaticon.com/512/742/742751.png";
const HappyImageDark = "https://cdn-icons-png.flaticon.com/512/742/742751.png";

// Keyframe animations
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled components
const HappyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 450px;
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out;
`;

const HappyImage = styled.img`
  height: 120px;
  width: 120px;
  object-fit: contain;
  margin-bottom: 1rem;
  animation: ${bounce} 2s infinite;
`;

const MessageText = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => (theme ? "#111" : "#FFF")};
  background-color: ${({ theme }) => (theme ? "transparent" : "#333")};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  display: inline-block;
`;

export const Happy = ({ message, theme }) => {
  return (
    <HappyContainer>
      <HappyImage src={theme ? HappyImageLight : HappyImageDark} alt="Happy Face" />
      <MessageText theme={theme}>{message}</MessageText>
    </HappyContainer>
  );
};
