let synth = window.speechSynthesis;
let utterance;

function speakText() {
  const text = document.getElementById("text-input").value;
  if (!text) return;
  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fa-IR";
  synth.speak(utterance);
}

function pauseSpeech() {
  if (synth.speaking && !synth.paused) {
    synth.pause();
  }
}

function resumeSpeech() {
  if (synth.paused) {
    synth.resume();
  }
}

function stopSpeech() {
  synth.cancel();
}