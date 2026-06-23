chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({
    enabled: false,
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  const { enabled = false } = await chrome.storage.local.get("enabled");

  const newState = !enabled;

  await chrome.storage.local.set({
    enabled: newState,
  });

   if (tab.id) {
    chrome.tabs.sendMessage(tab.id, {
      type: "TOGGLE",
      enabled: newState,
    });
  }

  await chrome.action.setBadgeText({
    text: newState ? "ON" : "",
  });

  await chrome.action.setBadgeBackgroundColor({
    color: "#22c55e",
  });


  console.log("Extension:", newState ? "ON" : "OFF");
});