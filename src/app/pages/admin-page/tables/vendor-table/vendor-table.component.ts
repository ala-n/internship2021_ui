import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vendor } from '@shared/models/vendor';
import { VendorService } from '@shared/services/vendor.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './vendor-table.component.html',
  styleUrls: ['./vendor-table.component.scss']
})
export class VendorTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource = new MatTableDataSource<Vendor>();
  isLoading = true;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'edit',
    'number',
    'name',
    'branchOffices',
    'offers',
    'webSite',
    'updated'
  ];

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.vendorService
      .getVendors()
      .pipe(take(1))
      .subscribe((vendors: Vendor[]) => {
        if (vendors) this.dataSource.data = vendors as Vendor[];
        this.isLoading = false;
      });
    // custom filter: search results only from vendor name column
    this.dataSource.filterPredicate = (data: Vendor, filter) => {
      const filterObj = JSON.parse(filter);
      if (!filter) return true;
      if (filterObj.isActive && String(data.isActive) !== filterObj.isActive)
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
      //TODO question about types
      switch (property) {
        case 'updated': {
          return new Date(item.updated);
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
