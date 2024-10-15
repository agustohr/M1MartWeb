import { Component } from '@angular/core';
import { ModalService } from './modal.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  title!: string;
  closeIcon = faX;
  constructor(private modalService: ModalService) { 
    this.modalService.title$.subscribe(title => this.title = title);
  }

  closeModal() {
    this.modalService.openCloseModal(false);
  }
}
