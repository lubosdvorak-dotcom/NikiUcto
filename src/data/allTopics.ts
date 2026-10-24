import { AccountingTopic } from '../types/accounting';
import { TOPIC_1_ACCRUALS } from './topic1-accruals';

export const TOPIC_2_INCOME_TAX: AccountingTopic = {
  id: 2,
  slug: 'vysledek-hospodareni-a-dan-z-prijmu-po',
  title: 'Výsledek hospodaření a daň z příjmů PO',
  shortTitle: 'VH a daň z příjmů PO',
  description:
    'Zjištění účetního výsledku hospodaření před zdaněním, transformace na základ daně z příjmů právnických osob (§ 23–25 ZDP), výpočet splatné (591/341) a odložené daně (592/481).',
  keyAccounts: ['591', '592', '341', '481', '513', '543', '545', '551'],
  accountClasses: [3, 4, 5, 6],
  estimatedMinutes: 40,
  examWeightPercent: 20,
  studyCards: [
    {
      id: 't2-card-1',
      topicId: 2,
      order: 1,
      title: 'Transformace účetního VH na základ daně (DPPO)',
      subtitle: 'Připočitatelné (+) a odčitatelné (−) položky mimo účetní soustavu',
      keyAccounts: ['513', '543', '545', '551', '554', '591', '341'],
      corePrinciple:
        'Účetní výsledek hospodaření před zdaněním (Výnosy třídy 6 mínus Náklady třídy 5 bez skupin 59) upravujeme mimoúčetně v daňovém přiznání: připočítáváme daňově neuznatelné náklady (§ 25 ZDP) a odečítáme nezdanitelné výnosy nebo převyšující daňové odpisy.',
      legislativeRule:
        '§ 23 až § 25 zákona č. 586/1992 Sb., o daních z příjmů (ZDP). Sazba daně z příjmů PO činí 21 % ze základu daně zaokrouhleného na celé tisíce Kč dolů.',
      commonMistake:
        'Studenti při výpočtu zapomínají, že kladný rozdíl (Účetní odpisy > Daňové odpisy) základ daně ZVYŠUJE (+), zatímco pokud jsou Daňové odpisy > Účetní odpisy, rozdíl základ daně SNIŽUJE (−).',
      taxDeductibilityRule:
        'Mezi nejčastější nedaňové náklady u maturity patří: 513 Reprezentace, 543 Dary, 545 Pokuty od státních orgánů, 554 Tvorba účetních rezerv a 549 Manka a škody nad výši náhrady.',
      scenarioTitle: 'Modelový příklad: Zálohy na daň a předpis splatné daně z příjmů PO',
      scenarioContext:
        'Společnost zaplatila během roku 2026 dvě pololetní zálohy na daň z příjmů po 60 000 Kč (celkem 120 000 Kč). K 31. 12. 2026 vypočetla v daňovém přiznání celkovou splatnou daň z příjmů PO ve výši 168 000 Kč.',
      transactions: [
        {
          id: 't2-c1-tx1',
          document: 'VBÚ 64/2026',
          date: '15. 06. 2026',
          description: 'Úhrada 1. a 2. zálohy na daň z příjmů právnických osob finančnímu úřadu',
          amount: 120000,
          debitAccount: '341',
          creditAccount: '221',
          pedagogicalHint:
            'Zaplacené zálohy na daň z příjmů NEJSOU nákladem! Účtují se jako pohledávka za finančním úřadem na MD 341 proti bance D 221.',
          taxImpact: 'Samotná platba zálohy neovlivňuje výsledek hospodaření.',
        },
        {
          id: 't2-c1-tx2',
          document: 'VÚD 108/2026',
          date: '31. 12. 2026',
          description: 'Předpis celkové splatné daně z příjmů PO dle daňového přiznání (21 % ze základu daně)',
          amount: 168000,
          debitAccount: '591',
          creditAccount: '341',
          pedagogicalHint:
            'K 31. 12. předepíšeme CELOU vypočtenou daň na MD 591 / D 341 (168 000 Kč). Na účtu 341 se tím automaticky započtou zálohy (MD 120 000 vs. D 168 000 => zůstatek D 48 000 Kč k doplacení).',
          taxImpact: 'Účet 591 snižuje čistý (disponibilní) zisk po zdanění, ale sám je daňově neuznatelný.',
        },
      ],
    },
    {
      id: 't2-card-2',
      topicId: 2,
      order: 2,
      title: 'Odložená daň (592 / 481) a doměrky daně za minulá léta (595)',
      subtitle: 'Proč vzniká odložený daňový závazek z rozdílu účetní a daňové zůstatkové ceny majetku',
      keyAccounts: ['592', '481', '595', '341'],
      corePrinciple:
        'Odložená daň vyrovnává dočasné rozdíly mezi účetním a daňovým pohledem na majetek (nejčastěji když daňové odpisy zpočátku převyšují účetní odpisy a v budoucnu tomu bude naopak).',
      legislativeRule:
        'ČÚS č. 003 — Odložená daň. Povinně ji účtují účetní jednotky, které tvoří konsolidační celek nebo podléhají povinnému auditu.',
      commonMistake:
        'Záměna účtu 591 (splatná daň placená finančnímu úřadu letos) za 592 (odložená daň, která se finančnímu úřadu letos NEPLATÍ, účtuje se proti 481).',
      taxDeductibilityRule:
        'Účty účtové skupiny 59 (591, 592, 595) jsou vždy daňově neuznatelné.',
      scenarioTitle: 'Modelový příklad: Tvorba odloženého daňového závazku',
      scenarioContext:
        'U nového výrobního stroje je účetní zůstatková cena o 100 000 Kč vyšší než daňová zůstatková cena. Při sazbě daně 21 % vzniká odložený daňový závazek 21 000 Kč.',
      transactions: [
        {
          id: 't2-c2-tx1',
          document: 'VÚD 109/2026',
          date: '31. 12. 2026',
          description: 'Zaúčtování tvorby odloženého daňového závazku k rozvahovému dni (21 % ze 100 000 Kč)',
          amount: 21000,
          debitAccount: '592',
          creditAccount: '481',
          pedagogicalHint:
            'Tvorba odloženého daňového závazku zvyšuje daňový náklad běžného období (MD 592) a vytváří dlouhodobou pasivní položku na D 481.',
          taxImpact: 'Nedaňový náklad — slouží k věrnému zobrazení budoucí daňové zátěže.',
        },
      ],
    },
  ],
  cheatSheets: [
    {
      id: 't2-cs-1',
      title: 'Schéma transformace VH na základ daně a zaúčtování daně',
      summary: 'Krok za krokem od účetního zisku před zdaněním k čistému zisku po zdanění.',
      items: [
        {
          id: 'cs2-1',
          operation: 'Zaplacení zálohy na daň z příjmů v průběhu roku',
          document: 'VBÚ',
          debitAccount: '341',
          creditAccount: '221',
          conditionOrNote: 'Záloha snižuje budoucí doplatek daně na účtu 341',
          taxDeductible: 'ne',
        },
        {
          id: 'cs2-2',
          operation: 'Předpis splatné daně z příjmů PO k 31. 12.',
          document: 'VÚD',
          debitAccount: '591',
          creditAccount: '341',
          conditionOrNote: 'Základ daně zaokrouhlen na celé tisíce Kč dolů × 21 %',
          taxDeductible: 'ne',
        },
        {
          id: 'cs2-3',
          operation: 'Tvorba odloženého daňového závazku',
          document: 'VÚD',
          debitAccount: '592',
          creditAccount: '481',
          conditionOrNote: 'Když účetní ZC majetku > daňová ZC majetku',
          taxDeductible: 'ne',
        },
        {
          id: 'cs2-4',
          operation: 'Doměrek daně z příjmů za minulá léta po kontrole FÚ',
          document: 'VÚD',
          debitAccount: '595',
          creditAccount: '341',
          conditionOrNote: 'Dodatečný odvod daně z příjmů za předchozí období',
          taxDeductible: 'ne',
        },
      ],
    },
  ],
  questions: [
    {
      id: 't2-q1',
      topicId: 2,
      type: 'single_choice',
      difficulty: 'medium',
      title: 'Výpočet základu daně z příjmů PO',
      prompt:
        'Společnost vykázala účetní výsledek hospodaření před zdaněním (zisk) 800 000 Kč. V nákladech má zaúčtováno: pohoštění obchodních partnerů (513) 30 000 Kč, pokutu od finančního úřadu (545) 10 000 Kč a účetní odpisy (551) 150 000 Kč. Daňové odpisy dle ZDP činí 190 000 Kč. Jaký je základ daně před uplatněním odčitatelných položek?',
      options: [
        { id: 'a', text: '800 000 + 30 000 + 10 000 − 40 000 = 800 000 Kč' },
        { id: 'b', text: '800 000 + 30 000 + 10 000 + 40 000 = 880 000 Kč' },
        { id: 'c', text: '800 000 − 30 000 − 10 000 − 40 000 = 720 000 Kč' },
        { id: 'd', text: '800 000 + 150 000 + 190 000 = 1 140 000 Kč' },
      ],
      correctOptionId: 'a',
      explanation:
        'K účetnímu zisku 800 000 Kč připočteme nedaňové náklady: reprezentaci (+30 000 Kč) a pokutu od FÚ (+10 000 Kč). Protože daňové odpisy (190 000 Kč) jsou o 40 000 Kč vyšší než účetní odpisy (150 000 Kč), rozdíl 40 000 Kč základ daně SNIŽUJE (−40 000 Kč). Výsledek: 800 000 + 30 000 + 10 000 − 40 000 = 800 000 Kč.',
      principleExplanation:
        'Nedaňové náklady (§ 25 ZDP) účetní zisk snížily, proto je musíme vrátit zpět (+). Vyšší daňové než účetní odpisy naopak znamenají, že daňově můžeme uplatnit o 40 000 Kč více (−).',
      relatedAccounts: ['513', '545', '551', '591'],
      points: 4,
    },
    {
      id: 't2-q2',
      topicId: 2,
      type: 'booking',
      difficulty: 'easy',
      title: 'Předpis splatné daně z příjmů PO k 31. 12.',
      prompt:
        'Upravený a zaokrouhlený základ daně společnosti činí 1 000 000 Kč. Sazba daně z příjmů PO je 21 %. Zaúčtujte k 31. 12. 2026 předpis splatné daně z příjmů (VÚD). (Během roku byly zaplaceny zálohy 150 000 Kč na účet 341).',
      documentType: 'VÚD 115/2026',
      transactionDate: '31. 12. 2026',
      expectedDebit: '591',
      expectedCredit: '341',
      expectedAmount: 210000,
      calculationHint: 'Předepisuje se CELÁ splatná daň (21 % z 1 000 000 Kč = 210 000 Kč), nikoli jen doplatek po odečtení záloh!',
      explanation:
        'Předpis splatné daně z příjmů se účtuje vždy v plné vypočtené výši 210 000 Kč zápisem MD 591 (Daň z příjmů – splatná) / D 341 (Daň z příjmů). Zaplacené zálohy (150 000 Kč) již leží na MD 341, takže konečný zůstatek účtu 341 bude pasivní 60 000 Kč (nedoplatek daně).',
      principleExplanation:
        'Do výsledovky (účet 591) musí vstoupit celá daňová povinnost za daný rok (210 000 Kč), nikoliv jen nedoplatek.',
      relatedAccounts: ['591', '341'],
      points: 3,
    },
    {
      id: 't2-q3',
      topicId: 2,
      type: 'error_detection',
      difficulty: 'medium',
      title: 'Kontrola deníku: Zaplacení zálohy na daň z příjmů v průběhu roku',
      prompt:
        'Dne 15. 9. 2026 uhradila společnost z běžného účtu čtvrtletní zálohu na daň z příjmů PO ve výši 45 000 Kč. Zkontrolujte zápis v účetním deníku:',
      journalRow: {
        document: 'VBÚ 84/2026',
        date: '15. 09. 2026',
        description: 'Zaplacena čtvrtletní záloha na daň z příjmů PO',
        amount: 45000,
        debit: '591',
        credit: '221',
      },
      isCorrectlyBooked: false,
      errorCategory: 'wrong_account',
      correctDebit: '341',
      correctCredit: '221',
      correctAmount: 45000,
      correctionChoices: [
        {
          id: 'c1',
          label: 'MD 341 (Daň z příjmů) / D 221 (Bankovní účty) — 45 000 Kč',
          debit: '341',
          credit: '221',
          amount: 45000,
        },
        {
          id: 'c2',
          label: 'MD 538 (Ostatní daně a poplatky) / D 221 (Bankovní účty) — 45 000 Kč',
          debit: '538',
          credit: '221',
          amount: 45000,
        },
        {
          id: 'c3',
          label: 'MD 381 (Náklady příštích období) / D 221 (Bankovní účty) — 45 000 Kč',
          debit: '381',
          credit: '221',
          amount: 45000,
        },
      ],
      correctChoiceId: 'c1',
      explanation:
        'Záloha na daň z příjmů placená během roku se NIKDY neúčtuje do nákladů na účet 591! V průběhu roku jde o zúčtovací vztah (pohledávku z titulu zaplacených záloh) na MD 341 / D 221. Náklad na účtu 591 vzniká až k 31. 12. při předpisu skutečné daně.',
      principleExplanation:
        'Záloha je pouze předběžnou platbou. Skutečná daňová povinnost je známa až na konci účetního období.',
      relatedAccounts: ['341', '591', '221'],
      points: 3,
    },
    {
      id: 't2-q4',
      topicId: 2,
      type: 'single_choice',
      difficulty: 'easy',
      title: 'Daňová uznatelnost nákladů dle ZDP',
      prompt:
        'Který z následujících nákladů je pro obchodní korporaci plně DAŇOVĚ UZNATELNÝ bez dalších omezujících podmínek?',
      options: [
        { id: 'a', text: 'Zákonné sociální a zdravotní pojištění hrazené zaměstnavatelem za zaměstnance (účet 524)' },
        { id: 'b', text: 'Občerstvení a pohoštění na obchodním jednání s klientem (účet 513)' },
        { id: 'c', text: 'Penále vyměřené správou sociálního zabezpečení za pozdní odvod pojistného (účet 545)' },
        { id: 'd', text: 'Tvorba účetní rezervy na restrukturalizaci podniku (účet 554)' },
      ],
      correctOptionId: 'a',
      explanation:
        'Zákonné sociální a zdravotní pojištění hrazené zaměstnavatelem (33,8 % z hrubých mezd, účet 524) je plně daňově uznatelným nákladem dle § 24 odst. 2 písm. f) ZDP. Ostatní uvedené položky (513, 545, 554) jsou daňově neuznatelné.',
      principleExplanation:
        'Mzdové náklady (521) a zákonné pojistné (524) slouží k dosažení, zajištění a udržení zdanitelných příjmů.',
      relatedAccounts: ['524', '513', '545', '554'],
      points: 2,
    },
  ],
};

