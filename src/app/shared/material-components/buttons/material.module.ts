import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

const MaterialModules: any[] = [
    MatButtonModule
];

@NgModule({
    imports: [MaterialModules],
    exports: [MaterialModules]
})

export class MaterialModule{}
