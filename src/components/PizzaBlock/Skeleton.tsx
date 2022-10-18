import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props: any) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#ecebeb"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="132" r="125" />
    <rect x="1" y="277" rx="10" ry="10" width="280" height="23" />
    <rect x="1" y="326" rx="10" ry="10" width="280" height="88" />
    <rect x="1" y="432" rx="10" ry="10" width="95" height="30" />
    <rect x="129" y="425" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
