import {
  AccountClassNumber,
  AccountInfo,
  AccountingQuestion,
  BookingQuestion,
  ErrorDetectionQuestion,
  SingleChoiceQuestion,
  TAccountEntry,
} from '../types/accounting';

export interface AccountClassTheme {
  classNum: AccountClassNumber;
  title: string;
  shortLabel: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  headerBg: string;
  accentColorHex: string;
  sideRule: string;
}

export const ACCOUNT_CLASS_THEMES: Record<AccountClassNumber, AccountClassTheme> = {
  0: {
    classNum: 0,
    title: 'Třída 0 — Dlouhodobý majetek',
    shortLabel: 'Tř. 0 · DM',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
    badgeText: 'text-blue-700 dark:text-blue-300',
    borderClass: 'border-blue-200 dark:border-blue-800/70',
    headerBg: 'bg-blue-50/80 dark:bg-blue-950/40',
    accentColorHex: '#2563EB',
    sideRule: 'Aktivní účty (+ MD / - D), oprávky pasivní (- MD / + D)',
  },
  1: {
    classNum: 1,
    title: 'Třída 1 — Zásoby',
    shortLabel: 'Tř. 1 · Zásoby',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/60',
    badgeText: 'text-sky-700 dark:text-sky-300',
    borderClass: 'border-sky-200 dark:border-sky-800/70',
    headerBg: 'bg-sky-50/80 dark:bg-sky-950/40',
    accentColorHex: '#0284C7',
    sideRule: 'Aktivní účty (+ přírůstky na MD / - úbytky na D)',
  },
  2: {
    classNum: 2,
    title: 'Třída 2 — Krátkodobý finanční majetek a úvěry',
    shortLabel: 'Tř. 2 · Finance',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/60',
    badgeText: 'text-teal-700 dark:text-teal-300',
    borderClass: 'border-teal-200 dark:border-teal-800/70',
    headerBg: 'bg-teal-50/80 dark:bg-teal-950/40',
    accentColorHex: '#0D9488',
    sideRule: 'Peněžní prostředky aktivní (+ MD / - D), krátkodobé úvěry pasivní (+ D)',
  },
  3: {
    classNum: 3,
    title: 'Třída 3 — Zúčtovací vztahy a časové rozlišení',
    shortLabel: 'Tř. 3 · Zúčtování',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/60',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    borderClass: 'border-indigo-200 dark:border-indigo-800/70',
    headerBg: 'bg-indigo-50/80 dark:bg-indigo-950/40',
    accentColorHex: '#4F46E5',
    sideRule: 'Pohledávky aktivní (+ MD), závazky pasivní (+ D), časové rozlišení 381–389',
  },
  4: {
    classNum: 4,
    title: 'Třída 4 — Kapitálové účty a dlouhodobé závazky',
    shortLabel: 'Tř. 4 · Kapitál & Rezervy',
    badgeBg: 'bg-violet-50 dark:bg-violet-950/60',
    badgeText: 'text-violet-700 dark:text-violet-300',
    borderClass: 'border-violet-200 dark:border-violet-800/70',
    headerBg: 'bg-violet-50/80 dark:bg-violet-950/40',
    accentColorHex: '#7C3AED',
    sideRule: 'Pasivní účty vlastního kapitálu a rezerv (- MD čerpání / + D tvorba)',
  },
  5: {
    classNum: 5,
    title: 'Třída 5 — Náklady',
    shortLabel: 'Tř. 5 · Náklady',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/60',
    badgeText: 'text-rose-700 dark:text-rose-300',
    borderClass: 'border-rose-200 dark:border-rose-800/70',
    headerBg: 'bg-rose-50/80 dark:bg-rose-950/40',
    accentColorHex: '#E11D48',
    sideRule: 'Výsledkové nákladové účty (+ vznik nákladu vždy na MD / snížení na D)',
  },
  6: {
    classNum: 6,
    title: 'Třída 6 — Výnosy',
    shortLabel: 'Tř. 6 · Výnosy',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    borderClass: 'border-emerald-200 dark:border-emerald-800/70',
    headerBg: 'bg-emerald-50/80 dark:bg-emerald-950/40',
    accentColorHex: '#059669',
    sideRule: 'Výsledkové výnosové účty (+ vznik výnosu vždy na D / snížení na MD)',
  },
  7: {
    classNum: 7,
    title: 'Třída 7 — Závěrkové a podrozvahové účty',
    shortLabel: 'Tř. 7 · Uzávěrka',
    badgeBg: 'bg-slate-100 dark:bg-slate-800/80',
    badgeText: 'text-slate-700 dark:text-slate-300',
    borderClass: 'border-slate-300 dark:border-slate-700',
    headerBg: 'bg-slate-100/90 dark:bg-slate-800/50',
    accentColorHex: '#475569',
    sideRule: '701 Počáteční účet, 702 Konečný účet rozvažný, 710 Účet zisků a ztrát',
  },
  8: {
    classNum: 8,
    title: 'Třída 8 — Vnitropodnikové náklady',
    shortLabel: 'Tř. 8 · Vnitro náklady',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
    badgeText: 'text-amber-700 dark:text-amber-300',
    borderClass: 'border-amber-200 dark:border-amber-800/70',
    headerBg: 'bg-amber-50/80 dark:bg-amber-950/40',
    accentColorHex: '#D97706',
    sideRule: 'Vnitropodnikové náklady středisek a kalkulací (+ MD)',
  },
  9: {
    classNum: 9,
    title: 'Třída 9 — Vnitropodnikové výnosy a zúčtování',
    shortLabel: 'Tř. 9 · Vnitro výnosy',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
    badgeText: 'text-amber-700 dark:text-amber-300',
    borderClass: 'border-amber-200 dark:border-amber-800/70',
    headerBg: 'bg-amber-50/80 dark:bg-amber-950/40',
    accentColorHex: '#D97706',
    sideRule: 'Vnitropodnikové výnosy (+ D) a kalkulační zúčtování',
  },
};

