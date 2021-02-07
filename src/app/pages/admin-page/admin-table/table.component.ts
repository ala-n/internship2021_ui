import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Vendor } from '@shared/models/vendor';
import { VendorService } from '@shared/services/vendor.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Vendor>;
  dataSource = new MatTableDataSource();
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
    this.vendorService.getVendors().subscribe((vendors) => {
      this.isLoading = false;
      this.dataSource.data = vendors;
    });
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    this.dataSource.filterPredicate = (data: any, filter) => {
      return data.name.toLowerCase().indexOf(filter) != -1;
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
