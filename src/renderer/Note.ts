import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
} from 'three';

import type {Note as NoteData} from '../Midi';

export default class Note {
    private mesh: Mesh;

    constructor(noteData: NoteData) {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: 0x1c73ff});
        this.mesh = new Mesh(geometry, material);
        this.setMidi(noteData.midi);
    }

    getMesh(): Mesh {
        return this.mesh;
    }

    setMidi(midi: number) {
        // center on midi note 52
        this.mesh.translateY(midi - 52);
    }
}