export const CHART_OF_ACCOUNTS: AccountInfo[] = [
  // Třída 0
  { code: '013', name: 'Software', accountClass: 0, nature: 'aktivni', description: 'Nehmotný dlouhodobý majetek nad 80 000 Kč.' },
  { code: '021', name: 'Stavby', accountClass: 0, nature: 'aktivni', description: 'Budovy, haly a stavby bez ohledu na pořizovací cenu.' },
  { code: '022', name: 'Hmotné movité věci a jejich soubory', accountClass: 0, nature: 'aktivni', description: 'Stroje, přístroje, zařízení a dopravní prostředky.' },
  { code: '042', name: 'Pořízení dlouhodobého hmotného majetku', accountClass: 0, nature: 'aktivni', description: 'Kalkulační účet pro soustředění pořizovací ceny DM před zařazením.' },
  { code: '081', name: 'Oprávky ke stavbám', accountClass: 0, nature: 'pasivni', description: 'Kumulované účetní odpisy staveb (korekce aktiv).' },
  { code: '082', name: 'Oprávky k samostatným hmotným movitým věcem', accountClass: 0, nature: 'pasivni', description: 'Kumulované účetní odpisy strojů a vybavení.' },
  // Třída 1
  { code: '111', name: 'Pořízení materiálu', accountClass: 1, nature: 'aktivni', description: 'Kalkulační účet pořízení zásob materiálu (cena + vedlejší pořizovací náklady).' },
  { code: '112', name: 'Materiál na skladě', accountClass: 1, nature: 'aktivni', description: 'Skladová evidence surovin, základního a pomocného materiálu.' },
  { code: '123', name: 'Výrobky', accountClass: 1, nature: 'aktivni', description: 'Vlastní dokončené výrobky na skladě oceněné vlastními náklady.' },
  { code: '132', name: 'Zboží na skladě a v prodejně', accountClass: 1, nature: 'aktivni', description: 'Nakoupené zboží určené k dalšímu prodeji v nezměněném stavu.' },
  // Třída 2
  { code: '211', name: 'Pokladna', accountClass: 2, nature: 'aktivni', description: 'Hotovost v české i cizí měně v pokladně účetní jednotky.' },
  { code: '213', name: 'Ceniny', accountClass: 2, nature: 'aktivni', description: 'Stravenky, poštovní známky, kolky, dálniční známky před spotřebou.' },
  { code: '221', name: 'Bankovní účty', accountClass: 2, nature: 'aktivni', description: 'Peněžní prostředky na běžných účtech u bank (dle VBÚ).' },
  { code: '231', name: 'Krátkodobé bankovní úvěry', accountClass: 2, nature: 'pasivni', description: 'Bankovní úvěry se splatností do 1 roku.' },
  { code: '261', name: 'Peníze na cestě', accountClass: 2, nature: 'aktivne_pasivni', description: 'Překlenovací účet pro převody mezi pokladnou a bankou či dvěma účty.' },
  // Třída 3
  { code: '311', name: 'Pohledávky z obchodních vztahů (Odběratelé)', accountClass: 3, nature: 'aktivni', description: 'Pohledávky za odběrateli dle vystavených faktur (FAV).' },
  { code: '314', name: 'Poskytnuté provozní zálohy', accountClass: 3, nature: 'aktivni', description: 'Zaplacené zálohy dodavatelům před plněním.' },
  { code: '321', name: 'Závazky z obchodních vztahů (Dodavatelé)', accountClass: 3, nature: 'pasivni', description: 'Závazky vůči dodavatelům dle přijatých faktur (FAP).' },
  { code: '324', name: 'Přijaté provozní zálohy', accountClass: 3, nature: 'pasivni', description: 'Krátkodobé zálohy přijaté od odběratelů.' },
  { code: '331', name: 'Zaměstnanci', accountClass: 3, nature: 'pasivni', description: 'Zúčtování hrubých a čistých mezd se zaměstnanci.' },
  { code: '335', name: 'Pohledávky za zaměstnanci', accountClass: 3, nature: 'aktivni', description: 'Poskytnuté zálohy na služební cesty, předepsané manko k náhradě.' },
  { code: '336', name: 'Zúčtování s institucemi SZ a ZP', accountClass: 3, nature: 'pasivni', description: 'Závazky vůči OSSZ a zdravotním pojišťovnám.' },
  { code: '341', name: 'Daň z příjmů', accountClass: 3, nature: 'aktivne_pasivni', description: 'Zálohy na daň z příjmů (MD) a předpis splatné daně z příjmů (D).' },
  { code: '342', name: 'Ostatní přímé daně', accountClass: 3, nature: 'pasivni', description: 'Daň z příjmů ze závislé činnosti a srážková daň vybíraná plátcem.' },
  { code: '343', name: 'Daň z přidané hodnoty (DPH)', accountClass: 3, nature: 'aktivne_pasivni', description: 'Nárok na odpočet DPH na vstupu (MD) a daňová povinnost na výstupu (D).' },
  { code: '355', name: 'Ostatní pohledávky za společníky', accountClass: 3, nature: 'aktivni', description: 'Pohledávky za společníky (např. předpis úhrady ztráty).' },
  { code: '364', name: 'Závazky ke společníkům při rozdělování zisku', accountClass: 3, nature: 'pasivni', description: 'Přiznané podíly na zisku (dividendy) společníkům/akcionářům.' },
  { code: '378', name: 'Jiné pohledávky', accountClass: 3, nature: 'aktivni', description: 'Pohledávky mimo běžný obchodní styk (např. přiznaná náhrada od pojišťovny).' },
  { code: '379', name: 'Jiné závazky', accountClass: 3, nature: 'pasivni', description: 'Ostatní krátkodobé závazky mimo obchodní styk.' },
  // Časové rozlišení a dohadné položky (381-389)
  {
    code: '381',
    name: 'Náklady příštích období (NPO)',
    accountClass: 3,
    nature: 'aktivni',
    taxNote: 'Do základu daně vstupuje až v období věcného a časového rozpuštění do třídy 5.',
    description: 'Výdaj v běžném období (známe přesnou částku i účel), ale náklad věcně patří do příštího období (např. předplacené nájemné, předplatné, pojistné).',
  },
  {
    code: '382',
    name: 'Komplexní náklady příštích období',
    accountClass: 3,
    nature: 'aktivni',
    description: 'Dlouhodobé vícepoložkové náklady příštích období (např. příprava nové výroby, rozsáhlá kampaň), rozpouštěné přes 555.',
  },
  {
    code: '383',
    name: 'Výdaje příštích období (VPO)',
    accountClass: 3,
    nature: 'pasivni',
    taxNote: 'Daňově uznatelné podle věcné podstaty nákladu (u nájemného placeného pozadu platí časové rozlišení dle § 23 ZDP).',
    description: 'Náklad patří do běžného období (známe přesnou částku), ale výdaj (platba/faktura) nastane až v příštím období (např. nájemné placené pozadu).',
  },
  {
    code: '384',
    name: 'Výnosy příštích období (VýPO)',
    accountClass: 3,
    nature: 'pasivni',
    taxNote: 'Zdanitelný výnos vzniká až v období rozpuštění do účtové třídy 6.',
    description: 'Příjem (nebo fakturace) v běžném období, ale výnos věcně patří do příštího období (např. přijaté nájemné předem, prodané předplatné).',
  },
  {
    code: '385',
    name: 'Příjmy příštích období (PPO)',
    accountClass: 3,
    nature: 'aktivni',
    description: 'Výnos věcně patří do běžného období (známe přesnou částku), ale fakturace/příjem proběhne až v příštím období (např. poskytnuté služby vyfakturované pozadu).',
  },
  {
    code: '388',
    name: 'Dohadné účty aktivní (DÚA)',
    accountClass: 3,
    nature: 'aktivni',
    taxNote: 'Zvyšuje účetní i daňový výnos v běžném roce; rozdíl v dalším roce upraví výnosy.',
    description: 'Pohledávka k rozvahovému dni, u níž známe účel a období, ale NEZNÁME přesnou výši (např. nevyčíslená náhrada škody od pojišťovny).',
  },
  {
    code: '389',
    name: 'Dohadné účty pasivní (DÚP)',
    accountClass: 3,
    nature: 'pasivni',
    taxNote: 'Typicky nevyfakturovaná dodávka energií nebo služeb — daňově uznatelný náklad v běžném období.',
    description: 'Závazek k rozvahovému dni, u něhož známe účel a období, ale NEZNÁME přesnou částku, protože do 31. 12. nepřišla faktura (např. spotřeba energií).',
  },
  {
    code: '391',
    name: 'Opravná položka k pohledávkám',
    accountClass: 3,
    nature: 'pasivni',
    description: 'Vyjadřuje přechodné snížení hodnoty rizikových pohledávek po splatnosti.',
  },
  // Třída 4
  { code: '411', name: 'Základní kapitál', accountClass: 4, nature: 'pasivni', description: 'Peněžité a nepeněžité vklady společníků zapsané v obchodním rejstříku.' },
  { code: '413', name: 'Ostatní kapitálové fondy', accountClass: 4, nature: 'pasivni', description: 'Příplatky společníků mimo základní kapitál, dary do vlastního kapitálu.' },
  { code: '419', name: 'Změny základního kapitálu', accountClass: 4, nature: 'aktivne_pasivni', description: 'Překlenovací účet pro zvýšení nebo snížení ZK do doby zápisu do OR.' },
  { code: '421', name: 'Rezervní fond', accountClass: 4, nature: 'pasivni', description: 'Fond tvořený ze zisku ke krytí budoucích ztrát dle stanov.' },
  { code: '423', name: 'Statutární fondy', accountClass: 4, nature: 'pasivni', description: 'Fondy tvořené ze zisku dle společenské smlouvy (např. sociální fond).' },
  { code: '428', name: 'Nerozdělený zisk minulých let', accountClass: 4, nature: 'pasivni', description: 'Zisk z předchozích účetních období ponechaný v podniku.' },
  { code: '429', name: 'Neuhrazená ztráta minulých let', accountClass: 4, nature: 'aktivne_pasivni', description: 'Kumulovaná neuhrazená ztráta z minulých období (snižuje vlastní kapitál).' },
  { code: '431', name: 'Výsledek hospodaření ve schvalovacím řízení', accountClass: 4, nature: 'aktivne_pasivni', description: 'Otevírá se k 1. 1. pro převod zisku nebo ztráty do rozhodnutí valné hromady.' },
  {
    code: '451',
    name: 'Rezervy podle zvláštních právních předpisů (Zákonné)',
    accountClass: 4,
    nature: 'pasivni',
    taxNote: 'Daňově uznatelné při splnění podmínek zákona č. 593/1992 Sb. o rezervách (povinná deponace peněz na zvláštním účtu v bance!).',
    description: 'Zákonná rezerva na opravy hmotného majetku s dobou odpisování 5 a více let.',
  },
  {
    code: '459',
    name: 'Ostatní rezervy (Účetní)',
    accountClass: 4,
    nature: 'pasivni',
    taxNote: 'NEDAŇOVÝ náklad při tvorbě (554/459) — při transformaci VH na základ daně je nutné připočíst k VH!',
    description: 'Účetní rezervy na budoucí rizika a ztráty (záruční opravy, restrukturalizace, soudní spory).',
  },
  { code: '481', name: 'Odložený daňový závazek a pohledávka', accountClass: 4, nature: 'aktivne_pasivni', description: 'Rozdíl mezi účetní a daňovou zůstatkovou cenou majetku.' },
  // Třída 5
  { code: '501', name: 'Spotřeba materiálu', accountClass: 5, nature: 'nakladovy', description: 'Výdej surovin a materiálu do spotřeby (VÚD/výdejka) nebo přímá spotřeba.' },
  { code: '502', name: 'Spotřeba energie', accountClass: 5, nature: 'nakladovy', description: 'Spotřeba elektrické energie, plynu, vody a tepla.' },
  { code: '504', name: 'Prodané zboží', accountClass: 5, nature: 'nakladovy', description: 'Úbytek prodaného zboží ze skladu v pořizovací ceně.' },
  { code: '511', name: 'Opravy a udržování', accountClass: 5, nature: 'nakladovy', description: 'Náklady na uvedení majetku do původního provozuschopného stavu.' },
  { code: '512', name: 'Cestovné', accountClass: 5, nature: 'nakladovy', description: 'Náklady na pracovní cesty zaměstnanců (jízdné, ubytování, stravné).' },
  { code: '513', name: 'Náklady na reprezentaci', accountClass: 5, nature: 'nakladovy', taxNote: 'NEDAŇOVÝ náklad dle § 25 odst. 1 písm. t) ZDP (pohoštění, dary bez loga).', description: 'Pohoštění obchodních partnerů, občerstvení na jednáních, nepropagační dary.' },
  { code: '518', name: 'Ostatní služby', accountClass: 5, nature: 'nakladovy', description: 'Nájemné, poradenské služby, telefony, internet, reklama, předplatné.' },
  { code: '521', name: 'Mzdové náklady', accountClass: 5, nature: 'nakladovy', description: 'Hrubé mzdy zaměstnanců a odměny z dohod.' },
  { code: '524', name: 'Zákonné sociální pojištění', accountClass: 5, nature: 'nakladovy', description: 'Sociální (24,8 %) a zdravotní (9 %) pojištění hrazené zaměstnavatelem (celkem 33,8 %).' },
  { code: '531', name: 'Daň silniční', accountClass: 5, nature: 'nakladovy', description: 'Silniční daň u vybraných těžkých nákladních vozidel.' },
  { code: '532', name: 'Daň z nemovitých věcí', accountClass: 5, nature: 'nakladovy', description: 'Daň z pozemků a staveb (daňově uznatelná při zaplacení).' },
  { code: '543', name: 'Dary', accountClass: 5, nature: 'nakladovy', taxNote: 'Účetně nedaňový náklad (připočítává se k VH), za splnění podmínek § 20 odst. 8 ZDP lze uplatnit jako odčitatelnou položku.', description: 'Bezúplatná plnění poskytnutá na veřejně prospěšné účely.' },
  { code: '544', name: 'Smluvní pokuty a úroky z prodlení', accountClass: 5, nature: 'nakladovy', description: 'Sankce vyplývající z obchodních smluv.' },
  { code: '545', name: 'Ostatní pokuty a penále', accountClass: 5, nature: 'nakladovy', taxNote: 'NEDAŇOVÝ náklad — pokuty od státních orgánů (FÚ, ČSSZ, policie) nikdy nesnižují základ daně.', description: 'Mimosmluvní pokuty a penále vyměřené správci daně či úřady.' },
  { code: '548', name: 'Ostatní provozní náklady', accountClass: 5, nature: 'nakladovy', description: 'Pojistné majetku a odpovědnosti za škodu.' },
  { code: '549', name: 'Manka a škody z provozní činnosti', accountClass: 5, nature: 'nakladovy', taxNote: 'Daňově uznatelné pouze do výše přijaté náhrady (s výjimkou živelních pohrom a neznámého pachatele dle potvrzení PČR).', description: 'Inventarizační manka nad normu a škody na provozním majetku.' },
  { code: '551', name: 'Odpisy dlouhodobého nehmotného a hmotného majetku', accountClass: 5, nature: 'nakladovy', taxNote: 'Účetní odpisy — do základu daně vstupují daňové odpisy dle § 26–33 ZDP (rozdíl upravuje VH).', description: 'Opotřebení dlouhodobého majetku dle odpisového plánu účetní jednotky.' },
  { code: '552', name: 'Tvorba a zúčtování zákonných rezerv', accountClass: 5, nature: 'nakladovy', taxNote: 'Daňově uznatelná tvorba zákonné rezervy (při deponaci peněz).', description: 'Tvorba (MD) a čerpání/zrušení (D) rezerv podle zákona o rezervách.' },
  { code: '554', name: 'Tvorba a zúčtování ostatních rezerv', accountClass: 5, nature: 'nakladovy', taxNote: 'NEDAŇOVÝ náklad při tvorbě účetní rezervy.', description: 'Tvorba (MD) a čerpání/zrušení (D) ostatních účetních rezerv.' },
  { code: '558', name: 'Tvorba a zúčtování zákonných opravných položek', accountClass: 5, nature: 'nakladovy', description: 'Daňově uznatelné opravné položky k pohledávkám.' },
  { code: '559', name: 'Tvorba a zúčtování opravných položek', accountClass: 5, nature: 'nakladovy', taxNote: 'NEDAŇOVÝ náklad (účetní opravná položka).', description: 'Tvorba a zúčtování účetních opravných položek.' },
  { code: '562', name: 'Úroky', accountClass: 5, nature: 'nakladovy', description: 'Nákladové úroky z bankovních úvěrů a zápůjček.' },
  { code: '563', name: 'Kurzové ztráty', accountClass: 5, nature: 'nakladovy', description: 'Nepříznivé kurzové rozdíly při úhradě nebo k 31. 12.' },
  { code: '568', name: 'Ostatní finanční náklady', accountClass: 5, nature: 'nakladovy', description: 'Bankovní poplatky za vedení účtu a platební styk.' },
  { code: '591', name: 'Daň z příjmů z běžné činnosti – splatná', accountClass: 5, nature: 'nakladovy', taxNote: 'Splatná daň z příjmů je сама o sobě nedaňovým nákladem (§ 25 ZDP).', description: 'Předpis vypočtené splatné daně z příjmů právnických osob (sazba 21 %).' },
  { code: '592', name: 'Daň z příjmů z běžné činnosti – odložená', accountClass: 5, nature: 'nakladovy', description: 'Zaúčtování změny stavu odložené daně k rozvahovému dni.' },
  { code: '595', name: 'Dodatečné odvody daně z příjmů', accountClass: 5, nature: 'nakladovy', description: 'Doměrky daně z příjmů za minulá zdaňovací období.' },
  // Třída 6
  { code: '601', name: 'Tržby za vlastní výrobky', accountClass: 6, nature: 'vynosovy', description: 'Tržby z prodeje výrobků vlastní výroby.' },
  { code: '602', name: 'Tržby z prodeje služeb', accountClass: 6, nature: 'vynosovy', description: 'Výnosy z poskytování služeb, oprav, přepravy či poradenství.' },
  { code: '604', name: 'Tržby za zboží', accountClass: 6, nature: 'vynosovy', description: 'Tržby z prodeje nakoupeného zboží v obchodní činnosti.' },
  { code: '613', name: 'Změna stavu výrobků', accountClass: 6, nature: 'vynosovy', description: 'Přírůstek (D) nebo úbytek (MD) zásob vlastních výrobků na skladě.' },
  { code: '621', name: 'Aktivace materiálu a zboží', accountClass: 6, nature: 'vynosovy', description: 'Vlastní výroba materiálu nebo vnitropodniková přeprava zásob.' },
  { code: '622', name: 'Aktivace vnitropodnikových služeb', accountClass: 6, nature: 'vynosovy', description: 'Vnitropodnikové služby (např. vlastní doprava při pořízení DM).' },
  { code: '644', name: 'Smluvní pokuty a úroky z prodlení', accountClass: 6, nature: 'vynosovy', description: 'Vyúčtované smluvní sankce odběratelům.' },
  { code: '648', name: 'Ostatní provozní výnosy', accountClass: 6, nature: 'vynosovy', description: 'Přijaté a přiznané náhrady škod od pojišťovny či zaměstnanců, inventarizační přebytky.' },
  { code: '662', name: 'Úroky', accountClass: 6, nature: 'vynosovy', description: 'Výnosové úroky připsané bankou na běžný či spořicí účet.' },
  { code: '663', name: 'Kurzové zisky', accountClass: 6, nature: 'vynosovy', description: 'Příznivé kurzové rozdíly u devizových pohledávek, závazků a valut.' },
  // Třída 7
  { code: '701', name: 'Počáteční účet rozvažný (PÚR)', accountClass: 7, nature: 'zaverkovy', description: 'Otevírá rozvahové účty k 1. 1. (Aktiva na D PÚR / MD účtu, Pasiva na MD PÚR / D účtu).' },
  { code: '702', name: 'Konečný účet rozvažný (KÚR)', accountClass: 7, nature: 'zaverkovy', description: 'Uzavírá rozvahové účty k 31. 12. (Konečné zůstatky aktiv na MD 702, pasiv na D 702).' },
  { code: '710', name: 'Účet zisků a ztrát (ÚZZ)', accountClass: 7, nature: 'zaverkovy', description: 'Uzavírá výsledkové účty třídy 5 (na MD 710) a třídy 6 (na D 710) a zjišťuje účetní VH.' },
  // Třída 8 a 9
  { code: '801', name: 'Spotřeba materiálu (vnitropodniková)', accountClass: 8, nature: 'vnitropodnikovy', description: 'Evidence spotřeby materiálu podle nákladových středisek.' },
  { code: '811', name: 'Náklady hlavního výrobního střediska', accountClass: 8, nature: 'vnitropodnikovy', description: 'Soustředění přímých a nepřímých nákladů výroby.' },
  { code: '901', name: 'Vnitropodnikové výnosy výrobního střediska', accountClass: 9, nature: 'vnitropodnikovy', description: 'Předání dokončených výrobků na sklad v kalkulovaných vlastních nákladech.' },
];

