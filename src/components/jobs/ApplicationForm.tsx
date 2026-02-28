'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, TextArea, Button } from '@/components/common';
import { applicationService } from '@/services';
import { ApplicationFormData } from '@/types';

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

export default function ApplicationForm({ jobId, jobTitle }: ApplicationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<ApplicationFormData, 'job_id'>>({
    name: '',
    email: '',
    resume_link: '',
    cover_note: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.resume_link.trim()) {
      newErrors.resume_link = 'Resume link is required';
    } else {
      try {
        new URL(formData.resume_link);
      } catch {
        newErrors.resume_link = 'Please enter a valid URL';
      }
    }

    if (!formData.cover_note.trim()) {
      newErrors.cover_note = 'Cover note is required';
    } else if (formData.cover_note.length < 10) {
      newErrors.cover_note = 'Cover note must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await applicationService.create({
        job_id: jobId,
        ...formData,
      });

      if (response.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', resume_link: '', cover_note: '' });
      }
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to submit application' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <svg
          className="w-12 h-12 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Application Submitted!</h3>
        <p className="text-green-600 mb-4">
          Your application for {jobTitle} has been submitted successfully.
        </p>
        <Button onClick={() => router.push('/jobs')} variant="outline">
          Browse More Jobs
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for this position</h3>
      
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {errors.submit}
        </div>
      )}

      <Input
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange('name')}
        error={errors.name}
        required
      />

      <Input
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        required
      />

      <Input
        type="url"
        label="Resume Link"
        placeholder="https://drive.google.com/your-resume"
        value={formData.resume_link}
        onChange={handleChange('resume_link')}
        error={errors.resume_link}
        required
      />

      <TextArea
        label="Cover Note"
        placeholder="Tell us why you're interested in this position..."
        value={formData.cover_note}
        onChange={handleChange('cover_note')}
        error={errors.cover_note}
        rows={4}
        required
      />

      <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
        Submit Application
      </Button>
    </form>
  );
}
