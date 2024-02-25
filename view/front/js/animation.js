const items = document.querySelectorAll(" .item");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) =>
    entry.target.classList.toggle("item-transition", entry.isIntersecting)
  );
});

items.forEach((card) => observer.observe(card));