export function getAccountClassNumber(accountCode: string): AccountClassNumber {
  const cleaned = accountCode.trim();
  const firstDigit = parseInt(cleaned.charAt(0), 10);
  if (!Number.isNaN(firstDigit) && firstDigit >= 0 && firstDigit <= 9) {
    return firstDigit as AccountClassNumber;
  }
  return 3;
}

export function getAccountInfo(accountCode: string): AccountInfo {
  const cleaned = accountCode.trim();
  const found = CHART_OF_ACCOUNTS.find((a) => a.code === cleaned);
  if (found) return found;
  const classNum = getAccountClassNumber(cleaned);
  return {
    code: cleaned || '???',
    name: `Účet ${cleaned}`,
    accountClass: classNum,
    nature: classNum === 5 ? 'nakladovy' : classNum === 6 ? 'vynosovy' : 'aktivne_pasivni',
    description: ACCOUNT_CLASS_THEMES[classNum].title,
  };
}

export function getAccountClassTheme(accountCodeOrClass: string | AccountClassNumber): AccountClassTheme {
  const classNum =
    typeof accountCodeOrClass === 'number'
      ? accountCodeOrClass
      : getAccountClassNumber(accountCodeOrClass);
  return ACCOUNT_CLASS_THEMES[classNum];
}

