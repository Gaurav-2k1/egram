/**
 * API Service Layer
 * Handles all API calls using axios with mock data
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  Post,
  Scheme,
  PanchayatMember,
  Announcement,
  GalleryItem,
  RegistrationFormData,
  ActivePanchayat,
  Project,
  PanchayatDetails,
} from '../types';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock data storage (simulating backend)
const mockData = {
  users: [
    {
      id: '1',
      email: 'sachiv@ramnagar.egramseva.gov.in',
      password: 'password123',
      name: 'Rajesh Sharma',
      role: 'Panchayat Sachiv',
      panchayatId: 'panchayat-1',
      panchayatName: 'Ramnagar',
    },
  ],
  panchayats: [
    {
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
      description: 'Ramnagar Gram Panchayat is a vibrant rural community located in Varanasi district. Established in 1995, our village has a rich history and cultural heritage spanning several centuries. With a population of over 5,200 residents spread across 8 wards, we are committed to sustainable development, preserving our traditions while embracing modern governance practices.',
      heroImage: 'https://images.unsplash.com/photo-1736914319111-d54ada582633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwcGFuY2hheWF0fGVufDF8fHx8MTc2Mjc1MjM1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      contactInfo: {
        address: 'Ramnagar Gram Panchayat Bhawan, Varanasi, Uttar Pradesh - 221001',
        phone: '+91 542-XXXXXX',
        email: 'ramnagar@egramseva.gov.in',
        officeHours: 'Monday - Friday: 10:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM',
      },
      features: [
        '3 Primary Schools and 1 High School',
        'Primary Health Center with 24/7 services',
        'Community Hall and Sports Ground',
        'Panchayat Bhawan with modern facilities',
        'Agricultural Service Center',
      ],
    },
  ],
  posts: [
    {
      id: '1',
      panchayatId: 'panchayat-1',
      author: 'Rajesh Sharma',
      authorRole: 'Panchayat Sachiv',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      content: 'Great news! Our village has been selected for the PM Awas Yojana Phase 2. 45 families will receive housing assistance. Construction will begin next month. 🏠',
      media: [
        {
          type: 'image' as const,
          url: 'https://images.unsplash.com/photo-1759738098462-90ffac98c554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYWdlJTIwZGV2ZWxvcG1lbnQlMjBpbmRpYXxlbnwxfHx8fDE3NjI3NTIzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
      likes: 156,
      comments: 23,
      shares: 8,
    },
    {
      id: '2',
      panchayatId: 'panchayat-1',
      author: 'Rajesh Sharma',
      authorRole: 'Panchayat Sachiv',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      content: 'Successful completion of our community water supply project! Every household now has access to clean drinking water 24/7.',
      media: [
        {
          type: 'image' as const,
          url: 'https://images.unsplash.com/photo-1707721690544-781fe6ede937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMGZpZWxkfGVufDF8fHx8MTc2Mjc1MjM1OHww&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
      likes: 234,
      comments: 45,
      shares: 12,
    },
  ],
  schemes: [
    {
      id: '1',
      panchayatId: 'panchayat-1',
      name: 'PM Awas Yojana',
      category: 'Housing',
      budget: '₹50,00,000',
      beneficiaries: 45,
      progress: 75,
      status: 'Active' as const,
    },
    {
      id: '2',
      panchayatId: 'panchayat-1',
      name: 'Swachh Bharat Mission',
      category: 'Sanitation',
      budget: '₹15,00,000',
      beneficiaries: 120,
      progress: 90,
      status: 'Active' as const,
    },
    {
      id: '3',
      panchayatId: 'panchayat-1',
      name: 'MGNREGA',
      category: 'Employment',
      budget: '₹80,00,000',
      beneficiaries: 250,
      progress: 60,
      status: 'Active' as const,
    },
  ],
  announcements: [
    {
      id: '1',
      panchayatId: 'panchayat-1',
      title: 'Village Development Meeting',
      date: '2025-11-15',
      description: 'Important meeting to discuss upcoming development projects. All residents are invited.',
      status: 'Published' as const,
      views: 245,
    },
    {
      id: '2',
      panchayatId: 'panchayat-1',
      title: 'Water Supply Improvement',
      date: '2025-11-10',
      description: 'New water pipeline project approved. Work to commence next month.',
      status: 'Published' as const,
      views: 189,
    },
    {
      id: '3',
      panchayatId: 'panchayat-1',
      title: 'Vaccination Camp',
      date: '2025-11-08',
      description: 'Free vaccination camp organized on 20th Nov at Primary Health Center.',
      status: 'Draft' as const,
      views: 0,
    },
  ],
  members: [
    {
      id: '1',
      panchayatId: 'panchayat-1',
      name: 'Ramesh Kumar Singh',
      role: 'Sarpanch',
      ward: 'All Wards',
      phone: '+91 98XXX XXXXX',
      email: 'sarpanch@ramnagar.egramseva.gov.in',
      image: '',
      designation: 'Elected Representative',
    },
    {
      id: '2',
      panchayatId: 'panchayat-1',
      name: 'Sunita Devi',
      role: 'Up-Sarpanch',
      ward: 'Ward 1-5',
      phone: '+91 97XXX XXXXX',
      email: 'upsarpanch@ramnagar.egramseva.gov.in',
      image: '',
      designation: 'Elected Representative',
    },
    {
      id: '3',
      panchayatId: 'panchayat-1',
      name: 'Rajesh Sharma',
      role: 'Panchayat Sachiv',
      ward: 'All Wards',
      phone: '+91 96XXX XXXXX',
      email: 'sachiv@ramnagar.egramseva.gov.in',
      image: '',
      designation: 'Administrative Officer',
    },
    {
      id: '4',
      panchayatId: 'panchayat-1',
      name: 'Anita Verma',
      role: 'Ward Member',
      ward: 'Ward 3',
      phone: '+91 95XXX XXXXX',
      email: 'ward3@ramnagar.egramseva.gov.in',
      image: '',
      designation: 'Elected Representative',
    },
  ],
  gallery: [
    {
      id: '1',
      panchayatId: 'panchayat-1',
      title: 'School Building Construction',
      image: 'https://images.unsplash.com/photo-1759738098462-90ffac98c554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYWdlJTIwZGV2ZWxvcG1lbnQlMjBpbmRpYXxlbnwxfHx8fDE3NjI3NTIzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'New school building construction project',
      category: 'Infrastructure',
      date: '2025-10-15',
    },
    {
      id: '2',
      panchayatId: 'panchayat-1',
      title: 'Community Gathering',
      image: 'https://images.unsplash.com/photo-1759738098462-90ffac98c554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGluZGlhJTIwY29tbXVuaXR5fGVufDF8fHx8MTc2MjY5MDg5OXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Community meeting for village development',
      category: 'Events',
      date: '2025-10-20',
    },
    {
      id: '3',
      panchayatId: 'panchayat-1',
      title: 'Agricultural Training',
      image: 'https://images.unsplash.com/photo-1707721690544-781fe6ede937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMGZpZWxkfGVufDF8fHx8MTc2Mjc1MjM1OHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Training program for farmers',
      category: 'Education',
      date: '2025-10-25',
    },
    {
      id: '4',
      panchayatId: 'panchayat-1',
      title: 'Road Construction',
      image: 'https://images.unsplash.com/photo-1709967884183-7ffa9d168508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYyNzUyMzU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Road infrastructure development',
      category: 'Infrastructure',
      date: '2025-11-01',
    },
  ],
  projects: [
    {
      id: '1',
      panchayatId: 'panchayat-1',
      title: 'Road Infrastructure Development',
      description: 'Construction of 5km concrete road connecting main village to agricultural areas. Project includes proper drainage system and street lighting.',
      budget: '₹45,00,000',
      timeline: '6 months',
      status: 'In Progress' as const,
      progress: 65,
      wards: 'Ward 1, 2, 3',
      startDate: '2025-06-01',
      endDate: '2025-12-01',
      images: [],
    },
    {
      id: '2',
      panchayatId: 'panchayat-1',
      title: 'Community Water Supply System',
      description: 'Installation of new water pipeline network ensuring 24/7 clean water supply to all households. Includes water treatment plant and storage tanks.',
      budget: '₹35,00,000',
      timeline: '4 months',
      status: 'Completed' as const,
      progress: 100,
      wards: 'All Wards',
      startDate: '2025-05-01',
      endDate: '2025-09-01',
      images: [],
    },
  ],
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Auth API
 */
