import { createContext } from "react";

const mentorAccContext = createContext({
  mentor: [],
  setMentor: () => {},
});

export default mentorAccContext;
