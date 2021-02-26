import { Component, OnInit } from '@angular/core';

import { Tag } from '@shared/models/tag';
import { TagsService } from '@shared/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags!: Tag[];

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.tagsService
      .getTagsValue()
      .subscribe((tags: Tag[]) => this.receiveData(tags));
  }

  receiveData(data: Tag[]): void {
    this.tags = data;
  }
}
