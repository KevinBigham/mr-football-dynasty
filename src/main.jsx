import React from 'react';
import { createRoot } from 'react-dom/client';

import LauncherShell from './app/launcher-shell.jsx';

createRoot(document.getElementById('root')).render(
  <LauncherShell basePath={import.meta.env.BASE_URL || '/'} />
);
