import { Component } from '@angular/core';
import { NavigationService } from '@shared/services/navigation.service';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(public navigationService: NavigationService, private authService: AuthService) {}
  model: any = {};

  dataFromServer: any = [];

  ngOnInit() {
    this.getSomePrivateStuff();
  }

  getSomePrivateStuff() {
    this.model.action = 'stuff';
    this.authService.getData(this.model).subscribe(response => {
       if (response.Token != null) {
        this.dataFromServer = response['isActive']; // Question
       }
    }, error => { // change!!
      this.authService.logout();
    });
  }

  logout(){
    this.authService.logout();
  }
}
