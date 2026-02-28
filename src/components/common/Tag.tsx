interface TagProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function Tag({ text, variant = 'outline' }: TagProps) {
  const variants = {
    primary: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    secondary: 'bg-amber-50 text-amber-700 border-amber-200',
    outline: 'bg-white text-gray-600 border-gray-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {text}
    </span>
  );
}
