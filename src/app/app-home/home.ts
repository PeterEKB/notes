import { Component, NgModule } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Note, NotesService } from '../app-services/notes.service';
import { UIService } from '../app-services/ui.service';

@Component({
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent {
  classes: any = {
    input: {
      show: false,
    },
  };
  notes: Note[] = [];

  newNote: Note = {
    id: '',
    subject: '',
    body: '',
  };
  update = false;

  stopSub$ = new Subject();

  constructor(private ui: UIService, private _note: NotesService) {
    this._note.init();
  }

  ngOnInit() {
    this._note.notes.pipe(takeUntil(this.stopSub$)).subscribe((val) => {
      this.notes = val;
      console.log(val);
    });
    this.ui.add.pipe(takeUntil(this.stopSub$)).subscribe((e) => {
      if (e.type === 'click') {
        this.openNote();
      }
    });
  }
  ngOnDestroy() {
    this.$stopSub;
  }
  $stopSub = () => {
    this.stopSub$.next(null);
    this.stopSub$.complete();
  };

  openNote() {
    let id = this._note.newId;
    this.classes.input.show = true;

    this.newNote.id = id;
  }
  commitNote() {
    if (!this.update) this._note.createNote({ ...this.newNote });
    else this._note.updateNote({ ...this.newNote });

    this.update = false;
    this.classes.input.show = false;
    this.reset();
  }
  deleteNote(id: string) {
    this._note.deleteNote(id);
    this.classes.input.show = false;
    this.reset();
  }
  editNote(id: string) {
    const data = this._note.getNote(id);
    this.newNote.id = data.id;
    this.newNote.subject = data.subject;
    this.newNote.body = data.body;
    this.classes.input.show = true;

    this.update = true;
  }
  reset() {
    this.newNote.id = '';
    this.newNote.subject = '';
    this.newNote.body = '';
  }
}
