import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const MaterialModules: any[] = [
    MatButtonModule,
    MatIconModule
]

@NgModule({
    imports: [MaterialModules],
    exports: [MaterialModules]
})

export class MaterialModule{}