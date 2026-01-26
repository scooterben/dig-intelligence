'use client';

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Area } from 'recharts';

// ============================================
// SHARED DATA
// ============================================

const indexData = [
  { year: '2015', dig100: 100, sp500: 100, gold: 100, art: 100 },
  { year: '2016', dig100: 108, sp500: 112, gold: 109, art: 101 },
  { year: '2017', dig100: 124, sp500: 134, gold: 113, art: 108 },
  { year: '2018', dig100: 142, sp500: 128, gold: 111, art: 107 },
  { year: '2019', dig100: 168, sp500: 159, gold: 129, art: 112 },
  { year: '2020', dig100: 189, sp500: 175, gold: 154, art: 106 },
  { year: '2021', dig100: 234, sp500: 219, gold: 148, art: 129 },
  { year: '2022', dig100: 256, sp500: 179, gold: 148, art: 117 },
  { year: '2023', dig100: 278, sp500: 201, gold: 161, art: 121 },
  { year: '2024', dig100: 312, sp500: 248, gold: 189, art: 128 },
  { year: '2025', dig100: 347, sp500: 261, gold: 212, art: 134 },
];

const segmentData = [
  { id: 'guitars', segment: 'Artist-Played Guitars', cagr: 14.2, rating: 5, insight: 'Forensic verification driving institutional confidence', index: 467 },
  { id: 'beatles', segment: 'Beatles Signatures', cagr: 12.8, rating: 4, insight: 'Scarcity premium as authentic examples become rarer', index: 412 },
  { id: 'bowie', segment: 'Bowie Stage Costumes', cagr: 11.4, rating: 4, insight: 'Museum demand competing with private collectors', index: 378 },
  { id: 'props', segment: 'Screen-Matched Hero Props', cagr: 14.2, rating: 5, insight: 'Photo-matching technology improving verification', index: 428 },
  { id: 'scripts', segment: 'Scripts & Documents', cagr: 6.2, rating: 2, insight: 'Authentication challenges suppress premiums', index: 198 },
];

const recentSales = [
  { item: 'Darth Vader Screen-Worn Helmet', house: 'Propstore', estimate: '$800K–$1.2M', realized: '$1.85M', premium: '+54%', date: 'Jan 2025' },
  { item: 'Kurt Cobain MTV Unplugged Guitar', house: "Julien's", estimate: '$1M–$1.5M', realized: '$1.9M', premium: '+27%', date: 'Dec 2024' },
  { item: 'Beatles Full Band Signed Photo', house: 'Heritage', estimate: '$150K–$200K', realized: '$312K', premium: '+56%', date: 'Dec 2024' },
  { item: 'Bowie Ziggy Stardust Jumpsuit', house: "Sotheby's", estimate: '$300K–$500K', realized: '$485K', premium: 'In Range', date: 'Nov 2024' },
  { item: 'McFly Hoverboard (BTTF II)', house: 'Heritage', estimate: '$400K–$600K', realized: '$725K', premium: '+21%', date: 'Jan 2025' },
];

// ============================================
// GUITARS DATA
// ============================================

const guitarsPerformance = [
  { year: '2015', guitars: 100, sp500: 100, dig100: 100 },
  { year: '2016', guitars: 112, sp500: 112, dig100: 108 },
  { year: '2017', guitars: 131, sp500: 134, dig100: 124 },
  { year: '2018', guitars: 158, sp500: 128, dig100: 142 },
  { year: '2019', guitars: 198, sp500: 159, dig100: 168 },
  { year: '2020', guitars: 234, sp500: 175, dig100: 189 },
  { year: '2021', guitars: 312, sp500: 219, dig100: 234 },
  { year: '2022', guitars: 356, sp500: 179, dig100: 256 },
  { year: '2023', guitars: 389, sp500: 201, dig100: 278 },
  { year: '2024', guitars: 428, sp500: 248, dig100: 312 },
  { year: '2025', guitars: 467, sp500: 261, dig100: 347 },
];

const guitarsForecast = [
  { year: '2025', base: 467, bull: 467, bear: 467, actual: 467 },
  { year: '2026', base: 519, bull: 556, bear: 445 },
  { year: '2027', base: 577, bull: 662, bear: 423 },
  { year: '2028', base: 641, bull: 788, bear: 401 },
  { year: '2029', base: 712, bull: 938, bear: 381 },
  { year: '2030', base: 791, bull: 1116, bear: 362 },
  { year: '2031', base: 879, bull: 1328, bear: 344 },
  { year: '2032', base: 976, bull: 1580, bear: 327 },
  { year: '2033', base: 1085, bull: 1880, bear: 310 },
  { year: '2034', base: 1205, bull: 2237, bear: 295 },
  { year: '2035', base: 1339, bull: 2662, bear: 280 },
];

