"use strict";


/* ==========================================================
   ONE LINE — سطر فرح

   بدّل معلومات الزبون من هنا فقط
========================================================== */

const eventConfig = {

  fatherName:
    "سامر محمود",

  groomName:
    "ياسين",

  dayName:
    "الجمعة",

  dateText:
    "27 نوفمبر 2026",

  dateDay:
    "27",

  dateMonth:
    "نوفمبر",

  dateYear:
    "2026",

  timeText:
    "7:00 مساءً",

  venue:
    "قاعة الياسمين",

  city:
    "الموصل",

  address:
    "الموصل - حي الرفاعي",

  /*
    توقيت العراق +03:00
  */
  eventDate:
    "2026-11-27T19:00:00+03:00",

  eventDurationHours:
    4,

  /*
    ضع رابط Google Maps الحقيقي هنا
  */
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Mosul",

  /*
    إذا تركته فارغاً
    يستخدم رابط الصفحة الحالية
  */
  invitationUrl:
    "",

  calendarTitle:
    "حنة ياسين - سطر فرح",

  calendarDescription:
    "يتشرف السيد سامر محمود بدعوتكم لحضور حنة ابنه ياسين. حضوركم يكمل سطر الفرح."

};


/* ==========================================================
   READY
========================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    applyInvitationData();

    setupIntro();

    setupReveal();

    setupJourneyLine();

    setupMap();

    setupCountdown();

    setupCalendar();

    setupShare();

  }
);


/* ==========================================================
   DATA
========================================================== */

function applyInvitationData() {

  const elements =
    document.querySelectorAll(
      "[data-bind]"
    );


  elements.forEach(
    (element) => {

      const key =
        element.dataset.bind;


      if (
        key === "fatherFull"
      ) {

        element.textContent =
          `السيد ${eventConfig.fatherName}`;

        return;

      }


      if (
        Object.prototype.hasOwnProperty.call(
          eventConfig,
          key
        )
      ) {

        element.textContent =
          eventConfig[key];

      }

    }
  );


  document.title =
    `سطر فرح | حنة ${eventConfig.groomName}`;

}


/* ==========================================================
   INTRO
========================================================== */

function setupIntro() {

  const intro =
    document.getElementById(
      "intro"
    );

  const button =
    document.getElementById(
      "openInvitation"
    );


  if (!intro || !button) {
    return;
  }


  document.body.classList.add(
    "intro-active"
  );


  button.addEventListener(
    "click",
    () => {

      if (
        intro.classList.contains(
          "is-open"
        )
      ) {
        return;
      }


      button.disabled =
        true;


      intro.classList.add(
        "is-open"
      );


      document.body.classList.remove(
        "intro-active"
      );


      window.setTimeout(
        () => {

          if (intro.parentNode) {
            intro.remove();
          }

        },
        1300
      );

    }
  );

}


/* ==========================================================
   REVEAL
========================================================== */

function setupReveal() {

  const items =
    document.querySelectorAll(
      "[data-reveal]"
    );


  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reduceMotion) {

    items.forEach(
      (item) => {

        item.classList.add(
          "is-visible"
        );

      }
    );

    return;

  }


  if (
    !("IntersectionObserver" in window)
  ) {

    items.forEach(
      (item) => {

        item.classList.add(
          "is-visible"
        );

      }
    );

    return;

  }


  const observer =
    new IntersectionObserver(

      (
        entries,
        currentObserver
      ) => {

        entries.forEach(
          (entry) => {

            if (!entry.isIntersecting) {
              return;
            }


            entry.target.classList.add(
              "is-visible"
            );


            currentObserver.unobserve(
              entry.target
            );

          }
        );

      },

      {
        threshold:
          0.12,

        rootMargin:
          "0px 0px -35px 0px"
      }

    );


  items.forEach(
    (item) => {

      observer.observe(
        item
      );

    }
  );

}


/* ==========================================================
   JOURNEY LINE
========================================================== */

