import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Offer } from '@shared/models/offer';
import { OfferService } from '@shared/services/http/offer/offer.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-offer-stat-table',
  templateUrl: './offer-stat-table.component.html',
  styleUrls: ['./offer-stat-table.component.scss']
})
export class OfferStatTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource = new MatTableDataSource<Offer>();
  isLoading = true;

  displayedColumns = [
    'number',
    'vendorName',
    'title',
    'rate',
    'numberOfViews',
    'numberOfUses',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
  ];

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.offerService
      .getOffers()
      .pipe(take(1))
      .subscribe((offers: Offer[]) => {
        if (offers) this.dataSource.data = offers as Offer[];
        this.isLoading = false;
      });
    // custom filter: search results only from vendor name column
    this.dataSource.filterPredicate = (data: Offer, filter) => {
      const filterObj = JSON.parse(filter);
      if (!filter) return true;
      if (filterObj.isActive && String(data.isActive) !== filterObj.isActive)
        return false;
      if (!filterObj.vendorName) return true;
      return (
        data.vendorName
          .toLowerCase()
          .indexOf(filterObj.vendorName.toLowerCase()) != -1
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
        case 'rate':
        case 'numberOfViews':
        case 'numberOfUses': {
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
