import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class NotesService {
  private uid!: string;
  private _notes: Note[] = [
    {
      id: 'jdsfad',
      subject: 'Subject',
      body: 'Type the content of your note here, then push commit to save your Note.',
    },
  ];
  private liveNotes = new BehaviorSubject(this._notes);

  public notes = this.liveNotes.asObservable();

  get newId() {
    const uid = uuid();
    this.uid = uid;
    return uid;
  }

  init() {
    const data = localStorage.getItem('notes');
    if (data !== undefined && data !== null) {
        this._notes = JSON.parse(data);
        this.liveNotes.next(this._notes)
        console.log(this._notes);
    }
  }

  getNote(id: string) {
    let result!: Note;
    this._notes.every((note: Note) => {
      if (note.id === id) {
        result = note;
        return false;
      }
      return true;
    });
    return result;
  }
  createNote(note: Note) {
    console.log(note);
    if (note.id === this.uid && this.uid !== '') {
      this._notes.push(note);
      this.uid = '';
      localStorage.setItem('notes', JSON.stringify(this._notes));
      return { valid: true, status: 'Success!' };
    } else {
      return { valid: false, status: 'Improper Id used' };
    }
  }
  updateNote(val: Note) {
    let result = { valid: false, status: 'Error: Check note id' };
    this._notes.every((note: Note, index) => {
      if (val.id === note.id) {
        this._notes[index] = val;
        localStorage.setItem('notes', JSON.stringify(this._notes));
        result = { valid: true, status: 'Success!' };
        return false;
      }
      return true;
    });

    return result;
  }
  deleteNote(id: string) {
    this._notes.every((note: Note, index) => {
      if (note.id === note.id) {
        this._notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(this._notes));
        return false;
      }
      return true;
    });
  }
}

export interface Note {
  id: string;
  pos?: {
    x: number;
    y: number;
  };
  subject?: string | null;
  body?: string | null;
}
