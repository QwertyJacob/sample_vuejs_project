<!--From: https://vuejs.org/tutorial
Each .vue file is a Vue Single-File Component (SFC).
An SFC is a reusable self-contained block of code that encapsulates HTML,
 CSS and JavaScript that belong together, written inside a .vue file.-->
<template>
  <h1>{{ message}}</h1>
  <h2 v-bind:class="dynamicId">Welcome to the {{year.substring(year.length -5)}}'s course! </h2>
  <HelloWorld msg="This is a message sent from the parent component"/>

  <div class="toneBox">
    <button class="myBtn" v-if="!toneReady" @click="startTone">Press to start Tone!</button>
    <div v-else>

      <span>
        <label>Insert the frequency of the oscillator:</label>
        <input type="text" v-model="frequency" @input="changeFrequency" placeholder="440"/>

      </span>

      <span>
        <label>Connect to a new effect:</label>
        <select v-model="newEffect" name="effectsSelect">
          <option v-for="effect in effectsCat" :key="effect.id" :value="effect">{{effect.text}}

          </option>
        </select>
        <button class="myBtn" @click="addNewEffect(newEffect)">Connect!</button>

      </span>

      <span>
        <label>Connected Effects:</label>
        <ul>
          <li v-for="effect in connectedEffects" :key="effect">
            {{effect}}
            <button @click="removeEffect(effect)">X</button>
          </li>
        </ul>
      </span>



    </div>
  </div>


</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import * as Tone from 'tone'

Tone.Destination.volume.value = -9;
let osc = new Tone.Oscillator();
osc.toDestination();
//
// let distortionEffect = new Tone.Distortion();
// let chorusEffect = new Tone.Chorus();
// let reverbEffect = new Tone.Reverb();

let distortionEffect = { id: "distortionEffect",
                          text: "Distortion"};

let chorusEffect = { id: "chorusEffect",
                    text: "Chorus"};

let reverbEffect = { id: "reverbEffect",
                    text: "Reverb"};

let effectsCatalogue = [distortionEffect, chorusEffect, reverbEffect];



/*This is called the options object*/
export default {
  /*The following (name, components, data, etc. are the options*/
  name: 'App',
  components: {
    HelloWorld
  },
  /*We can describe how the HTML should look
  like based on JavaScript state.
  That's exactly the main role of the "data" option.
  Notice it is a function that returns a js object:*/
  data(){
    return {
      message: 'Hello ACTAM!',
      year: '2022/23',
      dynamicId : 'subtitle',
      frequency : '',
      toneReady : false,
      connectedEffects : [],
      newEffect : '',
      effectsCat : effectsCatalogue
    };
  },
  /*This is the methods options, that contains the functions
  * of the SFC*/
  methods: {
    startTone() {
      Tone.start().then(()=>{
        console.log('Tone started!');
        this.toneReady = true;
        osc.start();
      });
    },
    changeFrequency(){
      // We don't need anymore this binding.
      // this.frequency = event.target.value;
      osc.frequency.value = this.frequency;
    },
    addNewEffect(newEffect){
      console.log('Trying to connect to the ', newEffect.text,'effect')
      this.connectedEffects.push(newEffect.text)
      this.resetEffects();
    },
    removeEffect(effectToRemove){
      this.connectedEffects = this.connectedEffects.filter((t) => t !== effectToRemove);
      this.resetEffects();
    },
    resetEffects(){
      osc.disconnect();

      let currentEffect;
      let source = osc;
      let dest;

      for(let connectedEffect of this.connectedEffects){
        switch(connectedEffect) {
          case "Distortion":
            currentEffect = new Tone.Distortion();
            break;
          case "Chorus":
            currentEffect = new Tone.Chorus();
            break;
          case "Reverb":
            currentEffect = new Tone.Reverb();
            break;
          default:
            console.log('Such an effect does not Exist!')
        }

        dest = currentEffect;
        source.connect(dest);
        source = dest;
      }
      source.toDestination();
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

span {
  display: block;
  padding: 15px;
}
.toneBox {
  display: block;
  padding: 10px;
  margin:10px 0;
}

label {
  padding: 10px;
  margin:10px 0;
}

input[type=text] {
  padding: 10px;
  margin:10px 0;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
}

li {
  list-style-type: none;
  /* usual styles */
  padding:10px;
}
.myBtn {
  appearance:none;
  -webkit-appearance:none;
  padding:10px;
  border:none;
  background-color:#3F51B5;
  color:#fff;
  font-weight:600;
  border-radius:5px;
  width:100%;
}

select {
  width: 100%;
  padding:10px;
  border-radius:10px;
}

.subtitle {
  color: red;
}



</style>
