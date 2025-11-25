import { lazy, memo, Suspense, useRef } from "react";
import { DropDownMenuList } from "../utils/constant";
import Card from "../components/home-compo/Card";
import Slider from "../components/home-compo/Slider";
import CTA from "../components/home-compo/CTA";
import AdProduct from "../components/home-compo/AdProduct";
import ScrollDownArrow from "../components/ScrollDown";
import { Link } from "react-router-dom";
import { LazySection } from "../components/LazySection";
import { Button } from "../components/ui/Button";
import Title from "../components/Title";
import CategoryCom from "../components/home-compo/CategoryCom";
import ProductSkeleton from "../components/SkeletonUI/ProductSkeleton";
const BrandCarausel = lazy(
  () => import("../components/home-compo/BrandCarausel")
);
const ProductCarausel = lazy(
  () => import("../components/products/ProductCarausel")
);
const PopularCategories = lazy(
  () => import("../components/products/PopularCategories")
);
const HomeProducts = lazy(() => import("../components/products/HomeProducts"));

const Home = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {/*home banner  */}
      <section className="md:px-10 p-2 h-full md:h-[100vh] bg-[#febd2f] pt-5 md:pt-10 flex flex-col-reverse md:items-center md:flex-row gap-5">
        <div className="pt-5 w-full md:w-auto">
          {/* all categories */}
          <ul className="bg-[#173334] w-[300px] rounded-xl text-white p-2 hidden md:block">
            {DropDownMenuList?.map((item) => {
              return (
                <CategoryCom
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  children={item.children}
                />
              );
            })}
          </ul>
          {/* CARD */}
          <div className="">
            <Card
              image="../assets/girl.png"
              style="w-full md:w-[300px] mt-2.5"
              title="Delivery in 24 hours"
              subtitle="Delevery Service"
              description="Our grocery slider is designed to make your shopping experience
          seamless and..."
              btnText="Show more"
              to="/products?category=Rice & Grains"
            />
          </div>
        </div>
        <div className="relative w-full h-[300px] mt-30 md:h-full ">
          {/* home slider  */}
          <Slider />
        </div>
        {/* ScrollDown */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ScrollDownArrow targetRef={targetRef} />
        </div>
      </section>
      <section ref={targetRef} className="md:px-10 p-2">
        {/* call to action */}
        <CTA />
        {/*home categories  */}
        <Title text="Love my Products" />
        <LazySection>
          <Suspense fallback={<ProductSkeleton style="h-[250px]" />}>
            <HomeProducts />
          </Suspense>
        </LazySection>
        <div className="flex justify-center mt-10">
          <Link to="/products">
            <Button type="button" className="text-[14px]!">
              Shop More Products
            </Button>
          </Link>
        </div>
      </section>
      <section className="md:px-10 p-2">
        <AdProduct />
      </section>
      {/* brands  */}
      <section className="md:px-10 p-2">
        <Title text="Popular Brands" />
        <LazySection>
          <BrandCarausel />
        </LazySection>
      </section>
      {/* best deals carausel*/}
      <section className="md:px-10 p-2 flex flex-col gap-4">
        <div className="flex flex-col ">
          <Title text="Best Deals" />
          <LazySection>
            <Suspense fallback={<ProductSkeleton style="h-[455px]" />}>
              <ProductCarausel url="products" QKey="bestDeals" />
            </Suspense>
          </LazySection>
        </div>
      </section>
      {/* Most Popular Categories */}
      <section className="md:px-10 p-2">
        <div className="flex flex-col">
          <Title
            className="text-center md:text-left"
            text="Most Popular Categories"
          />
          <LazySection>
            <Suspense fallback={<ProductSkeleton style="h-[400px]" />}>
              <PopularCategories />
            </Suspense>
          </LazySection>
        </div>
      </section>
      {/* Start Your Cart */}
      <section className="md:px-10 p-2 ">
        <div className="flex flex-col ">
          <Title text="Start Your Cart" />
          <LazySection>
            <Suspense fallback={<ProductSkeleton style="h-[455px]" />}>
              <ProductCarausel url="products?maxRating=true" QKey="startCart" />
            </Suspense>
          </LazySection>
        </div>
      </section>
      <section
        className="pt-8 mt-5 overflow-hidden"
        style={{
          backgroundImage: 'url("../assets/bg-image.avif")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-10">
          <div className="h-[400px] md:h-[500px] w-[250px] p-2 shadow-2xl drop-shadow-2xl rounded-2xl md:-order-1 order-1 m-auto md:m-0">
            <img
              className="w-full rounded-2xl object-fill"
              src="../assets/mobile.avif"
              alt=""
            />
          </div>
          <div className="w-full md:w-[500px] flex flex-col justify-center gap-2 md:gap-6 p-2">
            <h3 className="capitalize text-[18px] md:text-xl font-bold text-white">
              Save time & money
            </h3>
            <h1 className="text-[40px] md:text-[72px] leading-[1.2em] font-bold text-white">
              Shop With Us on the Go
            </h1>
            <p className="text-sm md:text-md font-medium md:font-semibold w-full md:w-[350px] text-white">
              your weekly shopping routine at your door in just one click.
            </p>
            <div className="flex gap-2 items-center">
              <Link
                className="border md:w-[200px] md:h-[80px] border-[#c4c4c4] rounded-md  md:rounded-xl bg-white p-2 overflow-hidden"
                to="/"
              >
                <img
                  className="rounded-md"
                  src="../assets/Appstore.png"
                  alt="app-store"
                />
              </Link>
              <Link
                className="border md:w-[200px] md:h-[80px] border-[#c4c4c4] rounded-md overflow-hidden md:rounded-xl bg-white p-2"
                to="/"
              >
                <img
                  className=""
                  src="../assets/GooglePlay.png"
                  alt="google-play"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default memo(Home);
