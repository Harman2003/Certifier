import React from 'react'
import { ColorRing } from 'react-loader-spinner';

const ImgLoader = ({color}:{color:string}) => {
  return (
    <div className='absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2'>
      <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={[color, color, color, color, color]}
      />
    </div>
  );
}

export default ImgLoader
