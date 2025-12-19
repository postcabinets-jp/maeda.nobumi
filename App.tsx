import React, { useState } from 'react';
import { 
  ArrowRight, 
  Map, 
  Clock, 
  Users, 
  CheckCircle2, 
  MessageSquare, 
  ChevronDown, 
  Send,
  Loader2,
  Menu,
  X,
  Target,
  Quote
} from 'lucide-react';
import { generateSampleRoadmap } from './services/geminiService';
import { RoadmapResponse, LoadingState } from './types';

// --- Sub-components ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            {/* Logo Icon - Friendly Blue */}
            <div className="bg-blue-700 text-white p-1.5 rounded-full">
              <Target size={20} />
            </div>
            <span className="font-bold text-lg tracking-wide text-slate-800 serif">
              前田 将臣
              <span className="text-slate-500 text-xs sm:text-sm font-normal ml-2 block sm:inline">大阪府議会議員</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => scrollTo('about')} className="text-slate-600 hover:text-blue-700 text-sm font-medium transition">想い・プロフィール</button>
            <button onClick={() => scrollTo('features')} className="text-slate-600 hover:text-blue-700 text-sm font-medium transition">特徴</button>
            <button onClick={() => scrollTo('process')} className="text-slate-600 hover:text-blue-700 text-sm font-medium transition">流れ</button>
            <button onClick={() => scrollTo('contact')} className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition shadow-md hover:shadow-lg">
              相談を予約する
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => scrollTo('about')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-md">想い・プロフィール</button>
            <button onClick={() => scrollTo('features')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-md">特徴</button>
            <button onClick={() => scrollTo('process')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-md">相談の流れ</button>
            <button onClick={() => scrollTo('contact')} className="block w-full mt-4 bg-orange-500 text-white px-3 py-3 rounded-md text-base font-medium text-center">相談を予約する</button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Decorative blobs - warmer colors */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-[1.2] serif">
              そのモヤモヤ、<br />
              <span className="relative inline-block">
                30分
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300/60 -z-10 transform -rotate-1"></span>
              </span>
              で「地図」に変える。
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              ビジネスやキャリアの悩み、誰にも言えない本音。<br />
              大阪府議会議員・前田将臣が、利害関係なく、フラットにあなたの話を聞きます。<br />
              <span className="text-slate-500">政治活動の一環として、無料で相談を受け付けています。</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                className="inline-flex justify-center items-center px-8 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 group"
              >
                まずは相談する（無料）
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
                className="inline-flex justify-center items-center px-8 py-4 bg-white text-blue-900 border border-blue-100 font-medium rounded-lg hover:bg-blue-50 transition"
              >
                AIロードマップを試す
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] md:aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/hero-image.jpg" 
                alt="前田将臣" 
                className="w-full h-full object-contain bg-slate-50"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            {/* Decorative Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">即、行動できる</p>
                  <p className="text-xs text-slate-500">明日からの景色が変わります</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Problem = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 serif">こんな「悩み」ありませんか？</h2>
          <div className="w-16 h-1 bg-orange-400 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: Clock, 
              title: "将来への漠然とした不安", 
              text: "このままでいいのか、どこから手をつければいいのか。答えのない問いに、一人で向き合っていませんか？" 
            },
            { 
              icon: Map, 
              title: "次のステージが見えない", 
              text: "仕事も家庭も大切にしながら、自分自身の成長や挑戦も諦めたくない。そんな想いを抱えていませんか？" 
            },
            { 
              icon: Users, 
              title: "本音で話せる人がいない", 
              text: "職場や家族には言いにくい悩みがある。利害関係のない、純粋にあなたの立場に立った相談相手が欲しい。" 
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-normal">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Solution = () => {
  return (
    <section id="features" className="py-24 bg-blue-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 serif leading-tight">
              政治家の視点。<br />
              生活者の目線。
            </h2>
            <p className="text-blue-200 text-lg mb-8 leading-relaxed">
              政治家への相談と聞くと、少しハードルが高く感じるかもしれません。<br />
              しかし、私の仕事は現場を歩き、一人ひとりの声に耳を傾けることです。<br />
              広い視野（マクロ）と、日々の生活から見える実感（ミクロ）。この両方の視点で、あなたの悩みに向き合います。
            </p>
            <ul className="space-y-6">
              {[
                { title: "行政・支援制度の知識", text: "知られていない補助金や支援サービスなど、あなたが使えるリソースを一緒に見つけます。" },
                { title: "完全中立な壁打ち相手", text: "商品を売りつけたりしません。あなたの利益だけを考えた、純粋な作戦会議です。" },
                { title: "30分でロードマップ完成", text: "「話してスッキリした」で終わらせません。明日からの具体的な行動計画を作成します。" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1">{item.title}</h4>
                    <p className="text-blue-200 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Map className="text-orange-400" size={20} />
                </div>
                <div>
                  <div className="text-xs text-blue-200 uppercase tracking-wider">Output Image</div>
                  <div className="font-bold text-lg">解決へのロードマップ</div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 text-center pt-1">
                    <span className="text-blue-300 font-mono text-sm">01</span>
                    <div className="h-full w-px bg-white/10 mx-auto mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <h5 className="font-bold text-orange-400 mb-1">現状の整理</h5>
                    <p className="text-sm text-blue-100">何がボトルネックになっているのか、客観的に分析します。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 text-center pt-1">
                    <span className="text-blue-300 font-mono text-sm">02</span>
                    <div className="h-full w-px bg-white/10 mx-auto mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <h5 className="font-bold text-orange-400 mb-1">武器の再発見</h5>
                    <p className="text-sm text-blue-100">あなた自身も気づいていない強みや、活用できる外部環境を見つけます。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 text-center pt-1">
                    <span className="text-blue-300 font-mono text-sm">03</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-orange-400 mb-1">アクションプラン</h5>
                    <p className="text-sm text-blue-100">「いつまでに」「何をするか」。具体的な第一歩を決めます。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- The Interactive Gemini Demo Section ---
const DemoAI = () => {
  const [input, setInput] = useState('');
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(LoadingState.LOADING);
    setRoadmap(null);

    try {
      const result = await generateSampleRoadmap(input);
      setRoadmap(result);
      setLoading(LoadingState.SUCCESS);
    } catch (error) {
      setLoading(LoadingState.ERROR);
    }
  };

  return (
    <section id="demo" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-blue-600 font-bold tracking-wider text-xs uppercase mb-2 block">AI Experience</span>
          <h2 className="text-3xl font-bold text-slate-900 serif mb-4">AIお試しロードマップ作成</h2>
          <p className="text-slate-600">
            どんな相談ができるのかイメージがつかない方へ。<br />
            私の思考プロセス（ペルソナ）を学習したAIが、簡易的なアドバイスを行います。<br />
            <span className="text-sm text-slate-500">※実際の相談では、より深く個別の事情に寄り添います。</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-200">
          <form onSubmit={handleSubmit} className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">今、何に一番悩んでいますか？</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="例：新しい事業を始めたいが、資金調達の方法が分からない"
                className="flex-1 rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                disabled={loading === LoadingState.LOADING}
              />
              <button 
                type="submit" 
                disabled={loading === LoadingState.LOADING || !input.trim()}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === LoadingState.LOADING ? <Loader2 className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
          </form>

          {loading === LoadingState.LOADING && (
            <div className="py-12 text-center">
              <Loader2 className="animate-spin w-8 h-8 text-blue-600 mx-auto mb-4" />
              <p className="text-slate-500 animate-pulse">前田将臣（AI）が思考中...</p>
            </div>
          )}

          {loading === LoadingState.ERROR && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center">
              すみません、エラーが発生しました。もう一度お試しください。
            </div>
          )}

          {loading === LoadingState.SUCCESS && roadmap && (
            <div className="animate-fade-in space-y-6">
              <div className="p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                   <div className="bg-blue-600 text-white p-1 rounded-full"><Quote size={12}/></div>
                   <p className="font-bold text-blue-900 text-sm">前田将臣からのメッセージ</p>
                </div>
                <p className="text-blue-900 leading-relaxed font-medium">{roadmap.summary}</p>
              </div>

              <div className="space-y-4">
                {roadmap.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5 shadow-md">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1 text-lg">{step.title}</h4>
                      <p className="text-slate-600 mb-3 leading-relaxed">{step.description}</p>
                      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-sm font-bold">
                        <Target size={14} />
                        まずはこれ：{step.actionItem}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500 mb-4">AIのアドバイスはいかがでしたか？<br/>より具体的な実行支援が必要なら、ぜひ直接お話ししましょう。</p>
                <button 
                   onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                   className="text-orange-600 font-bold hover:underline flex items-center justify-center gap-1 mx-auto text-lg"
                >
                  30分無料相談を予約する <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Profile = () => {
  return (
    <section id="about" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-5/12">
            <div className="sticky top-24">
              <div className="aspect-[3/4] rounded-xl overflow-hidden relative shadow-xl mb-6">
                <img 
                  src="/profile-image.jpg" 
                  alt="前田将臣 プロフィール" 
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.className = 'aspect-[3/4] rounded-xl overflow-hidden relative shadow-xl mb-6 bg-gradient-to-br from-blue-50 to-slate-100';
                  }}
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 serif mb-1">前田 将臣</h2>
                <p className="text-blue-700 font-bold text-lg mb-4">大阪府議会議員</p>
              </div>
            </div>
          </div>
          <div className="md:w-7/12">
            <div className="prose prose-lg text-slate-700 leading-relaxed font-serif">
               <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-snug">
                 創造し、挑戦する。<br/>
                 人生はいつも<span className="text-orange-600 bg-orange-50 px-1">「この瞬間」</span>しか存在しない
               </h3>
               
               <p className="mb-6">
                 挑戦も行動もしなければ、人は今のポジションを<br/>
                 守ることを考え、成長することを意識しなくなります。
               </p>

               <p className="mb-6">
                 これは政治も同じことです。<br/>
                 今を変える挑戦、決断と実行で未来を変えることができると<br/>
                 確信しています。
               </p>

               <p className="mb-6">
                 改革を続けなければ、人も組織も、都市も国も、<br/>
                 徐々に力が弱くなり、いずれは崩れてしまうでしょう。
               </p>

               <div className="bg-orange-50 p-8 rounded-2xl border-l-8 border-orange-400 my-10 shadow-sm">
                 <p className="font-bold text-xl text-slate-900 mb-4">
                   今この瞬間にフォーカスし、<br/>
                   常に挑戦を続け、未来を変革する。
                 </p>
                 <p className="text-slate-800">
                   大阪の未来は、まだまだ変えられます。<br/>
                   皆さんの行動が、必ず未来を変えていきます。<br/>
                   ともに、挑戦と実行を、続けていきましょう。
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="contact" className="py-24 bg-slate-900 text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-white serif mb-6">
          その一歩を、ここから。
        </h2>
        <p className="text-slate-400 mb-10 text-lg">
          まずは気軽な壁打ちから始めましょう。<br/>
          政治活動の一環としての対話・情報発信も兼ねているため、<br className="hidden md:block"/>
          相談費用はいただいておりません。
        </p>
        
        <div className="bg-white rounded-xl p-8 max-w-lg mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-orange-500"></div>
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
            <div className="text-left">
              <div className="text-xs font-bold text-slate-500 uppercase">Consultation</div>
              <div className="text-xl font-bold text-slate-900">オンライン壁打ち</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-500">Free</div>
              <div className="text-xs text-slate-500">30 min / 1 session</div>
            </div>
          </div>
          
          <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-1">
            <MessageSquare size={20} />
            今すぐ日程を調整する
          </button>
          <p className="mt-4 text-xs text-slate-400">
            ※ 外部スケジューリングツールへ移動します。<br/>
            ※ 営業・勧誘目的でのご利用はお控えください。
          </p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 py-12 text-slate-400 text-sm border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-bold text-white text-lg serif mb-1">大阪府議会議員 前田将臣</p>
          <p className="opacity-70">ともに、未来へ。</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">プライバシーポリシー</a>
          <a href="#" className="hover:text-white transition">お問い合わせ</a>
        </div>
        <div className="text-xs text-slate-600">
          &copy; Masaomi Maeda. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <DemoAI />
        <Profile />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;