const guitarsTransactions = [
  { item: 'Kurt Cobain 1959 Martin D-18E', event: 'MTV Unplugged 1993', house: "Julien's", year: 2020, estimate: '$1M', realized: '$6.01M', premium: '+501%' },
  { item: 'David Gilmour "Black Strat"', event: 'Pink Floyd 1970–1986', house: "Christie's", year: 2019, estimate: '$100K–$150K', realized: '$3.975M', premium: '+2,550%' },
  { item: 'George Harrison 1962 Gibson J-160E', event: 'Beatles 1962–1964', house: "Julien's", year: 2015, estimate: '$200K–$300K', realized: '$2.41M', premium: '+703%' },
  { item: 'Jerry Garcia "Wolf"', event: 'Grateful Dead 1973–1993', house: "Guernsey's", year: 2017, estimate: '$1M+', realized: '$1.9M', premium: '+90%' },
];

const guitarsTiers = [
  { tier: 'Tier 1: Iconic Performance', range: '$2M–$10M+', criteria: 'Definitive cultural moment, video documentation', supply: '<50 globally' },
  { tier: 'Tier 2: Artist-Definitive', range: '$500K–$2M', criteria: 'Tour-primary, album recording guitars', supply: '~200 globally' },
  { tier: 'Tier 3: Artist-Owned', range: '$100K–$500K', criteria: 'Collection pieces, backup guitars', supply: '~1,000 globally' },
  { tier: 'Tier 4: Production/Session', range: '$25K–$100K', criteria: 'Studio session, tour backup inventory', supply: '~5,000 globally' },
];

const guitarsRisks = [
  { factor: 'Generational Relevance', probability: 45, impact: 70 },
  { factor: 'Forgery/Misattribution', probability: 30, impact: 85 },
  { factor: 'Estate Flooding', probability: 35, impact: 50 },
  { factor: 'Economic Downturn', probability: 40, impact: 55 },
];

// ============================================
// BEATLES SIGNATURES DATA
// ============================================

const beatlesPerformance = [
  { year: '2015', beatles: 100, sp500: 100, dig100: 100 },
  { year: '2016', beatles: 109, sp500: 112, dig100: 108 },
  { year: '2017', beatles: 122, sp500: 134, dig100: 124 },
  { year: '2018', beatles: 141, sp500: 128, dig100: 142 },
  { year: '2019', beatles: 168, sp500: 159, dig100: 168 },
  { year: '2020', beatles: 198, sp500: 175, dig100: 189 },
  { year: '2021', beatles: 256, sp500: 219, dig100: 234 },
  { year: '2022', beatles: 298, sp500: 179, dig100: 256 },
  { year: '2023', beatles: 345, sp500: 201, dig100: 278 },
  { year: '2024', beatles: 378, sp500: 248, dig100: 312 },
  { year: '2025', beatles: 412, sp500: 261, dig100: 347 },
];

const beatlesForecast = [
  { year: '2025', base: 412, bull: 412, bear: 412, actual: 412 },
  { year: '2026', base: 453, bull: 486, bear: 391 },
  { year: '2027', base: 498, bull: 573, bear: 367 },
  { year: '2028', base: 548, bull: 676, bear: 341 },
  { year: '2029', base: 603, bull: 797, bear: 314 },
  { year: '2030', base: 663, bull: 940, bear: 286 },
  { year: '2031', base: 729, bull: 1109, bear: 257 },
  { year: '2032', base: 802, bull: 1308, bear: 228 },
  { year: '2033', base: 882, bull: 1543, bear: 199 },
  { year: '2034', base: 970, bull: 1821, bear: 172 },
  { year: '2035', base: 1067, bull: 2148, bear: 148 },
];

const beatlesTransactions = [
  { item: 'Sgt. Pepper Drum Skin (Signed)', event: 'Album Cover 1967', house: "Julien's", year: 2022, estimate: '$400K–$600K', realized: '$1.1M', premium: '+83%' },
  { item: 'Full Band Signed White Album', event: 'Album Release 1968', house: 'Heritage', year: 2023, estimate: '$80K–$120K', realized: '$187K', premium: '+56%' },
  { item: 'John Lennon Signed "Imagine" Lyrics', event: 'Handwritten 1971', house: "Sotheby's", year: 2021, estimate: '$500K–$700K', realized: '$842K', premium: '+20%' },
  { item: 'Beatles Ed Sullivan Contract (Signed)', event: 'First US TV 1964', house: 'Heritage', year: 2020, estimate: '$100K–$150K', realized: '$231K', premium: '+54%' },
];

