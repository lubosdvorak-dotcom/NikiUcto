import { AccountingTopic } from '../types/accounting';

export const TOPIC_1_ACCRUALS: AccountingTopic = {
  id: 1,
  slug: 'casove-rozliseni-dohadne-polozky-rezervy',
  title: 'Časové rozlišení, dohadné položky a rezervy',
  shortTitle: 'Časové rozlišení a rezervy',
  description:
    'Akruální princip účetnictví v praxi: účty časového rozlišení (381–385), dohadné položky k rozvahovému dni (388, 389) a tvorba i čerpání zákonných a účetních rezerv (451, 459, 552, 554).',
  keyAccounts: ['381', '382', '383', '384', '385', '388', '389', '451', '459', '552', '554'],
  accountClasses: [3, 4, 5, 6],
  estimatedMinutes: 35,
  examWeightPercent: 22,
  studyCards: [
    {
      id: 't1-card-1',
      topicId: 1,
      order: 1,
      title: 'Náklady příštích období (381) — výdaj letos, náklad příští rok',
      subtitle: 'Předplacené nájemné, pojistné a odborné předplatné přes přelom účetního období',
      keyAccounts: ['381', '518', '548', '221', '321'],
      corePrinciple:
        'Účet 381 (Aktivní) používáme tehdy, když v běžném roce nastane peněžní výdaj nebo přijmeme fakturu (známe přesný účel, období i přesnou částku), ale náklad věcně souvisí až s následujícím účetním obdobím.',
      legislativeRule:
        '§ 3 odst. 1 Zákona o účetnictví (akruální princip) + ČÚS č. 017. Podmínkou použití účtu 381 je znalost 3 parametrů: účel, přesná částka a období, kterého se týká.',
      commonMistake:
        'Studenti často zaúčtují celou fakturu za dvouleté nájemné rovnou na 518 a pak k 31. 12. zapomenou část připadající na další rok odúčtovat, nebo zamění účet 381 za 383.',
      taxDeductibilityRule:
        'Daňově uznatelným nákladem (§ 24 ZDP) je pouze alikvotní část nákladu rozpuštěná do účtové třídy 5 v daném zdaňovacím období. Částka zůstávající na MD 381 základ daně v běžném roce NESNIŽUJE.',
      scenarioTitle: 'Modelový příklad: Předplacené nájemné kanceláří na 12 měsíců',
      scenarioContext:
        'Dne 1. 10. 2026 přijala obchodní společnost fakturu (FAP 88/2026) za pronájem skladu na období 1. 10. 2026 – 30. 9. 2027 v celkové výši 120 000 Kč (10 000 Kč / měsíc). Sleduj tok částek na T-účtech v roce 2026 a v roce 2027.',
      transactions: [
        {
          id: 't1-c1-tx1',
          document: 'FAP 88/2026',
          date: '01. 10. 2026',
          description: 'Faktura přijatá za nájemné na 12 měsíců (10/2026–09/2027) — celá částka nejprve na časové rozlišení',
          amount: 120000,
          debitAccount: '381',
          creditAccount: '321',
          pedagogicalHint:
            'Při přijetí faktury přesahující do dalšího roku zaúčtujeme celou částku na aktivní účet 381 (MD) a závazek vůči dodavateli 321 (D).',
          taxImpact: 'Zatím 0 Kč v nákladech — neutrální dopad do výsledku hospodaření.',
        },
        {
          id: 't1-c1-tx2',
          document: 'VÚD 45/2026',
          date: '31. 12. 2026',
          description: 'Rozpuštění poměrné části nájemného za 3 měsíce roku 2026 (říjen, listopad, prosinec = 3 × 10 000 Kč)',
          amount: 30000,
          debitAccount: '518',
          creditAccount: '381',
          pedagogicalHint:
            'Do nákladů běžného roku 2026 (MD 518) převedeme pouze 3 měsíce (30 000 Kč). Na účtu 381 zůstává zůstatek 90 000 Kč pro rok 2027.',
          taxImpact: 'Daňově uznatelný náklad roku 2026 ve výši 30 000 Kč.',
        },
        {
          id: 't1-c1-tx3',
          document: 'VÚD 02/2027',
          date: '01. 01. 2027',
          description: 'Rozpuštění zbývajících 9 měsíců nájemného do nákladů roku 2027 (leden–září = 9 × 10 000 Kč)',
          amount: 90000,
          debitAccount: '518',
          creditAccount: '381',
          pedagogicalHint:
            'V novém účetním období 2027 rozpustíme zůstatek účtu 381 (D 381) do provozních nákladů na služby (MD 518). Účet 381 je tím vyrovnán.',
          taxImpact: 'Daňově uznatelný náklad roku 2027 ve výši 90 000 Kč.',
        },
      ],
    },
    {
      id: 't1-card-2',
      topicId: 1,
      order: 2,
      title: 'Výdaje příštích období (383) — náklad letos, platba příští rok',
      subtitle: 'Nájemné placené pozadu a smluvně pevně stanovené částky hrazené v dalším roce',
      keyAccounts: ['383', '518', '221', '321'],
      corePrinciple:
        'Účet 383 (Pasivní) zachycuje situaci, kdy v běžném období již věcně vznikl náklad (např. užívali jsme pronajatý nebytový prostor v Q4), známe ze smlouvy PŘESNOU částku, ale platba (výdaj) proběhne až v příštím roce.',
      legislativeRule:
        'Rozdíl mezi 383 a 389: U účtu 383 známe k 31. 12. PŘESNOU částku přímo ze smlouvy (např. nájemní smlouva stanoví platbu pozadu). Pokud přesnou částku neznáme a čekáme na vyúčtování, musíme použít dohadný účet 389!',
      commonMistake:
        'Záměna 383 (Výdaje příštích období — pasivní účet, tvorba na D 383) s 381 (Náklady příštích období — aktivní účet, tvorba na MD 381).',
      taxDeductibilityRule:
        'Náklad zaúčtovaný MD 518 / D 383 je daňově uznatelný již v běžném období, protože věcně a časově souvisí s běžným rokem.',
      scenarioTitle: 'Modelový příklad: Nájemné prodejny placené čtvrtletně pozadu',
      scenarioContext:
        'Firma užívá prodejnu. Dle smlouvy platí nájemné za 4. čtvrtletí 2026 ve výši 45 000 Kč pozadu až dne 15. 1. 2027 přímo z bankovního účtu.',
      transactions: [
        {
          id: 't1-c2-tx1',
          document: 'VÚD 91/2026',
          date: '31. 12. 2026',
          description: 'Předpis nájemného za 4. čtvrtletí 2026 placeného v lednu 2027 (známe přesnou částku ze smlouvy)',
          amount: 45000,
          debitAccount: '518',
          creditAccount: '383',
          pedagogicalHint:
            'Protože prostor jsme užívali v roce 2026, náklad musí jít na MD 518 v roce 2026. Protože platba proběhne až v r. 2027, vytvoříme pasivní závazek časového rozlišení na D 383.',
          taxImpact: 'Snižuje základ daně roku 2026 o 45 000 Kč.',
        },
        {
          id: 't1-c2-tx2',
          document: 'VBÚ 03/2027',
          date: '15. 01. 2027',
          description: 'Úhrada dlužného nájemného za 4. čtvrtletí 2026 z bankovního účtu',
          amount: 45000,
          debitAccount: '383',
          creditAccount: '221',
          pedagogicalHint:
            'V lednu 2027 při odchodu peněz z banky (D 221) již NEÚČTUJEME do nákladů (518), ale zúčtujeme pasivní účet 383 na straně MD.',
          taxImpact: 'V roce 2027 již neovlivňuje výsledek hospodaření (pouze tok peněz).',
        },
      ],
    },
    {
      id: 't1-card-3',
      topicId: 1,
      order: 3,
      title: 'Výnosy příštích období (384) a Příjmy příštích období (385)',
      subtitle: 'Časové rozlišení na straně výnosů — přijaté předplatné vs. nefakturované výkony se známou cenou',
      keyAccounts: ['384', '385', '602', '221', '311'],
      corePrinciple:
        'Účet 384 (Pasivní) slouží pro tržby inkasované nebo vyfakturované předem, které věcně patří do výnosů příštího období. Účet 385 (Aktivní) slouží pro výnosy uskutečněné v běžném období se smluvně pevnou částkou, které vyfakturujeme/zinkasujeme až v příštím roce.',
      legislativeRule:
        'Výnosy se účtují do období, s nímž věcně a časově souvisejí. Přijaté nájemné na příští rok nesmí uměle zvýšit zisk běžného roku.',
      commonMistake:
        'Zaúčtování přijatého nájemného na příští rok rovnou na 602 bez časového rozlišení přes 384 — tím by účetní jednotka zdanila výnos o rok dříve!',
      taxDeductibilityRule:
        'Částka na D 384 vstupuje do zdanitelných výnosů až v roce, kdy je rozpuštěna MD 384 / D 602.',
      scenarioTitle: 'Modelový příklad: Přijaté nájemné předem na příští rok',
      scenarioContext:
        'Pronajímatel přijal dne 15. 12. 2026 na bankovní účet platbu nájemného na celý rok 2027 ve výši 180 000 Kč.',
      transactions: [
        {
          id: 't1-c3-tx1',
          document: 'VBÚ 118/2026',
          date: '15. 12. 2026',
          description: 'Přijatá platba nájemného na rok 2027 na běžný účet',
          amount: 180000,
          debitAccount: '221',
          creditAccount: '384',
          pedagogicalHint:
            'Peníze přibydou na MD 221, ale výnos patří celý až do roku 2027 — proto zapíšeme na pasivní účet Výnosy příštích období (D 384).',
          taxImpact: 'V roce 2026 nezvyšuje výsledek hospodaření ani základ daně.',
        },
        {
          id: 't1-c3-tx2',
          document: 'VÚD 01/2027',
          date: '01. 01. 2027',
          description: 'Zúčtování výnosů příštích období do tržeb z prodeje služeb v roce 2027',
          amount: 180000,
          debitAccount: '384',
          creditAccount: '602',
          pedagogicalHint:
            'V roce 2027 převedeme částku z účtu 384 (MD) do výnosů běžného období na účet 602 (D).',
          taxImpact: 'Zdanitelný výnos roku 2027 ve výši 180 000 Kč.',
        },
      ],
    },
    {
      id: 't1-card-4',
      topicId: 1,
      order: 4,
      title: 'Dohadné účty aktivní (388) a pasivní (389)',
      subtitle: 'Když k 31. 12. víme CO a ZA JAKÉ OBDOBÍ, ale NEZNÁME přesnou částku',
      keyAccounts: ['388', '389', '502', '648', '321', '378'],
      corePrinciple:
        'Dohadné položky používáme k 31. 12., pokud nastala skutečnost (spotřeba energie, pojistná událost), ale nemáme doklad s přesnou částkou. Částku stanovíme kvalifikovaným odhadem (dle loňské spotřeby, smlouvy či likvidátora).',
      legislativeRule:
        'ČÚS č. 017 bod 3.12: Dohadné účty aktivní (388) = odhadovaná pohledávka (např. náhrada od pojišťovny). Dohadné účty pasivní (389) = odhadovaný závazek (např. nevyfakturovaná elektřina, plyn).',
      commonMistake:
        'Při příchodu skutečné faktury v dalším roce studenti zapomenou vyrušit dohadnou položku (MD 389) a zaúčtují celou fakturu znovu do nákladů (502) — náklad by byl v účetnictví dvakrát!',
      taxDeductibilityRule:
        'Tvorba dohadné položky k daňově uznatelnému nákladu (např. 502/389 za energie) JE daňově uznatelná. Případný rozdíl mezi odhadem a skutečnou fakturou v dalším roce upraví náklady dalšího roku.',
      scenarioTitle: 'Modelový příklad: Nevyfakturovaná spotřeba elektrické energie',
      scenarioContext:
        'Do 31. 12. 2026 nedorazila vyúčtovací faktura za spotřebu elektřiny v prosinci. Podle odečtu elektroměru firma odhadla spotřebu na 50 000 Kč. Dne 18. 1. 2027 přišla faktura (neplátce DPH) na 54 000 Kč.',
      transactions: [
        {
          id: 't1-c4-tx1',
          document: 'VÚD 99/2026',
          date: '31. 12. 2026',
          description: 'Tvorba pasivní dohadné položky na nevyfakturovanou spotřebu elektřiny dle kvalifikovaného odhadu',
          amount: 50000,
          debitAccount: '502',
          creditAccount: '389',
          pedagogicalHint:
            'Spotřeba proběhla v roce 2026 -> MD 502. Faktura však ještě nepřišla -> nemůžeme použít 321, proto použijeme pasivní dohadný účet D 389.',
          taxImpact: 'Daňově uznatelný náklad roku 2026 ve výši 50 000 Kč.',
        },
        {
          id: 't1-c4-tx2',
          document: 'FAP 05/2027 (část A)',
          date: '18. 01. 2027',
          description: 'Zúčtování přijaté faktury proti vytvořenému dohadu (zrušení dohadného účtu pasivního)',
          amount: 50000,
          debitAccount: '389',
          creditAccount: '321',
          pedagogicalHint:
            'Jakmile v lednu dorazí faktura, nejprve odúčtujeme vytvořený dohad z roku 2026 (MD 389 / D 321 ve výši 50 000 Kč).',
          taxImpact: 'Zrušení dohadu 50 000 Kč neovlivňuje náklady roku 2027.',
        },
        {
          id: 't1-c4-tx3',
          document: 'FAP 05/2027 (část B)',
          date: '18. 01. 2027',
          description: 'Doúčtování rozdílu (nedoplatku oproti odhadu 4 000 Kč) do spotřeby energie roku 2027',
          amount: 4000,
          debitAccount: '502',
          creditAccount: '321',
          pedagogicalHint:
            'Protože skutečná faktura činila 54 000 Kč a dohad byl 50 000 Kč, rozdíl 4 000 Kč doúčtujeme do nákladů běžného roku 2027 (MD 502 / D 321).',
          taxImpact: 'Daňově uznatelný náklad roku 2027 ve výši 4 000 Kč.',
        },
      ],
    },
    {
      id: 't1-card-5',
      topicId: 1,
      order: 5,
      title: 'Rezervy zákonné (451/552) vs. ostatní účetní (459/554)',
      subtitle: 'Zásada opatrnosti, povinná deponace peněz a vliv na transformaci výsledku hospodaření',
      keyAccounts: ['451', '459', '552', '554', '511', '321'],
      corePrinciple:
        'Rezervy vyjadřují zásadu opatrnosti — vytváříme je na budoucí výdaje (např. plánovaná generální oprava budovy nebo záruční opravy). Zásadní maturitní rozdíl je mezi ZÁKONNOU rezervou (451/552, daňově uznatelná při deponaci peněz) a ÚČETNÍ rezervou (459/554, daňově NEUZNATELNÁ).',
      legislativeRule:
        'Zákon č. 593/1992 Sb., o rezervách: Zákonnou rezervu na opravy HM lze tvořit u majetku odpisovaného 5 a více let (minimálně 2 roky), a peněžní prostředky v plné výši rezervy musí být uloženy na samostatném vázaném účtu v bance nejpozději do termínu podání DPPO!',
      commonMistake:
        'Při příchodu faktury za opravu (MD 511 / D 321) studenti zapomenou současně rozpustit vytvořenou rezervu (MD 451 / D 552) — bez rozpuštění rezervy by náklad na opravu snížil zisk dvakrát!',
      taxDeductibilityRule:
        'Tvorba účetní rezervy (MD 554 / D 459) je NEDAŇOVÝ náklad (připočitatelná položka k VH). Naopak její zrušení/čerpání (MD 459 / D 554) je nedaňovým snížením nákladů (odečitatelná položka od VH).',
      scenarioTitle: 'Modelový příklad: Tvorba a čerpání zákonné rezervy na opravu střechy haly',
      scenarioContext:
        'Výrobní podnik plánuje opravu střechy výrobní haly za 400 000 Kč. V roce 2026 vytvoří druhou polovinu zákonné rezervy (200 000 Kč, první polovina 200 000 Kč je již v počátečním stavu na účtu 451). V roce 2027 opravu provede dodavatelsky za 380 000 Kč a celou rezervu 400 000 Kč rozpustí.',
      initialBalances: {
        '451': { side: 'D', amount: 200000 },
      },
      transactions: [
        {
          id: 't1-c5-tx1',
          document: 'VÚD 95/2026',
          date: '31. 12. 2026',
          description: 'Tvorba 2. roční splátky zákonné rezervy na opravu výrobní haly (peníze deponovány na zvláštním účtu)',
          amount: 200000,
          debitAccount: '552',
          creditAccount: '451',
          pedagogicalHint:
            'Tvorba zákonné rezervy zvyšuje náklady (MD 552) a zvyšuje pasivní zůstatek rezerv (D 451) na celkových 400 000 Kč.',
          taxImpact: 'Daňově uznatelný náklad 200 000 Kč (splněna podmínka deponace peněz).',
        },
        {
          id: 't1-c5-tx2',
          document: 'FAP 42/2027',
          date: '10. 06. 2027',
          description: 'Faktura přijatá od stavební firmy za provedenou opravu střechy haly',
          amount: 380000,
          debitAccount: '511',
          creditAccount: '321',
          pedagogicalHint:
            'Samotnou fakturu za opravu účtujeme VŽDY standardně do nákladů na opravy (MD 511 / D 321), nikdy ne přímo proti účtu 451!',
          taxImpact: 'Náklad na opravu 380 000 Kč na účtu 511.',
        },
        {
          id: 't1-c5-tx3',
          document: 'VÚD 50/2027',
          date: '10. 06. 2027',
          description: 'Čerpání a zrušení celé vytvořené zákonné rezervy po dokončení opravy (380 000 Kč čerpání + 20 000 Kč zrušení přebytku)',
          amount: 400000,
          debitAccount: '451',
          creditAccount: '552',
          pedagogicalHint:
            'Čerpání i zrušení nepotřebného zbytku rezervy účtujeme opačným zápisem než tvorbu: MD 451 / D 552 (snížení nákladů v účtové skupině 55).',
          taxImpact: 'Kompenzuje náklad na opravu (výsledný dopad do roku 2027 je +20 000 Kč z rozpuštěného přebytku rezervy).',
        },
      ],
    },
  ],
  cheatSheets: [
    {
      id: 't1-cs-1',
      title: 'Přehled souvztažností časového rozlišení (381–385) a dohadných položek (388–389)',
      summary:
        'Rychlý rozhodovací tahák: Znáš přesnou částku? Použij 381–385. Neznáš přesnou částku k 31. 12.? Použij 388 nebo 389.',
      items: [
        {
          id: 'cs1-1',
          operation: 'Předplacené nájemné / pojistné / předplatné (platba v r. 1, náklad v r. 2)',
          document: 'FAP / VBÚ / VPD',
          debitAccount: '381',
          creditAccount: '321 / 221 / 211',
          conditionOrNote: 'Známe účel, období i přesnou částku; v r. 2 rozpustíme MD 518 (548) / D 381',
          taxDeductible: 'podminene',
        },
        {
          id: 'cs1-2',
          operation: 'Rozpuštění nákladů příštích období do běžného období',
          document: 'VÚD',
          debitAccount: '518 / 548 / 501',
          creditAccount: '381',
          conditionOrNote: 'Alikvotní část připadající na dané účetní období',
          taxDeductible: 'ano',
        },
        {
          id: 'cs1-3',
          operation: 'Nájemné placené pozadu (náklad v r. 1, platba až v r. 2)',
          document: 'VÚD k 31. 12.',
          debitAccount: '518',
          creditAccount: '383',
          conditionOrNote: 'Přesná částka je známa ze smlouvy; při úhradě v r. 2 účtujeme MD 383 / D 221',
          taxDeductible: 'ano',
        },
        {
          id: 'cs1-4',
          operation: 'Přijaté předplatné / nájemné předem (příjem v r. 1, výnos v r. 2)',
          document: 'VBÚ / FAV',
          debitAccount: '221 / 311',
          creditAccount: '384',
          conditionOrNote: 'V příštím období rozpustíme do výnosů MD 384 / D 602',
          taxDeductible: 'ano',
        },
        {
          id: 'cs1-5',
          operation: 'Odhad nevyfakturované spotřeby energií nebo služeb k 31. 12.',
          document: 'VÚD k 31. 12.',
          debitAccount: '502 / 518',
          creditAccount: '389',
          conditionOrNote: 'Faktura do 31. 12. nepřišla, částku určujeme kvalifikovaným odhadem',
          taxDeductible: 'ano',
        },
        {
          id: 'cs1-6',
          operation: 'Odhad přiznané náhrady škody od pojišťovny k 31. 12.',
          document: 'VÚD k 31. 12.',
          debitAccount: '388',
          creditAccount: '648',
          conditionOrNote: 'Pojistná událost nastala letos, pojišťovna dosud nevyčíslila přesné plnění',
          taxDeductible: 'ano',
        },
        {
          id: 'cs1-7',
          operation: 'Tvorba zákonné rezervy na opravu HM (odpis. doba ≥ 5 let)',
          document: 'VÚD k 31. 12.',
          debitAccount: '552',
          creditAccount: '451',
          conditionOrNote: 'Nutná deponace peněz na samostatný účet (221.x / 221.1) do termínu DPPO',
          taxDeductible: 'ano',
        },
        {
          id: 'cs1-8',
          operation: 'Tvorba ostatní (účetní) rezervy na záruční opravy / rizika',
          document: 'VÚD k 31. 12.',
          debitAccount: '554',
          creditAccount: '459',
          conditionOrNote: 'Účetní rezerva bez deponace — při transformaci VH na ZD nutno připočíst (+)',
          taxDeductible: 'ne',
        },
      ],
    },
  ],
  questions: [
    // 1. Single Choice (Easy)
    {
      id: 't1-q1',
      topicId: 1,
      type: 'single_choice',
      difficulty: 'easy',
      title: 'Podmínky časového rozlišení',
      prompt:
        'Společnost ALFA, s.r.o. zaplatila dne 1. 11. 2026 z bankovního účtu pojistné firemních vozidel na 12 měsíců (11/2026–10/2027) ve výši 36 000 Kč. Jaká částka ovlivní výsledek hospodaření (účet 548) v roce 2026?',
      options: [
        {
          id: 'a',
          text: '6 000 Kč (za 2 měsíce: listopad a prosinec 2026), zbylých 30 000 Kč zůstane na účtu 381',
          debitPreview: '548',
          creditPreview: '381',
        },
        {
          id: 'b',
          text: '36 000 Kč (celá částka v okamžiku platby z bankovního účtu)',
          debitPreview: '548',
          creditPreview: '221',
        },
        {
          id: 'c',
          text: '9 000 Kč (za celé 4. čtvrtletí roku 2026)',
          debitPreview: '548',
          creditPreview: '383',
        },
        {
          id: 'd',
          text: '0 Kč, protože pojistné se zaúčtuje do nákladů až po skončení pojistné doby v říjnu 2027',
          debitPreview: '381',
          creditPreview: '221',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'Měsíční pojistné činí 36 000 / 12 = 3 000 Kč. V roce 2026 pojistka běží 2 měsíce (listopad a prosinec), tedy do nákladů roku 2026 (MD 548) patří 2 × 3 000 = 6 000 Kč. Zbývajících 10 měsíců (30 000 Kč) zůstává na aktivním účtu 381 – Náklady příštích období.',
      principleExplanation:
        'Akruální princip (§ 3 odst. 1 ZÚ): Náklady a výnosy účtujeme do období, s nímž věcně a časově souvisejí, bez ohledu na okamžik platby peněz.',
      relatedAccounts: ['381', '548', '221'],
      points: 2,
    },
    // 2. Booking (Easy)
    {
      id: 't1-q2',
      topicId: 1,
      type: 'booking',
      difficulty: 'easy',
      title: 'Zaúčtování předplaceného odborného časopisu (příští rok)',
      prompt:
        'Dne 20. 12. 2026 zaplatila účetní jednotka v hotovosti (VPD 112/2026) předplatné účetního zpravodaje na celý kalendářní rok 2027 ve výši 4 800 Kč. Zaúčtujte tento výdaj v prosinci 2026.',
      documentType: 'VPD 112/2026',
      transactionDate: '20. 12. 2026',
      expectedDebit: '381',
      expectedCredit: '211',
      expectedAmount: 4800,
      calculationHint: 'Celé předplatné se týká až roku 2027 -> v roce 2026 jde celá částka 4 800 Kč na Náklady příštích období (381) proti Pokladně (211).',
      explanation:
        'Protože se předplatné týká výhradně roku 2027, v prosinci 2026 nevzniká žádný náklad běžného období. Účtujeme MD 381 (Náklady příštích období) / D 211 (Pokladna) ve výši 4 800 Kč.',
      principleExplanation:
        'Výdaj nastal v roce 2026, ale spotřeba (odběr časopisů) proběhne až v roce 2027. Účet 381 je aktivní rozvahový účet, takže v roce 2026 neovlivňuje základ daně.',
      relatedAccounts: ['381', '211'],
      points: 3,
    },
    // 3. Error Detection (Medium)
    {
      id: 't1-q3',
      topicId: 1,
      type: 'error_detection',
      difficulty: 'medium',
      title: 'Kontrola deníku: Nájemné placené pozadu',
      prompt:
        'Zkontrolujte zápis v účetním deníku k 31. 12. 2026: Společnost užívala pronajaté garáže v prosinci 2026. Dle nájemní smlouvy činí prosincové nájemné přesně 15 000 Kč a je splatné pozadu dne 10. 1. 2027.',
      journalRow: {
        document: 'VÚD 88/2026',
        date: '31. 12. 2026',
        description: 'Časové rozlišení prosincového nájemného placeného v lednu 2027',
        amount: 15000,
        debit: '383',
        credit: '518',
      },
      isCorrectlyBooked: false,
      errorCategory: 'wrong_sides',
      correctDebit: '518',
      correctCredit: '383',
      correctAmount: 15000,
      correctionChoices: [
        {
          id: 'c1',
          label: 'MD 518 (Ostatní služby) / D 383 (Výdaje příštích období) — 15 000 Kč',
          debit: '518',
          credit: '383',
          amount: 15000,
        },
        {
          id: 'c2',
          label: 'MD 381 (Náklady příštích období) / D 518 (Ostatní služby) — 15 000 Kč',
          debit: '381',
          credit: '518',
          amount: 15000,
        },
        {
          id: 'c3',
          label: 'MD 518 (Ostatní služby) / D 389 (Dohadné účty pasivní) — 15 000 Kč',
          debit: '518',
          credit: '389',
          amount: 15000,
        },
      ],
      correctChoiceId: 'c1',
      explanation:
        'V účetním deníku byly převráceny strany Má dáti a Dal! Náklad na nájemné v prosinci vzniká na straně MD 518 a pasivní závazek časového rozlišení (Výdaje příštích období) vzniká na straně D 383.',
      principleExplanation:
        'Nákladové účty třídy 5 rostou vždy na straně Má dáti (MD). Účet 383 (Výdaje příštích období) má povahu pasiva (závazku zaplatit v příštím období), proto při tvorbě roste na straně Dal (D).',
      relatedAccounts: ['518', '383'],
      points: 3,
    },
    // 4. Single Choice (Medium)
    {
      id: 't1-q4',
      topicId: 1,
      type: 'single_choice',
      difficulty: 'medium',
      title: 'Rozlišení účtu 383 vs. 389 k rozvahovému dni',
      prompt:
        'K 31. 12. 2026 účetní jednotka neobdržela vyúčtovací fakturu za spotřebu zemního plynu za 4. čtvrtletí 2026. Na základě odečtu plynoměru a ceníku odhadla spotřebu na 82 000 Kč. Jaký účetní zápis provede k 31. 12. 2026?',
      options: [
        {
          id: 'a',
          text: 'MD 502 (Spotřeba energie) / D 389 (Dohadné účty pasivní) — 82 000 Kč',
          debitPreview: '502',
          creditPreview: '389',
        },
        {
          id: 'b',
          text: 'MD 502 (Spotřeba energie) / D 383 (Výdaje příštích období) — 82 000 Kč',
          debitPreview: '502',
          creditPreview: '383',
        },
        {
          id: 'c',
          text: 'MD 388 (Dohadné účty aktivní) / D 502 (Spotřeba energie) — 82 000 Kč',
          debitPreview: '388',
          creditPreview: '502',
        },
        {
          id: 'd',
          text: 'MD 502 (Spotřeba energie) / D 321 (Dodavatelé) — 82 000 Kč',
          debitPreview: '502',
          creditPreview: '321',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'Protože do 31. 12. nedorazila faktura a přesnou vyúčtovanou částku NEZNÁME (stanovujeme ji kvalifikovaným odhadem), musíme použít pasivní dohadný účet 389 (MD 502 / D 389).',
      principleExplanation:
        'Klíčové pravidlo pro maturitu: Známe přesnou částku (ze smlouvy) = 383 Výdaje příštích období. Neznáme přesnou částku (chybí faktura, odhadujeme) = 389 Dohadné účty pasivní.',
      relatedAccounts: ['502', '389', '383'],
      points: 2,
    },
    // 5. Booking (Medium)
    {
      id: 't1-q5',
      topicId: 1,
      type: 'booking',
      difficulty: 'medium',
      title: 'Odhad náhrady škody od pojišťovny k 31. 12.',
      prompt:
        'V listopadu 2026 došlo k zatopení skladu (škoda byla již zaúčtována na MD 549). Pojišťovna potvrdila, že pojistné plnění vyplatí, ale do 31. 12. 2026 ještě neukončila likvidaci. Účetní jednotka na základě posudku odhaduje náhradu od pojišťovny na 140 000 Kč. Zaúčtujte dohad k 31. 12. 2026 (VÚD).',
      documentType: 'VÚD 104/2026',
      transactionDate: '31. 12. 2026',
      expectedDebit: '388',
      expectedCredit: '648',
      expectedAmount: 140000,
      calculationHint: 'Odhadovaná pohledávka za pojišťovnou (neznáme přesnou částku) = MD 388 (Dohadné účty aktivní) / D 648 (Ostatní provozní výnosy).',
      explanation:
        'Nárok na náhradu škody od pojišťovny, u něhož k 31. 12. ještě neznáme přesnou výši plnění, účtujeme na MD 388 (Dohadné účty aktivní) a do provozních výnosů na D 648 (Ostatní provozní výnosy) ve výši 140 000 Kč.',
      principleExplanation:
        'Tímto zápisem věcně spárujeme náklad na škodu (549) s výnosem z náhrady (648) ve stejném účetním období 2026. Pokud by pojišťovna v roce 2026 přiznala přesnou částku písemným dopisem, použili bychom účet 378 místo 388.',
      relatedAccounts: ['388', '648', '378'],
      points: 3,
    },
    // 6. Single Choice (Hard)
    {
      id: 't1-q6',
      topicId: 1,
      type: 'single_choice',
      difficulty: 'hard',
      title: 'Daňová uznatelnost rezerv při transformaci VH na základ daně',
      prompt:
        'Účetní jednotka v prosinci 2026 zaúčtovala: 1) Tvorbu zákonné rezervy na opravu výrobní budovy (MD 552 / D 451) ve výši 250 000 Kč, ale peněžní prostředky na zvláštní vázaný účet v bance NEPŘEVEDLA. 2) Tvorbu rezervy na záruční opravy (MD 554 / D 459) ve výši 90 000 Kč. O jakou částku musí zvýšit účetní výsledek hospodaření při výpočtu základu daně z příjmů?',
      options: [
        {
          id: 'a',
          text: 'O 340 000 Kč (obě rezervy jsou v tomto případě daňově neuznatelné)',
          debitPreview: '552 + 554',
          creditPreview: '451 + 459',
        },
        {
          id: 'b',
          text: 'Pouze o 90 000 Kč (zákonná rezerva na účtu 552 je vždy daňově uznatelná)',
          debitPreview: '554',
          creditPreview: '459',
        },
        {
          id: 'c',
          text: 'Pouze o 250 000 Kč (rezerva na záruční opravy je daňově uznatelná)',
          debitPreview: '552',
          creditPreview: '451',
        },
        {
          id: 'd',
          text: 'O 0 Kč, protože tvorba rezerv v účtové skupině 55 vždy snižuje základ daně',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'Účetní rezerva na záruční opravy (90 000 Kč na účtu 554) je vždy daňově neuznatelná. Zákonná rezerva na opravu HM (250 000 Kč na účtu 552) je sice tvořena dle zákona o rezervách, ale protože firma NESPĹNILA podmínku deponace peněz na samostatný vázaný bankovní účet do termínu pro podání daňového přiznání, stává se rovněž daňově neuznatelnou! Celkem tedy připočítáváme 250 000 + 90 000 = 340 000 Kč.',
      principleExplanation:
        'Dle § 7 odst. 4 zákona č. 593/1992 Sb., o rezervách, není-li plná výše rezervy převedena na samostatný účet v bance nejpozději do termínu pro podání daňového přiznání, nelze tvorbu rezervy uplatnit jako daňově uznatelný výdaj.',
      relatedAccounts: ['451', '459', '552', '554'],
      points: 4,
    },
    // 7. Booking (Medium)
    {
      id: 't1-q7',
      topicId: 1,
      type: 'booking',
      difficulty: 'medium',
      title: 'Rozpuštění alikvotní části předplaceného nájemného k 31. 12.',
      prompt:
        'Dne 1. 9. 2026 zaplatila firma nájemné skladu na půl roku dopředu (září 2026 – únor 2027) v celkové výši 90 000 Kč a celou částku při platbě zaúčtovala na MD 381 / D 221. Zaúčtujte k 31. 12. 2026 (VÚD) převod poměrné části nájemného do nákladů běžného roku 2026.',
      documentType: 'VÚD 96/2026',
      transactionDate: '31. 12. 2026',
      expectedDebit: '518',
      expectedCredit: '381',
      expectedAmount: 60000,
      calculationHint: '90 000 Kč / 6 měsíců = 15 000 Kč/měsíc. V roce 2026 uběhly 4 měsíce (září, říjen, listopad, prosinec) => 4 × 15 000 = 60 000 Kč.',
      explanation:
        'Měsíční nájemné činí 90 000 / 6 = 15 000 Kč. Do roku 2026 spadají 4 měsíce (9, 10, 11, 12/2026), tedy 4 × 15 000 = 60 000 Kč. K 31. 12. 2026 rozpustíme MD 518 (Ostatní služby) / D 381 (Náklady příštích období) ve výši 60 000 Kč.',
      principleExplanation:
        'Na účtu 381 zůstane konečný zůstatek 30 000 Kč (za leden a únor 2027), který přejde do rozvahy v položce Krátkodobý majetek – Časové rozlišení aktiv.',
      relatedAccounts: ['518', '381'],
      points: 3,
    },
    // 8. Error Detection (Hard)
    {
      id: 't1-q8',
      topicId: 1,
      type: 'error_detection',
      difficulty: 'hard',
      title: 'Kontrola deníku: Vyúčtování skutečné faktury proti dohadné položce',
      prompt:
        'K 31. 12. 2025 vytvořila firma pasivní dohadnou položku na nevyfakturovanou spotřebu vody (MD 502 / D 389) ve výši 20 000 Kč. Dne 14. 1. 2026 došla od vodáren skutečná faktura (neplátce DPH) na částku 23 000 Kč. Účetní zapsal celou fakturu jedním řádkem takto:',
      journalRow: {
        document: 'FAP 04/2026',
        date: '14. 01. 2026',
        description: 'Faktura za spotřebu vody za minulý rok (skutečnost 23 000 Kč, dohad byl 20 000 Kč)',
        amount: 23000,
        debit: '502',
        credit: '321',
      },
      isCorrectlyBooked: false,
      errorCategory: 'wrong_account',
      correctDebit: '389',
      correctCredit: '321',
      correctAmount: 20000,
      correctionChoices: [
        {
          id: 'c1',
          label: 'Zúčtovat dohad MD 389 / D 321 (20 000 Kč) a pouze rozdíl 3 000 Kč zaúčtovat na MD 502 / D 321',
          debit: '389',
          credit: '321',
          amount: 20000,
        },
        {
          id: 'c2',
          label: 'Zaúčtovat celou částku 23 000 Kč na MD 383 / D 321',
          debit: '383',
          credit: '321',
          amount: 23000,
        },
        {
          id: 'c3',
          label: 'Stornovat dohad MD 389 / D 648 (20 000 Kč) a fakturu nechat na 502 / 321',
          debit: '389',
          credit: '648',
          amount: 20000,
        },
      ],
      correctChoiceId: 'c1',
      explanation:
        'Kdyby účetní zaúčtoval v lednu celých 23 000 Kč na účet 502, měl by náklad 20 000 Kč v účetnictví dvakrát (jednou v roce 2025 a podruhé v roce 2026) a účet 389 by mu zůstal viset v rozvaze! Správně musí nejprve zrušit dohad MD 389 / D 321 (20 000 Kč) a do nákladů roku 2026 (MD 502 / D 321) doúčtovat pouze rozdíl 3 000 Kč.',
      principleExplanation:
        'Dohadný účet pasivní (389) je překlenovací rozvahový účet. Při příchodu faktury se ruší na straně MD 389 proti D 321 a do výsledkových účtů (502) vstupuje pouze odchylka skutečnosti od odhadu.',
      relatedAccounts: ['389', '502', '321'],
      points: 4,
    },
    // 9. Error Detection (Easy - Correctly Booked case!)
    {
      id: 't1-q9',
      topicId: 1,
      type: 'error_detection',
      difficulty: 'easy',
      title: 'Kontrola deníku: Tvorba účetní rezervy na záruční opravy',
      prompt:
        'Zkontrolujte zápis v účetním deníku k 31. 12. 2026: Výrobce elektroniky vytvořil na základě statistiky reklamací účetní rezervu na budoucí záruční opravy ve výši 110 000 Kč.',
      journalRow: {
        document: 'VÚD 101/2026',
        date: '31. 12. 2026',
        description: 'Tvorba účetní rezervy na záruční opravy výrobků',
        amount: 110000,
        debit: '554',
        credit: '459',
      },
      isCorrectlyBooked: true,
      errorCategory: 'none',
      correctDebit: '554',
      correctCredit: '459',
      correctAmount: 110000,
      correctionChoices: [
        {
          id: 'c1',
          label: 'Zápis je v pořádku: MD 554 / D 459 — 110 000 Kč',
          debit: '554',
          credit: '459',
          amount: 110000,
        },
      ],
      correctChoiceId: 'c1',
      explanation:
        'Zápis v deníku je zcela správný! Tvorba ostatních (účetních) rezerv se účtuje na vrub nákladového účtu 554 (Tvorba a zúčtování ostatních rezerv) a ve prospěch pasivního účtu 459 (Ostatní rezervy).',
      principleExplanation:
        'Rezerva na záruční opravy není rezervou podle zvláštního zákona (není to rezerva na opravu vlastního dlouhodobého majetku), proto patří na 554 / 459 a je daňově neuznatelná.',
      relatedAccounts: ['554', '459'],
      points: 2,
    },
    // 10. Booking (Hard)
    {
      id: 't1-q10',
      topicId: 1,
      type: 'booking',
      difficulty: 'hard',
      title: 'Čerpání a zrušení zákonné rezervy po dokončení opravy',
      prompt:
        'Společnost vytvořila v minulých dvou letech zákonnou rezervu na opravu fasády administrativní budovy v celkové výši 500 000 Kč (zůstatek na účtu 451 je 500 000 Kč). V září 2026 byla oprava dokončena, faktura od stavební firmy na 460 000 Kč již byla zaúčtována na MD 511 / D 321. Zaúčtujte nyní (VÚD) zúčtování (čerpání a zrušení zbytku) celé zákonné rezervy.',
      documentType: 'VÚD 72/2026',
      transactionDate: '30. 09. 2026',
      expectedDebit: '451',
      expectedCredit: '552',
      expectedAmount: 500000,
      calculationHint: 'Po dokončení opravy se rozpouští CELÁ vytvořená rezerva na daný titul (460 000 Kč čerpání + 40 000 Kč zrušení nepotřebného přebytku = 500 000 Kč) zápisem MD 451 / D 552.',
      explanation:
        'Po dokončení opravy nesmí na účtu 451 zůstat nevyčerpaný zbytek rezervy na již opravený majetek. Proto rozpustíme celou rezervu 500 000 Kč zápisem MD 451 (Rezervy dle zvláštních předpisů) / D 552 (Tvorba a zúčtování zákonných rezerv).',
      principleExplanation:
        'Rozpuštění rezervy na straně Dal účtu 552 (500 000 Kč) sníží celkové náklady podniku a vykompenzuje náklad na opravu na účtu 511 (460 000 Kč). Rozdíl 40 000 Kč zvýší výsledek hospodaření i základ daně.',
      relatedAccounts: ['451', '552', '511'],
      points: 4,
    },
    // 11. Single Choice (Medium)
    {
      id: 't1-q11',
      topicId: 1,
      type: 'single_choice',
      difficulty: 'medium',
      title: 'Příjmy příštích období (385) v praxi',
      prompt:
        'Poradenská firma provedla v prosinci 2026 kompletní audit u klienta. Dle podepsané smlouvy o dílo je pevná cena auditu 65 000 Kč, ale fakturu může firma vystavit až po předání tištěné zprávy v lednu 2027. Jak bude firma účtovat k 31. 12. 2026?',
      options: [
        {
          id: 'a',
          text: 'MD 385 (Příjmy příštích období) / D 602 (Tržby z prodeje služeb) — 65 000 Kč',
          debitPreview: '385',
          creditPreview: '602',
        },
        {
          id: 'b',
          text: 'MD 602 (Tržby z prodeje služeb) / D 384 (Výnosy příštích období) — 65 000 Kč',
          debitPreview: '602',
          creditPreview: '384',
        },
        {
          id: 'c',
          text: 'MD 388 (Dohadné účty aktivní) / D 602 (Tržby z prodeje služeb) — 65 000 Kč',
          debitPreview: '388',
          creditPreview: '602',
        },
        {
          id: 'd',
          text: 'K 31. 12. 2026 neúčtuje nic, výnos vznikne až vystavením faktury v lednu 2027',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'Výkon (audit) byl uskutečněn v prosinci 2026, takže výnos věcně patří do roku 2026 (D 602). Protože známe přesnou smluvní cenu (65 000 Kč), ale fakturace/příjem proběhne až v roce 2027, použijeme aktivní účet 385 – Příjmy příštích období.',
      principleExplanation:
        'Účet 385 (Příjmy příštích období) je aktivní účet časového rozlišení: výnos již vznikl (D 602), známe přesnou částku, ale vyfakturování proběhne až v příštím období (kdy zaúčtujeme MD 311 / D 385).',
      relatedAccounts: ['385', '602', '311'],
      points: 3,
    },
    // 12. Single Choice (Easy)
    {
      id: 't1-q12',
      topicId: 1,
      type: 'single_choice',
      difficulty: 'easy',
      title: 'Výjimky z časového rozlišení dle ČÚS č. 017',
      prompt:
        'Kterou z následujících položek účetní jednotka podle Českých účetních standardů (ČÚS č. 017) NEROZLIŠUJE časově, i když byla zaplacena v prosinci na přelom roku?',
      options: [
        {
          id: 'a',
          text: 'Nevýznamné a pravidelně se opakující částky (např. drobný nákup kancelářských potřeb nebo prosincový paušál za mobil do nízkého limitu dle vnitřní směrnice)',
        },
        {
          id: 'b',
          text: 'Roční nájemné výrobní haly ve výši 600 000 Kč zaplacené v říjnu na 12 měsíců dopředu',
        },
        {
          id: 'c',
          text: 'Dvouleté havarijní pojištění flotily kamionů ve výši 480 000 Kč',
        },
        {
          id: 'd',
          text: 'Předem přijaté nájemné za nebytové prostory na celý příští rok ve výši 240 000 Kč',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'Dle ČÚS č. 017 není nutné časově rozlišovat nevýznamné a současně pravidelně se opakující částky (např. drobné kancelářské potřeby, kalendáře, drobné periodické poplatky), pokud to účetní jednotka upraví ve své vnitřní směrnici a nezkreslí tím věrný a poctivý obraz.',
      principleExplanation:
        'Zásada významnosti (materiality) v účetnictví: administrativní pracnost časového rozlišení korunových položek by převýšila informační přínos.',
      relatedAccounts: ['381', '501', '518'],
      points: 2,
    },
  ],
};
