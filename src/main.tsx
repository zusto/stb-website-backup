
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css' 

createRoot(document.getElementById("root")!).render(
  <div className="overflow-x-hidden">
    <App />
  </div>
);
