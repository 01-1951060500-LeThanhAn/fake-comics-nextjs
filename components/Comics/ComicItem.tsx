import { InfoSlider } from "../../Interface/Interface";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Link from "next/link";
const ComicItem = ({ name, image, slug }: InfoSlider) => {
  return (
    <>
      <Link href={`/detail/${slug}`}>
        <div className="relative">
          <div className="bg-slate-200 h-80 lg:w-48">
            <div className="image w-auto">
              <LazyLoadImage
                className="aspect-[250/353] h-64 object-cover"
                src={image}
                effect="blur"
                width="100%"
                height="100%"
              />
            </div>
            <div className="mt-4">
              <p className="text-sm">{String(name).slice(0, 20)}...</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ComicItem;
