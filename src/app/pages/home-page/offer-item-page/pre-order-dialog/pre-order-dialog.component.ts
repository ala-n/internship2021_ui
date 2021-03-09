import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pre-order-dialog',
  templateUrl: './pre-order-dialog.component.html',
  styleUrls: ['./pre-order-dialog.component.scss']
})
export class PreOrderDialogComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }
}