export const authAPI = {
  login: async (email: string, password: string) => {
    await delay(1000);
    const user = mockData.users.find((u) => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const { password: _, ...userWithoutPassword } = user;
    const token = `mock-token-${user.id}-${Date.now()}`;
    return { user: userWithoutPassword, token };
  },

  logout: async () => {
    await delay(500);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return { success: true };
  },

  getCurrentUser: async () => {
    await delay(500);
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Not authenticated');
    const userId = token.split('-')[2];
    const user = mockData.users.find((u) => u.id === userId);
    if (!user) throw new Error('User not found');
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};

/**
 * Panchayat API
 */
export const panchayatAPI = {
  getAll: async (): Promise<ActivePanchayat[]> => {
    await delay(800);
    return mockData.panchayats.map((p) => ({
      name: p.name,
      district: `${p.district}, ${p.state}`,
      schemes: mockData.schemes.filter((s) => s.panchayatId === p.id).length,
      population: p.population,
    }));
  },

  getById: async (id: string) => {
    await delay(600);
    const panchayat = mockData.panchayats.find((p) => p.id === id);
    if (!panchayat) throw new Error('Panchayat not found');
    return panchayat;
  },

  getBySubdomain: async (subdomain: string): Promise<PanchayatDetails> => {
    await delay(600);
    const panchayat = mockData.panchayats.find((p) => p.subdomain === subdomain);
    if (!panchayat) throw new Error('Panchayat not found');
    return panchayat as PanchayatDetails;
  },

  getDetails: async (id: string): Promise<PanchayatDetails> => {
    await delay(600);
    const panchayat = mockData.panchayats.find((p) => p.id === id);
    if (!panchayat) throw new Error('Panchayat not found');
    return panchayat as PanchayatDetails;
  },

  register: async (data: RegistrationFormData) => {
    await delay(2000);
    const newPanchayat = {
      id: `panchayat-${Date.now()}`,
      name: data.panchayatName,
      district: data.district,
      state: data.state,
      block: data.block,
      population: parseInt(data.population) || 0,
      area: data.area,
      wards: parseInt(data.wards) || 0,
      subdomain: data.subdomain,
      established: new Date().getFullYear(),
      description: `${data.panchayatName} Gram Panchayat is a vibrant rural community.`,
      heroImage: 'https://images.unsplash.com/photo-1736914319111-d54ada582633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwcGFuY2hheWF0fGVufDF8fHx8MTc2Mjc1MjM1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      contactInfo: {
        address: `${data.panchayatName} Gram Panchayat Bhawan, ${data.district}, ${data.state}`,
        phone: '+91 XXXXX XXXXX',
        email: `${data.subdomain}@egramseva.gov.in`,
        officeHours: 'Monday - Friday: 10:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM',
      },
      features: [] as string[],
    };
    (mockData.panchayats as PanchayatDetails[]).push(newPanchayat as PanchayatDetails);
    return { success: true, panchayat: newPanchayat as PanchayatDetails };
  },
};

/**
 * Posts API
 */
export const postsAPI = {
  getAll: async (panchayatId?: string): Promise<Post[]> => {
    await delay(700);
    let posts = [...mockData.posts];
    if (panchayatId) {
      posts = posts.filter((p) => p.panchayatId === panchayatId);
    }
    return posts;
  },

  getById: async (id: string): Promise<Post> => {
    await delay(500);
    const post = mockData.posts.find((p) => p.id === id);
    if (!post) throw new Error('Post not found');
    return post;
  },

  create: async (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>): Promise<Post> => {
    await delay(1000);
    if (!post.panchayatId) {
      throw new Error('panchayatId is required');
    }
    const newPost: Post = {
      ...post,
      panchayatId: post.panchayatId,
      id: `post-${Date.now()}`,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
    };
    (mockData.posts as Post[]).unshift(newPost);
    return newPost;
  },

  update: async (id: string, updates: Partial<Post>): Promise<Post> => {
    await delay(800);
    const index = mockData.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Post not found');
    (mockData.posts as Post[])[index] = { ...mockData.posts[index], ...updates } as Post;
    return mockData.posts[index];
  },

  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = mockData.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Post not found');
    mockData.posts.splice(index, 1);
  },

  like: async (id: string): Promise<number> => {
    await delay(300);
    const post = mockData.posts.find((p) => p.id === id);
    if (!post) throw new Error('Post not found');
    post.likes += 1;
    return post.likes;
  },
};

