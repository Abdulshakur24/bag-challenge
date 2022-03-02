import styled from "styled-components";
import { motion } from "framer-motion";

export const HeaderWrapper = styled(motion.div)`
  max-height: 6.25rem;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 250ms ease-in-out;
  background: var(--white);
  .container {
    padding: 0 1.25rem;
    width: 100%;
    height: unset;
    .contents {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--black);
      button {
        color: var(--black);

        .MuiSvgIcon-root {
          transform: rotate(-45deg);
          margin-right: 1rem;
        }
      }
    }
  }
`;
