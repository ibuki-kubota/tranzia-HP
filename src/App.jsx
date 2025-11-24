import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, ShieldCheck, Check, MoveUpRight, AlertCircle, Layers, Instagram, ArrowLeft, Send } from 'lucide-react';

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
 * Component: Pricing Card (Dark Mode Optimized)
 */
const PricingCard = ({ tier, levelJP, price, period, title, description, features, isHighlight = false }) => (
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
      
      <h3 className="text-4xl font-bold mb-2 tracking-tight text-white">{title}</h3>
      <p className="text-sm font-bold mb-6 text-neutral-400">
        {levelJP}
      </p>
      
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-bold tracking-tight text-white">
          ¥{price}
        </span>
        <span className="text-sm text-neutral-500">/月 (税別)</span>
      </div>

      {/* Contract Period Highlight */}
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
      
      {/* Common Features - Uniform Design */}
      <div className="mt-auto">
        <div className="mb-4 text-[10px] font-bold text-neutral-600 uppercase tracking-widest border-b border-neutral-800 pb-2">
            All Plans Include
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
 * Component: Feature/Reason Card (Dark Mode)
 */
const ReasonCard = ({ icon: Icon, title, subTitle, description }) => (
  <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-10 h-full flex flex-col hover:border-neutral-600 hover:bg-neutral-800 transition-all duration-500 group">
    <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-all duration-500">
      <Icon className="w-6 h-6 text-neutral-400 group-hover:text-black transition-colors" />
    </div>
    <div className="mb-4">
      <h3 className="text-2xl font-bold tracking-tight text-white mb-2">{title}</h3>
      <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider group-hover:text-blue-400 transition-colors">{subTitle}</p>
    </div>
    <p className="text-neutral-400 leading-relaxed font-medium text-sm mt-auto group-hover:text-neutral-300 transition-colors">
      {description}
    </p>
  </div>
);

/**
 * Component: Contact Form (Dark Mode / Formspree Integrated)
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
          <h2 className="text-4xl font-bold tracking-tighter mb-4 text-white">Contact Us</h2>
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
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'contact'

  /**
   * SEO Implementation (Modification 1)
   * App mounts -> Set document title and inject meta tags
   */
  useEffect(() => {
    // 1. Set Title
    document.title = "沖縄のSNS運用代行｜TRANZIA（トランジア）";

    // 2. Helper function to create/update meta tags
    const updateMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // 3. Set Meta Description & Keywords
    updateMeta("description", "沖縄の企業向けにSNS運用代行・Instagram動画制作・SNS戦略設計を提供。企画から撮影・編集まで一貫対応し、集客と採用を支援します。");
    updateMeta("keywords", "沖縄, SNS運用代行, インスタ運用, 動画制作, 集客, 採用, TRANZIA");

  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const commonFeatures = [
    "企画・撮影・編集まで一貫対応",
    "アカウント設計・プロフィール最適化",
    "競合分析・ターゲット戦略策定",
    "月8本のショート動画制作",
    "月4本のフィード投稿",
    "基本的なハッシュタグ選定",
    "チャットサポート"
  ];

  // Render Contact Form if view is 'contact'
  if (currentView === 'contact') {
    return <ContactForm onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 selection:text-blue-200 antialiased overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center border-b border-transparent ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-neutral-800' : ''}`}>
        <span className="text-xl font-bold tracking-tighter flex items-center gap-1 cursor-pointer text-white" onClick={() => window.scrollTo(0, 0)}>
          TRANZIA<span className="text-blue-600">.</span>
        </span>
        <button 
          onClick={() => setCurrentView('contact')}
          className="hidden md:flex items-center gap-2 text-sm font-bold bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40 hover:-translate-y-0.5 hover:shadow-blue-600/30"
        >
          <span>無料相談を予約する</span>
          <MoveUpRight className="w-3 h-3" />
        </button>
      </nav>

      {/* Hero Section with LUXURY Video Background */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
            >
                {/* High-end modern architecture / night city lights */}
                <source src="https://videos.pexels.com/video-files/3121459/3121459-uhd_2560_1440_24fps.mp4" type="video/mp4" />
            </video>
            {/* Black Overlay for Premium Feel & Readability */}
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10">
            <FadeIn>
            {/* Modification 2: Hero Copy optimized for Japanese SEO & Impact */}
            <h1 className="text-[10vw] md:text-[8vw] leading-[1.1] font-bold tracking-tighter text-white mb-10">
                沖縄の集客を、<br />
                SNSで<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">変革する。</span>
            </h1>
            </FadeIn>
            
            <FadeIn delay={200}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-neutral-700 pt-10 max-w-6xl">
                <p className="text-neutral-300 max-w-xl text-lg leading-relaxed font-medium">
                「いいモノを作れば売れる」時代は終わりました。<br />
                どんなに良いサービスも、知られなければ「ない」のと同じです。<br />
                <span className="text-white font-bold border-b border-blue-600 pb-0.5">SNSで認知を広げ、御社を「選ばれる」企業へと変革します。</span>
                </p>
            </div>
            </FadeIn>
        </div>
      </section>

      {/* Why SNS? (Grid Layout) */}
      <section className="px-6 md:px-12 py-32 bg-[#050505]">
        <FadeIn>
          <div className="mb-20 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-blue-500" />
              <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Critical Issue</span>
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
              subTitle="Recruiting"
              description="今の求職者は、HPよりも先にSNSを見ます。働く人の顔が見えない企業は選択肢に入りません。SNSはコストをかけず、熱量の高い人材を引き寄せる最強の採用ツールになります。"
            />
          </FadeIn>
          <FadeIn delay={100}>
            <ReasonCard
              icon={ShieldCheck}
              title="信頼と透明性の証明"
              subTitle="Trust & Transparency"
              description="更新の止まったHPは、逆に不信感を与えます。リアルタイムに動いているSNSこそが「今、活動している」という証明になり、顧客や取引先への信頼構築に直結します。"
            />
          </FadeIn>
          <FadeIn delay={200}>
            <ReasonCard
              icon={TrendingUp}
              title="脱・下請け体質"
              subTitle="Direct Business"
              description="認知が広がれば、仕事は「待つ」ものから「選ぶ」ものへ。元請け企業やエンドユーザーからの直接指名を増やし、利益率の高い案件を獲得できる体質へ改善します。"
            />
          </FadeIn>
          <FadeIn delay={300}>
            <ReasonCard
              icon={Layers}
              title="広告は消費、SNSは資産"
              subTitle="Stock Asset"
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
              Plans
            </h2>
            <p className="text-neutral-400 text-lg font-medium">
              契約期間に応じて最適化された3つの戦略フェーズ。
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          
          {/* Plan 1: Trial */}
          <FadeIn delay={0} className="h-full">
            <PricingCard 
              tier="Trial"
              levelJP="短期検証・導入"
              title="Trial"
              price="300,000"
              period="1ヶ月（単月）"
              description="単月契約でリスクを最小化。運用フローの確認と、市場の初期反応をテストするフェーズ。"
              features={commonFeatures}
            />
          </FadeIn>

          {/* Plan 2: Core */}
          <FadeIn delay={200} className="h-full">
            <PricingCard 
              tier="Core"
              levelJP="基盤構築・定着"
              title="Core"
              price="250,000"
              period="最低3ヶ月"
              description="Trialより本格的、Standardへの足がかりとなる中間プラン。数字が動き始める3ヶ月間で確実な基盤を築きます。"
              features={commonFeatures}
            />
          </FadeIn>

          {/* Plan 3: Standard (Recommended) */}
          <FadeIn delay={400} className="h-full">
            <PricingCard 
              tier="Standard"
              levelJP="資産化・成果最大化"
              title="Standard"
              price="200,000"
              period="最低6ヶ月"
              description="最も推奨される本命プラン。十分な期間をかけて分析と改善を繰り返し、投資対効果（ROI）を最大化します。"
              isHighlight={true}
              features={commonFeatures}
            />
          </FadeIn>
        </div>
        <p className="text-center text-neutral-500 text-xs mt-12 font-medium">
          ※すべての価格は税別表記です。別途消費税がかかります。
        </p>
      </section>

      {/* SNS Links Section (Refined - Smaller & Elegant) */}
      <section className="px-6 md:px-12 py-24 bg-[#050505] border-t border-neutral-900">
        <FadeIn>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              
              <div className="mb-8 md:mb-0 md:w-1/3">
                <h2 className="text-3xl font-bold tracking-tighter mb-3 text-white">Official SNS</h2>
                <p className="text-neutral-500 text-sm">最新情報や実績をチェック</p>
              </div>
              
              <div className="flex gap-6 md:w-1/2 justify-start md:justify-end">
                {/* Instagram - Smaller Size */}
                <a href="https://www.instagram.com/itachi_okinawa/" target="_blank" rel="noopener noreferrer" className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl w-40 h-40 flex flex-col items-center justify-center p-6 transition-all hover:border-neutral-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-900/20">
                  <Instagram className="w-10 h-10 text-neutral-400 group-hover:text-pink-500 transition-colors mb-4" />
                  <span className="text-sm font-bold text-neutral-300 group-hover:text-white">Instagram</span>
                </a>

                {/* X (Twitter) - Smaller Size */}
                <a href="https://x.com/IbukiKubot33" target="_blank" rel="noopener noreferrer" className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl w-40 h-40 flex flex-col items-center justify-center p-6 transition-all hover:border-neutral-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10">
                  <XIcon className="w-10 h-10 text-neutral-400 group-hover:text-white transition-colors mb-4" />
                  <span className="text-sm font-bold text-neutral-300 group-hover:text-white">X (Twitter)</span>
                </a>
              </div>

            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer Statement & Contact Trigger */}
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
                onClick={() => setCurrentView('contact')}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-12 py-5 rounded-full font-bold text-lg tracking-wide hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/30 hover:-translate-y-1"
              >
                無料相談を予約する
                <MoveUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-neutral-600 text-sm font-bold tracking-wider">© 2025 TRANZIA Inc.</span>
          </div>
        </FadeIn>
      </footer>
    </div>
  );
}