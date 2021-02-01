import {Component} from '@angular/core';

export interface Tags {
  id: number;
  name: string;
}

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {

  tags: Tags[] = [
    {id: 1, name: 'Food'},
    {id: 2, name: 'Sport'},
    {id: 3, name: 'Clothes'},
    {id: 4, name: 'Entertaiment'},
    {id: 5, name: 'Beauty'},
    {id: 6, name: 'Home'},
    {id: 7, name: 'Electronics'},
    {id: 8, name: 'Hotels'},
    {id: 9, name: 'Markets'},
    {id: 10, name: 'Pharmacy'},
  ];

}
