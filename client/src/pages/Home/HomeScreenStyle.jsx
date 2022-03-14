import styled from "styled-components";
import { motion } from "framer-motion";

export const HomeWrapper = styled(motion.div)`
  height: 100vh;
  display: flex;
  justify-content: center;
  max-width: 1640px;
  margin: 0 auto;
  background-color: var(--whiteSmoke);
  color: var(--black);
  transition: all 250ms ease-in-out;
  @media ${(props) => props.theme.breakpoints.sm} {
  }
`;
