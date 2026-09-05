/* ============================================================
   CONTACT FORM — validation, loading, success, error
   Delivery via Web3Forms (see js/config.js for setup).
   Falls back to a pre-filled mail client if no key is configured.
   ============================================================ */
(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return;

  var cfg = window.SITE_CONFIG || {};
  var KEY = cfg.WEB3FORMS_ACCESS_KEY || "";
  var configured = KEY && KEY.indexOf("REPLACE_WITH") !== 0;

  var btn = document.getElementById("cfSubmit");
  var statusEl = document.getElementById("cfStatus");
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  function setStatus(kind, html) {
    statusEl.className = "cf-status is-visible " + (kind === "ok" ? "is-ok" : "is-err");
    statusEl.innerHTML = html;
  }
  function clearStatus() {
    statusEl.className = "cf-status";
    statusEl.innerHTML = "";
  }
  function fieldError(input, message) {
    var wrap = input.closest(".field");
    var err = wrap.querySelector(".field-err");
    if (message) {
      wrap.classList.add("has-error");
      err.textContent = message;
      input.setAttribute("aria-invalid", "true");
    } else {
      wrap.classList.remove("has-error");
      err.textContent = "";
      input.removeAttribute("aria-invalid");
    }
  }

  var fields = {
    name: form.querySelector("#cf-name"),
    email: form.querySelector("#cf-email"),
    subject: form.querySelector("#cf-subject"),
    message: form.querySelector("#cf-message")
  };

  function validateField(key) {
    var el = fields[key];
    var v = el.value.trim();
    if (key === "name") {
      if (v.length < 2) return "Please enter your name.";
    } else if (key === "email") {
      if (!v) return "Please enter your email.";
      if (!EMAIL_RE.test(v)) return "That doesn't look like a valid email address.";
    } else if (key === "subject") {
      if (v.length < 3) return "Please add a short subject.";
    } else if (key === "message") {
      if (v.length < 12) return "Please write at least a sentence or two.";
    }
    return "";
  }

  Object.keys(fields).forEach(function (key) {
    var el = fields[key];
    el.addEventListener("blur", function () { fieldError(el, validateField(key)); });
    el.addEventListener("input", function () {
      if (el.closest(".field").classList.contains("has-error")) {
        fieldError(el, validateField(key));
      }
    });
  });

  function validateAll() {
    var firstBad = null;
    Object.keys(fields).forEach(function (key) {
      var msg = validateField(key);
      fieldError(fields[key], msg);
      if (msg && !firstBad) firstBad = fields[key];
    });
    return firstBad;
  }

  function loading(on) {
    btn.classList.toggle("is-loading", on);
    btn.disabled = on;
    btn.querySelector(".cf-label").textContent = on ? "Sending…" : "Send Message";
  }

  function mailtoFallback(data) {
    var body =
      "Name: " + data.name + "\n" +
      "Email: " + data.email + "\n\n" +
      data.message;
    var href =
      "mailto:" + (cfg.OWNER_EMAIL || "rishrag18@gmail.com") +
      "?subject=" + encodeURIComponent(data.subject) +
      "&body=" + encodeURIComponent(body);
    window.location.href = href;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearStatus();

    // honeypot — silently accept and drop bot submissions
    if (form.botcheck && form.botcheck.value) return;

    var bad = validateAll();
    if (bad) {
      bad.focus();
      setStatus("err", "Please fix the highlighted fields and try again.");
      return;
    }

    var data = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      subject: fields.subject.value.trim(),
      message: fields.message.value.trim()
    };

    if (!configured) {
      setStatus(
        "ok",
        "Opening your email app with this message ready to send. If nothing opens, email <a href=\"mailto:" +
          (cfg.OWNER_EMAIL || "rishrag18@gmail.com") + "\">" + (cfg.OWNER_EMAIL || "rishrag18@gmail.com") + "</a> directly."
      );
      mailtoFallback(data);
      return;
    }

    loading(true);

    var payload = {
      access_key: KEY,
      subject: (cfg.FORM_SUBJECT_PREFIX ? cfg.FORM_SUBJECT_PREFIX + ": " : "") + data.subject,
      from_name: cfg.FROM_NAME || "Portfolio",
      name: data.name,
      email: data.email,
      message: data.message,
      replyto: data.email
    };

    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, 15000) : null;

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller ? controller.signal : undefined
    })
      .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, json: j }; }); })
      .then(function (r) {
        if (r.ok && r.json && r.json.success) {
          form.reset();
          Object.keys(fields).forEach(function (k) { fieldError(fields[k], ""); });
          setStatus("ok", "Message sent — thanks, " + data.name.split(" ")[0] + ". I'll get back to you at " + data.email + ".");
        } else {
          throw new Error((r.json && r.json.message) || "Submission failed");
        }
      })
      .catch(function () {
        setStatus(
          "err",
          "Something went wrong sending that. Please email <a href=\"mailto:" +
            (cfg.OWNER_EMAIL || "rishrag18@gmail.com") + "\">" +
            (cfg.OWNER_EMAIL || "rishrag18@gmail.com") + "</a> directly, or try again in a moment."
        );
      })
      .then(function () {
        if (timer) clearTimeout(timer);
        loading(false);
      });
  });
})();
