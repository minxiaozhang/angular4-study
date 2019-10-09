import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
console.log("当前服务环境端口是:",environment.server)

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
