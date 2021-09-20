<template>
  <div>
    <router-view/>
  </div>
</template>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button, input {
  font: inherit;
}

body {
  overflow-y: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.5;
  background: #f9faf5;
  font-family:Baskerville, "Times New Roman", "Liberation Serif", STFangsong, FangSong, FangSong_GB2312, "CWTEX\-F", serif;
}
ol, ul {
  list-style: none;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.notes {
  padding: 12px 0;
}
a{
  text-decoration: none;
  color:inherit;
}
h1,h2,h3,h4,h5,h6{
  font-weight: revert;
}
</style>
