import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  gradient: string;
}

export default function ServiceCard({ title, description, image, gradient }: ServiceCardProps) {
  return (
    <div
      className="relative h-full flex flex-col group border border-gray-100 overflow-hidden rounded"
    >
      <Image src={image} alt={title} fill className="object-cover absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105" />
      <div className={`absolute inset-0 z-0 ${gradient}`}></div>
      
      <span className="z-10 inline-flex items-center p-5 text-xl font-medium text-white drop-shadow-md font-[family-name:var(--font-inter-tight)] sm:p-8 sm:text-[1.35rem]">
        {title}
      </span>
      
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-start gap-3 bg-white p-3 opacity-100 transition-all duration-500 ease-in-out sm:bottom-6 sm:left-6 sm:right-6 sm:gap-4 sm:p-5 md:opacity-0 md:group-hover:opacity-100">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-gray-100 group-hover:bg-[url('/caret-bg.png')] group-hover:bg-cover group-hover:border-0 transition-all duration-300">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-white sm:w-[14px] sm:h-[14px]">
            <path d="M9 18L15 12L9 6" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"/>
          </svg>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium font-[family-name:var(--font-inter-tight)]">
          {description}
        </p>
      </div>
    </div>
  );
}
