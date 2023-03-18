import { createContext } from "react";

const mentorContext = createContext({
  mentors: [],
  setMentors: () => {},
});

export default mentorContext;
