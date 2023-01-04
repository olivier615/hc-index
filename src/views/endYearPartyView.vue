<template>
  <h1 class="text-center text-light my-3">尾牙進行中</h1>
  <ul class="pb-2 mb-3">
    <router-link class="btn btn-success mx-2 my-1" to="/party/count">獎池遙控器</router-link>
    <router-link class="btn btn-success mx-2 my-1" to="/party/draw">得獎名單</router-link>
    <router-link class="btn btn-success mx-2 my-1" to="/party/bonus">加碼專區</router-link>
  </ul>
  <router-view/>
</template>
