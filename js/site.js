
(function () {
  var buttons = document.querySelectorAll("[data-filter]");
  var items = document.querySelectorAll(".gathering");
  var empty = document.getElementById("gathering-empty");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var kind = btn.getAttribute("data-filter");
      buttons.forEach(function (b) {
        var on = b === btn;
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.className = on
          ? "filter-btn h-11 px-4 text-sm bg-gold text-ink"
          : "filter-btn h-11 px-4 text-sm border border-line text-ivory hover:border-gold";
      });
      var shown = 0;
      items.forEach(function (item) {
        var match = kind === "All" || item.getAttribute("data-kind") === kind;
        item.hidden = !match;
        if (match) shown += 1;
      });
      if (empty) empty.classList.toggle("hidden", shown !== 0);
    });
  });
  var all = document.querySelector('[data-filter="All"]');
  if (all) {
    all.className = "filter-btn h-11 px-4 text-sm bg-gold text-ink";
  }

  var form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();
    var list = document.getElementById("list").checked;
    var errors = {
      name: name.length < 2 ? "Please add your name." : "",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Enter a real email address.",
      message: message.length < 8 ? "A few words are enough — at least a sentence." : ""
    };
    Object.keys(errors).forEach(function (key) {
      var el = document.getElementById("err-" + key);
      el.textContent = errors[key];
      el.classList.toggle("hidden", !errors[key]);
    });
    if (errors.name || errors.email || errors.message) return;
    var thanks = document.getElementById("contact-thanks");
    thanks.classList.remove("hidden");
    form.classList.add("hidden");
    thanks.innerHTML =
      '<p class="text-xs tracking-widest text-gold uppercase">Held on this page</p>' +
      '<h2 class="mt-3 font-display text-4xl">Thank you, ' + name.replace(/[&<>"]/g, "") + '.</h2>' +
      '<p class="mt-4 text-ivory-dim">Your note is not in an inbox yet. When you publish for real, connect email and this same form can deliver. Until then, write @daebonyworriors.</p>' +
      '<blockquote class="mt-6 border-l-2 border-gold pl-4 text-ivory"></blockquote>' +
      '<p class="mt-4 text-sm text-ivory-dim"></p>' +
      '<button type="button" class="mt-8 inline-flex h-11 items-center border border-line px-5 text-sm hover:border-gold">Write another</button>';
    thanks.querySelector("blockquote").textContent = message;
    thanks.querySelector("p.mt-4.text-sm").textContent = email + (list ? " · asked to join the list" : "");
    thanks.querySelector("button").addEventListener("click", function () {
      form.reset();
      form.classList.remove("hidden");
      thanks.classList.add("hidden");
    });
  });
})();
