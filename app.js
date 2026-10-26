/**
 * 生成AI活用効率化ツールポートフォリオ
 * 純粋なHTML/CSS/JavaScriptによるブラウザ・スマートフォン両対応実装
 */

var APPS_DATA = [
  {
    id: 'task-manager',
    title: 'タスク管理ツール',
    shortName: 'タスク管理',
    url: 'https://yuto-1234.github.io/5W1H-Task-Manager/',
    key: '1',
    image: './assets/images/banner_task_manager.jpg',
    color: '#06b6d4',
    iconSvg: '<svg class="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path><path d="m9 13 2 2 4-4"></path></svg>'
  },
  {
    id: '5w1h-tree',
    title: '5W1Hツリーテンプレートツール',
    shortName: '5W1Hツリー',
    url: 'https://yuto-1234.github.io/5W1H-/',
    key: '2',
    image: './assets/images/banner_5w1h_framework.jpg',
    color: '#f59e0b',
    iconSvg: '<svg class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path><path d="M12 18v4"></path></svg>'
  },
  {
    id: 'weekly-time',
    title: '週間タイムマネジメントツール',
    shortName: 'タイム管理',
    url: 'https://yuto-1234.github.io/-/',
    key: '3',
    image: './assets/images/banner_weekly_time_management.jpg',
    color: '#a855f7',
    iconSvg: '<svg class="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path></svg>'
  }
];

var selectedAppIndex = 0;
var currentViewMode = 'spotlight'; // 'spotlight' or 'grid'

