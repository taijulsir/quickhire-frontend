'use client';

import { useState, useRef, useEffect } from 'react';
import { Input, TextArea, Select, Button } from '@/components/common';
import { jobService } from '@/services';
import { JobFormData, Job } from '@/types';
import { BASE_URL } from '@/services/api';
import { X } from 'lucide-react';

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
  initialData?: Job;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function JobForm({ initialData, onSuccess, onCancel }: JobFormProps) {
  const [formData, setFormData] = useState<JobFormData>({
    title: initialData?.title || '',
    company: initialData?.company || '',
    location: initialData?.location || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    type: initialData?.type || 'Full Time',
    tags: initialData?.tags || [],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.companyLogo
      ? (initialData.companyLogo.startsWith('http') ? initialData.companyLogo : `${BASE_URL}${initialData.companyLogo}`)
      : null
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, imageFile: 'File size must be less than 5MB' }));
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, imageFile: '' }));
    }
  };

  const toggleTag = (tagName: string) => {
    setFormData(prev => {
      const tags = prev.tags.includes(tagName)
        ? prev.tags.filter(t => t !== tagName)
        : [...prev.tags, tagName];
      return { ...prev, tags };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('company', formData.company);
      fd.append('location', formData.location);
      fd.append('category', formData.category);
      fd.append('type', formData.type);
      fd.append('description', formData.description);
      fd.append('tags', JSON.stringify(formData.tags));

      if (imageFile) {
        fd.append('companyLogo', imageFile);
      }

      const response = initialData?._id
        ? await jobService.update(initialData._id, fd)
        : await jobService.create(fd);

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
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setPreviewUrl(null);
        onSuccess?.();
      }
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : `Failed to ${initialData?._id ? 'update' : 'create'} job` });
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
    <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[calc(90vh-120px)]">
      <div className="flex-1 overflow-y-auto px-1 space-y-5 pb-6">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
            {errors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Select
            label="Job Type"
            options={jobTypes}
            value={formData.type}
            onChange={handleChange('type')}
          />

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.filter(c => c.value).map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => toggleTag(cat.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${formData.tags.includes(cat.value)
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Company Logo</label>
          <div className="flex items-start gap-5">
            {previewUrl && (
              <div className="relative w-24 h-24 border border-gray-200 rounded-2xl overflow-hidden shrink-0 bg-white shadow-sm group">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain p-2" />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setPreviewUrl(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute top-1 right-1 bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-600 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex-1">
              <div
                className="border-2 border-dashed border-gray-200 hover:border-indigo-400 rounded-2xl p-4 transition-colors cursor-pointer bg-gray-50/50 group"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center text-center">
                  <svg className="w-8 h-8 text-gray-400 mb-2 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium text-gray-600">Click to upload logo</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
          </div>
          {errors.imageFile && <p className="text-red-500 text-sm mt-1 font-medium">{errors.imageFile}</p>}
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
      </div>

      <div className="sticky bottom-0 bg-white pt-5 pb-2  flex gap-4 mt-auto">
        <Button
          type="submit"
          className="flex-1 shadow-sm border-transparent"
          isLoading={isSubmitting}
        >
          {initialData?._id ? 'Update Job' : 'Create Job'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 border-gray-200"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
