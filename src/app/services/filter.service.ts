import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private router: Router) {}

  isFilterSelected(value: string, type: string): boolean {
    const currentParams = this.router.routerState.snapshot.root.queryParams;
    const currentFilter = currentParams['filter_' + type]
      ? decodeURIComponent(currentParams['filter_' + type]).split(',')
      : [];
    return currentFilter.includes(value);
  }

  onFilterSelect(value: string, type: string) {
    const currentParams = this.router.routerState.snapshot.root.queryParams;
    const currentFilter = currentParams['filter_' + type]
      ? decodeURIComponent(currentParams['filter_' + type]).split(',')
      : [];

    if (currentFilter.includes(value)) {
      // Remove the filter if it already exists
      const index = currentFilter.indexOf(value);
      currentFilter.splice(index, 1);
    } else {
      // Add the filter if it doesn't exist
      currentFilter.push(value);
    }

    if (currentFilter.length === 0) {
      // Remove the filter_type parameter from the URL
      this.router.navigate([], {
        queryParams: { ...currentParams, ['filter_' + type]: null },
        queryParamsHandling: 'merge', // Merge with existing query params
      });
    } else {
      // Update the filter_type parameter in the URL
      const updatedParams: { [key: string]: string | undefined } = {
        ...currentParams,
        ['filter_' + type]: encodeURIComponent(currentFilter.join(',')),
      };

      this.router.navigate([], {
        queryParams: updatedParams,
        queryParamsHandling: 'merge', // Merge with existing query params
      });
    }
  }
}
