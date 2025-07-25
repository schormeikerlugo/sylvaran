// src/utils/UIManager.js

export const UIManager = {
  hideElement(selector) {
    const el = document.querySelector(selector);
    if (el && !el.classList.contains('hidden')) {
      el.classList.add('hidden');
    }
  },

  showElement(selector) {
    const el = document.querySelector(selector);
    if (el && el.classList.contains('hidden')) {
      el.classList.remove('hidden');
    }
  },

  fadeOutElement(selector, delay = 600) {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add('fade-out');
      setTimeout(() => {
        el.classList.add('hidden');
        el.classList.remove('fade-out');
      }, delay);
    }
  },

  removeElement(selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.remove();
    }
  },

  removeAllVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach((v) => {
      v.pause();
      v.remove();
    });
  },

  bindMenuActions(selector, callback) {
    const items = document.querySelectorAll(`${selector} li[data-action]`);
    items.forEach((li) => {
      li.addEventListener('click', () => {
        const action = li.dataset.action;
        callback(action);
      });
    });
  },

  showModal(modalId) {
    const modal = document.querySelector(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('fade-in');
    }
  },

  hideModal(modalId) {
    const modal = document.querySelector(modalId);
    if (modal) {
      modal.classList.remove('fade-in');
      modal.classList.add('fade-out');
      setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('fade-out');
      }, 400);
    }
  },

  bindModalClose(buttonSelector, modalId) {
    const btn = document.querySelector(buttonSelector);
    if (btn) {
      btn.addEventListener('click', () => {
        UIManager.hideModal(modalId);
      });
    }
  }
};