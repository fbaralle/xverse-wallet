'use client';

import React, { useEffect, useState } from 'react';

const NoSsr: React.FC<React.PropsWithChildren> = (props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return <>{mounted ? props.children : null}</>;
};

export default NoSsr;
