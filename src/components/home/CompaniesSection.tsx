const companies = [
  { name: 'Vodafone', logo: 'vodafone' },
  { name: 'Intel', logo: 'intel' },
  { name: 'Tesla', logo: 'tesla' },
  { name: 'AMD', logo: 'amd' },
  { name: 'Talkit', logo: 'talkit' },
];

export default function CompaniesSection() {
  return (
    <section className="bg-white py-12 border-y border-gray-100 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20">
        <p className="text-gray-500 text-sm mb-8">Companies we helped grow</p>
        <div className="flex flex-wrap justify-between items-center gap-8">
          {companies.map((company) => (
            <div key={company.name} className="text-gray-400 text-xl font-bold tracking-wider">
              {company.name === 'Vodafone' && (
                <span className="flex items-center gap-1">
                  <span className="text-2xl">◉</span> vodafone
                </span>
              )}
              {company.name === 'Intel' && <span className="text-gray-600">intel</span>}
              {company.name === 'Tesla' && <span className="tracking-[0.3em] text-gray-600">T E S L Λ</span>}
              {company.name === 'AMD' && <span className="text-gray-600 font-black">AMD◢</span>}
              {company.name === 'Talkit' && <span className="text-gray-600">Talkit</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
