import React from "react";
import Backdrop from "@mui/material/Backdrop";
import loader from "../../assets/loader.svg";
import Icon from "../icon/index.tsx";

// Define the props interface
interface LoaderProps {
  isFetching: boolean;
  width?: string | number;
  height?: string | number;
  position?: "absolute" | "fixed" | "relative" | "static" | "sticky";
  background?: string;
  zIndex?: number;
}

// Functional Component with TypeScript
const Loader: React.FC<LoaderProps> = ({
  isFetching,
  width,
  height,
  position,
  background,
  zIndex,
}) => {
  return (
    <Backdrop
      open={isFetching}
      sx={{
        zIndex: zIndex || 70000,
        position: position || "absolute",
        background: background || "transparent",
        width: width || "auto",
        height: height || "auto",
      }}
    >
      <Icon type="pointer" src={loader} alt="Loading..." />
    </Backdrop>
  );
};

export default Loader;
