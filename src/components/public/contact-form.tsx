'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { contactInquirySchema, type ContactInquiryInput } from '@/lib/validations/schemas';
import { submitContactInquiry } from '@/actions/inquiries';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

const PROJECT_TYPES = [
  { value: 'Landing Page Development', label: 'Landing Page Development' },
  { value: 'Business Website Development', label: 'Business Website Development' },
  { value: 'Web App / Dashboard Development', label: 'Web App / Dashboard Development' },
  { value: 'Website Redesign', label: 'Website Redesign' },
  { value: 'Technical Consultation', label: 'Technical Consultation' },
  { value: 'Other', label: 'Other' },
];

const BUDGET_RANGES = [
  { value: 'Not sure yet', label: 'Not sure yet' },
  { value: 'Small project', label: 'Small project' },
  { value: 'Medium project', label: 'Medium project' },
  { value: 'Larger system', label: 'Larger system' },
];

const TIMELINES = [
  { value: 'ASAP', label: 'ASAP' },
  { value: '2-4 weeks', label: '2-4 weeks' },
  { value: '1-2 months', label: '1-2 months' },
  { value: 'Flexible', label: 'Flexible' },
];

export function ContactForm({ defaultType }: { defaultType?: string }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInquiryInput>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues: {
      name: '',
      email: '',
      company_or_brand: '',
      phone_or_whatsapp: '',
      project_type: (defaultType as any) || 'Landing Page Development',
      budget_range: 'Not sure yet',
      timeline: 'Flexible',
      existing_website_or_social_link: '',
      message: '',
      source: 'web_form',
      website: '', // Honeypot
    },
  });

  const onSubmit = async (data: ContactInquiryInput) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await submitContactInquiry(data);
      
      if (response.success) {
        setSubmitSuccess(true);
        toast({
          title: 'Inquiry Submitted',
          message: 'Your project parameters have been logged successfully.',
          type: 'success',
        });
        reset();
      } else {
        setErrorMessage(response.error || 'Failed to submit inquiry.');
        toast({
          title: 'Submission Error',
          message: response.error || 'Failed to register inquiry.',
          type: 'error',
        });
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('A network error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-8 text-center max-w-xl mx-auto space-y-4 font-sans glass-panel">
        <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto animate-bounce" />
        <h3 className="font-mono text-sm font-bold text-foreground uppercase tracking-widest">// TRANSMISSION LOGGED</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Thank you. Your project request has been logged inside Kavin HQ systems. I will review the scope requirements and contact you within 24 hours.
        </p>
        <div className="pt-4">
          <Button
            variant="outline"
            className="font-mono text-xs"
            onClick={() => setSubmitSuccess(false)}
          >
            LOG NEW INQUIRY &gt;
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto font-sans bg-secondary/10 p-6 sm:p-8 rounded-lg border border-border/40 glass-panel">
      
      <div className="border-b border-border/40 pb-4 mb-4">
        <h3 className="font-mono text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>INQUIRY FORM SHEET</span>
        </h3>
        <p className="text-xs text-muted-foreground mt-1">Please enter your project specifications below.</p>
      </div>

      {errorMessage && (
        <div className="bg-rose-950/30 border border-rose-500/20 p-4 rounded text-xs text-rose-300 flex items-start gap-2">
          <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Honeypot field (hidden from visually impaired users as well) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          placeholder="Leave this empty"
          {...register('website')}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-foreground">Name *</label>
          <Input
            placeholder="John Doe"
            {...register('name')}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && <p className="text-[10px] text-destructive font-mono">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-foreground">Email *</label>
          <Input
            type="email"
            placeholder="john@example.com"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && <p className="text-[10px] text-destructive font-mono">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Company */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-foreground">Company / Brand Name</label>
          <Input
            placeholder="Vanguard Inc"
            {...register('company_or_brand')}
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-foreground">Phone / WhatsApp (Optional)</label>
          <Input
            placeholder="+1 (555) 000-0000"
            {...register('phone_or_whatsapp')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Project Type */}
        <div className="space-y-1.5 sm:col-span-1">
          <label className="text-xs font-mono font-bold text-foreground">Project Type *</label>
          <Select
            options={PROJECT_TYPES}
            {...register('project_type')}
          />
        </div>

        {/* Budget Range */}
        <div className="space-y-1.5 sm:col-span-1">
          <label className="text-xs font-mono font-bold text-foreground">Budget Range</label>
          <Select
            options={BUDGET_RANGES}
            {...register('budget_range')}
          />
        </div>

        {/* Timeline */}
        <div className="space-y-1.5 sm:col-span-1">
          <label className="text-xs font-mono font-bold text-foreground">Timeline *</label>
          <Select
            options={TIMELINES}
            {...register('timeline')}
          />
        </div>
      </div>

      {/* Website Link */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono font-bold text-foreground">Current Website or Social Link (Optional)</label>
        <Input
          placeholder="https://example.com"
          {...register('existing_website_or_social_link')}
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono font-bold text-foreground">Message *</label>
        <Textarea
          placeholder="Detail your system requirements, target audience, and integration specifications..."
          rows={5}
          {...register('message')}
          className={errors.message ? 'border-destructive' : ''}
        />
        {errors.message && <p className="text-[10px] text-destructive font-mono">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full font-mono text-xs py-5 justify-center gap-2"
      >
        <Send className="h-4 w-4" />
        <span>{isSubmitting ? 'TRANSMITTING DATA...' : 'SUBMIT PROJECT INQUIRY'}</span>
      </Button>

    </form>
  );
}
