import {
    Group,
    Scene,
} from 'three';
import Note from './Note';

const SLIDE_SPEED = 0.05;

import type {Note as NoteData} from '../Midi';

export default class Chord {
    private scene: Scene;
    private group: Group;
    private notes: Note[] = [];
    private visible = false;

    constructor(scene: Scene, notesData: NoteData[]) {
        this.scene = scene;
        this.notes = notesData.map(noteData => new Note(noteData));
        this.group = new Group();
        this.notes.map(note => this.group.add(note.getMesh()));
        this.group.scale.setX(0);
    }

    isVisible(): boolean {
        return this.visible;
    }

    show() {
        if (this.visible) {
            return;
        }
        this.scene.add(this.group);
        this.visible = true;
    }

    hide() {
        if (!this.visible) {
            return;
        }
        this.scene.remove(this.group);
        this.visible = false;
    }

    slideLeft(speed = SLIDE_SPEED) {
        this.group.position.x -= speed;
    }

    widen() {
        this.group.scale.set(this.group.scale.x + SLIDE_SPEED, 1, 1);
        this.slideLeft(SLIDE_SPEED / 2);
    }

    setX(x: number) {
        this.group.position.x = x;
    }

    setWidth(width: number) {
        this.group.scale.set(width, 1, 1);
    }
}
