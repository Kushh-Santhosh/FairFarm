import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../i18n';
import { store } from '../../services/store';
import { voiceService } from '../../services/voice';
import { formatINR } from '../../utils/currency';
import { AppLanguage, VoiceSessionRecord } from '../../types';
import {
  PhoneCall,
  PhoneOff,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  UserCheck,
  ChevronRight,
  Info,
  ShieldAlert,
} from 'lucide-react';

export const VoiceAssistant: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();
  const pastSessions = store.getVoiceSessions();

  // Call state
  const [callState, setCallState] = useState<'idle' | 'dialing' | 'connected' | 'ended'>('idle');
  const [ivrStep, setIvrStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechRecognitionError, setSpeechRecognitionError] = useState<string | null>(null);
  const [keypadInput, setKeypadInput] = useState('');
  const [callDuration, setCallDuration] = useState(0);

  // Flow variables
  const [chosenLang, setChosenLang] = useState<AppLanguage>(language);
  const [chosenCrop, setChosenCrop] = useState('Tomato');
  const [chosenQty, setChosenQty] = useState(1000);
  const [chosenDistrict, setChosenDistrict] = useState('Bengaluru Rural');
  const [assistantSpokenText, setAssistantSpokenText] = useState('');
  const [isSpeakingNow, setIsSpeakingNow] = useState(false);
  const [callOutcomeNote, setCallOutcomeNote] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognizerRef = useRef<any>(null);

  // Call duration counter
  useEffect(() => {
    if (callState === 'connected') {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const speakPrompt = (text: string, langToUse: AppLanguage = chosenLang) => {
    setAssistantSpokenText(text);
    if (!isMuted) {
      setIsSpeakingNow(true);
      voiceService.speak(text, langToUse, () => {
        setIsSpeakingNow(false);
      });
    }
  };

  const handleStartCall = () => {
    voiceService.playDialingRingtone();
    setCallState('dialing');
    setCallDuration(0);
    setIvrStep(1);
    setKeypadInput('');
    setCallOutcomeNote(null);
    setSpeechRecognitionError(null);

    setTimeout(() => {
      voiceService.playCallConnectedTone();
      setCallState('connected');
      speakPrompt(t.voice.step1Prompt, language);
    }, 1800);
  };

  const handleEndCall = (outcome: VoiceSessionRecord['userOutcome'] = 'call_completed', note?: string) => {
    voiceService.stop();
    if (recognizerRef.current) {
      try { recognizerRef.current.stop(); } catch (e) {}
    }
    setIsListening(false);
    voiceService.playCallEndedTone();
    setCallState('ended');

    // Save session in store
    store.recordVoiceSession({
      durationSeconds: callDuration || 25,
      language: chosenLang,
      cropSelected: chosenCrop,
      quantityKg: chosenQty,
      district: chosenDistrict,
      recommendedOption: 'City Fresh Foods Ltd',
      recommendedNet: 11000,
      userOutcome: outcome,
    });

    if (note) setCallOutcomeNote(note);
  };

  // Optional Microphone Speech-to-Text (Triggered strictly by explicit click)
  const handleToggleMic = () => {
    if (!voiceService.isRecognitionSupported()) {
      setSpeechRecognitionError('Speech-to-text recognition is not supported in this browser. Please use the telephone keypad.');
      return;
    }

    if (isListening) {
      if (recognizerRef.current) {
        try { recognizerRef.current.stop(); } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    setSpeechRecognitionError(null);
    setIsListening(true);

    recognizerRef.current = voiceService.createRecognizer(
      chosenLang,
      (transcript) => {
        setIsListening(false);
        const lower = transcript.toLowerCase();
        // Check for crop or quantity
        if (lower.includes('tomato') || lower.includes('ಟೊಮೆಟೊ') || lower.includes('టమోటా') || lower.includes('தக்காளி') || lower.includes('टमाटर')) {
          handleKeyPress('1');
        } else if (lower.includes('onion') || lower.includes('ಈರುಳ್ಳಿ') || lower.includes('ఉల్లి') || lower.includes('வெங்காயம்') || lower.includes('प्याज')) {
          handleKeyPress('2');
        } else {
          // If digits mentioned
          const match = transcript.match(/\d+/);
          if (match && ivrStep === 3) {
            setKeypadInput(match[0]);
            handleKeyPress('#');
          }
        }
      },
      (err) => {
        setIsListening(false);
        setSpeechRecognitionError(err);
      },
      () => {
        setIsListening(false);
      }
    );

    if (recognizerRef.current) {
      try {
        recognizerRef.current.start();
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  // Keypad button press handler (DTMF Tone & Flow)
  const handleKeyPress = (key: string) => {
    voiceService.playDtmf(key);

    if (callState !== 'connected') return;

    if (ivrStep === 1) {
      // Language selection
      let selected: AppLanguage = 'en';
      if (key === '1') selected = 'en';
      else if (key === '2') selected = 'kn';
      else if (key === '3') selected = 'te';
      else if (key === '4') selected = 'hi';

      setChosenLang(selected);
      setLanguage(selected);
      setIvrStep(2);

      const cropPrompts: Record<AppLanguage, string> = {
        en: 'Which crop are you harvesting? Press 1 for Tomato, 2 for Onion, 3 for Potato, 4 for other crops.',
        kn: 'ನೀವು ಯಾವ ಬೆಳೆಯನ್ನು ಮಾರಾಟ ಮಾಡಲು ಬಯಸುತ್ತೀರಿ? ಟೊಮೆಟೊಗೆ 1, ಈರುಳ್ಳಿಗೆ 2, ಆಲೂಗಡ್ಡೆಗೆ 3 ಒತ್ತಿರಿ.',
        te: 'మీరు ఏ పంటను విక్రయించాలనుకుంటున్నారు? టమోటా కోసం 1, ఉల్లిపాయ కోసం 2, బంగాళాదుంప కోసం 3 నొక్కండి.',
        ta: 'நீங்கள் எந்த பயிரை விற்க விரும்புகிறீர்கள்? தக்காளிக்கு 1, வெங்காயத்திற்கு 2, உருளைக்கிழங்கிற்கு 3 ஐ அழுத்தவும்.',
        hi: 'आप कौन सी फसल बेचना चाहते हैं? टमाटर के लिए 1, प्याज के लिए 2, आलू के लिए 3 दबाएं.',
      };
      speakPrompt(cropPrompts[selected] || cropPrompts.en, selected);
    } else if (ivrStep === 2) {
      // Crop selection
      let crp = 'Tomato';
      if (key === '1') crp = 'Tomato';
      else if (key === '2') crp = 'Onion';
      else if (key === '3') crp = 'Potato';
      else crp = 'Beans';

      setChosenCrop(crp);
      setIvrStep(3);

      const qtyPrompts: Record<AppLanguage, string> = {
        en: 'Enter your available quantity in kilograms on the keypad, then press hash (#).',
        kn: 'ನಿಮ್ಮ ಅಂದಾಜು ಬೆಳೆಯ ಪ್ರಮಾಣವನ್ನು ಕೆಜಿಗಳಲ್ಲಿ ನಮೂದಿಸಿ, ನಂತರ ಹ್ಯಾಶ್ (#) ಒತ್ತಿರಿ.',
        te: 'మీ పంట పరిమాణాన్ని కిలోలలో నమోదు చేసి, ఆపై హ్యాష్ (#) నొక్కండి.',
        ta: 'விளைச்சலின் அளவை கிலோவில் உள்ளிட்டு, பிறகு ஹேஷ் (#) அழுத்தவும்.',
        hi: 'अपनी फसल की मात्रा किग्रा में दर्ज करें, फिर हैश (#) दबाएं.',
      };
      speakPrompt(qtyPrompts[chosenLang] || qtyPrompts.en, chosenLang);
    } else if (ivrStep === 3) {
      // Quantity accumulator
      if (key === '#') {
        const qtyVal = Number(keypadInput) || 1000;
        setChosenQty(qtyVal);
        setKeypadInput('');
        setIvrStep(4);

        const distPrompts: Record<AppLanguage, string> = {
          en: 'Please select your district: Press 1 for Hoskote or Bengaluru Rural, 2 for Kolar, 3 for Ramanagara, 4 for Mysuru.',
          kn: 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ: ಹೊಸಕೋಟೆಗಾಗಿ 1, ಕೋಲಾರಕ್ಕಾಗಿ 2, ರಾಮನಗರಕ್ಕಾಗಿ 3, ಮೈಸೂರಿಗಾಗಿ 4 ಒತ್ತಿರಿ.',
          te: 'మీ జిల్లాను ఎంచుకోండి: హోస్కోటే కోసం 1, కోలార్ కోసం 2, రామనగర కోసం 3, మైసూరు కోసం 4 నొక్కండి.',
          ta: 'உங்கள் மாவட்டத்தைத் தேர்வு செய்யவும்: ஹோஸ்கோட்டிற்கு 1, கோலாருக்கு 2, ராமநகரத்திற்கு 3, மைசூருக்கு 4 ஐ அழுத்தவும்.',
          hi: 'अपना ज़िला चुनें: होसकोटे के लिए 1, कोलार के लिए 2, रामनगर के लिए 3, मैसूर के लिए 4 दबाएं.',
        };
        speakPrompt(distPrompts[chosenLang] || distPrompts.en, chosenLang);
      } else {
        setKeypadInput((prev) => prev + key);
      }
    } else if (ivrStep === 4) {
      // District selection
      let dst = 'Bengaluru Rural';
      if (key === '1') dst = 'Bengaluru Rural (Hoskote)';
      else if (key === '2') dst = 'Kolar';
      else if (key === '3') dst = 'Ramanagara';
      else dst = 'Mysuru';

      setChosenDistrict(dst);
      setIvrStep(5);

      const resultPrompts: Record<AppLanguage, string> = {
        en: `Market intelligence calculated! Your local trader offers ₹9,500 net. Your nearby mandi offers ₹10,500 net. Distant buyer City Fresh Foods leaves ₹11,000 net in your pocket after ₹3,000 in transport and expenses. Press 1 to hear again. Press 2 to request buyer callback. Press 3 to speak with Hoskote FPO coordinator. Press 4 to end call.`,
        kn: `ಮಾರುಕಟ್ಟೆ ಲೆಕ್ಕಾಚಾರ ಮುಗಿದಿದೆ! ಸ್ಥಳೀಯ ವ್ಯಾಪಾರಿ ₹9,500 ನೀಡುತ್ತಾರೆ. ಹತ್ತಿರದ ಮಂಡಿ ₹10,500 ನೀಡುತ್ತದೆ. ದೂರದ ಸಿಟಿ ಫ್ರೆಶ್ ಖರೀದಿದಾರರು ₹3,000 ವೆಚ್ಚಗಳ ನಂತರ ₹11,000 ನಿವ್ವಳ ಆದಾಯ ನೀಡುತ್ತಾರೆ. ಮರುಕೇಳಲು 1, ಕಾಲ್‌ಬ್ಯಾಕ್‌ಗೆ 2, FPO ಅಧಿಕಾರಿಯೊಂದಿಗೆ ಮಾತನಾಡಲು 3, ಕರೆ ಮುಗಿಸಲು 4 ಒತ್ತಿರಿ.`,
        te: `మార్కెట్ లెక్క సిద్ధంగా ఉంది! స్థానిక వ్యాపారి ₹9,500 ఇస్తారు. సమీప మార్కెట్ ₹10,500 ఇస్తుంది. దూరపు కొనుగోలుదారు ₹11,000 నికర లాభం ఇస్తుంది. మళ్ళీ వినడానికి 1, కాల్ బ్యాక్ కోసం 2, FPO అధికారితో మాట్లాడటానికి 3, ముగించడానికి 4 నొక్కండి.`,
        ta: `சந்தை தகவல் தயாராக உள்ளது! உள்ளூர் வியாபாரி ₹9,500 தருவார். மண்டி ₹10,500 தரும். தொலைதூர வாங்குபவர் அனைத்து செலவுகளுக்குப் பிறகு ₹11,000 நிகர லாபம் தருவார். மீண்டும் கேட்க 1, திரும்ப அழைக்க 2, FPO ஒருங்கிணைப்பாளருடன் பேச 3, முடிக்க 4 ஐ அழுத்தவும்.`,
        hi: `बाजार गणना पूरी हुई! स्थानीय व्यापारी ₹9,500 देंगे. नजदीकी मंडी ₹10,500 देगी. दूरस्थ खरीदार सिटी फ्रेश ₹11,000 शुद्ध मुनाफा देगा. दोबारा सुनने के लिए 1, कॉलबैक के लिए 2, FPO अधिकारी से बात करने के लिए 3, समाप्त करने के लिए 4 दबाएं.`,
      };
      speakPrompt(resultPrompts[chosenLang] || resultPrompts.en, chosenLang);
    } else if (ivrStep === 5) {
      if (key === '1') {
        speakPrompt(assistantSpokenText, chosenLang);
      } else if (key === '2') {
        const msg = 'City Fresh Foods buyer procurement desk has received your callback request.';
        speakPrompt('Callback request registered. A buyer coordinator will call you within 1 hour.', chosenLang);
        handleEndCall('callback_requested', msg);
      } else if (key === '3') {
        const msg = 'Connected with Hoskote FPO Field Officer Gururaj Gowda.';
        speakPrompt('Connecting to Hoskote FPO Field Desk. Please hold the line.', chosenLang);
        handleEndCall('connected_coordinator', msg);
      } else if (key === '4') {
        handleEndCall('call_completed', 'Call finished. Findings saved to your activity log.');
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-32 lg:pb-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-forest to-forest-dark text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-surface/20 text-cream text-xs font-semibold mb-2">
            <PhoneCall className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>Simulated Interactive Voice Response (IVR)</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            {t.voice.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#D8E2DC] mt-1 max-w-2xl leading-relaxed">
            {t.voice.subtitle}
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs bg-emerald-800 text-cream px-3 py-1.5 rounded-full font-bold border border-emerald-600">
            Helpline: 1800-FAIR-FARM
          </span>
        </div>
      </div>

      {/* Technology & Telephony Architecture Notice */}
      <div className="p-4 bg-white rounded-2xl border border-[#E5E0D0] text-xs text-gray-700 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-forest-dark">
          <Info className="w-4 h-4 text-forest shrink-0" />
          <span>Interactive Telephony Architecture & Modalities</span>
        </div>
        <p className="text-gray-600 leading-relaxed text-[11px]">
          <strong>Speech Synthesis (TTS):</strong> Reads IVR prompts aloud using browser audio without microphone access. • 
          <strong> DTMF Keypad:</strong> Simulates feature-phone touch-tone dialing with authentic dual-tone audio frequencies. • 
          <strong> Speech Recognition (STT):</strong> Microphone access is requested <em>only</em> if you tap the optional mic button below. • 
          <em> Note: This is an automated browser simulation for demonstration and does not connect to live telecom networks.</em>
        </p>
      </div>

      {/* 2. Interactive Phone Body & Keypad Simulation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Realistic Smartphone Dial Screen */}
        <div className="bg-white rounded-3xl border-4 border-[#2A3B32] shadow-2xl overflow-hidden max-w-sm mx-auto w-full">
          {/* Phone Speaker Notch */}
          <div className="bg-[#2A3B32] py-2 px-6 flex justify-between items-center text-white text-[10px]">
            <span>12:00</span>
            <div className="w-16 h-3 bg-black/40 rounded-full" />
            <span>VoLTE 5G</span>
          </div>

          {/* Screen Content */}
          <div className="p-5 sm:p-6 bg-[#FAFAF7] min-h-[460px] flex flex-col justify-between">
            {/* Top Status */}
            <div className="text-center space-y-1">
              <div className="text-[11px] font-bold text-mutedGrey uppercase tracking-wider">
                FAIRFARM Rural Voice Helpline
              </div>
              <div className="text-xl font-black text-forest-dark">1800-FAIR-FARM</div>

              {callState === 'idle' && (
                <span className="inline-block text-[11px] bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full font-semibold">
                  Ready to Call (Simulated)
                </span>
              )}
              {callState === 'dialing' && (
                <span className="inline-block text-[11px] bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold animate-pulse">
                  Connecting Call...
                </span>
              )}
              {callState === 'connected' && (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-emerald-800">
                    Call Active • {formatTime(callDuration)}
                  </span>
                </div>
              )}
              {callState === 'ended' && (
                <span className="inline-block text-[11px] bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full font-semibold">
                  Call Disconnected
                </span>
              )}
            </div>

            {/* Audio Wave Visualizer / Spoken Dialogue Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs my-3 min-h-[120px] flex flex-col justify-between">
              <div className="text-[10px] uppercase font-bold text-forest flex items-center justify-between">
                <span>Spoken Dialogue</span>
                {isSpeakingNow && (
                  <span className="flex items-center gap-1 text-emerald-700 animate-pulse font-bold">
                    <Volume2 className="w-3.5 h-3.5" /> Speaking
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-800 leading-relaxed font-medium mt-1">
                {callState === 'connected'
                  ? assistantSpokenText
                  : callOutcomeNote || 'Press the green call button below to start the interactive voice market intelligence call.'}
              </p>

              {ivrStep === 3 && callState === 'connected' && (
                <div className="text-xs font-bold text-forest pt-1 border-t border-gray-100 mt-2">
                  Keypad Entered: <span className="text-base text-forest-dark">{keypadInput || '...'}</span> kg
                </div>
              )}

              {speechRecognitionError && (
                <div className="text-[10px] text-danger font-semibold mt-1">
                  {speechRecognitionError}
                </div>
              )}
            </div>

            {/* Phone Controls (Mute, Call/End, Optional Speech Recognition) */}
            <div className="flex items-center justify-center gap-3 py-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition-colors ${
                  isMuted ? 'bg-rose-100 text-rose-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                aria-label="Mute toggle"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              {callState === 'idle' || callState === 'ended' ? (
                <button
                  onClick={handleStartCall}
                  className="p-4 sm:p-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl transition-all active:scale-95"
                  title="Call FAIRFARM"
                  aria-label="Start Call"
                >
                  <PhoneCall className="w-7 h-7" />
                </button>
              ) : (
                <button
                  onClick={() => handleEndCall('call_completed')}
                  className="p-4 sm:p-5 rounded-full bg-danger hover:bg-red-700 text-white shadow-xl transition-all active:scale-95"
                  title="End Call"
                  aria-label="End Call"
                >
                  <PhoneOff className="w-7 h-7" />
                </button>
              )}

              {/* Optional Speech-to-Text Button (Requests Mic ONLY on click) */}
              {callState === 'connected' && (
                <button
                  onClick={handleToggleMic}
                  className={`p-3 rounded-full transition-colors ${
                    isListening ? 'bg-amber-400 text-forest-dark animate-pulse ring-2 ring-amber-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={isListening ? 'Listening (Click to stop)' : 'Click to speak using microphone'}
                  aria-label="Microphone dictation"
                >
                  {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
              )}
            </div>

            {/* 3x4 DTMF Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { k: '1', sub: 'ENG' },
                { k: '2', sub: 'ಕನ್ನಡ' },
                { k: '3', sub: 'తెలుగు' },
                { k: '4', sub: 'GHI' },
                { k: '5', sub: 'JKL' },
                { k: '6', sub: 'MNO' },
                { k: '7', sub: 'PQRS' },
                { k: '8', sub: 'TUV' },
                { k: '9', sub: 'WXYZ' },
                { k: '*', sub: '' },
                { k: '0', sub: '+' },
                { k: '#', sub: 'Enter' },
              ].map(({ k, sub }) => (
                <button
                  key={k}
                  onClick={() => handleKeyPress(k)}
                  className="p-2 sm:p-2.5 rounded-xl bg-white hover:bg-gray-100 active:bg-gray-200 border border-gray-200 text-gray-800 flex flex-col items-center justify-center transition-all shadow-2xs"
                  aria-label={`Key ${k}`}
                >
                  <span className="text-base font-bold leading-tight">{k}</span>
                  <span className="text-[8px] text-gray-400 uppercase leading-none">{sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Explanatory Call Flow & History */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E5E0D0] shadow-xs">
            <h3 className="font-bold text-sm text-forest-dark mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Simulated Phone Call Flow (Automated IVR)</span>
            </h3>
            <p className="text-xs text-mutedGrey mb-4">
              Allows farmers with feature phones (non-smartphones) to access the net-earnings calculation engine via standard telecom.
            </p>

            <div className="space-y-3 text-xs">
              <div className={`p-3 rounded-xl border ${ivrStep === 1 ? 'bg-forest-surface border-forest' : 'bg-gray-50 border-gray-200'}`}>
                <div className="font-bold text-forest-dark">Step 1: Language Selection</div>
                <div className="text-[11px] text-gray-600 mt-0.5">Press 1 for English, 2 for Kannada, 3 for Telugu, 4 for Hindi.</div>
              </div>

              <div className={`p-3 rounded-xl border ${ivrStep === 2 ? 'bg-forest-surface border-forest' : 'bg-gray-50 border-gray-200'}`}>
                <div className="font-bold text-forest-dark">Step 2: Crop Choice</div>
                <div className="text-[11px] text-gray-600 mt-0.5">Press 1 for Tomato, 2 for Onion, 3 for Potato, 4 for other crops.</div>
              </div>

              <div className={`p-3 rounded-xl border ${ivrStep === 3 ? 'bg-forest-surface border-forest' : 'bg-gray-50 border-gray-200'}`}>
                <div className="font-bold text-forest-dark">Step 3: Harvest Quantity</div>
                <div className="text-[11px] text-gray-600 mt-0.5">Enter quantity (e.g. 1000) on keypad then press hash (#).</div>
              </div>

              <div className={`p-3 rounded-xl border ${ivrStep === 4 ? 'bg-forest-surface border-forest' : 'bg-gray-50 border-gray-200'}`}>
                <div className="font-bold text-forest-dark">Step 4: Location District</div>
                <div className="text-[11px] text-gray-600 mt-0.5">Press 1 for Hoskote/Bengaluru, 2 for Kolar, 3 for Ramanagara, 4 for Mysuru.</div>
              </div>

              <div className={`p-3 rounded-xl border ${ivrStep === 5 ? 'bg-forest-surface border-forest' : 'bg-gray-50 border-gray-200'}`}>
                <div className="font-bold text-forest-dark">Step 5: Net Earnings Announcement</div>
                <div className="text-[11px] text-gray-600 mt-0.5">
                  Announces ₹9,500 local vs ₹10,500 mandi vs ₹11,000 Distant Buyer. Replay (1), Callback (2), FPO Coordinator (3).
                </div>
              </div>
            </div>
          </div>

          {/* Past Voice Call Logs */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5E0D0] shadow-xs">
            <h3 className="font-bold text-sm text-forest-dark mb-2">Previous Call Transcripts</h3>
            {pastSessions.length === 0 ? (
              <p className="text-xs text-mutedGrey italic">No previous calls yet. Start a call to test the flow.</p>
            ) : (
              <div className="space-y-2">
                {pastSessions.slice(0, 3).map((s) => (
                  <div key={s.id} className="p-3 rounded-xl bg-cream border border-[#E5E0D0] text-xs">
                    <div className="flex justify-between font-bold text-forest-dark mb-1">
                      <span>{s.cropSelected} ({s.quantityKg} kg)</span>
                      <span className="text-forest font-bold">{formatINR(s.recommendedNet)} Net</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-mutedGrey">
                      <span>District: {s.district}</span>
                      <span>Outcome: {s.userOutcome}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