function setupJourneyLine() {

  const path =
    document.getElementById(
      "journeyPath"
    );


  if (!path) {
    return;
  }


  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reduceMotion) {

    path.style.strokeDashoffset =
      "0";

    return;

  }


  const pathLength =
    path.getTotalLength();


  path.style.strokeDasharray =
    `${pathLength}`;

  path.style.strokeDashoffset =
    `${pathLength}`;


  function updateJourneyLine() {

    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop;


    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;


    if (documentHeight <= 0) {
      return;
    }


    const progress =
      Math.min(
        1,
        Math.max(
          0,
          scrollTop /
          documentHeight
        )
      );


    const drawLength =
      pathLength *
      progress;


    path.style.strokeDashoffset =
      `${pathLength - drawLength}`;

  }


  updateJourneyLine();


  let ticking =
    false;


  window.addEventListener(
    "scroll",
    () => {

      if (ticking) {
        return;
      }


      ticking =
        true;


      window.requestAnimationFrame(
        () => {

          updateJourneyLine();

          ticking =
            false;

        }
      );

    },

    {
      passive: true
    }

  );

}


/* ==========================================================
   MAP
========================================================== */

function setupMap() {

  const button =
    document.getElementById(
      "mapButton"
    );


  if (!button) {
    return;
  }


  button.href =
    eventConfig.mapUrl;

}


/* ==========================================================
   COUNTDOWN
========================================================== */

function setupCountdown() {

  const daysElement =
    document.getElementById(
      "days"
    );

  const hoursElement =
    document.getElementById(
      "hours"
    );

  const minutesElement =
    document.getElementById(
      "minutes"
    );

  const secondsElement =
    document.getElementById(
      "seconds"
    );

  const countdown =
    document.getElementById(
      "countdown"
    );

  const started =
    document.getElementById(
      "eventStarted"
    );


  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    return;
  }


  const target =
    new Date(
      eventConfig.eventDate
    );


  if (
    Number.isNaN(
      target.getTime()
    )
  ) {

    console.warn(
      "Invalid event date"
    );

    return;

  }


  function updateCountdown() {

    const now =
      new Date();


    const difference =
      target.getTime() -
      now.getTime();


    if (
      difference <= 0
    ) {

      daysElement.textContent =
        "00";

      hoursElement.textContent =
        "00";

      minutesElement.textContent =
        "00";

      secondsElement.textContent =
        "00";


      if (countdown) {
        countdown.hidden = true;
      }


      if (started) {
        started.hidden = false;
      }


      return false;

    }


    const dayMs =
      1000 * 60 * 60 * 24;

    const hourMs =
      1000 * 60 * 60;

    const minuteMs =
      1000 * 60;


    const days =
      Math.floor(
        difference /
        dayMs
      );


    const hours =
      Math.floor(
        (
          difference %
          dayMs
        ) /
        hourMs
      );


    const minutes =
      Math.floor(
        (
          difference %
          hourMs
        ) /
        minuteMs
      );


    const seconds =
      Math.floor(
        (
          difference %
          minuteMs
        ) /
        1000
      );


    daysElement.textContent =
      formatNumber(days);

    hoursElement.textContent =
      formatNumber(hours);

    minutesElement.textContent =
      formatNumber(minutes);

    secondsElement.textContent =
      formatNumber(seconds);


    return true;

  }


  const active =
    updateCountdown();


  if (!active) {
    return;
  }


  const timer =
    window.setInterval(
      () => {

        const activeNow =
          updateCountdown();


        if (!activeNow) {

          window.clearInterval(
            timer
          );

        }

      },
      1000
    );

}


/* ==========================================================
   NUMBER
========================================================== */

function formatNumber(value) {

  return String(value)
    .padStart(
      2,
      "0"
    );

}


/* ==========================================================
   CALENDAR
========================================================== */

function setupCalendar() {

  const button =
    document.getElementById(
      "calendarButton"
    );


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    downloadCalendar
  );

}


