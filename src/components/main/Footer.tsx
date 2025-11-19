import { Facebook, Twitter, Youtube, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface FooterProps {
  variant?: "platform" | "panchayat";
}

export function Footer({ variant = "platform" }: FooterProps) {
  const { t } = useTranslation();

  const governmentLinks = [
    { name: "CPGRAMS", url: "https://pgportal.gov.in" },
    { name: "Data.gov.in", url: "https://data.gov.in" },
    { name: "PM India", url: "https://pmindia.gov.in" },
    { name: "Digital India", url: "https://digitalindia.gov.in" },
    { name: "MyGov", url: "https://mygov.in" },
  ];

  return (
    <footer className="border-t bg-[#1B2B5E] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-white">
              {variant === "platform" ? t('footer.about') : t('footer.aboutUs')}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-white/80">
              {variant === "platform"
                ? t('footer.aboutText')
                : t('footer.aboutTextPanchayat')}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/80 transition-colors hover:text-white">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                {variant === "platform" ? (
                  <Link to="/registration" className="text-white/80 transition-colors hover:text-white">
                    {t('footer.register')}
                  </Link>
                ) : (
                  <button onClick={() => {
                    const element = document.querySelector('#schemes');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }} className="text-white/80 transition-colors hover:text-white bg-transparent border-none cursor-pointer">
                    {t('footer.schemes')}
                  </button>
                )}
              </li>
              <li>
                {variant === "platform" ? (
                  <Link to="/panchayats" className="text-white/80 transition-colors hover:text-white">
                    {t('footer.panchayats')}
                  </Link>
                ) : (
                  <button onClick={() => {
                    const element = document.querySelector('#projects');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }} className="text-white/80 transition-colors hover:text-white bg-transparent border-none cursor-pointer">
                    {t('footer.projects')}
                  </button>
                )}
              </li>
              <li>
                <button onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }} className="text-white/80 transition-colors hover:text-white bg-transparent border-none cursor-pointer">
                  {t('footer.contact')}
                </button>
              </li>
              <li>
                <a href="#" className="text-white/80 transition-colors hover:text-white">
                  {t('footer.privacyPolicy')}
                </a>
              </li>
            </ul>
          </div>

          {/* My Government */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white">{t('footer.myGovernment')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/80 transition-colors hover:text-white">
                  {t('footer.ministryPanchayatiRaj')}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 transition-colors hover:text-white">
                  {t('footer.indiaGov')}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 transition-colors hover:text-white">
                  {t('footer.digitalIndia')}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 transition-colors hover:text-white">
                  {t('footer.termsOfUse')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white">{t('footer.contactInfo')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF9933]" />
                <a href="mailto:info@egramseva.gov.in" className="text-white/80 transition-colors hover:text-white">
                  {t('footer.email')}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF9933]" />
                <span className="text-white/80">{t('footer.phone')}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF9933]" />
                <span className="text-white/80">
                  {t('footer.address')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Government Links Section */}
        {variant === "platform" && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <h4 className="mb-4 text-base font-semibold text-white">{t('footer.governmentServices')}</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {governmentLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition-all hover:bg-white/10 hover:text-white"
              >
                  <span>{link.name}</span>
                  <ExternalLink className="h-3 w-3" />
              </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar with Tricolor */}
      <div className="border-t border-white/10 bg-[#0F1A3A]">
        <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
        <div className="container mx-auto px-4 py-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 text-sm text-white/60 sm:flex-row">
            <p>
              {t('footer.copyright')}
            </p>
            <p>
              {t('footer.browserInfo')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
