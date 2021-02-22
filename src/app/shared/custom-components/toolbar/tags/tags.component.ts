import { Component, OnInit } from '@angular/core';

import { Tags } from '@shared/models/tags';
import { TagsService } from '@shared/services/tag.service';
//import { TAGS } from '@shared/mocks/mock-tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags!: Tags[];

  constructor(private heroService: TagsService) {}

  ngOnInit() {
    this.getTagsValue();
  }

  getTagsValue(): void {
    this.tags = this.heroService.getTagsValue();
  }
}
