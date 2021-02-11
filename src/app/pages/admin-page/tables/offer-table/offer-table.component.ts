import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Offer } from '@shared/models/offer';
import { OfferService } from '@shared/services/offer.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-offer-table',
  templateUrl: './offer-table.component.html',
  styleUrls: ['./offer-table.component.scss']
})
export class OfferTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Offer>();
  isLoading = true;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'edit',
    'id',
    'vendorName',
    'title',
    'discout',
    'validFrom',
    'validTo',
    'updated'
  ];

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.offerService
      .getOffers() //TODO how to check if unsubscribed? .tapone() find out
      .pipe(first())
      .subscribe((offers) => {
        this.isLoading = false;
        this.dataSource.data = offers as Offer[];
      });

    this.dataSource.filterPredicate = (data: Offer, filter) => {
      const filterObj = JSON.parse(filter);
      if (!filter) return true;
      if (filterObj.isActive && String(data.isActive) !== filterObj.isActive)
        return false;
      if (!filterObj.title) return true;
      return (
        data.title.toLowerCase().indexOf(filterObj.title.toLowerCase()) != -1
      );
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.dataSource.sortingDataAccessor = (
      item: any,
      property: string
    ): any => {
      switch (property) {
        case 'validTo':
          return new Date(item.dateEnd);
        case 'validFrom':
          return new Date(item.dateStart);
        case 'updated':
          return new Date(item.updated);
        default:
          return item[property];
      }
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
