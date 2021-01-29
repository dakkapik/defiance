import styled, { keyframes } from "styled-components";

export const animationName = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;

export const Container = styled.div`
  display: flex;
  animation: ${animationName} ease 3s;
`;

export const ContainerDriver = styled.div`
  display: flex;
  flex-direction: column;
`;
