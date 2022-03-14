import styled from "styled-components";
import { motion } from "framer-motion";

export const ToVisitWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

export const ToVisitContainer = styled(motion.div)`
  height: 100%;
  display: grid;
  grid-template: 1fr / repeat(auto-fit, minmax(328px, 1fr));
  margin: 1rem 0;
  @media ${(props) => props.theme.breakpoints.lg} {
    grid-template: 1fr / repeat(auto-fit, minmax(260px, 1fr));
    margin: 1rem 3.375rem;
  }
  justify-items: center;
  gap: 2.5rem;

  .css-1dk1h2u-MuiSkeleton-root {
    transform: scale(1);
  }
  .MuiSkeleton-root {
    width: 100%;
    height: 450px;
  }
`;

export const ToVisitContents = styled(motion.div)`
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr 1fr;
  gap: 1.5rem;
  margin: 1rem;

  @media ${(props) => props.theme.breakpoints.lg} {
    margin: 1rem 3.375rem;
  }

  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: 1 / 1 / span 1 / span 4;
    max-height: 60px;
    width: 100%;
    height: 3.125rem;
    justify-content: flex-start;
    box-shadow: 6px 6px 10px 0px rgba(0 0 0 / 0.2);
    border-radius: 4px;
    background: var(--white);
    fill: var(--black);
    gap: 1rem;
    padding: 0 1.5rem;

    input {
      height: 100%;
      font-size: 1rem;
      border: none;
      width: 100%;
      outline: none;
      background: transparent;
      color: var(--black);
    }

    @media ${(props) => props.theme.breakpoints.lg} {
      max-width: 400px;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    &:active {
      opacity: 0.8;
    }
  }

  .filter-button {
    grid-area: 2 / 3 / span 1 / span 2;
    justify-self: flex-end;
  }

  .sort-button {
    grid-area: 2 / 1 / span 1 / span 2;
  }
  @media ${({ theme }) => theme.breakpoints.lg} {
    .filter-button {
      grid-area: 1 / 3 / span 1 / span 2;
    }
  }

  button {
    width: 100%;
    height: 3.125rem;
    max-width: 246px;
    color: var(--black);
    background-color: var(--white);
    box-shadow: 6px 6px 10px 0px rgba(0 0 0 / 0.2);
    @media ${(props) => props.theme.breakpoints.lg} {
      max-width: 200px;
      margin-top: unset;
    }
  }
`;

export const CountryWrapper = styled(motion.div)`
  width: 100%;
  box-shadow: 6px 6px 10px 0px rgba(0 0 0 / 0.2);
  background: var(--white);
  border-radius: 8px 8px 0 0;
  max-width: 328px;
  max-height: 450px;
`;

export const CountryContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
export const Top = styled(motion.div)``;

export const Bottom = styled(motion.div)`
  padding: 36px 30px 55px 30px;
`;
export const Image = styled(motion.img)`
  width: 100%;
  height: 12.375rem;
  border-radius: 8px 8px 0 0;
`;
export const Name = styled(motion.h3)``;
export const Population = styled(motion.p)`
  margin-top: 30px;
`;
export const Region = styled(motion.p)`
  margin-top: 18px;
`;
export const Capital = styled(motion.p)`
  margin-top: 18px;
`;
