import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


// core.module.ts
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [HttpClientModule]  // ✅ Exporta para que otros módulos lo usen
})
export class CoreModule {}