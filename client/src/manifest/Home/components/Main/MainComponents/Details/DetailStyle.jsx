import { motion } from "framer-motion";
import styled from "styled-components";

export const DetailsWrapper = styled(motion.div)`
  button {
    color: var(--black);
    margin: 1rem 0;
  }
`;

export const DetailsContainer = styled(motion.div)`
  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5rem;

    button {
      width: 100%;
      height: 3.125rem;
      max-width: 13.4375rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: var(--black);
      background-color: var(--white);
      box-shadow: 6px 6px 10px 0px rgba(0 0 0 / 0.2);
      &:active {
        opacity: 0.8;
      }
      @media ${(props) => props.theme.breakpoints.lg} {
        max-width: 200px;
        margin-top: unset;
      }
      &:disabled {
        opacity: 0.2;
        cursor: unset;
      }
    }
  }
`;
export const DetailsContents = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media ${(props) => props.theme.breakpoints.lg} {
    gap: 5rem;
    flex-direction: row;
  }
  .flag {
    margin: 1rem 0;
    img {
      width: 100%;
      height: 100%;
      max-width: 640px;
      max-height: 460px;
      @media ${(props) => props.theme.breakpoints.lg} {
        max-width: 530px;
        max-height: 380px;
      }
    }
  }

  .details {
    display: grid;
    grid-template: auto auto auto/ 1fr;
    @media ${(props) => props.theme.breakpoints.lg} {
      grid-template: 1fr 1fr / 1fr 1fr;
    }

    .display {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }
    .top-section {
      margin: 1rem 0;
      h1 {
        margin-bottom: 1rem;
      }
    }
    .mid-section {
      margin: 1rem 0;
      @media ${(props) => props.theme.breakpoints.lg} {
        margin-left: 1rem;
      }
    }
    .bottom-section {
      margin: 1rem 0;
      @media ${(props) => props.theme.breakpoints.lg} {
        margin: 2rem 0;
      }
      h2 {
        margin-bottom: 1rem;
      }
      @media ${(props) => props.theme.breakpoints.lg} {
        grid-area: 2 / 1 / span 1 / span 2;
      }
      .borders {
        display: flex;
        gap: 1.25rem;
        flex-wrap: wrap;

        .border {
          height: 3.625rem;
          padding: 1.25rem 1.875rem;
          background: var(--white);
          border-radius: 8px;
          box-shadow: 0px 0px 10px 0px rgba(0 0 0 / 10%);
        }
      }
    }
  }
`;
