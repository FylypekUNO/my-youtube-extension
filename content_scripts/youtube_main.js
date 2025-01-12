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

  const target = mutation.target;

  if (target.id !== "header") return;
  if (!target.classList.contains("style-scope")) return;
  if (!target.classList.contains("ytd-rich-grid-renderer")) return;

  target.style.display = "none";

  console.log("my-youtube-extension: Hide-tags-bar: Success!");
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
