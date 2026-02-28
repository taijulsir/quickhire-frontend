'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, TextArea, Select, Button } from '@/components/common';
import { jobService } from '@/services';
import { JobFormData } from '@/types';

const categories = [
  { value: '', label: 'Select Category' },
  { value: 'Design', label: 'Design' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Business', label: 'Business' },
  { value: 'Human Resource', label: 'Human Resource' },
];

const jobTypes = [
  { value: 'Full Time', label: 'Full Time' },
  { value: 'Part Time', label: 'Part Time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Remote', label: 'Remote' },
];

interface JobFormProps {
  onSuccess?: () => void;
}

export default function JobForm({ onSuccess }: JobFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    location: '',
    category: '',
    description: '',
    type: 'Full Time',
    tags: [],
  });
  const [tagsInput, setTagsInput] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const tags = tagsInput.split(',').map((tag) => tag.trim()).filter(Boolean);
      const response = await jobService.create({
        ...formData,
        tags,
      });

      if (response.success) {
        setFormData({
          title: '',
          company: '',
          location: '',
          category: '',
          description: '',
          type: 'Full Time',
          tags: [],
        });
        setTagsInput('');
        onSuccess?.();
      }
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to create job' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof JobFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Job Title"
          placeholder="e.g. Senior Developer"
          value={formData.title}
          onChange={handleChange('title')}
          error={errors.title}
          required
        />

        <Input
          label="Company"
          placeholder="Company name"
          value={formData.company}
          onChange={handleChange('company')}
          error={errors.company}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Location"
          placeholder="e.g. San Francisco, CA"
          value={formData.location}
          onChange={handleChange('location')}
          error={errors.location}
          required
        />

        <Select
          label="Category"
          options={categories}
          value={formData.category}
          onChange={handleChange('category')}
          error={errors.category}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Job Type"
          options={jobTypes}
          value={formData.type}
          onChange={handleChange('type')}
        />

        <Input
          label="Tags (comma-separated)"
          placeholder="e.g. React, Node.js, Remote"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
      </div>

      <TextArea
        label="Description"
        placeholder="Job description..."
        value={formData.description}
        onChange={handleChange('description')}
        error={errors.description}
        rows={6}
        required
      />

      <div className="flex gap-4">
        <Button type="submit" className="flex-1" isLoading={isSubmitting}>
          Create Job
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