/**
 * Schemes API
 */
export const schemesAPI = {
  getAll: async (panchayatId?: string): Promise<Scheme[]> => {
    await delay(700);
    let schemes = [...mockData.schemes];
    if (panchayatId) {
      schemes = schemes.filter((s) => s.panchayatId === panchayatId);
    }
    return schemes;
  },

  getById: async (id: string): Promise<Scheme> => {
    await delay(500);
    const scheme = mockData.schemes.find((s) => s.id === id);
    if (!scheme) throw new Error('Scheme not found');
    return scheme;
  },

  create: async (scheme: Omit<Scheme, 'id'>): Promise<Scheme> => {
    await delay(1000);
    if (!scheme.panchayatId) {
      throw new Error('panchayatId is required');
    }
    const newScheme: Scheme = {
      ...scheme,
      panchayatId: scheme.panchayatId,
      id: `scheme-${Date.now()}`,
    };
    (mockData.schemes as Scheme[]).push(newScheme);
    return newScheme;
  },

  update: async (id: string, updates: Partial<Scheme>): Promise<Scheme> => {
    await delay(800);
    const index = mockData.schemes.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Scheme not found');
    (mockData.schemes as Scheme[])[index] = { ...mockData.schemes[index], ...updates } as Scheme;
    return mockData.schemes[index];
  },

  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = mockData.schemes.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Scheme not found');
    mockData.schemes.splice(index, 1);
  },
};

