import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Office } from '@shared/models/office';
import { OfficeService } from '@shared/services/office.service';
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
  isLoading = true;

  displayedColumns = [
    'edit',
    'number',
    'country',
    'city',
    'street',
    'house',
    'phone',
    'email'
  ];

  constructor(
    private officeService: OfficeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const vendorId = +this.route.snapshot.params.id;
    if (vendorId) {
      this.officeService
        .getVendorOffices(vendorId)
        .pipe(first())
        .subscribe((offices: Office[]) => {
          if (offices) this.dataSource.data = offices as Office[];
          this.isLoading = false;
        });
    }

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
