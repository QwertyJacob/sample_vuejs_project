<!--From: https://vuejs.org/tutorial
Each .vue file is a Vue Single-File Component (SFC).
An SFC is a reusable self-contained block of code that encapsulates HTML,
 CSS and JavaScript that belong together, written inside a .vue file.-->
<template>
  <h1>{{ message}}</h1>
  <h2 v-bind:class="dynamicId">Welcome to the {{year.substring(year.length -5)}}'s course! </h2>
  <ToneBox  :toneReady="toneReady" @ToneActivated="updateToneReady" />
  <P5Js v-if="toneReady" class="P5js"></P5Js>
</template>

<script src="./App.js"></script>

<style src="./App.css"></style>