export function formatCZK(amount: number): string {
  return `${amount.toLocaleString('cs-CZ')} Kč`;
}

export interface LedgerSideItem {
  id: string;
  stepIndex: number;
  document: string;
  date: string;
  description: string;
  amount: number;
  contraAccount: string;
  isInitialBalance?: boolean;
}

export interface ComputedTAccount {
  accountCode: string;
  accountInfo: AccountInfo;
  theme: AccountClassTheme;
  debitEntries: LedgerSideItem[];
  creditEntries: LedgerSideItem[];
  totalDebit: number;
  totalCredit: number;
  endingBalance: number;
  balanceSide: 'MD' | 'D' | 'vyrovnano';
}

export function computeTAccountsForScenario(
  transactions: TAccountEntry[],
  initialBalances: Record<string, { side: 'MD' | 'D'; amount: number }> = {},
  activeStepCount?: number
): ComputedTAccount[] {
  const limit = activeStepCount !== undefined ? activeStepCount : transactions.length;
  const visibleTransactions = transactions.slice(0, limit);

  // Collect all unique account codes in deterministic order
  const accountCodesSet = new Set<string>();
  Object.keys(initialBalances).forEach((code) => accountCodesSet.add(code));
  transactions.forEach((tx) => {
    accountCodesSet.add(tx.debitAccount);
    accountCodesSet.add(tx.creditAccount);
  });

  const sortedCodes = Array.from(accountCodesSet).sort((a, b) => a.localeCompare(b));

  return sortedCodes.map((code) => {
    const accountInfo = getAccountInfo(code);
    const theme = getAccountClassTheme(code);
    const debitEntries: LedgerSideItem[] = [];
    const creditEntries: LedgerSideItem[] = [];

    const initBal = initialBalances[code];
    if (initBal && initBal.amount > 0) {
      const item: LedgerSideItem = {
        id: `init-${code}`,
        stepIndex: 0,
        document: 'PS 01.01.',
        date: '01. 01.',
        description: 'Počáteční stav účtu',
        amount: initBal.amount,
        contraAccount: '701',
        isInitialBalance: true,
      };
      if (initBal.side === 'MD') {
        debitEntries.push(item);
      } else {
        creditEntries.push(item);
      }
    }

    visibleTransactions.forEach((tx, idx) => {
      if (tx.debitAccount === code) {
        debitEntries.push({
          id: `${tx.id}-md`,
          stepIndex: idx + 1,
          document: tx.document,
          date: tx.date,
          description: tx.description,
          amount: tx.amount,
          contraAccount: tx.creditAccount,
        });
      }
      if (tx.creditAccount === code) {
        creditEntries.push({
          id: `${tx.id}-d`,
          stepIndex: idx + 1,
          document: tx.document,
          date: tx.date,
          description: tx.description,
          amount: tx.amount,
          contraAccount: tx.debitAccount,
        });
      }
    });

    const totalDebit = debitEntries.reduce((sum, e) => sum + e.amount, 0);
    const totalCredit = creditEntries.reduce((sum, e) => sum + e.amount, 0);
    const diff = totalDebit - totalCredit;

    let balanceSide: 'MD' | 'D' | 'vyrovnano' = 'vyrovnano';
    if (diff > 0) balanceSide = 'MD';
    if (diff < 0) balanceSide = 'D';

    return {
      accountCode: code,
      accountInfo,
      theme,
      debitEntries,
      creditEntries,
      totalDebit,
      totalCredit,
      endingBalance: Math.abs(diff),
      balanceSide,
    };
  });
}

