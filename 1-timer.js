import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as m,i as s}from"./assets/vendor-BbbuE1sJ.js";const r=document.querySelector("button[data-start]"),a=document.querySelector("#datetime-picker"),f=document.querySelector(".value[data-days]"),h=document.querySelector(".value[data-hours]"),p=document.querySelector(".value[data-minutes]"),y=document.querySelector(".value[data-seconds]");let i=0;const v={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0]-Date.now()>0?(r.disabled=!1,i=e[0]):(r.disabled=!0,s.error({title:"Error",message:"Please choose a date in the future",position:"topRight",theme:"dark",closeOnEscape:!0}))}};m("#datetime-picker",v);r.addEventListener("click",C);function C(){r.disabled=!0,a.disabled=!0;const e=setInterval(()=>{const o=i-Date.now();if(o<=0){clearInterval(e),a.disabled=!1,s.info({title:"Notification",message:"The timer has expired",position:"topRight",theme:"dark",closeOnEscape:!0});return}const t=S(o);y.textContent=n(t.seconds),p.textContent=n(t.minutes),h.textContent=n(t.hours),f.textContent=n(t.days)},1e3)}function n(e){return e.toString().padStart(2,"0")}function S(e){const c=Math.floor(e/864e5),u=Math.floor(e%864e5/36e5),d=Math.floor(e%864e5%36e5/6e4),l=Math.floor(e%864e5%36e5%6e4/1e3);return{days:c,hours:u,minutes:d,seconds:l}}
//# sourceMappingURL=1-timer.js.map
