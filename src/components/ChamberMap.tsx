const CHAMBER_MAP_SRC =
  "https://www.google.com/maps?q=Bahamas%20Chamber%20of%20Commerce%20%26%20Employers%27%20Confederation%2C%20Shirley%20Street%20%26%20Collins%20Avenue%2C%20Nassau%2C%20Bahamas&output=embed";

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
