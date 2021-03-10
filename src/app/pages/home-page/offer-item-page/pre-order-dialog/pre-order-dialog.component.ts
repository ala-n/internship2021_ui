import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Office } from '@shared/models/office';
import { Preorder } from '@shared/models/preorder';
import { User } from '@shared/models/user';

@Component({
  selector: 'app-pre-order-dialog',
  templateUrl: './pre-order-dialog.component.html',
  styleUrls: ['./pre-order-dialog.component.scss']
})
export class PreOrderDialogComponent {
  model: Preorder = {
    name: `${this.data.user.firstName} ${this.data.user.lastName}`,
    phone:
      this.data.user.phone === '' ? this.data.user.phone : '+7 950-64-34-190',
    comment: 'promocode'.toLowerCase() + ': ' + this.data.promocode,
    offerId: this.data.offerId
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      promocode: string;
      offices: Office[];
      user: User;
      offerId: string;
    }
  ) {}

  sendPreorder(): void {
    console.log('your pre-order has been sent to the brand mail', this.model);
  }
}
