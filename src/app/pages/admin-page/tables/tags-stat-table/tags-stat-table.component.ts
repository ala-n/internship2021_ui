import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tag } from '@shared/models/tag';
import { AlertService } from '@shared/services/message/alert.service';
import { TagsService } from '@shared/services/http/tag/tags.service';
import { take } from 'rxjs/operators';
import { TagDialogComponent } from '../../dialogs/tag-dialog/tag-dialog.component';

@Component({
  selector: 'app-tags-stat-table',
  templateUrl: './tags-stat-table.component.html',
  styleUrls: ['./tags-stat-table.component.scss']
})
export class TagsStatTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource = new MatTableDataSource<Tag>();
  isLoading = true;
  tag!: string;
  tags!: string[];

  displayedColumns = [
    'delete',
    'number',
    'name',
    'usesByUser',
    'usesByVendor',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
  ];

  constructor(
    private tagsService: TagsService,
    public dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.tagsService
      .getTagsForAdmin()
      .pipe(take(1))
      .subscribe((tags: Tag[]) => {
        if (tags) {
          this.dataSource.data = tags as Tag[];
          this.tags = this.dataSource.data.map((tag) => tag.name);
        }
        this.isLoading = false;
      });
    // custom filter: search results only from vendor name column
    this.dataSource.filterPredicate = (data: Tag, filter) => {
      const filterObj = JSON.parse(filter);
      if (!filter) return true;
      if (filterObj.isDeleted && String(data.isDeleted) === filterObj.isDeleted)
        return false;
      if (!filterObj.name) return true;
      return (
        data.name.toLowerCase().indexOf(filterObj.name.toLowerCase()) != -1
      );
    };
    // custom sort: string date transformes to Date format for correct sorting
    this.dataSource.sortingDataAccessor = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      item: any,
      property: string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): any => {
      switch (property) {
        case 'updatedAt':
        case 'createdAt': {
          return new Date(item[property]);
        }
        case 'usesByUser':
        case 'usesByVendor': {
          return +item[property];
        }
        default:
          return item[property];
      }
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deactivate(id: string): void {
    this.tagsService.deleteTag(id).pipe(take(1)).subscribe();
  }

  activate(id: string): void {
    this.tagsService.restoreTag(id).pipe(take(1)).subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TagDialogComponent, {
      width: '250px',
      data: { name: this.tag }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      result = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
      if (this.tags.includes(result)) {
        this.alertService.showSnackbar('tag_exist');
        return;
      }
      this.tagsService.addTag({ name: result }).pipe(take(1)).subscribe();
    });
  }

  applyFilter(value: string, name: string): void {
    // we create an object where keys are properties to filter and values are values from controls
    const currentFilter = JSON.parse(this.dataSource.filter || '{}');
    const newFilter = Object.assign({}, currentFilter, { [name]: value }); //UrlSearchParams
    this.dataSource.filter = JSON.stringify(newFilter);

    //back to first page after search filtering
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
