import Midi from './Midi';
import World from './renderer/World';
import Chord from './renderer/Chord';

window.onload = init;

const MIDI_FILE_PATH = '/dist/chords.mid';

async function init() {
    const midi = await Midi.fromUrl(MIDI_FILE_PATH);
    const chords = midi.getChords();
    const world = new World(chords[0]);
}
