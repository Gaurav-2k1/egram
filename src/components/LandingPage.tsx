import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Users, Shield, Zap, TrendingUp, CheckCircle, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { panchayatAPI } from "../services/api";
import type { ActivePanchayat } from "../types";

export function LandingPage() {
  const navigate = useNavigate();
  const [activePanchayats, setActivePanchayats] = useState<ActivePanchayat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPanchayats = async () => {
      try {
        const data = await panchayatAPI.getAll();
        setActivePanchayats(data.slice(0, 4)); // Show first 4
      } catch (error) {
        console.error("Error fetching panchayats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPanchayats();
  }, []);
  const features = [
    {
      icon: Users,
      title: "Easy Management",
      description: "Intuitive dashboard for Panchayat Sachivs to manage content, schemes, and updates effortlessly.",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Built following UX4G standards with top-notch security and accessibility compliance.",
    },
    {
      icon: Zap,
      title: "Quick Setup",
      description: "Get your Panchayat website live in minutes with custom subdomain and ready-to-use templates.",
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track visitor engagement, scheme reach, and citizen interaction with comprehensive analytics.",
    },
  ];

  const benefits = [
    "Complete transparency in governance",
    "Direct citizen engagement platform",
    "Showcase development projects",
    "Track scheme implementation",
    "Multi-language support",
    "Mobile-responsive design",
  ];


  const stats = [
    { value: "500+", label: "Active Panchayats" },
    { value: "2.5M+", label: "Citizens Reached" },
    { value: "8,500+", label: "Schemes Implemented" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FF9933]/10 via-white to-[#138808]/10">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle, #138808 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />
        <div className="container relative mx-auto px-4 py-16 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge className="mb-4 bg-[#138808] text-white hover:bg-[#138808]/90">
                Government of India Initiative
              </Badge>
              <h1 className="mb-6" style={{ fontSize: "2.5rem", lineHeight: "1.2" }}>
                Empowering <span className="text-[#FF9933]">Gram Panchayats</span> for{" "}
                <span className="text-[#138808]">Digital India</span>
              </h1>
              <p className="mb-8 text-muted-foreground" style={{ fontSize: "1.125rem" }}>
                Create your Panchayat's digital presence in minutes. Showcase schemes, projects,
                and achievements with a professional website tailored for rural governance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-[#FF9933] hover:bg-[#FF9933]/90"
                  onClick={() => navigate("/registration")}
                >
                  Register Your Panchayat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/panchayat-demo")}
                >
                  View Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-[#FF9933] to-[#138808] opacity-20 blur-2xl" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1736914319111-d54ada582633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwcGFuY2hheWF0fGVufDF8fHx8MTc2Mjc1MjM1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Village Panchayat"
                className="relative rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-[#f8f9fa] py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2" style={{ fontSize: "2.5rem", color: "#FF9933" }}>
                  {stat.value}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24" id="features">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4" style={{ fontSize: "2rem" }}>
              Why Choose <span className="text-[#138808]">e-GramSeva</span>?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Built specifically for Indian Gram Panchayats with features that matter most for
              rural governance and citizen engagement.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-t-4 border-t-[#FF9933] transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#138808]/10">
                    <feature.icon className="h-6 w-6 text-[#138808]" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-[#138808] to-[#0a5505] py-16 text-white lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6" style={{ fontSize: "2rem" }}>
                Transform Your Panchayat's Digital Presence
              </h2>
              <p className="mb-8 text-white/90">
                Join hundreds of Gram Panchayats across India that are leveraging technology
                for better governance and citizen services.
              </p>
              <div className="grid gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#FF9933]" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759738098462-90ffac98c554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGluZGlhJTIwY29tbXVuaXR5fGVufDF8fHx8MTc2MjY5MDg5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Rural Community"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Active Panchayats Directory */}
      <section className="py-16 lg:py-24" id="panchayats">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4" style={{ fontSize: "2rem" }}>
              Active <span className="text-[#FF9933]">Panchayats</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Explore Gram Panchayats that are already using our platform to serve their communities better.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <div className="col-span-4 text-center text-muted-foreground">Loading panchayats...</div>
            ) : activePanchayats.length === 0 ? (
              <div className="col-span-4 text-center text-muted-foreground">No panchayats available</div>
            ) : (
              activePanchayats.map((panchayat, index) => (
              <Card key={index} className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#FF9933]" />
                    <Badge variant="secondary">{panchayat.district}</Badge>
                  </div>
                  <CardTitle>{panchayat.name}</CardTitle>
                  <CardDescription>Gram Panchayat</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Active Schemes</p>
                      <p className="text-[#138808]">{panchayat.schemes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Population</p>
                      <p className="text-[#138808]">{panchayat.population.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))
            )}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              View All Panchayats
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-y bg-[#f8f9fa] py-16">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4" style={{ fontSize: "2rem" }}>
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Register your Gram Panchayat today and create a digital presence that empowers your
            community and promotes transparent governance.
          </p>
          <Button
            size="lg"
            className="bg-[#FF9933] hover:bg-[#FF9933]/90"
            onClick={() => navigate("/registration")}
          >
            Register Now - It's Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
