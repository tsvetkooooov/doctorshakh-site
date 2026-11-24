/*
  Аналитика подготовлена, но выключена до получения идентификаторов.
  После создания счетчиков достаточно заполнить два значения ниже.
  Скрипты загружаются асинхронно: недоступность сервиса аналитики
  не блокирует страницу, форму и кнопки покупки.
*/
const YANDEX_METRICA_ID = '';
const GOOGLE_ANALYTICS_ID = '';

const loadScript = (src) => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  script.onload = resolve;
  script.onerror = reject;
  document.head.append(script);
});

if (YANDEX_METRICA_ID) {
  window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
  window.ym.l = Date.now();
  loadScript('https://mc.yandex.ru/metrika/tag.js')
    .then(() => window.ym(Number(YANDEX_METRICA_ID), 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: false
    }))
    .catch(() => {});
}

if (GOOGLE_ANALYTICS_ID) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ANALYTICS_ID, { anonymize_ip: true });
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ANALYTICS_ID)}`)
    .catch(() => {});
}

window.trackSiteEvent = (eventName, params = {}) => {
  if (YANDEX_METRICA_ID && typeof window.ym === 'function') {
    window.ym(Number(YANDEX_METRICA_ID), 'reachGoal', eventName, params);
  }
  if (GOOGLE_ANALYTICS_ID && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};
