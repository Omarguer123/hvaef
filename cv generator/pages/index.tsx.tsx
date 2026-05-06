import Head from 'next/head';
import Link from 'next/link';
import PayPalSubscribeButton from '@/components/PayPalSubscribeButton';

const plans = [
  {
    name: 'Free',
    price: '€0',
    features: ['1 CV', '2 basic templates', 'Watermarked PDF', 'Basic editing'],
    cta: 'Get Started Free',
    planId: 'free',
  },
  {
    name: 'Pro',
    price: '€7.99',
    period: '/month',
    features: ['10 CVs', 'All 7 premium templates', 'PDF & DOCX', 'ATS check', 'AI suggestions', 'No watermarks'],
    cta: 'Subscribe',
    planId: 'pro',
    highlighted: true,
  },
  {
    name: 'Business',
    price: '€19.99',
    period: '/month',
    features: ['Unlimited CVs', 'All + custom branding', 'PDF, DOCX, JSON', 'Advanced ATS', 'Team sharing (5)', 'Priority support'],
    cta: 'Subscribe',
    planId: 'business',
  },
];

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>CV Generator Pro</title>
      </Head>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Your CV, Employer‑Ready in Minutes</h1>
        <p className="text-xl mb-8">7 recruiter‑accredited templates. Pixel‑perfect, ATS‑friendly.</p>
        <Link
          href="/signup"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold"
        >
          Create Your CV Free
        </Link>
      </section>
      <section id="pricing" className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-xl p-6 flex flex-col ${
                plan.highlighted ? 'border-blue-500 scale-105' : ''
              }`}
            >
              {plan.highlighted && (
                <span className="text-blue-600 font-semibold mb-2">Most Popular</span>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-500">{plan.period}</span>}
              </div>
              <ul className="flex-1 space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              {plan.planId === 'free' ? (
                <Link
                  href="/signup"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-center py-2 rounded-lg"
                >
                  {plan.cta}
                </Link>
              ) : (
                <PayPalSubscribeButton plan={plan.planId as 'pro' | 'business'} />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}