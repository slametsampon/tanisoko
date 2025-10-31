// frontend/src/main.ts

import './components/layout/app-shell.js';
// frontend/src/main.ts
import { simulatorService } from './services/simulator.service';

(async () => {
  await simulatorService.init();
  simulatorService.start();
})();
