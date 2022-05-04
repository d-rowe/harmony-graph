import Midi from './Midi';
import World from './renderer/World';

window.onload = init;

const MIDI_FILE_PATH = '/dist/midi/chords.mid';

async function init() {
    const midi = await Midi.fromUrl(MIDI_FILE_PATH);
    const chords = midi.getChords();
    const world = new World(chords);
}
