import * as React from "react";
import SearchDestination from "./components/searchDestination";
import App from "./App";
import { createRoot } from 'react-dom/client';



window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('root');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App/>);
});


export {};
