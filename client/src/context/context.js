import userContext from "./userContext";
import projectContext from "./projectContext";
import mentorContext from "./mentorContext";
import mentorAccContext from "./mentorAccContext";

import { useEffect, useState } from "react";

function Context({ children }) {
  const [message, setMessage] = useState();

  return (
    <Message_data.Provider value={{ message, setMessage }}>
      {children}
    </Message_data.Provider>
  );
  9;
}
