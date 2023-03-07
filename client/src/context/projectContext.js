import { createContext } from "react";

const projectContext = createContext({
  project: [],
  setProject: () => {},
});

export default projectContext;
