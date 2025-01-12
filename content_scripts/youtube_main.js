console.log("my-youtube-extension: Hello, world!");

let onMutationQueue = [];

function onMutation(mutation) {
  let notDoneTasks = [];

  for (const task of onMutationQueue) {
    let isTaskDone = task(mutation);
    if (isTaskDone) continue;

    notDoneTasks.push(task);
  }

  onMutationQueue = notDoneTasks;
}

function addOnMutationOnce(task) {
  onMutationQueue.push(task);
}

// Hide tags bar ( <div id="header" class="style-scope ytd-rich-grid-renderer">)

onMutationQueue.push((mutation) => {
  if (mutation.type !== "childList") return;
  if (mutation.addedNodes.length === 0) return;

  const target = mutation.target;

  if (target.id !== "header") return;
  if (!target.classList.contains("style-scope")) return;
  if (!target.classList.contains("ytd-rich-grid-renderer")) return;

  target.style.display = "none";

  console.log("my-youtube-extension: Hide-tags-bar: Success!");
  return true;
});

// Hide "Create" button ( <ytd-button-renderer class="style-scope ytd-masthead"> inside <div id="buttons"> )

onMutationQueue.push((mutation) => {
  if (mutation.type !== "childList") return;
  if (mutation.addedNodes.length === 0) return;

  const target = mutation.target;

  if (target.parentElement.id !== "buttons") return;
  if (target.tag === "YTD-BUTTON-RENDERER") return;
  if (!target.classList.contains("style-scope")) return;
  if (!target.classList.contains("ytd-masthead")) return;

  target.style.display = "none";

  console.log("my-youtube-extension: Hide-create-button: Success!");
  return true;
});

// Hide voice search button ( <div id="voice-search-button"> )

onMutationQueue.push((mutation) => {
  if (mutation.type !== "childList") return;
  if (mutation.addedNodes.length === 0) return;

  const target = mutation.target;

  if (target.id !== "voice-search-button") return;

  target.style.display = "none";

  console.log("my-youtube-extension: Hide-voice-search-button: Success!");
  return true;
});

// Run observer

const observer = new MutationObserver((mutations) => {
  mutations.forEach(onMutation);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
