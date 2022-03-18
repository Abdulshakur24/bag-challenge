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

      .right-section {
        display: none;
        @media ${(props) => props.theme.breakpoints.lg} {
          display: flex;
          align-items: center;
          justify-content: center;

          h4 {
            margin-left: 0.5rem;
          }
          button {
            color: var(--black);

            .MuiSvgIcon-root {
              transform: rotate(-45deg);
              margin-right: 1rem;
            }
            display: none;
            @media ${(props) => props.theme.breakpoints.lg} {
              display: flex;
            }
          }
        }
      }

      ul {
        z-index: 10;
        cursor: pointer;
        @media ${(props) => props.theme.breakpoints.lg} {
          display: none;
        }

        &.opened {
          li:nth-child(1) {
            transform: rotate(45deg) translate(0px, 10.5px);
            margin: unset;
          }
          li:nth-child(2) {
            opacity: 0;
          }
          li:nth-child(3) {
            transform: rotate(-45deg) translate(-2px, -9px);
          }
        }

        li {
          transition: all 150ms ease-in-out;
          width: 35px;
          height: 3.5px;
          background: var(--black);
          list-style: none;
          &:not(:last-child) {
            margin-bottom: 5px;
          }
        }
      }
    }
  }
`;

export const BackdropWrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #0005;
  backdrop-filter: blur(2px);

  @media ${(props) => props.theme.breakpoints.lg} {
    display: none;
  }
`;

export const ModalWrapper = styled(motion.div)`
  position: fixed;
  width: clamp(0px, 100%, 400px);
  top: 0;
  right: 0;
  bottom: 0;
  background: var(--white);
  transition: all 250ms ease-in-out;

  .modal-container {
    .modal-header {
      position: absolute;
      left: 1rem;
      top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      h4 {
        margin-left: 1.25rem;
        color: var(--black);
        transition: all 250ms ease-in-out;
      }
    }

    .modal-content {
      margin-top: 5.5rem;
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

        &:not(:first-child) {
          margin-top: 1.6875rem;
        }

        &.selected {
          background: var(--gray);
        }
      }
    }

    .btn-layout {
      margin-top: 1.5rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;

      button {
        color: var(--black);

        .MuiSvgIcon-root {
          transform: rotate(-45deg);
          margin-right: 1rem;
        }
        /* display: none; */
      }

      .confirm-region {
        position: relative;
        p {
          top: -20px;
          right: 12px;
          position: absolute;
        }
      }
    }
  }
`;
