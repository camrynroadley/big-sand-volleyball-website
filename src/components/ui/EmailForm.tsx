import { GlowEffect } from "./glow-effect";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ShimmerButton } from "./shimmer-button";

const EmailForm: React.FC = () => {
  return (
    <form className="mt-6 flex justify-center">
      <div className="relative w-full max-w-xl">
        <input
          type="email"
          placeholder="Your email address"
          className="w-full px-6 py-3 pr-40 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] text-xs"
        />
        {/* <div className="absolute top-1/2 right-2 -translate-y-1/2 whitespace-nowrap">
          <div className="z-10 flex items-center justify-center">
            <ShimmerButton className="shadow-2xl">
              <span className="text-center text-xs font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                Shimmer Button
              </span>
            </ShimmerButton>
          </div>
        </div> */}
        {/* <div className="absolute top-1/2 right-2 -translate-y-1/2 whitespace-nowrap">
          <div className="relative">
            <GlowEffect
              colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
              mode="colorShift"
              blur="soft"
              duration={3}
              scale={0.9}
            />
            <button className="relative inline-flex items-center gap-1 rounded-full bg-zinc-950 px-2.5 py-1 text-xs text-zinc-50 outline outline-1 outline-[#fff2f21f]">
              Sign up for mailing list <ArrowForwardIcon fontSize="small" />
            </button>
          </div>
        </div> */}
        <button
          type="submit"
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#000000] hover:bg-red-900 text-white px-3 py-2 rounded-full text-xs font-semibold shadow-md transition whitespace-nowrap"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
