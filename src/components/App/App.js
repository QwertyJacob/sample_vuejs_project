import ToneBox from '../ToneBox/ToneBox.vue'
import SongViz from '../SongViz/SongViz.vue'

/*----------HELPER FUNCTION-------------*/
let modulo = function(n, m) {
    return ((n % m) + m) % m;
}


export default {
    name: 'App',
    components: {
        ToneBox: ToneBox,
        SongViz : SongViz
    },
    created(){
        this.$tone.Destination.volume.value = -9;
        this.globalScale = "C4 major";
        this.scaleNotes = this.$tonal.Scale.get(this.globalScale).notes;
        this.fft_ratio_power = 10;
        this.fastFourierTransform = new this.$tone.FFT(2**this.fft_ratio_power);
        this.$tone.Destination.connect(this.fastFourierTransform);
        this.chords = [];
        this.numOfChords = 4;
        this.poly = new this.$tone.PolySynth(this.$tone.AMSynth);
        this.poly.toDestination();
        this.setupChords();
        this.mainLoop = new this.$tone.Loop(this.main_loop_callback, this.mainLoopInterval);
    },
    data(){
        return {
            message: 'Hello ACTAM!',
            year: '2022/23',
            dynamicId : 'subtitle',
            toneReady : false,
            bpm : 120,
            mainLoopInterval: "1m",
            currentChordIdx : 0,
        };
    },
    methods:{
        updateToneReady(isToneActivated){
            this.toneReady = isToneActivated;
            console.log('Tone activated!')
        },
        scaleChanged(newScale){
            this.globalScale = newScale;
            this.scaleNotes = this.$tonal.Scale.get(this.globalScale).notes;
            this.setupChords();
        },
        setupChords() {
            let newchords = []
            console.log('Setting up chords with scale notes: ',  this.scaleNotes);
            for (let i = 0; i < this.numOfChords; i++) {
                let chord = [];

                chord[0] = this.getMidiNote(i, this.scaleNotes);
                chord[1] = this.getMidiNote(i + 2, this.scaleNotes);
                chord[2] = this.getMidiNote(i + 4, this.scaleNotes);
                chord[3] = this.getMidiNote(i + 6, this.scaleNotes);

                newchords.push(chord);
            }
            this.chords = newchords;
        },
        getMidiNote(noteNumber, notes) {
            let numNotes = notes.length;
            let i = modulo(noteNumber, numNotes);
            let note = notes[i];
            let octaveTranspose = Math.floor(noteNumber / numNotes);
            let interval = this.$tonal.Interval.fromSemitones(octaveTranspose * 12);
            return this.$tonal.Note.transpose(note, interval);
        },
        main_loop_callback(transportTime){

            let currChord = this.chords[this.currentChordIdx];
            this.currentChordIdx++;
            this.currentChordIdx = this.currentChordIdx % this.numOfChords;

            this.poly.triggerAttackRelease(currChord, this.mainLoopInterval, transportTime);
        }
    }
}