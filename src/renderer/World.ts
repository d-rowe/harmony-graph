import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import debounce from 'lodash.debounce';
import Chord from './Chord';

import type {Note as NoteData} from '../Midi';

export default class World {
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private controls: OrbitControls;
    private chord: Chord;

    constructor(chordData: NoteData[]) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, this.getAspectRatio(), 0.1, 1000);
        this.camera.position.z = 50;
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.getWidth(), this.getHeight());
        this.scene.background = new THREE.Color( 0xe3e3e3 );

        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', debounce(this.onResize.bind(this), 50));

        this.renderer.setAnimationLoop(this.render.bind(this));

        this.chord = new Chord(this.scene, chordData);
        this.chord.show();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    render(time: number) {
        this.chord.setWidth(time / 500);
        this.chord.setX(time / -1000);
        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.camera.aspect = this.getAspectRatio();
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.getWidth(), this.getHeight());
    }

    getAspectRatio(): number {
        return this.getWidth() / this.getHeight();
    }

    getHeight(): number {
        return window.innerHeight;
    }

    getWidth(): number {
        return window.innerWidth;
    }
}