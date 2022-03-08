import { motion } from "framer-motion";
import styled from "styled-components";

export const MyListWrapper = styled(motion.div)`
  button {
    color: var(--black);
    margin: 1rem 0;
  }
`;

export const MyListContainer = styled(motion.div)`
  height: 100%;
  display: grid;
  grid-template: 1fr / repeat(auto-fit, minmax(328px, 1fr));
  @media ${(props) => props.theme.breakpoints.lg} {
    grid-template: 1fr / repeat(auto-fit, minmax(260px, 1fr));
  }
  justify-items: center;

  gap: 2.5rem;
  margin: 1rem 3.375rem;

  .css-1dk1h2u-MuiSkeleton-root {
    transform: unset;
  }
  .MuiSkeleton-root {
    width: 100%;
    max-width: 328px;
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
  position: relative;
`;
export const Top = styled(motion.div)``;

export const Bottom = styled(motion.div)`
  padding: 36px 30px 55px 30px;
  .icons {
    position: absolute;
    z-index: 10;
    right: 0.625rem;
    cursor: auto;

    .deleteIcon {
      margin-right: 0.625rem;
    }
    .icon {
      cursor: pointer;
    }
    .checkIcon {
      &.checked {
        fill: #14c704;
      }
      &.unchecked {
        fill: #d9d9d9;
      }
    }
  }
`;
export const Image = styled(motion.img)`
  width: 100%;
  height: 12.375rem;
  border-radius: 8px 8px 0 0;
  user-select: none;
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
