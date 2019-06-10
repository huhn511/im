<template>
  <div id="app">
    <Chat />
  </div>
</template>

<script>
import Chat from './components/Chat.vue'

export default {
  name: 'app',
  components: {
    Chat
  },
  methods: {
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Work+Sans:300,400,700&display=swap');

#app {
  background-color: black;
  background-image: radial-gradient(rgba(19, 155, 72, .42), black 120%
  );
  height: 100vh;
  text-shadow: 0 0 1px var(--dark);

}

body {
    color: var(--primary);
    font: 1.3rem Inconsolata, monospace;
    margin: 0px;
}

::selection {
  background: var(--primary);
  text-shadow: none;
}

h1 {
  font-size: 62px;
  line-height: 1.25;
  margin: 0;
}
h2 {
  font-size: 42px;
}
h3 {
  font-size: 30px;
}
h4 {
  margin-bottom: 10px;
  font-size: 24px;
}
p {
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
}

:root {
  --primary: rgb(19, 155, 72);
  --primary-2: #A2CF6F;
  --secondary: #0B5D9E;
  --secondary-2: #5AB0B2;
  --dark: #081C1D;
  --darker: #0F3535;
  --light: #E2E2E2;
  --white: #FFFFFF;
  --white_5: rgba(255,255,255,.05);
  --white_10: rgba(255,255,255,.1);
  --white_25: rgba(255,255,255,.25);
  --white_50: rgba(255,255,255,.5);
  --red: #F16465;
  --orange: #E69255;
  --yellow: #E6BE54;
  --purple: #8F60A8;
  --border-radius: 10px;
  --border-radius-sm: 5px;
  --box-shadow: 0 3px 6px rgba(0,0,0,.15);
  --transition-in-out: all 0.3s ease-in-out;
}
</style>
