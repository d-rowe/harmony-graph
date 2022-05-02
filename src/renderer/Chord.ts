import {Scene} from 'three';
import Note from './Note';

import type {Note as NoteData} from '../Midi';

export default class Chord {
    private scene: Scene;
    private notes: Note[] = [];

    constructor(scene: Scene, notesData: NoteData[]) {
        this.scene = scene;
        this.notes = notesData.map(noteData => new Note(noteData));
    }

    show() {
        this.notes.forEach(note => this.scene.add(note.getMesh()));
    }

    hide() {
        this.notes.forEach(note => this.scene.remove(note.getMesh()));
    }

    setX(x: number) {
        this.notes.forEach(note => note.setX(x));
    }

    setWidth(width: number) {
        this.notes.forEach(note => note.setWidth(width));
    }
}
