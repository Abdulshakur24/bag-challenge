import { motion } from "framer-motion";
import styled from "styled-components";

export const SidbarWrapper = styled(motion.div)`
  max-width: 180px;
  width: 100%;
  display: none;
  transition: all 250ms ease-in-out;
  border-right: 1px solid var(--dark);
  background: var(--white);
  @media ${(props) => props.theme.breakpoints.lg} {
    display: unset;
  }

  .container {
    padding: 1.75rem 2.0625rem;

    svg {
      fill: var(--black);
    }

    .contents {
      margin-top: 2.5rem;
      display: flex;
      flex-direction: column;
      user-select: none;

      a {
        padding: 1rem;
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        color: var(--black);
        transition: all 150ms ease-in-out;
        border-radius: 8px;
        &:not(:first-child) {
          margin-top: 1.6875rem;
        }

        &.selected {
          background: var(--gray);
        }
      }
    }
  }
`;
