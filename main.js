// Shared utilities for WuWa Tools

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }
});

// Ko-fi floating widget
(function () {
  var src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
  if (window.kofiWidgetOverlay) return;
  var s = document.createElement('script');
  s.src = src;
  s.onload = function () {
    kofiWidgetOverlay.draw('ntetools', {
      'type': 'floating-chat',
      'floating-chat.donateButton.text': 'Buy me a coffee ☕',
      'floating-chat.donateButton.background-color': '#d4a843',
      'floating-chat.donateButton.text-color': '#1a1a2e'
    });
  };
  document.body.appendChild(s);
})();
