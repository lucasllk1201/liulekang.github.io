const filters = Array.from(document.querySelectorAll(".filter"));
const cases = Array.from(document.querySelectorAll(".case-card"));
const replayButtons = Array.from(document.querySelectorAll(".story-play"));

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filters.forEach((item) => item.classList.toggle("active", item === button));

    cases.forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !tags.includes(filter));
    });
  });
});

replayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const story = button.closest(".video-story");
    const video = story?.querySelector(".cartoon-video");

    if (!video) {
      return;
    }

    const freshVideo = video.cloneNode(true);
    video.replaceWith(freshVideo);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".section, .proof-strip article, .lab-console, .video-story").forEach((element) => {
  observer.observe(element);
});
