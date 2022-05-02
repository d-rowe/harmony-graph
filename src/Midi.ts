import {Midi as MidiData} from '@tonejs/midi';

import type {Note as ToneNote} from '@tonejs/midi/dist/Note';

export type Note = ToneNote;
export type Chord = Note[];

export default class Midi {
    private midiData: MidiData;

    static TICKS_PER_CHORD = 1920;

    constructor(midiData: MidiData) {
        this.midiData = midiData;
    }

    static async fromUrl(midiUrl: string): Promise<Midi> {
        const midiData = await MidiData.fromUrl(midiUrl);
        return new Midi(midiData);
    }

    getNotes() {
        // for now, we'll assume we're always using 1 track
        return this.midiData.tracks[0].notes;
    }

    getChords() {
        const notes = this.getNotes();
        return notes.reduce((chords, note) => {
            const chordIndex = Math.floor(note.ticks / Midi.TICKS_PER_CHORD);
            if (!chords[chordIndex]) {
                chords[chordIndex] = [];
            }
            chords[chordIndex].push(note);
            return chords;
        }, [] as Chord[]);
    }
}
