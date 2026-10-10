import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

// Photos provided by the user
const PHOTOS = {
  heroNight: '/photos/sisters_night.jpg',
  gardenSun: '/photos/ragwa_garden.jpg',
  dinnerMagenta: '/photos/celebration_dinner.jpg',
  sweetOrange: '/photos/sweet_memory.jpg',
};

// CloudFront starry video from the original prompt
const STARRY_HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_064822_f120e48a-d545-45dd-a02d-facb07829888.mp4';

// 5 Heartfelt Love Letters from Nour to Ragwa — Each button on the page opens a dedicated letter
const LETTERS = [
  {
    id: 1,
    title: 'سندي وأماني الحقيقي',
    subtitle: 'إلى من لا يميل ضهري في وجودها',
    badge: 'الرسالة الأولى',
    emoji: '🛡️',
    paragraphs: [
      'حبيبتي وسندي وأختي الكبيرة رجوى،',
      'عايزة أقولك إنك مش مجرد أخت في حياتي، إنتِ الجدار الحقيقي اللي بسند عليه وضهري في كل وقت وشدة. مفيش مرة حسيت إني محتاجة أمان أو حد يفهمني ولقيت غيرك سابق بالخطوة وبكلامك الدافي اللي بيطمن قلبي.',
      'طيبة قلبك وشهامتك واحتوائك ليا مفيش زيهم في الكون، ربنا يديمك ليا أمان وسند وسكينة لعمري كله وما يحرمني من وجودك أبداً.',
    ],
  },
  {
    id: 2,
    title: 'ضحكة العمر وفرحة البيت',
    subtitle: 'يا من تُبهج بحضورها كل الأماكن',
    badge: 'الرسالة الثانية',
    emoji: '✨',
    paragraphs: [
      'يا أجمل ضحكة وأطيب وأحن روح،',
      'وجودك بيدي لأي قعدة ولأي يوم باهت طعم ولون وفرحة متتوصفش. ضحكتك الصافية اللي من القلب بتعدي الكل، وروحك الحلوة بتشيل أي تعب أو هم وبترسم الابتسامة على وشوشنا.',
      'شكراً لأنك البهجة اللي منورة حياتنا كلنا، وشكراً لأنك دايماً بتعرفي تفرّحي قلبي وتبسطيني حتى في أصعب الأوقات.. ربنا يديم ضحكتك مالية الدنيا.',
    ],
  },
  {
    id: 3,
    title: 'قلبك الأبيض ونقاء روحك',
    subtitle: 'طيبة لا تنتهي وحضن دافئ لا يغيب',
    badge: 'الرسالة الثالثة',
    emoji: '🌸',
    paragraphs: [
      'أختي الغالية ونور عيني رجوى،',
      'مفيش في الدنيا كلها قلب بطيبة ونقاء قلبك. دايماً بتسبقيني بالخير وبتطمني بكلامك الدافي واحتوائك لأي حاجة بتمر بيّا.. قلبك مفيش في طيبته وصفائه.',
      'وجودك في حياتي بيخليني أحس إن الدنيا لسه بخير، وإن ربنا بيحبني عشان رزقني بأخت زيك، شايلاني في عيونها وحافظة سري ومصلحتي قبل مصلحتها.. بحبك من كل قلبي.',
    ],
  },
  {
    id: 4,
    title: 'توأم روحي وذكرياتنا الحلوة',
    subtitle: 'أيامنا وسفرنا وأسرارنا المشتركة',
    badge: 'الرسالة الرابعة',
    emoji: '👭',
    paragraphs: [
      'أختي وسري وتوأم روحي،',
      'كل صورة وكل خروجة وكل لمة وكل حكاية بيننا محفورة جوة قلبي بتفاصيلها. إحنا مش بس أخوات، إحنا روح واحدة بنفهم بعض من نظرة عين من غير ما ننطق كلمة واحدة.',
      'ذكرياتنا سوا في السفر والضحك ولمة العيلة هي أغلى كنز عندي في الدنيا، وهفضل فخورة بيكي وبحبنا طول العمر.. إنتِ النعمة اللي بحمد ربنا عليها كل يوم.',
    ],
  },
  {
    id: 5,
    title: 'دعوة من القلب وأمنية العمر',
    subtitle: 'كل سنة وأنتِ طيبة وبخير يا عمري',
    badge: 'الرسالة الخامسة',
    emoji: '💖',
    paragraphs: [
      'يا أغلى نعمة ربنا رزقني بيها،',
      'في يومك الخاص وفي كل ثانية بتمر، بدعي ربنا من كل قلبي يفرّح قلبك الطيب ويملأ أيامك سعادة وراحة بال ورضا، ويبارك في عمرك وصحتك وعيلتك وأولادك ويديكي كل اللي بتتمنيه وزيادة.',
      'كل سنة وأنتِ طيبة وبخير ومنورة دنيتي، وهديتي ليكي حب لا ينتهي ودعوة في كل صلاة.. بحبك للأبد يا أحلى وأجدع أخت في الدنيا.',
    ],
  },
];

