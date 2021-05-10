import React from 'react';
import styled from 'styled-components';

const SpinnerWrapper= styled.div`
    min-height: auto;
    width: 100%;
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  margin-left: 0.25rem;
  
  & .path {
    stroke: #5652BF;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
      stroke: #5652BF;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
      stroke: #EF435C;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
      stroke: teal;
    }
  }
`;

const Spinner: React.FC = () => (
    <React.Fragment>
          <SpinnerWrapper>
            <StyledSpinner viewBox="0 0 50 50">
                <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
                />
            </StyledSpinner>
          </SpinnerWrapper>
    </React.Fragment>
);


export default Spinner;