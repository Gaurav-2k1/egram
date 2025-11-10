import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Phone, Mail, MapPin, Calendar, Users, TrendingUp, Download, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PostCard } from "./PostCard";
import { panchayatAPI, postsAPI, schemesAPI, announcementsAPI, membersAPI, galleryAPI, projectsAPI } from "../services/api";
import type { Post, Scheme, Announcement, PanchayatMember, GalleryItem, Project, PanchayatDetails } from "../types";
import { formatTimeAgo } from "../utils/format";


export function PanchayatWebsite() {
  const { subdomain } = useParams();
  const [activeTab, setActiveTab] = useState("home");
  const [panchayat, setPanchayat] = useState<PanchayatDetails | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [members, setMembers] = useState<PanchayatMember[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchPanchayatData();
  }, [subdomain]);


  const fetchPanchayatData = async () => {
    setLoading(true);
    try {
      const subdomainToUse = subdomain || 'ramnagar';
      const panchayatData = await panchayatAPI.getBySubdomain(subdomainToUse);
      setPanchayat(panchayatData);
      
      const [postsData, schemesData, announcementsData, membersData, galleryData, projectsData] = await Promise.all([
        postsAPI.getAll(panchayatData.id),
        schemesAPI.getAll(panchayatData.id),
        announcementsAPI.getAll(panchayatData.id),
        membersAPI.getAll(panchayatData.id),
        galleryAPI.getAll(panchayatData.id),
        projectsAPI.getAll(panchayatData.id),
      ]);
      
      setPosts(postsData);
      setSchemes(schemesData);
      setAnnouncements(announcementsData);
      setMembers(membersData);
      setGallery(galleryData);
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching panchayat data:", error);
      // Use default data if API fails
      setPanchayat({
        id: 'panchayat-1',
        name: 'Ramnagar',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        block: 'Varanasi Block',
        population: 5200,
        area: '12.5',
        wards: 8,
        subdomain: 'ramnagar',
        established: 1995,
      });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner - Mobile Responsive */}
      <section className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[320px] overflow-hidden">
        <ImageWithFallback
          src={panchayat?.heroImage || "https://images.unsplash.com/photo-1736914319111-d54ada582633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwcGFuY2hheWF0fGVufDF8fHx8MTc2Mjc1MjM1N3ww&ixlib=rb-4.1.0&q=80&w=1080"}
          alt={`${panchayat?.name || 'Ramnagar'} Gram Panchayat`}
          className="h-full w-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30">
          <div className="container mx-auto flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-white">
              <h1 className="mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                {panchayat?.name || 'Ramnagar'} Gram Panchayat
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                {panchayat?.district || 'Varanasi'} District, {panchayat?.state || 'Uttar Pradesh'}
              </p>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-white/90">
                Welcome to our village - Where tradition meets progress
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Quick Stats - Mobile Responsive Grid */}
      <section className="border-b bg-[#f8f9fa] py-4 sm:py-6 md:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-3 sm:p-4 md:p-6">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-[#FF9933]/10">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF9933]" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-muted-foreground text-xs sm:text-sm">Population</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold">{panchayat?.population?.toLocaleString() || '5,200'}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-3 sm:p-4 md:p-6">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-[#138808]/10">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#138808]" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-muted-foreground text-xs sm:text-sm">Area</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold">{panchayat?.area || '12.5'} km²</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-3 sm:p-4 md:p-6">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-[#FF9933]/10">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF9933]" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-muted-foreground text-xs sm:text-sm">Wards</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold">{panchayat?.wards || '8'}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-3 sm:p-4 md:p-6">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-[#138808]/10">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-[#138808]" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-muted-foreground text-xs sm:text-sm">Established</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold">{panchayat?.established || '1995'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Main Content - Mobile Responsive */}
      <section className="py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Horizontal scrollable tabs on mobile */}
            <div className="relative -mx-4 sm:mx-0">
              <TabsList className="w-full inline-flex sm:grid grid-cols-3 lg:grid-cols-6 overflow-x-auto overflow-y-hidden whitespace-nowrap px-4 sm:px-0 scrollbar-hide gap-1 sm:gap-0">
                <TabsTrigger value="home" className="text-xs sm:text-sm px-3 sm:px-4 py-2">Home</TabsTrigger>
                <TabsTrigger value="about" className="text-xs sm:text-sm px-3 sm:px-4 py-2">About</TabsTrigger>
                <TabsTrigger value="schemes" className="text-xs sm:text-sm px-3 sm:px-4 py-2">Schemes</TabsTrigger>
                <TabsTrigger value="projects" className="text-xs sm:text-sm px-3 sm:px-4 py-2">Projects</TabsTrigger>
                <TabsTrigger value="gallery" className="text-xs sm:text-sm px-3 sm:px-4 py-2">Gallery</TabsTrigger>
                <TabsTrigger value="contact" className="text-xs sm:text-sm px-3 sm:px-4 py-2">Contact</TabsTrigger>
              </TabsList>
            </div>


            {/* Home Tab */}
            <TabsContent value="home" className="space-y-6 sm:space-y-8">
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
                {/* Left Sidebar - Stack on mobile, sidebar on desktop */}
                <div className="space-y-4 sm:space-y-6 lg:col-span-1 order-2 lg:order-1">
                  {/* Latest Announcements */}
                  <div>
                    <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl">Latest Announcements</h3>
                    <div className="space-y-3">
                      {announcements.slice(0, 3).map((announcement) => (
                        <Card key={announcement.id} className="border-l-4 border-l-[#FF9933]">
                          <CardContent className="p-3 sm:p-4">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#FF9933]" />
                              <Badge variant="secondary" className="text-xs">
                                {announcement.date}
                              </Badge>
                            </div>
                            <h4 className="mb-2 text-sm sm:text-base">{announcement.title}</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {announcement.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>


                  {/* Featured Schemes */}
                  <div>
                    <div className="mb-3 sm:mb-4 flex items-center justify-between">
                      <h3 className="text-lg sm:text-xl">Active Schemes</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTab("schemes")}
                        className="text-xs sm:text-sm"
                      >
                        View All
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {schemes.slice(0, 2).map((scheme) => (
                        <Card key={scheme.id}>
                          <CardContent className="p-3 sm:p-4">
                            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                              <Badge className="bg-[#138808] text-white text-xs">
                                {scheme.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {scheme.status}
                              </Badge>
                            </div>
                            <h4 className="mb-2 text-sm sm:text-base">{scheme.name}</h4>
                            <div className="mb-2">
                              <div className="mb-1 flex justify-between text-xs">
                                <span className="text-muted-foreground">Progress</span>
                                <span>{scheme.progress}%</span>
                              </div>
                              <Progress value={scheme.progress} className="h-1" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {scheme.beneficiaries} beneficiaries
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>


                {/* Main Feed */}
                <div className="space-y-4 sm:space-y-6 lg:col-span-2 order-1 lg:order-2">
                  <div>
                    <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl">Community Feed</h2>
                    <div className="space-y-4 sm:space-y-6">
                      {loading ? (
                        <div className="text-center text-muted-foreground py-8 text-sm sm:text-base">Loading posts...</div>
                      ) : posts.length === 0 ? (
                        <div className="text-center text-muted-foreground py-8 text-sm sm:text-base">No posts yet</div>
                      ) : (
                        posts.map((post) => (
                          <PostCard 
                            key={post.id} 
                            post={{
                              ...post,
                              timestamp: formatTimeAgo(new Date(post.timestamp)),
                            }} 
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>


            {/* About Tab */}
            <TabsContent value="about" className="space-y-6 sm:space-y-8">
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl">About {panchayat?.name || 'Ramnagar'}</h2>
                  {panchayat?.description ? (
                    <p className="mb-4 text-sm sm:text-base text-muted-foreground whitespace-pre-line">
                      {panchayat.description}
                    </p>
                  ) : (
                    <>
                      <p className="mb-4 text-sm sm:text-base text-muted-foreground">
                        {panchayat?.name || 'Ramnagar'} Gram Panchayat is a vibrant rural community located in {panchayat?.district || 'Varanasi'}
                        district. Established in {panchayat?.established || '1995'}, our village has a rich history and cultural
                        heritage spanning several centuries.
                      </p>
                      <p className="mb-4 text-sm sm:text-base text-muted-foreground">
                        With a population of over {panchayat?.population?.toLocaleString() || '5,200'} residents spread across {panchayat?.wards || '8'} wards, we are
                        committed to sustainable development, preserving our traditions while embracing
                        modern governance practices.
                      </p>
                    </>
                  )}
                  {panchayat?.features && panchayat.features.length > 0 && (
                    <>
                      <h3 className="mb-3 text-lg sm:text-xl">Key Features</h3>
                      <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                        {panchayat.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                <div>
                  <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl">Elected Members</h3>
                  {loading ? (
                    <div className="text-center text-muted-foreground py-8 text-sm sm:text-base">Loading members...</div>
                  ) : members.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8 text-sm sm:text-base">No members available</div>
                  ) : (
                    <div className="space-y-4">
                      {members.map((member) => (
                        <Card key={member.id}>
                          <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 p-3 sm:p-4">
                            <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                              <AvatarImage src={member.image} />
                              <AvatarFallback className="bg-[#FF9933]/10 text-[#FF9933]">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-center sm:text-left">
                              <h4 className="text-sm sm:text-base">{member.name}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground">{member.role}</p>
                              <div className="mt-1 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                                <span className="text-[#138808]">{member.ward}</span>
                                <span className="text-muted-foreground">{member.phone}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>


            {/* Schemes Tab */}
            <TabsContent value="schemes" className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl">Government Schemes</h2>
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  {schemes.map((scheme) => (
                    <Card key={scheme.id} className="transition-shadow hover:shadow-lg">
                      <CardHeader className="p-4 sm:p-6">
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                          <Badge className="bg-[#138808] text-white text-xs">{scheme.category}</Badge>
                          <Badge variant="outline" className="text-xs">{scheme.status}</Badge>
                        </div>
                        <CardTitle className="text-base sm:text-lg">{scheme.name}</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Allocated Budget: {scheme.budget}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="space-y-4">
                          <div>
                            <div className="mb-2 flex justify-between text-xs sm:text-sm">
                              <span className="text-muted-foreground">Implementation Progress</span>
                              <span>{scheme.progress}%</span>
                            </div>
                            <Progress value={scheme.progress} className="h-2" />
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                            <span className="text-xs sm:text-sm text-muted-foreground">Beneficiaries</span>
                            <span className="text-sm sm:text-base text-[#FF9933]">
                              {scheme.beneficiaries} families
                            </span>
                          </div>
                          <Button variant="outline" className="w-full text-xs sm:text-sm">
                            <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            Download Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>


            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl">Development Projects</h2>
                {loading ? (
                  <div className="text-center text-muted-foreground py-8 text-sm sm:text-base">Loading projects...</div>
                ) : projects.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8 text-sm sm:text-base">No projects available</div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    {projects.map((project) => (
                      <Card key={project.id} className="transition-shadow hover:shadow-lg">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-base sm:text-lg">{project.title}</CardTitle>
                          <CardDescription className="text-xs sm:text-sm">{project.wards}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <p className="mb-4 text-xs sm:text-sm text-muted-foreground">{project.description}</p>
                          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                            <div className="rounded-lg border p-3">
                              <p className="text-xs sm:text-sm text-muted-foreground">Budget</p>
                              <p className="text-sm sm:text-base text-[#138808] font-medium">{project.budget}</p>
                            </div>
                            <div className="rounded-lg border p-3">
                              <p className="text-xs sm:text-sm text-muted-foreground">Timeline</p>
                              <p className="text-sm sm:text-base text-[#138808] font-medium">{project.timeline}</p>
                            </div>
                            <div className="rounded-lg border p-3">
                              <p className="text-xs sm:text-sm text-muted-foreground">Status</p>
                              <Badge 
                                className={
                                  project.status === 'Completed' 
                                    ? 'bg-[#138808] text-white'
                                    : project.status === 'In Progress'
                                    ? 'bg-[#FF9933] text-white'
                                    : 'bg-gray-500 text-white'
                                }
                              >
                                {project.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Progress value={project.progress} />
                            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{project.progress}% Completed</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>


            {/* Gallery Tab */}
            <TabsContent value="gallery" className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl">Photo Gallery</h2>
                {loading ? (
                  <div className="text-center text-muted-foreground py-8 text-sm sm:text-base">Loading gallery...</div>
                ) : gallery.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8 text-sm sm:text-base">No gallery items available</div>
                ) : (
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {gallery.map((item) => (
                      <Card key={item.id} className="overflow-hidden transition-transform hover:scale-105">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="h-40 sm:h-48 w-full object-cover"
                        />
                        <CardContent className="p-3 sm:p-4">
                          <p className="font-medium text-sm sm:text-base">{item.title}</p>
                          {item.description && (
                            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                          )}
                          {item.date && (
                            <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>


            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6 sm:space-y-8">
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl">Contact Information</h2>
                  <Card>
                    <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                      {panchayat?.contactInfo ? (
                        <>
                          <div className="flex items-start gap-3">
                            <MapPin className="mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#FF9933]" />
                            <div>
                              <h4 className="text-sm sm:text-base font-semibold">Address</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line">
                                {panchayat.contactInfo.address}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Phone className="mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#FF9933]" />
                            <div>
                              <h4 className="text-sm sm:text-base font-semibold">Phone</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground break-all">{panchayat.contactInfo.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Mail className="mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#FF9933]" />
                            <div>
                              <h4 className="text-sm sm:text-base font-semibold">Email</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground break-all">{panchayat.contactInfo.email}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Calendar className="mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#FF9933]" />
                            <div>
                              <h4 className="text-sm sm:text-base font-semibold">Office Hours</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line">
                                {panchayat.contactInfo.officeHours}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start gap-3">
                            <MapPin className="mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#FF9933]" />
                            <div>
                              <h4 className="text-sm sm:text-base font-semibold">Address</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                {panchayat?.name || 'Ramnagar'} Gram Panchayat Bhawan
                                <br />
                                {panchayat?.district || 'Varanasi'}, {panchayat?.state || 'Uttar Pradesh'} - 221001
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Phone className="mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#FF9933]" />
                            <div>
                              <h4 className="text-sm sm:text-base font-semibold">Phone</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground">+91 542-XXXXXX</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Mail className="mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#FF9933]" />
                            <div>
                              <h4 className="text-sm sm:text-base font-semibold">Email</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground break-all">
                                {panchayat?.subdomain || 'ramnagar'}@egramseva.gov.in
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Calendar className="mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#FF9933]" />
                            <div>
                              <h4 className="text-sm sm:text-base font-semibold">Office Hours</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                Monday - Friday: 10:00 AM - 5:00 PM
                                <br />
                                Saturday: 10:00 AM - 2:00 PM
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl">Send us a Message</h2>
                  <Card>
                    <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs sm:text-sm">Name</Label>
                        <Input id="name" placeholder="Your name" className="text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" className="text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-xs sm:text-sm">Subject</Label>
                        <Input id="subject" placeholder="What is this about?" className="text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-xs sm:text-sm">Message</Label>
                        <Textarea id="message" placeholder="Your message..." rows={5} className="text-sm" />
                      </div>
                      <Button className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-sm sm:text-base">
                        Send Message
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
