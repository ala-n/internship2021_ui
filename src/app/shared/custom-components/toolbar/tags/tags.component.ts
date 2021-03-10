import { Component, OnInit } from '@angular/core';

import { Tag } from '@shared/models/tag';
import { FilterService } from '@shared/services/filter.service';
import { TagsService } from '@shared/services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags!: Tag[];
  status = false;

  constructor(
    private tagsService: TagsService,
    private filterService: FilterService
  ) {}

  get currentTag(): string {
    return this.filterService.filterCfg?.tag || '';
  }

  ngOnInit(): void {
    this.tagsService
      .getTopTags()
      .subscribe((tags: Tag[]) => this.receiveData(tags));
  }

  receiveData(data: Tag[]): void {
    this.tags = data;
  }

  searchByTag(e: Event): void {
    const target = e.target as HTMLElement;
    const tagName = (target.textContent || '').trim().toLowerCase(); //receive tag
    const tagId = this.tagsService.getTagId(tagName);
    this.filterService.filterByTags(tagId); // filter by tags
  }

  resetTagSearch(): void {
    this.filterService.clearFilter();
  }
}
