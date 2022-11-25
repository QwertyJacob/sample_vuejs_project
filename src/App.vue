<!--From: https://vuejs.org/tutorial
Each .vue file is a Vue Single-File Component (SFC).
An SFC is a reusable self-contained block of code that encapsulates HTML,
 CSS and JavaScript that belong together, written inside a .vue file.-->
<template>
  <h1>{{ message}}</h1>
  <h2 v-bind:class="dynamicId">Welcome to the {{year.substring(year.length -5)}}'s course! </h2>
  <HelloWorld msg="This is a message sent from the parent component"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

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
      dynamicId : 'subtitle'
    };
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

.subtitle {
  color: red;
}

</style>
