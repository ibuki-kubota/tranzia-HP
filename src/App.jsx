import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, ShieldCheck, Check, MoveUpRight, AlertCircle, Layers, Instagram, ArrowLeft, Send, Monitor, Smartphone, Zap, Code, Target, Flag } from 'lucide-react';

/**
 * ==========================================
 * 【重要】ここにFormspreeのURLを貼ってください
 * ==========================================
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrbjpwad"; 

/**
 * SVG Icons for X (Twitter)
 */
const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/**
 * Hook for scroll-triggered animations
 */
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};

/**
 * FadeIn Wrapper Component
 */
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * Component: Pricing Card
 */
const PricingCard = ({ tier, levelJP, price, period, title, description, features, isHighlight = false, isWebPlan = false }) => (
  <div className={`flex flex-col p-8 md:p-10 rounded-3xl border h-full transition-all duration-500 group ${
    isHighlight 
      ? "bg-neutral-900 border-blue-900/50 shadow-2xl shadow-blue-900/20 relative overflow-hidden translate-y-[-8px]" 
      : "bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/50"
  }`}>
    {isHighlight && (
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
    )}
    
    <div className="mb-8 border-b border-neutral-800 pb-8">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${
          isHighlight ? "border-blue-500/30 text-blue-400 bg-blue-500/10" : "border-neutral-700 text-neutral-500"
        }`}>
          {tier}
        </span>
        {isHighlight && (
            <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-1 rounded tracking-wider shadow-lg shadow-blue-600/30">RECOMMENDED</span>
        )}
      </div>
      
      <h3 className="text-3xl font-bold mb-2 tracking-tight text-white">{title}</h3>
      <p className="text-sm font-bold mb-6 text-neutral-400">
        {levelJP}
      </p>
      
      {/* Webプランの場合にページ数を強調表示 */}
      {isWebPlan && (
        <div className="mb-6 bg-gradient-to-r from-amber-200/10 to-transparent border-l-4 border-amber-400 p-3 rounded-r-lg">
          <p className="text-amber-400 font-bold text-lg tracking-wide">
            1〜5ページ制作込み
          </p>
        </div>
      )}

      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-bold tracking-tight text-white">
          ¥{price}
        </span>
        <span className="text-sm text-neutral-500">/月 (税別)</span>
      </div>

      <div className={`flex items-center justify-between p-3 rounded-lg ${isHighlight ? "bg-blue-900/20 border border-blue-500/30" : "bg-neutral-800/50 border border-neutral-800"}`}>
        <span className="text-xs font-bold text-neutral-400">契約期間</span>
        <span className={`text-sm font-bold ${isHighlight ? "text-blue-400" : "text-white"}`}>
          {period}
        </span>
      </div>
    </div>

    <div className="flex-1 flex flex-col">
      <p className="text-sm leading-relaxed text-neutral-400 font-medium mb-8 min-h-[3em]">
        {description}
      </p>
      
      <div className="mt-auto">
        <div className="mb-4 text-[10px] font-bold text-neutral-600 uppercase tracking-widest border-b border-neutral-800 pb-2">
            {isWebPlan ? "Service Includes" : "All Plans Include"}
        </div>
        <ul className="space-y-3">
            {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm font-medium text-neutral-300 group-hover:text-neutral-200 transition-colors">
                <div className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-neutral-800 border border-neutral-700">
                <Check className="w-2.5 h-2.5 text-neutral-400" />
                </div>
                <span className="leading-tight text-sm opacity-90">{feature}</span>
            </li>
            ))}
        </ul>
      </div>
    </div>
  </div>
);

/**
 * Component: Feature/Reason Card
 */
const ReasonCard = ({ icon: Icon, title, description }) => (
  <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-10 h-full flex flex-col hover:border-neutral-600 hover:bg-neutral-800 transition-all duration-500 group">
    <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-all duration-500">
      <Icon className="w-6 h-6 text-neutral-400 group-hover:text-black transition-colors" />
    </div>
    <div className="mb-4">
      <h3 className="text-2xl font-bold tracking-tight text-white mb-2">{title}</h3>
    </div>
    <p className="text-neutral-400 leading-relaxed font-medium text-sm mt-auto group-hover:text-neutral-300 transition-colors">
      {description}
    </p>
  </div>
);

/**
 * Component: Service Selection Card
 */
const ServiceCard = ({ icon: Icon, titleJP, description, onClick }) => (
  <button onClick={onClick} className="text-left w-full bg-neutral-900 border border-neutral-800 rounded-[2rem] p-10 h-full flex flex-col hover:border-blue-700 hover:bg-neutral-800/80 transition-all duration-500 group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all" />
    
    <div className="w-16 h-16 rounded-2xl bg-neutral-800 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 relative z-10">
      <Icon className="w-8 h-8 text-neutral-400 group-hover:text-white transition-colors" />
    </div>
    
    <div className="relative z-10">
        <h3 className="text-3xl font-bold tracking-tight text-white mb-6 group-hover:text-blue-100 transition-colors">{titleJP}</h3>
        <p className="text-neutral-400 leading-relaxed font-medium text-sm mb-8 group-hover:text-neutral-300 transition-colors">
        {description}
        </p>
        
        <div className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
        詳細を見る <MoveUpRight className="w-4 h-4" />
        </div>
    </div>
  </button>
);

/**
 * Component: Contact Form
 */
const ContactForm = ({ onBack }) => {
  const handleSubmit = (e) => {
    if (!FORMSPREE_ENDPOINT) {
      e.preventDefault();
      alert("【エラー】FormspreeのURLが設定されていません。コード内のFORMSPREE_ENDPOINTにURLを設定してください。");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 md:px-12 pb-12 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-8 font-bold text-sm">
          <ArrowLeft className="w-4 h-4" />
          ホームに戻る
        </button>
        
        <div className="mb-10 border-b border-neutral-800 pb-8">
          <h2 className="text-4xl font-bold tracking-tighter mb-4 text-white">お問い合わせ</h2>
          <p className="text-neutral-400">以下のフォームに必要事項をご入力ください。<br />ご入力いただいた内容は、直接担当者へ送信されます。</p>
        </div>

        <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-300">会社名・組織名 <span className="text-blue-500">*</span></label>
              <input required name="company" type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-white placeholder-neutral-600" placeholder="株式会社TRANZIA" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-300">お名前 <span className="text-blue-500">*</span></label>
              <input required name="name" type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-white placeholder-neutral-600" placeholder="山田 太郎" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-300">フリガナ <span className="text-blue-500">*</span></label>
              <input required name="furigana" type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-white placeholder-neutral-600" placeholder="ヤマダ タロウ" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-300">電話番号 <span className="text-blue-500">*</span></label>
              <input required name="phone" type="tel" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-white placeholder-neutral-600" placeholder="03-1234-5678" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-300">メールアドレス <span className="text-blue-500">*</span></label>
            <input required name="email" type="email" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-white placeholder-neutral-600" placeholder="example@tranzia.jp" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-300">ご相談内容 <span className="text-blue-500">*</span></label>
            <textarea required name="message" rows="5" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-white placeholder-neutral-600" placeholder="SNS運用の料金プランについて詳しく聞きたい..." />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-5 rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 border border-blue-500/20 hover:scale-[1.01]">
            送信する
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState('home'); 

  // 修正点: 任意のID位置へスクロール付きで遷移する関数
  const transitionTo = (viewName, targetId) => {
    setCurrentView(viewName);
    setTimeout(() => {
      if (targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100); // 描画待ち
  };

  // Navigation Logic
  const handleNavClick = (sectionId) => {
    if (currentView !== 'home') {
      transitionTo('home', sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    document.title = "沖縄のSNS運用代行・ホームページ制作｜TRANZIA";
    const updateMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    updateMeta("description", "沖縄の中小企業・店舗向けにSNS運用代行とホームページ制作を提供。企画・撮影・編集まで一貫対応し、集客と採用を支援します。");
    updateMeta("keywords", "沖縄,SNS運用代行,インスタ運用,ホームページ制作,HP制作,集客,TRANZIA,トランジア,格安HP");
    updateMeta("robots", "index, follow");
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const snsFeatures = [
    "企画・撮影・編集まで一貫対応",
    "アカウント設計・プロフィール最適化",
    "競合分析・ターゲット戦略策定",
    "月8本のショート動画制作",
    "月4本のフィード投稿",
    "基本的なハッシュタグ選定",
    "チャットサポート"
  ];

  const webFeatures = [
    "いつでも解約OK（期間縛りなし）",
    "テンプレート未使用のオリジナルデザイン",
    "最短3日でのスピード納品",
    "スマホ対応レスポンシブデザイン",
    "サーバー・独自ドメイン管理込み",
    "月1回のテキスト・画像修正or更新",
    "お問い合わせフォーム実装",
    "SEO対策",
    "SSLセキュリティ対応",
    "営業カレンダー配置",
    "各種SNS連携",
    "Googleマップ連携"
  ];

  // Return Contact Form
  if (currentView === 'contact') {
    return <ContactForm onBack={() => transitionTo('home', 'top')} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 selection:text-blue-200 antialiased overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center border-b border-transparent ${scrolled ? 'bg-[#050505]/95 backdrop-blur-md border-neutral-800' : ''}`}>
        <span className="text-xl font-bold tracking-tighter flex items-center gap-1 cursor-pointer text-white" onClick={() => transitionTo('home', 'top')}>
          TRANZIA<span className="text-blue-600">.</span>
        </span>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wider">
            <button onClick={() => handleNavClick('vision')} className="text-neutral-400 hover:text-white transition-colors">VISION</button>
            <button onClick={() => handleNavClick('services')} className="text-neutral-400 hover:text-white transition-colors">SERVICES</button>
            <button onClick={() => handleNavClick('sns-links')} className="text-neutral-400 hover:text-white transition-colors">SNS</button>
        </div>

        <button 
          onClick={() => transitionTo('contact', 'top')}
          className="flex items-center gap-2 text-xs md:text-sm font-bold bg-blue-600 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40 hover:-translate-y-0.5 hover:shadow-blue-600/30"
        >
          <span>無料相談を予約する</span>
          <MoveUpRight className="w-3 h-3" />
        </button>
      </nav>

      {/* Hero Section (Common) */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden">
        <h1 style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
          沖縄のSNS運用代行・ホームページ制作｜TRANZIA
        </h1>

        <div className="absolute inset-0 z-0">
            <video 
                autoPlay
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
            >
                <source src="https://videos.pexels.com/video-files/3121459/3121459-uhd_2560_1440_24fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10">
            <FadeIn>
            <h1 className="text-[10vw] md:text-[8vw] leading-[1.1] font-bold tracking-tighter text-white mb-10">
                沖縄の事業成長を、<br />
                デジタル戦略で<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">加速させる。</span>
            </h1>
            </FadeIn>
            
            <FadeIn delay={200}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-neutral-700 pt-10 max-w-6xl">
                <p className="text-neutral-300 max-w-xl text-lg leading-relaxed font-medium">
                「いいモノを作れば売れる」時代は終わりました。<br />
                どんなに良いサービスも、知られなければ「ない」のと同じです。<br />
                <span className="text-white font-bold border-b border-blue-600 pb-0.5">デジタル戦略で認知を広げ、御社を「選ばれる」企業へと変革します。</span>
                </p>
            </div>
            </FadeIn>
        </div>
      </section>

      {/* ================================================================
        HOME VIEW: Vision & Service Selection 
        ================================================================
      */}
      {currentView === 'home' && (
        <>
            {/* Vision & Mission Section */}
            <section id="vision" className="px-6 md:px-12 py-32 bg-[#050505]">
                <FadeIn>
                    <div className="max-w-4xl mx-auto space-y-32">
                        {/* Vision */}
                        <div className="text-center relative">
                            <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-sm mb-6 block">Our Vision</span>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight mb-8">
                                デジタルの力で、<br />
                                沖縄の可能性を解き放つ。
                            </h2>
                            <div className="w-20 h-1 bg-blue-900 mx-auto mb-8"></div>
                            <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl mx-auto">
                                沖縄には、世界に誇れる魅力的な企業やサービスが溢れています。<br />
                                しかし、その価値が「伝わっていない」だけで埋もれてしまう現状があります。<br />
                                私たちはデジタルの力を駆使し、その壁を取り払います。
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="text-center relative">
                            <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-sm mb-6 block">Our Mission</span>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight mb-8">
                                「選ばれる」必然を創る。
                            </h2>
                            <div className="w-20 h-1 bg-blue-900 mx-auto mb-8"></div>
                            <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl mx-auto">
                                単なる代行業者ではありません。<br />
                                AIと共存した徹底的な分析と圧倒的なクリエイティブで、<br />
                                御社のブランド価値を最大化し、顧客から選ばれ続ける仕組みを構築します。
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* Services Section */}
            <section id="services" className="px-6 md:px-12 py-32 bg-[#0a0a0a]">
            <FadeIn>
                <div className="mb-20 text-center">
                <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">Our Services</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                    サービス一覧
                </h2>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <FadeIn delay={0}>
                <ServiceCard 
                    icon={TrendingUp}
                    titleJP="SNS運用代行"
                    description="InstagramやTikTokを活用したSNS運用代行。企画から撮影・編集・分析まで一気通貫でサポートし、認知拡大と採用強化を実現します。"
                    onClick={() => transitionTo('sns', 'sns-detail-start')}
                />
                </FadeIn>
                <FadeIn delay={200}>
                <ServiceCard 
                    icon={Monitor}
                    titleJP="格安ホームページ制作"
                    description="初期費用0円、月額1万円のサブスクリプション型ホームページ制作。最短1週間で納品し、サーバー管理から更新まで全てお任せいただけます。"
                    onClick={() => transitionTo('web', 'web-detail-start')}
                />
                </FadeIn>
            </div>
            </section>
        </>
      )}

      {/* ================================================================
        SNS VIEW: Details 
        ================================================================
      */}
      {currentView === 'sns' && (
        <div className="animate-fade-in">
          
          {/* Back Button (Top) */}
          <div className="bg-[#050505] px-6 md:px-12 py-8 sticky top-20 z-40 border-b border-neutral-900">
             <button onClick={() => transitionTo('home', 'services')} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors font-bold text-sm">
                <ArrowLeft className="w-4 h-4" />
                サービス一覧に戻る
             </button>
          </div>

          {/* Why SNS? (Grid Layout) */}
          <section id="sns-detail-start" className="px-6 md:px-12 py-32 bg-[#050505]">
            <FadeIn>
              <div className="mb-20 max-w-4xl">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-6 h-6 text-blue-500" />
                  <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">SNS Operation</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-white">
                  Why Now? <span className="text-neutral-500">企業の生存戦略として</span>
                </h2>
                <p className="text-neutral-400 text-lg font-medium">
                  技術や品質だけでは差別化できない今、<br />
                  SNSを持たないことは「機会損失」ではなく「リスク」そのものです。
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
              <FadeIn delay={0}>
                <ReasonCard
                  icon={Users}
                  title="求人費用の削減・採用強化"
                  description="今の求職者は、HPよりも先にSNSを見ます。働く人の顔が見えない企業は選択肢に入りません。SNSはコストをかけず、熱量の高い人材を引き寄せる最強の採用ツールになります。"
                />
              </FadeIn>
              <FadeIn delay={100}>
                <ReasonCard
                  icon={ShieldCheck}
                  title="信頼と透明性の証明"
                  description="更新の止まったHPは、逆に不信感を与えます。リアルタイムに動いているSNSこそが「今、活動している」という証明になり、顧客や取引先への信頼構築に直結します。"
                />
              </FadeIn>
              <FadeIn delay={200}>
                <ReasonCard
                  icon={TrendingUp}
                  title="脱・下請け体質"
                  description="認知が広がれば、仕事は「待つ」ものから「選ぶ」ものへ。元請け企業やエンドユーザーからの直接指名を増やし、利益率の高い案件を獲得できる体質へ改善します。"
                />
              </FadeIn>
              <FadeIn delay={300}>
                <ReasonCard
                  icon={Layers}
                  title="広告は消費、SNSは資産"
                  description="広告費を止めれば集客も止まりますが、SNSで積み上げたフォロワーとコンテンツは消えません。将来にわたって集客し続ける、御社だけの「資産」となります。"
                />
              </FadeIn>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="px-6 md:px-12 py-32 bg-[#0a0a0a]" id="pricing">
            <FadeIn>
              <div className="mb-24 border-b border-neutral-800 pb-10">
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 text-white">
                  SNS Plans
                </h2>
                <p className="text-neutral-400 text-lg font-medium">
                  契約期間に応じて最適化された3つの戦略フェーズ。
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
              
              <FadeIn delay={0} className="h-full">
                <PricingCard 
                  tier="Trial"
                  levelJP="短期検証・導入"
                  title="Trial"
                  price="300,000"
                  period="1ヶ月（単月）"
                  description="単月契約でリスクを最小化。運用フローの確認と、市場の初期反応をテストするフェーズ。"
                  features={snsFeatures}
                />
              </FadeIn>

              <FadeIn delay={200} className="h-full">
                <PricingCard 
                  tier="Core"
                  levelJP="基盤構築・定着"
                  title="Core"
                  price="250,000"
                  period="最低3ヶ月"
                  description="Trialより本格的、Standardへの足がかりとなる中間プラン。数字が動き始める3ヶ月間で確実な運用基盤を築きます。"
                  features={snsFeatures}
                />
              </FadeIn>

              <FadeIn delay={400} className="h-full">
                <PricingCard 
                  tier="Standard"
                  levelJP="資産化・成果最大化"
                  title="Standard"
                  price="200,000"
                  period="最低6ヶ月"
                  description="最も推奨される本命プラン。十分な期間をかけて分析と改善を繰り返し、投資対効果（ROI）を最大化します。"
                  isHighlight={true}
                  features={snsFeatures}
                />
              </FadeIn>
            </div>
            <p className="text-center text-neutral-500 text-xs mt-12 font-medium">
              ※すべての価格は税別表記です。別途消費税がかかります。
            </p>
            
            <div className="mt-20 text-center">
              <button onClick={() => transitionTo('home', 'services')} className="text-neutral-500 hover:text-white transition-colors underline underline-offset-4">
                サービス一覧に戻る
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ================================================================
        WEB VIEW: Details (New Service)
        ================================================================
      */}
      {currentView === 'web' && (
        <div className="animate-fade-in">
           {/* Back Button (Top) */}
           <div className="bg-[#050505] px-6 md:px-12 py-8 sticky top-20 z-40 border-b border-neutral-900">
             <button onClick={() => transitionTo('home', 'services')} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors font-bold text-sm">
                <ArrowLeft className="w-4 h-4" />
                サービス一覧に戻る
             </button>
          </div>

           {/* Why Web? */}
           <section id="web-detail-start" className="px-6 md:px-12 py-32 bg-[#050505]">
            <FadeIn>
              <div className="mb-20 max-w-4xl">
                <div className="flex items-center gap-2 mb-4">
                  <Monitor className="w-6 h-6 text-blue-500" />
                  <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Web Production</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-white">
                  Subscription <span className="text-neutral-500">Model</span>
                </h2>
                <p className="text-neutral-400 text-lg font-medium">
                  「ホームページは高い」「作るのに時間がかかる」という常識を覆す。<br />
                  初期費用ゼロ、月額1万円のサブスクリプション型Web制作。
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
              <FadeIn delay={0}>
                <ReasonCard
                  icon={Code}
                  title="初期費用0円"
                  description="制作会社に支払う数十万〜数百万円の初期費用は不要です。リスクなしで、プロフェッショナルな品質のホームページを持てます。"
                />
              </FadeIn>
              <FadeIn delay={100}>
                <ReasonCard
                  icon={Target}
                  title="信頼・ブランディング"
                  description="Web上の名刺として機能し、取引先や顧客への信頼性を担保。ホームページがないことによる機会損失（取りこぼし）をゼロにします。"
                />
              </FadeIn>
              <FadeIn delay={200}>
                <ReasonCard
                  icon={Flag}
                  title="いつでも解約OK"
                  description="「最低◯年契約」といった期間の縛りは一切ありません。いつでも解約可能なので、安心してスタートできます。"
                />
              </FadeIn>
              <FadeIn delay={300}>
                <ReasonCard
                  icon={ShieldCheck}
                  title="完全保守管理"
                  description="サーバー管理、ドメイン更新、セキュリティ対策、月1回の修正まで全て月額費用に含まれています。"
                />
              </FadeIn>
            </div>
          </section>

          {/* Web Pricing Section */}
          <section className="px-6 md:px-12 py-32 bg-[#0a0a0a]" id="pricing">
            <FadeIn>
              <div className="mb-24 border-b border-neutral-800 pb-10">
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 text-white">
                  Web Plan
                </h2>
                <p className="text-neutral-400 text-lg font-medium">
                  シンプルで分かりやすい、ワンプラン。
                </p>
              </div>
            </FadeIn>

            <div className="max-w-md mx-auto">
              <FadeIn delay={0} className="h-full">
                <PricingCard 
                  tier="Subscription"
                  levelJP="格安ホームページ制作"
                  title="Web Start"
                  price="10,000"
                  period="縛りなし"
                  description="初期費用0円、月額1万円で始めるホームページ制作。サーバー・ドメイン・保守管理まで全てコミコミの安心プラン。"
                  features={webFeatures}
                  isHighlight={true}
                  isWebPlan={true}
                />
              </FadeIn>
            </div>
            
            <p className="text-center text-neutral-500 text-xs mt-12 font-medium">
              ※すべての価格は税別表記です。別途消費税がかかります。<br />
              ※解約は1ヶ月前申告でいつでも可能です。
            </p>

            <div className="mt-20 text-center">
              <button onClick={() => transitionTo('home', 'services')} className="text-neutral-500 hover:text-white transition-colors underline underline-offset-4">
                サービス一覧に戻る
              </button>
            </div>
          </section>
        </div>
      )}

      {/* SNS Links Section (Common) */}
      <section id="sns-links" className="px-6 md:px-12 py-24 bg-[#050505] border-t border-neutral-900">
        <FadeIn>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="mb-8 md:mb-0 md:w-1/3">
                <h2 className="text-3xl font-bold tracking-tighter mb-3 text-white">Official SNS</h2>
                <p className="text-neutral-500 text-sm">最新情報や実績をチェック</p>
              </div>
              <div className="flex gap-6 md:w-1/2 justify-start md:justify-end">
                <a href="https://www.instagram.com/itachi_okinawa/" target="_blank" rel="noopener noreferrer" className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl w-40 h-40 flex flex-col items-center justify-center p-6 transition-all hover:border-neutral-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-900/20">
                  <Instagram className="w-10 h-10 text-neutral-400 group-hover:text-pink-500 transition-colors mb-4" />
                  <span className="text-sm font-bold text-neutral-300 group-hover:text-white">Instagram</span>
                </a>
                <a href="https://x.com/IbukiKubot33" target="_blank" rel="noopener noreferrer" className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl w-40 h-40 flex flex-col items-center justify-center p-6 transition-all hover:border-neutral-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10">
                  <XIcon className="w-10 h-10 text-neutral-400 group-hover:text-white transition-colors mb-4" />
                  <span className="text-sm font-bold text-neutral-300 group-hover:text-white">X (Twitter)</span>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer (Common) */}
      <footer className="px-6 md:px-12 pt-24 pb-12 border-t border-neutral-900 bg-[#050505]">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-8 text-white">
                TRANZIA<br />
                <span className="text-blue-600">Your Partner.</span>
              </h2>
              <p className="text-neutral-400 font-medium mb-8">
                まずは現在の課題をお聞かせください。<br />
                最適なプランと戦略を、オーダーメイドでご提案します。
              </p>
              <button 
                onClick={() => transitionTo('contact', 'top')}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-12 py-5 rounded-full font-bold text-lg tracking-wide hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/30 hover:-translate-y-1"
              >
                無料相談を予約する
                <MoveUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-neutral-600 text-sm font-bold tracking-wider">© 2025 TRANZIA Inc.</span>
          </div>
        </FadeIn>
      </footer>
    </div>
  );
}