export function normalizeAccountCode(input: string): string {
  return input.replace(/\s+/g, '').trim();
}

export function parseCZKInput(input: string | number): number {
  if (typeof input === 'number') return input;
  const cleaned = input.replace(/[^\d,-]/g, '').replace(',', '.');
  const parsed = parseFloat(cleaned);
  return Number.isNaN(parsed) ? 0 : Math.round(parsed);
}

export interface EvaluationResult {
  isCorrect: boolean;
  earnedPoints: number;
  maxPoints: number;
  feedbackSummary: string;
  debitCorrect?: boolean;
  creditCorrect?: boolean;
  amountCorrect?: boolean;
}

export function evaluateSingleChoice(
  question: SingleChoiceQuestion,
  selectedOptionId: string
): EvaluationResult {
  const isCorrect = question.correctOptionId === selectedOptionId;
  return {
    isCorrect,
    earnedPoints: isCorrect ? question.points : 0,
    maxPoints: question.points,
    feedbackSummary: isCorrect
      ? 'Výborně! Zvolená souvztažnost i účetní princip odpovídají platným ČÚS.'
      : 'Pozor, tato možnost neodpovídá správnému účetnímu postupu.',
  };
}

export function evaluateBooking(
  question: BookingQuestion,
  enteredDebit: string,
  enteredCredit: string,
  enteredAmount: number
): EvaluationResult {
  const cleanMD = normalizeAccountCode(enteredDebit);
  const cleanD = normalizeAccountCode(enteredCredit);

  const validDebits = [question.expectedDebit, ...(question.acceptableDebits || [])];
  const validCredits = [question.expectedCredit, ...(question.acceptableCredits || [])];

  const debitCorrect = validDebits.includes(cleanMD);
  const creditCorrect = validCredits.includes(cleanD);
  const amountCorrect = Math.abs(enteredAmount - question.expectedAmount) < 1;

  const isCorrect = debitCorrect && creditCorrect && amountCorrect;

  let feedbackSummary = 'Přesné zaúčtování! Strana Má dáti, strana Dal i částka jsou zcela správně.';
  if (!isCorrect) {
    const errors: string[] = [];
    if (!debitCorrect) {
      if (cleanMD === question.expectedCredit && cleanD === question.expectedDebit) {
        errors.push(`Převrácené strany MD a D (místo ${cleanMD} / ${cleanD} má být ${question.expectedDebit} / ${question.expectedCredit})`);
      } else {
        errors.push(`Chybný účet na straně MD (zadáno ${cleanMD || '—'}, správně ${question.expectedDebit})`);
      }
    }
    if (!creditCorrect && !(cleanMD === question.expectedCredit && cleanD === question.expectedDebit)) {
      errors.push(`Chybný účet na straně D (zadáno ${cleanD || '—'}, správně ${question.expectedCredit})`);
    }
    if (!amountCorrect) {
      errors.push(`Chybná částka (zadáno ${formatCZK(enteredAmount)}, správně ${formatCZK(question.expectedAmount)})`);
    }
    feedbackSummary = errors.join(' · ');
  }

  return {
    isCorrect,
    earnedPoints: isCorrect ? question.points : 0,
    maxPoints: question.points,
    feedbackSummary,
    debitCorrect,
    creditCorrect,
    amountCorrect,
  };
}

