import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _isShowModalSubject = new BehaviorSubject<boolean>(false);
  isShowModal$ = this._isShowModalSubject.asObservable();
  private _titleSubject = new BehaviorSubject<string>('');
  title$ = this._titleSubject.asObservable();

  // isShowModal: boolean = false;

  openCloseModal(isOpen: boolean) {
    this._isShowModalSubject.next(isOpen);
    // this.isShowModal = isOpen;
  }

  setTitle(title: string) {
    this._titleSubject.next(title);
  }
}