// Step component as specified
interface StepProps {
  number: number;
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ number, children }) => {
  return (
    <div className="flex items-start gap-3 sm:gap-5 mb-5 sm:mb-6 last:mb-0 text-right">
      <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#DCFF00] flex items-center justify-center text-[#0A0A0A] font-bold text-xs mt-0.5 sm:mt-1 shadow-sm">
        {number}
      </div>
      <div className="text-[15px] sm:text-[17px] leading-[1.6] text-[#E8E8E8]">
        {children}
      </div>
    </div>
  );
};

// Divider component as specified
const Divider: React.FC = () => {
  return (
    <div className="py-6 sm:py-8 flex justify-center">
      <div className="h-px w-20 sm:w-24 bg-white/20" />
    </div>
  );
};

// PrimaryButton (lime CTA, with arrow)
interface ButtonProps {
  label: string;
  onClick?: (e?: React.MouseEvent) => void;
  icon?: React.ReactNode;
}

const PrimaryButton: React.FC<ButtonProps> = ({ label, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#DCFF00] text-[#0A0A0A] font-bold rounded-lg px-4 sm:px-6 py-3 hover:bg-[#c9ea00] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-md shadow-[#DCFF00]/10 active:scale-95 text-center max-w-[96%]"
    >
      <span className="text-[13px] sm:text-[16px]">{label}</span>
      {icon ? icon : <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" strokeWidth={2.5} />}
    </button>
  );
};

// SolidButton (white pill)
const SolidButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-block bg-white text-[#0A0A0A] font-bold rounded-lg px-5 sm:px-8 py-3 hover:bg-[#E8E8E8] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-md active:scale-95 text-center max-w-[96%]"
    >
      <span className="text-[13px] sm:text-[16px]">{label}</span>
    </button>
  );
};

