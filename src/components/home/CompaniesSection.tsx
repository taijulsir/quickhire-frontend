import Image from 'next/image'

interface Company {
    name: string
    logo: string
    width: number
    height: number
}

const companyData: Company[] = [
    {
        name: 'vodafone',
        logo: '/images/companies/vodafone.png',
        width: 154,
        height: 40,
    },
    {
        name: 'intel',
        logo: '/images/companies/intel.png',
        width: 83,
        height: 28,
    },
    {
        name: 'tesla',
        logo: '/images/companies/tesla.png',
        width: 183,
        height: 24,
    },
    {
        name: 'amd',
        logo: '/images/companies/amd.png',
        width: 117,
        height: 28,
    },
    {
        name: 'talkit',
        logo: '/images/companies/talkit.png',
        width: 109,
        height: 32,
    },
]

export default function Companies() {
    return (
        <section className="py-10">
            <p className="text-[#7C8493] text-lg mb-8">Companies we helped grow</p>
            <div className="grid grid-cols-2 gap-8 md:flex md:items-center md:justify-between md:gap-6">
                {companyData.map((company: Company) => (
                    <div key={company.name} className="flex-shrink-0 flex items-center">
                        <Image
                            src={company.logo}
                            alt={company.name}
                            width={company.width}
                            height={company.height}
                            unoptimized
                            className="object-contain opacity-60"
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}