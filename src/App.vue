<template>
  <h1>Classes And Inheritance</h1>
  <button @click="startTone">Press to start</button>
</template>

<script>



export default {
  name: 'App',
  components: {

  },
  created(){

    // we create an instrument:
    this.monoSynth = new this.$tone.Synth();
    this.monoSynth.toDestination();


    // how many notes per loop?
    this.notes_per_loop = 4;
    // we create a loop function:
    this.myLoop = new this.$tone.Loop(this.loopCallback, String(this.notes_per_loop)+"n");

    // let us get some notes
    this.scale = "C4 major";
    this.notes = this.$tonal.Scale.get(this.scale).notes;



  },
  methods:{
    startTone(){
      this.$tone.start().then( () => {
        this.$tone.Transport.start();
        console.log("Tone started!");
        this.myLoop.start();
      });
    },
    loopCallback(transportTime){
      let note_index = Math.floor(Math.random() * this.notes.length )
      console.log("note ", this.notes[note_index], 'at time', transportTime)

      this.monoSynth.triggerAttackRelease(this.notes[note_index], String(this.notes_per_loop)+"n");

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
