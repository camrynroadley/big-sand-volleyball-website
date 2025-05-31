import HomeInfoRight from '../../../public/images/home_info_1.png';
import HomeInfoLeft from '../../../public/images/home_info_2.png';
import Image from "next/image";
import { FadeInOnScroll } from "../ui/FadeInOnScroll";

export const Bento = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <FadeInOnScroll>
                    <a
            href="/about"
            className="h-full w-full group flex flex-col justify-between bg-white border border-gray-300 rounded-2xl p-6 hover:shadow-md transition duration-300"
          >
            <div>
              <h4 className="text-xl font-semibold text-black mb-2">
                Our values and coaches
              </h4>
              <p className="text-sm text-gray-500">
                Meet our passionate team and learn what drives us.
              </p>
            </div>
            <div className="mt-4 text-right">
              <span className="text-red-600 group-hover:underline inline-flex items-center text-sm font-medium">
                Learn more
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </a>

          {/* <div className="flex-1 basis-2/3 h-52 rounded-xl flex">
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(199, 199, 199, 0.3)"
            >
              <CardWithArrow name="Our values and coaches" pageLink="about" />
            </SpotlightCard>
          </div> */}
        </FadeInOnScroll>
      </div>
      <div className="col-span-1">
        <FadeInOnScroll>
          <div className="flex-1 basis-1/3 h-50">
            <Image
              className="w-full h-full rounded-3xl"
              src={HomeInfoRight}
              alt="Logo"
            />
          </div>
        </FadeInOnScroll>
      </div>
      <div className="col-span-1">
        <FadeInOnScroll>
          <div className="flex-1 basis-1/3 h-50">
            <Image
              className="w-full h-full rounded-3xl"
              src={HomeInfoLeft}
              alt="Logo"
            />
          </div>
        </FadeInOnScroll>
      </div>
      <div className="col-span-2">
        <FadeInOnScroll>
            <a
            href="https://instagram.com/yourclub"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between h-full bg-white border border-gray-300 rounded-2xl p-6 hover:shadow-md transition duration-300"
          >
            <div>
              <h4 className="text-xl font-semibold text-black mb-2">
                Follow us on Instagram
              </h4>
              <p className="text-sm text-gray-500">
                See highlights from practices, camps, and more.
              </p>
            </div>
            <div className="mt-4 text-right">
              <span className="text-red-600 group-hover:underline inline-flex items-center text-sm font-medium">
                View profile
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </a>
        </FadeInOnScroll>
      </div>
    </div>
  );
};
