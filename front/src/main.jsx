import React from 'react';
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';




const container = document.getElementById('root');

const root = createRoot(container);
root.render(<App tab="home" />);