---
marp: true
theme: wikipedia
lang: en
title: Let's Try Using A Repository
paginate: true
footer: '<span aria-hidden="true">Intro to Digital Archives &amp; Preservation · Search Activity</span>'
---

<!-- header: '<span class="tab on" aria-hidden="true">Activity</span><span class="tab" aria-hidden="true">Demo</span><span class="tab" aria-hidden="true">Repositories</span><span class="tab" aria-hidden="true">Prompts</span><span class="tab" aria-hidden="true">Timer</span>' -->
<!-- Render: npx @marp-team/marp-cli --html --theme wikipedia-marp-theme.css "03 search activity (marp).md" -o 03-search-activity.html -->

<!-- _class: center -->

# Let's Try Using A Repository

<p class="lead">Let's search digital archives to learn how they work. We'll watch an example, pick a repository, and find a digital record.</p>

---

<!-- header: '<span class="tab" aria-hidden="true">Activity</span><span class="tab on" aria-hidden="true">Demo</span><span class="tab" aria-hidden="true">Repositories</span><span class="tab" aria-hidden="true">Prompts</span><span class="tab" aria-hidden="true">Timer</span>' -->
## Video: Searching Calisphere (CCDL)

<div class="thumb"><div class="vid"><div><div class="play"></div><span>[ VIDEO: Searching Calisphere (CCDL) ]</span></div></div><div class="cap"><b>Figure 1.</b> Searching Calisphere (CCDL). Video demo to come.</div></div>

<!-- Placeholder for the screen recording. -->

---

<!-- header: '<span class="tab" aria-hidden="true">Activity</span><span class="tab" aria-hidden="true">Demo</span><span class="tab on" aria-hidden="true">Repositories</span><span class="tab" aria-hidden="true">Prompts</span><span class="tab" aria-hidden="true">Timer</span>' -->
## Choose a Digital Repository

<div class="nav">
<a href="https://calisphere.org/"><i>1</i>Calisphere</a>
<a href="https://rhizome.org/"><i>2</i>Rhizome</a>
<a href="https://www.bl.uk/"><i>3</i>British Library</a>
<a href="https://archive.org/"><i>4</i>Archive.org</a>
<a href="https://www.si.edu/collections"><i>5</i>Smithsonian</a>
<a href="https://www.loc.gov/"><i>6</i>Library of Congress</a>
<a href="https://www.gutenberg.org/"><i>7</i>Project Gutenberg</a>
<a href="https://www.getty.edu/"><i>8</i>Getty</a>
<a href="https://www.huntington.org/"><i>9</i>Huntington</a>
</div>

<!-- CHECK: links go to each site's home page. Swap in direct collection-search URLs if you'd rather they land on search (e.g. Smithsonian is set to /collections). -->

---

<!-- header: '<span class="tab" aria-hidden="true">Activity</span><span class="tab" aria-hidden="true">Demo</span><span class="tab" aria-hidden="true">Repositories</span><span class="tab on" aria-hidden="true">Prompts</span><span class="tab" aria-hidden="true">Timer</span>' -->
## Prompts

<ol class="prompts">
<li>Find something related to where you grew up</li>
<li>Find something dated 100 years before you were born</li>
<li>Find something purple</li>
<li>Find something meaningful to you in some way</li>
</ol>

---

<!-- header: '<span class="tab" aria-hidden="true">Activity</span><span class="tab" aria-hidden="true">Demo</span><span class="tab" aria-hidden="true">Repositories</span><span class="tab" aria-hidden="true">Prompts</span><span class="tab on" aria-hidden="true">Timer</span>' -->
## Time Remaining

<div class="timer">
<div class="digits" id="clk" role="timer" aria-live="off">10:00</div>
<div class="msg" id="clkmsg"></div>
<div class="btns"><button class="go" id="clkgo" type="button">Start</button><button id="clkreset" type="button">Reset</button></div>
</div>

<script>
(function(){
  var TOTAL=600,left=TOTAL,iv=null;
  var d=document.getElementById("clk"),m=document.getElementById("clkmsg"),
      go=document.getElementById("clkgo"),rs=document.getElementById("clkreset");
  if(!d||!go||!rs)return;
  function show(){
    var mm=Math.floor(left/60),ss=left%60;
    d.textContent=("0"+mm).slice(-2)+":"+("0"+ss).slice(-2);
    d.className="digits"+(left===0?" done":"");
  }
  function stop(){if(iv){clearInterval(iv);iv=null}}
  function tick(){
    left--;show();
    if(left<=0){left=0;show();stop();go.textContent="Start";m.textContent="Time's up!"}
  }
  go.addEventListener("click",function(){
    if(iv){stop();go.textContent="Resume";m.textContent="Paused";return}
    if(left===0)left=TOTAL;
    m.textContent="";go.textContent="Pause";iv=setInterval(tick,1000);show();
  });
  rs.addEventListener("click",function(){stop();left=TOTAL;m.textContent="";go.textContent="Start";show()});
  show();
})();
</script>

<!-- Ten-minute countdown. Click Start; Pause/Resume and Reset work too. No animation. Needs --html when rendering. -->
