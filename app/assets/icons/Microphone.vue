<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="width"
    :height="height"
    viewBox="0,0,256,256"
  >
    <g
      fill="#000"
      fill-rule="nonzero"
      stroke="none"
      stroke-width="1"
      stroke-linecap="butt"
      stroke-linejoin="miter"
      stroke-miterlimit="10"
      stroke-dasharray=""
      stroke-dashoffset="0"
      font-family="none"
      font-weight="none"
      font-size="none"
      text-anchor="none"
      style="mix-blend-mode: normal"
    >
      <g transform="scale(8,8)">
        <path
          d="M13,4c-1.09375,0 -2,0.90625 -2,2v12c0,1.09375 0.90625,2 2,2h6c1.09375,0 2,-0.90625 2,-2v-12c0,-1.09375 -0.90625,-2 -2,-2zM13,6h6v12h-6zM7,14v4c0,3.30078 2.69922,6 6,6h2v2h-4v2h10v-2h-4v-2h2c3.30078,0 6,-2.69922 6,-6v-4h-2v4c0,2.21875 -1.78125,4 -4,4h-6c-2.21875,0 -4,-1.78125 -4,-4v-4z"
        ></path>
      </g>
    </g>
  </svg>
</template>
<script setup lang="ts">
  defineProps({
    width: {
      type: String,
    },
    height: {
      type: String,
    },
  })
</script>
