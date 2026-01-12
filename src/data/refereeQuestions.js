import RefereeTime from './img/RefereeTime.png'
import RefereeTwopoints from './img/RefereePointfightTwopoints.png'
import RefereeRingKO from './img/RefereeRingKO.png'
import MTAnoaprovedShort from './img/NotaprovedMTAShort.png'
import RefereePushing from './img/RefereePushing.png'
import RefereeExit from './img/RefereeExit.png'

export const QUESTION_CATEGORIES = {
  C: { code: 'C', passScore: 24 },
  B: { code: 'B', passScore: 32 },
  A: { code: 'A', passScore: 38 },
};

export const LANGUAGES = {
  lv: 'Latviešu',
  en: 'English',
};

export const refereeQuestions = [
  // Q01
  {
    id: 'Q01',
    categories: ['C'],
    texts: {
      lv: {
        question:
          'Kādu komandu centra tiesnesis izmanto, lai nekavējoties apturētu cīņu?',
        options: {
          a: 'STOP',
          b: 'BREAK',
          c: 'FIGHT',
          d: 'TIME',
        },
      },
      en: {
        question:
          'Which verbal command does the center referee use to immediately stop the fight?',
        options: {
          a: 'STOP',
          b: 'BREAK',
          c: 'FIGHT',
          d: 'TIME',
        },
      },
    },
    correctKeys: ['a'],
  },

  // Q02
  {
    id: 'Q02',
    categories: ['C'],
    texts: {
      lv: {
        question:
          'Kādu komandu centra tiesnesis izmanto, lai atsāktu cīņu pēc pārtraukuma?',
        options: {
          a: 'uz priekšu',
          b: 'START',
          c: 'FIGHT',
          d: 'GO',
        },
      },
      en: {
        question:
          'Which verbal command does the center referee use to restart the fight after a break?',
        options: {
          a: 'Lets go',
          b: 'START',
          c: 'FIGHT',
          d: 'GO',
        },
      },
    },
    correctKeys: ['c'],
  },

  // Q03 (2 правильных)
  {
    id: 'Q03',
    categories: ['C','B'],
    texts: {
      lv: {
        question:
          'KURAS no šīm ir galvenās centra tiesneša atbildības?',
        options: {
          a: 'Nodrošināt sportistu drošību cīņas laikā',
          b: 'Bļaut uz sportistiem cīņas laikā',
          c: 'Vadīt cīņu ar komandām un žestiem',
          d: 'Sēdēt pie galdiņa un ievadīt punktus datorā',
        },
      },
      en: {
        question:
          'Which of the following are main responsibilities of the center referee?',
        options: {
          a: 'Ensure the fighters’ safety during the bout',
          b: 'Shout on the fighters during the fight',
          c: 'Control the bout with commands and gestures',
          d: 'Sit at the table and enter points into the computer',
        },
      },
    },
    correctKeys: ['a', 'c'],
  },

  // Q04
  {
    id: 'Q04',
    categories: ['C'],
    texts: {
      lv: {
        question:
          'Ko centra tiesnesis obligāti pārbauda pirms cīņas sākuma?',
        options: {
          a: 'Vai sportistiem ir pilns aizsargaprīkojums',
          b: 'Vai skatītāji ir apsēdušies',
          c: 'Vai ieslēgts dators',
          d: 'Vai trenerim ir dvielis uz pleca',
        },
      },
      en: {
        question:
          'What must the center referee always check before starting the bout?',
        options: {
          a: 'That the fighters have complete protective equipment',
          b: 'That all spectators are seated',
          c: 'Is computer working',
          d: 'That the coach has a towel on the shoulder',
        },
      },
    },
    correctKeys: ['a'],
  },

  // Q05
  {
    id: 'Q05',
    categories: ['C'],
    texts: {
      lv: {
        question:
          'Kāda ir PIRMĀ centra tiesneša darbība, ja sportists pilnībā iziet ārpus tatami laukuma?',
        options: {
          a: 'Nekavējoties dod oficiālu brīdinājumu',
          b: 'Dod komandu "STOP" un aptur cīņu',
          c: 'Neko nedara, ja bija tehnika',
          d: 'Uzreiz diskvalificē sportistu',
        },
      },
      en: {
        question:
          'What is the FIRST action the center referee should take when a fighter completely steps out of the tatami area?',
        options: {
          a: 'Immediately give an official warning',
          b: 'Give the command "STOP" and break the fight',
          c: 'Do nothing if there was a technique',
          d: 'Immediately disqualify the fighter',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q06 (2 правильных)
  {
    id: 'Q06',
    categories: ['C', 'B'],
    texts: {
      lv: {
        question:
          'KURAS no šīm ir obligātas prasības, lai tehnika tiktu ieskaitīta kā punkts?',
        options: {
          a: 'Kontrolēta tehnika',
          b: 'Pareizā trāpījuma virsma (cimda vai pēdas daļa)',
          c: 'Skaļāks treneris',
          d: 'Sportists pēc trāpījuma pagriežas ar muguru',
        },
      },
      en: {
        question:
          'Which of the following are mandatory requirements for a technique to be scored as a point?',
        options: {
          a: 'Controlled technique',
          b: 'Correct striking surface (part of glove or foot)',
          c: 'Louder coach',
          d: 'Fighter turns his back after the strike',
        },
      },
    },
    correctKeys: ['a', 'b'],
  },

  // Q07
  {
    id: 'Q07',
    categories: ['C', 'B'],
    texts: {
      lv: {
        question:
          'Kurš no šiem ir atļauts trāpījuma laukums tatami disciplīnās (Point Fighting / Light Contact)?',
        options: {
          a: 'Galvas aizmugure',
          b: 'Kakls un mugurkauls',
          c: 'Korpusa priekšējā un sānu daļa virs jostas',
          d: 'Ceļgali',
        },
      },
      en: {
        question:
          'Which of the following is a legal target area in tatami disciplines (Point Fighting / Light Contact)?',
        options: {
          a: 'Back of the head',
          b: 'Neck and spine',
          c: 'Front and sides of the torso above the belt',
          d: 'Knees',
        },
      },
    },
    correctKeys: ['c'],
  },

  // Q08
  {
    id: 'Q08',
    categories: ['C', 'B',],
    texts: {
      lv: {
        question: 'Kurš no šiem piemēriem NAV derīgs punkts?',
        options: {
          a: 'Kontrolēts taisnais sitiens ar roku korpusā',
          b: 'Kontrolēts sitiens ar kāju galvai ar atļauto pēdas daļu',
          c: 'Trāpījums ar roku pēc komandas "STOP"',
          d: 'Kontrolēts sitiens ar roku galvai ar pareizo cimda daļu',
        },
      },
      en: {
        question: 'Which of the following examples is NOT a valid scoring technique?',
        options: {
          a: 'Controlled straight punch to the body',
          b: 'Controlled kick to the head with the allowed part of the foot',
          c: 'Punch landed after the command "STOP"',
          d: 'Controlled punch to the head with the correct part of the glove',
        },
      },
    },
    correctKeys: ['c'],
  },

  // Q09
  {
    id: 'Q09',
    categories: ['C', 'B', 'A'],
    texts: {
      lv: {
        question:
          'Kāda ir pareizā nelielu atkārtotu pārkāpumu sankciju secība?',
        options: {
          a: 'Oficiāls brīdinājums → verbāls brīdinājums → mīnuss punkts → diskvalifikācija',
          b: 'Verbāls brīdinājums → oficiāls brīdinājums → mīnuss punkts → diskvalifikācija',
          c: 'verbāls brīdinājums → Mīnuss punkts → oficiāls brīdinājums → diskvalifikācija',
          d: 'Verbāls brīdinājums → mīnuss punkts → verbāls brīdinājums → oficiāls brīdinājums',
        },
      },
      en: {
        question:
          'What is the correct escalation order for repeated minor fouls?',
        options: {
          a: 'Official warning → verbal warning → minus point → disqualification',
          b: 'Verbal warning → official warning → minus point → disqualification',
          c: 'Verbal warning → Minus point → official warning → disqualification',
          d: 'Verbal warning → → minus point → verbal warning → official warning',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q10 (2 правильных)
  {
    id: 'Q10',
    categories: ['C', 'B',],
    texts: {
      lv: {
        question:
          'KURAS darbības tiek uzskatītas par personiskām kļūdām (fouliem)?',
        options: {
          a: 'Sitieni ar galvu',
          b: 'Sitieni pirms komandas "STOP"',
          c: 'Skaļš svilpiens pēc punkta',
          d: 'Kihaps (kaujas sauciens) sitiena laikā',
        },
      },
      en: {
        question:
          'Which of the following actions are considered personal fouls?',
        options: {
          a: 'Headbutting',
          b: 'Striking before the command "STOP"',
          c: 'Loud whistling after a point',
          d: 'Kiai (shout) during a technique',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q11
  {
    id: 'Q11',
    categories: ['C', 'B'],
    texts: {
      lv: {
        question:
          'Ko tiesnesim jādara, ja sportistam cīņas laikā izkrīt zobu aizsargs (mouthguard)?',
        options: {
          a: 'Nekavējoties dod komandu "STOP/TIME", lai to sakārtotu',
          b: 'Ignorē, ja sportists turpina cīņu',
          c: 'Diskvalificē sportistu',
          d: 'Piešķir automātisku punktu',
        },
      },
      en: {
        question:
          'What must the referee do if a fighter’s mouthguard falls out during the bout?',
        options: {
          a: 'Immediately give the command "STOP/TIME" to fix it',
          b: 'Ignore it if the fighter continues',
          c: 'Disqualify the fighter',
          d: 'Award an automatic point ',
        },
      },
    },
    correctKeys: ['a'],
  },

  // Q12
  {
    id: 'Q12',
    categories: ['C', 'B'],
    texts: {
      lv: {
        question:
          'Kādā situācijā IR obligāti jāizsauc rings/tatami ārsts?',
        options: {
          a: 'Ja sportists atsakās turpināt cīņu fiziska diskomforta dēļ',
          b: 'Ja ir redzami nopietni savainojuma simptomi (piemēram, iespējams satricinājums, spēcīga asiņošana)',
          c: 'Ja treneris prasa "TIME"',
          d: 'Ja sportistam atritinās apsējs uz rokas',
        },
      },
      en: {
        question:
          'In which situation is it mandatory to call the ring/tatami doctor?',
        options: {
          a: 'If the fighter refuses to continue due to minor discomfort',
          b: 'If there are visible serious injury signs (possible concussion, heavy bleeding)',
          c: 'If the coach asks for "TIME"',
          d: 'If a bandage on the arm becomes loose',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q13 (2 правильных)
  {
    id: 'Q13',
    categories: ['C', 'B',],
    texts: {
      lv: {
        question:
          'KURAS no šīm ir pareizi iemesli, lai apstādinātu laiku ar komandu "TIME"?',
        options: {
          a: 'Lai koriģētu vai sakārtotu aizsargaprīkojumu',
          b: 'Lai ļautu trenerim dot ilgākas taktiskās norādes',
          c: 'Lai ielaistu ārstu, kas pārbauda savainojumu',
          d: 'Lai sodītu sportistu par pasivitāti bez pārtraukuma',
        },
      },
      en: {
        question:
          'Which of the following are correct reasons to stop the time with the command "TIME"?',
        options: {
          a: 'To correct or adjust protective equipment',
          b: 'To allow the coach to give longer tactical instructions',
          c: 'To allow the doctor to enter and check an injury',
          d: 'To punish a fighter for passivity without a break',
        },
      },
    },
    correctKeys: ['a', 'c'],
  },

  // Q14 (2 правильных)
  {
    id: 'Q14',
    categories: ['C', 'B', ],
    texts: {
      lv: {
        question:
          'KURAS no zemāk minētajām disciplīnām ir RINGA disciplīnas WAKO noteikumos?',
        options: {
          a: 'Point Fighting',
          b: 'Full Contact',
          c: 'K-1 Rules',
          d: 'Light Contact',
        },
      },
      en: {
        question:
          'Which of the following are RING disciplines under WAKO rules?',
        options: {
          a: 'Point Fighting',
          b: 'Full Contact',
          c: 'K-1 Rules',
          d: 'Light Contact',
        },
      },
    },
    correctKeys: ['b', 'c'],
  },

  // Q15
  {
    id: 'Q15',
    categories: ['C', 'B'],
    texts: {
      lv: {
        question: 'Kas ir "knockdown" tatami disciplīnās?',
        options: {
          a: 'Kad sportists šķērso tatami robežu',
          b: 'Kad sportists pēc sitiena pieskaras ringa grīdai ar citu ķermeņa daļu, nevis pēdām',
          c: 'Kad sportists uz mirkli pagriežas ar muguru',
          d: 'Kad sportistam izkrīt zobu aizsargs',
        },
      },
      en: {
        question: 'What is a "knockdown" in ring disciplines?',
        options: {
          a: 'When the fighter crosses the tatami border',
          b: 'When the fighter, after a strike, touches the ring floor with any body part other than the soles of the feet',
          c: 'When the fighter briefly turns his back',
          d: 'When the fighter’s mouthguard falls out',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q16 (2 правильных)
  {
    id: 'Q16',
    categories: ['C', 'B', 'A'],
    texts: {
      lv: {
        question:
          'KURAS personas galvenokārt atbild par lēmumu, vai cīņa drīkst turpināties pēc nopietna savainojuma?',
        options: {
          a: 'Rings/tatami ārsts',
          b: 'Sportists',
          c: 'Treneris',
          d: 'Centra tiesnesis',
        },
      },
      en: {
        question:
          'Which persons are primarily responsible for deciding whether the bout may continue after a serious injury?',
        options: {
          a: 'Ring/tatami doctor',
          b: 'Fighter',
          c: 'Coach',
          d: 'Center referee',
        },
      },
    },
    correctKeys: ['a', 'd'],
  },

  // Q17
  {
    id: 'Q17',
    categories: ['C', 'B', 'A'],
    texts: {
      lv: {
        question:
          'Ko parasti dara tiesnesis, ja sportists pēc iepriekšēja brīdinājuma atkārtoti apzināti iziet ārpus laukuma, lai izvairītos no cīņas?',
        options: {
          a: 'Dod vēl vienu verbālu brīdinājumu bez sankcijas',
          b: 'Piešķir mīnuss punktu',
          c: 'Neko nedara',
          d: 'Uzreiz pasludina neizšķirtu',
        },
      },
      en: {
        question:
          'What does the referee usually do if, after a previous warning, a fighter REPEATEDLY steps out of the area deliberately to avoid fighting?',
        options: {
          a: 'Give another verbal warning without sanction',
          b: 'Award a minus point',
          c: 'Do nothing',
          d: 'Immediately declare a draw',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q18
  {
    id: 'Q18',
    categories: ['C',],
    texts: {
      lv: {
        question:
          'Kurš no šiem aizsargiem ir obligāts visās kickboksa disciplīnās?',
        options: {
          a: 'Ceļgalu sargi',
          b: 'Zobu aizsargs (mouthguard)',
          c: 'Krūšukurvja aizsargs vīriešiem',
          d: 'Kakla aizsargs',
        },
      },
      en: {
        question:
          'Which of the following pieces of equipment is mandatory in all kickboxing disciplines?',
        options: {
          a: 'Knee pads',
          b: 'Mouthguard',
          c: 'Chest protector for men',
          d: 'Neck protector',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q19
  {
    id: 'Q19',
    categories: ['C',],
    texts: {
      lv: {
        question: 'Kur ir pareizā trenera vieta cīņas laikā?',
        options: {
          a: 'Stāvēt pie tatami malas un kustēties līdzi cīņai',
          b: 'Sēdēt savā stūrī / aiz tatami līnijas treneru zonā',
          c: 'Staigāt starp tiesnešiem un komentēt rezultātu',
          d: 'Sēdēt starp skatītājiem',
        },
      },
      en: {
        question: 'Where is the correct place for the coach during the bout?',
        options: {
          a: 'Stand at the edge of tatami and move with the fight',
          b: 'Sit in his corner / behind the tatami line in the coach’s zone',
          c: 'Walk between the judges and comment on the score',
          d: 'Sit among the spectators',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q20
  {
    id: 'Q20',
    categories: ['C', 'B'],
    texts: {
      lv: {
        question:
          'Kas drīkst oficiāli iesniegt protestu par cīņas rezultātu atbilstoši noteikumiem?',
        options: {
          a: 'Sportists pats',
          b: 'Skatītāji',
          c: 'Komandas pārstāvis / galvenais treneris',
          d: 'Stūra tiesnesis',
        },
      },
      en: {
        question:
          'Who is allowed to officially submit a protest regarding the result of a bout according to the rules?',
        options: {
          a: 'The fighter himself',
          b: 'The spectators',
          c: 'The team representative/head coach',
          d: 'A corner judge',
        },
      },
    },
    correctKeys: ['c'],
  },

  // Q21 (2 правильных)
  {
    id: 'Q21',
    categories: ['C', 'B',],
    texts: {
      lv: {
        question:
          'KURAS situācijas tiek uzskatītas par nesportisku uzvedību?',
        options: {
          a: 'Apzināti izsmej pretinieku pēc uzvaras',
          b: 'Klusi dod "high five" pretiniekam pēc cīņas',
          c: 'Tīši ignorē tiesneša komandas',
          d: 'Pēc cīņas paspiež roku tiesnešiem',
        },
      },
      en: {
        question:
          'Which of the following situations are considered unsportsmanlike conduct?',
        options: {
          a: 'Deliberately mocking the opponent after the victory',
          b: 'Quietly giving a high five to the opponent after the bout',
          c: 'Intentionally ignoring the referee’s commands',
          d: 'Shaking hands with the officials after the bout',
        },
      },
    },
    correctKeys: ['a', 'c'],
  },

  // Q22 
  {
    id: 'Q22',
    categories: ['B', 'A'],
    texts: {
      lv: {
        question:
          'Kā centra tiesnesis tatami disciplīnās parasti parāda punktu SARKANAJAM sportistam pointfight?',
        options: {
          a: 'Paceļ labo roku ar vienu pirkstu',
          b: 'Paceļ abas rokas virs galvas',
          c: 'Paceļ kreiso roku ar vienu pirkstu',
          d: 'Norāda uz galveno sekretariātu ar atvērtu plaukstu',
        },
      },
      en: {
        question:
          'How does the center referee usually signal a point for the RED fighter in tatami disciplines pointfight?',
        options: {
          a: 'Raises the right arm with one finger',
          b: 'Raises both arms above the head',
          c: 'Raises the left arm with one finger',
          d: 'Points to the main table with an open hand',
        },
      },
    },
    correctKeys: ['a'],
  },

  // Q23
  {
    id: 'Q23',
    categories: ['C'],
    texts: {
      lv: {
        question: 'Kā pareizi uzsākt cīņu tatami disciplīnās?',
        options: {
          a: 'Sportisti nostājas centrā, tiesnesis pārbauda gatavību un dod komandu "FIGHT"',
          b: 'Sportisti paši sāk, kad ir gatavi',
          c: 'Treneris dod komandu startam',
          d: 'Tiesnesis dod signālu, bet neko nesaka',
        },
      },
      en: {
        question: 'How should a bout be correctly started in tatami disciplines?',
        options: {
          a: 'Fighters stand in the center, referee checks readiness and gives the command "FIGHT"',
          b: 'Fighters start by themselves when ready',
          c: 'The coach gives the start command',
          d: 'The referee but says nothing',
        },
      },
    },
    correctKeys: ['a'],
  },

  // Q24
  {
    id: 'Q24',
    categories: ['B', 'A'],
    texts: {
      lv: {
        question:
          'Kas jādara, ja abi sportisti VIENLAICĪGI trāpa derīgu tehniku ar vienādu vērtību (Point Fighting)?',
        options: {
          a: 'Abi saņem punktus',
          b: 'Neviens punkts netiek piešķirts ("no point")',
          c: 'Punktu saņem sportists, kurš skaļāk kliedza',
          d: 'Punktu saņem sportists, kurš atrodas tuvāk centram',
        },
      },
      en: {
        question:
          'What should happen if both fighters land valid techniques of equal value at the SAME time (Point Fighting)?',
        options: {
          a: 'Both fighters receive points',
          b: 'No point is awarded ("no point")',
          c: 'The point goes to the fighter who shouted louder',
          d: 'The point goes to the fighter closer to the center',
        },
      },
    },
    correctKeys: ['a'],
  },

  // Q25
  {
    id: 'Q25',
    categories: ['C', 'B'],
    texts: {
      lv: {
        question:
          'Ko dara tiesnesis, ja viens sportists uz tatami ilgstoši izvairās no cīņas, un tikai pieņem sitienus?',
        options: {
          a: 'Ignorē, ja nav pārkāpumu',
          b: 'Var dot brīdinājumu par pasivitāti',
          c: 'Piešķir automātisku punktu aktīvākajam sportistam bez brīdinājuma',
          d: 'Sāk skaitīt knockdown',
        },
      },
      en: {
        question:
          'What does the referee do if one fighter constantly avoids the fight and only moves backwards?',
        options: {
          a: 'Ignore it if there is no foul',
          b: 'May give a warning for passivity',
          c: 'Automatically award a point to the more active fighter without warning',
          d: 'Start counting a knockdown',
        },
      },
    },
    correctKeys: ['d'],
  },

  // Q26
  {
    id: 'Q26',
    categories: ['C', 'B', 'A'],
    texts: {
      lv: {
        question:
          'Kā tiesnesim jārīkojas, ja notiek acīmredzams neatļauts sitiens zem jostas (low blow)?',
        options: {
          a: 'Nekavējoties jāturpina cīņa',
          b: 'Jādod komanda "STOP/TIME", jāpārbauda cietušais un jāpiemēro sankcija atkarībā no nodoma',
          c: 'Uzreiz jādiskvalificē vainīgais sportists bez izvērtēšanas',
          d: 'Jāpiešķir punkts sportistam, kurš izdarīja sitienu',
        },
      },
      en: {
        question:
          'How should the referee act if there is an obvious illegal low blow?',
        options: {
          a: 'Immediately let the fight continue',
          b: 'Give the command "STOP/TIME", check the injured fighter and apply sanction depending on intention',
          c: 'Immediately disqualify the offending fighter without evaluation',
          d: 'Award a point to the fighter who delivered the blow',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q27
  {
    id: 'Q27',
    categories: ['C', 'B'],
    texts: {
      lv: {
        question:
          'Kas jādara tiesnesim ringa disciplīnās, ja sportisti ieiet klīnčā un nestrādā?',
        options: {
          a: 'Klusējot gaida, līdz viens nokrīt',
          b: 'Dod komandu "BREAK" un atdala sportistus',
          c: 'Dod komandu "FIGHT" vēlreiz',
          d: 'Nekavējoties piešķir punktu aktīvākajam',
        },
      },
      en: {
        question:
          'What should the referee do in ring disciplines if the fighters are in a clinch and not working?',
        options: {
          a: 'Silently wait until one falls',
          b: 'Give the command "BREAK" and separate the fighters',
          c: 'Give the command "FIGHT" again',
          d: 'Immediately award a point to the more active fighter',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q28 (2 правильных)
  {
    id: 'Q28',
    categories: ['C', 'B', 'A'],
    texts: {
      lv: {
        question:
          'KURAS lietas stūra tiesnesim ir būtiskākās cīņas laikā?',
        options: {
          a: 'Nepārtraukti sekot sitieniem un punktiem',
          b: 'Sekot līdzi treneru komentāriem',
          c: 'Saglabāt neitralitāti un objektivitāti',
          d: 'Aplaudēt skaistām kombinācijām',
        },
      },
      en: {
        question:
          'Which of the following are the most important tasks for a corner judge during the bout?',
        options: {
          a: 'Constantly follow the strikes and points',
          b: 'Follow the coaches’ comments',
          c: 'Maintain neutrality and objectivity',
          d: 'Applaud nice combinations',
        },
      },
    },
    correctKeys: ['a', 'c'],
  },

  // Q29
  {
    id: 'Q29',
    categories: ['C', 'B',],
    texts: {
      lv: {
        question:
          'Kādas krāsas parasti tiek izmantotas, lai atšķirtu sportistus WAKO sacensībās?',
        options: {
          a: 'Sarkana un zila',
          b: 'Sarkana un zaļa',
          c: 'Melna un zila',
          d: 'Sarkana un violeta',
        },
      },
      en: {
        question:
          'Which colors are usually used to distinguish the fighters in WAKO competitions?',
        options: {
          a: 'Red and blue',
          b: 'Red and green',
          c: 'Black and blue',
          d: 'Red and purple',
        },
      },
    },
    correctKeys: ['a'],
  },

  // Q30
  {
    id: 'Q30',
    categories: ['C', 'B'],
    texts: {
      lv: {
        question:
          'Kas ir pareizais tiesneša princips, ja pēc cīņas punktu starpība ir tikai viens punkts?',
        options: {
          a: 'Pārskatīt savus pierakstus un, ja viss pareizi, atstāt lēmumu',
          b: 'Automātiski dot neizšķirtu',
          c: 'Mainīt rezultātu par labu mājiniekam',
          d: 'Lūgt galvenajam tiesnesim pateikt, par ko balsot',
        },
      },
      en: {
        question:
          'What is the correct principle for a judge if the point difference after the bout is only one point?',
        options: {
          a: 'Review own notes and, if everything is correct, keep the decision',
          b: 'Automatically give a draw',
          c: 'Change the result in favor of the home fighter',
          d: 'Ask the head referee whom to vote for',
        },
      },
    },
    correctKeys: ['a'],
  },

  // Q31
  {
    id: 'Q31',
    categories: ['C',"B"],
    texts: {
      lv: {
        question:
          'Ko jādara, ja pirms cīņas tiek pamanīti auskari vai citi rotājumi uz sportista ķermeņa?',
        options: {
          a: 'Atļaut cīņu, ja tie ir mazi',
          b: 'Pieprasīt nekavējoties noņemt rotājumus pirms cīņas sākuma',
          c: 'Iedot brīdinājumu sportistam',
          d: 'Noņemt auskarus un iedot brīdinājumu "Not ready for fight" un atņemt punktus',
        },
      },
      en: {
        question:
          'What should be done if, before the bout, earrings or other jewelry are noticed on the fighter’s body?',
        options: {
          a: 'Allow the bout if they are small',
          b: 'Require the jewelry to be removed immediately before the bout starts',
          c: 'Immediately give warning for the fighter',
          d: 'Require the jewelry to be removed immediately and give warning "Not ready for fight"',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q32
  {
    id: 'Q32',
    categories: ['C'],
    texts: {
      lv: {
        question: 'Kāpēc nagi ir jāpārbauda pirms cīņas?',
        options: {
          a: 'Lai novērtētu sportista higiēnu',
          b: 'Lai nepieļautu savainojumus no asi nagi',
          c: 'Lai noteiktu sportista vecumu',
          d: 'Lai uzlabotu tvērienu cimdos',
        },
      },
      en: {
        question: 'Why must the nails be checked before the bout?',
        options: {
          a: 'To evaluate the fighter’s hygiene',
          b: 'To prevent injuries from sharp nails',
          c: 'To determine the fighter’s age',
          d: 'To improve the grip in gloves',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q33
  {
    id: 'Q33',
    categories: ['C', 'B'],
    texts: {
      lv: {
        question: 'Ko nozīmē komanda "BREAK"?',
        options: {
          a: 'Apturēt cīņu laika pārtraukumam',
          b: 'Atkāpties vienu soli un atsākt cīņu',
          c: 'Pārtraukt klīnču un atdalīt sportistus bez sitieniem',
          d: 'Dot komandu tiesnešiem pārtraukt punktu skaitīšanu',
        },
      },
      en: {
        question: 'What does the command "BREAK"?',
        options: {
          a: 'Stop the bout for a time-out',
          b: 'Step back one step and restart the fight',
          c: 'Stop the clinch and separate the fighters without striking',
          d: 'Order the judges to stop scoring',
        },
      },
    },
    correctKeys: ['c', 'b'],
  },

  // Q34 (2 правильных)
  {
    id: 'Q34',
    categories: ['C', 'B'],
    texts: {
      lv: {
        question:
          'KURAS situācijas var novest pie DISKVALIFIKĀCIJAS?',
        options: {
          a: 'Atkārtoti tīši bīstami sitieni galvai pēc brīdinājumiem',
          b: 'Atteikšanās pakļauties tiesneša rīkojumiem',
          c: 'Tas, ka sportists zaudē ar lielu punktu starpību',
          d: 'Tas, ka sportists ir noguris un elso',
        },
      },
      en: {
        question:
          'Which of the following situations may lead to DISQUALIFICATION?',
        options: {
          a: 'Repeated intentional dangerous strikes to the head after warnings',
          b: 'Refusal to obey the referee’s orders',
          c: 'The fighter is losing by a large point margin',
          d: 'The fighter is tired and breathing heavily',
        },
      },
    },
    correctKeys: ['a', 'b'],
  },

  // Q35
  {
    id: 'Q35',
    categories: ['C'],
    texts: {
      lv: {
        question:
          'Ja sportists izskatās satricināts, bet saka, ka jūtas labi un grib turpināt, kas ir tiesneša galvenais princips?',
        options: {
          a: 'Vienmēr ļaut turpināt, ja sportists grib',
          b: 'Pieņemt lēmumu kopā ar ārstu par sportista drošību',
          c: 'Jautāt trenera viedokli',
          d: 'Pagaidīt, vai treneris iesniedz protestu',
        },
      },
      en: {
        question:
          'If a fighter looks concussed but says he feels fine and wants to continue, what is the referee’s main principle?',
        options: {
          a: 'Always allow to continue if the fighter wants',
          b: 'Make a decision together with the doctor based on safety',
          c: 'Ask the coach’s opinion',
          d: 'Wait to see if the coach protests',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q36
  {
    id: 'Q36',
    categories: ['C'],
    texts: {
      lv: {
        question:
          'Ko jādara, ja tiesnesis pamana acīmredzamu kļūdu rezultātu tablo (punkti piešķirti nepareizajam sportistam)?',
        options: {
          a: 'Ignorēt, jo par to atbild sekretariāts',
          b: 'Apturēt cīņu atbilstošā brīdī un lūgt kļūdu izlabot',
          c: 'Pats klusām izlabo punktus pēc cīņas',
          d: 'Paziņot tikai trenerim',
        },
      },
      en: {
        question:
          'What should be done if the referee notices an obvious mistake on the scoreboard (points given to the wrong fighter)?',
        options: {
          a: 'Ignore it because the table is responsible',
          b: 'Stop the bout at the right moment and ask to correct the error',
          c: 'Silently correct the points alone after the bout',
          d: 'Tell only the coach',
        },
      },
    },
    correctKeys: ['b'],
  },

  // Q37
  {
    id: 'Q37',
    categories: ['C'],
    texts: {
      lv: {
        question:
          'Kā tiesnesim jāuzvedas, lai saglabātu NEITRALITĀTI pirms cīņas?',
        options: {
          a: 'Apkamt vienu sportistu, kuru pats trenē',
          b: 'Dod "high five" tikai vienai komandai',
          c: 'Izvairās no īpašas komunikācijas ar vienu sportistu un attiecas vienādi pret abiem',
          d: 'Pirms cīņas skaļi pasaka, kurš ir favorīts',
        },
      },
      en: {
        question:
          'How should a referee behave to maintain NEUTRALITY before the bout?',
        options: {
          a: 'Hug one fighter whom he personally trains',
          b: 'Give a high five only to one team',
          c: 'Avoid special contact with one fighter and treat both equally',
          d: 'Loudly say who is the favorite before the bout',
        },
      },
    },
    correctKeys: ['c'],
  },

  // Q38
  {
  id: 'Q38',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Cik ilgs ir maksimālais laiks pēc cīņas rezultāta paziņošanas, kurā oficiālu protestu drīkst iesniegt ringa/tatami galvenajam tiesnesim (pēc WAKO vispārējiem noteikumiem)?',
      options: {
        a: '5 minūtes',
        b: '10 minūtes',
        c: '15 minūtes',
        d: '30 minūtes',
      },
    },
    en: {
      question:
        'According to WAKO General Rules, what is the maximum time after the bout result is announced to submit an official protest to the Chief of ring/tatami?',
      options: {
        a: '5 minutes',
        b: '10 minutes',
        c: '15 minutes',
        d: '30 minutes',
      },
    },
  },
  correctKeys: ['b'], // 10 minutes 
},

  // Q39
  
  {
  id: 'Q39',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Cik oficiālu sacensību disciplīnu ir WAKO (kopā ringa un tatami disciplīnas)?',
      options: {
        a: '5',
        b: '6',
        c: '7',
        d: '8',
      },
    },
    en: {
      question:
        'How many official WAKO competition disciplines are there in total (ring and tatami together)?',
      options: {
        a: '5',
        b: '6',
        c: '7',
        d: '8',
      },
    },
  },
  correctKeys: ['c'], // 7 disciplines 
},


  // Q40
  {
    id: 'Q40',
    categories: ['C'],
    texts: {
      lv: {
        question:
          'Kas ir svarīgākais, aizpildot punktu karti kā stūra tiesnesim?',
        options: {
          a: 'Rakstīt ar zīmuli, lai varētu mainīt',
          b: 'Rakstīt skaidri, salasāmi, bez labojumiem un laicīgi nodot rezultātu',
          c: 'Vispirms apspriest rezultātu ar citu tiesnesi',
          d: 'Pēc cīņas pajautāt galvenajam tiesnesim, ko rakstīt',
        },
      },
      en: {
        question:
          'What is most important when filling in the scorecard as a corner judge?',
        options: {
          a: 'Write with a pencil so it can be changed',
          b: 'Write clearly and legibly without corrections and hand in the result in time',
          c: 'First discuss the result with another judge',
          d: 'Ask the head referee after the bout what to write',
        },
      },
    },
    correctKeys: ['b'],
  },
  {
    id: 'Q41',
    categories: ['B', 'A'],
    texts: {
      lv: {
        question:
          'Ringa disciplīnās sportists A nosūta sportistu B knockdownā. Kamēr tiesnesis skaita, sportists A NEIET uz neitrālo stūri. Ko pareizi dara centra tiesnesis?',
        options: {
          a: 'Pārtrauc skaitīšanu, nosūta A uz neitrālo stūri un turpina skaitīt no skaitļa, kur apstājās',
          b: 'Ignorē un turpina skaitīt kā parasti',
          c: 'Nekavējoties diskvalificē A par nepakļaušanos',
          d: 'Pārtrauc skaitīšanu un sāk skaitīt no jauna no "1"',
        },
      },
      en: {
        question:
          'In ring disciplines fighter A scores a knockdown over fighter B. While the referee is counting, fighter A does NOT go to the neutral corner. What is the correct action of the center referee?',
        options: {
          a: 'Suspend the count, send A to a neutral corner and then continue the count from where it was stopped',
          b: 'Ignore it and continue counting normally',
          c: 'Immediately disqualify A for disobeying',
          d: 'Stop the count and restart from "1" after A moves',
        },
      },
    },
    correctKeys: ['a'],
  },
  {
    id: 'Q42',
    categories: ['B', 'A'],
    texts: {
      lv: {
        question:
          'Ringa cīņā pēc atļauta sitiena sportistam rodas dziļš pārsitums virs acs, un ārsts nolemj, ka cīņu turpināt nedrīkst. Kāds ir pareizais oficiālais rezultāts?',
        options: {
          a: 'Zaude ar diskvalifikāciju savainotajam sportistam',
          b: 'Uzvara ar KO uzvarējušajam sportistam',
          c: 'Uzvara ar RSC-I uzvarējušajam sportistam',
          d: 'Cīņa tiek pasludināta par "no contest"',
        },
      },
      en: {
        question:
          'In a ring bout, after a legal blow a fighter suffers a deep cut above the eye and the doctor decides the bout cannot continue. What is the correct official result?',
        options: {
          a: 'Loss by disqualification for the injured fighter',
          b: 'Win by KO for the opponent',
          c: 'Win by RSC-I  for the opponent',
          d: '"No contest" (bout voided)',
        },
      },
    },
    correctKeys: ['c'],
  },
  {
    id: 'Q43',
    categories: ['B'],
    texts: {
      lv: {
        question:
          'Sportists vairākkārt lūdz ārstu, lai apturētu cīņu, bet ārsts paziņo, ka nav medicīnisku iemeslu un sportists ir spējīgs turpināt. Ko saskaņā ar WAKO noteikumiem drīkst darīt centra tiesnesis?',
        options: {
          a: 'Turpināt cīņu bez jebkādas reakcijas',
          b: 'Piešķirt automātisku uzvaru pretiniekam',
          c: 'Saskaņā ar ārsta viedokli sodīt sportistu par cīņas traucēšanu (brīdinājums / mīnuss punkts)',
          d: 'Diskvalificēt ārstu par nepareizu lēmumu',
        },
      },
      en: {
        question:
          'A fighter repeatedly calls for the doctor to stop the bout, but the doctor states there is no medical reason and the fighter is fit to continue. According to WAKO rules, what may the center referee do?',
        options: {
          a: 'Simply restart the bout with no action',
          b: 'Automatically award the victory to the opponent',
          c: 'Based on the doctor’s opinion penalise the fighter for obstructing the bout (warning / minus point)',
          d: 'Disqualify the doctor for an incorrect decision',
        },
      },
    },
    correctKeys: ['c'],
  },
   {
    id: 'Q44',
    categories: ['B', 'A'],
    texts: {
      lv: {
        question:
          'Ko prasa WAKO medicīniskie noteikumi, lai starptautiskais tiesnesis drīkstētu tiesāt sacensības?',
        options: {
          a: 'Pietiek ar derīgu tiesneša licenci, medicīniskā pārbaude nav nepieciešama',
          b: 'Gada laikā veiktu medicīnisko apskati un derīgu medicīnisko sertifikātu, kas ir reģistrēts pie organizatora vai WAKO sistēmā',
          c: 'Tikai dopinga testu pirms sacensībām',
          d: 'Tikai dalību vienā WAKO seminārā pēdējā gada laikā',
        },
      },
      en: {
        question:
          'What do WAKO medical rules require in order for an international referee to be allowed to officiate?',
        options: {
          a: 'A valid referee licence is enough; no medical examination is needed',
          b: 'An annual medical examination and a valid medical certificate registered with the promoter or WAKO system',
          c: 'Only a pre-event doping test',
          d: 'Only participation in at least one WAKO seminar in the last year',
        },
      },
    },
    correctKeys: ['b'],
  },
  {
    id: 'Q45',
    categories: ['B', 'A'],
    texts: {
      lv: {
        question:
          'Kuri no šiem ir tiesīgi mainīt centra tiesneša vai stūra tiesneša lēmumu, un kādā gadījumā?',
        options: {
          a: 'Jebkuri divi stūra tiesneši, ja viņiem ir vienāds viedoklis',
          b: 'Galvenais tiesnesis un/vai supervisors/novērotājs tikai materiālas kļūdas gadījumā',
          c: 'Cits tiesnesis, ja viņam ir pieredze',
          d: 'Sacensību organizators',
        },
      },
      en: {
        question:
          'Who is allowed to change a center referee’s or judge’s decision, and in which case?',
        options: {
          a: 'Any two corner judges if they agree',
          b: 'The Chief Referee and/or Supervisor/Observer only in case of a material mistake',
          c: 'Another judge if he is experienced',
          d: 'The event promoter',
        },
      },
    },
    correctKeys: ['b'],
  },
  // Q46 – Сколько боёв в день в ринге
{
  id: 'Q46',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Kāds ir maksimālais cīņu skaits vienā dienā, kurās viens sportists drīkst piedalīties RINGA disciplīnās (pēc WAKO vispārējiem noteikumiem)?',
      options: {
        a: '1 cīņa dienā',
        b: '2 cīņas dienā',
        c: '3 cīņas dienā',
        d: 'Nav ierobežojuma',
      },
    },
    en: {
      question:
        'According to WAKO General Rules, what is the maximum number of bouts per day that one fighter may have in RING sports?',
      options: {
        a: '1 bout per day',
        b: '2 bouts per day',
        c: '3 bouts per day',
        d: 'No limit',
      },
    },
  },
  correctKeys: ['c'], // max 3 ring matches per day 
},
// Q47 – Сколько спортсменов в весе на ЧЕ/ЧМ среди взрослых
{
  id: 'Q47',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Cik sportisti no VIENAS nacionālās izlases drīkst startēt vienā svara kategorijā vienā cīņas disciplīnā PIEAUGUŠO pasaules vai kontinentālajā čempionātā (WAKO noteikumi)?',
      options: {
        a: '1 sportists',
        b: '2 sportisti',
        c: '3 sportisti',
        d: '4 sportisti',
      },
    },
    en: {
      question:
        'In senior World or Continental Championships, how many athletes from the SAME national team may compete in one weight category of a fighting discipline (according to WAKO rules)?',
      options: {
        a: '1 athlete',
        b: '2 athletes',
        c: '3 athletes',
        d: '4 athletes',
      },
    },
  },
  correctKeys: ['a'], // 1 per weight & discipline for seniors 
},
// Q44 – Сколько спортсменов в весе на ЧЕ/ЧМ среди взрослых
{
  id: 'Q48',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Cik sportisti no VIENAS nacionālās izlases drīkst startēt vienā svara kategorijā vienā cīņas disciplīnā junioriem vai kadetiem pasaules vai kontinentālajā čempionātā (WAKO noteikumi)?',
      options: {
        a: '1 sportists',
        b: '2 sportisti',
        c: '3 sportisti',
        d: '4 sportisti',
      },
    },
    en: {
      question:
        'In junior and cadet World or Continental Championships, how many athletes from the SAME national team may compete in one weight category of a fighting discipline (according to WAKO rules)?',
      options: {
        a: '1 athlete',
        b: '2 athletes',
        c: '3 athletes',
        d: '4 athletes',
      },
    },
  },
  correctKeys: ['b'], // 2 per weight & discipline for juniors and cadets 
},
{
  id: 'Q49',
  categories: ['C'],
  img: RefereeTime, 
  texts: {
    lv: {
      question:
        'Kas ir attēlots attēlā?',
      options: {
        a: 'Stop',
        b: 'Time out',
        c: 'Time',
        d: 'Excessive contact',
      },
    },
    en: {
      question:
        'What is shown in the picture?',
      options: {
        a: 'Stop',
        b: 'Time out',
        c: 'Time',
        d: 'Excessive contact',
      },
    },
  },
  correctKeys: ['c'], // 2 per weight & discipline for juniors and cadets 
},
{
  id: 'Q50',
  categories: ['C', 'B'],
  img: RefereeTwopoints, 
  texts: {
    lv: {
      question:
        'Kas ir attēlots attēlā?',
      options: {
        a: 'Verbal warning',
        b: 'Two Point',
        c: '2nd Official Warning',
        d: '2nd Verbal warning',
      },
    },
    en: {
      question:
        'What is shown in the picture?',
      options: {
        a: 'Verbal warning',
        b: 'Two Point',
        c: '2nd Official Warning',
        d: '2nd Verbal warning',
      },
    },
  },
  correctKeys: ['b'], // 2 per weight & discipline for juniors and cadets 
},  
{
  id: 'Q51',
  categories: ['B', 'A'],
  img: RefereeRingKO, 
  texts: {
    lv: {
      question:
        'Kas ir attēlots attēlā?(Wako noteikumi)',
      options: {
        a: 'Disqualification',
        b: 'No clinch',
        c: 'KO/TKO',
        d: 'No score',
      },
    },
    en: {
      question:
        'What is shown in the picture?',
      options: {
        a: 'Disqualification',
        b: 'No clinch',
        c: 'KO/TKO',
        d: 'No score',
      },
    },
  },
  correctKeys: ['c'], // 2 per weight & discipline for juniors and cadets 
},
{
  id: 'Q52',
  categories: ['B', 'A'],
  img: MTAnoaprovedShort, 
  texts: {
    lv: {
      question:
        'Cik disciplīnās drīkst startēt šāda veida šortos?(Wako noteikumi)',
      options: {
        a: '1 disciplīnā',
        b: '2 disciplīnās',
        c: '3 disciplīnās',
        d: 'Nevienā disciplīnā',
      },
    },
    en: {
      question:
        'In how many disciplines is it allowed to compete in this type of shorts? (According to WAKO rules)',
      options: {
        a: 'In 1 discipline',
        b: 'In 2 disciplines',
        c: 'In 3 disciplines',
        d: 'In no discipline',
      },
    },
  },
  correctKeys: ['d'], 
},     
{
  id: 'Q53',
  categories: ['C'],
  img: RefereePushing, 
  texts: {
    lv: {
      question:
        'Kas ir attēlots attēlā?(Wako noteikumi)',
      options: {
        a: 'Dropping on floor',
        b: 'Pushed',
        c: 'Stop',
        d: 'No score',
      },
    },
    en: {
      question:
        'What is shown in the picture?',
      options: {
        a: 'Dropping on floor',
        b: 'Pushed',
        c: 'Stop',
        d: 'No score',
      },
    },
  },
  correctKeys: ['b'], 
},
{
  id: 'Q54',
  categories: ['C', 'B'],
  img: RefereeExit, 
  texts: {
    lv: {
      question:
        'Kas ir attēlots attēlā?(Wako noteikumi)',
      options: {
        a: 'Come to referee',
        b: 'Exit',
        c: 'Avoiding fight',
        d: 'Kick up',
      },
    },
    en: {
      question:
        'What is shown in the picture?',
      options: {
        a: 'Come to referee',
        b: 'Exit',
        c: 'Avoiding fight',
        d: 'Kick up',
      },
    },
  },
  correctKeys: ['b'], 
},    
// Q55
{
  id: 'Q55',
  categories: ['C'],
  texts: {
    lv: {
      question: 'Ko nozīmē saīsinājums "LC"?',
      options: {
        a: 'Light Contact',
        b: 'Low Contact',
        c: 'Light Kick',
        d: 'Low Kick',
      },
    },
    en: {
      question: 'What does the abbreviation "LC" mean?',
      options: {
        a: 'Light Contact',
        b: 'Low Contact',
        c: 'Light Kick',
        d: 'Low Kick',
      },
    },
  },
  correctKeys: ['a'],
},

// Q56
{
  id: 'Q56',
  categories: ['C', 'B', 'A'],
  texts: {
    lv: {
      question: 'Kāds ir "Senioru" vecuma diapazons (WAKO)?',
      options: {
        a: '17–42 gadi',
        b: '19–40 gadi',
        c: '18–54 gadi',
        d: '18–56 gadi',
      },
    },
    en: {
      question: 'What is the "Senior" age range (WAKO)?',
      options: {
        a: '17–42 years',
        b: '19–40 years',
        c: '18–54 years',
        d: '18–56 years',
      },
    },
  },
  correctKeys: ['b'],
},

// Q57
{
  id: 'Q57',
  categories: ['C', 'B'],
  texts: {
    lv: {
      question:
        'Cik brīdinājumu (neieskaitot "exit") maksimums centra tiesnesis var dot pirms diskvalifikācijas?',
      options: {
        a: '3',
        b: '6',
        c: '5',
        d: '4',
      },
    },
    en: {
      question:
        'What is the maximum number of warnings (excluding "exit") the referee may give before disqualification?',
      options: {
        a: '3',
        b: '6',
        c: '5',
        d: '4',
      },
    },
  },
  correctKeys: ['c'],
},

// Q58
{
  id: 'Q58',
  categories: ['C', 'B'],
  texts: {
    lv: {
      question: 'Kāds ir raundu laiks bērniem (7–9 gadi)?',
      options: {
        a: '2 × 1 minūte',
        b: '2 × 1.5 minūtes',
        c: '2 × 0.5 minūtes',
        d: '3 × 0.5 minūtes',
      },
    },
    en: {
      question: 'What is the round duration for children (7–9 years)?',
      options: {
        a: '2 × 1 minute',
        b: '2 × 1.5 minutes',
        c: '2 × 0.5 minutes',
        d: '3 × 0.5 minutes',
      },
    },
  },
  correctKeys: ['a'],
},

// Q59
{
  id: 'Q59',
  categories: ['C'],
  texts: {
    lv: {
      question: 'Kāds ir maksimālais medicīniskā pārtraukuma (medical time) laiks?',
      options: {
        a: '2 minūtes',
        b: '3 minūtes',
        c: '1 minūte',
        d: '5 minūtes',
      },
    },
    en: {
      question: 'What is the maximum medical time (medical timeout) allowed?',
      options: {
        a: '2 minutes',
        b: '3 minutes',
        c: '1 minute',
        d: '5 minutes',
      },
    },
  },
  correctKeys: ['a'],
},

// Q60
{
  id: 'Q60',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Cik tiesnešu (personu) pēc WAKO noteikumiem vajag uz viena tatami Kick Light un Light Contact?',
      options: {
        a: '1 Chief + 5 referees',
        b: '1 Chief + 8 referees',
        c: '1 Chief + 6 referees',
        d: '1 Chief + 7 referees',
      },
    },
    en: {
      question:
        'How many officials are needed on one tatami for Kick Light and Light Contact (WAKO)?',
      options: {
        a: '1 Chief + 5 referees',
        b: '1 Chief + 8 referees',
        c: '1 Chief + 6 referees',
        d: '1 Chief + 7 referees',
      },
    },
  },
  correctKeys: ['b'],
},

// Q61
{
  id: 'Q61',
  categories: ['C'],
  texts: {
    lv: {
      question:
        'Cik punktu starpībai jābūt, lai priekšlaicīgi paziņotu uzvarētāju Kick Light / Light Contact?',
      options: {
        a: '12',
        b: '7',
        c: '15',
        d: '10',
      },
    },
    en: {
      question:
        'What point difference is required to declare a winner early in Kick Light / Light Contact?',
      options: {
        a: '12',
        b: '7',
        c: '15',
        d: '10',
      },
    },
  },
  correctKeys: ['c'],
},

// Q62
{
  id: 'Q62',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Cik punktu starpībai jābūt, lai priekšlaicīgi paziņotu uzvarētāju Point Fighting?',
      options: {
        a: '10',
        b: '15',
        c: '12',
        d: '5',
      },
    },
    en: {
      question:
        'What point difference is required to declare a winner early in Point Fighting?',
      options: {
        a: '10',
        b: '15',
        c: '12',
        d: '5',
      },
    },
  },
  correctKeys: ['a'],
},

// Q63
{
  id: 'Q63',
  categories: ['C', 'B'],
  texts: {
    lv: {
      question: 'Kas tiek uzskatīts par "EXIT" tatami disciplīnās?',
      options: {
        a: 'Pilna pēda ir ārpus tatami laukuma',
        b: 'Pirksti pieskaras robežlīnijai',
        c: 'Sportists ir pie malas, bet paliek laukuma iekšpusē',
        d: 'Sportists atkāpjas uz neitrālo stūri',
      },
    },
    en: {
      question: 'What is considered an "EXIT" in tatami disciplines?',
      options: {
        a: 'A full foot is outside the tatami area',
        b: 'Only toes touch the border line',
        c: 'Fighter is near the edge but still inside',
        d: 'Fighter steps to a neutral corner',
      },
    },
  },
  correctKeys: ['a'],
},

// Q64
{
  id: 'Q64',
  categories: ['C'],
  texts: {
    lv: {
      question: 'Cik mīnuss punktus sportists saņem par TREŠO "exit"?',
      options: {
        a: '1 punkts',
        b: '3 punkti',
        c: '2 punkti',
        d: '9 punkti',
      },
    },
    en: {
      question: 'How many minus points does a fighter get for the THIRD "exit"?',
      options: {
        a: '1 point',
        b: '3 points',
        c: '2 points',
        d: '9 points',
      },
    },
  },
  correctKeys: ['a'],
},

// Q65
{
  id: 'Q65',
  categories: ['C', 'B', 'A'],
  texts: {
    lv: {
      question:
        'Vai centra tiesnesis drīkst noņemt sportistu no cīņas, pat ja ārsts saka, ka sportists drīkst turpināt?',
      options: {
        a: 'Nē, ja ārsts atļauj, tiesnesis nedrīkst iejaukties',
        b: 'Jā, centra tiesnesis drīkst pieņemt lēmumu sportista drošības dēļ',
        c: 'Tikai treneris drīkst pieņemt šādu lēmumu',
        d: 'Tikai vecāki drīkst pieņemt šādu lēmumu',
      },
    },
    en: {
      question:
        'Can the center referee stop the bout and remove a fighter even if the doctor says the fighter may continue?',
      options: {
        a: 'No, if the doctor allows it the referee cannot intervene',
        b: 'Yes, the center referee may decide for the fighter’s safety',
        c: 'Only the coach may decide this',
        d: 'Only the parents may decide this',
      },
    },
  },
  correctKeys: ['b'],
},

// Q66
{
  id: 'Q66',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question: 'Kāds vecums ir vecākajiem kadetiem (Older Cadets)?',
      options: {
        a: '10–12 gadi',
        b: '12–16 gadi',
        c: '12–18 gadi',
        d: '13–15 gadi',
      },
    },
    en: {
      question: 'What is the age range for Older Cadets?',
      options: {
        a: '10–12 years',
        b: '12–16 years',
        c: '12–18 years',
        d: '13–15 years',
      },
    },
  },
  correctKeys: ['d'],
},

// Q67
{
  id: 'Q67',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question: 'Ko nozīmē "WO" (Walk Over)?',
      options: {
        a: 'Kad sportists ir diskvalificēts',
        b: 'Kad viens sportists ir gatavs, bet otrs 2 minūšu laikā neierodas uz cīņu',
        c: 'Kad sportists atsakās turpināt cīņu pēc 1. raunda',
        d: 'Kad abi sportisti saņem vienādu punktu skaitu',
      },
    },
    en: {
      question: 'What does "WO" (Walk Over) mean?',
      options: {
        a: 'When a fighter is disqualified',
        b: 'When one fighter is ready but the opponent does not show up within 2 minutes',
        c: 'When a fighter refuses to continue after round 1',
        d: 'When both fighters have the same score',
      },
    },
  },
  correctKeys: ['b'],
},

// Q68
{
  id: 'Q68',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question: 'Ko nozīmē "AB"?',
      options: {
        a: 'Kad sportists vinnē ar punktu pārsvaru',
        b: 'Kad sportists atsakās turpināt cīņu',
        c: 'Kad sportists uzvar ar KO',
        d: 'Kad cīņa beidzas ar neizšķirtu',
      },
    },
    en: {
      question: 'What does "AB" mean?',
      options: {
        a: 'When a fighter wins by point difference',
        b: 'When a fighter refuses to continue',
        c: 'When a fighter wins by KO',
        d: 'When the bout ends in a draw',
      },
    },
  },
  correctKeys: ['b'],
},

// Q69
{
  id: 'Q69',
  categories: ['C'],
  texts: {
    lv: {
      question: 'Cik punktus piešķir par kontrolētu sitienu ar kāju pa galvu (Point Fighting)?',
      options: {
        a: '5 punkti',
        b: '2 punkti',
        c: '4 punkti',
        d: '1 punkts',
      },
    },
    en: {
      question: 'How many points are awarded for a controlled kick to the head (Point Fighting)?',
      options: {
        a: '5 points',
        b: '2 points',
        c: '4 points',
        d: '1 point',
      },
    },
  },
  correctKeys: ['b'],
},

// Q70
{
  id: 'Q70',
  categories: ['C', 'B'],
  texts: {
    lv: {
      question: 'Cik mīnuss punktu kopā ir par 3 oficiālajiem brīdinājumiem?',
      options: {
        a: '6',
        b: '3',
        c: '9',
        d: '12',
      },
    },
    en: {
      question: 'How many minus points in total are there for 3 official warnings?',
      options: {
        a: '6',
        b: '3',
        c: '9',
        d: '12',
      },
    },
  },
  correctKeys: ['a'],
},

// Q71
{
  id: 'Q71',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question: 'Kāds cimdu svars ir atļauts Point Fighting?',
      options: {
        a: '6 OZ',
        b: '10 OZ',
        c: '8 OZ',
        d: '12 OZ',
      },
    },
    en: {
      question: 'What glove weight is allowed in Point Fighting?',
      options: {
        a: '6 OZ',
        b: '10 OZ',
        c: '8 OZ',
        d: '12 OZ',
      },
    },
  },
  correctKeys: ['c'],
},
{
  id: 'Q72',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Kikbokseris var vienlaikus piedalīties disciplīnās Point Fighting, Kick Light un Light Contact viena un tā paša pasaules vai kontinentālā čempionāta laikā?',
      options: {
        a: 'Jā, drīkst piedalīties visās trīs disciplīnās vienlaikus',
        b: 'Nē, drīkst piedalīties tikai vienā disciplīnā',
        c: 'Drīkst piedalīties tikai divās disciplīnās (jebkurās no trim)',
        d: 'Drīkst piedalīties tikai tad, ja startē dažādās svara kategorijās',
      },
    },
    en: {
      question:
        'Can a kickboxer compete in Point Fighting, Kick Light, and Light Contact during the same World or Continental Championship?',
      options: {
        a: 'Yes, in all three disciplines',
        b: 'No, only in one discipline',
        c: 'Only in two disciplines (any two of the three)',
        d: 'Only if they compete in different weight categories',
      },
    },
  },
  correctKeys: ['a'],
},
{
  id: 'Q73',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Centrālajam tiesnesim ir tiesības izteikt oficiālo brīdinājumu kikbokserim, kurš nav gatavs cīņai vai nokavējis ierašanos ringā vai tatami.',
      options: {
        a: 'Jā, centrālais tiesnesis drīkst izteikt oficiālo brīdinājumu',
        b: 'Nē, brīdinājumu var izteikt tikai sacensību galvenais tiesnesis',
        c: 'Jā, bet tikai tad, sportists bija izsaukts vairāk nekā tris reizi',
        d: 'Jā, bet tikai tad, ja kavējums pārsniedz 3 minūtes',
      },
    },
    en: {
      question:
        'Does the center referee have the right to give an official warning to a kickboxer who is not ready to fight or is late to the ring/tatami?',
      options: {
        a: 'Yes, the center referee may give an official warning',
        b: 'No, only the chief referee may issue a warning',
        c: 'Yes, but only if the athlete was called more than three times.',
        d: 'Yes, but only if the delay exceeds 3 minutes',
      },
    },
  },
  correctKeys: ['a', 'c'],
},
{
  id: 'Q74',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question: 'Uz pjedestāla nevar būt personīgie vai nacionālie karogi.',
      options: {
        a: 'Pareizi',
        b: 'Nepareizi',
        c: 'Atļauts tikai nacionālais karogs',
        d: 'Atļauts tikai personīgais (kluba) karogs',
      },
    },
    en: {
      question: 'Personal or national flags are not allowed on the podium.',
      options: {
        a: 'True',
        b: 'False',
        c: 'Only the national flag is allowed',
        d: 'Only a personal/club flag is allowed',
      },
    },
  },
  correctKeys: ['a'],
},
{
  id: 'Q75',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Pasaules vai Eiropas čempionātu laikā, kā arī citos turnīros (t.sk. Pasaules kausos), kikbokserim jāiesniedz valsts pase, kas apliecina viņa piederību pārstāvētajai valstij.',
      options: {
        a: 'Jā, pase ir obligāta vienmēr',
        b: 'Nē, pietiek ar kluba licenci',
        c: 'Jā, bet tikai fināla cīņām',
        d: 'Nē, pietiek ar jebkuru personu apliecinošu dokumentu, pase nav nepieciešama',
      },
    },
    en: {
      question:
        'During World/European Championships and other tournaments (including World Cups), must a kickboxer present a national passport to confirm the country they represent?',
      options: {
        a: 'Yes, a passport is always mandatory',
        b: 'No, a club license is enough',
        c: 'Yes, but only for final fights',
        d: 'No, any ID document is sufficient; a passport is not required',
      },
    },
  },
  correctKeys: ['a'],
},
{
  id: 'Q76',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question: 'Strīdu un sūdzību izskatīšanā videouzņēmums netiek pieņemts kā pierādījums.',
      options: {
        a: 'Pareizi',
        b: 'Nepareizi',
        c: 'Pareizi, bet tikai finālos video drīkst izmantot',
        d: 'Nepareizi, video vienmēr ir galvenais pierādījums',
      },
    },
    en: {
      question: 'Video footage is not accepted as evidence when reviewing disputes and complaints.',
      options: {
        a: 'True',
        b: 'False',
        c: 'True, but only finals may use video',
        d: 'False, video is always the main evidence',
      },
    },
  },
  correctKeys: ['a'],
},
{
  id: 'Q77',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Viena un tā paša čempionāta vai turnīra laikā aizliegts mainīt tiesneša lomu pret trenera lomu.',
      options: {
        a: 'Pareizi',
        b: 'Nepareizi',
        c: 'Atļauts tikai ar sacensību galvenā tiesneša atļauju',
        d: 'Atļauts tikai tad, ja tiesnesis tiesā citā tatami/ringā',
      },
    },
    en: {
      question:
        'During the same championship or tournament, it is forbidden to switch from the role of referee to the role of coach.',
      options: {
        a: 'True',
        b: 'False',
        c: 'Allowed only with the chief referee’s permission',
        d: 'Allowed only if officiating in a different ring/tatami',
      },
    },
  },
  correctKeys: ['a'],
},
{
  id: 'Q78',
  categories: ['A'],
  texts: {
    lv: {
      question:
        'WAKO pasaules un kontinentālo čempionātu laikā kikbokseriem uz tatamiatļauts piedalīties tikai vienā svara kategorijā.',
      options: {
        a: 'Pareizi',
        b: 'Nepareizi',
        c: 'Nepareizi, atļauts startēt divās svara kategorijās',
        d: 'Pareizi, bet tikai junioriem',
      },
    },
    en: {
      question:
        'At WAKO World and Continental Championships, kickboxers on tatami are allowed to compete in only one weight category.',
      options: {
        a: 'True',
        b: 'False',
        c: 'False, two weight categories are allowed',
        d: 'True, but only for juniors',
      },
    },
  },
  correctKeys: ['b'],
},
{
  id: 'Q79',
  categories: ['C',],
  texts: {
    lv: {
      question:
        'Ja kikbokseris ir izgājis ringā neatbilstoši ģērbies, viņš tiks nekavējoties diskvalificēts.',
      options: {
        a: 'Jā',
        b: 'Nē',
        c: 'Jā, bet tikai finālā',
        d: 'Atkarīgs no disciplīnas',
      },
    },
    en: {
      question:
        'If a kickboxer enters the ring wearing improper equipment/uniform, they will be immediately disqualified.',
      options: {
        a: 'Yes',
        b: 'No',
        c: 'Yes, but only in the final',
        d: 'It depends on the discipline',
      },
    },
  },
  correctKeys: ['b'],
},
{
  id: 'Q80',
  categories: ['C', 'B', 'A'],
  texts: {
    lv: {
      question:
        'Kikbokseriem ar bārdu, tāpat kā kikbokserēm ar gariem matiem, ir aizliegts piedalīties WAKO turnīros.',
      options: {
        a: 'Jā',
        b: 'Nē',
        c: 'Jā, tikai ringa disciplīnās',
        d: 'Jā, tikai tatami disciplīnās',
      },
    },
    en: {
      question:
        'Kickboxers with beards, as well as female kickboxers with long hair, are forbidden to participate in WAKO tournaments.',
      options: {
        a: 'Yes',
        b: 'No',
        c: 'Yes, only in ring disciplines',
        d: 'Yes, only in tatami disciplines',
      },
    },
  },
  correctKeys: ['b'],
},
{
  id: 'Q81',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Saskaņā ar WAKO noteikumiem, kurš apgalvojums par bārdu un gariem matiem ir pareizs?',
      options: {
        a: 'Bārda un gari mati WAKO turnīros ir aizliegti.',
        b: 'Bārda ir atļauta, ja tās garums nepārsniedz 2 cm, un gari mati ir jānostiprina/ jākontrolē tā, lai netraucētu cīņai (bez metāla/harda stiprinājumiem).',
        c: 'Bārda ir atļauta jebkura garuma, bet gari mati jākontrolē tā, lai netraucētu cīņai (bez metāla/harda stiprinājumiem).',
        d: 'Bārda ir atļauta, bet gari mati (jebkādā veidā) ir aizliegti.',
      },
    },
    en: {
      question:
        'According to WAKO rules, which statement about beards and long hair is correct?',
      options: {
        a: 'Beards and long hair are forbidden at WAKO tournaments.',
        b: 'A beard is allowed if it does not exceed 2 cm, and long hair must be secured/controlled so it does not disturb the bout (no metal/hard holders).',
        c: 'A beard is allowed at any length, and long hair must be secured/controlled so it does not disturb the bout (no metal/hard holders).',
        d: 'A beard is allowed, but long hair (in any form) is forbidden.',
      },
    },
  },
  correctKeys: ['b'],
},
{
  id: 'Q84',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        '“Būtiskas kļūdas” gadījumā, ko pieļāvis centrālais tiesnesis, viņa lēmumu:',
      options: {
        a: 'var mainīt sānu tiesneši',
        b: 'var mainīt supervaizers (Supervisor)',
        c: 'var mainīt galvenais tatami tiesnesis',
        d: 'mainīt nevar',
      },
    },
    en: {
      question:
        'In case of a “material mistake” made by the center referee, his decision:',
      options: {
        a: 'can be changed by the side judges',
        b: 'can be changed by the Supervisor',
        c: 'can be changed by the chief tatami referee',
        d: 'cannot be changed',
      },
    },
  },
  correctKeys: ['b', 'c'],
},
{
  id: 'Q85',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Aizliegts vilkt mutes aizsargu uz zobus koriģējošām ierīcēm (breketēm).',
      options: {
        a: 'Jā',
        b: 'Nē',
        c: 'Jā, bet tikai junioriem',
        d: 'Atkarīgs no disciplīnas',
      },
    },
    en: {
      question:
        'It is forbidden to wear a mouthguard over orthodontic appliances (braces).',
      options: {
        a: 'Yes',
        b: 'No',
        c: 'Yes, but only for juniors',
        d: 'It depends on the discipline',
      },
    },
  },
  correctKeys: ['b'],
},
{
  id: 'Q86',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Cīņas laikā trenerim jāsēž uz viņam nodrošinātā krēslā, un viņš nedrīkst iejaukties cīņas gaitā ar vārdu, žestu vai rīcību.',
      options: {
        a: 'Pareizi',
        b: 'Nepareizi',
        c: 'Pareizi, bet tikai ringa disciplīnās',
        d: 'Nepareizi, treneris drīkst brīvi izteikties',
      },
    },
    en: {
      question:
        'During the bout, the coach must sit on the provided chair and must not interfere in the bout with words, gestures, or actions.',
      options: {
        a: 'True',
        b: 'False',
        c: 'True, but only in ring disciplines',
        d: 'False, the coach may speak freely',
      },
    },
  },
  correctKeys: ['b'],
},
{
  id: 'Q87',
  categories: ['A'],
  texts: {
    lv: {
      question:
        'Kikbokserim stingri aizliegts cīņas laikā izmantot mīkstās kontaktlēcas.',
      options: {
        a: 'Pareizi',
        b: 'Nepareizi — mīkstās kontaktlēcas ir atļautas',
        c: 'Nepareizi — aizliegtas ir tikai cietās kontaktlēcas',
        d: 'Pareizi, izņēmums ir tikai ar ārsta rakstisku atļauju',
      },
    },
    en: {
      question:
        'A kickboxer is strictly forbidden to use soft contact lenses during the bout.',
      options: {
        a: 'True',
        b: 'False — soft contact lenses are allowed',
        c: 'False — only hard contact lenses are forbidden',
        d: 'True, unless there is written medical permission',
      },
    },
  },
  correctKeys: ['b'],
},
{
  id: 'Q88',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question:
        'Mutes aizsargs nedrīkst izvirzīties ārpus mutes, un tas var būt jebkurā krāsā.',
      options: {
        a: 'Pareizi',
        b: 'Nepareizi',
        c: 'Pareizi, bet tikai bērniem',
        d: 'Nepareizi — krāsa drīkst būt tikai caurspīdīga/balta',
      },
    },
    en: {
      question:
        'A mouthguard must not protrude outside the mouth and may be of any color.',
      options: {
        a: 'True',
        b: 'False',
        c: 'True, but only for children',
        d: 'False — it must be only transparent/white',
      },
    },
  },
  correctKeys: ['a'],
},
{
  id: 'Q89',
  categories: ['C', 'B', 'A'],
  texts: {
    lv: {
      question:
        'Apskati attēlā redzamo tatami formas augšdaļu. Kurām WAKO disciplīnām šāda forma ir piemērota (kā oficiālā tatami forma, kopā ar garajām biksēm)?',
      options: {
        a: 'Light Contact, Point Fighting',
        b: 'Light Contact, Kick Light, Point Fighting',
        c: 'Tikai Point Fighting',
        d: 'Tikai Light Contact',
      },
    },
    en: {
      question:
        'Look at the tatami uniform top in the image. For which WAKO disciplines is this uniform suitable (as a tatami uniform, worn with long trousers)?',
      options: {
        a: 'Light Contact, Point Fighting',
        b: 'Light Contact, Kick Light, Point Fighting',
        c: 'Point Fighting only',
        d: 'Light Contact only',
      },
    },
  },
  correctKeys: ['c'],
},
{
  id: 'Q90',
  categories: ['C', 'B'],
  texts: {
    lv: {
      question:
        'Kur pareizi jāatrodas cirkšņa aizsargam (bandažam) sportista ekipējumā sacensību laikā?',
      options: {
        a: 'Galvenais, lai bandažs ir — nav svarīgi, vai virs vai zem apģērba',
        b: 'Bandažam obligāti jābūt zem apģērba',
        c: 'Bandažam jābūt zem apģērba, lai saglabātu sportista kopējo ārējo izskatu',
        d: 'Bandažs nav nepieciešams',
      },
    },
    en: {
      question:
        'Where should the groin protector (cup) be worn during competition?',
      options: {
        a: 'As long as the protector is worn, it doesn’t matter if it is over or under the clothing',
        b: 'It must be worn under the clothing',
        c: 'It must be worn under the clothing to keep the athlete’s overall appearance proper',
        d: 'A groin protector is not needed',
      },
    },
  },
  correctKeys: ['b', 'c'],
},
{
  id: 'Q91',
  categories: ['B', 'A'],
  texts: {
    lv: {
      question: 'No kāda vecuma meitenēm (sievietēm) sacensībās jāiesniedz apliecinājums, ka viņas nav grūtnieces?',
      options: {
        a: '14',
        b: '15',
        c: '13',
        d: '12',
      },
    },
    en: {
      question: 'From what age must female athletes provide a non-pregnancy declaration at competitions?',
      options: {
        a: '14',
        b: '15',
        c: '13',
        d: '12',
      },
    },
  },
  correctKeys: ['a'],
},
{
  id: 'Q92',
  categories: ['C', 'B', 'A'],
  texts: {
    lv: {
      question:
        'Kas notiek, ja Point Fighting cīņa pēc diviem raundiem beidzas neizšķirti?',
      options: {
        a: 'Piešķir 1 minūti papildlaiku',
        b: 'Dators automātiski izvēlas uzvarētāju',
        c: 'Cīņa turpinās līdz pirmajam punktam (sudden death)',
        d: 'Pasludina neizšķirtu',
      },
    },
    en: {
      question:
        'What happens if a Point Fighting bout is a draw after two rounds?',
      options: {
        a: 'An extra 1-minute round is given',
        b: 'A computer automatically selects the winner',
        c: 'The bout continues until the first point is scored (sudden death)',
        d: 'A draw is declared',
      },
    },
  },
  correctKeys: ['a'],
},
{
  id: 'Q93',
  categories: ['C', 'B', 'A'],
  texts: {
    lv: {
      question: 'Vai par podnožku (slaucīšanu) piešķir punktu?',
      options: {
        a: 'Jā',
        b: 'Nē',
        c: 'Jā, ja pretinieks nokrīt / pieskaras ar “trešo punktu” (piem., roka/ceļgals) pēc podnožkas',
        d: 'Jā, ja nokrīt tas, kurš izdarīja podnožku',
      },
    },
    en: {
      question: 'Is a point awarded for a sweep (foot sweep/trip)?',
      options: {
        a: 'Yes',
        b: 'No',
        c: 'Yes, if the opponent falls / touches with a “third point” (e.g., hand/knee) after the sweep',
        d: 'Yes, if the athlete who executed the sweep falls',
      },
    },
  },
  correctKeys: ['b', 'c'],
},
{
  id: 'Q94',
  categories: ['C', 'B', 'A'],
  texts: {
    lv: {
      question: 'Vai par podnožku piešķir punktu?',
      options: {
        a: 'Jā',
        b: 'Nē',
        c: 'Dažreiz (atkarīgs no situācijas)',
        d: 'Tikai finālā',
      },
    },
    en: {
      question: 'Is a point awarded for a sweep (trip)?',
      options: {
        a: 'Yes',
        b: 'No',
        c: 'Sometimes (depends on the situation)',
        d: 'Only in finals',
      },
    },
  },
  correctKeys: ['c'],
},

    
];

