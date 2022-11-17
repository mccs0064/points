import React from 'react';

interface LoadingProps {
  isOpen: boolean;
}
const Loading: React.FC<LoadingProps> = ({ isOpen }) => {
  return (
    <>
      {
        isOpen &&
        <div className='w-100 vh-100 position-fixed bg-light zindex-3 opacity-75 top-0 start-0' style={{zIndex: 100}}>
          <div className='position-relative h-100'>
            <div className='position-absolute position-absolute top-50 start-50 spinner-border text-primary' role='status' data-testid='spinner'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default Loading;