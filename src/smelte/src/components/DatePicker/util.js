function decodeLocale(locale) {
  return locale.match(
    /^([a-zA-Z]{2,3})(?:[_-]+([a-zA-Z]{3})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{4})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{2}|\d{3})(?=$|[_-]+))?/
  );
}

export function getWeekDays(locale, firstDayOfWeek) {
  let i = 0;
  var baseDate = new Date(Date.UTC(2017, 0, firstDayOfWeek + 1));
  var weekDays = [];
  for (i = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: "narrow" }));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}

export function weekStart(locale) {
  if (locale === "default") return 0;

  const name = decodeLocale(locale)[4];
  if ("AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g).includes(name)) {
    return 6;
  }
  if (
    "AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW"
      .match(/../g)
      .includes(name)
  ) {
    return 0;
  }
  return 1;
}
