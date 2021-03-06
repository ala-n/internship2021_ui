import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Office } from '@shared/models/office';
import { CityService } from '@shared/services/city.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent {
  @Input() office!: Office;
  @Input() vendorName!: string;
  @Input() address!: string;
  @Input() phoneNumber!: string;

  cityName!: string;

  constructor(private citiService: CityService) {}

  ngOnInit(): void {
    this.cityName = this.citiService.getCityName(this.office.address.cityId);
  }
}
