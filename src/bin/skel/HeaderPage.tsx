import React from 'react';
import { FC } from 'react';

interface HeaderPageProps {}

const HeaderPage: FC<HeaderPageProps> = () => {
  return (
    <></>
  );
};

export default HeaderPage;

export const getServerSideProps = () => {
  return {
    props: {
      
    }
  }
}