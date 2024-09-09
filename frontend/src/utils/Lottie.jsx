import React from 'react';
import Lottie from 'lottie-react';

const Example = ({ Link }) => {
  return (
    <>
      <Lottie animationData={Link} style={{ width: '100%', height: '100%' }} />
    </>
  );
}

export default Example;
