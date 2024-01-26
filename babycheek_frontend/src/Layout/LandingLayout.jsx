import React from "react";
import Nav from "../component/Navigation/Nav";

const LandingLayout = ({children}) => {
  return (
    <section>
      <Nav />
      <div>
        {children}
      </div>
    </section>
  )
}

export default LandingLayout;