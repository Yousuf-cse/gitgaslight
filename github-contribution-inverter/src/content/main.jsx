const originalLevels = new Map();

function invertGraph() {
  const cells = document.querySelectorAll(
    ".ContributionCalendar-day[data-level]"
  );

  cells.forEach((cell) => {
    if (!originalLevels.has(cell)) {
      originalLevels.set(cell, cell.dataset.level);
    }

    const level = Number(cell.dataset.level);

    cell.dataset.level = String(4 - level);
  });
}

function restoreGraph() {
  originalLevels.forEach((level, cell) => {
    cell.dataset.level = level;
  });
}

async function initialize() {
  const { enabled = false } = await chrome.storage.local.get("enabled");

  if (enabled) {
    invertGraph();
  }
}

initialize();

const observer = new MutationObserver(async () => {
  const { enabled = false } = await chrome.storage.local.get("enabled");

  if (enabled) {
    invertGraph();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== "TOGGLE") return;

  if (message.enabled) {
    invertGraph();
  } else {
    restoreGraph();
  }
});