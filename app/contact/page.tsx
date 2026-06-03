import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/app/contact/contact-form";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-semibold tracking-tight text-white">Let’s Work Together</h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            Have a project in mind? Send me a message and I’ll help shape it into a buildable plan.
          </p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-[.75fr_1.25fr]">
          <div className="space-y-7 text-sm text-slate-400">
            <Info icon={<Mail size={18} />} label="Email" text="hello@kavinhq.com" />
            <Info icon={<MessageCircle size={18} />} label="WhatsApp" text="+94 77 123 4567" />
            <Info icon={<MapPin size={18} />} label="Location" text="Sri Lanka" />
            <Info icon={<Clock size={18} />} label="Response Time" text="Usually within 24 hours" />
          </div>
          <div className="soft-panel rounded-lg p-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ icon, label, text }: { icon: React.ReactNode; label: string; text: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 text-sky-400">{icon}</div>
      <div>
        <p className="font-medium text-white">{label}</p>
        <p className="mt-1">{text}</p>
      </div>
    </div>
  );
}
