import styled from "styled-components";
import { motion } from "framer-motion";
import { Button as StyledButton, Input as StyledInput } from "@mui/material";

export const RegistrationWrapper = styled(motion.div)`
  min-height: 100vh;
  .container {
    margin: 0 auto;
    max-width: 1440px;

    .header {
      padding: 0 1rem;
      height: 100vh;
      max-height: 60px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      .container {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg {
          fill: var(--black);
        }
      }
    }
    .main {
      margin: 0 1rem;
      .flip-card {
        margin: 0 auto;
        background-color: transparent;
        width: 100%;
        height: 100vh;
        max-width: 460px;
        max-height: 400px;
        perspective: 1000px;
      }

      .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 2rem 0;
        transition: transform 0.25s;
        transform-style: preserve-3d;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        &.signUp {
          transform: rotateY(180deg);
        }
      }

      .flip-card-front,
      .flip-card-back {
        &.hide {
          display: none;
        }
        position: absolute;
        padding: 1rem;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        form {
          display: flex;
          width: 100%;
          flex-direction: column;

          .MuiInput-root,
          button {
            color: var(--black);
            margin-bottom: 1rem;
          }
        }
        p {
          color: var(--black);
          em {
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      .flip-card-front {
      }

      .flip-card-back {
        /* background-color: var(--whiteSmoke); */
        transform: rotateY(180deg);
      }
    }
  }
`;

export const Input = styled(StyledInput)`
  &.MuiInput-root::after {
    border-bottom: 2px solid var(--dark);
  }
`;

export const Button = styled(StyledButton)`
  &.MuiButton-root {
    color: var(--black);
    border: 1px solid var(--black);
    &:hover {
      background-color: var(--gray);
      border: 1px solid var(--black);
    }
    &:disabled {
    }
  }
`;
