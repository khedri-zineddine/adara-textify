<template>
  <div
    class="antialiased bg-white dark:bg-black text-black dark:text-white min-h-screen place-content-center flex flex-col items-center justify-center text-sm sm:text-base"
    data-new-gr-c-s-check-loaded="14.1209.0"
    data-gr-ext-installed=""
  >
    <div class="flex-1 flex flex-col gap-y-16 py-14">
      <div class="flex flex-col gap-y-4 items-center justify-center">
        <TextifyLogo class="logo-dark" width="80" />
        <h1
          class="text-black dark:text-white text-4xl sm:text-5xl font-semibold text-center"
        >
          Adara Textify
        </h1>
      </div>
      <div class="max-w-[960px] px-4">
        <SpeechRecorder />
        <br />
        <TextDisplay />
      </div>
    </div>
    <footer
      class="relative border-t bg-white dark:bg-black border-gray-200 dark:border-gray-900 w-full h-[70px] flex items-center"
    >
      <div class="absolute inset-x-0 flex items-center justify-center -top-3">
        <TextifyLogo class="logo-dark" width="25" />
      </div>
      <div class="mx-auto sm:px-6 lg:px-8 px-4 w-full">
        <div
          class="flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
        >
          <div class="flex flex-col-reverse items-center gap-3 sm:flex-row">
            <span class="text-sm text-gray-700 dark:text-gray-300">
              2024 Adara Textify - MIT License</span
            >
          </div>
        </div>
      </div>
    </footer>
    <div id="drawing-layer"></div>
    <div id="drawing-cover"></div>
  </div>
</template>
<script lang="ts" setup>
  import TextifyLogo from '@/assets/icons/TextifyLogo.vue'
  import SpeechRecorder from '@/components/SpeechRecorder.vue'
  import TextDisplay from '@/components/TextDisplay.vue'
