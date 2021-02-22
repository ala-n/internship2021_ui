import { Component, OnInit } from '@angular/core';

import { Tag } from '@shared/models/tag';
import { TagsService } from '@shared/services/tag.service';
//import { TAGS } from '@shared/mocks/mock-tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags!: Tag[];

  constructor(private heroService: TagsService) {}

  ngOnInit() {
    this.getTagsValue();
  }

  getTagsValue(): void {
    this.tags = this.heroService.getTagsValue();
  }
}
