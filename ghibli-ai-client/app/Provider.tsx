import React from 'react'
import Header from './_component/Header';
import Footer from "./_component/Footer";

const Provider = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}

export default Provider