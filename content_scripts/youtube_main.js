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

// Hide Shorts sections ( <ytd-rich-section-renderer> with <span id="title">Shorts</span> )

{
  const sections = document.getElementsByTagName("ytd-rich-section-renderer");

  const intervalId = setInterval(() => {
    if (sections.length !== 0) clearInterval(intervalId);

    for (const section of sections) {
      const title = section.querySelector("#title");
      console.log(title);
      if (!title) continue;
      if (title.innerText !== "Shorts") continue;

      section.style.display = "none";
    }
  }, 100);
}

// Run observer

const observer = new MutationObserver((mutations) => {
  if (mutations.length === 0) {
    observer.disconnect();
    return;
  }

  mutations.forEach(onMutation);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