export default function App() {
  // Starry Loading Screen state (3 seconds)
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Landing page states
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [activeLetterTab, setActiveLetterTab] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; top: number; size: number }>>([]);
  const [activeMemoryTab, setActiveMemoryTab] = useState<number>(0);

  // Background starry sky particle coordinates
  const [backgroundStars, setBackgroundStars] = useState<Array<{ x: number; y: number; size: number; delay: number; duration: number }>>([]);

  // Audio ref for Mai Kassab - Okhty song
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Generate outer starry sky
  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      });
    }
    setBackgroundStars(stars);
  }, []);

  // Play audio autonomous function
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((e) => {
        console.log('Autoplay deferred until initial interaction:', e);
      });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    }
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Immediate attempt to play on mount
  useEffect(() => {
    playAudio();
  }, []);

  // Starry Loading screen: exactly 3 seconds, then automatically enter & trigger song!
  useEffect(() => {
    if (!isLoading) return;
    const startTime = Date.now();
    const duration = 3000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setLoadingProgress(progress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsLoading(false);
        triggerCelebration();

        // Autoplay song immediately when loading ends!
        setTimeout(() => {
          playAudio();
        }, 100);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Seamless autonomous playback on ANY initial user movement or gesture
  useEffect(() => {
    const autoPlayOnAnyGesture = () => {
      if (audioRef.current && audioRef.current.paused) {
        playAudio();
      }
    };

    const gestureEvents = ['click', 'touchstart', 'pointerdown', 'mousemove', 'scroll', 'keydown'];
    gestureEvents.forEach((ev) => window.addEventListener(ev, autoPlayOnAnyGesture, { once: true, passive: true }));

    return () => {
      gestureEvents.forEach((ev) => window.removeEventListener(ev, autoPlayOnAnyGesture));
    };
  }, []);

  // Trigger floating heart / star burst
  const triggerCelebration = (e?: React.MouseEvent) => {
    const newHearts: Array<{ id: number; left: number; top: number; size: number }> = [];
    const clientX = e ? e.clientX : window.innerWidth / 2;
    const clientY = e ? e.clientY : window.innerHeight / 2;

    for (let i = 0; i < 20; i++) {
      newHearts.push({
        id: Date.now() + i,
        left: clientX + (Math.random() - 0.5) * 180,
        top: clientY + (Math.random() - 0.5) * 90,
        size: Math.random() * 22 + 16,
      });
    }

    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
    }, 2500);
  };

  const handleOpenLetter = (letterIndex: number = 0, e?: React.MouseEvent) => {
    triggerCelebration(e);
    setActiveLetterTab(letterIndex);
    setIsLetterOpen(true);
  };

  const memoriesList = [
    {
      src: PHOTOS.dinnerMagenta,
      title: 'أجمل ليلة وسهرة عائلية',
      desc: 'ضحكتك وجمالك منورين المكان، يوم من أحلى الأيام اللي عشناها سوا بكل حب وفرحة.',
    },
    {
      src: PHOTOS.sweetOrange,
      title: 'أحن أخت ورفيقة الدرب',
      desc: 'قربنا من بعض وضحكتنا اللي من القلب، دايماً الأمان والسند في كل وقت.',
    },
    {
      src: PHOTOS.gardenSun,
      title: 'شمس دنيتنا وبهجة البيت',
      desc: 'في أحلى لمة وأجمل جو، ضحكتك اللي بتفرّح قلوب الكل وبتملى الدنيا سعادة.',
    },
    {
      src: PHOTOS.heroNight,
      title: 'نور ورجوى — روح واحدة',
      desc: 'أختي وتوأم روحي وسري، حبنا أقوى من أي كلام ممكن يتكتب.',
    },
  ];

  // ========================================================
  // STARRY LOADING SCREEN (CALM 3 SECONDS AUTO TRANSITION)
  // ========================================================
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#040408] flex flex-col items-center justify-center px-4 overflow-hidden select-none transition-opacity duration-700">
        {/* Deep starry sky background */}
        <div className="absolute inset-0 pointer-events-none">
          {backgroundStars.map((star, idx) => (
            <div
              key={idx}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}

          {/* Shooting stars */}
          <div
            className="absolute top-1/4 right-1/4 w-[120px] h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-shooting-star opacity-80"
          />
          <div
            className="absolute top-1/2 right-1/3 w-[150px] h-0.5 bg-gradient-to-r from-transparent via-[#DCFF00] to-transparent animate-shooting-star opacity-70"
            style={{ animationDelay: '3s' }}
          />

          {/* Cosmic nebulas */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DCFF00]/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Content container */}
        <div className="relative z-10 text-center max-w-lg mx-auto flex flex-col items-center px-4">
          {/* Brand header */}
          <p className="text-[11px] sm:text-[12px] tracking-[0.25em] font-medium text-white/50 uppercase mb-4 sm:mb-5">
            NOUR &amp; RAGWA • SPECIAL DEDICATION
          </p>

          {/* Birthday / Celebration Headline - calm & elegant */}
          <h1
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-[32px] sm:text-[54px] leading-[1.12] text-white tracking-tight mb-3 sm:mb-4 drop-shadow-md font-normal"
          >
            كل سنة وأنتِ طيبة
            <br />
            <span className="text-[#DCFF00] font-normal">يا أحلى وأحن أخت في الدنيا</span>
          </h1>

          <p className="text-white/65 text-[14px] sm:text-[16px] leading-relaxed mb-8 sm:mb-10 max-w-sm px-2 font-light">
            سماء مليانة نجوم بتلمع مخصوص ليكي.. هدية حب ورسائل من القلب من أختكِ <span className="text-white font-medium">نور</span> 🤍
          </p>

          {/* Calm & slim 3-second progress indicator */}
          <div className="w-44 sm:w-52 h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#DCFF00]/40 via-[#DCFF00] to-white rounded-full transition-all duration-100"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-white/40 text-[11px] tracking-widest font-light">
            لحظات وتفتح هديتك وتشتغل الأغنية... ✨
          </p>
        </div>
      </div>
    );
  }

  const currentLetter = LETTERS[activeLetterTab];

  return (
    <div className="relative min-h-screen bg-[#050505] py-4 sm:py-10 px-2 sm:px-4 font-sans selection:bg-[#DCFF00] selection:text-[#0A0A0A] overflow-x-hidden">
      {/* Background Starry Sky Video Behind The Entire Page */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          src={STARRY_HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.15]"
        />
        {/* Soft dark overlay so the email card stands out */}
        <div className="absolute inset-0 bg-[#050505]/65 backdrop-blur-[1px]" />

        {/* Twinkling stars */}
        {backgroundStars.map((star, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-white/80 animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}

        {/* Ambient background shooting stars */}
        <div
          className="absolute top-20 right-1/4 w-[160px] h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-shooting-star opacity-60"
        />
        <div
          className="absolute top-2/3 right-1/3 w-[180px] h-0.5 bg-gradient-to-r from-transparent via-[#DCFF00]/80 to-transparent animate-shooting-star opacity-50"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Hidden HTML5 Audio Element for Mai Kassab - Okhty (Autonomous Loop) */}
      <audio
        ref={audioRef}
        src="/audio/okhty.mp3"
        autoPlay
        playsInline
        preload="auto"
        loop
      />

      {/* Floating Controls: Music Only */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-40 flex items-center gap-2">
        <button
          onClick={toggleMusic}
          title={isPlayingMusic ? 'إيقاف أغنية أختي' : 'تشغيل أغنية أختي'}
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#111111]/90 backdrop-blur-md text-white border border-white/10 hover:border-[#DCFF00]/50 hover:text-[#DCFF00] transition-all shadow-xl text-[11px] sm:text-xs font-medium cursor-pointer"
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DCFF00] animate-pulse" />
              <span>أغنية أختي تعمل 🎵</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>تشغيل أغنية أختي 🎵</span>
            </>
          )}
        </button>
      </div>

      {/* Floating Hearts Animation overlay */}
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            left: `${h.left}px`,
            top: `${h.top}px`,
            fontSize: `${h.size}px`,
          }}
          className="fixed pointer-events-none z-50 animate-float text-pink-400 select-none drop-shadow-md"
        >
          ❤️
        </div>
      ))}

      {/* Email container: max-w-[640px] mx-auto shadow-2xl overflow-hidden ring-1 ring-white/5 */}
      <div className="relative z-10 max-w-[640px] mx-auto shadow-2xl overflow-hidden ring-1 ring-white/10 rounded-2xl bg-[#111111]">
        {/* Content card: bg-[#111111] text-[#F2F2F2] */}
        <div className="bg-[#111111] text-[#F2F2F2]">

          {/* ======================================================== */}
          {/* SECTION 1 — HERO (SISTERS PHOTO BACKGROUND)               */}
          {/* ======================================================== */}
          <div
            className="relative w-full overflow-hidden min-h-[580px] sm:min-h-0 aspect-[640/920] sm:aspect-[640/820]"
          >
            {/* Background: Featured Sister Photo of Nour & Ragwa */}
            <img
              src={PHOTOS.heroNight}
              alt="نور ورجوى"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-1000 scale-[1.01] hover:scale-105"
            />

            {/* Overlay gradient: linear-gradient(to bottom, rgba(17,17,17,0) 45%, rgba(17,17,17,0.45) 68%, rgba(17,17,17,0.9) 88%, rgba(17,17,17,1) 100%) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(17,17,17,0) 40%, rgba(17,17,17,0.45) 68%, rgba(17,17,17,0.92) 88%, rgba(17,17,17,1) 100%)',
              }}
            />

            {/* Foreground stack: relative z-10 h-full flex flex-col items-center text-center px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-10 */}
            <div className="relative z-10 h-full flex flex-col items-center text-center px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-10">
              {/* Top brand block (white): "Nour & Ragwa" — Instrument Serif text-[28px] */}
              <div className="text-center">
                <h1
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-white text-[24px] sm:text-[32px] leading-[0.95] tracking-tight"
                >
                  Nour &amp; Ragwa
                </h1>
                <p className="text-[11px] sm:text-[13px] tracking-[0.2em] font-medium mt-1 uppercase text-white/90">
                  SISTERHOOD EDITION • إهداء من القلب
                </p>
              </div>

              {/* flex-1 spacer pushing headline to bottom */}
              <div className="flex-1" />

              {/* Headline (Instrument Serif): text-white text-[58px] leading-[1.02] tracking-tight max-w-[560px] */}
              <h2
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-white text-[38px] sm:text-[58px] leading-[1.05] tracking-tight max-w-[560px] drop-shadow-md px-2"
              >
                To My Sister Ragwa,
                <br />
                <span className="text-[26px] sm:text-[44px] block mt-1 font-serif text-[#F2F2F2]">
                  أنتِ السند والضحكة والحياة
                </span>
              </h2>

              {/* CTA pill: Letter 1 */}
              <button
                onClick={(e) => handleOpenLetter(0, e)}
                className="mt-6 sm:mt-10 inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#D8F90A] text-[#1E1E1E] font-semibold rounded-full px-5 sm:px-8 py-3.5 sm:py-4 hover:bg-[#c9ea00] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-lg shadow-[#D8F90A]/20 active:scale-95 max-w-[96%]"
              >
                <span className="text-[13.5px] sm:text-[17px] font-bold">الرسالة الأولى: سندي وأماني الحقيقي 💌</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[#1E1E1E] flex-shrink-0" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 2 — INTRO COPY + CTA (LETTER 2)                  */}
          {/* ======================================================== */}
          <div className="px-4 sm:px-[78px] pb-6 sm:pb-8 pt-6">
            <p className="text-[15px] sm:text-[18px] leading-[1.65] text-center text-[#E8E8E8]">
              مهداة بفيضٍ من الحب الصادق من أختكِ <span className="text-[#DCFF00] font-semibold">نور</span> إلى أختها وسندها الغالية <span className="text-white font-semibold">رجوى</span>. كل قسم وزرار في هذه الصفحة يحمل رسالة خاصة كتبتها ليكي من كل قلبي، عن كل لحظة كنتِ فيها سندي، ضحكتي، وأغلى ما في عمري.
            </p>
          </div>

          <div className="flex justify-center pb-10 sm:pb-14">
            <PrimaryButton
              label="الرسالة الثانية: ضحكة العمر وفرحة البيت 💌"
              onClick={(e) => handleOpenLetter(1, e)}
              icon={<Heart className="w-5 h-5 fill-[#0A0A0A]" />}
            />
          </div>

          <Divider />

          {/* ======================================================== */}
          {/* SECTION 3 — "أسباب تخليني أحبك كل يوم أكتر"              */}
          {/* ======================================================== */}
          <div className="px-4 sm:px-9 pb-6 sm:pb-8">
            <h2
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-center text-[34px] sm:text-[46px] leading-[1.05] tracking-tight text-white"
            >
              Why You Mean The World To Me
            </h2>
            <p className="text-center text-[15px] sm:text-[18px] text-[#DCFF00] mt-1.5 sm:mt-2 font-medium">
              أسباب تخليني أعشقك كل يوم أكتر
            </p>
          </div>

          {/* Video / Photo card px-[42px] pb-10 */}
          <div className="px-3 sm:px-[42px] pb-8 sm:pb-10">
            <div
              onClick={() => setSelectedPhoto(PHOTOS.gardenSun)}
              className="block overflow-hidden rounded-[14px] group relative cursor-pointer ring-1 ring-white/10"
            >
              <img
                src={PHOTOS.gardenSun}
                alt="رجوى الغالية في الحديقة"
                className="w-full h-[280px] sm:h-[370px] object-cover rounded-[14px] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-5">
                <div className="flex items-center justify-between w-full gap-2">
                  <div>
                    <p className="text-white font-bold text-[15px] sm:text-[17px]">ضحكتك اللي بتفرّح الدنيا</p>
                    <p className="text-white/70 text-[11px] sm:text-xs mt-0.5">شمس دنيتنا وبهجة العيلة كلها ☀️</p>
                  </div>
                  <span className="bg-[#DCFF00] text-[#0A0A0A] text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-full flex items-center gap-1 flex-shrink-0">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> تكبير الصورة
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Steps list container px-[76px] pb-10, inner max-w-[489px] mx-auto, rendering four <Step>s */}
          <div className="px-4 sm:px-[76px] pb-8 sm:pb-10">
            <div className="max-w-[489px] mx-auto">
              <Step number={1}>
                <strong className="text-white block mb-0.5">قلبك الأبيض الحنون:</strong>
                دايماً بتسبقيني بالخير وبتطمني بكلامك الدافي واحتوائك لأي حاجة بتمر بيّا.. قلبك مفيش في طيبته ونقائه.
              </Step>

              <Step number={2}>
                <strong className="text-white block mb-0.5">ضحكتك اللي بتنوّر البيت:</strong>
                ضحكتك وروحك الحلوة بتملى أي مكان بهجة وطاقة وراحة بال.. من غير ضحكتك اليوم ملوش أي طعم.
              </Step>

              <Step number={3}>
                <strong className="text-white block mb-0.5">وقفتك وسندك الحقيقي:</strong>
                دايماً في ضهري وأول حد ألجأ له، إنتِ الأمان والحضن الصادق اللي عمره ما يتغير ولا يقصر.
              </Step>

              <Step number={4}>
                <strong className="text-white block mb-0.5">ذكرياتنا اللي محفورة في القلب:</strong>
                كل خروجة وكل تفصيلة وكل ضحكة من القلب عشناها سوا هي أغلى كنز عندي في الدنيا.
              </Step>
            </div>
          </div>

          <div className="flex justify-center pb-10 sm:pb-14">
            <SolidButton
              label="الرسالة الثالثة: قلبك الطيب ونقاء روحك 💌"
              onClick={(e) => handleOpenLetter(2, e)}
            />
          </div>

          <Divider />

          {/* ======================================================== */}
          {/* SECTION 4 — "ذكريات العمر وضحكة من القلب"                 */}
          {/* ======================================================== */}
          <div className="pb-5 sm:pb-7 px-4 sm:px-9">
            <h2
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-center text-[34px] sm:text-[46px] leading-[1.05] tracking-tight text-white"
            >
              Memories We Cherish Forever
            </h2>
            <p className="text-center text-[15px] sm:text-[18px] text-[#DCFF00] mt-1.5 sm:mt-2 font-medium">
              ذكريات العمر وضحكة من القلب
            </p>
          </div>

          {/* Interactive photo selector tabs to see all photos */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-4 px-2 flex-wrap">
            {memoriesList.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveMemoryTab(index)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  activeMemoryTab === index
                    ? 'bg-[#DCFF00] text-[#0A0A0A]'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                ذكرى {index + 1}
              </button>
            ))}
          </div>

          {/* Video / Photo card px-[42px] pb-10 (same classes as Section 3) */}
          <div className="px-3 sm:px-[42px] pb-8 sm:pb-10">
            <div
              onClick={() => setSelectedPhoto(memoriesList[activeMemoryTab].src)}
              className="block overflow-hidden rounded-[14px] group relative cursor-pointer ring-1 ring-white/10"
            >
              <img
                src={memoriesList[activeMemoryTab].src}
                alt={memoriesList[activeMemoryTab].title}
                className="w-full h-[280px] sm:h-[370px] object-cover rounded-[14px] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6">
                <span className="text-[#DCFF00] text-xs font-bold mb-1 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-[#DCFF00]" /> {memoriesList[activeMemoryTab].title}
                </span>
                <p className="text-white text-[14px] sm:text-[15px] leading-relaxed">
                  {memoriesList[activeMemoryTab].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Paragraph container px-[78px] pb-8, centered text-[18px] leading-[1.55] */}
          <div className="px-4 sm:px-[78px] pb-6 sm:pb-8">
            <p className="text-[15px] sm:text-[18px] leading-[1.65] text-center text-[#E8E8E8]">
              كل صورة ولحظة عشناها سوا بتفكرني بنعمة وجودك في حياتي. من الضحك من القلب، للتفاصيل البسيطة اللي بنشاركها.. إنتِ مش بس أختي، إنتِ توأم روحي وسري وفرحتي، وأعظم هدية ربنا أنعم عليا بيها.
            </p>
          </div>

          <div className="flex justify-center pb-10 sm:pb-14">
            <SolidButton
              label="الرسالة الرابعة: توأم روحي وذكرياتنا الحلوة 💌"
              onClick={(e) => handleOpenLetter(3, e)}
            />
          </div>

          {/* ======================================================== */}
          {/* SECTION 5 — LIME CTA CARD                                */}
          {/* ======================================================== */}
          <div className="px-3 sm:px-14 pb-10 sm:pb-12">
            <div className="bg-[#D8F90A] rounded-[12px] px-4 sm:px-8 py-8 sm:py-12 text-center shadow-xl shadow-[#D8F90A]/10">
              <h2
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[#1E1E1E] text-[34px] sm:text-[52px] leading-[1.02] tracking-tight mb-2 sm:mb-3"
              >
                Always &amp; Forever In My Heart
              </h2>
              <p
                style={{ fontFamily: "'Amiri', serif" }}
                className="text-[#1E1E1E] text-[20px] sm:text-[28px] font-bold mb-2"
              >
                كل سنة وأنتِ طيبة يا أغلى أخت
              </p>
              <p className="text-[#1E1E1E] text-[14px] sm:text-[18px] leading-[1.55] mb-6 sm:mb-8 px-1 sm:px-4 font-medium">
                يا رب يسعد قلبك ويحقق كل أمانيكِ ويديم ضحكتك منورة أيامنا، هديتي ليكي حب لا ينتهي و٥ رسائل خاصة من القلب ودعوة في كل صلاة إن ربنا يحفظك ليا ولا يحرمني منك أبداً.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={(e) => handleOpenLetter(4, e)}
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#0A0A0A] text-[#DCFF00] font-bold rounded-lg px-4 sm:px-8 py-3.5 hover:bg-[#1E1E1E] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-lg active:scale-95 text-center max-w-[96%]"
                >
                  <span className="text-[13px] sm:text-[16px]">الرسالة الخامسة: دعوة من القلب وأمنية العمر 💌</span>
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-[#DCFF00] stroke-[#DCFF00] flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* FOOTER (NO SOCIAL MEDIA - AS REQUESTED BY USER)          */}
          {/* ======================================================== */}
          <footer className="bg-[#080808] text-white pt-10 sm:pt-12 px-4 sm:px-10 text-center border-t border-white/5">
            {/* Wordmark link */}
            <div className="pb-6 sm:pb-8 flex justify-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[28px] sm:text-[36px] font-bold tracking-tight text-white hover:text-[#DCFF00] transition-colors"
              >
                Nour &amp; Ragwa
              </a>
            </div>

            {/* Disclaimer paragraph */}
            <p className="text-[12px] sm:text-[13px] text-[#83837D] leading-[1.6] pb-6 sm:pb-8 max-w-[480px] mx-auto px-1">
              هذه الصفحة صُممت بفيضٍ من الحب والتقدير كهدية حصرية ودائمة من الأخت نور لأختها الغالية رجوى. لا توجد كلمات تكفي للتعبير عن غلاوتكِ.
            </p>

            {/* Divider */}
            <div className="flex justify-center pb-6 sm:pb-8">
              <div className="h-px w-20 sm:w-24 bg-white/20" />
            </div>

            {/* Unsubscribe note */}
            <p className="text-[11px] sm:text-[12px] text-[#83837D] pb-3 sm:pb-4 leading-[1.6] px-1">
              إذا كنتِ تبحثين عن زر إلغاء اشتراك المحبة... نأسف، رابط الأخوة والحب بيننا اشتراك أبدي لا يمكن إلغاؤه أبداً ❤️
            </p>

            {/* Link row */}
            <div className="text-[11px] sm:text-[12px] pb-4 text-[#8F8E88] flex justify-center items-center gap-1.5 sm:gap-2 flex-wrap px-1">
              <span className="hover:text-white cursor-pointer" onClick={() => setActiveMemoryTab(0)}>
                ذكرياتنا الجميلة
              </span>
              <span>|</span>
              <span className="hover:text-white cursor-pointer" onClick={(e) => triggerCelebration(e)}>
                حب غير مشروط
              </span>
              <span>|</span>
              <span className="hover:text-white cursor-pointer" onClick={(e) => triggerCelebration(e)}>
                سند وأمان
              </span>
              <span>|</span>
              <span className="hover:text-white cursor-pointer" onClick={(e) => triggerCelebration(e)}>
                أختي وسندي رجوى 🤍
              </span>
            </div>

            {/* Copyright */}
            <p className="text-[11px] sm:text-[12px] text-white/70 hover:text-white inline-block mt-1">
              © 2026 Nour &amp; Ragwa — Created with Infinite Love
            </p>

            <div className="pb-8 sm:pb-10" />
          </footer>

        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL: MULTIPLE LETTERS READER FROM NOUR TO RAGWA        */}
      {/* ======================================================== */}
      {isLetterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-[600px] bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-8 shadow-2xl text-right max-h-[92vh] flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setIsLetterOpen(false)}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-10"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Header */}
            <div className="text-center pb-3 sm:pb-4 border-b border-white/10 flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#DCFF00] flex items-center justify-center mx-auto mb-2 text-xl sm:text-2xl shadow-lg">
                {currentLetter.emoji}
              </div>
              <h3
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[24px] sm:text-[34px] text-white leading-tight"
              >
                Letters from Nour to Ragwa
              </h3>
              <p className="text-[#DCFF00] text-[11px] sm:text-sm font-semibold mt-1">
                رسائل من قلب نور إلى أختها وسندها رجوى ({activeLetterTab + 1} من {LETTERS.length})
              </p>
            </div>

            {/* 5 Tabs to switch easily between the letters */}
            <div className="flex gap-1.5 p-1.5 bg-white/5 rounded-xl my-3 overflow-x-auto no-scrollbar scroll-smooth flex-shrink-0">
              {LETTERS.map((letter, idx) => (
                <button
                  key={letter.id}
                  onClick={(e) => {
                    triggerCelebration(e);
                    setActiveLetterTab(idx);
                  }}
                  className={`flex-shrink-0 sm:flex-1 py-1.5 sm:py-2 px-2.5 text-center rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeLetterTab === idx
                      ? 'bg-[#DCFF00] text-[#0A0A0A] shadow-md font-bold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="ml-1">{letter.emoji}</span>
                  {letter.title}
                </button>
              ))}
            </div>

            {/* Current Letter Content */}
            <div className="py-2 px-1 overflow-y-auto flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] sm:text-xs bg-[#DCFF00]/15 text-[#DCFF00] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full font-bold">
                  {currentLetter.badge}
                </span>
                <span className="text-[11px] sm:text-xs text-white/50 font-medium">
                  {currentLetter.subtitle}
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4 text-[#E8E8E8] text-[14px] sm:text-[17px] leading-[1.75] font-normal">
                {currentLetter.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Navigation footer between letters */}
            <div className="pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-between gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={(e) => {
                  triggerCelebration(e);
                  setActiveLetterTab((prev) => (prev > 0 ? prev - 1 : LETTERS.length - 1));
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>الرسالة السابقة</span>
              </button>

              <button
                onClick={(e) => {
                  triggerCelebration(e);
                  setActiveLetterTab((prev) => (prev < LETTERS.length - 1 ? prev + 1 : 0));
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 rounded-lg bg-[#DCFF00] text-[#0A0A0A] font-bold text-xs sm:text-sm transition-all hover:bg-[#c9ea00] cursor-pointer shadow-md"
              >
                <span>الرسالة التالية</span>
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: FULL RESOLUTION PHOTO LIGHTBOX                    */}
      {/* ======================================================== */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg cursor-zoom-out"
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 left-0 p-2 text-white hover:text-[#DCFF00] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <X className="w-6 h-6" />
              <span className="text-sm">إغلاق</span>
            </button>
            <img
              src={selectedPhoto}
              alt="ذكرى جميلة"
              className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl ring-1 ring-white/20"
            />
          </div>
        </div>
      )}
    </div>
  );
}
