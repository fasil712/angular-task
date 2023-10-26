import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Note } from './note';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private fs: Firestore) {}

  //Add note to firebase databse
  addNote(note: Note) {
    note.id = doc(collection(this.fs, 'id')).id;
    return addDoc(collection(this.fs, 'Notes'), note);
  }

  //Get all notes from firebase database
  getNotes(): Observable<Note[]> {
    let notesRef = collection(this.fs, 'Notes');
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  }

  //Update note from firebase database
  updateNote(id: string, notes: any) {
    let docRef = doc(this.fs, `Notes/${id}`);
    return updateDoc(docRef, notes);
  }

  //Delete note from firebase database
  deleteNote(id: string) {
    let docRef = doc(this.fs, `Notes/${id}`);
    return deleteDoc(docRef);
  }
}
