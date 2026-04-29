'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  MessageSquare,
  Plus,
  Trash2,
  GripVertical,
  Quote,
  User,
  Link as LinkIcon,
  Save,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface Review {
  quote: string;
  attribution: string;
  source: string;
}

interface ReviewsManagerProps {
  lang: string;
}

export default function ReviewsManager({ lang }: ReviewsManagerProps) {
  const queryClient = useQueryClient();
  const [reviews, setReviews] = useState<Review[]>([]);

  const { data: content, isLoading } = useQuery({
    queryKey: ['content', lang, 'home'],
    queryFn: async () => {
      const res = await fetch(`/api/content/${lang}/home`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    }
  });

  useEffect(() => {
    if (content?.sections?.reviews) {
      setReviews(content.sections.reviews);
    } else if (content?.sections?.booking?.reviews) {
      // Handle legacy structure if it exists
      setReviews(content.sections.booking.reviews);
    }
  }, [content]);

  const mutation = useMutation({
    mutationFn: async (newReviews: Review[]) => {
      const res = await fetch(`/api/content/${lang}/home`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: 'reviews',
          value: newReviews
        })
      });
      if (!res.ok) throw new Error('Failed to update reviews');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', lang, 'home'] });
      toast.success('Reviews updated successfully!');
    },
    onError: () => {
      toast.error('Failed to save changes.');
    }
  });

  const addReview = () => {
    setReviews([...reviews, { quote: '', attribution: '', source: '' }]);
  };

  const removeReview = (index: number) => {
    const newReviews = reviews.filter((_, i) => i !== index);
    setReviews(newReviews);
  };

  const updateReview = (index: number, field: keyof Review, value: string) => {
    const newReviews = [...reviews];
    newReviews[index] = { ...newReviews[index], [field]: value };
    setReviews(newReviews);
  };

  const handleSave = () => {
    mutation.mutate(reviews);
  };

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center">
        <Loader2 className="animate-spin text-blue-900" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="text-blue-600" size={24} />
            Guest Reviews
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage the testimonials displayed on the home page.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={mutation.isPending}
          className="flex items-center gap-2 bg-blue-900 text-background px-6 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {mutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Save Changes
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group relative"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => removeReview(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Review"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Quote */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Quote size={12} />
                  Testimonial Quote
                </label>
                <textarea
                  value={review.quote}
                  onChange={(e) => updateReview(index, 'quote', e.target.value)}
                  placeholder="Enter the guest's review..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Attribution */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <User size={12} />
                    Guest Name / Attribution
                  </label>
                  <input
                    type="text"
                    value={review.attribution}
                    onChange={(e) => updateReview(index, 'attribution', e.target.value)}
                    placeholder="e.g. Elena, June 2024"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                {/* Source */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <LinkIcon size={12} />
                    Source (e.g. Google, Tripadvisor)
                  </label>
                  <input
                    type="text"
                    value={review.source}
                    onChange={(e) => updateReview(index, 'source', e.target.value)}
                    placeholder="e.g. Google Reviews"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addReview}
        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={20} />
        Add New Review
      </button>
    </div>
  );
}
