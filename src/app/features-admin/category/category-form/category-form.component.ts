import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { CategoryListComponent } from '../category-list/category-list.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  // @Input() id!: number | null;
  // @Input() categoryName!: string;
  @Input() category!: Category | null;
  form = new FormGroup({
    name: new FormControl<string | null>('', {validators: [Validators.required]})
  });

  constructor(private categoryService: CategoryService, private modalService: ModalService, private categoryListComponent: CategoryListComponent) { }

  ngOnInit(): void {
    if(this.category){
      this.form.patchValue({
        name: this.category.name
      })
    }

    // if(this.category?.id){
    //   this.categoryService.getAuthorById(this.id).subscribe({
    //     next: category => {
    //       this.form.patchValue({
    //         name: category.data.name
    //       })
    //     }
    //   })
    // }
  }

  onSubmit() {
    if(this.category){
      console.log("edit category" + this.category.id);

      this.categoryService.updateCategory(this.category.id, this.form.value as {name: string}).subscribe({
        next: category => {
          console.log(category);
          this.modalService.openCloseModal(false);

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Category with name ${this.category?.name} has been updated`,
            showConfirmButton: true,
            // timer: 1500
          }).then(() => {
            this.categoryListComponent.updatedList();
          })
        }
      })
      
    }else{
      console.log("add category");

      this.categoryService.createCategory(this.form.value as {name: string}).subscribe({
        next: category => {
          console.log(category);
          this.modalService.openCloseModal(false);

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Category with name ${this.form.value.name} has been created`,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.categoryListComponent.updatedList();
          })
        }
      })
      
    }
  }
}
