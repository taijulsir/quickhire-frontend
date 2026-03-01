import Image from "next/image";
import Link from "next/link";

export default function JobPosting() {
    return (
        <section>
            {/* Desktop Layout */}
            <div className="hidden md:block relative overflow-hidden">
                {/* Blue background with clip-path for top-left circle and bottom-right triangle */}
                <div
                    className="absolute inset-0 bg-[#4640DE]"
                    style={{
                        clipPath: 'polygon(15% 0, 100% 0, 100% 70%, 85% 100%, 0 100%, 0 30%)',
                    }}
                />

                <div className="relative flex items-center min-h-105 lg:min-h-115 mx-5 md:mx-20 2xl:mx-30 3xl:mx-40">
                    {/* Left text content */}
                    <div className="w-[45%] lg:w-[40%] py-16 pr-8">
                        <h2 className="text-3xl lg:text-4xl xl:text-[42px] font-bold text-white font-red-hat-display leading-tight mb-5">
                            Start posting<br />jobs today
                        </h2>
                        <p className="text-white/80 text-base lg:text-lg mb-8">
                            Start posting jobs for only $10.
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center w-fit px-8 py-3.5 bg-white text-[#25324B] font-bold text-base hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Sign Up For Free
                        </Link>
                    </div>

                    {/* Right dashboard image - extends to edge and crops at bottom */}
                    <div className="w-[55%] lg:w-[60%] flex items-end justify-end pt-8 self-stretch overflow-hidden">
                        <div className="relative w-full max-w-170 xl:max-w-190">
                            <Image
                                src="/images/jobposting/dashboard.png"
                                alt="QuickHire Dashboard - Job posting management interface"
                                width={800}
                                height={550}
                                className="w-full h-auto shadow-2xl"
                                quality={90}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="block md:hidden">
                {/* Blue section with diagonal crops */}
                <div className="relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-[#4640DE]"
                        style={{
                            clipPath: 'polygon(25% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)',
                        }}
                    />
                    <div className="relative text-center px-6 pt-20 pb-8">
                        <h2 className="text-3xl font-bold text-white font-red-hat-display leading-tight mb-4">
                            Start posting jobs<br />today
                        </h2>
                        <p className="text-white/80 text-base mb-8">
                            Start posting jobs for only $10.
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center w-full max-w-xs px-8 py-3.5 bg-white text-[#25324B] font-bold text-base hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Sign Up For Free
                        </Link>
                    </div>

                    {/* Dashboard image inside blue section */}
                    <div className="relative px-5 pb-10">
                        <div className="relative max-w-md mx-auto">
                            <Image
                                src="/images/jobposting/dashboard.png"
                                alt="QuickHire Dashboard - Job posting management interface"
                                width={500}
                                height={400}
                                className="w-full h-auto rounded-lg shadow-xl"
                                quality={90}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}