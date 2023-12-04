import Nav from "@components/Nav";

import Provider from "@components/Provider";
import "@styles/globals.css";
import { Children } from "react";

export const metadata = {
  title: "promptopia",
  description: "Discover & share AI Prompts",
};

const Rootlayout = ({children}) => {
  return (
    <html lang="en">

      <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
            <Nav/>

            {children}

            </main>
            </Provider>
      </body>
    </html>
  );
};

export default Rootlayout;
