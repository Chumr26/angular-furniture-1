import { Component, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: '[filter-by-material]',
  imports: [],
  templateUrl: './filter-by-material.component.html',
  styleUrl: './filter-by-material.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FilterByMaterialComponent {
  materials = [
    { label: 'Aluminium', count: 0 },
    { label: 'Fabric', count: 0 },
    { label: 'Glass', count: 0 },
    { label: 'Leather', count: 0 },
    { label: 'Marble', count: 0 },
    { label: 'Metal', count: 0 },
    { label: 'Plastic', count: 0 },
    { label: 'Wood', count: 0 },
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.materials.forEach((material) => {
      material.count = this.productService.getProductsByMaterial(
        material.label
      ).length;
    });
  }

  isMaterialSelected(materialLabel: string): boolean {
    const currentParams = this.route.snapshot.queryParams;
    const currentMaterials = currentParams['filter_material']
      ? decodeURIComponent(currentParams['filter_material']).split(',')
      : [];
    return currentMaterials.includes(materialLabel);
  }

  onMaterialSelect(materialLabel: string) {
    const currentParams = this.router.routerState.snapshot.root.queryParams;
    const currentMaterials = currentParams['filter_material']
      ? decodeURIComponent(currentParams['filter_material']).split(',')
      : [];

    if (this.isMaterialSelected(materialLabel)) {
      // Remove the material if it already exists
      const index = currentMaterials.indexOf(materialLabel);
      currentMaterials.splice(index, 1);
    } else {
      // Add the material if it doesn't exist
      currentMaterials.push(materialLabel);
    }

    let updatedParams: { [key: string]: string | undefined } = {
      ...currentParams,
      filter_material: encodeURIComponent(currentMaterials.join(',')),
    };

    if (currentMaterials.length === 0) {
      delete updatedParams['filter_material']; // Safely delete the property
    } else {
      updatedParams['filter_material'] = encodeURIComponent(
        currentMaterials.join(',')
      );
    }

    this.router.navigate([], {
      queryParams: updatedParams,
      queryParamsHandling: 'merge', // Merge with existing query params
    });
  }
}
