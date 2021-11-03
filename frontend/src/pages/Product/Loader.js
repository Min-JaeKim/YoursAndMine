import { memo } from "react";
import styled from "styled-components";

const LoaderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Loader = () => {
  return <LoaderWrap>로딩</LoaderWrap>;
};

export default memo(Loader);