const beatlesTiers = [
  { tier: 'Tier 1: All Four + Historical', range: '$500K–$2M+', criteria: 'Full band on iconic item (Sgt. Pepper, contracts)', supply: '<100 globally' },
  { tier: 'Tier 2: All Four Standard', range: '$150K–$500K', criteria: 'Full band on albums, photos, documents', supply: '~300 globally' },
  { tier: 'Tier 3: Lennon Solo', range: '$50K–$200K', criteria: 'John Lennon individual signature', supply: '~2,000 globally' },
  { tier: 'Tier 4: Other Individual', range: '$15K–$75K', criteria: 'Paul, George, or Ringo individual', supply: '~5,000+ globally' },
];

const beatlesRisks = [
  { factor: 'Forgery Prevalence', probability: 55, impact: 90 },
  { factor: 'Authentication Disputes', probability: 45, impact: 75 },
  { factor: 'Market Saturation (Fakes)', probability: 40, impact: 70 },
  { factor: 'Generational Shift', probability: 30, impact: 50 },
];

// ============================================
// BOWIE COSTUMES DATA
// ============================================

const bowiePerformance = [
  { year: '2015', bowie: 100, sp500: 100, dig100: 100 },
  { year: '2016', bowie: 118, sp500: 112, dig100: 108 },
  { year: '2017', bowie: 142, sp500: 134, dig100: 124 },
  { year: '2018', bowie: 168, sp500: 128, dig100: 142 },
  { year: '2019', bowie: 198, sp500: 159, dig100: 168 },
  { year: '2020', bowie: 224, sp500: 175, dig100: 189 },
  { year: '2021', bowie: 267, sp500: 219, dig100: 234 },
  { year: '2022', bowie: 298, sp500: 179, dig100: 256 },
  { year: '2023', bowie: 334, sp500: 201, dig100: 278 },
  { year: '2024', bowie: 356, sp500: 248, dig100: 312 },
  { year: '2025', bowie: 378, sp500: 261, dig100: 347 },
];

const bowieForecast = [
  { year: '2025', base: 378, bull: 378, bear: 378, actual: 378 },
  { year: '2026', base: 412, bull: 445, bear: 359 },
  { year: '2027', base: 449, bull: 524, bear: 338 },
  { year: '2028', base: 489, bull: 617, bear: 315 },
  { year: '2029', base: 533, bull: 727, bear: 291 },
  { year: '2030', base: 581, bull: 856, bear: 265 },
  { year: '2031', base: 633, bull: 1009, bear: 239 },
  { year: '2032', base: 690, bull: 1189, bear: 214 },
  { year: '2033', base: 752, bull: 1401, bear: 189 },
  { year: '2034', base: 820, bull: 1651, bear: 165 },
  { year: '2035', base: 894, bull: 1946, bear: 143 },
];

const bowieTransactions = [
  { item: 'Ziggy Stardust "Woodland Creatures" Suit', event: 'Final Ziggy Tour 1973', house: "Sotheby's", year: 2023, estimate: '$400K–$600K', realized: '$892K', premium: '+49%' },
  { item: 'Aladdin Sane Lightning Bolt Bodysuit', event: 'Album Cover/Tour 1973', house: "Christie's", year: 2022, estimate: '$300K–$500K', realized: '$612K', premium: '+22%' },
  { item: 'Thin White Duke Waistcoat', event: 'Station to Station 1976', house: "Julien's", year: 2021, estimate: '$80K–$120K', realized: '$156K', premium: '+30%' },
  { item: 'Labyrinth Jareth Costume', event: 'Film 1986', house: 'Propstore', year: 2023, estimate: '$150K–$250K', realized: '$287K', premium: '+15%' },
];

const bowieTiers = [
  { tier: 'Tier 1: Ziggy Era Iconic', range: '$500K–$1.5M', criteria: 'Kansai Yamamoto designs, photo-documented performances', supply: '<30 globally' },
  { tier: 'Tier 2: Other Persona-Defining', range: '$150K–$500K', criteria: 'Aladdin Sane, Thin White Duke, major tour pieces', supply: '~100 globally' },
  { tier: 'Tier 3: Film & Video', range: '$75K–$200K', criteria: 'Labyrinth, music video costumes', supply: '~200 globally' },
  { tier: 'Tier 4: Later Era/Standard', range: '$25K–$100K', criteria: '1980s–2000s tour costumes, less iconic moments', supply: '~500 globally' },
];

