import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Office } from '@shared/models/office';
import { Vendor } from '@shared/models/vendor';
import { VendorService } from '@shared/services/vendor.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-office-table',
  templateUrl: './office-table.component.html',
  styleUrls: ['./office-table.component.scss']
})
export class OfficeTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Office>();
  vendorId!: number;
  isLoading = true;

  displayedColumns = [
    'edit',
    'id',
    'country',
    'city',
    'street',
    'house',
    'phone',
    'email'
  ];

  constructor(
    private vendorService: VendorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.vendorId = Number(params['id']);
      if (this.vendorId) {
        this.vendorService
          .getVendorById(this.vendorId)
          .pipe(first())
          .subscribe((vendor: Vendor) => {
            if (vendor.offices)
              this.dataSource.data = vendor.offices as Office[];
          });
      }
    });

    this.dataSource.filterPredicate = (data: Office, filter) => {
      const filterObj = JSON.parse(filter);
      if (filterObj.isActive && String(data.isActive) !== filterObj.isActive)
        return false;
      return true;
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(value: string, title: string): void {
    // we create an object where keys are properties to filter and values are values from controls
    const currentFilter = JSON.parse(this.dataSource.filter || '{}');
    const newFilter = Object.assign({}, currentFilter, { [title]: value }); //UrlSearchParams
    this.dataSource.filter = JSON.stringify(newFilter);

    //back to first page after search filtering
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
