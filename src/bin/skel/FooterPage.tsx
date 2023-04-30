import React from 'react';
import { FC } from 'react';

interface FooterPageProps {}

const FooterPage: FC<FooterPageProps> = () => {
  return (
    <></>
  );
};

export default FooterPage;

export const getServerSideProps = () => {
  return {
    props: {
      
    }
  }
}