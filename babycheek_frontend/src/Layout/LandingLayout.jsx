import React from "react";
import Nav from "../component/Navigation/Nav";

const LandingLayout = ({children}) => {
  return (
    <section style={{ height: '100vh', width: '100%'}}>
      <Nav />
      {children}
    </section>
  )
}

export default LandingLayout;