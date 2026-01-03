import React from "react";

import { ShieldCheck, Users, Wrench, Clock } from "lucide-react";
import Container from "../Container/Container";
import { Link } from "react-router";

const AboutUs = () => {
  return (
    <div className="bg-base-100 text-base-content">
      <section className="bg-base-200 py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              About <span className="text-primary">HomeHero</span>
            </h1>
            <p className="text-lg opacity-80">
              Your trusted platform for reliable home services — connecting
              skilled professionals with homeowners who value quality, safety,
              and convenience.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Our Mission</h2>
              <p className="opacity-80">
                Our mission is to make home services simple, transparent, and
                reliable. Whether you need plumbing, electrical work, cleaning,
                or renovation — HomeHero ensures you get the right expert at the
                right time.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Our Vision</h2>
              <p className="opacity-80">
                We envision a future where finding trusted home service
                professionals takes minutes, not days — empowering both
                customers and service providers through technology.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-base-200 py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold">Why Choose HomeHero</h2>
            <p className="opacity-70 mt-2">
              Built for reliability, designed for comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature
              icon={<ShieldCheck size={28} />}
              title="Verified Professionals"
              desc="Every service provider is carefully verified for quality and trust."
            />
            <Feature
              icon={<Clock size={28} />}
              title="On-Time Service"
              desc="We respect your time with punctual and dependable service."
            />
            <Feature
              icon={<Wrench size={28} />}
              title="Wide Range of Services"
              desc="From plumbing to painting — all home services in one place."
            />
            <Feature
              icon={<Users size={28} />}
              title="Customer First"
              desc="Transparent pricing, honest reviews, and dedicated support."
            />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <Stat number="5K+" label="Happy Customers" />
            <Stat number="1K+" label="Service Providers" />
            <Stat number="10+" label="Service Categories" />
            <Stat number="24/7" label="Support" />
          </div>
        </Container>
      </section>

      <section className="bg-base-200 py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-semibold">Built With Care</h2>
            <p className="opacity-80">
              HomeHero is built by passionate developers and service experts who
              understand the everyday challenges of maintaining a home. We
              believe technology should simplify life — not complicate it.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="bg-primary text-white rounded-2xl p-10 text-center space-y-4">
            <h2 className="text-3xl font-bold">
              Ready to Experience Hassle-Free Home Services?
            </h2>
            <p className="opacity-90">
              Join HomeHero today and connect with trusted professionals near
              you.
            </p>
            <Link to={"/services"}>
              <button className="btn btn-white text-primary font-semibold">
                Explore Services
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;

const Feature = ({ icon, title, desc }) => (
  <div className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition">
    <div className="text-primary mb-3">{icon}</div>
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm opacity-70 mt-1">{desc}</p>
  </div>
);

const Stat = ({ number, label }) => (
  <div>
    <h3 className="text-3xl font-bold text-primary">{number}</h3>
    <p className="opacity-70 mt-1">{label}</p>
  </div>
);
