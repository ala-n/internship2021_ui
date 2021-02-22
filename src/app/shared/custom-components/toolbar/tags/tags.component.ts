import { Component, OnInit } from '@angular/core';

import { Tags } from '@shared/models/tags';
import { TAGS } from '@shared/mocks/mock-tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit{
  tags = TAGS;

  constructor() { }

  ngOnInit() {
  }
}
