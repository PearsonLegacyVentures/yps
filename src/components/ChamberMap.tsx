const CHAMBER_MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6498.030250278104!2d-77.3335591999637!3d25.07507533344781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x892f7d7c6bee289b%3A0x44ac676135fb4fa3!2sThe%20Bahamas%20Chamber%20of%20Commerce%20and%20Employers&#39;%20Confederation!5e1!3m2!1sen!2sbs!4v1778977549755!5m2!1sen!2sbs";

export function ChamberMap({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[1.75rem] border border-primary/10 bg-muted shadow-sm ${className}`}
    >
      <iframe
        title="Bahamas Chamber of Commerce and Employers’ Confederation map"
        src={CHAMBER_MAP_SRC}
        className="block h-[22rem] w-full md:h-[28rem]"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
