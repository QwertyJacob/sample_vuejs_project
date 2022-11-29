<template>
    <button class="myBtn" v-if="!toneReady" @click="startTone">Press to start Tone!</button>
    <div v-else>
      <span>
        <label>Insert the frequency of the oscillator:</label>
        <input type="text" v-model="innerFrequency"  placeholder="440"/>
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
          <li v-for="effect in connectedEffects" :key="effect.id">
            {{effect.text}}
            <button @click="removeEffect(effect.id)">X</button>
          </li>
        </ul>
      </span>
    </div>
</template>

<script src="./ToneBox.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./ToneBox.css"></style>
