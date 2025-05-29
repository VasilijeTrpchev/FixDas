import Navbar from "./navbar/Navbar";
import Banner from "./banner/Banner";
import Categories from "./categories/Categories";
import TopHandymans from "./topHandymans/TopHandymans";
import Features from "./features/Features";
import NewlyJoined from "./newlyJoined/NewlyJoined";
import Testimonials from "./testimonials/Testimonials";
import ValueProposition from "./valueProposition/ValueProposition";
import Footer from "./footer/Footer";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <Categories />
        <TopHandymans />
        <Features />
        <NewlyJoined />
        <Testimonials />
        <ValueProposition />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
