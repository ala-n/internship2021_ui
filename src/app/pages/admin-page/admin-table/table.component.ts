import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vendor } from '@shared/models/vendor';
import { VendorService } from '@shared/services/vendor.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource = new MatTableDataSource<Vendor>();
  isLoading = true;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'edit',
    'id',
    'name',
    'branchOffices',
    'offers',
    'webSite',
    'updated'
  ];

  constructor(private vendorService: VendorService) {
    this.vendorService
      .getVendors()
      .pipe(first()) //TODO how to check if unsubscribed?
      .subscribe((vendors) => {
        this.isLoading = false;
        this.dataSource.data = vendors;
      });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // custom filter: search results only from vendor name column
    this.dataSource.filterPredicate = (data: Vendor, filter) => {
      return data.name.toLowerCase().indexOf(filter) != -1;
    };
    // custom sort: string date transformes to Date format for correct sorting
    this.dataSource.sortingDataAccessor = (
      item: Vendor,
      property: string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): any => {
      //TODO question about types
      switch (property) {
        case 'updated': {
          const parts = item.updated.split('.');
          return new Date(+parts[2], +parts[1] - 1, +parts[0]);
        }
        default:
          return item['updated'];
      }
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //back to first page after search filtering
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