function initApp() {
  renderBanners();
  renderMobileDock();
  setupViewModeButtons();
  setupKeyboardEvents();
  setupPreviewModalEvents();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Render Mobile Quick Dock
function renderMobileDock() {
  var dockContainer = document.getElementById('mobile-bottom-dock');
  if (!dockContainer) return;

  dockContainer.innerHTML = [
    '<div class="max-w-md mx-auto px-3 py-2 bg-slate-900/95 backdrop-blur-lg border border-slate-800 rounded-2xl shadow-2xl flex items-center justify-around gap-1.5">',
    APPS_DATA.map(function(app) {
      return [
        '<a href="' + app.url + '" target="_blank" rel="noopener noreferrer" class="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl text-center transition-all active:scale-95 text-slate-300 hover:text-white hover:bg-slate-800/80 min-h-[48px]" title="' + app.title + 'を開く">',
        '  <div class="mb-1">' + app.iconSvg + '</div>',
        '  <span class="text-[11px] font-medium leading-none truncate w-full text-center">' + app.shortName + '</span>',
        '</a>'
      ].join('');
    }).join(''),
    '</div>'
  ].join('');
}

// Render Feature Banners
function renderBanners() {
  var spotlightContainer = document.getElementById('banners-spotlight-container');
  var gridContainer = document.getElementById('banners-grid-container');
  if (!spotlightContainer || !gridContainer) return;

  if (currentViewMode === 'spotlight') {
    spotlightContainer.classList.remove('hidden');
    gridContainer.classList.add('hidden');
    renderSpotlightView();
  } else {
    spotlightContainer.classList.add('hidden');
    gridContainer.classList.remove('hidden');
    renderGridView();
  }
}

function handleImageError(imgEl, title) {
  imgEl.style.display = 'none';
  if (imgEl.parentElement) {
    imgEl.parentElement.classList.add('bg-gradient-to-br', 'from-slate-900', 'to-slate-800');
  }
}
window.handleImageError = handleImageError;

function renderSpotlightView() {
  var activeApp = APPS_DATA[selectedAppIndex];
  var spotlightEl = document.getElementById('banner-spotlight-card');
  var tabsEl = document.getElementById('banner-tabs');
  if (!spotlightEl || !tabsEl) return;

  spotlightEl.innerHTML = [
    '<div class="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group transition-all duration-300">',
    '  <div class="relative aspect-[4/3] sm:aspect-[21/9] max-h-[460px] w-full overflow-hidden bg-slate-950">',
    '    <img',
    '      src="' + activeApp.image + '"',
    '      alt="' + activeApp.title + '"',
    '      onerror="handleImageError(this, \'' + activeApp.title + '\')"',
    '      class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"',
    '    />',
    '    <div class="absolute inset-0 banner-overlay"></div>',
    '    <div class="absolute top-3 left-3 sm:top-6 sm:left-6 flex items-center gap-2">',
    '      <span class="px-2.5 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-md bg-slate-900/80 border border-slate-700/80 text-cyan-300">',
    '        キー [' + activeApp.key + ']',
    '      </span>',
    '    </div>',
    '    <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-8 flex flex-col justify-end">',
    '      <div class="max-w-2xl">',
    '        <h2 class="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">',
    '          ' + activeApp.title,
    '        </h2>',
    '        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">',
    '          <a',
    '            href="' + activeApp.url + '"',
    '            target="_blank"',
    '            rel="noopener noreferrer"',
    '            class="w-full sm:w-auto min-h-[44px] px-5 py-3 sm:py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/30 transition-all cursor-pointer"',
    '          >',
    '            <span>ツールを開く</span>',
    '            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>',
    '          </a>',
    '          <button',
    '            type="button"',
    '            onclick="openPreviewModal(' + selectedAppIndex + ')"',
    '            class="w-full sm:w-auto min-h-[44px] px-4 py-3 sm:py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-sm"',
    '          >',
    '            <svg class="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"></path><path d="m21 3-7 7"></path><path d="M9 21H3v-6"></path><path d="m3 21 7-7"></path></svg>',
    '            <span>画面内プレビュー</span>',
    '          </button>',
    '        </div>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('');

  tabsEl.innerHTML = APPS_DATA.map(function(app, index) {
    var isSelected = selectedAppIndex === index;
    return [
      '<button',
      '  type="button"',
      '  onclick="selectApp(' + index + ')"',
      '  class="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer min-h-[52px] ' +
        (isSelected
          ? 'bg-slate-900/90 border-cyan-500/80 ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-950/40'
          : 'bg-slate-950/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/40') +
        '"',
      '>',
      '  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 border border-slate-800 bg-slate-900 relative">',
      '    <img src="' + app.image + '" alt="' + app.title + '" onerror="handleImageError(this, \'' + app.title + '\')" class="w-full h-full object-cover" />',
      '    <div class="absolute top-0.5 left-0.5 px-1 rounded bg-black/70 text-[9px] font-mono text-cyan-300 font-bold">' + app.key + '</div>',
      '  </div>',
      '  <div class="flex-1 min-w-0">',
      '    <div class="flex items-center justify-between">',
      '      <span class="text-xs sm:text-sm font-semibold text-slate-200 truncate">' + app.title + '</span>',
      '      <svg class="w-4 h-4 transition-transform shrink-0 ' + (isSelected ? 'text-cyan-400 rotate-90' : 'text-slate-600') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"></path></svg>',
      '    </div>',
      '  </div>',
      '</button>'
    ].join('');
  }).join('');
}

function renderGridView() {
  var gridContainer = document.getElementById('banners-grid-container');
  if (!gridContainer) return;

  gridContainer.innerHTML = APPS_DATA.map(function(app, index) {
    return [
      '<div class="flex flex-col rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl hover:border-slate-700 transition-all group">',
      '  <div class="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">',
      '    <img',
      '      src="' + app.image + '"',
      '      alt="' + app.title + '"',
      '      onerror="handleImageError(this, \'' + app.title + '\')"',
      '      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"',
      '    />',
      '    <div class="absolute inset-0 banner-grid-overlay"></div>',
      '    <div class="absolute top-3 left-3 flex items-center gap-2">',
      '      <span class="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-black/80 text-cyan-300 border border-cyan-800/60">',
      '        キー [' + app.key + ']',
      '      </span>',
      '    </div>',
      '  </div>',
      '  <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">',
      '    <div>',
      '      <h3 class="text-base sm:text-lg font-bold text-white mb-3">' + app.title + '</h3>',
      '    </div>',
      '    <div class="flex items-center gap-2 pt-2 border-t border-slate-800">',
      '      <a',
      '        href="' + app.url + '"',
      '        target="_blank"',
      '        rel="noopener noreferrer"',
      '        class="flex-1 min-h-[44px] py-2.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"',
      '      >',
      '        <span>ツールを開く</span>',
      '        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>',
      '      </a>',
      '      <button',
      '        type="button"',
      '        onclick="openPreviewModal(' + index + ')"',
      '        class="min-h-[44px] min-w-[44px] p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"',
      '        title="プレビュー"',
      '      >',
      '        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"></path><path d="m21 3-7 7"></path><path d="M9 21H3v-6"></path><path d="m3 21 7-7"></path></svg>',
      '      </button>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');
  }).join('');
}

// View Mode Switching
function setupViewModeButtons() {
  var spotlightBtn = document.getElementById('view-spotlight-btn');
  var gridBtn = document.getElementById('view-grid-btn');
  if (!spotlightBtn || !gridBtn) return;

  spotlightBtn.addEventListener('click', function() {
    currentViewMode = 'spotlight';
    spotlightBtn.className = 'flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-slate-800 text-cyan-300 shadow-sm';
    gridBtn.className = 'flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-slate-400 hover:text-slate-200';
    renderBanners();
  });

  gridBtn.addEventListener('click', function() {
    currentViewMode = 'grid';
    gridBtn.className = 'flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-slate-800 text-cyan-300 shadow-sm';
    spotlightBtn.className = 'flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-slate-400 hover:text-slate-200';
    renderBanners();
  });
}

window.selectApp = function(index) {
  selectedAppIndex = index;
  renderSpotlightView();
};

// Toast Feedback
var toastTimer = null;
window.showToast = function(msg) {
  var toastEl = document.getElementById('toast');
  var toastMsg = document.getElementById('toast-message');
  if (!toastEl || !toastMsg) return;

  toastMsg.textContent = msg;
  toastEl.classList.remove('hidden');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(function() {
    toastEl.classList.add('hidden');
  }, 2500);
};

// Preview Modal
window.openPreviewModal = function(index) {
  var app = APPS_DATA[index];
  var modal = document.getElementById('preview-modal');
  var iframe = document.getElementById('preview-iframe');
  var title = document.getElementById('preview-title');
  var urlBar = document.getElementById('preview-url');
  var openLink = document.getElementById('preview-open-link');

  if (!modal || !iframe || !app) return;

  if (title) title.textContent = app.title;
  if (urlBar) urlBar.textContent = app.url;
  iframe.src = app.url;
  if (openLink) openLink.href = app.url;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closePreviewModal = function() {
  var modal = document.getElementById('preview-modal');
  var iframe = document.getElementById('preview-iframe');
  if (!modal || !iframe) return;

  iframe.src = 'about:blank';
  modal.classList.add('hidden');
  document.body.style.overflow = '';
};

window.refreshPreviewIframe = function() {
  var iframe = document.getElementById('preview-iframe');
  if (iframe && iframe.src) {
    var current = iframe.src;
    iframe.src = 'about:blank';
    setTimeout(function() { iframe.src = current; }, 50);
  }
};

function setupPreviewModalEvents() {
  var closeBtn = document.getElementById('preview-close-btn');
  var refreshBtn = document.getElementById('preview-refresh-btn');
  if (closeBtn) closeBtn.addEventListener('click', window.closePreviewModal);
  if (refreshBtn) refreshBtn.addEventListener('click', window.refreshPreviewIframe);
}

// Keyboard Navigation
function setupKeyboardEvents() {
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.closePreviewModal();
      return;
    }

    if (e.key === '1') {
      var app1 = APPS_DATA[0];
      window.open(app1.url, '_blank', 'noopener,noreferrer');
      window.showToast('[' + app1.key + '] ' + app1.title + ' を開きました');
    } else if (e.key === '2') {
      var app2 = APPS_DATA[1];
      window.open(app2.url, '_blank', 'noopener,noreferrer');
      window.showToast('[' + app2.key + '] ' + app2.title + ' を開きました');
    } else if (e.key === '3') {
      var app3 = APPS_DATA[2];
      window.open(app3.url, '_blank', 'noopener,noreferrer');
      window.showToast('[' + app3.key + '] ' + app3.title + ' を開きました');
    }
  });
}
