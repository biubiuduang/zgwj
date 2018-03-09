<template>
  <div id="app" >
    <keep-alive>
    <router-view class="main-box"></router-view>
    </keep-alive>
    <div class="popup-loading">
      <mt-spinner class="loading-box" type="fading-circle" color="#26a2ff" :size="60"></mt-spinner>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0 auto;
  width: 100%;
  height:100%;
}
.popup-loading{
  display: none;
  position: fixed;
  left:0;
  top:0;
  width: 100%;
  height:100%;
  background-color: rgba(0,0,0,0.4);
  z-index:11;
}
.loading-box{
  display: block;
  width: 60px;
  height:60px;
  position: absolute;
  left:50%;
  top:50%;
  margin-left:-30px;
  margin-top:-30px;
}
</style>
