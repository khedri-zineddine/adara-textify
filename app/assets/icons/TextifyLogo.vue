<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="width"
    :height="height"
    viewBox="0,0,256,256"
  >
    <defs>
      <radialGradient
        cx="11.301"
        cy="2.99"
        r="49.147"
        gradientUnits="userSpaceOnUse"
        id="color-1"
      >
        <stop offset="0" stop-color="#324ed2"></stop>
        <stop offset="0.261" stop-color="#3758f9"></stop>
        <stop offset="0.639" stop-color="#4c68ee"></stop>
        <stop offset="1" stop-color="#8192e6"></stop>
      </radialGradient>
    </defs>
    <g
      fill="none"
      fill-rule="nonzero"
      stroke="none"
      stroke-width="none"
      stroke-miterlimit="10"
      stroke-dasharray=""
      stroke-dashoffset="0"
      font-family="none"
      font-weight="none"
      font-size="none"
      text-anchor="none"
      style="mix-blend-mode: normal"
    >
      <g transform="scale(5.33333,5.33333)">
        <path
          d="M26.7,25.2l-3.7,-6.2c-0.6,-7.6 -4.9,-15 -16,-15v39.9h5c1.105,0 2,-0.895 2,-2v-2.5l2.6,0.5c2.9,0.6 5.6,-1.5 5.8,-4.4l0.6,-6.5l2.9,-1.2c1,-0.4 1.4,-1.6 0.8,-2.6z"
          fill="url(#color-1)"
          stroke="none"
          stroke-width="1"
          stroke-linecap="butt"
          stroke-linejoin="miter"
        ></path>
        <path
          d="M26,34h2l2,-5l3,10l3,-14l3,12l3,-6h2"
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
  defineProps({
    width: {
      type: String,
      default: '61',
    },
    height: {
      type: String,
    },
  })
</script>
