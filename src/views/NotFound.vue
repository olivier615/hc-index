<template>
  <div class="d-flex flex-column align-items-center mt-5" style="width: 100%">
    <img src="http://xhcchat.com/resource/notFound1.png" alt="Not Found"
    style="width: 200px;">
    <h1 class="text-warning fw-bold fs-1 mt-3">頁面不存在</h1>
    <div class="d-grid gap-2 mt-4">
      <button class="btn btn-warning" type="button"
      @click.prevent="$router.back(-1)">回上一頁</button>
    </div>
  </div>
</template>
