import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from 'src/app/app-services/notes.service';

@Component({
  selector: 'note',
  templateUrl: './note.html',
  styleUrls: ['./note.scss'],
})
export class NoteComponent {
  @Input()
  data: Note = { id: '' };
  @Input()
  classes: any = {
    expand: false,
  };
  @Output()
  close = new EventEmitter();
  @Output()
  edit = new EventEmitter();

  emitEvent(e: string) {
    switch (e) {
      case 'close':
        this.close.emit(this.data.id);
        break;
      case 'edit':
        this.edit.emit(this.data.id);
        break;
    }
  }
}
