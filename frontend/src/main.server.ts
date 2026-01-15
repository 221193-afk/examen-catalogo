import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app';  // ← CAMBIA AQUI: ./app/app (porque es app.ts)

import { appConfig } from './app/app.config.server';  // o './app/app.config' si usas el del cliente

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, appConfig, context);

export default bootstrap;