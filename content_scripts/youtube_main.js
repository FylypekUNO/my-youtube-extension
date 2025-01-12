{
  // Hide Shorts sections ( <ytd-rich-section-renderer> with <span id="title">Shorts</span> )

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
