export const Information = () => {
  return (
    <section className="bg-[white] py-16 px-4 tracking-tight">
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <p className="text-sm font-semibold text-[#DF0000] uppercase mb-2">
              CLUB INFORMATION
            </p>
            <h2 className="text-5xl font-semibold">Learn more about us</h2>
          </div>
          <div className="text-right text-base text-gray-700">
            <p>
              Check back regularly for new programs and sessions. If a session
              is full, you may sign-up for the waitlist.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};
