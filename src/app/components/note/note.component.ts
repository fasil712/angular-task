import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Note } from 'src/app/note';
import { NoteService } from 'src/app/note.service';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  noteForm!: FormGroup;
  editForm!: FormGroup;
  noteData: any = [];
  noteDetails: any;
  noteObject: Note = {
    id: '',
    title: '',
    description: '',
  };
  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private spinnerService: NgxSpinnerService
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      edit_title: ['', Validators.required],
      edit_description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getAllNotes();
  }

  addNote() {
    const { value } = this.noteForm;
    this.noteObject = {
      id: value.id,
      title: value.title,
      description: value.description,
    };
    this.noteService.addNote(this.noteObject).then((note) => {
      if (note) {
        alert('Note added successfully');
        this.noteForm.reset();
      }
    });
  }
  getAllNotes() {
    this.spinnerService.show();
    this.noteService.getNotes().subscribe((res: Note[]) => {
      this.noteData = res;
      this.spinnerService.hide();
    });
  }

  getAllDetails(note: Note) {
    this.noteDetails = note;
  }
  updateNote(id: string) {
    const { value } = this.editForm;
    this.noteObject = {
      id: id,
      title: value.edit_title,
      description: value.edit_description,
    };
    this.noteService.updateNote(id, this.noteObject).then(() => {
      alert('Note Updated Sucessfully');
      this.editForm.reset();
    });
  }

  deleteNote(note: Note) {
    const dicision = confirm(
      `Are you sure you want to delete \'${note.title}\'?`
    );
    if (dicision) {
      this.noteService.deleteNote(note.id);
    }
  }
}
