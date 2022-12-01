<template>
    <button class="myBtn" v-if="!toneReady" @click="startTone">Press to start Tone!</button>
    <div v-else>
<!--      <span>-->
<!--        <label>Insert a value:</label>-->
<!--        <input type="text"  placeholder="440"/>-->
<!--      </span>-->
      <span>
        <label>Chose the scale:</label>
        <select v-model="innerScale">
          <option value="C4 phrygian">C4 phrygian</option>
          <option value="G4 major">G4 major</option>
          <option value="A4 minor">A4 minor</option>
        </select>
      </span>

<!--      <span>-->
<!--        <label>Connect to a new effect:</label>-->
<!--        <select v-model="newEffect" name="effectsSelect">-->
<!--          <option v-for="effect in effectsCat" :key="effect.id" :value="effect">{{effect.text}}-->

<!--          </option>-->
<!--        </select>-->
<!--        <button class="myBtn" @click="addNewEffect(newEffect)">Connect!</button>-->

<!--      </span>-->
<!--      <span>-->
<!--        <label>Connected Effects:</label>-->
<!--        <ul>-->
<!--          <li v-for="effect in connectedEffects" :key="effect.id">-->
<!--            {{effect.text}}-->
<!--            <button @click="removeEffect(effect.id)">X</button>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </span>-->
<!--      -->

    </div>
</template>

<script src="./ToneBox.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./ToneBox.css"></style>