/**
 * Announcements API
 */
export const announcementsAPI = {
  getAll: async (panchayatId?: string): Promise<Announcement[]> => {
    await delay(700);
    let announcements = [...mockData.announcements];
    if (panchayatId) {
      announcements = announcements.filter((a) => a.panchayatId === panchayatId);
    }
    return announcements;
  },

  create: async (announcement: Omit<Announcement, 'id' | 'views'>): Promise<Announcement> => {
    await delay(1000);
    if (!announcement.panchayatId) {
      throw new Error('panchayatId is required');
    }
    const newAnnouncement: Announcement = {
      ...announcement,
      panchayatId: announcement.panchayatId,
      id: `announcement-${Date.now()}`,
      views: 0,
    };
    (mockData.announcements as Announcement[]).unshift(newAnnouncement);
    return newAnnouncement;
  },

  update: async (id: string, updates: Partial<Announcement>): Promise<Announcement> => {
    await delay(800);
    const index = mockData.announcements.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Announcement not found');
    mockData.announcements[index] = { ...mockData.announcements[index], ...updates };
    return mockData.announcements[index];
  },

  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = mockData.announcements.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Announcement not found');
    mockData.announcements.splice(index, 1);
  },
};

/**
 * Members API
 */
export const membersAPI = {
  getAll: async (panchayatId?: string): Promise<PanchayatMember[]> => {
    await delay(700);
    let members = [...mockData.members];
    if (panchayatId) {
      members = members.filter((m) => m.panchayatId === panchayatId);
    }
    return members;
  },

  getById: async (id: string): Promise<PanchayatMember> => {
    await delay(500);
    const member = mockData.members.find((m) => m.id === id);
    if (!member) throw new Error('Member not found');
    return member;
  },
};

/**
 * Gallery API
 */
export const galleryAPI = {
  getAll: async (panchayatId?: string): Promise<GalleryItem[]> => {
    await delay(700);
    let gallery = [...mockData.gallery];
    if (panchayatId) {
      gallery = gallery.filter((g) => g.panchayatId === panchayatId);
    }
    return gallery;
  },

  getById: async (id: string): Promise<GalleryItem> => {
    await delay(500);
    const item = mockData.gallery.find((g) => g.id === id);
    if (!item) throw new Error('Gallery item not found');
    return item;
  },

  create: async (item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> => {
    await delay(1000);
    if (!item.panchayatId) {
      throw new Error('panchayatId is required');
    }
    const newItem: GalleryItem = {
      ...item,
      panchayatId: item.panchayatId,
      id: `gallery-${Date.now()}`,
    };
    (mockData.gallery as GalleryItem[]).unshift(newItem);
    return newItem;
  },

  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = mockData.gallery.findIndex((g) => g.id === id);
    if (index === -1) throw new Error('Gallery item not found');
    mockData.gallery.splice(index, 1);
  },
};

/**
 * Projects API
 */
export const projectsAPI = {
  getAll: async (panchayatId?: string): Promise<Project[]> => {
    await delay(700);
    let projects = [...mockData.projects];
    if (panchayatId) {
      projects = projects.filter((p) => p.panchayatId === panchayatId);
    }
    return projects;
  },

  getById: async (id: string): Promise<Project> => {
    await delay(500);
    const project = mockData.projects.find((p) => p.id === id);
    if (!project) throw new Error('Project not found');
    return project;
  },

  create: async (project: Omit<Project, 'id'>): Promise<Project> => {
    await delay(1000);
    if (!project.panchayatId) {
      throw new Error('panchayatId is required');
    }
    const newProject: Project = {
      ...project,
      panchayatId: project.panchayatId,
      id: `project-${Date.now()}`,
    };
    (mockData.projects as Project[]).unshift(newProject);
    return newProject;
  },

  update: async (id: string, updates: Partial<Project>): Promise<Project> => {
    await delay(800);
    const index = mockData.projects.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Project not found');
    (mockData.projects as Project[])[index] = { ...mockData.projects[index], ...updates } as Project;
    return mockData.projects[index];
  },

  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = mockData.projects.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Project not found');
    mockData.projects.splice(index, 1);
  },
};

/**
 * Analytics API
 */
export const analyticsAPI = {
  getStats: async (panchayatId: string) => {
    await delay(800);
    return {
      totalVisitors: 12458,
      activeSchemes: mockData.schemes.filter((s) => s.panchayatId === panchayatId).length,
      announcements: mockData.announcements.filter((a) => a.panchayatId === panchayatId).length,
      photoGallery: mockData.gallery.filter((g) => g.panchayatId === panchayatId).length,
    };
  },
};

export default api;

