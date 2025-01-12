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

// Hide tags bar ( <div id="header"> )

onMutationQueue.push((mutation) => {
  if (mutation.type !== "childList") return;
  if (mutation.addedNodes.length === 0) return;
  console.log("my-youtube-extension: Added nodes:", mutation.addedNodes);

  const target = mutation.target;

  if (target.id !== "header") return;
  if (!target.classList.contains("style-scope")) return;
  if (!target.classList.contains("ytd-rich-grid-renderer")) return;

  console.error("my-youtube-extension: Hide header", target);

  target.style.display = "none";
  return true;
});

// Run observer

const observer = new MutationObserver((mutations) => {
  mutations.forEach(onMutation);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
})[1][2];
