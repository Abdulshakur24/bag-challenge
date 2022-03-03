import { motion } from "framer-motion";
import styled from "styled-components";

export const MainWrapper = styled(motion.div)`
  width: 100%;
  background-color: var(--gray);
  transition: all 250ms ease-in-out;
  @media ${(props) => props.theme.breakpoints.lg} {
    background-color: var(--whiteSmoke);
  }
  .routes-container {
    padding: 1rem;
    max-height: calc(100vh - 6.25rem);
    overflow-y: auto;
    min-height: calc(100vh - 6.25rem);
  }
`;