export const TOPIC_3_CLOSING: AccountingTopic = {
  id: 3,
  slug: 'ucetni-uzaverka-a-zaverka',
  title: 'Účetní uzávěrka a závěrka (702, 710, inventarizace)',
  shortTitle: 'Uzávěrka a závěrka',
  description:
    'Inventarizace majetku a závazků (manka, přebytky, opravné položky, kurzové rozdíly k 31. 12.), uzavírání účtů přes 710 (ÚZZ) a 702 (KÚR) a sestavení účetních výkazů.',
  keyAccounts: ['701', '702', '710', '549', '648', '335', '563', '663'],
  accountClasses: [1, 2, 3, 5, 6, 7],
  estimatedMinutes: 35,
  examWeightPercent: 18,
  studyCards: [
    {
      id: 't3-card-1',
      topicId: 3,
      order: 1,
      title: 'Inventarizační rozdíly: Manka a přebytky zásob a pokladny',
      subtitle: 'Kdy vzniká manko (549/569), kdy přebytek (648/668) a jak účtujeme předpis náhrady hmotně odpovědnému zaměstnanci (335)',
      keyAccounts: ['549', '648', '335', '112', '211'],
      corePrinciple:
        'Při inventarizaci porovnáváme skutečný stav (fyzická/dokladová inventura) se stavem účetním. Pokud je skutečný stav nižší než účetní, jde o MANKO (u pokladny a cenin SCHODEK). Pokud je vyšší, jde o PŘEBYTEK.',
      legislativeRule:
        '§ 29 a § 30 Zákona o účetnictví + ČÚS č. 007. Pozor: Manko na materiálu/zboží na skladě (MD 549 / D 112, 132) a předepsaná náhrada zaměstnanci (MD 335 / D 648) se NIKDY nesmějí vzájemně kompenzovat!',
      commonMistake:
        'Zaúčtování manka rovnou na MD 335 / D 112 bez použití výsledkových účtů 549 a 648 — to je hrubé porušení zákazu kompenzace nákladů a výnosů!',
      taxDeductibilityRule:
        'Manko a škoda (549) jsou daňově uznatelné pouze do výše přijaté/předepsané náhrady na účtu 648. Pokud zaměstnanci předepíšeme 100 % náhrady, je celé manko daňově uznatelné.',
      scenarioTitle: 'Modelový příklad: Inventarizační manko materiálu s předpisem náhrady skladníkovi',
      scenarioContext:
        'Při roční inventuře skladu materiálu bylo zjištěno zaviněné manko nad normu přirozených úbytků ve výši 8 500 Kč. Skladník má podepsanou dohodu o odpovědnosti a manko mu bylo předepsáno k plné náhradě.',
      initialBalances: {
        '112': { side: 'MD', amount: 120000 },
      },
      transactions: [
        {
          id: 't3-c1-tx1',
          document: 'VÚD 85/2026',
          date: '31. 12. 2026',
          description: 'Vyúčtování inventarizačního manka na materiálu nad normu přirozených úbytků',
          amount: 8500,
          debitAccount: '549',
          creditAccount: '112',
          pedagogicalHint:
            'Úbytek materiálu na skladě účtujeme na D 112 a provozní náklad na manka a škody na MD 549.',
          taxImpact: 'Náklad 8 500 Kč (daňově uznatelný do výše náhrady na 648).',
        },
        {
          id: 't3-c1-tx2',
          document: 'VÚD 86/2026',
          date: '31. 12. 2026',
          description: 'Předpis náhrady manka hmotně odpovědnému skladníkovi',
          amount: 8500,
          debitAccount: '335',
          creditAccount: '648',
          pedagogicalHint:
            'Vzniká pohledávka za zaměstnancem (MD 335) a ostatní provozní výnos (D 648). Náklad a výnos účtujeme odděleně!',
          taxImpact: 'Zdanitelný výnos 8 500 Kč — plně pokrývá manko na 549.',
        },
      ],
    },
    {
      id: 't3-card-2',
      topicId: 3,
      order: 2,
      title: 'Uzavírání účetních knih: Účet zisků a ztrát (710) a KÚR (702)',
      subtitle: 'Technika převodu výsledkových a rozvahových účtů a převod zisku či ztráty mezi 710 a 702',
      keyAccounts: ['710', '702', '501', '601', '221', '411'],
      corePrinciple:
        'Nákladové účty (tř. 5) mají zůstatek na MD -> uzavíráme je ze strany D na MD 710. Výnosové účty (tř. 6) mají zůstatek na D -> uzavíráme je ze strany MD na D 710. Aktivní účty uzavíráme na MD 702, pasivní na D 702.',
      legislativeRule:
        '§ 17 Zákona o účetnictví: Účetní knihy se uzavírají k poslednímu dni účetního období. Zisk (výnosy > náklady) vyrovnává obě závěrkové tabulky zápisem MD 710 / D 702.',
      commonMistake:
        'Při převodu účetního zisku studenti zamění strany mezi 710 a 702. Pomůcka: Zisk zvyšuje vlastní kapitál (Pasiva na D 702), proto se zisk vždy účtuje MD 710 / D 702!',
      taxDeductibilityRule:
        'Závěrkové účty třídy 7 slouží k uzavření knih po zaúčtování daně z příjmů.',
      scenarioTitle: 'Modelový příklad: Uzavření nákladů, výnosů a převod účetního zisku',
      scenarioContext:
        'Podnik má k 31. 12. celkové náklady (reprezentované účtem 501) 600 000 Kč a celkové výnosy (reprezentované účtem 601) 950 000 Kč. Sleduj uzavření na účet 710 a převod zisku 350 000 Kč na 702.',
      initialBalances: {
        '501': { side: 'MD', amount: 600000 },
        '601': { side: 'D', amount: 950000 },
      },
      transactions: [
        {
          id: 't3-c2-tx1',
          document: 'VÚD 120/2026',
          date: '31. 12. 2026',
          description: 'Uzavření nákladového účtu 501 převodem konečného stavu na Účet zisků a ztrát (710)',
          amount: 600000,
          debitAccount: '710',
          creditAccount: '501',
          pedagogicalHint:
            'Náklady měly obrat na MD 501, proto je při uzavírání odepíšeme na D 501 a převedeme na MD 710.',
        },
        {
          id: 't3-c2-tx2',
          document: 'VÚD 121/2026',
          date: '31. 12. 2026',
          description: 'Uzavření výnosového účtu 601 převodem konečného stavu na Účet zisků a ztrát (710)',
          amount: 950000,
          debitAccount: '601',
          creditAccount: '710',
          pedagogicalHint:
            'Výnosy měly obrat na D 601, proto je při uzavírání odepíšeme na MD 601 a převedeme na D 710.',
        },
        {
          id: 't3-c2-tx3',
          document: 'VÚD 122/2026',
          date: '31. 12. 2026',
          description: 'Převod dosaženého účetního zisku (950 000 − 600 000 = 350 000 Kč) z účtu 710 na Konečný účet rozvažný 702',
          amount: 350000,
          debitAccount: '710',
          creditAccount: '702',
          pedagogicalHint:
            'Na účtu 710 jsou výnosy (D 950 000) vyšší než náklady (MD 600 000). Zisk 350 000 Kč doplníme na slabší stranu MD 710 a převedeme mezi pasiva na D 702.',
        },
      ],
    },
  ],
  cheatSheets: [
    {
      id: 't3-cs-1',
      title: 'Tahák uzávěrkových operací a inventarizačních rozdílů',
      summary: 'Souvztažnosti při inventuře, kurzových rozdílech k 31. 12. a uzavírání účtů na 710 a 702.',
      items: [
        {
          id: 'cs3-1',
          operation: 'Inventarizační manko zásob nad normu',
          document: 'VÚD',
          debitAccount: '549',
          creditAccount: '112 / 123 / 132',
          conditionOrNote: 'Manko do normy přirozených úbytků se účtuje jako běžná spotřeba (501/504)',
          taxDeductible: 'podminene',
        },
        {
          id: 'cs3-2',
          operation: 'Předpis náhrady manka nebo schodku zaměstnanci',
          document: 'VÚD',
          debitAccount: '335',
          creditAccount: '648 / 668',
          conditionOrNote: 'Zákaz kompenzace: účtuje se zvlášť náklad a zvlášť výnos z náhrady',
          taxDeductible: 'ano',
        },
        {
          id: 'cs3-3',
          operation: 'Převod účetního ZISKU při uzavírání účetních knih',
          document: 'VÚD k 31. 12.',
          debitAccount: '710',
          creditAccount: '702',
          conditionOrNote: 'Zisk je zdrojem financování majetku -> na 702 stojí na straně Dal (Pasiva)',
          taxDeductible: 'ne',
        },
        {
          id: 'cs3-4',
          operation: 'Převod účetní ZTRÁTY při uzavírání účetních knih',
          document: 'VÚD k 31. 12.',
          debitAccount: '702',
          creditAccount: '710',
          conditionOrNote: 'Ztráta snižuje pasiva -> na 702 stojí na straně MD (nebo s mínusem v pasivech)',
          taxDeductible: 'ne',
        },
      ],
    },
  ],
  questions: [
    {
      id: 't3-q1',
      topicId: 3,
      type: 'booking',
      difficulty: 'medium',
      title: 'Uzavření účetního zisku mezi účty 710 a 702',
      prompt:
        'Účetní jednotka uzavřela všechny nákladové účty (celkem 4 200 000 Kč vč. daně z příjmů) a výnosové účty (celkem 5 000 000 Kč) na Účet zisků a ztrát (710). Zaúčtujte k 31. 12. 2026 převod výsledného účetního zisku na Konečný účet rozvažný (702).',
      documentType: 'VÚD 130/2026',
      transactionDate: '31. 12. 2026',
      expectedDebit: '710',
      expectedCredit: '702',
      expectedAmount: 800000,
      calculationHint: 'Výnosy (5 000 000) − Náklady (4 200 000) = Zisk 800 000 Kč. Zisk se převádí zápisem MD 710 / D 702.',
      explanation:
        'Protože výnosy na straně Dal účtu 710 (5 000 000 Kč) převyšují náklady na straně Má dáti účtu 710 (4 200 000 Kč), vznikl čistý zisk 800 000 Kč. Uzavřeme jej zápisem MD 710 / D 702.',
      principleExplanation:
        'Zisk zvyšuje vlastní kapitál společnosti, proto se na Konečném účtu rozvažném (702) zapisuje na stranu Dal (Pasiva).',
      relatedAccounts: ['710', '702'],
      points: 3,
    },
    {
      id: 't3-q2',
      topicId: 3,
      type: 'single_choice',
      difficulty: 'easy',
      title: 'Inventarizace: Přirozený úbytek zásob do normy vs. manko nad normu',
      prompt:
        'Při inventuře skladu sypkého stavebního materiálu byl zjištěn úbytek oproti účetnímu stavu v hodnotě 12 000 Kč. Vnitřní směrnice stanoví normu přirozených úbytků (rozprach, vysychání) do výše 15 000 Kč. Jak se tento rozdíl 12 000 Kč zaúčtuje?',
      options: [
        {
          id: 'a',
          text: 'MD 501 (Spotřeba materiálu) / D 112 (Materiál na skladě) — jde o přirozený úbytek v rámci normy, který je daňově uznatelný',
          debitPreview: '501',
          creditPreview: '112',
        },
        {
          id: 'b',
          text: 'MD 549 (Manka a škody) / D 112 (Materiál na skladě) — každý úbytek při inventuře je nedaňovým mankem',
          debitPreview: '549',
          creditPreview: '112',
        },
        {
          id: 'c',
          text: 'MD 335 (Pohledávky za zaměstnanci) / D 112 (Materiál na skladě)',
          debitPreview: '335',
          creditPreview: '112',
        },
        {
          id: 'd',
          text: 'Úbytek do normy se vůbec neúčtuje a na účtu 112 se ponechá původní vyšší stav',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'Technologické a přirozené úbytky zásob do stanovené ekonomické normy NEJSOU mankem, ale běžnou provozní spotřebou materiálu (MD 501 / D 112) a jsou plně daňově uznatelné.',
      principleExplanation:
        'Účetní stav na účtu 112 musíme uvést do souladu se skutečností (D 112). Protože je úbytek v normě, účtujeme na 501 místo 549.',
      relatedAccounts: ['501', '549', '112'],
      points: 2,
    },
    {
      id: 't3-q3',
      topicId: 3,
      type: 'error_detection',
      difficulty: 'medium',
      title: 'Kontrola deníku: Nepříznivý kurzový rozdíl u devizové pohledávky k 31. 12.',
      prompt:
        'Společnost eviduje pohledávku za německým odběratelem (účet 311) ve výši 10 000 EUR, která byla při vzniku přepočtena kurzem 25,20 Kč/EUR (252 000 Kč). K 31. 12. 2026 činí kurz ČNB 24,80 Kč/EUR (hodnota pohledávky klesla na 248 000 Kč, rozdíl 4 000 Kč). Zkontrolujte zápis v deníku:',
      journalRow: {
        document: 'VÚD 114/2026',
        date: '31. 12. 2026',
        description: 'Přecenění devizové pohledávky kurzem ČNB k rozvahovému dni (pokles kurzu EUR)',
        amount: 4000,
        debit: '563',
        credit: '311',
      },
      isCorrectlyBooked: true,
      errorCategory: 'none',
      correctDebit: '563',
      correctCredit: '311',
      correctAmount: 4000,
      correctionChoices: [
        {
          id: 'c1',
          label: 'Zápis je v pořádku: MD 563 (Kurzové ztráty) / D 311 (Odběratelé) — 4 000 Kč',
          debit: '563',
          credit: '311',
          amount: 4000,
        },
      ],
      correctChoiceId: 'c1',
      explanation:
        'Zápis v deníku je zcela správný! Protože kurz EUR klesl z 25,20 na 24,80 Kč, za pohledávku dostaneme méně korun — hodnota pohledávky klesá (D 311) a vzniká finanční náklad Kurzová ztráta (MD 563) ve výši 4 000 Kč.',
      principleExplanation:
        'Dle § 4 odst. 12 Zákona o účetnictví se neuhrazené cizoměnové pohledávky a závazky k 31. 12. povinně přeceňují kurzem ČNB vyhlášeným k rozvahovému dni.',
      relatedAccounts: ['563', '311', '663'],
      points: 3,
    },
  ],
};

export const TOPIC_4_EQUITY: AccountingTopic = {
  id: 4,
  slug: 'vlastni-kapital-a-rozdeleni-hv',
  title: 'Vlastní kapitál a rozdělení hospodářského výsledku',
  shortTitle: 'Vlastní kapitál a rozdělení VH',
  description:
    'Založení a změny základního kapitálu (411, 419), příplatky mimo ZK (413), otevírání účtu 431 k 1. 1. a rozdělení zisku (421, 428, 364, 342) či úhrada ztráty (429, 355).',
  keyAccounts: ['411', '413', '419', '421', '428', '429', '431', '364', '342'],
  accountClasses: [2, 3, 4, 7],
  estimatedMinutes: 30,
  examWeightPercent: 15,
  studyCards: [
    {
      id: 't4-card-1',
      topicId: 4,
      order: 1,
      title: 'Rozdělení zisku a úhrada ztráty na účtu 431',
      subtitle: 'Otevření 431 z Počátečního účtu rozvažného (701) a rozhodnutí valné hromady',
      keyAccounts: ['701', '431', '421', '428', '364', '342'],
      corePrinciple:
        'K 1. 1. nového účetního období se výsledek hospodaření minulého roku otevírá na účet 431 – Výsledek hospodaření ve schvalovacím řízení (Zisk na D 431, Ztráta na MD 431). Po schválení účetní závěrky valnou hromadou musí být účet 431 do konce roku vynulován!',
      legislativeRule:
        'Zákon o obchodních korporacích (ZOK) + ČÚS č. 018. Při výplatě podílů na zisku (dividend) fyzickým osobám – rezidentům ČR sráží společnost 15 % srážkovou daň (MD 364 / D 342).',
      commonMistake:
        'Studenti účtují srážkovou daň z dividend (15 %) do nákladů společnosti (třída 5). Pozor: Srážkovou daň platí ze svého podílu společník, proto snižuje jeho pohledávku (MD 364 / D 342)!',
      taxDeductibilityRule:
        'Rozdělení zisku probíhá již ze zdaněného disponibilního zisku — žádná operace s účtem 431 již nevstupuje do nákladů ani výnosů.',
      scenarioTitle: 'Modelový příklad: Rozdělení zisku s.r.o. dle usnesení valné hromady',
      scenarioContext:
        'Společnost dosáhla v minulém roce čistého zisku 500 000 Kč, který byl k 1. 1. 2026 otevřen na D 431. Valná hromada rozhodla: 50 000 Kč příděl do rezervního fondu, 200 000 Kč přiznané podíly na zisku společníkům (FO) a 250 000 Kč ponechat jako nerozdělený zisk. Následně firma srazila 15 % srážkovou daň z podílů.',
      initialBalances: {
        '431': { side: 'D', amount: 500000 },
      },
      transactions: [
        {
          id: 't4-c1-tx1',
          document: 'VÚD 15/2026',
          date: '15. 04. 2026',
          description: 'Příděl ze zisku do rezervního fondu dle rozhodnutí valné hromady',
          amount: 50000,
          debitAccount: '431',
          creditAccount: '421',
          pedagogicalHint:
            'Čerpáme zisk ve schvalovacím řízení (MD 431) a zvyšujeme pasivní účet Rezervní fond (D 421).',
        },
        {
          id: 't4-c1-tx2',
          document: 'VÚD 16/2026',
          date: '15. 04. 2026',
          description: 'Přiznání podílů na zisku společníkům (hrubá výše před srážkovou daní)',
          amount: 200000,
          debitAccount: '431',
          creditAccount: '364',
          pedagogicalHint:
            'Vzniká závazek společnosti vůči společníkům při rozdělování zisku na pasivním účtu D 364.',
        },
        {
          id: 't4-c1-tx3',
          document: 'VÚD 17/2026',
          date: '15. 04. 2026',
          description: 'Převedení zbývající části zisku na Nerozdělený zisk minulých let (účet 431 je nyní nulový)',
          amount: 250000,
          debitAccount: '431',
          creditAccount: '428',
          pedagogicalHint:
            'Zbytek zisku převedeme na D 428. Účet 431 má nyní obrat MD 500 000 Kč a konečný zůstatek 0 Kč.',
        },
        {
          id: 't4-c1-tx4',
          document: 'VÚD 18/2026',
          date: '15. 04. 2026',
          description: 'Předpis 15% srážkové daně z podílů na zisku společníků (15 % z 200 000 Kč = 30 000 Kč)',
          amount: 30000,
          debitAccount: '364',
          creditAccount: '342',
          pedagogicalHint:
            'Srážková daň snižuje závazek vůči společníkům (MD 364) a vytváří závazek vůči finančnímu úřadu (D 342). Společníkům se na účet vyplatí čistých 170 000 Kč.',
        },
      ],
    },
  ],
  cheatSheets: [
    {
      id: 't4-cs-1',
      title: 'Tahák rozdělení zisku a úhrady ztráty (431)',
      summary: 'Přehled všech způsobů rozdělení zisku a vypořádání ztráty u kapitálových společností.',
      items: [
        {
          id: 'cs4-1',
          operation: 'Otevření zisku minulého roku k 1. 1.',
          document: 'VÚD k 1. 1.',
          debitAccount: '701',
          creditAccount: '431',
          conditionOrNote: 'Zisk má pasivní povahu -> na 431 přichází na stranu Dal',
          taxDeductible: 'ne',
        },
        {
          id: 'cs4-2',
          operation: 'Přiznání podílů na zisku (dividend) společníkům',
          document: 'VÚD (dle VH)',
          debitAccount: '431',
          creditAccount: '364',
          conditionOrNote: 'Následuje srážková daň 15 %: MD 364 / D 342',
          taxDeductible: 'ne',
        },
        {
          id: 'cs4-3',
          operation: 'Ponechání zisku jako nerozdělený zisk minulých let',
          document: 'VÚD (dle VH)',
          debitAccount: '431',
          creditAccount: '428',
          conditionOrNote: 'Účet 431 musí mít ke konci roku nulový zůstatek',
          taxDeductible: 'ne',
        },
        {
          id: 'cs4-4',
          operation: 'Předpis úhrady ztráty společníkům k doplacení',
          document: 'VÚD (dle VH)',
          debitAccount: '355',
          creditAccount: '431',
          conditionOrNote: 'Ztráta byla otevřena na MD 431, proto se rozpouští ze strany D 431',
          taxDeductible: 'ne',
        },
      ],
    },
  ],
  questions: [
    {
      id: 't4-q1',
      topicId: 4,
      type: 'booking',
      difficulty: 'medium',
      title: 'Srážková daň z přiznaných podílů na zisku společníků',
      prompt:
        'Valná hromada přiznala společníkům (fyzickým osobám) podíl na zisku v hrubé výši 400 000 Kč (již zaúčtováno MD 431 / D 364). Zaúčtujte předpis 15% srážkové daně vybírané srážkou u zdroje (VÚD).',
      documentType: 'VÚD 22/2026',
      transactionDate: '20. 05. 2026',
      expectedDebit: '364',
      expectedCredit: '342',
      expectedAmount: 60000,
      calculationHint: '15 % ze 400 000 Kč = 60 000 Kč. Srážková daň snižuje závazek vůči společníkům (MD 364) a zvyšuje závazek z ostatních přímých daní (D 342).',
      explanation:
        'Srážková daň 15 % z podílů na zisku činí 0,15 × 400 000 = 60 000 Kč. Účtujeme MD 364 (Závazky ke společníkům při rozdělování zisku) / D 342 (Ostatní přímé daně). Společníkům bude následně vyplaceno čistých 340 000 Kč.',
      principleExplanation:
        'Poplatníkem srážkové daně je společník, nikoliv společnost (společnost je pouze plátcem daně, který daň srazí a odvede FÚ).',
      relatedAccounts: ['364', '342', '431'],
      points: 3,
    },
    {
      id: 't4-q2',
      topicId: 4,
      type: 'single_choice',
      difficulty: 'easy',
      title: 'Úhrada ztráty minulého roku z nerozděleného zisku',
      prompt:
        'Společnost vykázala v minulém roce účetní ztrátu 120 000 Kč, která byla k 1. 1. otevřena na účtu 431 (strana MD). Valná hromada rozhodla uhradit tuto ztrátu z nerozděleného zisku minulých let (účet 428). Jaký bude účetní zápis?',
      options: [
        {
          id: 'a',
          text: 'MD 428 (Nerozdělený zisk minulých let) / D 431 (VH ve schvalovacím řízení) — 120 000 Kč',
          debitPreview: '428',
          creditPreview: '431',
        },
        {
          id: 'b',
          text: 'MD 431 (VH ve schvalovacím řízení) / D 428 (Nerozdělený zisk minulých let) — 120 000 Kč',
          debitPreview: '431',
          creditPreview: '428',
        },
        {
          id: 'c',
          text: 'MD 429 (Neuhrazená ztráta minulých let) / D 428 (Nerozdělený zisk minulých let) — 120 000 Kč',
          debitPreview: '429',
          creditPreview: '428',
        },
        {
          id: 'd',
          text: 'MD 548 (Ostatní provozní náklady) / D 431 (VH ve schvalovacím řízení) — 120 000 Kč',
          debitPreview: '548',
          creditPreview: '431',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'Ztráta leží k 1. 1. na straně MD 431. Při její úhradě z nerozděleného zisku minulých let účet 431 vynulujeme zápisem na stranu D 431 a současně snížíme pasivní zůstatek účtu 428 na straně MD 428.',
      principleExplanation:
        'Ztráta snižuje kumulovaný nerozdělený zisk z předchozích let (pasivní účet 428 klesá na straně MD).',
      relatedAccounts: ['428', '431', '429'],
      points: 2,
    },
  ],
};

export const TOPIC_5_MANAGERIAL: AccountingTopic = {
  id: 5,
  slug: 'vnitropodnikove-a-manazerske-ucetnictvi',
  title: 'Vnitropodnikové a manažerské účetnictví (kalkulace, tř. 8 a 9)',
  shortTitle: 'Kalkulace a vnitropodnikové účto',
  description:
    'Kalkulační vzorec, přímé (jednicové) a nepřímé (režijní) náklady, rozvrhová základna a přirážka, bod zvratu (BEP) a účtování v účtových třídách 8 a 9 nebo přes aktivaci (613, 621, 622).',
  keyAccounts: ['123', '613', '621', '622', '801', '811', '901'],
  accountClasses: [1, 5, 6, 8, 9],
  estimatedMinutes: 30,
  examWeightPercent: 12,
  studyCards: [
    {
      id: 't5-card-1',
      topicId: 5,
      order: 1,
      title: 'Kalkulační vzorec, režijní přirážka a ocenění vlastních výrobků (123 / 613)',
      subtitle: 'Jak ze spotřebovaného materiálu, mezd a režie vypočítáme vlastní náklady výroby a zaúčtujeme přírůstek výrobků na sklad',
      keyAccounts: ['123', '613', '501', '521'],
      corePrinciple:
        'Vlastní výrobky (účet 123) oceňujeme při převzetí na sklad ve vlastních nákladech výroby (Přímý materiál + Přímé mzdy + Ostatní přímé náklady + Výrobní režie). Přírůstek výrobků na sklad účtujeme ve finančním účetnictví přes výnosový účet 613 – Změna stavu výrobků.',
      legislativeRule:
        '§ 25 odst. 1 písm. d) Zákona o účetnictví: Zásoby vytvořené vlastní činností se oceňují vlastními náklady.',
      commonMistake:
        'Započtení odbytové (prodejní) režie nebo ziskové přirážky do skladového ocenění výrobků na účtu 123 — na skladě se oceňuje pouze na úrovni Vlastních nákladů výroby!',
      taxDeductibilityRule:
        'Účet 613 vyrovnává náklady vynaložené ve třídě 5 na neprodané výrobky na skladě (když vyrobíme na sklad, náklady v tř. 5 jsou kompenzovány výnosem D 613, takže do doby prodeje je dopad do VH nulový).',
      scenarioTitle: 'Modelový příklad: Dokončení výroby a prodej vlastních výrobků',
      scenarioContext:
        'Truhlářská výroba dokončila a předala na sklad 50 ks stolů. Vlastní náklady výroby činí 4 000 Kč/ks (celkem 200 000 Kč). Následně prodala 30 ks stolů odběrateli: vyskladnění ve vlastních nákladech (30 × 4 000 = 120 000 Kč) a fakturace v prodejní ceně (30 × 6 500 = 195 000 Kč).',
      transactions: [
        {
          id: 't5-c1-tx1',
          document: 'PŘV 10/2026',
          date: '10. 11. 2026',
          description: 'Příjem 50 ks dokončených výrobků na sklad ve vlastních nákladech výroby (50 × 4 000 Kč)',
          amount: 200000,
          debitAccount: '123',
          creditAccount: '613',
          pedagogicalHint:
            'Přírůstek výrobků na sklad zvyšuje aktivní účet 123 (MD) a účtuje se do výnosů na Změnu stavu výrobků (D 613).',
        },
        {
          id: 't5-c1-tx2',
          document: 'VÝD 14/2026',
          date: '18. 11. 2026',
          description: 'Vyskladnění 30 ks prodaných výrobků ze skladu ve vlastních nákladech (30 × 4 000 Kč)',
          amount: 120000,
          debitAccount: '613',
          creditAccount: '123',
          pedagogicalHint:
            'Úbytek výrobků ze skladu při prodeji snižuje sklad (D 123) a snižuje výnosy na účtu Změna stavu výrobků (MD 613).',
        },
        {
          id: 't5-c1-tx3',
          document: 'FAV 89/2026',
          date: '18. 11. 2026',
          description: 'Faktura vystavená za prodej 30 ks výrobků v prodejní ceně (30 × 6 500 Kč, bez DPH)',
          amount: 195000,
          debitAccount: '311',
          creditAccount: '601',
          pedagogicalHint:
            'Tržba v prodejní ceně se účtuje na MD 311 (Odběratelé) / D 601 (Tržby za vlastní výrobky).',
        },
      ],
    },
  ],
  cheatSheets: [
    {
      id: 't5-cs-1',
      title: 'Typový kalkulační vzorec a vzorce manažerského účetnictví',
      summary: 'Struktura kalkulačního vzorce, výpočet režijní přirážky a bodu zvratu (BEP).',
      items: [
        {
          id: 'cs5-1',
          operation: 'Vlastní náklady výroby (ocenění na účtu 123)',
          document: 'Kalkulace',
          debitAccount: '123',
          creditAccount: '613',
          conditionOrNote: 'Přímý materiál + Přímé mzdy + Ostatní přímé náklady + Výrobní režie',
          taxDeductible: 'ano',
        },
        {
          id: 'cs5-2',
          operation: 'Aktivace vnitropodnikových služeb (např. vlastní doprava DM)',
          document: 'VÚD',
          debitAccount: '042 / 111',
          creditAccount: '622',
          conditionOrNote: 'Vlastní přeprava při pořízení dlouhodobého majetku nebo materiálu',
          taxDeductible: 'ano',
        },
      ],
    },
  ],
  questions: [
    {
      id: 't5-q1',
      topicId: 5,
      type: 'single_choice',
      difficulty: 'medium',
      title: 'Výpočet bodu zvratu (Break-Even Point)',
      prompt:
        'Výrobní podnik vyrábí jeden druh výrobku. Prodejní cena činí 500 Kč/ks, variabilní (jednicové) náklady činí 300 Kč/ks a celkové fixní náklady za období činí 400 000 Kč. Jaké množství výrobků musí podnik vyrobit a prodat, aby dosáhl bodu zvratu (nulového zisku)?',
      options: [
        { id: 'a', text: '2 000 ks (400 000 / (500 − 300) = 2 000 ks)' },
        { id: 'b', text: '800 ks (400 000 / 500 = 800 ks)' },
        { id: 'c', text: '1 334 ks (400 000 / 300 = 1 333,3 ks)' },
        { id: 'd', text: '500 ks (400 000 / (500 + 300) = 500 ks)' },
      ],
      correctOptionId: 'a',
      explanation:
        'Krycí příspěvek na 1 kus (příspěvek na úhradu fixních nákladů a zisku) činí: Cena (500) − Variabilní náklady (300) = 200 Kč/ks. Bod zvratu Q_BEP = Fixní náklady / Krycí příspěvek = 400 000 / 200 = 2 000 ks.',
      principleExplanation:
        'Každý prodaný kus přispívá 200 Kč na pokrytí fixních nákladů (400 000 Kč). Po prodeji 2 000. kusu jsou fixní náklady zaplaceny a od 2 001. kusu podnik generuje čistý zisk.',
      relatedAccounts: ['123', '613', '601'],
      points: 3,
    },
    {
      id: 't5-q2',
      topicId: 5,
      type: 'booking',
      difficulty: 'easy',
      title: 'Zaúčtování příjmu vlastních dokončených výrobků na sklad',
      prompt:
        'Podle převodky (PŘV 21/2026) předala výrobní dílna na sklad hotové výrobky oceněné ve vlastních nákladech výroby v celkové výši 145 000 Kč. Zaúčtujte tento příjem výrobků na sklad ve finančním účetnictví.',
      documentType: 'PŘV 21/2026',
      transactionDate: '30. 11. 2026',
      expectedDebit: '123',
      expectedCredit: '613',
      expectedAmount: 145000,
      calculationHint: 'Přírůstek na skladě výrobků (MD 123) proti výnosovému účtu Změna stavu výrobků (D 613).',
      explanation:
        'Příjem dokončených výrobků vlastní výroby na sklad se účtuje MD 123 (Výrobky) / D 613 (Změna stavu výrobků) ve výši vlastních nákladů výroby 145 000 Kč.',
      principleExplanation:
        'Účet 613 má povahu výnosového účtu (přírůstky na D, úbytky při vyskladnění na MD).',
      relatedAccounts: ['123', '613'],
      points: 2,
    },
  ],
};

export const TOPIC_6_COMPREHENSIVE: AccountingTopic = {
  id: 6,
  slug: 'komplexni-maturitni-cviceni',
  title: 'Komplexní maturitní cvičení (souvislý účetní případ)',
  shortTitle: 'Komplexní maturitní případ',
  description:
    'Souvislý maturitní příklad spojující pořízení dlouhodobého majetku s aktivací, zúčtování mezd, časové rozlišení, inventarizaci, výpočet daně z příjmů a uzavření účetních knih.',
  keyAccounts: ['042', '022', '331', '336', '381', '389', '551', '591', '702', '710'],
  accountClasses: [0, 2, 3, 4, 5, 6, 7],
  estimatedMinutes: 45,
  examWeightPercent: 13,
  studyCards: [
    {
      id: 't6-card-1',
      topicId: 6,
      order: 1,
      title: 'Souvislý maturitní případ: Od pořízení stroje po roční uzávěrku',
      subtitle: 'Kompletní řetězec operací na přelomu roku v jedné interaktivní simulaci',
      keyAccounts: ['042', '022', '622', '551', '082', '389', '502'],
      corePrinciple:
        'U praktické maturitní zkoušky na sebe operace navazují: pořízení majetku (včetně vedlejších pořizovacích nákladů a vnitropodnikové dopravy 622) určí vstupní cenu na účtu 022, z níž se počítají odpisy (551/082) ovlivňující výsledek hospodaření a základ daně.',
      legislativeRule:
        '§ 47 Vyhlášky č. 500/2002 Sb.: Do pořizovací ceny dlouhodobého hmotného majetku (042) patří cena pořízení i vedlejší pořizovací náklady (doprava, montáž, clo). Zařazení do užívání se účtuje zápisem MD 022 / D 042.',
      commonMistake:
        'Zaúčtování dopravy nebo montáže pořizovaného stroje přímo do provozních nákladů (518) místo do pořizovací ceny majetku na účet 042!',
      taxDeductibilityRule:
        'Pořizovací cena dlouhodobého majetku nad 80 000 Kč vstupuje do nákladů a základu daně postupně formou účetních a daňových odpisů.',
      scenarioTitle: 'Souvislý případ: Pořízení CNC stroje, zařazení a odpis v 1. roce',
      scenarioContext:
        'Firma nakoupila CNC obráběcí stroj na fakturu za 420 000 Kč (bez DPH). Přepravu stroje provedla vlastním nákladním vozem (vnitropodniková faktura na 30 000 Kč). Stroj zařadila do užívání a na konci roku zaúčtovala roční účetní odpis 45 000 Kč.',
      transactions: [
        {
          id: 't6-c1-tx1',
          document: 'FAP 30/2026',
          date: '05. 03. 2026',
          description: 'Faktura přijatá za nákup CNC stroje (cena pořízení bez DPH)',
          amount: 420000,
          debitAccount: '042',
          creditAccount: '321',
          pedagogicalHint:
            'Nákup stroje před zařazením soustřeďujeme na kalkulačním účtu 042 (Pořízení DHM).',
        },
        {
          id: 't6-c1-tx2',
          document: 'VÚD 19/2026',
          date: '08. 03. 2026',
          description: 'Vnitropodniková přeprava CNC stroje vlastním nákladním automobilem (vedlejší pořizovací náklad)',
          amount: 30000,
          debitAccount: '042',
          creditAccount: '622',
          pedagogicalHint:
            'Vlastní přeprava zvyšuje pořizovací cenu stroje (MD 042) a vyrovnává náklady dopravy přes Aktivaci vnitropodnikových služeb (D 622).',
        },
        {
          id: 't6-c1-tx3',
          document: 'ZAP 04/2026',
          date: '10. 03. 2026',
          description: 'Zařazení CNC stroje do užívání v celkové pořizovací ceně (420 000 + 30 000 = 450 000 Kč)',
          amount: 450000,
          debitAccount: '022',
          creditAccount: '042',
          pedagogicalHint:
            'Zápisem o zařazení převedeme celkovou pořizovací cenu 450 000 Kč z účtu 042 na účet 022 (Hmotné movité věci).',
        },
        {
          id: 't6-c1-tx4',
          document: 'VÚD 110/2026',
          date: '31. 12. 2026',
          description: 'Roční účetní odpis CNC stroje dle odpisového plánu (10 % ze 450 000 Kč)',
          amount: 45000,
          debitAccount: '551',
          creditAccount: '082',
          pedagogicalHint:
            'Účetní odpis zvyšuje provozní náklady (MD 551) a kumulované oprávky k movitým věcem (D 082).',
        },
      ],
    },
  ],
  cheatSheets: [
    {
      id: 't6-cs-1',
      title: 'Zlaté desatero pro praktickou maturitu z účetnictví',
      summary: 'Nejčastější chytáky v souvislých maturitních příkladech na obchodních akademiích.',
      items: [
        {
          id: 'cs6-1',
          operation: 'Vedlejší pořizovací náklady DM (doprava, montáž, clo)',
          document: 'FAP / VÚD',
          debitAccount: '042',
          creditAccount: '321 / 622',
          conditionOrNote: 'Vždy vstupují do pořizovací ceny majetku na 042, nikdy ne do tř. 5!',
          taxDeductible: 'podminene',
        },
        {
          id: 'cs6-2',
          operation: 'Pojistné placené zaměstnavatelem (33,8 % z HM)',
          document: 'VÚD (zúčt. mezd)',
          debitAccount: '524',
          creditAccount: '336',
          conditionOrNote: '24,8 % sociální + 9 % zdravotní pojištění = náklad podniku',
          taxDeductible: 'ano',
        },
      ],
    },
  ],
  questions: [
    {
      id: 't6-q1',
      topicId: 6,
      type: 'booking',
      difficulty: 'medium',
      title: 'Zařazení stroje do užívání včetně vedlejších pořizovacích nákladů',
      prompt:
        'Společnost pořídila výrobní linku: faktura za samotnou linku (bez DPH) činila 750 000 Kč, faktura za odbornou montáž (bez DPH) činila 50 000 Kč (oboje zaúčtováno na MD 042). Zaúčtujte zařazení výrobní linky do užívání dle protokolu o zařazení (ZAP).',
      documentType: 'ZAP 11/2026',
      transactionDate: '15. 06. 2026',
      expectedDebit: '022',
      expectedCredit: '042',
      expectedAmount: 800000,
      calculationHint: 'Vstupní (pořizovací) cena = 750 000 Kč (cena pořízení) + 50 000 Kč (montáž) = 800 000 Kč. Zařazení: MD 022 / D 042.',
      explanation:
        'Montáž je vedlejším pořizovacím nákladem, který je součástí pořizovací ceny dlouhodobého majetku. Celková vstupní cena činí 750 000 + 50 000 = 800 000 Kč a při uvedení do užívání se převede zápisem MD 022 / D 042.',
      principleExplanation:
        'Účet 042 slouží ke kalkulaci celkové pořizovací ceny majetku. Po zařazení má účet 042 nulový zůstatek.',
      relatedAccounts: ['022', '042'],
      points: 3,
    },
    {
      id: 't6-q2',
      topicId: 6,
      type: 'error_detection',
      difficulty: 'medium',
      title: 'Kontrola deníku: Srážka pojistného placeného zaměstnancem z hrubé mzdy',
      prompt:
        'Při zúčtování mezd za prosinec 2026 srazil zaměstnavatel zaměstnancům z jejich hrubých mezd sociální a zdravotní pojištění (6,5 % + 4,5 % = 11 %) v celkové výši 55 000 Kč. Zkontrolujte zápis v deníku:',
      journalRow: {
        document: 'VÚD 98/2026',
        date: '31. 12. 2026',
        description: 'Srážka sociálního a zdravotního pojištění hrazeného zaměstnanci z hrubých mezd',
        amount: 55000,
        debit: '524',
        credit: '336',
      },
      isCorrectlyBooked: false,
      errorCategory: 'wrong_account',
      correctDebit: '331',
      correctCredit: '336',
      correctAmount: 55000,
      correctionChoices: [
        {
          id: 'c1',
          label: 'MD 331 (Zaměstnanci) / D 336 (Zúčtování s institucemi SZ a ZP) — 55 000 Kč',
          debit: '331',
          credit: '336',
          amount: 55000,
        },
        {
          id: 'c2',
          label: 'MD 521 (Mzdové náklady) / D 336 (Zúčtování s institucemi SZ a ZP) — 55 000 Kč',
          debit: '521',
          credit: '336',
          amount: 55000,
        },
        {
          id: 'c3',
          label: 'MD 336 (Zúčtování s institucemi SZ a ZP) / D 331 (Zaměstnanci) — 55 000 Kč',
          debit: '336',
          credit: '331',
          amount: 55000,
        },
      ],
      correctChoiceId: 'c1',
      explanation:
        'Pojistné hrazené zaměstnancem (11 % z hrubé mzdy) NENÍ nákladem zaměstnavatele (nepatří na 524), ale snižuje nárok zaměstnance na výplatu mzdy! Proto se sráží z hrubé mzdy zápisem MD 331 (Zaměstnanci) / D 336 (Zúčtování s institucemi SZ a ZP).',
      principleExplanation:
        'Hrubá mzda již byla celá zaúčtována do nákladů na MD 521 / D 331. Srážky ze mzdy (pojistné zaměstnance 336, záloha na daň 342) pouze snižují částku k výplatě na účtu 331.',
      relatedAccounts: ['331', '336', '524', '521'],
      points: 3,
    },
    {
      id: 't6-q3',
      topicId: 6,
      type: 'single_choice',
      difficulty: 'hard',
      title: 'Souvislost účtů při prodeji částečně odepsaného firemního automobilu',
      prompt:
        'Společnost prodala osobní automobil, jehož pořizovací cena na účtu 022 činila 600 000 Kč a dosavadní oprávky na účtu 082 činily 450 000 Kč. Jak se zaúčtuje vyřazení automobilu z evidence a jeho zůstatková cena (150 000 Kč) při prodeji?',
      options: [
        {
          id: 'a',
          text: 'Nejprve doúčtování zůstatkové ceny MD 541 (Prodaný DM) / D 082 (150 000 Kč) a následně vyřazení v pořizovací ceně MD 082 / D 022 (600 000 Kč)',
          debitPreview: '541',
          creditPreview: '082',
        },
        {
          id: 'b',
          text: 'MD 551 (Odpisy DM) / D 022 (Hmotné movité věci) ve výši 150 000 Kč',
          debitPreview: '551',
          creditPreview: '022',
        },
        {
          id: 'c',
          text: 'MD 549 (Manka a škody) / D 082 (Oprávky) ve výši 150 000 Kč',
          debitPreview: '549',
          creditPreview: '082',
        },
        {
          id: 'd',
          text: 'MD 641 (Tržby z prodeje DM) / D 022 (Hmotné movité věci) ve výši 600 000 Kč',
          debitPreview: '641',
          creditPreview: '022',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'Při prodeji neodepsaného dlouhodobého majetku se zůstatková cena (600 000 − 450 000 = 150 000 Kč) zaúčtuje jednorázově do provozních nákladů na účet 541 (Prodaný dlouhodobý nehmotný a hmotný majetek) proti oprávkám D 082. Tím oprávky dosáhnou 600 000 Kč a majetek se vyřadí z evidence MD 082 / D 022 (600 000 Kč).',
      principleExplanation:
        'Rozlišujte důvod vyřazení zůstatkové ceny: Prodej = 541, Likvidace = 551, Darování = 543, Manko/škoda = 549.',
      relatedAccounts: ['541', '082', '022', '641'],
      points: 4,
    },
    {
      id: 't6-q4',
      topicId: 6,
      type: 'booking',
      difficulty: 'medium',
      title: 'Zúčtování zákonného sociálního a zdravotního pojištění hrazeného zaměstnavatelem',
      prompt:
        'Hrubé mzdy zaměstnanců za prosinec činí 1 000 000 Kč (již zaúčtováno na MD 521 / D 331). Zaúčtujte předpis zákonného sociálního (24,8 %) a zdravotního (9 %) pojištění hrazeného zaměstnavatelem (celkem 33,8 % z hrubých mezd) dle VÚD.',
      documentType: 'VÚD 118/2026',
      transactionDate: '31. 12. 2026',
      expectedDebit: '524',
      expectedCredit: '336',
      expectedAmount: 338000,
      calculationHint: '33,8 % z 1 000 000 Kč = 338 000 Kč. Jde o daňově uznatelný náklad zaměstnavatele MD 524 / D 336.',
      explanation:
        'Zákonné pojistné placené zaměstnavatelem činí 33,8 % z hrubých mezd (338 000 Kč) a účtuje se do nákladů na MD 524 (Zákonné sociální pojištění) proti závazku vůči institucím D 336.',
      principleExplanation:
        'Na rozdíl od 11 % srážených zaměstnanci ze mzdy (331/336) je 33,8 % placených zaměstnavatelem přímým provozním nákladem firmy (524/336).',
      relatedAccounts: ['524', '336', '521'],
      points: 3,
    },
    {
      id: 't6-q5',
      topicId: 6,
      type: 'booking',
      difficulty: 'easy',
      title: 'Odvod hotovosti z pokladny na bankovní účet přes Peníze na cestě',
      prompt:
        'Pokladník odnesl tržbu 85 000 Kč z pokladny do banky. Zaúčtujte výdej hotovosti z pokladny dle výdajového pokladního dokladu (VPD) při použití překlenovacího účtu Peníze na cestě.',
      documentType: 'VPD 99/2026',
      transactionDate: '28. 12. 2026',
      expectedDebit: '261',
      expectedCredit: '211',
      expectedAmount: 85000,
      calculationHint: 'Hotovost ubývá v pokladně (D 211) a vstupuje na překlenovací účet Peníze na cestě (MD 261).',
      explanation:
        'Protože k výdeji z pokladny (VPD) a připsání na účet (VBÚ) dochází na základě dvou různých dokladů, použijeme překlenovací účet 261 (Peníze na cestě): MD 261 / D 211 ve výši 85 000 Kč.',
      principleExplanation:
        'Zamezuje se tím dvojímu zaúčtování téže operace (jednou dle VPD a podruhé dle VBÚ).',
      relatedAccounts: ['261', '211', '221'],
      points: 2,
    },
    {
      id: 't6-q6',
      topicId: 6,
      type: 'single_choice',
      difficulty: 'medium',
      title: 'Klasifikace položek v Rozvaze: Oprávky a opravné položky',
      prompt:
        'Ve kterém sloupci Rozvahy (v plném rozsahu) se vykazují kumulované oprávky k dlouhodobému majetku (účty 081, 082) a opravné položky k pohledávkám (účet 391)?',
      options: [
        { id: 'a', text: 'V Aktivech ve sloupci „Korekce“ (snižují hodnotu Brutto na výslednou hodnotu Netto)' },
        { id: 'b', text: 'V Pasivech v části Cizí zdroje spolu s rezervami' },
        { id: 'c', text: 'Ve Výkazu zisku a ztráty v provozních nákladech' },
        { id: 'd', text: 'V Pasivech jako součást Vlastního kapitálu' },
      ],
      correctOptionId: 'a',
      explanation:
        'Ačkoliv mají oprávky (08x) a opravné položky (391) zůstatek na straně Dal (pasivní povahu při účtování), v Rozvaze se NIKDY nevykazují v pasivech! Vykazují se v Aktivech ve sloupci „Korekce“, kde snižují ocenění majetku Brutto na čistou hodnotu Netto (Netto = Brutto − Korekce).',
      principleExplanation:
        'Zásada opatrnosti a věrného zobrazení v rozvaze: čtenář účetní závěrky vidí pořizovací cenu majetku (Brutto), jeho opotřebení/znehodnocení (Korekce) i čistou zůstatkovou hodnotu (Netto).',
      relatedAccounts: ['081', '082', '391', '702'],
      points: 2,
    },
    {
      id: 't6-q7',
      topicId: 6,
      type: 'error_detection',
      difficulty: 'medium',
      title: 'Kontrola deníku: Poskytnutý peněžitý dar útulku',
      prompt:
        'Společnost poskytla z bankovního účtu peněžitý dar městskému útulku na základě darovací smlouvy ve výši 25 000 Kč. Zkontrolujte zápis v deníku:',
      journalRow: {
        document: 'VBÚ 92/2026',
        date: '12. 12. 2026',
        description: 'Poskytnutý peněžitý dar útulku dle darovací smlouvy',
        amount: 25000,
        debit: '543',
        credit: '221',
      },
      isCorrectlyBooked: true,
      errorCategory: 'none',
      correctDebit: '543',
      correctCredit: '221',
      correctAmount: 25000,
      correctionChoices: [
        {
          id: 'c1',
          label: 'Zápis je v pořádku: MD 543 (Dary) / D 221 (Bankovní účty) — 25 000 Kč',
          debit: '543',
          credit: '221',
          amount: 25000,
        },
      ],
      correctChoiceId: 'c1',
      explanation:
        'Zápis v deníku je správný! Poskytnutý dar se v účetnictví účtuje do provozních nákladů na účet 543 (Dary) proti úbytku peněz na účtu 221.',
      principleExplanation:
        'Účet 543 je sice nedaňovým nákladem (při transformaci VH na základ daně se připočte +25 000 Kč), ale následně lze hodnotu daru při splnění podmínek § 20 odst. 8 ZDP odečíst od základu daně jako nezdanitelnou část (max. do 10 % sníženého základu daně).',
      relatedAccounts: ['543', '221'],
      points: 2,
    },
    {
      id: 't6-q8',
      topicId: 6,
      type: 'booking',
      difficulty: 'easy',
      title: 'Připsané kreditní úroky na bankovním účtu',
      prompt:
        'Podle výpisu z bankovního účtu (VBÚ 120/2026) připsala banka společnosti k 31. 12. 2026 kreditní (výnosové) úroky z běžného účtu ve výši 3 400 Kč. Zaúčtujte tento případ.',
      documentType: 'VBÚ 120/2026',
      transactionDate: '31. 12. 2026',
      expectedDebit: '221',
      expectedCredit: '662',
      expectedAmount: 3400,
      calculationHint: 'Přírůstek peněz na bankovním účtu (MD 221) a finanční výnos Úroky (D 662).',
      explanation:
        'Připsané úroky zvyšují stav peněžních prostředků na bankovním účtu (MD 221) a představují finanční výnos na účtu 662 (Úroky) ve výši 3 400 Kč.',
      principleExplanation:
        'Pozor na rozlišení: Nákladové úroky z úvěru = MD 562, Výnosové úroky z vkladu = D 662.',
      relatedAccounts: ['221', '662', '562'],
      points: 2,
    },
    {
      id: 't6-q9',
      topicId: 6,
      type: 'single_choice',
      difficulty: 'easy',
      title: 'Otevírání rozvahových účtů k 1. 1. nového účetního období',
      prompt:
        'Jakým účetním zápisem se k 1. 1. nového účetního období otevírá počáteční stav pasivního účtu 321 – Dodavatelé (závazky z obchodních vztahů)?',
      options: [
        {
          id: 'a',
          text: 'MD 701 (Počáteční účet rozvažný) / D 321 (Dodavatelé)',
          debitPreview: '701',
          creditPreview: '321',
        },
        {
          id: 'b',
          text: 'MD 321 (Dodavatelé) / D 701 (Počáteční účet rozvažný)',
          debitPreview: '321',
          creditPreview: '701',
        },
        {
          id: 'c',
          text: 'MD 702 (Konečný účet rozvažný) / D 321 (Dodavatelé)',
          debitPreview: '702',
          creditPreview: '321',
        },
        {
          id: 'd',
          text: 'MD 321 (Dodavatelé) / D 710 (Účet zisků a ztrát)',
          debitPreview: '321',
          creditPreview: '710',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'Účet 321 je pasivní, takže jeho počáteční stav musí ležet na straně Dal (D 321). Souvztažný zápis na Počátečním účtu rozvažném je tudíž na opačné straně MD 701.',
      principleExplanation:
        'Počáteční účet rozvažný (701) je zrcadlovým obrazem rozvahy: pasiva otevírá ze své strany MD na stranu D pasivních účtů; aktiva otevírá ze své strany D na stranu MD aktivních účtů.',
      relatedAccounts: ['701', '321'],
      points: 2,
    },
  ],
};

export const ALL_ACCOUNTING_TOPICS: AccountingTopic[] = [
  TOPIC_1_ACCRUALS,
  TOPIC_2_INCOME_TAX,
  TOPIC_3_CLOSING,
  TOPIC_4_EQUITY,
  TOPIC_5_MANAGERIAL,
  TOPIC_6_COMPREHENSIVE,
];

export function getTopicById(id: number): AccountingTopic {
  return ALL_ACCOUNTING_TOPICS.find((t) => t.id === id) || TOPIC_1_ACCRUALS;
}
