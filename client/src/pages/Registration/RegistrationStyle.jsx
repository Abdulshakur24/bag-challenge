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
        transform: rotateY(180deg);
        .personal-image {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
        }
        .personal-image input[type="file"] {
          display: none;
        }
        .personal-figure {
          position: relative;
          width: 60px;
          height: 60px;
        }
        .personal-avatar {
          cursor: pointer;
          width: 60px;
          height: 60px;
          box-sizing: border-box;
          border-radius: 100%;
          border: 2px solid #212121;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
          transition: all ease-in-out 0.3s;
        }
        .personal-avatar:hover {
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        }
        .personal-figcaption {
          cursor: pointer;
          position: absolute;
          top: 0px;
          width: inherit;
          height: inherit;
          border-radius: 100%;
          opacity: 0;
          background-color: rgba(0, 0, 0, 0);
          transition: all ease-in-out 0.3s;
        }
        .personal-figcaption:hover {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .personal-figcaption > img {
          margin: 16.25px;
          width: 25px;
          height: 25px;
        }
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
