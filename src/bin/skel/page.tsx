import React from 'react';
import { FC } from 'react';

interface PropsType {}

const Page: FC<PropsType> = () => {
  return (
    <></>
  );
};

export default Page;

export const getServerSideProps = () => {
  return {
    props: {
      
    }
  }
}