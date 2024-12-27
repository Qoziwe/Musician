export const texts = [
  {
    key: "Midnight Madonna",
    verse: `
    <p>
    In the final night bring sundown forever <br>
    In the darkest time we follow the trail of this game<br>
    In the fullmoon light the godless endeavor<br>
    Stand pale and lunar<br>
    </p><br>
    <p>
    On a dead end sky so restless but ever<br>
    Giving up the fight, we bring back the blood in your name<br>
    And again tonight<br>
    Let out a beast you can't tame<br>
    </p><br>
    <p>
    -Chorus 1x-
    </p><br>
    <p>
    In the primal dawn, bring blood from the living<br>
    On the sabbath morn, we strike back and leave no farewell<br>
    And a foreign might, held strong by the father's hand<br>
    Sanguine order<br>
    </p><br>
    <p>
    On a sabbath night, so faithless but never<br>
    Living up defied, we bring back the saints of despair<br>
    And before the dawn<br>
    Sacred and borne on the air<br>
    </p><br>
    <p>
    -Chorus 1x-
    </p><br>
    `,
    chorus: `
    <p>---Chorus---</p><br>
    <p>
    Come raise your hands and fight<br>
    Get alive and wake your might<br>
    Midnight Madonna<br>
    come<br>
    Get alive and break the light<br>
    Midnight Madonna<br>
    </p>
    `,
  },
  {
    key: "Moskau",
    verse: `
    <p>
    [Это песня о самом прекрасном городе в мире - МОСКВА]<br><br>

    Diese Stadt ist eine Dirne<br>
    Hat rote Flecken auf der Stirn<br>
    Ihre Zahne sind aus Gold<br>
    Sie ist fett und doch so hold<br>
    Ihr Mund fallt mir zu Tale<br>
    Wenn ich sie dafur bezahle<br>
    Sie zieht sich aus doch nur fur Geld<br>
    Die Stadt die mich in Atem halt<br>

    <br> -Chorus 1x-<br>

    Sie ist alt und trotzdem schon<br>
    Ich kann ihr nicht widerstehen (не могу устоять)<br>
    Pudert sich die alte Haut<br>
    Hat sich die Bruste neu gebaut (построила вновь)<br>
    Sie macht mich geil ich leide Qualen<br>
    Sie tanzt fur mich ich muss bezahlen (я должен платить)<br>
    Sie schlaft mit mir doch nur fur Geld<br>
    Ist doch die schonste Stadt der Welt (поехали!)<br>

    <br>-Chorus 2x-<br>

    <br>(Раз, два, три)<br>

    Ich sehe was was du nicht siehst<br>
    (Когда ты ночью крепко спишь)<br>
    Ich sehe was was du nicht siehst<br>
    (Когда ты предо мной лежишь)<br>
    Ich sehe was was du nicht siehst<br>
    (Когда со мною говоришь)<br>
    Ich sehe was das siehst du nie<br>
    (раз, два, три)<br>

    <br>-Chorus 2x-<br>
    </p>
    `,
    chorus: `
    <p>
    ---Chorus---<br><br>
    Москва (Раз, два, три)<br>
    Москва (Посмотри)<br>
    (Пионеры там и тут<br>
    Песни Ленину поют)<br>
    </p>
    `,
  },
  {
    key: "Zlo",
    verse: `
    <p>
    Думаю, что ты не вспомнишь все<br>
    Мои черты лица<br>
    Но я знаю, что твой дом<br>
    У трамвайного кольца<br>
    Ты красива, словно фьорд<br>
    Как удар через себя<br>
    Я боюсь, моя любовь<br>
    Слегка больна<br>

    <br>-Chorus1 1x-<br><br>

    Да, я не держал в руках винтовку<br>
    И в Fallout не играл<br>
    В этой жизни я пока<br>
    В общем-то не умирал<br>
    Мне известно, что ты пьешь<br>
    С кем ты спишь, о чем ты врешь<br>
    Как тянулись дни твои<br>
    Без слез, без жизни, без любви<br>

    <br>-Chorus2 1x-<br><br>

    Ой, кто-то плачет за стеной<br>
    Может, это домовой?<br>
    Кто-то вскрикнул за стеной<br>
    Мы повязаны с тобой<br><br>

    Мы с тобой да мы с тобой<br>
    Мы с тобой да мы с тобой<br>

    <br>-Chorus3 1x-<br><br>

    Что, если жажда делать зло<br>
    Стала чуть сильней, чем я?<br>
    Если в руки взял ружье<br>
    Значит будь готов стрелять<br>
    </p>
    `,
    chorus: `
    <p>
    <br>---Chorus 1---<br>
    Но что, если жажда делать зло<br>
    Станет чуть сильнее?<br>
    Если на стене ружье<br>
    Значит кто-нибудь умрет<br>

    <br>---Chorus 2---<br>
    Но что, если жажда делать зло<br>
    Станет чуть сильнее?<br>
    Если зарядил ружье<br>
    Значит уже поздно<br>

    <br>---Chorus 3---<br>
    Но что, если тяга делать зло<br>
    Станет чуть сильней, чем я?<br>
    Это мне не повезло<br>
    Не устоять<br>
    `,
  },
  {
    key: "Odnazdy",
    verse: "3",
    chorus: "3",
  },
  {
    key: "Stuk",
    verse: "4",
    chorus: "4",
  },
  {
    key: "Peremen",
    verse: "5",
    chorus: "5",
  },
];
const VerseText = document.getElementById("MC-MWC-M-Verse");
const ChorusText = document.getElementById("MC-MWC-M-Chorus");

export function songsTextsFunction(n) {
  VerseText.innerHTML = texts[n].verse;
  ChorusText.innerHTML = texts[n].chorus;
}
