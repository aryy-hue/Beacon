<template>
  <div class="art" aria-hidden="true">
    <svg viewBox="0 0 400 320" role="presentation">
      <circle class="glow" cx="200" cy="170" r="150" fill="#ffffff" opacity="0.32" />

      <g class="float-a">
        <g class="enter-window">
          <rect x="60" y="40" width="280" height="180" rx="16" fill="#d3e3fd" />
          <rect x="60" y="40" width="280" height="34" rx="16" fill="#0b57d0" opacity="0.25" />
          <circle class="pulse-dot" cx="88" cy="57" r="5" fill="#0b57d0" opacity="0.6" />
          <rect
            class="grow l0"
            x="102"
            y="52"
            width="90"
            height="10"
            rx="5"
            fill="#0b57d0"
            opacity="0.45"
          />
          <rect
            class="grow l1"
            x="84"
            y="96"
            width="120"
            height="10"
            rx="5"
            fill="#0b57d0"
            opacity="0.35"
          />
          <rect
            class="grow l2"
            x="84"
            y="114"
            width="170"
            height="10"
            rx="5"
            fill="#0b57d0"
            opacity="0.22"
          />
          <rect
            class="grow l3"
            x="84"
            y="132"
            width="100"
            height="10"
            rx="5"
            fill="#0b57d0"
            opacity="0.3"
          />
          <rect class="grow l4" x="84" y="160" width="70" height="22" rx="11" fill="#0b57d0" />
          <rect
            class="grow l5"
            x="162"
            y="160"
            width="70"
            height="22"
            rx="11"
            fill="#ffffff"
            opacity="0.8"
          />
        </g>
      </g>

      <g class="float-b">
        <g class="enter-badge">
          <circle cx="300" cy="200" r="34" fill="#fdd7e4" />
          <path
            class="tick"
            pathLength="1"
            d="M286 200l10 10 18-20"
            stroke="#715573"
            stroke-width="6"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>

      <g class="enter-tile">
        <g class="float-c">
          <rect x="96" y="238" width="52" height="40" rx="6" fill="#e8def8" />
          <rect x="102" y="230" width="40" height="14" rx="3" fill="#715573" opacity="0.5" />
        </g>
      </g>
      <g class="enter-tile tile-2">
        <g class="float-d">
          <rect x="160" y="238" width="52" height="40" rx="6" fill="#c9f0d4" />
          <circle class="spin-slow" cx="186" cy="252" r="8" fill="#1e7e34" opacity="0.5" />
        </g>
      </g>
      <g class="enter-tile tile-3">
        <g class="float-e">
          <rect x="224" y="238" width="52" height="40" rx="6" fill="#ffdbcb" />
          <path
            d="M232 258h36M250 246v24"
            stroke="#e8710a"
            stroke-width="6"
            stroke-linecap="round"
            opacity="0.6"
          />
        </g>
      </g>

      <circle class="mote mote-1" cx="310" cy="90" r="10" fill="#ffffff" opacity="0.8" />
      <circle class="mote mote-2" cx="90" cy="250" r="7" fill="#ffffff" opacity="0.7" />
    </svg>
  </div>
</template>

<style scoped>
.art {
  width: 100%;
  max-width: 420px;
}
.art svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

/* Ambient loops: applied to wrapper groups so entrance and loop
   animations never fight over the same transform. */
.float-a,
.float-b,
.float-c,
.float-d,
.float-e,
.enter-window,
.enter-badge,
.enter-tile,
.mote,
.glow,
.spin-slow {
  transform-box: fill-box;
  transform-origin: center;
}

.glow {
  animation: breathe 7s ease-in-out infinite;
}
.float-a {
  animation: float-a 8s ease-in-out 600ms infinite;
}
.float-b {
  animation: float-b 6.5s ease-in-out 600ms infinite;
}
.float-c {
  animation: float-c 9s ease-in-out infinite;
}
.float-d {
  animation: float-d 7.5s ease-in-out 400ms infinite;
}
.float-e {
  animation: float-c 8.5s ease-in-out 800ms infinite;
}
.spin-slow {
  animation: spin 9s linear infinite;
}
.pulse-dot {
  animation: pulse-dot 2.6s ease-in-out infinite;
}
.mote-1 {
  animation: mote-1 10s ease-in-out infinite;
}
.mote-2 {
  animation: mote-2 12s ease-in-out infinite;
}

/* Entrance */
.enter-window {
  animation: pop-in 620ms cubic-bezier(0.2, 0, 0, 1) both;
}
.enter-badge {
  animation: pop-in 520ms cubic-bezier(0.2, 0, 0, 1) 520ms both;
}
.enter-tile {
  animation: rise-in 560ms cubic-bezier(0.2, 0, 0, 1) 420ms both;
}
.tile-2 {
  animation-delay: 520ms;
}
.tile-3 {
  animation-delay: 620ms;
}

/* Text lines sweep out from the left, like content streaming in */
.grow {
  transform-box: fill-box;
  transform-origin: left center;
  animation: grow 560ms cubic-bezier(0.2, 0, 0, 1) both;
}
.l0 {
  animation-delay: 260ms;
}
.l1 {
  animation-delay: 340ms;
}
.l2 {
  animation-delay: 420ms;
}
.l3 {
  animation-delay: 500ms;
}
.l4 {
  animation-delay: 580ms;
}
.l5 {
  animation-delay: 660ms;
}

.tick {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 460ms cubic-bezier(0.4, 0, 0.2, 1) 900ms both;
}

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.86);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes grow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes breathe {
  0%,
  100% {
    opacity: 0.22;
    transform: scale(1);
  }
  50% {
    opacity: 0.45;
    transform: scale(1.06);
  }
}

@keyframes float-a {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-7px);
  }
}

@keyframes float-b {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(5px, -6px);
  }
}

@keyframes float-c {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes float-d {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(7px);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 0.9;
  }
}

@keyframes mote-1 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-10px, 16px);
  }
}

@keyframes mote-2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(12px, -14px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tick {
    stroke-dashoffset: 0;
  }
}
</style>
