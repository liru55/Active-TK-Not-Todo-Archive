var _____WB$wombat$assign$function_____ = function (name) {
  return (
    (globalThis._wb_wombat &&
      globalThis._wb_wombat.local_init &&
      globalThis._wb_wombat.local_init(name)) ||
    globalThis[name]
  );
};
if (!globalThis.__WB_pmw) {
  globalThis.__WB_pmw = function (obj) {
    this.__WB_source = obj;
    return this;
  };
}
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");
  /*!
   * menu-effect.js / 2024.12.18
   * Author: ActiveTK.
   */
  ((window.menujs = window.menujs || {
    targets: [],
    triggers: [],
    updateTriggersAndTargets: function () {
      ((window.menujs.targets = document.querySelectorAll("[data-menueffect-target]")),
        (window.menujs.triggers = document.querySelectorAll("[data-menueffect-trigger]")));
      for (const e of window.menujs.triggers)
        e.onclick = function () {
          window.menujs.showMenu(e.dataset.menueffectTrigger);
        };
    },
    showMenu: function (e) {
      var t = window.innerWidth,
        n = window.innerHeight,
        r = Math.floor(t / 15),
        o = Math.floor(t / r),
        s = Math.floor(n / r),
        i = document.createElement("div"),
        a =
          ((i.style.cssText = `display:grid;grid-template-columns:repeat(${o},1fr);grid-template-rows:repeat(${s},1fr);height:100vh;width:100vw;z-index:200;`),
          (i.style.position = "fixed"),
          (i.style.top = "0"),
          (i.style.left = "0"),
          (i.style.width = "100%"),
          (i.style.height = "100%"),
          (i.style.fontFamily = "'M PLUS Rounded 1c', sans-serif"),
          (i.id = "__autogen_menu"),
          []);
      for (let t = 0; t < s; t++) {
        a[t] = [];
        for (let e = 0; e < o; e++) {
          var l = document.createElement("div");
          ((l.style.cssText =
            "background-color:#000;border:1px solid #111;box-sizing:border-box;opacity:0;transition:opacity .5s ease;clip-path:circle(75%);overflow:hidden;font-size:" +
            (r - 8) +
            "px;color: #ffffff;"),
            (l.dataset.x = e),
            (a[(l.dataset.y = t)][e] = l),
            i.appendChild(l));
        }
      }
      document.body.appendChild(i);
      var d,
        t = document.querySelectorAll("[data-menueffect-target=" + e + "]")[0];
      window.menujs.userData = {};
      try {
        window.menujs.userData = JSON.parse(t.textContent);
      } catch (e) {
        throw "User Content in json format is only supported.";
      }
      for (d in window.menujs.userData)
        try {
          var c,
            u = window.menujs.userData[d].type;
          if ("text" == u || "link" == u) {
            var m = window.menujs.userData[d];
            let t = m["position-x"],
              n = m["position-y"],
              e = m.height,
              o = m.width,
              s = m.content;
            var p = m.style;
            let i = m.fontsize;
            if (
              ((t = t || 0),
              (n = n || 0),
              (e = e || 1),
              (o = o || 1),
              (s = s || ""),
              (i = i || 1),
              a[n] && a[n][t])
            )
              if (
                (p && (a[n][t].style.cssText += p),
                (a[n][t].style.cssText += "font-size: " + (r * i - 8) + "px !important;"),
                (1 == e && 1 == o) ||
                  (a[n][t].style.cssText +=
                    "grid-column: " +
                    (t + 1) +
                    " / span " +
                    o +
                    ";grid-row: " +
                    (n + 1) +
                    " / span " +
                    e +
                    ";"),
                "text" == u)
              )
                a[n][t].innerHTML = s;
              else {
                let e = m.href;
                e = e || "#";
                var f = document.createElement("a");
                ((f.innerText = s),
                  (f.href = e),
                  (f.style.cssText =
                    "color:#fff;text-decoration:none;position:relative;display:block;width:100%;height:100%;"),
                  a[n][t].appendChild(f));
                const x = document.createElement("div");
                ((x.style.cssText =
                  "position:absolute;width:600px;height:600px;background:radial-gradient(circle,rgba(77,255,171,.5) 0,hsla(0,0%,100%,0) 80%);border-radius:50%;pointer-events:none;opacity:0;transition:opacity .5s,transform .5s;transform:translate(-50%,-50%) scale(0);"),
                  (a[n][t].style.position = "relative"),
                  a[n][t].appendChild(x),
                  a[n][t].addEventListener("mousemove", function (e) {
                    var t = this.getBoundingClientRect(),
                      n = e.clientX - t.left,
                      e = e.clientY - t.top;
                    ((x.style.left = n + "px"),
                      (x.style.top = e + "px"),
                      (x.style.opacity = "1"),
                      (x.style.transform = "translate(-50%, -50%) scale(1)"));
                  }),
                  a[n][t].addEventListener("mouseout", function () {
                    ((x.style.opacity = "0"),
                      (x.style.transform = "translate(-50%, -50%) scale(0)"));
                  }));
              }
          } else if ("div" == u) {
            var w = window.menujs.userData[d];
            let e = w["position-x"],
              t = w["position-y"],
              n = w.height,
              o = w.width;
            ((e = e || 0),
              (t = t || 0),
              (n = n || 1),
              (o = o || 1),
              a[t] &&
                a[t][e] &&
                (a[t][e].style.cssText +=
                  "grid-column: " +
                  (e + 1) +
                  " / span " +
                  o +
                  ";grid-row: " +
                  (t + 1) +
                  " / span " +
                  n +
                  ";"));
          } else if ("image" == u) {
            var y = window.menujs.userData[d];
            let e = y["position-x"],
              t = y["position-y"];
            var h,
              g = y.src;
            let n = y.title;
            if (((e = e || 0), (t = t || 0), (n = n || ""), !g))
              throw "Parameter [src] is required.";
            a[t] &&
              a[t][e] &&
              (((h = document.createElement("img")).src = g),
              (h.title = n),
              (h.style.cssText = "max-width:100%;height:auto;"),
              a[t][e].appendChild(h));
          } else {
            if ("close" != u) throw "Unsupported type: " + u;
            {
              let e = window.menujs.userData[d]["position-x"],
                t = window.menujs.userData[d]["position-y"];
              ((e = e || 14),
                a[(t = t || 0)] &&
                  a[t][e] &&
                  (((c = a[t][e]).style.color = "#bce2e8"),
                  (c.style.cssText +=
                    "font-size: " + (0.7 * r - 8) + "px !important;text-align:center;"),
                  (c.innerHTML = "&#215;"),
                  (c.onclick = function () {
                    window.menujs.closeMenu();
                  }),
                  c.addEventListener("mouseover", function () {
                    ((this.style.backgroundColor = "#0a5a66"), (this.style.cursor = "pointer"));
                  }),
                  c.addEventListener("mouseout", function () {
                    ((this.style.backgroundColor = "#000000"), (this.style.cursor = "default"));
                  })));
            }
          }
        } catch (e) {
          throw "Processing error: " + e;
        }
      (a
        .flat()
        .sort(() => 0.5 - Math.random())
        .forEach((e, t) => {
          setTimeout(() => {
            e.style.opacity = "1";
          }, 6 * t);
        }),
        (window.__menu_grid = a));
    },
    closeMenu: function () {
      (window.__menu_grid
        .flat()
        .sort(() => 0.5 - Math.random())
        .forEach((e, t) => {
          setTimeout(() => {
            e.style.opacity = "0";
          }, 3 * t);
        }),
        setTimeout(function () {
          var e = document.getElementById("__autogen_menu");
          e && e.remove();
        }, 1e3));
    },
  }),
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        window.menujs.updateTriggersAndTargets();
        var e = document.createElement("link");
        ((e.href =
          "https://web.archive.org/web/20261112112010/https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap"),
          (e.rel = "stylesheet"),
          document.head.appendChild(e));
      },
      !1,
    ));
}

/*
     FILE ARCHIVED ON 11:20:10 Nov 12, 2026 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:06:43 Nov 16, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.589
  load_resource: 522.116
  PetaboxLoader3.resolve: 109.665
  PetaboxLoader3.datanode: 392.248
*/
