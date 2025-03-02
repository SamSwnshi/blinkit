import React from 'react';
import logo from "../assets/logo.png"

const Header = () => {
  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
      <div className='container mx-auto flex items-center px-2 justify-between'>
        <div className='h-full'>
          <div className='h-full flex  justify-center'>
            <img src={logo} width={170} height={60} alt="logo"  className='hidden lg:block' />
            <img src={logo} width={170} height={60} alt="logo" className='lg:hidden'/>
          </div>
        </div>
        <div className='hidden lg:block'>
          searcj
        </div>
        <div>
          login
        </div>
      </div>
    </header>
  )
}

export default Header
