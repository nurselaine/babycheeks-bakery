import React from "react";
import Nav from "../component/Navigation/Nav";

const LandingLayout = ({children}) => {
  return (
    <section style={{ height: 'auto', width: '100%'}}>
      <Nav />
      {children}
    </section>
  )
}

export default LandingLayout;