</script>
<style>
  @property --gradient-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 180deg;
  }
  @keyframes gradient-rotate {
    0% {
      --gradient-angle: 0deg;
    }
    to {
      --gradient-angle: 360deg;
    }
  }

  @media (prefers-color-scheme: light) {
    .get-started-gradient-border {
      background: linear-gradient(90deg, #fff, #fff),
        linear-gradient(90deg, #00dc82, #1de0b1, #36e4da);
    }
    .gradient-border-modules {
      background: linear-gradient(
        var(--gradient-angle),
        #f7d14c,
        rgba(247, 209, 76, 0.6),
        hsla(0, 0%, 100%, 0.8),
        #f7d14c
      );
    }
    .gradient-border-examples {
      background: linear-gradient(
        var(--gradient-angle),
        #8deaff,
        rgba(141, 234, 255, 0.6),
        hsla(0, 0%, 100%, 0.8),
        #8deaff
      );
    }
    .gradient-border-documentation {
      background: linear-gradient(
        var(--gradient-angle),
        #00dc82,
        rgba(0, 220, 130, 0.6),
        hsla(0, 0%, 100%, 0.8),
        #00dc82
      );
    }
  }
  @media (prefers-color-scheme: dark) {
    .get-started-gradient-border {
      background: linear-gradient(90deg, #18181b, #18181b),
        linear-gradient(90deg, #00dc82, #1de0b1, #36e4da);
    }
    .gradient-border-modules {
      background: linear-gradient(
        var(--gradient-angle),
        #f7d14c,
        #a38108,
        hsla(0, 0%, 100%, 0.3),
        #a38108
      );
    }
    .gradient-border-examples {
      background: linear-gradient(
        var(--gradient-angle),
        #8deaff,
        #008aa9,
        hsla(0, 0%, 100%, 0.3),
        #008aa9
      );
    }
    .gradient-border-documentation {
      background: linear-gradient(
        var(--gradient-angle),
        #00dc82,
        #003f25,
        hsla(0, 0%, 100%, 0.2),
        #003f25
      );
    }
  }
  .get-started-gradient-border {
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    border-color: transparent;
    border-radius: 12px;
    border-width: 1px;
  }
  .get-started-gradient-border:hover
    > :is(.get-started-gradient-left, .get-started-gradient-right) {
    opacity: 0.2;
  }
  .get-started-gradient-left,
  .get-started-gradient-right {
    opacity: 0;
  }
  .gradient-border {
    border-radius: 12px;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transform: translate(-1px, -1px);
    width: calc(100% + 2px);
    z-index: -1;
  }
  .gradient-border-rect {
    height: calc(100% + 2px);
  }
  @media (min-width: 1024px) {
    .gradient-border-rect {
      height: calc(100% + 1px);
    }
  }
  .gradient-border-square {
    height: calc(100% + 2px);
  }
  .modules-gradient-right {
    opacity: 0;
  }
  .documentation-container:hover > .gradient-border,
  .examples-container:hover > .gradient-border,
  .modules-container:hover > .gradient-border {
    animation: gradient-rotate 5s linear 0s infinite reverse;
    opacity: 1;
    transition: all 0.3s linear;
  }
  .examples-container:hover > .examples-gradient-right,
  .modules-container:hover > .modules-gradient-right {
    opacity: 0.2;
  }
  .examples-gradient-right {
    opacity: 0;
  }
  .documentation-image-color-dark,
  .documentation-image-color-light,
  .examples-image-color-dark,
  .examples-image-color-light,
  .modules-image-color-dark,
  .modules-image-color-light {
    display: none;
  }
  @media (prefers-color-scheme: light) {
    .modules-image-light {
      display: block;
    }
    .modules-container:hover > a > .modules-image-light,
    .modules-image-dark {
      display: none;
    }
    .examples-image-light,
    .modules-container:hover > a > .modules-image-color-light {
      display: block;
    }
    .examples-container:hover > a > .examples-image-light,
    .examples-image-dark {
      display: none;
    }
    .documentation-image-light,
    .examples-container:hover > a > .examples-image-color-light {
      display: block;
    }
    .documentation-container:hover > a > div > .documentation-image-light,
    .documentation-image-dark {
      display: none;
    }
    .documentation-container:hover
      > a
      > div
      > .documentation-image-color-light {
      display: block;
    }
  }
  @media (prefers-color-scheme: dark) {
    .modules-image-dark {
      display: block;
    }
    .modules-image-light {
      display: none;
    }
    .modules-container:hover > a > .modules-image-color-dark {
      display: block;
    }
    .modules-container:hover > a > .modules-image-dark {
      display: none;
    }
    .examples-image-dark {
      display: block;
    }
    .examples-image-light {
      display: none;
    }
    .examples-container:hover > a > .examples-image-color-dark {
      display: block;
    }
    .examples-container:hover > a > .examples-image-dark {
      display: none;
    }
    .documentation-image-dark {
      display: block;
    }
    .documentation-image-light {
      display: none;
    }
    .documentation-container:hover > a > div > .documentation-image-color-dark {
      display: block;
    }
    .documentation-container:hover > a > div > .documentation-image-dark {
      display: none;
    }
  }
  .sr-only {
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    width: 1px;
    clip: rect(0, 0, 0, 0);
    border-width: 0;
    white-space: nowrap;
  }

  .from-blue-400 {
    --un-gradient-from-position: 0%;
    --un-gradient-from: rgb(96 165 250 / var(--un-from-opacity, 1))
      var(--un-gradient-from-position);
    --un-gradient-to-position: 100%;
    --un-gradient-to: rgba(96, 165, 250, 0) var(--un-gradient-to-position);
    --un-gradient-stops: var(--un-gradient-from), var(--un-gradient-to);
  }
  .from-green-400 {
    --un-gradient-from-position: 0%;
    --un-gradient-from: rgb(55 233 144 / var(--un-from-opacity, 1))
      var(--un-gradient-from-position);
    --un-gradient-to-position: 100%;
    --un-gradient-to: rgba(55, 233, 144, 0) var(--un-gradient-to-position);
    --un-gradient-stops: var(--un-gradient-from), var(--un-gradient-to);
  }
  .from-yellow-400 {
    --un-gradient-from-position: 0%;
    --un-gradient-from: rgb(250 204 21 / var(--un-from-opacity, 1))
      var(--un-gradient-from-position);
    --un-gradient-to-position: 100%;
    --un-gradient-to: rgba(250, 204, 21, 0) var(--un-gradient-to-position);
    --un-gradient-stops: var(--un-gradient-from), var(--un-gradient-to);
  }
  .to-transparent {
    --un-gradient-to-position: 100%;
    --un-gradient-to: transparent var(--un-gradient-to-position);
  }
  .bg-gradient-to-l {
    --un-gradient-shape: to left in oklch;
    --un-gradient: var(--un-gradient-shape), var(--un-gradient-stops);
  }
  .bg-gradient-to-l,
  .bg-gradient-to-r {
    background-image: linear-gradient(var(--un-gradient));
  }
  .bg-gradient-to-r {
    --un-gradient-shape: to right in oklch;
    --un-gradient: var(--un-gradient-shape), var(--un-gradient-stops);
  }

  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .focus-visible\:ring-2:focus-visible {
    --un-ring-width: 2px;
    --un-ring-offset-shadow: var(--un-ring-inset) 0 0 0
      var(--un-ring-offset-width) var(--un-ring-offset-color);
    --un-ring-shadow: var(--un-ring-inset) 0 0 0
      calc(var(--un-ring-width) + var(--un-ring-offset-width))
      var(--un-ring-color);
    box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow),
      var(--un-shadow);
  }
  .transition-opacity {
    transition-duration: 0.15s;
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  .duration-300 {
    transition-duration: 0.3s;
  }
  @media (prefers-color-scheme: dark) {
    .dark\:block {
      display: block;
    }
    .dark\:hidden {
      display: none;
    }
    .dark\:border-gray-900 {
      --un-border-opacity: 1;
      border-color: rgb(24 24 27 / var(--un-border-opacity));
    }
    .dark\:border-transparent {
      border-color: transparent;
    }
    .dark\:border-none {
      border-style: none;
    }
    .dark\:bg-black {
      --un-bg-opacity: 1;
      background-color: rgb(0 0 0 / var(--un-bg-opacity));
    }
    .dark\:bg-gray-900 {
      --un-bg-opacity: 1;
      background-color: rgb(24 24 27 / var(--un-bg-opacity));
    }
    .dark\:bg-white\/10 {
      background-color: #ffffff1a;
    }
    .dark\:text-gray-300 {
      --un-text-opacity: 1;
      color: rgb(189 189 189 / var(--un-text-opacity));
    }
    .dark\:hover\:text-white:hover,
    .dark\:text-white {
      --un-text-opacity: 1;
      color: rgb(255 255 255 / var(--un-text-opacity));
    }
  }
</style>
