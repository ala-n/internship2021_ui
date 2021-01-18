import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [
        MatSliderModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        MatSliderModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ]
})

export class MaterialModule{}