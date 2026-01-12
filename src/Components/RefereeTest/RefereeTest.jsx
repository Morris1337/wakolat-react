// src/components/RefereeTest/RefereeTest.jsx
import React, { useState, useEffect, useMemo } from 'react';
import API from '../../profile/utils/api';
import {
  refereeQuestions,
  QUESTION_CATEGORIES,
} from '../../data/refereeQuestions'; // поправь путь, если нужен
import './RefereeTest.css';

// >>>>> ТУТ МЕНЯЕШЬ ПАРОЛЬ <<<<<
const REFEREE_TEST_PASSWORD = 'WAKO2020'; // впиши свой пароль

const TOTAL_QUESTIONS = 40;
const TEST_TIME_SECONDS = 30 * 60;

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandomQuestions(questions, count) {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const RefereeTest = () => {
  // ----- Блок пароля -----
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Статус доступности (окно по времени + попытки)
  const [availability, setAvailability] = useState({
    loading: true,
    isOpen: false,
    reason: null, // 'not_started' | 'finished' | 'no_attempts_left' | 'error' | null
    startAt: null,
    endAt: null,
    attemptsUsed: 0,
    maxAttempts: 1,
  });
  const [availabilityError, setAvailabilityError] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('refereeTestAccess');
    if (stored === 'granted') {
      setIsAuthorized(true);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === REFEREE_TEST_PASSWORD) {
      setIsAuthorized(true);
      setPasswordError('');
      sessionStorage.setItem('refereeTestAccess', 'granted');
    } else {
      setPasswordError('Nepareiza parole. Mēģini vēlreiz.');
    }
  };

  // Подтягиваем статус окна и попыток после ввода пароля
  useEffect(() => {
  if (!isAuthorized) return;

  const fetchStatus = async () => {
    try {
      // запрос на бэкенд через общий axios-инстанс
      const { data } = await API.get('/referee-test/status');

      setAvailability({
        loading: false,
        isOpen: data.isOpen,
        reason: data.reason,
        startAt: data.startAt,
        endAt: data.endAt,
        attemptsUsed: data.attemptsUsed,
        maxAttempts: data.maxAttempts,
      });
      setAvailabilityError('');
    } catch (e) {
      console.error('Error loading referee-test status', e);
      const resp = e?.response?.data || {};
      setAvailability((prev) => ({
        ...prev,
        loading: false,
        isOpen: false,
        reason: resp.reason || 'error',
      }));
      setAvailabilityError(
        resp.message ||
          'Servera kļūda, mēģinot iegūt testa statusu. Sazinieties ar administratoru.',
      );
    }
  };

  fetchStatus();
}, [isAuthorized]);


  // ----- Логика теста -----
  const [step, setStep] = useState('intro'); // intro | running | finished
  const [category, setCategory] = useState('C');
  const [language, setLanguage] = useState('lv');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TEST_TIME_SECONDS);
  const [result, setResult] = useState(null);

  // для категории A только английский
  useEffect(() => {
    if (category === 'A') {
      setLanguage('en');
    }
  }, [category]);

  // Таймер
  useEffect(() => {
    if (step !== 'running') return;
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, timeLeft]);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] || [] : [];

  const canGoNext =
    currentQuestion && Array.isArray(currentAnswer) && currentAnswer.length > 0;

  const handleStart = () => {
    // НЕ даём стартовать, если окно закрыто или попытка уже использована
    if (!availability.isOpen) {
      alert('Tests šobrīd nav pieejams.');
      return;
    }

    const pool = refereeQuestions.filter(
      (q) =>
        q.categories.includes(category) &&
        q.texts &&
        q.texts[language] &&
        q.texts[language].question &&
        q.texts[language].options,
    );

    if (pool.length < TOTAL_QUESTIONS) {
      alert(
        `Недостаточно вопросов для категории ${category} и языка ${language}. ` +
          `Найдено: ${pool.length}, нужно минимум ${TOTAL_QUESTIONS}.`,
      );
      return;
    }

    const selected = pickRandomQuestions(pool, TOTAL_QUESTIONS);

    setQuestions(selected);
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(TEST_TIME_SECONDS);
    setResult(null);
    setStep('running');
  };

  const handleToggleAnswer = (optionKey) => {
    if (!currentQuestion) return;

    setAnswers((prev) => {
      const qId = currentQuestion.id;
      const prevArr = prev[qId] || [];
      let nextArr;

      if (prevArr.includes(optionKey)) {
        nextArr = prevArr.filter((k) => k !== optionKey);
      } else {
        nextArr = [...prevArr, optionKey];
      }

      return {
        ...prev,
        [qId]: nextArr,
      };
    });
  };

  const handleNext = () => {
    if (!canGoNext) return;
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((idx) => idx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((idx) => idx - 1);
    }
  };

  const handleFinish = async () => {
    let correctCount = 0;
    const wrongQuestionIds = [];

    questions.forEach((q) => {
      const selected = answers[q.id] || [];
      const correct = q.correctKeys || [];

      const isCorrect =
        selected.length === correct.length &&
        selected.every((key) => correct.includes(key));

       if (isCorrect) {
      correctCount += 1;
    } else {
      // запоминаем ID вопроса, где была ошибка
      wrongQuestionIds.push(q.id);
    }
    });

    const catCfg = QUESTION_CATEGORIES[category];
    const passScore = catCfg?.passScore ?? 0;
    const passed = correctCount >= passScore;

    setResult({
      total: questions.length,
      correctCount,
      passScore,
      passed,
    });

    setStep('finished');

    // Отправляем результат на сервер — тут и сработает ограничение "одна попытка"
    // Отправляем результат на сервер — тут и сработает ограничение "одна попытка"
try {
  await API.post('/referee-test/result', {
    category,
    correctAnswers: correctCount,
    totalQuestions: questions.length,
    passed,
    wrongQuestionIds,
  });

  // локально помечаем, что попытка использована и старт больше не разрешаем
  setAvailability((prev) => ({
    ...prev,
    isOpen: false,
    attemptsUsed: prev.attemptsUsed + 1,
    reason: 'no_attempts_left',
  }));
} catch (e) {
  console.error('Error saving test result:', e);
  // Можно (не обязательно) показать alert, но попытка уже считается использованной на бэке
}

  };

  const progressText = useMemo(() => {
    if (!questions.length) return '';
    return `${currentIndex + 1} / ${questions.length}`;
  }, [currentIndex, questions.length]);

  // ----- Сначала экран пароля -----
  if (!isAuthorized) {
    return (
      <div className="referee-test referee-test--intro referee-test--locked">
        <h2>Tiesnešu teorētiskais tests</h2>
        <p>
          Lai piekļūtu testam, lūdzu ievadiet paroli, ko piešķīrusi federācija.
        </p>

        <form
          className="referee-test__password-form"
          onSubmit={handlePasswordSubmit}
        >
          <input
            type="password"
            className="referee-test__password-input"
            placeholder="Parole"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button type="submit" className="referee-test__start-btn">
            Ienākt
          </button>
        </form>

        {passwordError && (
          <p className="referee-test__password-error">{passwordError}</p>
        )}
      </div>
    );
  }

  // ----- Далее обычные экраны теста -----

  if (step === 'intro') {
    return (
      <div className="referee-test referee-test--intro">
        <h2>Teorētiskais tiesnešu tests</h2>

        {/* Статус доступности */}
        {availability.loading && <p>Ielādējam testa statusu...</p>}

        {!availability.loading && !availability.isOpen && (
          <div className="referee-test__status-message">
            {availability.reason === 'not_started' && availability.startAt && (
              <p>
                Tests šobrīd nav pieejams. Tas būs atvērts no{' '}
                <strong>
                  {new Date(availability.startAt).toLocaleString('lv-LV')}
                </strong>{' '}
                līdz{' '}
                <strong>
                  {new Date(availability.endAt).toLocaleString('lv-LV')}
                </strong>
                .
              </p>
            )}

            {availability.reason === 'finished' && availability.endAt && (
              <p>
                Testa laiks ir beidzies (
                <strong>
                  {new Date(availability.endAt).toLocaleString('lv-LV')}
                </strong>
                ).
              </p>
            )}

            {availability.reason === 'no_attempts_left' && (
              <p>
                Jūs jau esat izmantojis savu mēģinājumu (
                {availability.maxAttempts}). Vairs nav iespējams atkārtot testu.
              </p>
            )}

            {(availability.reason === 'server_error' ||
              availability.reason === 'error') && (
              <p>{availabilityError}</p>
            )}
          </div>
        )}

        <div className="referee-test__row">
          <label>
            Kategorija:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={!availability.isOpen}
            >
              <option value="C">C</option>
              <option value="B">B</option>
              <option value="A">A</option>
            </select>
          </label>
        </div>

        <div className="referee-test__row">
          <label>
            Valoda / Language:
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={category === 'A' || !availability.isOpen}
            >
              {category !== 'A' && (
                <>
                  <option value="lv">Latviešu</option>
                  <option value="en">English</option>
                </>
              )}
              {category === 'A' && <option value="en">English</option>}
            </select>
          </label>
        </div>

        <p>
          Testā būs <strong>40 jautājumi</strong>, laiks{' '}
          <strong>25 minūtes</strong>. Pāriet pie nākamā jautājuma var tikai
          pēc atbildes izvēles.
        </p>

        <button
          className="referee-test__start-btn"
          onClick={handleStart}
          disabled={!availability.isOpen || availability.loading}
        >
          Sākt testu
        </button>
      </div>
    );
  }

  if (step === 'running' && currentQuestion) {
    const text = currentQuestion.texts[language];
    const options = text.options;

    return (
      <div className="referee-test referee-test--running">
        <div className="referee-test__top-bar">
          <div>
            Kategorija: <strong>{category}</strong>
          </div>
          <div>
            Laiks: <strong>{formatTime(timeLeft)}</strong>
          </div>
          <div>
            Jautājums: <strong>{progressText}</strong>
          </div>
        </div>

        <div className="referee-test__question-block">
          {currentQuestion.img && (
            <div className="referee-test__image">
              <img src={currentQuestion.img} alt="question" />
            </div>
          )}

          <h3 className="referee-test__question-text">{text.question}</h3>

          <div className="referee-test__options">
            {Object.entries(options).map(([key, label]) => (
              <label
                key={key}
                className={`referee-test__option ${
                  currentAnswer.includes(key)
                    ? 'referee-test__option--selected'
                    : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={currentAnswer.includes(key)}
                  onChange={() => handleToggleAnswer(key)}
                />
                <span className="referee-test__option-letter">
                  {key.toUpperCase()}
                </span>
                <span className="referee-test__option-text">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="referee-test__nav">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="referee-test__nav-btn"
          >
            ← Atpakaļ
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className="referee-test__nav-btn referee-test__nav-btn--primary"
            >
              Nākamais →
            </button>
          ) : (
            <button
              onClick={() => {
                if (!canGoNext) return;
                if (
                  window.confirm(
                    'Vai tiešām vēlies pabeigt testu? Pēc tam atbildes redzēt nevarēs.',
                  )
                ) {
                  handleFinish();
                }
              }}
              disabled={!canGoNext}
              className="referee-test__nav-btn referee-test__nav-btn--primary"
            >
              Pabeigt testu
            </button>
          )}
        </div>
      </div>
    );
  }

    if (step === 'finished' && result) {
    const { passed, correctCount, total, passScore } = result;

    return (
      <div
        className={`referee-test referee-test--result ${
          passed
            ? 'referee-test--result-passed'
            : 'referee-test--result-pending'
        }`}
      >
        {passed ? (
          <>
            <h2>Tests ir NOKĀRTOTS ✅</h2>
            <p>
              Pareizas atbildes:{' '}
              <strong>
                {correctCount} no {total}
              </strong>
            </p>
            <p>
              Minimālais nepieciešamais rezultāts kategorijai {category}:{' '}
              <strong>{passScore}</strong> pareizas atbildes.
            </p>
          </>
        ) : (
          <>
            <h2>Paldies! Jūsu tests ir nosūtīts tiesnešu komisijai.</h2>
            <p>
              Rezultāts tiks pārbaudīts un apstiprināts tiesnešu komisijā.
              Par galīgo lēmumu jūs tiksiet informēts vēlāk.
            </p>
          </>
        )}

        <button
          className="referee-test__start-btn"
          onClick={() => setStep('intro')}
        >
          Atgriezties uz sākumu
        </button>
      </div>
    );
  }

  return null;
};

export default RefereeTest;
