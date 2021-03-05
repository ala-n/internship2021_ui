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
      .getTagsValue()
      .subscribe((tags: Tag[]) => this.receiveData(tags));
  }

  receiveData(data: Tag[]): void {
    this.tags = data;
  }

  searchByTag(e: Event): void {
    const target = e.target as HTMLElement;
    const tag = (target.textContent || '').trim(); //receive tag
    this.filterService.filterByTags(tag); // filter by tags
  }

  toggle() {
    this.status = false;
    this.status = !this.status;
    console.log(this.status);
  }
}
