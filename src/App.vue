<template>
  <h1>Classes And Inheritance</h1>
  <button @click="startTone">Press to start</button>
  <label>-Set the volume of the tracks:</label>
  <input v-model="volumeOfTracks" type="text"/>
  <label>Scale:</label>
  <select v-model="scale">
    <option>C4 major</option>
    <option>C4 minor</option>
    <option>D4 phrygian</option>
  </select>
  <div ref="p5Canvas"></div>
</template>

<script>


const sketch = function(p){

  p.setup = function() {
    let canvas = p.createCanvas(p.windowWidth/1.25, 400);
    let canvas_horizontal_offset = (p.windowWidth - p.width) / 2;
    canvas.position(canvas_horizontal_offset, p.y);
  };

  p.windowResized = function(){
    p.resizeCanvas(p.windowWidth/1.25, 400);
  }

  p.draw = function() {
    p.background('black');
    p.fill('white')
    p.textAlign(p.CENTER);
    p.text(p.vueComponent.track1.beat, p.width/2, p.height/2);
    p.text(p.vueComponent.track2.beat, p.width/2, p.height/2+50);
    p.text(p.vueComponent.track3.beat, p.width/2, p.height/2+100);

  };
}




class Track{

  constructor(parent_sfc, instrument, loopInterval, scale){
    this.parent_SFC = parent_sfc
    this.instrument = instrument;
    this.instrument.toDestination();
    this.loopInterval = loopInterval;
    this.notes = this.parent_SFC.$tonal.Scale.get(scale).notes;
    this.loop = new this.parent_SFC.$tone.Loop(this.loopCallback, this.loopInterval);
    this.loop.parent_track = this;
    this.instrument.volume.value = -9;
  }

  loopCallback(transportTime){
    let note_index = Math.floor(Math.random() * this.parent_track.notes.length)
    this.parent_track.instrument.triggerAttackRelease(this.parent_track.notes[note_index], this.parent_track.loopInterval, transportTime);
  }

  start(){
    this.loop.start();
  }

  /***
   * This is the setter for the volume member,
   * Actually there is no a direct volume member for this class,
   * but it turns useful to set the volume of the instrument.
   * @param volume
   */
  set volume(volume){
    console.log('setting track volume to ', volume)
   this.instrument.volume.value = volume
  }

  get beat(){
    return Math.floor (this.loop.progress * parseInt(this.loopInterval.slice(0,-1)));
  }

  set scale(newScale){
    this.notes = this.parent_SFC.$tonal.Scale.get(newScale).notes;
  }

}


export default {
  name: 'App',
  components: {

  },
  data(){
    return {
      volumeOfTracks: -9,
      scale: "C4 major"
    }
  },
  created(){
    this.track1 = new Track(this, new this.$tone.Synth, "4n", this.scale )
    this.track2 = new Track(this, new this.$tone.MembraneSynth, "6n", this.scale)
    this.track3 = new Track(this, new this.$tone.MetalSynth, "8n", this.scale)
  },
  mounted() {
    setTimeout(()=> {
      let mysketch = new this.$p5(sketch, this.$refs.p5Canvas);
      mysketch.vueComponent = this;
    });
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
  },
  watch:{
    volumeOfTracks(newVolume){
      this.track1.volume = newVolume;
      this.track2.volume = newVolume;
      this.track3.volume = newVolume;
    },
    scale(newScale){
      this.track1.scale = newScale;
      this.track2.scale = newScale;
      this.track3.scale = newScale;
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
