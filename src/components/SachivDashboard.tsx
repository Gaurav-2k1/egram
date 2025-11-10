import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  ImageIcon,
  Settings,
  BarChart3,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Megaphone,
  LogOut,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { CreatePost } from "./CreatePost";
import { PostCard } from "./PostCard";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { postsAPI, schemesAPI, announcementsAPI, analyticsAPI } from "../services/api";
import type { Post, Scheme, Announcement } from "../types";
import { formatTimeAgo } from "../utils/format";

export function SachivDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [posts, setPosts] = useState<Post[]>([]);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [stats, setStats] = useState({
    totalVisitors: 0,
    activeSchemes: 0,
    announcements: 0,
    photoGallery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.panchayatId) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user?.panchayatId) return;
    
    setLoading(true);
    try {
      const [postsData, schemesData, announcementsData, statsData] = await Promise.all([
        postsAPI.getAll(user.panchayatId),
        schemesAPI.getAll(user.panchayatId),
        announcementsAPI.getAll(user.panchayatId),
        analyticsAPI.getStats(user.panchayatId),
      ]);

      setPosts(postsData);
      setSchemes(schemesData);
      setAnnouncements(announcementsData);
      setStats({
        totalVisitors: statsData.totalVisitors,
        activeSchemes: statsData.activeSchemes,
        announcements: statsData.announcements,
        photoGallery: statsData.photoGallery,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    { label: "Total Visitors", value: stats.totalVisitors.toLocaleString(), change: "+12.5%", icon: Users, color: "#FF9933" },
    { label: "Active Schemes", value: stats.activeSchemes.toString(), change: "+2", icon: FileText, color: "#138808" },
    { label: "Announcements", value: stats.announcements.toString(), change: "+5", icon: TrendingUp, color: "#FF9933" },
    { label: "Photo Gallery", value: stats.photoGallery.toString(), change: "+18", icon: ImageIcon, color: "#138808" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };


  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "posts", label: "Posts", icon: Megaphone },
    { id: "announcements", label: "Announcements", icon: FileText },
    { id: "schemes", label: "Schemes", icon: Users },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleCreatePost = async (postData: {
    content: string;
    media: { type: "image" | "video"; url: string; file?: File }[];
  }) => {
    if (!user?.panchayatId) return;
    
    try {
      const newPost = await postsAPI.create({
        panchayatId: user.panchayatId,
        author: user.name,
        authorRole: user.role,
        content: postData.content,
        media: postData.media,
      });
      setPosts([newPost, ...posts]);
      toast.success("Post published successfully!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create post";
      toast.error(message);
    }
  };

  const handleEditPost = (_id: string) => {
    toast.info("Edit post feature coming soon!");
  };

  const handleDeletePost = async (id: string) => {
    try {
      await postsAPI.delete(id);
      setPosts(posts.filter((post) => post.id !== id));
      toast.success("Post deleted successfully!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete post";
      toast.error(message);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-white lg:block">
        <div className="flex h-16 items-center gap-3 border-b px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#138808" />
                <path d="M12 4 L12 20 M4 12 L20 12" stroke="white" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" fill="#FF9933" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-[#138808]">Ramnagar GP</h3>
            <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
              Sachiv Dashboard
            </p>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                activeSection === item.id
                  ? "bg-[#FF9933] text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div>
            <h2>Welcome back, {user?.name || 'User'}</h2>
            <p className="text-sm text-muted-foreground">
              Here's what's happening with your Panchayat today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(`/panchayat/${user?.panchayatName?.toLowerCase() || 'demo'}`)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Website
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
            <Avatar>
              <AvatarFallback className="bg-[#FF9933] text-white">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {/* Dashboard View */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              {loading ? (
                <div className="text-center text-muted-foreground">Loading dashboard...</div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {dashboardStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="mt-1" style={{ fontSize: "1.875rem" }}>
                            {stat.value}
                          </p>
                          <p className="mt-1 text-sm" style={{ color: stat.color }}>
                            {stat.change}
                          </p>
                        </div>
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${stat.color}15` }}
                        >
                          <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                </div>
              )}

              {/* Recent Activity */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Announcements</CardTitle>
                    <CardDescription>Latest updates posted to your website</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {announcements.slice(0, 3).map((announcement) => (
                        <div key={announcement.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                          <div>
                            <p>{announcement.title}</p>
                            <p className="text-sm text-muted-foreground">{announcement.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={announcement.status === "Published" ? "default" : "secondary"}
                              className={announcement.status === "Published" ? "bg-[#138808]" : ""}
                            >
                              {announcement.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {announcement.views} views
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Scheme Progress</CardTitle>
                    <CardDescription>Track implementation of active schemes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {schemes.length === 0 ? (
                        <div className="text-center text-muted-foreground py-4">No schemes yet</div>
                      ) : (
                        schemes.map((scheme) => (
                          <div key={scheme.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <p>{scheme.name}</p>
                              <span className="text-sm text-muted-foreground">{scheme.progress}%</span>
                            </div>
                            <Progress value={scheme.progress} />
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Posts View */}
          {activeSection === "posts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2>Community Posts</h2>
                  <p className="text-muted-foreground">
                    Share updates, photos, and videos with your community
                  </p>
                </div>
              </div>

              {/* Create Post Section */}
              <CreatePost
                authorName={user?.name || "User"}
                authorRole={user?.role || "Sachiv"}
                onSubmit={handleCreatePost}
              />

              {/* Posts List */}
              <div>
                <h3 className="mb-4">Your Posts</h3>
                <div className="space-y-6">
                      {posts.length === 0 ? (
                        <div className="text-center text-muted-foreground py-8">
                          No posts yet. Create your first post!
                        </div>
                      ) : (
                        posts.map((post) => (
                          <PostCard
                            key={post.id}
                            post={{
                              ...post,
                              timestamp: formatTimeAgo(new Date(post.timestamp)),
                            }}
                            showActions={true}
                            onEdit={handleEditPost}
                            onDelete={handleDeletePost}
                          />
                        ))
                      )}
                </div>
              </div>
            </div>
          )}

          {/* Announcements View */}
          {activeSection === "announcements" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2>Announcements</h2>
                  <p className="text-muted-foreground">Manage your panchayat announcements</p>
                </div>
                <Button className="bg-[#FF9933] hover:bg-[#FF9933]/90">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Announcement
                </Button>
              </div>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                  <TabsTrigger value="draft">Drafts</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-6">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {announcements.map((announcement) => (
                          <TableRow key={announcement.id}>
                            <TableCell>{announcement.title}</TableCell>
                            <TableCell>{announcement.date}</TableCell>
                            <TableCell>
                              <Badge
                                variant={announcement.status === "Published" ? "default" : "secondary"}
                                className={announcement.status === "Published" ? "bg-[#138808]" : ""}
                              >
                                {announcement.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{announcement.views}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Schemes View */}
          {activeSection === "schemes" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2>Schemes Management</h2>
                  <p className="text-muted-foreground">Track and manage government schemes</p>
                </div>
                <Button className="bg-[#138808] hover:bg-[#138808]/90">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Scheme
                </Button>
              </div>

              <div className="grid gap-6">
                {schemes.map((scheme) => (
                  <Card key={scheme.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{scheme.name}</CardTitle>
                          <CardDescription>Category: {scheme.category}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border p-3">
                          <p className="text-sm text-muted-foreground">Budget</p>
                          <p className="text-[#138808]">{scheme.budget}</p>
                        </div>
                        <div className="rounded-lg border p-3">
                          <p className="text-sm text-muted-foreground">Beneficiaries</p>
                          <p className="text-[#138808]">{scheme.beneficiaries} families</p>
                        </div>
                        <div className="rounded-lg border p-3">
                          <p className="text-sm text-muted-foreground">Progress</p>
                          <p className="text-[#138808]">{scheme.progress}%</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Progress value={scheme.progress} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Gallery View */}
          {activeSection === "gallery" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2>Photo Gallery</h2>
                  <p className="text-muted-foreground">Upload and manage photos</p>
                </div>
                <Button className="bg-[#FF9933] hover:bg-[#FF9933]/90">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Upload Photos
                </Button>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                      <div
                        key={item}
                        className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                      >
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FF9933]/20 to-[#138808]/20">
                          <ImageIcon className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button variant="secondary" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="secondary" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings View */}
          {activeSection === "settings" && (
            <div className="space-y-6">
              <div>
                <h2>Settings</h2>
                <p className="text-muted-foreground">Manage your panchayat website settings</p>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Panchayat Information</CardTitle>
                    <CardDescription>Update basic panchayat details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="panchayatName">Panchayat Name</Label>
                        <Input id="panchayatName" defaultValue="Ramnagar" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">District</Label>
                        <Input id="district" defaultValue="Varanasi" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        defaultValue="Ramnagar Gram Panchayat is a vibrant rural community..."
                        rows={4}
                      />
                    </div>
                    <Button className="bg-[#138808] hover:bg-[#138808]/90">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Update contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="ramnagar@egramseva.gov.in" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue="+91 542-XXXXXX" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        defaultValue="Ramnagar Gram Panchayat Bhawan, Varanasi, Uttar Pradesh - 221001"
                        rows={3}
                      />
                    </div>
                    <Button className="bg-[#138808] hover:bg-[#138808]/90">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
