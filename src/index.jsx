import React from 'react';
import App from './App';
import'./styles/index.css';
import { createRoot } from 'react-dom/client';
import contextWrapper from './helpers/contextWrapper';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(contextWrapper(<App />));
