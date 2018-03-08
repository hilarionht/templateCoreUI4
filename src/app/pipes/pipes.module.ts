
import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';

import { KeysPipe } from './keys.pipe';

@NgModule({
  imports: [  ],
  declarations: [
    ImagenPipe,
    KeysPipe
  ],
  exports: [
    ImagenPipe,
    KeysPipe
  ]
})
export class PipesModule { }
