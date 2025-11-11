(function () {
  var tag = document.currentScript;
  var src = (tag && tag.dataset && tag.dataset.audio) ? tag.dataset.audio : "Sound/Sound.mp3";

  var audio = document.createElement("audio");
  audio.autoplay = true;
  audio.loop = true;
  audio.hidden = true;
  var source = document.createElement("source");
  source.src = src;
  source.type = "audio/mpeg";
  audio.appendChild(source);
  document.body.appendChild(audio);

  var url = new URL(location.href);
  var t = parseFloat(url.searchParams.get("t") || "0");
  function startAt(time) {
    audio.addEventListener("loadedmetadata", function onMeta() {
      audio.removeEventListener("loadedmetadata", onMeta);
      if (!isNaN(time) && time > 0) audio.currentTime = Math.min(time, audio.duration || time);
      audio.play().catch(function(){  });
    });
  }
  startAt(t);

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a) return;
    if (a.target && a.target !== "" && a.target !== "_self") return; // nouveaux onglets ok
    var next = new URL(a.href, location.href);
    if (next.origin !== location.origin) return; // liens externes : ne rien faire

    e.preventDefault();
    next.searchParams.set("t", (audio.currentTime || 0).toFixed(2));
    location.href = next.href;
  });
})();