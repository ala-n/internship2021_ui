import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Vendor } from '@shared/models/vendor';
import { VendorService } from '@shared/services/vendor.service';
import { TableDataSource } from './table-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Vendor>;
  dataSource!: TableDataSource;
  vendors!: Vendor[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'name',
    'branchOffices',
    'offers',
    'webSite',
    'updated'
  ];

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.getVendors();
    this.dataSource = new TableDataSource(this.vendors);
  }

  getVendors(): void {
    this.vendorService
      .getVendors()
      .subscribe((vendors) => (this.vendors = vendors));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.vendors;
  }
}
