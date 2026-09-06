import { HelpCircle, Mail, Phone } from "lucide-react";
import { useLanguage } from "../i18n";

export default function HelpPage() {
  const { t } = useLanguage();

  const faqs = [
    { q: t.helpPage.q1, a: t.helpPage.a1 },
    { q: t.helpPage.q2, a: t.helpPage.a2 },
    { q: t.helpPage.q3, a: t.helpPage.a3 },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <HelpCircle size={24} className="text-violet-500" />
          {t.helpPage.title}
        </h1>
        <p className="text-zinc-500 mt-1">{t.helpPage.subtitle}</p>
      </div>

      <section className="bg-white dark:bg-[#12131f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
        <h2 className="font-medium mb-4">{t.helpPage.faq}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-zinc-100 dark:border-zinc-800 pb-4 last:border-0 last:pb-0">
              <p className="font-medium text-sm mb-1">{faq.q}</p>
              <p className="text-sm text-zinc-500">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-[#12131f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
        <h2 className="font-medium mb-4">{t.helpPage.contact}</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 text-zinc-500">
            <Mail size={16} className="text-violet-500" />
            <span>support@vitrina.uz</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-500">
            <Phone size={16} className="text-violet-500" />
            <span>+998 71 200 00 00</span>
          </div>
        </div>
      </section>
    </div>
  );
}
