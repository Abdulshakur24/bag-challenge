import { motion } from "framer-motion";
import styled from "styled-components";

export const VisitedWrapper = styled(motion.div)`
  display: grid;
  grid-template: 1fr / repeat(auto-fit, minmax(328px, 1fr));
  gap: 2.5rem;
  margin: 1rem 3.375rem;
  @media ${(props) => props.theme.breakpoints.lg} {
    grid-template: 1fr / repeat(auto-fit, minmax(260px, 1fr));
  }
`;
