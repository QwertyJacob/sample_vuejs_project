<template>
  <h1>Classes And Inheritance</h1>
  <button @click="startTone">Press to start</button>
</template>

<script>


class Track{

  constructor(parent_sfc, instrument, loopInterval, scale){
    this.parent_SFC = parent_sfc
    this.instrument = instrument;
    this.instrument.toDestination();
    this.loopInterval = loopInterval;
    this.scale = scale;
    this.notes = this.parent_SFC.$tonal.Scale.get(this.scale).notes;
    this.loop = new this.parent_SFC.$tone.Loop(this.loopCallback, this.loopInterval);
    this.loop.parent_track = this;
    console.log('Creaeted track object with notes: ', this.notes)
  }

  loopCallback(transportTime){
    let note_index = Math.floor(Math.random() * this.parent_track.notes.length)
    console.log("note ", this.parent_track.notes[note_index], 'at time', transportTime)
    this.parent_track.instrument.triggerAttackRelease(this.parent_track.notes[note_index], this.parent_track.loopInterval);
  }

  start(){
    this.loop.start();
  }
}


export default {
  name: 'App',
  components: {

  },
  created(){
    this.track1 = new Track(this, new this.$tone.Synth, "4n", "C4 major" )
    this.track2 = new Track(this, new this.$tone.MembraneSynth, "8n", "C1 major")
    this.track3 = new Track(this, new this.$tone.MetalSynth, "16n", "C7 major")

  },
  methods:{
    startTone(){
      this.$tone.start().then( () => {
        this.$tone.Transport.start();
        console.log("Tone started!");
        this.track1.start();
        this.track2.start();
        this.track3.start();
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
