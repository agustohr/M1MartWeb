import { Component } from '@angular/core';
import { CategoryListComponent } from "./category-list/category-list.component";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryListComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

}
