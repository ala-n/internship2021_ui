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

  constructor(
    private tagsService: TagsService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.tagsService
      .getTagsValue()
      .subscribe((tags: Tag[]) => this.receiveData(tags));
  }

  receiveData(data: Tag[]): void {
    this.tags = data;
  }

  onClick(e: Event): void {
    const target = e.target as HTMLElement;
    const tag = (target.textContent || '').trim();
    if (tag === this.filterService.filterCfg.tag) {
      this.filterService.filter({ tag: '' });
    } else {
      this.filterService.filter({ tag });
    }
  }
}