export function evaluateErrorDetection(
  question: ErrorDetectionQuestion,
  judgedCorrect: boolean,
  selectedCorrectionId?: string
): EvaluationResult {
  if (question.isCorrectlyBooked) {
    const isCorrect = judgedCorrect === true;
    return {
      isCorrect,
      earnedPoints: isCorrect ? question.points : 0,
      maxPoints: question.points,
      feedbackSummary: isCorrect
        ? 'Správně! Zápis v účetním deníku je bez chyby.'
        : 'Tento zápis v deníku byl ve skutečnosti zaúčtován zcela správně.',
    };
  } else {
    const identifiedAsError = judgedCorrect === false;
    const pickedRightCorrection = selectedCorrectionId === question.correctChoiceId;
    const isCorrect = identifiedAsError && pickedRightCorrection;

    let feedbackSummary = 'Výborně! Odhalil(a) jsi chybu v deníku a vybral(a) správnou opravu.';
    if (!identifiedAsError) {
      feedbackSummary = `Chyba nebyla odhalena — zápis v deníku je chybný (správně má být MD ${question.correctDebit} / D ${question.correctCredit}, ${formatCZK(question.correctAmount)}).`;
    } else if (!pickedRightCorrection) {
      feedbackSummary = `Správně jsi poznal(a), že zápis obsahuje chybu, ale vybraná oprava nebyla přesná (správně: MD ${question.correctDebit} / D ${question.correctCredit}, ${formatCZK(question.correctAmount)}).`;
    }

    return {
      isCorrect,
      earnedPoints: isCorrect ? question.points : 0,
      maxPoints: question.points,
      feedbackSummary,
    };
  }
}

