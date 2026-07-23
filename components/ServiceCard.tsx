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
      
      <span className="inline-flex items-center text-[1.35rem] font-medium text-white z-10 font-[family-name:var(--font-inter-tight)] mb-4 drop-shadow-md p-8 pb-28">
        {title}
      </span>
      
      <div className="absolute bottom-6 left-6 right-6 bg-white p-5 flex items-start gap-4 z-10 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-gray-100 group-hover:bg-[url('/caret-bg.png')] group-hover:bg-cover group-hover:border-0 transition-all duration-300">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-white">
            <path d="M9 18L15 12L9 6" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"/>
          </svg>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed font-medium font-[family-name:var(--font-inter-tight)]">
          {description}
        </p>
      </div>
    </div>
  );
}
