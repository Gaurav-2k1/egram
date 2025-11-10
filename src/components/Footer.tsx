import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  variant?: "platform" | "panchayat";
}

export function Footer({ variant = "platform" }: FooterProps) {
  return (
    <footer className="border-t bg-[#f8f9fa]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div>
            <h3 className="mb-4 text-[#138808]">
              {variant === "platform" ? "e-GramSeva" : "About Us"}
            </h3>
            <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>
              {variant === "platform"
                ? "Empowering rural India through digital transformation. Connecting Gram Panchayats with citizens."
                : "Working towards the development and prosperity of our village through transparent governance."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2" style={{ fontSize: "0.875rem" }}>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[#FF9933]">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[#FF9933]">
                  {variant === "platform" ? "Register" : "Schemes"}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[#FF9933]">
                  {variant === "platform" ? "Panchayats" : "Projects"}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[#FF9933]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="mb-4">Important Links</h4>
            <ul className="space-y-2" style={{ fontSize: "0.875rem" }}>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[#FF9933]">
                  Ministry of Panchayati Raj
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[#FF9933]">
                  India.gov.in
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[#FF9933]">
                  Digital India
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[#FF9933]">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">Contact</h4>
            <ul className="space-y-3" style={{ fontSize: "0.875rem" }}>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF9933]" />
                <span className="text-muted-foreground">info@egramseva.gov.in</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF9933]" />
                <span className="text-muted-foreground">1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF9933]" />
                <span className="text-muted-foreground">
                  Ministry of Panchayati Raj, New Delhi
                </span>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#138808] text-white transition-colors hover:bg-[#138808]/90"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#138808] text-white transition-colors hover:bg-[#138808]/90"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#138808] text-white transition-colors hover:bg-[#138808]/90"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Tricolor */}
      <div className="border-t">
        <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
        <div className="container mx-auto px-4 py-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>
              © 2025 e-GramSeva. All rights reserved. | Designed following UX4G standards
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>
              Best viewed in Chrome, Firefox, Safari
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