const bowieRisks = [
  { factor: 'Museum Retention', probability: 60, impact: 65 },
  { factor: 'Condition Deterioration', probability: 45, impact: 80 },
  { factor: 'Estate Control', probability: 50, impact: 55 },
  { factor: 'Era Preference Shift', probability: 35, impact: 45 },
];

// ============================================
// SHARED COMPONENTS
// ============================================

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-stone-200 p-4 shadow-sm">
        <div className="text-xs text-stone-500 uppercase tracking-wider mb-2">{label}</div>
        {payload.map((entry, index) => (
          <div key={index} className="flex justify-between gap-6 text-sm">
            <span className="text-stone-600">{entry.name}</span>
            <span className="font-medium text-stone-900">{typeof entry.value === 'number' ? entry.value.toFixed(0) : entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-stone-800' : 'text-stone-300'}`}>●</span>
    ))}
  </div>
);

const MetricCard = ({ label, value, note }) => (
  <div className="text-center">
    <div className="text-2xl font-light text-stone-900 mb-1">{value}</div>
    <div className="text-xs text-stone-500 uppercase tracking-wider">{label}</div>
    {note && <div className="text-xs text-stone-400">{note}</div>}
  </div>
);

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================

const MainDashboard = ({ setCurrentView }) => (
  <div className="space-y-16">
    {/* Hero Metrics */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { label: 'DIG-100 Index', value: '347.2', note: 'Current Value' },
        { label: 'Total Return', value: '+247%', note: 'Since 2015' },
        { label: 'Ten-Year Target', value: '900', note: 'Base Case' },
        { label: 'Correlation', value: '0.31', note: 'vs. S&P 500' },
      ].map((metric, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl md:text-4xl font-light text-stone-900 mb-2">{metric.value}</div>
          <div className="text-xs md:text-sm text-stone-500 uppercase tracking-wider">{metric.label}</div>
          <div className="text-xs text-stone-400 mt-1">{metric.note}</div>
        </div>
      ))}
    </div>

    {/* Divider */}
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px bg-stone-200"></div>
      <span className="text-xs uppercase tracking-widest text-stone-400">Performance AAnalysis</span>
      <div className="flex-1 h-px bg-stone-200"></div>
    </div>

    {/* Main Chart */}
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-light text-stone-900 mb-2">The DIG-100 Composite Index</h2>
          <p className="text-stone-500 text-sm">
            Tracking museum-grade memorabilia against traditional asset classes
          </p>
        </div>
        <div className="flex gap-4 md:gap-6 text-xs">
          <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-stone-900"></span> DIG-100</span>
          <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-stone-400"></span> S&P 500</span>
          <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-amber-600"></span> Gold</span>
        </div>
      </div>
      
      <div className="bg-white border border-stone-200 p-4 md:p-8">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={indexData}>
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#78716c', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#78716c', fontSize: 12 }} domain={[80, 380]} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="dig100" name="DIG-100" stroke="#1c1917" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="sp500" name="S&P 500" stroke="#a8a29e" strokeWidth={1.5} dot={false} />
            <Line type="monotone" dataKey="gold" name="Gold" stroke="#d97706" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Key Insight */}
    <div className="bg-stone-100 border-l-2 border-stone-900 p-6 md:p-8">
      <p className="text-lg md:text-xl font-light text-stone-800 leading-relaxed italic">
        "Since 2015, top-tier entertainment memorabilia has outperformed the S&P 500 by 86 percentage points, 
        with meaningfully lower correlation to traditional equities—offering genuine portfolio diversification 
        for discerning collectors and institutional investors alike."
      </p>
      <p className="text-sm text-stone-500 mt-4 uppercase tracking-wider">
        DIG Intelligence Research
      </p>
    </div>

    {/* Sector Cards */}
    <div>
      <h2 className="text-2xl font-light text-stone-900 mb-6">Sector Performance</h2>
      <div className="grid grid-cols-1 gap-4">
        {segmentData.map((seg, i) => (
          <div 
            key={i} 
            className={`bg-white border border-stone-200 p-4 md:p-6 transition-all ${['guitars', 'beatles', 'bowie'].includes(seg.id) ? 'cursor-pointer hover:border-stone-400' : ''}`}
            onClick={() => ['guitars', 'beatles', 'bowie'].includes(seg.id) && setCurrentView(seg.id)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2">
                  <h3 className="text-lg font-light text-stone-900">{seg.segment}</h3>
                  <StarRating rating={seg.rating} />
                  {['guitars', 'beatles', 'bowie'].includes(seg.id) && (
                    <span className="text-xs text-stone-400 uppercase tracking-wider">
                      View Report →
                    </span>
                  )}
                </div>
                <p className="text-stone-500 text-sm">{seg.insight}</p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-2xl font-light text-stone-900">{seg.index}</div>
                <div className="text-sm text-stone-500">+{seg.cagr}% CAGR</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Recent Sales */}
    <div>
      <h2 className="text-2xl font-light text-stone-900 mb-6">Recent Notable Sales</h2>
      <div className="bg-white border border-stone-200 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-stone-200">
              <th className="text-left p-4 md:p-5 text-xs uppercase tracking-wider text-stone-400 font-normal">Item</th>
              <th className="text-left p-4 md:p-5 text-xs uppercase tracking-wider text-stone-400 font-normal">House</th>
              <th className="text-right p-4 md:p-5 text-xs uppercase tracking-wider text-stone-400 font-normal">Realized</th>
              <th className="text-right p-4 md:p-5 text-xs uppercase tracking-wider text-stone-400 font-normal">Result</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((sale, i) => (
              <tr key={i} className="border-b border-stone-100">
                <td className="p-4 md:p-5 text-stone-900">{sale.item}</td>
                <td className="p-4 md:p-5 text-stone-500 text-sm">{sale.house}</td>
                <td className="p-4 md:p-5 text-right text-stone-900 font-medium">{sale.realized}</td>
                <td className="p-4 md:p-5 text-right text-stone-900">{sale.premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ============================================
// ASSET REPORT COMPONENT
// ============================================

const AssetReport = ({ 
  title, 
  subtitle,
  rating,
  summary,
  metrics,
  performanceData,
  performanceKey,
  forecastData,
  forecastTargets,
  transactions,
  tiers,
  risks,
  prioritize,
  avoid,
  selectedScenario,
  setSelectedScenario,
  setCurrentView
}) => (
  <div className="space-y-12 md:space-y-16">
    {/* Back Link */}
    <div>
      <button 
        onClick={() => setCurrentView('dashboard')}
        className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-600 transition-colors mb-4"
      >
        ← Back to Dashboard
      </button>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-light text-stone-900 tracking-wide">{title}</h1>
          <p className="text-stone-500 mt-1 text-sm">{subtitle}</p>
        </div>
        <div className="md:text-right">
          <div className="text-xs uppercase tracking-wider text-stone-400 mb-1">DIG Rating</div>
          <StarRating rating={rating} />
        </div>
      </div>
    </div>

    {/* Executive Summary */}
    <div className="bg-stone-100 border-l-2 border-stone-900 p-6 md:p-8">
      <h2 className="text-xs uppercase tracking-widest text-stone-500 mb-4">Executive Summary</h2>
      <p className="text-lg md:text-xl font-light text-stone-800 leading-relaxed">{summary}</p>
    </div>

    {/* Key Metrics */}
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
      {metrics.map((metric, i) => (
        <MetricCard key={i} {...metric} />
      ))}
    </div>

    {/* Historical Performance */}
    <div>
      <h2 className="text-xl md:text-2xl font-light text-stone-900 mb-2">Historical Performance</h2>
      <p className="text-stone-500 mb-6 md:mb-8 text-sm">Index vs. benchmarks (2015 = 100)</p>
      
      <div className="bg-white border border-stone-200 p-4 md:p-8">
        <div className="flex justify-end gap-4 md:gap-6 text-xs mb-6">
          <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-stone-900"></span> {title.split(' ').slice(-1)[0]}</span>
          <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-stone-400"></span> S&P 500</span>
          <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-amber-600"></span> DIG-100</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#78716c', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#78716c', fontSize: 12 }} domain={[80, 500]} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey={performanceKey} name={title.split(' ').slice(-1)[0]} stroke="#1c1917" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="sp500" name="S&P 500" stroke="#a8a29e" strokeWidth={1.5} dot={false} />
            <Line type="monotone" dataKey="dig100" name="DIG-100" stroke="#d97706" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Valuation Framework */}
    <div>
      <h2 className="text-xl md:text-2xl font-light text-stone-900 mb-2">Valuation Framework</h2>
      <p className="text-stone-500 mb-6 md:mb-8 text-sm">What drives price differentiation</p>
      <div className="bg-white border border-stone-200 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="text-left p-4 md:p-5 text-xs uppercase tracking-wider text-stone-500 font-normal">Tier</th>
              <th className="text-right p-4 md:p-5 text-xs uppercase tracking-wider text-stone-500 font-normal">Price Range</th>
              <th className="text-left p-4 md:p-5 text-xs uppercase tracking-wider text-stone-500 font-normal">Criteria</th>
              <th className="text-right p-4 md:p-5 text-xs uppercase tracking-wider text-stone-500 font-normal">Est. Supply</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier, i) => (
              <tr key={i} className="border-b border-stone-100">
                <td className="p-4 md:p-5 font-medium text-stone-900">{tier.tier}</td>
                <td className="p-4 md:p-5 text-right text-lg font-light text-stone-900">{tier.range}</td>
                <td className="p-4 md:p-5 text-sm text-stone-600">{tier.criteria}</td>
                <td className="p-4 md:p-5 text-right text-sm text-stone-500">{tier.supply}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Notable Transactions */}
    <div>
      <h2 className="text-xl md:text-2xl font-light text-stone-900 mb-2">Notable Transactions</h2>
      <p className="text-stone-500 mb-6 md:mb-8 text-sm">Landmark sales establishing market benchmarks</p>
      <div className="space-y-4">
        {transactions.map((tx, i) => (
          <div key={i} className="bg-white border border-stone-200 p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-light text-stone-900">{tx.item}</h3>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 text-sm text-stone-500">
                  <span>{tx.event}</span>
                  <span className="text-stone-300">|</span>
                  <span>{tx.house}</span>
                  <span className="text-stone-300">|</span>
                  <span>{tx.year}</span>
                </div>
              </div>
              <div className="md:text-right">
                <div className="text-2xl font-light text-stone-900">{tx.realized}</div>
                <div className="text-xs text-stone-400 mt-1">Est: {tx.estimate}</div>
                <div className="text-sm text-stone-900 mt-2">{tx.premium}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Ten-Year Outlook */}
    <div>
      <h2 className="text-xl md:text-2xl font-light text-stone-900 mb-2">Ten-Year Outlook</h2>
      <p className="text-stone-500 mb-6 md:mb-8 text-sm">Scenario analysis through 2035</p>

      {/* Scenario Selector */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-sm text-stone-500 mr-2 md:mr-4">Select scenario:</span>
        {['bear', 'base', 'bull'].map(scenario => (
          <button
            key={scenario}
            onClick={() => setSelectedScenario(scenario)}
            className={`px-4 md:px-5 py-2 text-sm transition-all ${
              selectedScenario === scenario
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
            }`}
          >
            {scenario === 'bear' ? 'Conservative' : scenario === 'base' ? 'Base Case' : 'Optimistic'}
          </button>
        ))}
      </div>

      <div className="bg-white border border-stone-200 p-4 md:p-8">
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-stone-400 mb-1">2035 Projected Index Value</div>
            <div className="text-4xl md:text-5xl font-light text-stone-900">{forecastTargets[selectedScenario].value}</div>
            <div className="text-sm text-stone-500 mt-2">{forecastTargets[selectedScenario].cagr}</div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={forecastData}>
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#78716c', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#78716c', fontSize: 12 }} domain={[0, forecastTargets.bull.max]} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="bull" stroke="transparent" fill="#1c1917" fillOpacity={selectedScenario === 'bull' ? 0.08 : 0.02} />
            <Area type="monotone" dataKey="base" stroke="transparent" fill="#1c1917" fillOpacity={selectedScenario === 'base' ? 0.08 : 0.02} />
            <Area type="monotone" dataKey="bear" stroke="transparent" fill="#1c1917" fillOpacity={selectedScenario === 'bear' ? 0.08 : 0.02} />
            <Line type="monotone" dataKey={selectedScenario} stroke="#1c1917" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="actual" stroke="#1c1917" strokeWidth={2} dot={{ fill: '#1c1917', r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Risk Factors */}
    <div>
      <h2 className="text-xl md:text-2xl font-light text-stone-900 mb-2">Key Risks</h2>
      <p className="text-stone-500 mb-6 md:mb-8 text-sm">Category-specific threats to monitor</p>
      <div className="bg-white border border-stone-200 overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="text-left p-4 md:p-5 text-xs uppercase tracking-wider text-stone-500 font-normal">Risk Factor</th>
              <th className="text-center p-4 md:p-5 text-xs uppercase tracking-wider text-stone-500 font-normal">Probability</th>
              <th className="text-center p-4 md:p-5 text-xs uppercase tracking-wider text-stone-500 font-normal">Impact</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((risk, i) => (
              <tr key={i} className="border-b border-stone-100">
                <td className="p-4 md:p-5 font-medium text-stone-900">{risk.factor}</td>
                <td className="p-4 md:p-5 text-center">
                  <span className={`inline-block px-3 py-1 text-xs ${risk.probability >= 50 ? 'bg-stone-900 text-white' : risk.probability >= 35 ? 'bg-stone-300 text-stone-800' : 'bg-stone-100 text-stone-600'}`}>
                    {risk.probability}%
                  </span>
                </td>
                <td className="p-4 md:p-5 text-center">
                  <span className={`inline-block px-3 py-1 text-xs ${risk.impact >= 70 ? 'bg-stone-900 text-white' : risk.impact >= 50 ? 'bg-stone-300 text-stone-800' : 'bg-stone-100 text-stone-600'}`}>
                    {risk.impact}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Acquisition Guidance */}
    <div>
      <h2 className="text-xl md:text-2xl font-light text-stone-900 mb-6">Acquisition Guidance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-stone-900 text-white p-6 md:p-8">
          <h3 className="text-lg font-light mb-6">Prioritize</h3>
          <ul className="space-y-4">
            {prioritize.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="text-stone-500 mt-0.5">✓</span>
                <span className="text-stone-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-stone-200 p-6 md:p-8">
          <h3 className="text-lg font-light text-stone-900 mb-6">Avoid</h3>
          <ul className="space-y-4">
            {avoid.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="text-stone-400 mt-0.5">✗</span>
                <span className="text-stone-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* Disclaimer */}
    <div className="border-t border-stone-200 pt-8">
      <p className="text-xs text-stone-400 leading-relaxed">
        <strong>Disclaimer:</strong> This report is provided for informational purposes only and does not constitute investment advice. 
        Past performance is not indicative of future results. The memorabilia market is illiquid and subject to significant valuation 
        uncertainty. Prospective buyers should conduct independent due diligence and consult qualified professionals.
      </p>
    </div>
  </div>
);

// ============================================
// MAIN APPLICATION
// ============================================

export default function DIGIntelligencePlatform() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedScenario, setSelectedScenario] = useState('base');

  const renderContent = () => {
    switch (currentView) {
      case 'guitars':
        return (
          <AssetReport
            title="Artist-Played Guitars"
            subtitle="Asset Class Report · January 2025"
            rating={5}
            summary={<>Artist-played guitars represent one of the most compelling segments within entertainment memorabilia, combining tangible cultural significance with demonstrated price appreciation. The category has delivered a <strong>367% return since 2015</strong>, outperforming both the S&P 500 (+161%) and the broader DIG-100 Index (+247%).</>}
            metrics={[
              { label: 'Index Value', value: '467.2', note: 'Current' },
              { label: 'Total Return', value: '+367%', note: 'Since 2015' },
              { label: '10Y CAGR', value: '16.7%', note: 'Realized' },
              { label: 'Sharpe Ratio', value: '1.58', note: 'Risk-Adjusted' },
              { label: 'Correlation', value: '0.24', note: 'vs. S&P 500' },
              { label: 'Volatility', value: '18.2%', note: 'Annualized' },
            ]}
            performanceData={guitarsPerformance}
            performanceKey="guitars"
            forecastData={guitarsForecast}
            forecastTargets={{
              bear: { value: '280', cagr: '-4.9% CAGR', max: 2800 },
              base: { value: '1,339', cagr: '+11.1% CAGR', max: 2800 },
              bull: { value: '2,662', cagr: '+19.0% CAGR', max: 2800 },
            }}
            transactions={guitarsTransactions}
            tiers={guitarsTiers}
            risks={guitarsRisks}
            prioritize={[
              'Video-documented performance provenance',
              'Artists with cross-generational appeal (Beatles, Hendrix, Nirvana)',
              'Instruments central to artist identity (not backups)',
              'Complete documentation chain from artist to present',
            ]}
            avoid={[
              '"Attributed to" without documentary evidence',
              'Artists with narrow generational appeal',
              'Instruments modified significantly post-ownership',
              'Provenance gaps exceeding 10 years',
            ]}
            selectedScenario={selectedScenario}
            setSelectedScenario={setSelectedScenario}
            setCurrentView={setCurrentView}
          />
        );

      case 'beatles':
        return (
          <AssetReport
            title="Beatles Signatures"
            subtitle="Asset Class Report · January 2025"
            rating={4}
            summary={<>Beatles signatures occupy a unique position: unparalleled cultural significance combined with extreme authentication risk. Full-band signed items have delivered <strong>312% returns since 2015</strong>, but the category&apos;s 55% forgery prevalence rate demands rigorous verification.</>}
            metrics={[
              { label: 'Index Value', value: '412.0', note: 'Current' },
              { label: 'Total Return', value: '+312%', note: 'Since 2015' },
              { label: '10Y CAGR', value: '15.2%', note: 'Realized' },
              { label: 'Sharpe Ratio', value: '1.21', note: 'Risk-Adjusted' },
              { label: 'Correlation', value: '0.19', note: 'vs. S&P 500' },
              { label: 'Forgery Rate', value: '55%+', note: 'Market Est.' },
            ]}
            performanceData={beatlesPerformance}
            performanceKey="beatles"
            forecastData={beatlesForecast}
            forecastTargets={{
              bear: { value: '148', cagr: '-9.7% CAGR', max: 2200 },
              base: { value: '1,067', cagr: '+10.0% CAGR', max: 2200 },
              bull: { value: '2,148', cagr: '+18.0% CAGR', max: 2200 },
            }}
            transactions={beatlesTransactions}
            tiers={beatlesTiers}
            risks={beatlesRisks}
            prioritize={[
              'Full band signatures with photo provenance',
              'Items authenticated by Frank Caiazzo or recognized experts',
              'Signatures on historically significant items',
              'Early era (1962-1966) signatures in strong condition',
            ]}
            avoid={[
              'Any item without expert authentication',
              'Signatures purchased online without provenance',
              'Items with "too perfect" signature placement',
              'Single signatures claimed genuine without documentation',
            ]}
            selectedScenario={selectedScenario}
            setSelectedScenario={setSelectedScenario}
            setCurrentView={setCurrentView}
          />
        );

      case 'bowie':
        return (
          <AssetReport
            title="David Bowie Stage Costumes"
            subtitle="Asset Class Report · January 2025"
            rating={4}
            summary={<>Bowie stage costumes represent the intersection of fashion, art, and rock history. The category has returned <strong>278% since 2015</strong>, driven by museum demand and the finite supply of Ziggy-era Kansai Yamamoto pieces. Era matters significantly: Ziggy Stardust (1972-73) commands 3-4× premiums over later periods.</>}
            metrics={[
              { label: 'Index Value', value: '378.0', note: 'Current' },
              { label: 'Total Return', value: '+278%', note: 'Since 2015' },
              { label: '10Y CAGR', value: '14.2%', note: 'Realized' },
              { label: 'Sharpe Ratio', value: '1.34', note: 'Risk-Adjusted' },
              { label: 'Correlation', value: '0.22', note: 'vs. S&P 500' },
              { label: 'Museum Hold', value: '~40%', note: 'Ziggy Era' },
            ]}
            performanceData={bowiePerformance}
            performanceKey="bowie"
            forecastData={bowieForecast}
            forecastTargets={{
              bear: { value: '143', cagr: '-9.3% CAGR', max: 2000 },
              base: { value: '894', cagr: '+9.0% CAGR', max: 2000 },
              bull: { value: '1,946', cagr: '+17.8% CAGR', max: 2000 },
            }}
            transactions={bowieTransactions}
            tiers={bowieTiers}
            risks={bowieRisks}
            prioritize={[
              'Ziggy Stardust era (1972-1973) Kansai Yamamoto designs',
              'Photo or video documentation from specific performances',
              'Pieces with direct provenance from Bowie estate',
              'Items featured in major exhibitions or publications',
            ]}
            avoid={[
              'Later era pieces without significant visual documentation',
              'Items with condition issues (textile deterioration)',
              'Costumes from lesser-known tours without iconic imagery',
              'Reproductions or items made for exhibitions (not stage-worn)',
            ]}
            selectedScenario={selectedScenario}
            setSelectedScenario={setSelectedScenario}
            setCurrentView={setCurrentView}
          />
        );

      default:
        return <MainDashboard setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="cursor-pointer" onClick={() => setCurrentView('dashboard')}>
              <div className="text-xs uppercase tracking-widest text-stone-400 mb-1">Dig Appraisal</div>
              <h1 className="text-xl md:text-2xl font-light text-stone-900 tracking-wide">Market Boy Intel</h1>
            </div>
            <nav className="flex gap-4 md:gap-6 overflow-x-auto">
              {[
                { id: 'dashboard', label: 'Overview' },
                { id: 'guitars', label: 'Guitars' },
                { id: 'beatles', label: 'Beatles' },
                { id: 'bowie', label: 'Bowiez' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`text-sm tracking-wide transition-colors whitespace-nowrap ${
                    currentView === item.id 
                      ? 'text-stone-900 border-b border-stone-900 pb-1' 
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 mt-12 md:mt-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-400 mb-1">Dig Appraisals</div>
              <div className="text-sm text-stone-500">Appraisers of Iconic Music & Film Memorabilia</div>
            </div>
            <div className="text-xs text-stone-400">© 2025 Dig Appraisals · Data for illustrative purposes · Not investment advice</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
