import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { CategoryFormComponent } from "../category-form/category-form.component";
import { ModalService } from '../../../shared/components/modal/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ModalComponent, CategoryFormComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  showModal: boolean = false;
  categories: Category[] = [];
  category!: Category | null;
  // id!: number | null;
  constructor(private categoryService: CategoryService, private modalService: ModalService) {}
  destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.loadCategories();
    this.modalService.isShowModal$.subscribe((isOpen) => (this.showModal = isOpen));
  }
  private loadCategories() {
    const subscription = this.categoryService.getAllCategories().subscribe({
      next: categories => this.categories = categories.data,
      error: err => {
        // this.isLoading = false;
        // this.errorMessage = err.message;
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  updatedList(){
    // this.isLoading = true;
    this.loadCategories();
  }

  onAddCategory() {
    this.modalService.setTitle('Add Category');
    this.category = null;
    this.modalService.openCloseModal(true);
    // this.id = null;
  }

  // onEditCategory(id: number) {
  onEditCategory(category: Category) {
    this.modalService.setTitle('Edit Category');
    this.category = category;
    this.modalService.openCloseModal(true);
    // this.id = id;
  }

  onDeleteCategory(id: number) {
    Swal.fire({
      title: "Are you sure \nDelete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            Swal.fire({
              title: "Deleted!",
              text: "This category has been deleted.",
              icon: "success"
            });
            this.loadCategories();
          },
        });

        
      }
    });

    
  }
}
