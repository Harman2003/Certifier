/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="@emotion/react/types/css-prop" />
declare module "react-step-progress-bar" {
  import React from "react";
  import { MetaMaskInpageProvider } from "@metamask/providers";

  declare global {
    interface Window {
      ethereum: MetaMaskInpageProvider;
    }
  }
  
  interface ProgressBarProps {
    percent: number;
    stepPositions?: number[];
    unfilledBackground?: string;
    filledBackground?: string;
    width?: number;
    height?: number;
    hasStepZero?: boolean;
    text?: string;
    children?: React.ReactChild | React.ReactChild[];
  }
  interface StepProps {
    children: (props: {
      accomplished: boolean;
      transitionState: string;
      index: number;
      position: number;
    }) => React.ReactNode;
    transition?: "scale" | "rotate" | "skew";
    transitionDuration?: number;
  }
  class ProgressBar extends React.Component<ProgressBarProps, any> {}
  class Step extends React.Component<StepProps, any> {}
}