function downloadCalendar() {

  const startDate =
    new Date(
      eventConfig.eventDate
    );


  if (
    Number.isNaN(
      startDate.getTime()
    )
  ) {

    showToast(
      "تعذر إنشاء الموعد"
    );

    return;

  }


  const endDate =
    new Date(
      startDate.getTime() +
      eventConfig.eventDurationHours *
      60 *
      60 *
      1000
    );


  const location =
    [
      eventConfig.venue,
      eventConfig.city,
      eventConfig.address
    ].join(" - ");


  const description =
    `${eventConfig.calendarDescription}\n${getInvitationUrl()}`;


  const calendarContent = [

    "BEGIN:VCALENDAR",

    "VERSION:2.0",

    "PRODID:-//One Line Henna//Invitation//AR",

    "CALSCALE:GREGORIAN",

    "METHOD:PUBLISH",

    "BEGIN:VEVENT",

    `UID:${Date.now()}@one-line-henna`,

    `DTSTAMP:${toICSDate(new Date())}`,

    `DTSTART:${toICSDate(startDate)}`,

    `DTEND:${toICSDate(endDate)}`,

    `SUMMARY:${escapeICSText(eventConfig.calendarTitle)}`,

    `DESCRIPTION:${escapeICSText(description)}`,

    `LOCATION:${escapeICSText(location)}`,

    "STATUS:CONFIRMED",

    "END:VEVENT",

    "END:VCALENDAR"

  ].join("\r\n");


  const blob =
    new Blob(
      [calendarContent],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    `henna-${slugify(eventConfig.groomName)}.ics`;


  document.body.appendChild(
    link
  );


  link.click();


  link.remove();


  window.setTimeout(
    () => {

      URL.revokeObjectURL(
        url
      );

    },
    1000
  );


  showToast(
    "تم إنشاء موعد التقويم"
  );

}


/* ==========================================================
   ICS
========================================================== */

function toICSDate(date) {

  return date
    .toISOString()
    .replace(
      /[-:]/g,
      ""
    )
    .replace(
      /\.\d{3}/,
      ""
    );

}


function escapeICSText(text) {

  return String(text)

    .replace(
      /\\/g,
      "\\\\"
    )

    .replace(
      /\n/g,
      "\\n"
    )

    .replace(
      /,/g,
      "\\,"
    )

    .replace(
      /;/g,
      "\\;"
    );

}


/* ==========================================================
   SHARE
========================================================== */

function setupShare() {

  const button =
    document.getElementById(
      "shareButton"
    );


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    shareInvitation
  );

}


async function shareInvitation() {

  const url =
    getInvitationUrl();


  const title =
    `سطر فرح | حنة ${eventConfig.groomName}`;


  const text =
    `يتشرف السيد ${eventConfig.fatherName} بدعوتكم لحضور حنة ابنه ${eventConfig.groomName}، وذلك ${eventConfig.dayName} ${eventConfig.dateText} الساعة ${eventConfig.timeText} في ${eventConfig.venue}.`;


  if (
    navigator.share
  ) {

    try {

      await navigator.share({
        title,
        text,
        url
      });


      return;

    }
    catch (error) {

      if (
        error &&
        error.name ===
        "AbortError"
      ) {
        return;
      }

    }

  }


  const copied =
    await copyToClipboard(
      `${text}\n${url}`
    );


  if (copied) {

    showToast(
      "تم نسخ رابط الدعوة"
    );

  }
  else {

    showToast(
      "تعذر نسخ الرابط تلقائياً"
    );

  }

}


/* ==========================================================
   CLIPBOARD
========================================================== */

async function copyToClipboard(text) {

  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {

    try {

      await navigator.clipboard.writeText(
        text
      );


      return true;

    }
    catch (error) {

      console.warn(
        "Clipboard API failed",
        error
      );

    }

  }


  try {

    const textarea =
      document.createElement(
        "textarea"
      );


    textarea.value =
      text;


    textarea.setAttribute(
      "readonly",
      ""
    );


    textarea.style.position =
      "fixed";

    textarea.style.opacity =
      "0";

    textarea.style.pointerEvents =
      "none";


    document.body.appendChild(
      textarea
    );


    textarea.select();


    textarea.setSelectionRange(
      0,
      textarea.value.length
    );


    const success =
      document.execCommand(
        "copy"
      );


    textarea.remove();


    return success;

  }
  catch (error) {

    console.warn(
      "Clipboard fallback failed",
      error
    );


    return false;

  }

}


/* ==========================================================
   URL
========================================================== */

function getInvitationUrl() {

  if (
    eventConfig.invitationUrl &&
    eventConfig.invitationUrl.trim()
  ) {

    return eventConfig
      .invitationUrl
      .trim();

  }


  return window
    .location
    .href
    .split("#")[0];

}


/* ==========================================================
   TOAST
========================================================== */

let toastTimer = null;


function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );

  const text =
    document.getElementById(
      "toastText"
    );


  if (!toast || !text) {
    return;
  }


  text.textContent =
    message;


  toast.classList.add(
    "show"
  );


  if (toastTimer) {

    window.clearTimeout(
      toastTimer
    );

  }


  toastTimer =
    window.setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2500
    );

}


/* ==========================================================
   FILE NAME
========================================================== */

function slugify(value) {

  return String(value)

    .trim()

    .replace(
      /\s+/g,
      "-"
    )

    .replace(
      /[^\u0600-\u06FFa-zA-Z0-9-_]/g,
      ""
    )

    || "event";

}
