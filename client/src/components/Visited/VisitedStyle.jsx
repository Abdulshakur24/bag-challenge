import { motion } from "framer-motion";
import styled from "styled-components";

export const VisitedWrapper = styled(motion.div)`
  display: grid;
  grid-template: 1fr / repeat(auto-fit, minmax(328px, 1fr));
  gap: 2.5rem;
  justify-items: center;
  margin: 1rem 0;
  @media ${(props) => props.theme.breakpoints.lg} {
    grid-template: 1fr / repeat(auto-fit, minmax(260px, 1fr));
    margin: 1rem 3.375rem;
  }
`;

export const EmptyVisitedWrapper = styled(motion.div)``;
export const EmptyVisitedContainer = styled(motion.div)`
  width: clamp(0px, 100%, 400px);
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  text-align: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    padding: 1rem;
    width: 100%;
    height: 3.125rem;
    max-width: 246px;
    color: var(--black);
    background-color: var(--white);
    box-shadow: 6px 6px 10px 0px rgb(0 0 0 / 20%);
    &:active {
      opacity: 0.8;
    }
  }
`;