export function evaluateQuestion(
  question: AccountingQuestion,
  input: {
    selectedOptionId?: string;
    enteredDebit?: string;
    enteredCredit?: string;
    enteredAmount?: number;
    judgedCorrect?: boolean;
    selectedCorrectionId?: string;
  }
): EvaluationResult {
  switch (question.type) {
    case 'single_choice':
      return evaluateSingleChoice(question, input.selectedOptionId || '');
    case 'booking':
      return evaluateBooking(
        question,
        input.enteredDebit || '',
        input.enteredCredit || '',
        input.enteredAmount ?? 0
      );
    case 'error_detection':
      return evaluateErrorDetection(
        question,
        input.judgedCorrect ?? true,
        input.selectedCorrectionId
      );
  }
}

export function buildTestQuestions(
  allTopics: { id: number; questions: AccountingQuestion[] }[],
  selectedTopicIds: number[],
  length: number,
  allowedTypes: ('single_choice' | 'booking' | 'error_detection')[] = [
    'single_choice',
    'booking',
    'error_detection',
  ]
): AccountingQuestion[] {
  const effectiveTypes =
    allowedTypes.length > 0
      ? allowedTypes
      : (['single_choice', 'booking', 'error_detection'] as const);

  // Primary pool from selected topics
  const primaryPool = allTopics
    .filter((t) => selectedTopicIds.includes(t.id))
    .flatMap((t) => t.questions)
    .filter((q) => effectiveTypes.includes(q.type));

  // Secondary pool from other topics if selected topics have fewer questions than requested length
  const secondaryPool = allTopics
    .filter((t) => !selectedTopicIds.includes(t.id))
    .flatMap((t) => t.questions)
    .filter((q) => effectiveTypes.includes(q.type));

  const combined = [...primaryPool];
  for (const q of secondaryPool) {
    if (combined.length >= length) break;
    if (!combined.some((existing) => existing.id === q.id)) {
      combined.push(q);
    }
  }

  // If still fewer than requested (e.g. single question type filter with length 30), fall back to all questions
  if (combined.length < length) {
    const allQuestions = allTopics.flatMap((t) => t.questions);
    for (const q of allQuestions) {
      if (combined.length >= length) break;
      if (!combined.some((existing) => existing.id === q.id)) {
        combined.push(q);
      }
    }
  }

  return combined.slice(0, length);
}

